import React, { useState, useEffect } from "react";
import { DDBRow, DDBUpload } from "./DDBRow";
import firebase from "../../../js/Firestore";
import _ from "lodash";
import uploadObj from "./uploadObj";

function DDB({ Honey, API }) {
  /*deck handling*/
  //wrapper for upload data
  const [obj, setObj] = useState(new uploadObj(Honey.user));
  //toggle between DB view and deck view
  const [showDetail, toggleDetail] = useState(false);

  function importDeck() {
    //see
    if (Honey.import) {
      setObj(
        new uploadObj(Honey.user).importDeck(Honey.DB, Honey.import, Honey.user)
      );
    }
    toggleDetail(true);
  }
  function importUpload(x) {
    //see
    setObj(_.clone(obj.load(Honey.DB, x, Honey.user)));
    toggleDetail(true);
  }

  /*pagination*/
  const [loadEnable, setLoadEnable] = useState(true);
  const [rows, setRows] = useState([]);
  const [showRows, setShowRows] = useState([]);
  const [Anchor, setAnchor] = useState(null);
  const [filterOwn, setFilterOwn] = useState(false);
  const [filterDiv, setFilterDiv] = useState([]);
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
  }, [rows, filterDiv, filterOwn, filterStr]);

  function filter(x) {
    if (filterOwn) {
      x = x.filter(e => e.user === Honey.user);
    }
    if (filterDiv.length > 0) {
      x = x.filter(e => filterDiv.some(f => f.div === e.divEm && f.val));
    }
    if (filterStr !== "") {
      x = x.filter(e => {
        return (
          e.title.toLowerCase().includes(filterStr.toLowerCase()) ||
          e.desc.toLowerCase().includes(filterStr.toLowerCase())
        );
      });
    }
    return x;
  }
  function filterSide(x) {
    let y = _.clone(filterDiv);
    y.forEach(e => {
      if (e.Side === x) {
        e.val = !e.val;
      }
    });
    setFilterDiv(y);
  }
  function filterToggle(x) {
    let y = _.clone(filterDiv);
    y.forEach(e => {
      if (e.div === x) {
        e.val = !e.val;
      }
    });
    setFilterDiv(y);
  }
  useEffect(() => {
    let x = [];
    Honey.DB.forEach(e => {
      x.push({ div: e.EmblemTexture, Side: e.DivisionNationalite, val: true });
    });
    setFilterDiv(x);
    load(Anchor);
    setAnchor(true);
  }, []);

  /*handle data*/
  function del(x) {
    firebase
      .firestore()
      .collection("SD1DDB")
      .doc(x.id)
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
        global.throw("Error removing: ", x, error);
      });
  }
  function load(anch) {
    if (!loadEnable) {
      //stop loading at end of dataset
      return;
    }
    let ref = firebase
      .firestore()
      .collection("SD1DDB")
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
  function upload(obj, t, d, user = Honey.user) {
    let newID = firebase
      .firestore()
      .collection("SD1DDB")
      .doc();
    newID
      .set({
        title: t,
        desc: d,
        code: obj.code,
        divEm: obj.divEm,
        //div: obj.div,
        Side: obj.Side,
        //Income: obj.Income,
        //Rating: obj.Rating,
        user: user,
        id: newID.id,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        newID
          .get()
          .then(snap => {
            let foo = _.clone(rows);
            foo.push(snap.data());
            setRows(foo);
          })
          .catch(function(error) {
            global.throw("Set error: ", obj, error);
          });
      });

    toggleDetail(false);
  }

  /*rows*/
  function isUser(x, user = Honey.user) {
    return user === x;
  }
  function showRow(x, i) {
    return (
      <tr className="d-flex" key={i}>
        <DDBRow x={x} show={importUpload} del={del} isUser={isUser}></DDBRow>
      </tr>
    );
  }

  function makeButton(x, i) {
    return (
      <div className="col-xl-3 col-md-4 col-sm-6" key={i}>
        <button
          className={x.val ? "btn btn-block btn-success" : "btn btn-block"}
          onClick={() => filterToggle(x.div)}
        >
          <img
            src={
              process.env.PUBLIC_URL +
              "/img/d/" +
              x.div.toLowerCase() +
              ".tgv.png"
            }
            className="img-back"
            alt="unitPortrait"
          />
        </button>
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
  return (
    <div className="container">
      {showDetail ? (
        <DDBUpload
          obj={obj}
          DB={Honey.DB}
          upload={upload}
          exportDeck={API.export}
          hide={() => toggleDetail(false)}
        ></DDBUpload>
      ) : (
        <>
          <div className="row">
            <div className="col-6 justify-content-center">
              <table className="sortable table-hover table-bordered table-responsive text-center">
                <tbody>
                  <tr className="d-flex">
                    <th className="col-2"> Name </th>
                    <th className="col-5"> Description </th>
                    <th className="col-1"> </th>
                    <th className="col-1"> Side </th>
                    <th className="col-1"> Date </th>
                    <th className="col-1"> </th>
                    <th className="col-1"> </th>
                  </tr>
                  {showRows.map((e, i) => showRow(e, i))}
                </tbody>
              </table>
              <button
                className="btn btn-block btn-primary"
                onClick={() => load(Anchor)}
                disabled={!loadEnable}
              >
                LOAD
              </button>
            </div>
            <div className="col-6">
              <div className="row">
                <div className="col-6">
                  <button
                    className="btn btn-block btn-outline-primary"
                    onClick={() => importDeck(true)}
                  >
                    Import from Deck Builder
                  </button>
                </div>
                <div className="col-6">
                  <button
                    className={
                      filterOwn
                        ? "btn btn-block btn-primary"
                        : "btn btn-block btn-outline-primary"
                    }
                    onClick={() => setFilterOwn(!filterOwn)}
                  >
                    My decks
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="col-10">
                  <input
                    className="form-control"
                    value={str}
                    type="text"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-2">
                  <button
                    className="btn btn-block btn-primary"
                    onClick={() => lookup(str)}
                  >
                    Filter
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <button
                    className="btn btn-block btn-outline-dark"
                    onClick={() => filterSide("Allied")}
                  >
                    Allies
                  </button>
                </div>
                <div className="col-6">
                  <button
                    className="btn btn-block btn-outline-dark"
                    onClick={() => filterSide("Axis")}
                  >
                    Axis
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="col-sm">
                  <div className="row">
                    {filterDiv
                      .filter(x => {
                        return x.Side === "Allied";
                      })
                      .map((e, i) => makeButton(e, i))}
                  </div>
                </div>
                <div className="col-sm">
                  <div className="row">
                    {filterDiv
                      .filter(x => {
                        return x.Side === "Axis";
                      })
                      .map((e, i) => makeButton(e, i))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default DDB;
