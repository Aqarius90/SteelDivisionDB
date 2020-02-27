import React, { useState } from "react";
import DeckAssembly from "../SD2/js/Deck";
import DeckBuilder from "./DeckBuilder/DeckBuilder";
import Database from "./Database/Database";
import pako from "pako";
import _ from "lodash";

//import dummyDB from "../../DB2test.json";
//import FirestoreInit from "./js/FirestoreInit";

//TODO add defences in matrix display

function SD2({ Honey }) {
  console.log("SD2 render");
  var API = {}; //empty object to hold all functions used by the rest of the modules

  //deck setters
  const [deck, setDeck] = useState(new DeckAssembly());
  API.decode = code => {
    //set deck via deck code
    try {
      let newdeck = new DeckAssembly();
      setDeck(newdeck.loadFromCode(code, DB));
    } catch (error) {
      global.throw("deck decode error", 0, error);
    }
  };
  API.clear = () => {
    //set deck to empty
    let newdeck = new DeckAssembly();
  };
  API.setDeck = x => {
    //set deck from DB
    try {
      //TODO keep units on switch?
      let newdeck = new DeckAssembly();
      setDeck(newdeck.loadFromDB(x, DB));
    } catch (error) {
      global.throw("deck set error", 0, error);
    }
  };
  API.setIncome = x => {
    //incomes are 0,1 2 3 for balanced, vanguard, maverick, juggernaut
    //TODO check this ordering
    try {
      setDeck(_.clone(deck).setIncome(x));
    } catch (error) {
      global.throw("income set error", 0, error);
    }
  };

  //render
  //const [hasError, setHasError] = useState(0); //0-no error, 1-uploading, 2-done
  const [DB, setDB] = useState();
  if (!DB) {
    Honey.Firebase.collection("zip")
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

  //TODO
  API.addUnit = x => {
    try {
      setDeck(_.clone(deck).addUnit(x));
    } catch (error) {
      global.throw("addUnit error", 0, error);
    }
  };
  API.deleteUnit = x => {
    try {
      setDeck(_.clone(deck).deleteUnit(x));
    } catch (error) {
      global.throw("deleteUnit error", 0, error);
    }
  };
  API.toggleRandomizer = () => {
    //TODO can probably be self-contained in the module
    console.log("NOT IMPLEMENTED: toggleRandomizer");
  };

  if (Honey.ActiveTab === "DeckBuilder") {
    return (
      <DeckBuilder
        DB={DB}
        Deck={deck}
        API={API}
        Preload={Honey.ShareDeckCode}
        Afterload={Honey.makeShare}
      />
    );
  } else if (Honey.ActiveTab === "Database") {
    return <Database DB={DB} FB={Honey.Firebase} />;
  } else if (Honey.ActiveTab === "DeckDB") {
    return <div>DeckDB</div>;
  } else if (Honey.ActiveTab === "ReplayDB") {
    return <div>replayDB fragment</div>;
  } else {
    return null;
  }
}

export default SD2;
