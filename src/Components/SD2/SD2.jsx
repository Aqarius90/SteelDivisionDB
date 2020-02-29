import React, { useState } from "react";
import DeckAssembly from "../SD2/js/Deck";
import DeckBuilder from "./DeckBuilder/DeckBuilder";
import firebase from "../../js/Firestore";
import Database from "./Database/Database";
import pako from "pako";
import _ from "lodash";

//import dummyDB from "../../DB2test.json";
//import FirestoreInit from "./js/FirestoreInit";

function SD2({ Honey, API }) {
  console.log("SD2 render");
  let deckAPI = {}; //function holder. I don't have the energy to rewrite it into a reducer
  //deck setters
  const [deck, setDeck] = useState(new DeckAssembly());
  deckAPI.decode = code => {
    //set deck via deck code
    try {
      let newdeck = new DeckAssembly();
      setDeck(newdeck.loadFromCode(code, DB));
      API.setCode(newdeck.DeckCode);
    } catch (error) {
      global.throw("deck decode error", 0, error);
    }
  };
  deckAPI.clear = () => {
    //set deck to empty
    let newdeck = new DeckAssembly();
    setDeck(newdeck);
    API.setCode(newdeck.DeckCode);
  };
  deckAPI.setDeck = x => {
    //set deck from DB
    try {
      //TODO keep units on switch?
      let newdeck = new DeckAssembly();
      setDeck(newdeck.loadFromDB(x, DB));
      API.setCode(newdeck.DeckCode);
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
      API.setCode(newdeck.DeckCode);
    } catch (error) {
      global.throw("income set error", 0, error);
    }
  };

  //render
  //const [hasError, setHasError] = useState(0); //0-no error, 1-uploading, 2-done
  const [DB, setDB] = useState();

  const [isFirst, setIsFirst] = useState(true);
  if (isFirst && Honey.Preload !== "") {
    if (DB) {
      deckAPI.decode(Honey.Preload);
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
      API.setCode(newdeck.DeckCode);
    } catch (error) {
      global.throw("addUnit error", 0, error);
    }
  };
  deckAPI.deleteUnit = x => {
    try {
      let newdeck = _.clone(deck).deleteUnit(x);
      setDeck(newdeck);
      API.setCode(newdeck.DeckCode);
    } catch (error) {
      global.throw("deleteUnit error", 0, error);
    }
  };
  deckAPI.toggleRandomizer = () => {
    //TODO can probably be self-contained in the module
    global.throw("toggleRandomizer not written yet", 0);
  };

  if (Honey.ActiveTab === "DeckBuilder") {
    return (
      <DeckBuilder DB={DB} Deck={deck} API={deckAPI} Preload={Honey.Preload} />
    );
  } else if (Honey.ActiveTab === "Database") {
    return <Database DB={DB} FB={firebase.firestore()} />;
  } else if (Honey.ActiveTab === "DeckDB") {
    return <div>DeckDB</div>;
  } else if (Honey.ActiveTab === "ReplayDB") {
    return <div>replayDB fragment</div>;
  } else {
    return null;
  }
}

export default SD2;
