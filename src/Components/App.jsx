import React, { Component } from "react";
import Header from "./Header";
import DeckCodeParser from "./DeckCodeParser";
import RightPanel from "./DeckBuilderRight/RightPanel";
import LeftPanel from "./DeckBuilderLeft/LeftPanel";
import dict from "../Database.json"; //for dev purposes
import DeckAssembly from "../js/DeckAssembly";
import fetchUnit from "../js/fetchers";
import cloneDeep from "lodash/cloneDeep";
import DeckDB from "./DeckDBComponents/DeckDB";
import ReplayDB from "./ReplayDBComponents/ReplayDB";
import SkyLight from "react-skylight";
import UploadDialog from "./UploadDialog";

import firebase from "../js/Firestore";

class app extends Component {
  constructor() {
    super();
    const db = firebase.firestore();
    const fb = firebase.storage().ref();

    // Disable deprecated features
    db.settings({
      timestampsInSnapshots: true
    });
    this.state = {
      //UI
      code: "", //a null confuses the input form
      isDBLoaded: false,
      isDBLoading: false,
      showDeckListUI: false, //all Firestore UI in this tab
      DBUnits: [[], [], [], [], [], [], [], []],
      DeckUnits: [[], [], [], [], [], [], [], []],
      UnitsToDisplay: [],
      RandomizerDecks: [],

      //data
      User: null,
      Token: null,
      Firebase: db,
      Storage: fb,
      DB: null,
      Deck: new DeckAssembly(),

      //state modifiers
      LogInButtonText: "Login",
      ActiveTab: "Deck Builder",

      //share deck component (data here for retention)
      DeckDB: {
        FullDeckList: null, //full DB list
        DeckList: null, //DB list, post filter
        FilterParam: null,
        SelectedDeckCode: "",
        SelectedDeckObject: null,
        DeckUnits: [[], [], [], [], [], [], [], []],
        sortby: null,
        API: {
          filter: this.deckListFilter,
          gotoPage: this.deckListGoTo,
          vote: this.deckListVote,
          showDeck: this.deckListGet,
          editDeck: this.deckListSet,
          editHeader: this.deckListEdit,
          deleteDeck: this.deckListDelete,
          uploadDeck: this.deckListUpload
        }
      },
      //same as above, but for replay db
      ReplayDB: {
        ReplayList: null,
        sortby: null,
        Replay: null,
        ReplayDecks: null,
        IsUploading: null,
        API: {
          filter: this.replayFilter,
          gotoPage: this.replayGoTo,
          vote: this.replayVote,
          showReplay: this.replayGet,
          editDeck: this.ReplayDeckSet,
          deleteReplay: this.replayDelete,
          showUpload: this.replayShowUpload,
          upload: this.replayUpload
        }
      },

      API: {
        //interface
        dbLoading: this.dbLoading,
        dbLoaded: this.dbLoaded,
        getDeckCode: this.getDeckCode,
        showUnit: this.showUnit,
        hideUnit: this.hideUnit,
        sortBy: this.sortBy,
        isValid: this.isValid,
        getUsedCount: this.getUsedCount,
        setActiveTab: this.setActiveTab,
        logIn: this.logIn,
        logout: this.logOut,

        //header
        toggleDeckList: this.toggleDeckList,

        //deck change
        setDeck: this.setDeck,
        setDeckCode: this.setDeckCode,
        autofill: this.autofill,
        parseString: this.parseString,
        addUnit: this.addUnit,
        deleteUnit: this.deleteUnit
      }
    };
  }

  componentDidMount() {
    //this.loadDecks();
  }

