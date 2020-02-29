import React, { useState } from "react";
function DeckCodeParser({ Honey, pload }) {
  let Deck = Honey.DeckBuilder.Deck;
  const [isFirst, setIsFirst] = useState(true);
  if (isFirst && pload) {
    Honey.API.parseDeckCode(pload);
    setIsFirst(false);
  }

  /*lets you type into the input without polluting the Deck object with false data*/
  const [code, setCode] = useState("");
  const [realCode, setRealCode] = useState(Deck.DeckCode);
  if (realCode !== Deck.DeckCode) {
    /*realCode is the actual deck code. code is just the shown one
     *when deckcode disagrees with realcode, the deck was changed, everything syncs*/
    Honey.API.setDeckCode(Deck.DeckCode);
    setRealCode(Deck.DeckCode);
  }

  let handleChange = event => {
    Honey.API.setDeckCode(event.target.value);
  };

  return (
    <div className="row card-body">
      <div className="col-xl-5">
        <h2>
          {Deck.Emblem}: {Deck.Cards.length} / {Deck.DeckPointsTotal} |A:
          {Deck.PhaseA.Income}
          |B:
          {Deck.PhaseB.Income}
          |C:
          {Deck.PhaseC.Income}|
        </h2>
      </div>
      <div className="col-xl-4">
        <input
          className="form-control"
          value={Honey.code}
          type="text"
          onChange={handleChange}
        />
      </div>
      <div className="col-xl">
        <button
          type="button"
          className="btn btn-default btn-block btn-top-line"
          onClick={() => Honey.API.parseDeckCode(Honey.code)}
        >
          DECODE
        </button>
      </div>
      <div className="col-xl">
        <button
          type="button"
          className="btn btn-default btn-block btn-top-line"
          onClick={() => Honey.API.parseDeckCode("")}
        >
          CLEAR
        </button>
      </div>
    </div>
  );
}

export default DeckCodeParser;
