import React, { Component } from "react";
import Header from "./Header";
import DeckCodeParser from "./DeckCodeParser";
import RightPanel from "./RightPanel";
import LeftPanel from "./LeftPanel";
import dict from "../Database.json"; //for dev purposes
import DeckAssembly from "../js/DeckAssembly";
import fetchUnit from "../js/fetchers";

class app extends Component {
  constructor() {
    super();
    this.state = {
      //UI
      code: "",
      isDBLoaded: false,
      isDBLoading: false,
      DBUnits: [[], [], [], [], [], [], [], []],
      DeckUnits: [[], [], [], [], [], [], [], []],
      UnitsToDisplay: [],

      //data
      DB: "",
      Deck: new DeckAssembly(),

      //state modifiers
      API: ""
    };
    this.state.API = {
      //interface
      dbLoading: this.dbLoading,
      dbLoaded: this.dbLoaded,
      getDeckCode: this.getDeckCode,
      showUnit: this.showUnit,
      hideUnit: this.hideUnit,
      sortBy: this.sortBy,
      isValid: this.isValid,
      getUsedCount: this.getUsedCount,

      //deck change
      setDeck: this.setDeck,
      setDeckCode: this.setDeckCode,
      parseCode: this.parseCode,
      parseNull: this.parseNull,
      addUnit: this.addUnit,
      deleteUnit: this.deleteUnit
    };
  }

  componentDidMount() {}

  //interface
  dbLoading = () => {
    this.setState({ isDBLoading: true });
  };
  dbLoaded = () => {
    this.setState({ isDBloading: false, isDBLoaded: true });
  };
  getDeckCode = () => {
    return this.state.code;
  };
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
  setDeckCode = x => {
    this.setState({ code: x });
  };
  sortBy = (u, x) => {
    console.log("sortby");
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
  getUsedCount = x => {
    return this.state.Deck.Cards.filter(e => e.Descriptor === x.Descriptor)
      .length;
  };

  //deck change
  parseNull = () => {
    let newDeck = new DeckAssembly();
    newDeck = newDeck.decodeDeck("", this.state.DB);
    let newCode = newDeck.ExportCode;
    this.parseUnits(newDeck, 0);
    this.parseUnits(newDeck, 1);
    this.setState({ Deck: newDeck, code: newCode });
  };

  parseCode = () => {
    let newDeck = new DeckAssembly();
    newDeck.decodeDeck(this.state.code, this.state.DB);
    let newCode = newDeck.ExportCode;
    this.parseUnits(newDeck, 0);
    this.parseUnits(newDeck, 1);
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

  parseUnits(input, selector) {
    //x is 0 for deck, 1 for content
    let x = [[], [], [], [], [], [], [], []];

    let data = "";
    if (selector === 0) {
      data = input.PackList;
    } else if (selector === 1) {
      data = input.Cards;
    }

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
            <div className="card">
              <Header />
              <div className="row">
                <div className="col-sm">
                  <button
                    className="btn btn-default btn-block"
                    onClick={this.loadDefaultDB}
                  >
                    LOAD DATABASE
                  </button>
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      } else {
        //actual, main program
        return (
          <React.Fragment>
            <div className="card">
              <Header />
              <DeckCodeParser
                Deck={this.state.Deck}
                code={this.state.code}
                fset={this.state.API.setDeckCode}
                fparse={this.state.API.parseCode}
                fparsenull={this.state.API.parseNull}
                fget={this.state.API.getDeckCode}
              />
            </div>
            <div className="row">
              <div className="col-sm-7">
                <LeftPanel
                  DB={this.state.DB}
                  Deck={this.state.Deck}
                  DBUnits={this.state.DBUnits}
                  DeckUnits={this.state.DeckUnits}
                  f={this.state.API}
                />
              </div>
              <div className="col-sm-5">
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
      }
    }
  };

  loadDefaultDB = () => {
    this.setState({ isDBloading: true });
    let newDB = dict;
    for (let i = 0; i < newDB.Decks.length; i++) {
      for (let j = 0; j < newDB.Decks[i].PackList.length; j++) {
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

  loadCustomDB = () => {
    //this.setState({ isDBLoaded: true });
  };

  render() {
    return <div className="container">{this.showDBInterface()}</div>;
  }
}

export default app;
