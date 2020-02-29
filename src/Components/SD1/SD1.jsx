import React, { Component } from "react";
import DeckDB from "./DeckDBComponents/DeckDB";
import ReplayDB from "./ReplayDBComponents/ReplayDB";
import DeckBuilder from "./DeckBuilderComponents/DeckBuilder";
import DeckAssembly from "./js/DeckAssembly";
import UploadDialog from "./UploadDialog";
import SkyLight from "react-skylight";
import Database from "./Database/Database";
import firebase from "../../js/Firestore";
import pako from "pako";
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
import {
  deckListFilter,
  deckListVote,
  deckListGet,
  deckListSet,
  deckListEdit,
  deckListDelete,
  deckListUpload,
  loadDecks
} from "./js/DBAPI";
import {
  replayFilter,
  replayVote,
  replayGet,
  ReplayDeckSet,
  replayDelete,
  replayShowUpload,
  replayUpload,
  loadReplays
} from "./js/RPAPI.js";

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

    this.deckListFilter = deckListFilter.bind(this);
    this.deckListVote = deckListVote.bind(this);
    this.deckListGet = deckListGet.bind(this);
    this.deckListSet = deckListSet.bind(this);
    this.deckListEdit = deckListEdit.bind(this);
    this.deckListDelete = deckListDelete.bind(this);
    this.deckListUpload = deckListUpload.bind(this);

    this.loadDecks = loadDecks.bind(this);

    this.replayFilter = replayFilter.bind(this);
    this.replayVote = replayVote.bind(this);
    this.replayGet = replayGet.bind(this);
    this.ReplayDeckSet = ReplayDeckSet.bind(this);
    this.replayDelete = replayDelete.bind(this);
    this.replayShowUpload = replayShowUpload.bind(this);
    this.replayUpload = replayUpload.bind(this);
    this.loadReplays = loadReplays.bind(this);

    this.state = {
      //UI
      isLoading: true,
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
      },
      DeckDB: {
        FullDeckList: null, //full DB list
        DeckList: null, //DB list, post filter
        FilterParam: null,
        SelectedDeck: null,
        SelectedDeckCode: "",
        SelectedDeckObject: null,
        DeckUnits: [[], [], [], [], [], [], [], []],
        sortby: null,
        API: {
          filter: this.deckListFilter,
          vote: this.deckListVote,
          showDeck: this.deckListGet,
          editDeck: this.deckListSet,
          editHeader: this.deckListEdit,
          deleteDeck: this.deckListDelete,
          uploadDeck: this.deckListUpload
        }
      },
      ReplayDB: {
        ReplayList: null,
        sortby: null,
        Replay: null,
        ReplayDecks: null,
        IsUploading: null,
        API: {
          filter: this.replayFilter,
          vote: this.replayVote,
          showReplay: this.replayGet,
          editDeck: this.ReplayDeckSet,
          deleteReplay: this.replayDelete,
          showUpload: this.replayShowUpload,
          upload: this.replayUpload
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
        console.log("tests");
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

  render() {
    if (this.state.isLoading) {
      if (this.state.DB === null) {
        this.initData();
      }
      return (
        <div className="card">
          <div className="mx-auto">
            <div className="lds-dual-ring" />
          </div>
        </div>
      );
    } else {
      if (this.props.Honey.ActiveTab === "DeckBuilder") {
        return (
          <DeckBuilder
            Honey={this.state}
            pload={this.props.Honey.Preload}
            pset={this.props.API.setCode}
          />
        );
      } else if (this.props.Honey.ActiveTab === "DeckDB") {
        return (
          <DeckDB
            DB={this.state.DB}
            deckDB={this.state.DeckDB}
            DeckUnits={this.state.DeckBuilder.DeckUnits}
            User={this.props.Honey.User}
          />
        );
      } else if (this.props.Honey.ActiveTab === "Database") {
        return <Database DB={this.state.DB} />;
      } else if (this.props.Honey.ActiveTab === "ReplayDB") {
        return (
          <React.Fragment>
            <ReplayDB
              DB={this.state.DB}
              ReplayDB={this.state.ReplayDB}
              User={this.props.Honey.User}
              upload={this.state.ReplayDB.API.showUpload}
              filter={this.state.ReplayDB.API.filter}
            />
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
          </React.Fragment>
        );
      } else {
        return null;
      }
    }
  }
}

export default SD1;
