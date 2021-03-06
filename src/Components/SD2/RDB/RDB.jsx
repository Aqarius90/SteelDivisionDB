import React, { useState, useEffect } from "react";
import RDBRow from "./RDBRow";
import Deck from "../js/Deck";
import DeckAssembly from "../../SD1/js/DeckAssembly";
import RDBUpload from "./RDBUpload";
import firebase from "../../../js/Firestore";
import _ from "lodash";
import pako from "pako";
import { useParams } from "react-router-dom";

function RDB({ Honey, API }) {
  let params = useParams();
  /*deck handling*/
  const [showUploadPanel, setUploadPanel] = useState(false);
  const [parsed, setParsed] = useState(null);

  /*pagination and filtering*/
  const [loadEnable, setLoadEnable] = useState(true);
  const [rows, setRows] = useState([]);
  const [showRows, setShowRows] = useState([]);
  const [Anchor, setAnchor] = useState(true);
  const [filterOwn, setFilterOwn] = useState(false);
  const [filterStr, setFilterStr] = useState("");
  const [str, setstr] = useState("");
  let handleChange = event => {
    setstr(event.target.value);
  };
  let lookup = () => {
    setFilterStr(str);
  };
  useEffect(() => {
    setShowRows(filter(rows));
  }, [rows, filterOwn, filterStr]);

  function filter(x) {
    if (filterOwn) {
      x = x.filter(e => e.userid === Honey.user.uid);
    }
    if (filterStr !== "") {
      x = x.filter(e => {
        return (
          e.title.toLowerCase().includes(filterStr.toLowerCase()) ||
          e.desc.toLowerCase().includes(filterStr.toLowerCase()) ||
          e.meta.h.Map.toLowerCase().includes(filterStr.toLowerCase()) ||
          e.meta.p.some(f =>
            f.PlayerName.toLowerCase().includes(filterStr.toLowerCase())
          )
        );
      });
    }
    return x;
  }
  useEffect(() => {
    /*init data*/
    load(Anchor);
  }, []);

  /*handle data*/
  function del(x) {
    let dBase = params.DB === "SD1" ? "SD1RDB" : "SD2RDB";
    if (global.debug) {
      console.log(dBase);
      console.log(x);
    }
    firebase
      .firestore()
      .collection(dBase)
      .doc(x.uid)
      .delete()
      .then(function() {
        let foo = _.clone(rows);
        foo.splice(
          foo.findIndex(e => e.id === x.id),
          1
        );
        setRows(foo);
      })
      .catch(function(error) {
        global.throw("Error removing: ", {}, error);
      });
  }
  function load(anch) {
    if (!loadEnable) {
      //stop loading at end of dataset
      return;
    }
    let dBase = params.DB === "SD1" ? "SD1RDB" : "SD2RDB";
    let ref = firebase
      .firestore()
      .collection(dBase)
      .orderBy("timestamp");
    if (anch) {
      //offset, used after fisrt load
      ref = ref.startAfter(anch);
    }
    ref
      .limit(5)
      .get()
      .then(snaps => {
        let foo = _.clone(rows);
        let bar = [];
        snaps.docs.forEach(e => {
          bar.push(e.data());
        });
        setRows(foo.concat(bar));
        let newAnch = snaps.docs[snaps.docs.length - 1];
        if (newAnch) {
          setAnchor(newAnch);
        } else {
          //end of dataset
          setLoadEnable(false);
        }
        if (filter(bar).length === 0) {
          //if no data to show, load next set
          load(newAnch);
          //pass new anchor manually because setstate is async
        }
      })
      .catch(function(error) {
        global.throw("Get DDB error: ", "", error);
      });
  }
  function upload(title, desc, parsed, userid = Honey.user.uid) {
    let dBase = params.DB === "SD1" ? "SD1RDB" : "SD2RDB";
    let miamiTwice = pako.deflate(pako.deflate(parsed.blob), {
      to: "string"
    });
    let ref = firebase
      .firestore()
      .collection(dBase)
      .doc(parsed.meta.h.UniqueSessionId);
    if (global.debug) {
      console.log({
        userid: userid,
        title: title,
        desc: desc,
        meta: parsed.meta,
        uid: parsed.meta.h.UniqueSessionId,
        zip: miamiTwice
      });
    }
    ref
      .set({
        userid: userid,
        title: title,
        desc: desc,
        meta: parsed.meta,
        uid: parsed.meta.h.UniqueSessionId,
        //id: newID.id,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        zip: miamiTwice
      })
      .then(() => {
        ref.get().then(snap => {
          let foo = _.clone(rows);
          foo.push(snap.data());
          setRows(foo);
          setUploadPanel(false);
          setUploadResult({ res: "Uploaded", b: true });
        });
      })
      .catch(e => {
        global.throw("upload error", parsed, e);
        setUploadResult({ res: "Uploade failed", b: true });
      });
  }
  const [uploadResult, setUploadResult] = useState({ res: "error", b: false });
  /*rows*/
  function isUser(userid, user = Honey.user.uid) {
    return user === userid;
  }

  function loadFile() {
    const fileSelector = document.createElement("input");
    fileSelector.setAttribute("type", "file");
    fileSelector.onchange = handleFileSelect;
    fileSelector.setAttribute("multiple", "multiple");
    fileSelector.click();
  }
  function handleFileSelect(evt) {
    let replayFile = evt.target.files[0];
    let reader = new FileReader();
    reader.onload = () => {
      let enc = new TextDecoder("utf-8");
      let blob = reader.result;
      let data = enc.decode(blob);
      data = parseReplay(data, Honey.DB);
      setParsed({ meta: data, blob: blob });
      setUploadPanel(true);
    };
    reader.readAsArrayBuffer(replayFile);
  }
  function parseReplay(x, DB) {
    let HeaderStart = x.indexOf('"game"');
    let HeaderEnd = x.indexOf("}star");
    let header = x.slice(HeaderStart, HeaderEnd);
    header = JSON.parse("{" + header + "}"); //to valid JSON

    let headerArr = []; //[game, ...player]
    for (var key in header) {
      if (header.hasOwnProperty(key)) {
        headerArr.push(header[key]);
      }
    }
    let Game = [];
    let Players = [];
    for (let i = 0; i < headerArr.length; i++) {
      if (i === 0) {
        Game = headerArr[i];
      } else {
        if (headerArr[i].PlayerDeckContent) {
          Players.push(headerArr[i]);
        }
      }
    }
    if (params.DB === "SD1") {
      let d = new DeckAssembly();
      Players.forEach(e => {
        d.decodeDeck(e.PlayerDeckContent, DB);
        e.divEm = d.Emblem;
      });
    } else {
      let d = new Deck();
      Players.forEach(e => {
        d.loadFromCode(e.PlayerDeckContent, DB);
        e.divEm = d.EmblemTexture ? d.EmblemTexture : "ERROR";
      });
    }

    let FooterStart = x.indexOf('"result"');
    let FooterEnd = x.length - 1;
    let footer = x.slice(FooterStart, FooterEnd);
    footer = JSON.parse(
      footer.slice(footer.indexOf(":") + 1) //remove title
    ); //duration, score, victory
    return { h: Game, p: Players, f: footer };
  }

  if (uploadResult.b) {
    return (
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title"></h5>
            <button
              type="button"
              className="close"
              onClick={() => setUploadResult({ res: "error", b: false })}
            >
              X
            </button>
          </div>
          <div className="modal-body">
            <h4>{uploadResult.res}</h4>
          </div>
          <div className="modal-footer"></div>
        </div>
      </div>
    );
  }

  if (!Anchor) {
    return (
      <div className="container">
        <div className="card">
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (showUploadPanel) {
    return (
      <div className="container">
        <RDBUpload
          DB={Honey.DB}
          upload={upload}
          parsed={parsed}
          hide={() => setUploadPanel(false)}
        ></RDBUpload>
      </div>
    );
  }
  return (
    <div className="container card">
      <div className="row py-2 card-header">
        <div className="col-1">
          <button
            className="btn btn-block btn-outline-primary"
            onClick={loadFile}
          >
            Upload
          </button>
        </div>
        <div className="col-1">
          <button
            className={
              filterOwn
                ? "btn btn-block btn-primary"
                : "btn btn-block btn-outline-primary"
            }
            onClick={() => setFilterOwn(!filterOwn)}
          >
            My replays
          </button>
        </div>
        <div className="col-9">
          <input
            className="form-control"
            value={str}
            type="text"
            onChange={handleChange}
          />
        </div>
        <div className="col-1">
          <button
            className="btn btn-block btn-primary"
            onClick={() => lookup(str)}
          >
            Filter
          </button>
        </div>
      </div>
      <div className="row card-body">
        <div className="col-12 justify-content-center">
          <div className="row">
            {showRows.map(function showRow(x, i) {
              return (
                <div className="col-12" key={i}>
                  <RDBRow
                    x={x}
                    exportDeck={API.export}
                    del={del}
                    isUser={isUser}
                  ></RDBRow>
                </div>
              );
            })}
            <div className="col-12">
              <button
                className="btn btn-block btn-primary"
                onClick={() => load(Anchor)}
                disabled={!loadEnable}
              >
                LOAD
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default RDB;
