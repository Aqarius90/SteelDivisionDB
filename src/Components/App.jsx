import React, { Component } from "react";
import firebase from "../js/Firestore";
import Header from "./Header";
import SD1 from "./SD1/SD1";
import SD2 from "./SD2/SD2";
import SkyLight from "react-skylight";

//import dict from "../Database.json"; //for dev purposes
//import FirestoreInit from "../js/FirestoreInit";

/* deflater test loop
var pako = require("pako");

var binaryString = pako.deflate(JSON.stringify(dict), { to: "string" });
firebase
  .firestore()
  .collection("test")
  .doc("deflateTest")
  .set({ binaryString })
  .catch(function(error) {
    console.error("Get error: ", error);
  })
  .then(x => {
    firebase
      .firestore()
      .collection("test")
      .doc("deflateTest")
      .get()
      .then(queryDocumentSnapshot => {
        var returner = queryDocumentSnapshot.data().binaryString;
        var restored = JSON.parse(pako.inflate(returner, { to: "string" }));
        console.log(restored);
      });
  });
  */

require("dotenv").config();

global.debug = true;

class app extends Component {
  constructor() {
    super();
    const db = firebase.firestore();
    const fb = firebase.storage().ref();

    this.state = {
      //UI
      loadedDB: null, //parsed values: SD1, SD2
      ActiveTab: "DBloader", //options: DBloader, DeckBuilder, DeckDB, ReplayDB

      //firebase and auth data
      User: null,
      Token: null,
      Firebase: db,
      Storage: fb,

      setActiveTab: this.setActiveTab,
      logIn: this.logIn,
      logout: this.logOut,
      PleaseLogIn: this.PleaseLogInShow,
      ErrorOut: this.Error
    };
  }

  PleaseLogInShow = () => {
    this.PleaseLogIn.show();
  };

  loadSD1 = () => {
    this.setState({ loadedDB: "SD1", ActiveTab: "DeckBuilder" });
  };

  loadSD2 = () => {
    this.setState({ loadedDB: "SD2", ActiveTab: "DeckBuilder" });
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
    if (this.state.loadedDB === null) {
      return (
        <React.Fragment>
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
        </React.Fragment>
      );
    } else if (this.state.loadedDB === "SD1") {
      return <SD1 Honey={this.state} />;
    } else if (this.state.loadedDB === "SD2") {
      return <SD2 Honey={this.state} />;
    } else {
      console.log(this.state.loadedDB);
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
          An error has occurred
        </SkyLight>
        {this.showDBInterface()}
      </div>
    );
  }
}

export default app;
