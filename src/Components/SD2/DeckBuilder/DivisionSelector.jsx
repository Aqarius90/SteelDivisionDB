import React from "react";

function DivisionSelector({ Decks, setDeck }) {
  let makeButton = (x, i) => {
    return (
      <div className="col-xl-3 col-md-4 col-sm-6" key={i}>
        <button className="btn btn-block" onClick={() => setDeck(x.Descriptor)}>
          <img
            src={
              process.env.PUBLIC_URL +
              "/img-sd2/divs/" +
              x.EmblemTexture.split("Emblem_")[1].toLowerCase() +
              ".tgv.png"
            }
            className="img-back"
            alt="divEmblem"
          />
          <p>{x.DivisionName}</p>
        </button>
      </div>
    );
  };

  return (
    <React.Fragment>
      <div className="row card-body">
        <div className="col-sm">
          <div className="row">
            {Decks.filter(x => {
              return x.Side === "Allied";
            }).map(makeButton)}
          </div>
        </div>
        <div className="col-sm">
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
