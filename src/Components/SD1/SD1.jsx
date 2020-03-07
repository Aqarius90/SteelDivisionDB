import React, { Component } from "react";
import DDB from "./DDB/DDB";
import RDB from "./RDB/RDB";
import DeckBuilder from "./DeckBuilderComponents/DeckBuilder";
import DeckAssembly from "./js/DeckAssembly";
import Database from "./Database/Database";
import firebase from "../../js/Firestore";
import pako from "pako";
import { useParams, useHistory } from "react-router-dom";
import {
  //separate file, for housekeeping
  setDeck,
  addUnit,
  deleteUnit,
  showUnit,
  isValid,
  getUsedCount,
  sortBy,
  parseDeckCode,
  setDeckCode,
  toggleRandomizer,
  hideUnit
} from "./js/API";

class SD1 extends Component {
  constructor() {
    super();

    //binding helper functions to use setState, purely to save space.
    this.setDeck = setDeck.bind(this);
    this.addUnit = addUnit.bind(this);
    this.deleteUnit = deleteUnit.bind(this);
    this.showUnit = showUnit.bind(this);
    this.hideUnit = hideUnit.bind(this);
    this.sortBy = sortBy.bind(this);
    this.isValid = isValid.bind(this);
    this.getUsedCount = getUsedCount.bind(this);
    this.toggleRandomizer = toggleRandomizer.bind(this);

    this.setDeckCode = setDeckCode.bind(this);
    this.parseDeckCode = parseDeckCode.bind(this);

    this.state = {
      //UI
      code: "", //a null confuses the input form
      API: {
        parseDeckCode: this.parseDeckCode,
        setDeckCode: this.setDeckCode
      },

      //GameData
      DB: null, //list of decks, full deck loaded as needed (cheaper, faster)
      DeckBuilder: {
        Deck: null,
        UnitsToDisplay: [], //detailed display list
        RandomizerDecks: [], //decks to include in randomization
        DBUnits: [[], [], [], [], [], [], [], []], //valid units, per cat
        DeckUnits: [[], [], [], [], [], [], [], []], //deck units, per cat
        API: {
          setDeck: this.setDeck,
          addUnit: this.addUnit,
          deleteUnit: this.deleteUnit,
          showUnit: this.showUnit,
          hideUnit: this.hideUnit,
          sortBy: this.sortBy,
          isValid: this.isValid,
          getUsedCount: this.getUsedCount,
          toggleRandomizer: this.toggleRandomizer
        }
      }
    };
  }

  initData = () => {
    console.log("initData");
    let deckbuilder = this.state.DeckBuilder;
    deckbuilder.Deck = new DeckAssembly();
    firebase
      .firestore()
      .collection("zip")
      .doc("SD1")
      .get()
      .then(queryDocumentSnapshot => {
        var inflated = JSON.parse(
          pako.inflate(queryDocumentSnapshot.data().d, { to: "string" })
        );
        let db = inflated;
        /*fold ammo into DB*/
        /*should have been done earlier, but there were size constraints*/

        db.Decks.forEach(d => {
          d.PackList.forEach(u => {
            if (u.Unit.WeaponsDescriptor) {
              u.Unit.WeaponsDescriptor.Turrets.forEach(t => {
                t.WeaponList.forEach(w => {
                  w.Ammunition = db.Ammo.find(
                    x => x.AmmoDescriptor === w.Ammunition
                  );
                });
              });
            }
            if (u.Unit.Offmap) {
              u.Unit.Offmap.Turrets.forEach(t => {
                t.WeaponList.forEach(w => {
                  w.Ammunition = db.Ammo.find(
                    x => x.AmmoDescriptor === w.Ammunition
                  );
                });
              });
            }
            if (u.TransportUnit) {
              if (u.TransportUnit.WeaponsDescriptor) {
                u.TransportUnit.WeaponsDescriptor.Turrets.forEach(t => {
                  t.WeaponList.forEach(w => {
                    w.Ammunition = db.Ammo.find(
                      x => x.AmmoDescriptor === w.Ammunition
                    );
                  });
                });
              }
              if (u.TransportUnit.Offmap) {
                u.TransportUnit.Offmap.Turrets.forEach(t => {
                  t.WeaponList.forEach(w => {
                    w.Ammunition = db.Ammo.find(
                      x => x.AmmoDescriptor === w.Ammunition
                    );
                  });
                });
              }
            }
          });
        });
        this.setState({
          DB: db.Decks,
          DeckBuilder: deckbuilder,
          isLoading: false
        });
      });
  };

  kjsdfkjkj = x => {
    let history = useHistory();
    history.push(
      "/SteelDivisionDB/" +
        this.props.Honey.params.DB +
        "/" +
        this.props.Honey.params.Page +
        "/" +
        x
    );
  };

  render() {
    if (this.state.DB === null) {
      this.initData();
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
      switch (this.props.Honey.params.Page) {
        case "DeckBuilder":
          return (
            <DeckBuilder
              Honey={this.state}
              pload={this.props.Honey.params.code}
            />
          );
        case "Database":
          return <Database DB={this.state.DB} />;

        case "DDB":
          if (!this.props.Honey.User) {
            return (
              <div>
                <div
                  className="modal-dialog"
                  onClick={e => e.stopPropagation()}
                >
                  <div className="modal-content">
                    <div className="modal-header"></div>
                    <div className="modal-body">
                      <button
                        className="btn btn-primary btn-block"
                        onClick={this.props.API.logIn}
                      >
                        Login
                      </button>
                    </div>
                    <div className="modal-footer"></div>
                  </div>
                </div>
              </div>
            );
          }
          return this.props.Honey.User ? (
            <DDB
              Honey={{
                DB: this.state.DB,
                import: this.props.Honey.params.code,
                user: this.props.Honey.User.uid
              }}
              API={{
                export: this.state.API.parseDeckCode
              }}
            />
          ) : (
            <></>
          );
        case "RDB":
          if (!this.props.Honey.User) {
            return (
              <div>
                <div
                  className="modal-dialog"
                  onClick={e => e.stopPropagation()}
                >
                  <div className="modal-content">
                    <div className="modal-header"></div>
                    <div className="modal-body">
                      <button
                        className="btn btn-primary btn-block"
                        onClick={this.props.API.logIn}
                      >
                        Login
                      </button>
                    </div>
                    <div className="modal-footer"></div>
                  </div>
                </div>
              </div>
            );
          }
          return this.props.Honey.User ? (
            <RDB
              Honey={{
                DB: this.state.DB,
                import: this.props.Honey.params.code,
                user: this.props.Honey.User.uid
              }}
              API={{
                export: this.state.API.parseDeckCode
              }}
            />
          ) : (
            <></>
          );
        default:
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
    }
  }
}

export default SD1;
