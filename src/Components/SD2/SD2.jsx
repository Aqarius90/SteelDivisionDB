import React, { useState } from "react";
import DeckAssembly from "../SD2/js/Deck";
import DeckBuilder from "./DeckBuilder/DeckBuilder";
import firebase from "../../js/Firestore";
import Database from "./Database/Database";
import pako from "pako";
import _ from "lodash";
import DDB from "./DDB/DDB";
import { useParams, useHistory } from "react-router-dom";

function SD2({ Honey, API }) {
  console.log("SD2 render");
  let deckAPI = {}; //function holder. I don't have the energy to rewrite it into a reducer
  let params = useParams();
  let history = useHistory();
  deckAPI.setCode = x => {
    history.push("/SteelDivisionDB/" + params.DB + "/" + params.Page + "/" + x);
  };
  //deck setters
  const [deck, setDeck] = useState(new DeckAssembly());
  deckAPI.decode = code => {
    //set deck via deck code
    try {
      let newdeck = new DeckAssembly();
      setDeck(newdeck.loadFromCode(code, DB));
      deckAPI.setCode(newdeck.DeckCode);
    } catch (error) {
      global.throw("deck decode error", 0, error);
    }
  };
  deckAPI.clear = () => {
    //set deck to empty
    let newdeck = new DeckAssembly();
    setDeck(newdeck);
    deckAPI.setCode(newdeck.DeckCode);
  };
  deckAPI.setDeck = x => {
    //set deck from DB
    try {
      //TODO keep units on switch?
      let newdeck = new DeckAssembly();
      setDeck(newdeck.loadFromDB(x, DB));
      deckAPI.setCode(newdeck.DeckCode);
    } catch (error) {
      global.throw("deck set error", 0, error);
    }
  };
  deckAPI.randomFill = x => {
    try {
      let newdeck = new DeckAssembly().randomFill(x, DB);
      setDeck(newdeck);
      deckAPI.setCode(newdeck.DeckCode);
    } catch (error) {
      global.throw("deck set error", 0, error);
    }
  };
  deckAPI.setIncome = x => {
    //incomes are 0,1 2 3 for balanced, vanguard, maverick, juggernaut
    //TODO check this ordering
    try {
      let newdeck = _.clone(deck).setIncome(x);
      setDeck(newdeck);
      deckAPI.setCode(newdeck.DeckCode);
    } catch (error) {
      global.throw("income set error", 0, error);
    }
  };

  //renders
  const [DB, setDB] = useState();

  const [isFirst, setIsFirst] = useState(true);
  if (isFirst && params.code) {
    if (DB) {
      deckAPI.decode(params.code);
      setIsFirst(false);
    }
  }
  if (!DB) {
    firebase
      .firestore()
      .collection("zip")
      .doc("SD2")
      .get()
      .then(queryDocumentSnapshot => {
        var inflated = JSON.parse(
          pako.inflate(queryDocumentSnapshot.data().d, { to: "string" })
        );
        setDB(inflated);
      });
    return (
      <div className="card">
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  deckAPI.addUnit = x => {
    try {
      let newdeck = _.clone(deck).addUnit(x);
      setDeck(newdeck);
      deckAPI.setCode(newdeck.DeckCode);
    } catch (error) {
      global.throw("addUnit error", 0, error);
    }
  };
  deckAPI.deleteUnit = x => {
    try {
      let newdeck = _.clone(deck).deleteUnit(x);
      setDeck(newdeck);
      deckAPI.setCode(newdeck.DeckCode);
    } catch (error) {
      global.throw("deleteUnit error", 0, error);
    }
  };

  if (params.Page === "DeckBuilder") {
    return <DeckBuilder DB={DB} Deck={deck} API={deckAPI} />;
  } else if (params.Page === "Database") {
    return <Database DB={DB} FB={firebase.firestore()} />;
  } else if (params.Page === "DDB") {
    if (!Honey.User) {
      return (
        <div>
          <div className="modal-dialog" onClick={e => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header"></div>
              <div className="modal-body">
                <button
                  className="btn btn-primary btn-block"
                  onClick={API.logIn}
                >
                  {Honey.User ? "Logout" : "Login"}
                </button>
              </div>
              <div className="modal-footer"></div>
            </div>
          </div>
        </div>
      );
    }
    return Honey.User ? (
      <DDB
        Honey={{
          DB: DB,
          import: deck,
          user: Honey.User.uid
        }}
        API={{
          export: deckAPI.decode
        }}
      />
    ) : (
      <></>
    );
  } else if (params.Page === "ReplayDB") {
    return <div>replayDB fragment</div>;
  } else {
    return null;
  }
}

export default SD2;