  loadDecks = x => {
    if (this.state.DeckDB.sortBy === null) {
      return;
    }
    let DeckList = [];
    //TODO pagination
    let ref = null;
    if (x === "new") {
      ref = this.state.Firebase.collection("SubmittedDecks").orderBy(
        "Uploaded",
        "desc"
      );
      //.limit(15);
    } else if (x === "score") {
      ref = this.state.Firebase.collection("SubmittedDecks").orderBy(
        "ScoreCount",
        "desc"
      );
      //.limit(15);
    }
    ref
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          DeckList.push(doc.data());
          DeckList[DeckList.length - 1].ID = doc.id;
        });
        let deckdb = this.state.DeckDB;
        deckdb.FullDeckList = DeckList;
        deckdb.DeckList = DeckList;
        this.setState({ DeckDB: deckdb });
      })
      .catch(function(error) {
        console.error("Get error: ", error);
      });
  };

  loadReplays = x => {
    if (this.state.ReplayDB.sortBy === null) {
      return;
    }
    let ReplayList = [];
    //TODO pagination
    let ref = null;
    if (x === "new") {
      ref = this.state.Firebase.collection("SubmittedReplays").orderBy(
        "Uploaded",
        "desc"
      );
      //.limit(15);
    } else if (x === "score") {
      ref = this.state.Firebase.collection("SubmittedReplays").orderBy(
        "ScoreCount",
        "desc"
      );
      //.limit(15);
    }
    ref
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          ReplayList.push(doc.data());
          ReplayList[ReplayList.length - 1].ID = doc.id;
        });
        let ReplayDB = this.state.ReplayDB;
        ReplayDB.ReplayList = ReplayList;
        this.setState({ ReplayDB: ReplayDB });
      })
      .catch(function(error) {
        console.error("Get error: ", error);
      });
  };

  deckListDelete = x => {
    this.state.Firebase.collection("SubmittedDecks")
      .doc(x.ID)
      .delete()
      .then(() => {
        this.loadDecks(this.state.DeckDB.sortby);
      })
      .catch(function(error) {
        console.error("Error removing document: ", error);
      });
  };

  replayDelete = x => {
    this.state.Firebase.collection("SubmittedReplays")
      .doc(x.ID)
      .delete()
      .then(() => {
        this.state.Storage.child(x.ID + "/" + x.gameID + ".rpl")
          .delete()
          .then(() => {
            console.log("file deleted");
            this.loadDecks(this.state.ReplayDB.sortby);
          })
          .catch(function(error) {
            console.error("Error removing document: ", error);
          });
      })
      .catch(function(error) {
        console.error("Error removing document: ", error);
      });
  };

  deckListUpload = x => {
    if (this.state.User !== null) {
      let newDeck = {
        Name: x.Name,
        Description: x.Description,
        Division: this.state.DeckDB.SelectedDeck.Emblem,
        Score: [this.state.User.uid],
        ScoreCount: 1,
        Side: this.state.DeckDB.SelectedDeck.DivisionNationalite,
        UID: this.state.User.uid,
        by: x.Author,
        code: this.state.DeckDB.SelectedDeckCode
      };
      this.state.Firebase.collection("SubmittedDecks")
        .add(newDeck)
        .then(() => {
          this.loadDecks(this.state.DeckDB.sortby);
        })
        .catch(function(error) {
          console.error("Error removing document: ", error);
        });
    } else {
      this.PleaseLogIn.show();
    }
  };

  replayShowUpload = () => {
    this.uploadDialog.show();
  };

  replayUpload = (r, f) => {
    if (this.state.User !== null) {
      if (r === null || f === null) {
        return;
      } else {
        //set loading text
        let replay = this.state.ReplayDB;
        replay.IsUploading = true;
        this.setState({ ReplayDB: replay });

        //replay DB entry
        r.UID = this.state.User.uid;
        r.Score = [this.state.User.uid];
        r.ScoreCount = 1;

        let metadata = { type: "SD1" };
        let filename = r.gameID + ".rpl3";

        //upload
        this.state.Firebase.collection("SubmittedReplays")
          .add(r)
          .then(docRef => {
            //document path is DB ID/UUID
            let ID = docRef.id;
            this.state.Storage.child(ID + "/" + filename)
              .put(f, metadata)
              .then(snapshot =>
                snapshot.ref
                  .getDownloadURL()
                  .then(url => {
                    //set DL URL to DB
                    this.state.Firebase.collection("SubmittedReplays")
                      .doc(ID)
                      .update({ DL: url });

                    this.ReplayDB(this.state.ReplayDB.sortby);

                    let replay = this.state.ReplayDB;
                    replay.IsUploading = true;
                    this.setState({ ReplayDB: replay });
                    this.uploadDialog.hide();
                  })
                  .catch(function(error) {
                    console.error("URL error: ", error);
                  })
              )
              .catch(function(error) {
                console.error("Error adding document: ", error);
              });
          })
          .catch(function(error) {
            console.error("Error adding document: ", error);
          });
      }
    } else {
      this.uploadDialog.hide();
      this.PleaseLogIn.show();
    }
  };

  deckListFilter = x => {
    let deckdb = this.state.DeckDB;
    deckdb.sortby = x;
    this.setState({ DeckDB: deckdb });
    this.loadDecks(x);
  };

  replayFilter = x => {
    let ReplayDB = this.state.ReplayDB;
    ReplayDB.sortby = x;
    this.setState({ ReplayDB: ReplayDB });
    this.loadReplays(x);
  };

  /*
  deckListFilter = x => {
    let test = x;
    let newDeckList = this.state.DeckDB.FullDeckList.filter(deck => {
      if (
        (test.DeckName === "" || deck.Name.includes(test.DeckName)) &&
        (test.Division === "" ||
          deck.Division === test.Division ||
          test.Division === deck.Side ||
          test.Division === "all") &&
        (test.Author === "" || deck.by.includes(test.Author)) &&
        (test.Score === "" || deck.Score.length >= test.Score)
      ) {
        return true;
      }
      return false;
    });

    let deckdb = this.state.DeckDB;
    deckdb.DeckList = newDeckList;
    this.setState({ DeckDB: deckdb });
  };*/

  deckListVote = x => {
    if (this.state.User === null) {
      return;
    }
    if (x.Score.includes(this.state.User.uid)) {
      var index = x.Score.indexOf(this.state.User.uid);
      if (index > -1) {
        x.Score.splice(index, 1);
      }
      x.ScoreCount--;
    } else {
      x.Score.push(this.state.User.uid);
      x.ScoreCount++;
    }
    this.state.Firebase.collection("SubmittedDecks")
      .doc(x.ID)
      .update({ Score: x.Score, ScoreCount: x.ScoreCount });
    //triggers another data load. should circumvent, maybe
    this.loadDecks(this.state.DeckDB.sortby);
  };

  replayVote = x => {
    if (this.state.User === null) {
      return;
    }
    if (x.Score.includes(this.state.User.uid)) {
      var index = x.Score.indexOf(this.state.User.uid);
      if (index > -1) {
        x.Score.splice(index, 1);
      }
      x.ScoreCount--;
    } else {
      x.Score.push(this.state.User.uid);
      x.ScoreCount++;
    }
    this.state.Firebase.collection("SubmittedDecks")
      .doc(x.ID)
      .update({ Score: x.Score, ScoreCount: x.ScoreCount });
    //triggers another data load. should circumvent, maybe
    this.loadDecks(this.state.ReplayDB.sortby);
  };

  deckListGet = x => {
    let deckObject = x;
    let newDeck = new DeckAssembly();
    if (deckObject === null) {
      newDeck.decodeDeck(this.state.code, this.state.DB);
      //set blank object, to fill later
      deckObject = {
        Name: "untitled",
        Division: newDeck.Emblem,
        Description: "",
        Side: newDeck.DivisionNationalite,
        Author: "", //if not logged in, will be added before upload
        UID: "",
        Score: [],
        ScoreCount: 0,
        code: newDeck.ExportCode
      };
    } else {
      newDeck.decodeDeck(x.code, this.state.DB);
    }
    let newCode = newDeck.ExportCode;

    let deckdb = this.state.DeckDB;
    deckdb.SelectedDeck = newDeck;
    deckdb.SelectedDeckCode = newCode;
    deckdb.SelectedDeckObject = deckObject;
    deckdb.DeckUnits = this.parseUnitPure(newDeck.Cards);
    this.setState({ DeckDB: deckdb });
  };

  replayGet = x => {
    let Arr = [];
    for (let i = 0; i < x.Players.length; i++) {
      Arr.push({});
      Arr[i].Player = x.Players[i];
      let foo = new DeckAssembly();
      foo.decodeDeck(x.Decks[i], this.state.DB);
      Arr[i].Deck = foo;
    }

    let ReplayDB = this.state.ReplayDB;
    ReplayDB.Replay = x;
    ReplayDB.ReplayDecks = Arr;
    this.setState({ ReplayDB: ReplayDB });
  };

  deckListEdit = x => {
    let deckdb = this.state.DeckDB;
    deckdb.SelectedDeckObject.Name = x.Name;
    deckdb.SelectedDeckObject.Description = x.Description;
    this.setState({ DeckDB: deckdb });
  };

  deckListSet = () => {
    this.parseString(this.state.DeckDB.SelectedDeckCode);
  };

  ReplayDeckSet = x => {
    this.parseString(x.ExportCode);
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

  /**toggle between deck builder and deck DB */
  setActiveTab = x => {
    this.setState({ ActiveTab: x });
  };

  /**UI ties */
  dbLoading = () => {
    this.setState({ isDBLoading: true });
  };
  dbLoaded = () => {
    this.setState({ isDBloading: false, isDBLoaded: true });
  };
  getDeckCode = () => {
    return this.state.code;
  };
  setDeckCode = x => {
    this.setState({ code: x });
  };

  /**unit detail wiew */
  showUnit = x => {
    if (
      this.state.UnitsToDisplay.filter(e => e.EncodeInt === x.EncodeInt)
        .length === 0
    ) {
      let newstr = this.state.UnitsToDisplay;
      newstr.push(x);
      this.setState({ UnitsToDisplay: newstr });
    }
  };
  hideUnit = x => {
    let newstr = this.state.UnitsToDisplay;
    newstr.splice(newstr.indexOf(x), 1);
    this.setState({ UnitsToDisplay: newstr });
  };

  /**sort units list, u and x are parts of the object holding the vars*/
  sortBy = (u, x) => {
    console.log("sortby"); //debug, to check if it's even called
    let newArray = this.state.DBUnits;
    if (u === 0) {
      for (let i = 0; i < newArray.length; i++) {
        newArray[i].sort(function(a, b) {
          return a[x] > b[x] ? 1 : b[x] > a[x] ? -1 : 0;
        });
      }
    } else if (u === 1) {
      for (let i = 0; i < newArray.length; i++) {
        newArray[i].sort(function(a, b) {
          return a.Unit[x] > b.Unit[x] ? 1 : b.Unit[x] > a.Unit[x] ? -1 : 0;
        });
      }
    } else if (u === 2) {
      for (let i = 0; i < newArray.length; i++) {
        newArray[i].sort(function(a, b) {
          if (a.TransportUnit === null) return 0;
          if (b.TransportUnit === null) return 1;
          return a.TransportUnit[x] > b.TransportUnit[x]
            ? 1
            : b.TransportUnit[x] > a.TransportUnit[x]
            ? -1
            : 0;
        });
      }
    }
    this.setState({ DBUnits: newArray });
  };

  /**cheks if unit is valid */
  isValid = x => {
    if (
      this.state.Deck.PackList.filter(e => e.Descriptor === x.Descriptor)
        .length > 0 &&
      this.state.Deck.Cards.filter(e => e.Descriptor === x.Descriptor).length <=
        x.PackAvailabilty
    ) {
      return true;
    }
    return false;
  };

  /**counts used unit cards*/
  getUsedCount = x => {
    return this.state.Deck.Cards.filter(e => e.Descriptor === x.Descriptor)
      .length;
  };

  //deck change
  parseString = x => {
    let newDeck = new DeckAssembly();
    newDeck = newDeck.decodeDeck(x, this.state.DB);
    let newCode = newDeck.ExportCode;
    this.parseUnits(newDeck, 0);
    this.parseUnits(newDeck, 1);
    this.setState({ Deck: newDeck, code: newCode });
  };

  toggleRandomizer = x => {
    let newState;
    if (x === "Allied" || x === "Axis") {
      newState = this.state.DB.Decks.filter(e => e.DivisionNationalite === x);
    } else {
      newState = this.state.RandomizerDecks;
      if (newState.filter(e => e === x).length > 0) {
        newState.splice(newState.indexOf(x), 1);
      } else {
        newState.push(x);
      }
    }
    this.setState({ RandomizerDecks: newState });
  };

  autofill = x => {
    let newDeck = new DeckAssembly();
    newDeck = newDeck.decodeDeck("", this.state.DB);
    newDeck = newDeck.setDeck(x);
    let cardsToUse = cloneDeep(newDeck.PackList);
    let matrix = [0, 0, 0, 0, 0, 0, 0, 0];
    while (newDeck.DeckPointsTotal > newDeck.Cards.length) {
      let rand = Math.floor(Math.random() * cardsToUse.length);
      let factory = 8;
      switch (cardsToUse[rand].Factory) {
        case "Reco":
          factory = 0;
          break;
        case "Infanterie":
          factory = 1;
          break;
        case "Tank":
          factory = 2;
          break;
        case "Support":
          factory = 3;
          break;
        case "AT":
          factory = 4;
          break;
        case "DCA":
          factory = 5;
          break;
        case "Art":
          factory = 6;
          break;
        case "Air":
          factory = 7;
          break;
        default: {
          console.log("UnitParseError: autofill");
        }
      }
      if (newDeck.CostMatrix[factory][matrix[factory]] === 1) {
        matrix[factory]++;
        newDeck.addUnit(cardsToUse[rand]);
      }
      cardsToUse.splice(rand, 1);
    }
    this.parseUnits(newDeck, 0);
    this.parseUnits(newDeck, 1);
    let newCode = newDeck.ExportCode;
    this.setState({ Deck: newDeck, code: newCode });
  };

  setDeck = x => {
    let newDeck = this.state.Deck.setDeck(x);
    let newCode = newDeck.ExportCode;
    this.parseUnits(newDeck, 0);
    this.parseUnits(newDeck, 1);
    this.setState({ Deck: newDeck, code: newCode });
  };

  addUnit = x => {
    if (this.state.Deck.PackList.filter(e => e === x).length > 0) {
      let newDeck = this.state.Deck.addUnit(x);
      let newCode = newDeck.ExportCode;
      this.parseUnits(newDeck, 1);
      this.setState({ Deck: newDeck, code: newCode });
    }
  };

  deleteUnit = x => {
    let newDeck = this.state.Deck.deleteUnit(x);
    let newCode = newDeck.ExportCode;
    this.parseUnits(newDeck, 1);
    this.setState({ Deck: newDeck, code: newCode });
  };

  parseUnitPure(data) {
    let x = [[], [], [], [], [], [], [], []];
    for (let i = 0; i < data.length; i++) {
      switch (data[i].Factory) {
        case "Reco":
          x[0].push(data[i]);
          break;
        case "Infanterie":
          x[1].push(data[i]);
          break;
        case "Tank":
          x[2].push(data[i]);
          break;
        case "Support":
          x[3].push(data[i]);
          break;
        case "AT":
          x[4].push(data[i]);
          break;
        case "DCA":
          x[5].push(data[i]);
          break;
        case "Art":
          x[6].push(data[i]);
          break;
        case "Air":
          x[7].push(data[i]);
          break;
        default: {
          console.log("UnitParseError: " + data[i].Factory);
        }
      }
    }
    return x;
  }

  parseUnits(input, selector = 1) {
    //x is 0 for deck, 1 for content

    let data = "";
    if (selector === 0) {
      data = input.PackList;
    } else if (selector === 1) {
      data = input.Cards;
    }
    let x = this.parseUnitPure(data);
    if (selector === 0) {
      this.setState({ DBUnits: x });
    } else if (selector === 1) {
      for (let i = 0; i < 8; i++) {
        // interpolate with CostMatrix for display
        while (x[i].length < 10 && input.CostMatrix[i].length >= x[i].length) {
          x[i].push(input.CostMatrix[i][x[i].length]);
        }
      }
      this.setState({ DeckUnits: x });
    }
  }

  //renders
  showDBInterface = () => {
    if (this.state.isDBLoading) {
      return <div className="lds-dual-ring" />;
    } else {
      if (!this.state.isDBLoaded) {
        return (
          <React.Fragment>
            <div className="row">
              <div className="col-xl">
                <button
                  className="btn btn-default btn-block"
                  onClick={this.loadDefaultDB}
                >
                  LOAD DATABASE
                </button>
              </div>
            </div>
          </React.Fragment>
        );
      } else {
        if (this.state.ActiveTab === "Deck Builder") {
          return (
            <React.Fragment>
              <div className="card">
                <DeckCodeParser
                  Deck={this.state.Deck}
                  code={this.state.code}
                  API={this.state.API}
                />
              </div>
              <div className="row">
                <div className="col-xl-7">
                  <LeftPanel
                    DB={this.state.DB}
                    Deck={this.state.Deck}
                    DBUnits={this.state.DBUnits}
                    DeckUnits={this.state.DeckUnits}
                    RandomizerDecks={this.state.RandomizerDecks}
                    f={this.state.API}
                  />
                </div>
                <div className="col-xl-5">
                  <RightPanel
                    DB={this.state.DB}
                    UnitsToDisplay={this.state.UnitsToDisplay}
                    fshow={this.state.API.showUnit}
                    fhide={this.state.API.hideUnit}
                    fadd={this.state.API.addUnit}
                  />
                </div>
              </div>
            </React.Fragment>
          );
        } else if (this.state.ActiveTab === "Deck DB") {
          return (
            <React.Fragment>
              <div className="card">
                <DeckCodeParser
                  Deck={this.state.Deck}
                  code={this.state.code}
                  API={this.state.API}
                />
              </div>
              <DeckDB
                DB={this.state.DB}
                deckDB={this.state.DeckDB}
                DeckUnits={this.state.DeckUnits}
                User={this.state.User}
              />
            </React.Fragment>
          );
        } else if (this.state.ActiveTab === "Replay DB") {
          return (
            <React.Fragment>
              <div className="card">
                <DeckCodeParser
                  Deck={this.state.Deck}
                  code={this.state.code}
                  API={this.state.API}
                />
              </div>
              <ReplayDB
                DB={this.state.DB}
                ReplayDB={this.state.ReplayDB}
                User={this.state.User}
                upload={this.state.ReplayDB.API.showUpload}
                filter={this.state.ReplayDB.API.filter}
              />
            </React.Fragment>
          );
        } else {
          return null;
        }
      }
    }
  };

  loadDefaultDB = () => {
    this.setState({ isDBloading: true });
    let newDB = dict;
    newDB.Packs = []; //required for edge case of decoding a deck with units from another division
    for (let i = 0; i < newDB.Decks.length; i++) {
      for (let j = 0; j < newDB.Decks[i].PackList.length; j++) {
        newDB.Packs.push(newDB.Decks[i].PackList[j]);
        newDB.Decks[i].PackList[j].Unit = fetchUnit(
          newDB.Decks[i].PackList[j].Unit,
          newDB
        );

        newDB.Decks[i].PackList[j].TransportUnit = fetchUnit(
          newDB.Decks[i].PackList[j].TransportUnit,
          newDB
        );
      }
    }
    this.setState({ DB: newDB });
    this.setState({ isDBLoaded: true });
  };

  render() {
    return (
      <div className="container">
        <div className="card">
          <Header
            ActiveTab={this.state.ActiveTab}
            setActiveTab={this.state.API.setActiveTab}
            LogIn={this.state.API.logIn}
            LogInButtonText={this.state.LogInButtonText}
            DeckListButtonText={this.state.DeckListButtonText}
            toggleDeckList={this.state.API.toggleDeckList}
          />
        </div>
        <SkyLight hideOnOverlayClicked ref={ref => (this.PleaseLogIn = ref)}>
          Please Log In
        </SkyLight>
        <SkyLight
          hideOnOverlayClicked
          ref={ref => (this.uploadDialog = ref)}
          title={
            <UploadDialog
              upload={this.state.ReplayDB.API.upload}
              IsUploading={this.state.ReplayDB.IsUploading}
            />
          }
        />
        {this.showDBInterface()}
      </div>
    );
  }
}

export default app;
