import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

function DivisionSelector({ Decks, setDeck }) {
  let makeButton = (x, i) => {
    return (
      <div className="col-xl-3" key={i}>
        <button className="btn btn-block" onClick={() => setDeck(x.Descriptor)}>
          <img
            src={"img-sd2/divs/" + x.Emblem.toLowerCase() + ".tgv.png"}
            className="img-back"
            alt="divEmblem"
          />
          <p>{x.Name}</p>
        </button>
      </div>
    );
  };

  return (
    <React.Fragment>
      <div className="row card-body">
        <div className="col-xl">
          <div className="row">
            {Decks.filter(x => {
              return x.Side === "Allied";
            }).map(makeButton)}
          </div>
        </div>
        <div className="col-xl">
          <div className="row">
            {Decks.filter(x => {
              return x.Side === "Axis";
            }).map(makeButton)}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default DivisionSelector;
