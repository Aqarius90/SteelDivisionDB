import React, { useState } from "react";
import DeckAssembly from "../SD2/js/Deck";
import DeckBuilder from "./DeckBuilder/DeckBuilder";
import Database from "./Database/Database";

import dummyDB from "../../DB2test.json";
//import FirestoreInit from "./js/FirestoreInit";

//TODO add defences in matrix display

function SD2({ Honey }) {
  console.log("SD2 render");
  var API = {}; //empty object to hold all functions used by the rest of the modules

  //deck code
  const [code, setCode] = useState(
    "DCRDGiCEIS0E7FaVQEbxhOwHUCPOOQZiQVSkTlEqHuUhw+ABWiZWmmZOOZJ8ACEJDjlGwgAUJ8ABUnoAFh+AAYcgABkRrjkBkFaQqwABERrjkKuAAUcWABhxYAFSIxbWhKABi2wAGmxAASokPppmQ+kWtgAVEa45ByAAEQIOOA=="
  );
  let handleChange = event => {
    setCode(event.target.value);
  };

  //deck setters
  const [deck, setDeck] = useState(new DeckAssembly());
  API.decode = () => {
    //set deck via deck code
    try {
      let newdeck = new DeckAssembly();
      newdeck.loadFromCode(code, DB);
      setDeck(newdeck);
      setCode(newdeck.DeckCode);
    } catch (error) {
      if (global.debug) {
        console.error(error);
        console.error("deck decode error");
      } else {
        errorReport("deck decode error");
      }
    }
  };
  API.clear = () => {
    //set deck to empty
    let newdeck = new DeckAssembly();
    setDeck(newdeck);
    setCode(newdeck.DeckCode);
  };
  API.setDeck = x => {
    //set deck from DB
    try {
      //TODO keep units on switch?
      let newdeck = new DeckAssembly();
      newdeck.loadFromDB(x, DB);
      setDeck(newdeck);
      setCode(newdeck.DeckCode);
    } catch (error) {
      if (global.debug) {
        console.error(error);
        console.error("deck set error");
      } else {
        errorReport("deck set error");
      }
    }
  };
  API.setIncome = x => {
    //incomes are 0,1 2 3 for balanced, vanguard, maverick, juggernaut
    //TODO check this ordering
    try {
      let newdeck = deck.setIncome(x);
      setDeck(newdeck);
      setCode(newdeck.DeckCode);
      console.log(deck);
    } catch (error) {
      if (global.debug) {
        console.error(error);
        console.error("income set error");
      } else {
        errorReport("income set error");
      }
    }
  };

  //DB handling
  let initData = () => {
    try {
      if (global.debug) {
        console.log("not implemented: dynamic DB loading");
      }
      setDB(dummyDB);
      setLoading(false);
    } catch (error) {
      if (global.debug) {
        console.error(error);
        console.error("DB get error");
      } else {
        errorReport("DB get error");
      }
    }
  };

  //render
  const [isLoading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(0); //0-no error, 1-uploading, 2-done
  const [DB, setDB] = useState(null);

  //TODO
  API.addUnit = x => {
    try {
      let newdeck = deck.addUnit(x);
      setDeck(newdeck);
      setCode(newdeck.DeckCode);
    } catch (error) {
      if (global.debug) {
        console.error(error);
        console.error("addUnit error");
      } else {
        errorReport("addUnit error");
      }
    }
  };
  API.deleteUnit = x => {
    try {
      let newdeck = deck.deleteUnit(x);
      setDeck(newdeck);
      setCode(newdeck.DeckCode);
    } catch (error) {
      if (global.debug) {
        console.error(error);
        console.error("deleteUnit error");
      } else {
        errorReport("deleteUnit error");
      }
    }
  };
  API.toggleRandomizer = () => {
    //TODO can probably be self-contained in the module
    console.log("NOT IMPLEMENTED: toggleRandomizer");
  };

  function errorReport(title, error) {
    //TODO
    console.log("NOT IMPLEMENTED: errorReport");
  }

  if (isLoading) {
    if (!DB) {
      initData();
    }
    return (
      <div className="card">
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    );
  } else {
    if (Honey.ActiveTab === "DeckBuilder") {
      return (
        <React.Fragment>
          <div className="card">
            <div className="row card-body">
              <div className="col-xl-2">
                <h3>
                  {deck.Name} :{deck.ActivPts}/
                  {deck.MaxActivPts /*todo, change to show nothing on 0/0*/}
                </h3>
              </div>
              <div className="col-xl-8">
                <input
                  className="form-control"
                  value={code}
                  type="text"
                  onChange={handleChange}
                />
              </div>
              <div className="col-xl">
                <button className="btn btn-block" onClick={() => API.decode()}>
                  Decode
                </button>
              </div>
              <div className="col-xl">
                <button className="btn btn-block" onClick={() => API.clear()}>
                  Clear
                </button>
              </div>
            </div>
          </div>
          <DeckBuilder DB={DB} Deck={deck} API={API} />
        </React.Fragment>
      );
    } else if (Honey.ActiveTab === "Database") {
      return <Database DB={DB} />;
    } else if (Honey.ActiveTab === "DeckDB") {
      return <div>DeckDB</div>;
    } else if (Honey.ActiveTab === "ReplayDB") {
      return <div>replayDB fragment</div>;
    } else {
      return null;
    }
  }
}

export default SD2;
