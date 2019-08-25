import React from "react";

function CDRow({ Deck, Parsed, show, API }) {
  let showCard = (x, i) => {
    if (typeof x.phase === "undefined") {
      //if not an object (AKA, a card), return a number
      return (
        <div className="col-xl-1 col-xl-10" key={i}>
          <h3 key={i}> {x} </h3>
        </div>
      );
    }
    try {
      let isValid = [
        Deck.packIsValid(x),
        Deck.unitIsValid(x),
        Deck.transIsValid(x),
        Deck.unitCount(x),
        Deck.transCount(x)
      ];
      return (
        <UnitIconDisplay
          x={x}
          isValid={isValid}
          show={show}
          API={API}
          key={i}
        />
      );
    } catch (error) {
      if (global.debug) {
        console.log(x);
        console.log(error);
        console.error("non-unit in unit display");
      } else {
        throw "non-unit in unit display";
      }
    }
  };

  return <div className="row">{Parsed.map(showCard)}</div>;
}

function UnitIconDisplay({ x, isValid, show, API }) {
  let textColor = isValid[1] ? "text-dark" : "text-danger";
  let transportColor = isValid[2] ? "text-dark" : "text-danger";
  let unitpicture = isValid[0] ? x.Pack.Unit.Icon.toLowerCase() : "error";

  let makePicture = () => {};

  if (show === undefined) {
    //for non-interactive display, show is undefined
    if (x.Transport.Enc === 0) {
      return (
        <div className="col-xl-1 col-xl-10" onClick={() => show(x)}>
          <div className="div-rel">
            <img
              src={"img-sd2/pictures/" + unitpicture + ".tgv.png"}
              className="img-sd2-back"
              alt="unitPortrait"
            />
            <p className={textColor}>
              {" "}
              {x.Pack.Unit.Name + " " + isValid[3] + "/" + x.Pack.PackAvail}
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="col-xl-1 col-xl-10" onClick={() => show(x)}>
          <div className="div-rel">
            <img
              src={"img-sd2/pictures/" + unitpicture + ".tgv.png"}
              className="img-sd2-back"
              alt="unitPortrait"
            />
            <p className={textColor}>
              {" "}
              {x.Pack.Unit.Name + " " + isValid[3] + "/" + x.Pack.PackAvail}
            </p>
            <p className={transportColor}>
              {" "}
              {x.Transport.Unit.Name +
                " " +
                isValid[4] +
                "/" +
                x.Transport.Avail}
            </p>
          </div>
        </div>
      );
    }
  } else {
    if (x.Transport.Enc === 0) {
      return (
        <div className="col-xl-1 col-xl-10">
          <div className="div-rel" onClick={() => show(x)}>
            <img
              src={"img-sd2/pictures/" + unitpicture + ".tgv.png"}
              className="img-sd2-back"
              alt="unitPortrait"
            />
            <p className={textColor}>
              {" "}
              {x.Pack.Unit.Name + " " + isValid[3] + "/" + x.Pack.PackAvail}
            </p>
          </div>
          <button className="btn btn-block" onClick={() => API.deleteUnit(x)}>
            Delete
          </button>
        </div>
      );
    } else {
      return (
        <div className="col-xl-1 col-xl-10">
          <div className="div-rel" onClick={() => show(x)}>
            <img
              src={"img-sd2/pictures/" + unitpicture + ".tgv.png"}
              className="img-sd2-back"
              alt="unitPortrait"
            />
            <p className={textColor}>
              {" "}
              {x.Pack.Unit.Name + " " + isValid[3] + "/" + x.Pack.PackAvail}
            </p>
            <p className={transportColor}>
              {" "}
              {x.Transport.Unit.Name +
                " " +
                isValid[4] +
                "/" +
                x.Transport.Avail}
            </p>
          </div>
          <button className="btn btn-block" onClick={() => API.deleteUnit(x)}>
            Delete
          </button>
        </div>
      );
    }
  }
}

export default CDRow;
