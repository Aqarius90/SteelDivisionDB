import React from "react";
import { getPortrait, getSpec } from "../js/unitGUIparsers";
import { VetIcon } from "./AuxModules";

function CDRow({ Deck, Parsed, show, API }) {
  let showCard = (x, i) => {
    try {
      if (x.u) {
        let isValid = [
          Deck.packIsValid(x),
          Deck.unitIsValid(x),
          Deck.transIsValid(x)
        ];
        return (
          <UnitIconDisplay
            x={x}
            d={Deck}
            isValid={isValid}
            show={show}
            API={API}
            key={i}
          />
        );
      }
      //if not an object (AKA, a card), return a number
      if (x === "X") {
        return (
          <div className="col-xl-1 col-xl-10 py-4 bg-light " key={i}>
            <h3 key={i}> {x} </h3>
          </div>
        );
      }
      return (
        <div className="col-xl-1 col-xl-10 py-4" key={i}>
          <h3 key={i}> {x} </h3>
        </div>
      );
    } catch (error) {
      global.throw("non-unit in unit display", x, error);
    }
  };
  return (
    <div className="card-text row">{Parsed.map((e, i) => showCard(e, i))}</div>
  );
}

function UnitIconDisplay({ x, d, isValid, show, API }) {
  if ([x, isValid, show, API].includes(null)) {
    global.throw("null input: UnitIconDisplay", [x, isValid, show, API]);
  }

  if (!show) {
    //for non-interactive display, show is undefined
    return <div className="col-010">{unitIcon(x, d, isValid, show)}</div>;
  } else {
    return (
      <div className="col-010">
        {unitIcon(x, d, isValid, show)}
        <button className="btn btn-block" onClick={() => API.deleteUnit(x)}>
          Delete
        </button>
      </div>
    );
  }
}

function unitIcon(x, d, isValid, show) {
  let textColor = isValid[1] ? "text-dark" : "text-danger";
  let transportColor = isValid[2] ? "text-dark" : "text-danger";
  return (
    <React.Fragment>
      <div className="div-rel" onClick={() => show(x)}>
        {getPortrait(x.u, "img-sd2-back")}
        <h5 className="txt-sd2-price">
          {x.u.Key.ProductionPrice + (x.t ? x.t.Key.ProductionPrice : 0)}
        </h5>
        <h5 className="txt-sd2-avail">{x.avail}</h5>
        <h5 className="txt-sd2-phase">
          {x.phase === 0 ? (x.ph === 1 ? "B" : "C") : "A"}
        </h5>
        <VetIcon x={x.xp} css="img-sd2-rel-xp" />
        {getSpec(x.u, "img-sd2-rel-spec")}
      </div>
      <p className={textColor}>
        {x.u.Key.UnitName +
          " " +
          d.unitCount(x) +
          "/" +
          x.u.Value.MaxPackNumber}
      </p>
      <p className={transportColor}>
        {x.t
          ? x.t.Key.UnitName + " " + d.transCount(x) + "/" + x.t.Value
          : "  "}
      </p>
    </React.Fragment>
  );
}

export default CDRow;
