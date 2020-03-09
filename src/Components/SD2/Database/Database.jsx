import React, { useState } from "react";
import DeckDB from "./DeckDB";
import UnitDB from "./UnitDB";
import WeaponDB from "./WeaponDB";
import pako from "pako";
import firebase from "../../../js/Firestore";
import { useParams } from "react-router-dom";

function Database({ DB }) {
  let params = useParams();
  const [thisDB, setThisDB] = useState("d");
  const [allUnits, setAllUnits] = useState(null);
  const [allWeapons, setAllWeapons] = useState(null);

  function getDB() {
    switch (thisDB) {
      case "d":
        if (DB) {
          return <DeckDB allDecks={DB} />;
        }
        break;
      case "u":
        if (allUnits) {
          return <UnitDB allUnits={allUnits} />;
        }
        break;
      case "w":
        if (allWeapons) {
          return <WeaponDB allWeapons={allWeapons} />;
        }
        break;
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
  }

  function setActive(x) {
    let prs = params.DB === "SD1" ? "SD1" : "SD2";
    if (x === "u" && !allUnits) {
      firebase
        .firestore()
        .collection("zip")
        .doc(prs + "u")
        .get()
        .then(queryDocumentSnapshot => {
          var inflated = JSON.parse(
            pako.inflate(queryDocumentSnapshot.data().u, { to: "string" })
          );
          setAllUnits(inflated);
        });
    }
    if (x === "w" && !allWeapons) {
      firebase
        .firestore()
        .collection("zip")
        .doc(prs + "a")
        .get()
        .then(queryDocumentSnapshot => {
          var inflated = JSON.parse(
            pako.inflate(queryDocumentSnapshot.data().a, { to: "string" })
          );
          setAllWeapons(inflated);
        });
    }
    setThisDB(x);
  }

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col">
            <button
              className="btn btn-block  btn-outline-dark"
              onClick={() => setActive("d")}
            >
              Decks
            </button>
          </div>
          <div className="col">
            <button
              className="btn btn-block  btn-outline-dark"
              onClick={() => setActive("u")}
            >
              Units
            </button>
          </div>
          <div className="col">
            <button
              className="btn btn-block  btn-outline-dark"
              onClick={() => setActive("w")}
            >
              Weapons
            </button>
          </div>
        </div>
      </div>
      {getDB()}
    </React.Fragment>
  );
}

export function FilterField({ items, set }) {
  const [str, setstr] = useState("");
  let handleChange = event => {
    setstr(event.target.value);
  };

  function searchObj(obj, query) {
    for (var key in obj) {
      var value = obj[key];

      if (typeof value === "object") {
        searchObj(value, query);
      }

      if (
        typeof value === "string" &&
        value.toLowerCase().includes(query.toLowerCase())
      ) {
        return true;
      }
      if (value === query) {
        return true;
      }
    }
  }

  let lookup = str => {
    let u = [];
    items.forEach(e => {
      if (searchObj(e, str)) {
        u.push(e);
      }
    });
    set(u);
  };
  return (
    <div className="row">
      <div className="col-10">
        <input
          className="form-control"
          value={str}
          type="text"
          onChange={handleChange}
        />
      </div>
      <div className="col-2">
        <button className="btn btn-block" onClick={() => lookup(str)}>
          Filter
        </button>
      </div>
    </div>
  );
}

export default Database;
