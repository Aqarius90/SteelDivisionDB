import React, { useState, useReducer } from "react";
import firebase from "../js/Firestore";
import Header from "./Header";
import SD1 from "./SD1/SD1";
import SD2 from "./SD2/SD2";
import pako from "pako";
//import FirestoreInit from "../js/FirestoreInit";
//import _ from "lodash";
import { UpdateDatabase } from "../js/DatabaseHandlers";

require("dotenv").config();
global.UpdateDatabase = function(x) {
  UpdateDatabase(x);
  return "wait for console";
};

global.debug = true;
global.throw = function(title, vars, error) {
  if (global.debug) {
    console.error(title);
    console.log(vars);
    console.error(error);
  } else {
    console.log(title);
    console.log(error);
    //TODO
    console.error("NOT IMPLEMENTED: errorReport (gg SYSOP)");
  }
};

function App({}) {
  const Preload = window.location.href.split("?");
  const [loadedDB, setLoadedDB] = useState(Preload[1] ? Preload[1] : null);
  const [activeTab, setTab] = useState(Preload[2] ? Preload[2] : "DeckBuilder");
  const [userInput, setuserInput] = useState(Preload[3] ? Preload[3] : "");
  const [userCode, setUserCode] = useState(Preload[3] ? Preload[3] : "");

  //firebase&auth
  const [user, dUser] = useState(null);
  let login = () => {
    if (user) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          dUser(null);
        })
        .catch(function(error) {
          global.throw("logout error", "", error);
        });
    } else {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          dUser(result.user);
        })
        .catch(function(error) {
          global.throw("login error", "", error);
        });
    }
  };

  // render app body
  function showDBInterface() {
    switch (loadedDB) {
      case null:
        return (
          <div className="card">
            <div className="row">
              <div className="col-xl">
                <button
                  className="btn btn-default btn-block"
                  onClick={() => setLoadedDB("SD1")}
                >
                  Steel Division: Normandy 44
                </button>
                <button
                  className="btn btn-default btn-block"
                  onClick={() => setLoadedDB("SD2")}
                >
                  Steel Division 2
                </button>
              </div>
            </div>
          </div>
        );
      case "loading":
        return (
          <div className="card">
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        );
      case "SD1":
        return (
          <SD1
            Honey={{
              ActiveTab: activeTab,
              User: user,
              Preload: userInput
            }}
            API={{ setCode: setUserCode }}
          />
        );
      case "SD2":
        return (
          <SD2
            Honey={{
              ActiveTab: activeTab,
              Preload: userInput
            }}
            API={{ setCode: setUserCode }}
          />
        );

      default:
        global.throw("DB switch error", loadedDB);
        return <h1>ERROR</h1>;
    }
  }

  return (
    <div className="container">
      <div className="card">
        <Header
          Honey={{
            loadedDB: loadedDB,
            ActiveTab: activeTab,
            input: userCode,
            User: user
          }}
          API={{
            setTab: {
              DeckBuilder: () => setTab("DeckBuilder"),
              Database: () => setTab("Database")
            },
            logIn: login
          }}
        />
      </div>
      {showDBInterface()}
    </div>
  );
}

export default App;
