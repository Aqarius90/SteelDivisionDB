import React, { Component } from "react";
import firebase from "../js/Firestore";
import Header from "./Header";
import SD1 from "./SD1/SD1";
import SD2 from "./SD2/SD2";
import SkyLight from "react-skylight";
import pako from "pako";

import DB1 from "../Database1.json";
import DB2 from "../DB2.json";
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

global.shareCode = null;

class app extends Component {
  constructor() {
    let URL = window.location.href;
    let URA = URL.split("?");
    console.log(URA);
    super();
    const db = firebase.firestore();
    const fb = firebase.storage().ref();

    global.shareCode = URA[3] ? URA[3] : null;
    this.state = {
      //UI
      loadedDB: URA[1] ? URA[1] : null, //parsed values: SD1, SD2
      ActiveTab: URA[2] ? URA[2] : "DBloader", //options: DBloader, DeckBuilder, Decks, Replays, Database
      ShareLink: "",
      ShareScreen: false,
      ErrorLink: "",

      //firebase and auth data
      User: null,
      Token: null,
      Firebase: db,
      Storage: fb,

      DB: null,
      setActiveTab: this.setActiveTab,
      logIn: this.logIn,
      logout: this.logOut,
      PleaseLogIn: this.PleaseLogInShow,
      share: this.share,
      ErrorOut: this.Error,
      makeShare: this.makeShare
    };
  }

  PleaseLogInShow = () => {
    this.PleaseLogIn.show();
  };
  share = x => {
    console.log(global.shareCode);
    this.setState({
      ShareLink:
        "https://localhost:3000/SteelDivisionDB/?" +
        this.state.loadedDB +
        "?" +
        this.state.ActiveTab +
        "?" +
        global.shareCode
    });
    this.setState({ ShareScreen: true });
  };

  loadSD1 = () => {
    this.setState({ loadedDB: "loading" });
    this.state.Firebase.collection("zip")
      .doc("SD1")
      .get()
      .then(queryDocumentSnapshot => {
        var inflated = JSON.parse(
          pako.inflate(queryDocumentSnapshot.data().zip1, { to: "string" })
        );
        this.setState({
          loadedDB: "SD1",
          ActiveTab: "DeckBuilder",
          DB: inflated
        });
      });
  };

  loadSD2 = () => {
    this.setState({
      loadedDB: "SD2",
      ActiveTab: "DeckBuilder"
    });
  };

  setActiveTab = x => {
    this.setState({ ActiveTab: x });
  };
  /** auth **/
  logIn = () => {
    if (this.state.User === null) {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          this.setState({
            User: result.user,
            Token: result.credential.accessToken, //I don't really use the token, but W/E
            LogInButtonText: "Logout"
          });
        })
        .catch(function(error) {
          this.Error();
          console.log(error);
        });
    } else {
      this.logOut();
    }
  };
  logOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.setState({
          User: null,
          Token: null,
          LogInButtonText: "Login"
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  // render app body
  showDBInterface = () => {
    switch (this.state.loadedDB) {
      case null:
        return (
          <div className="card">
            <div className="row">
              <div className="col-xl">
                <button
                  className="btn btn-default btn-block"
                  onClick={this.loadSD1}
                >
                  Steel Division: Normandy 44
                </button>
                <button
                  className="btn btn-default btn-block"
                  onClick={this.loadSD2}
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
        return <SD1 Honey={this.state} />;
      case "SD2":
        return <SD2 Honey={this.state} />;

      default:
        global.report("DB switch error", this.state);
        return <h1>ERROR</h1>;
    }
  };

  render() {
    return (
      <div className="container">
        <div className="card">
          <Header Honey={this.state} />
        </div>
        <SkyLight hideOnOverlayClicked ref={ref => (this.PleaseLogIn = ref)}>
          Please Log In
        </SkyLight>
        <SkyLight hideOnOverlayClicked ref={ref => (this.Error = ref)}>
          An error has occurred : {}
        </SkyLight>
        <SkyLight
          hideOnOverlayClicked
          ref={ref => (this.Share = ref)}
          title={
            <div className="card">
              <input
                className="form-control"
                value={this.state.ShareLink}
                type="text"
                readOnly
              />
            </div>
          }
        >
          <input
            className="form-control"
            value={this.state.ShareLink}
            type="text"
            readOnly
          />
        </SkyLight>
        {this.showDBInterface()}
        <div
          className={this.state.ShareScreen ? "d-block" : "d-none"}
          onClick={() =>
            this.setState({ ShareScreen: !this.state.ShareScreen })
          }
        >
          <div className="popup-background"></div>
          <div onClick={e => e.stopPropagation()} className="popup-simple">
            <div className="card justify-content-center">
              <div className="card-header">
                <h3>{this.state.ShareLink}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default app;
