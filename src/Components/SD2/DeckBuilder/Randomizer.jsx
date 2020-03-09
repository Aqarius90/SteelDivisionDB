import React, { useState } from "react";
import _ from "lodash";

function Randomizer({ DB, randomFill }) {
  const [decks, setDecks] = useState([]);
  function toggleSide(x) {
    let newdecks = _.cloneDeep(decks);
    DB.filter(e => e.Side === x).forEach(f => {
      let idx = newdecks.findIndex(e => e.Descriptor === f.Descriptor);
      if (idx === -1) {
        newdecks.push(f);
      } else {
        newdecks.splice(idx, 1);
      }
    });
    setDecks(newdecks);
  }
  function toggleDeck(x) {
    let idx = decks.findIndex(e => e.Descriptor === x.Descriptor);
    let newdecks = _.clone(decks);
    if (idx === -1) {
      newdecks.push(x);
      setDecks(newdecks);
    } else {
      newdecks.splice(idx, 1);
      setDecks(newdecks);
    }
  }
  let makeButton = (x, i) => {
    return (
      <div className="col-xl-3 col-md-4 col-sm-6" key={i}>
        <button
          className={
            decks.some(e => e.Descriptor === x.Descriptor)
              ? "btn btn-block btn-success"
              : "btn btn-block"
          }
          onClick={() => toggleDeck(x)}
        >
          <img
            src={
              process.env.PUBLIC_URL +
              "/img-sd2/divs/" +
              x.EmblemTexture.split("Emblem_")[1].toLowerCase() +
              ".tgv.png"
            }
            className="img-back"
            alt="unitPortrait"
          />
          <p>{x.DivisionName}</p>
        </button>
      </div>
    );
  };
  let makeDeck = () => {
    if (decks.length) {
      var d = decks[Math.floor(Math.random() * decks.length)];
      randomFill(d.Descriptor);
    }
  };
  return (
    <>
      <div className="row">
        <div className="col">
          <button
            className="btn btn-secondary btn-block"
            onClick={() => toggleSide("Allied")}
          >
            Allies
          </button>
        </div>
        <div className="col">
          <button
            className="btn btn-secondary btn-block"
            onClick={() => toggleSide("Axis")}
          >
            Axis
          </button>
        </div>
      </div>
      <div className="row card-body">
        <div className="col-sm">
          <div className="row">
            {DB.filter(x => {
              return x.Side === "Allied";
            }).map((e, i) => makeButton(e, i))}
          </div>
        </div>
        <div className="col-sm">
          <div className="row">
            {DB.filter(x => {
              return x.Side === "Axis";
            }).map((e, i) => makeButton(e, i))}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <button className="btn btn-primary btn-block" onClick={makeDeck}>
            Generate
          </button>
        </div>
      </div>
    </>
  );
}

export default Randomizer;
