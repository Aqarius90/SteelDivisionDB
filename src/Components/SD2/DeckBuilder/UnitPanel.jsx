import React, { useState } from "react";
import { getSpec, getPortrait } from "../js/unitGUIparsers";
import CDRow from "./CDRow";
import UnitDisplay from "./UnitDisplay";

function UnitPanel({ Deck, API, UnitPairs, Index, sideShow, setShow }) {
  let Parsed = Deck.DisplayMatrix[Index];
  return (
    <div className="card-body pb-0">
      <CDRow Deck={Deck} Parsed={Parsed} show={setShow} API={API} />
      <div className="row">
        <UnitList UnitPairs={UnitPairs} show={setShow} />
        <UnitDisplay Pack={sideShow} show={setShow} add={API.addUnit} />
      </div>
    </div>
  );
}

function UnitList({ UnitPairs, show }) {
  let makeUnitEntry = (x, index) => {
    if (x.t) {
      return (
        <tr key={index} onClick={() => show(x)}>
          <td>{getPortrait(x.u, "img-sd2-xp")}</td>
          <td>{x.u.Key.UnitName}</td>
          <td>{x.u.Key.ProductionPrice}</td>
          <td>{x.u.Value.MaxPackNumber}</td>
          <td>{x.u.Value.UnitsPerPack[0] + "|"}</td>
          <td>{x.u.Value.UnitsPerPack[1] + "|"}</td>
          <td>{x.u.Value.UnitsPerPack[2]}</td>
          <td>{getSpec(x.u)}</td>
          <td>{getPortrait(x.t, "img-sd2-xp")}</td>
          <td>{x.t.Key.UnitName}</td>
          <td>{x.t.Key.ProductionPrice}</td>
          <td>{getSpec(x.t)}</td>
        </tr>
      );
    }
    return (
      <tr key={index} onClick={() => show(x)}>
        <td>{getPortrait(x.u, "img-sd2-xp")}</td>
        <td>{x.u.Key.UnitName}</td>
        <td>{x.u.Key.ProductionPrice}</td>
        <td>{x.u.Value.MaxPackNumber}</td>
        <td>{x.u.Value.UnitsPerPack[0] + "|"}</td>
        <td>{x.u.Value.UnitsPerPack[1] + "|"}</td>
        <td>{x.u.Value.UnitsPerPack[2]}</td>
        <td>{getSpec(x.u)}</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    );
  };
  const [sort, setSort] = useState(null);
  const [order, setOrder] = useState(true);
  function compare(a, b) {
    if (order) {
      return a > b ? 1 : a < b ? -1 : 0;
    }
    return a < b ? 1 : a > b ? -1 : 0;
  }
  function setSortValue(x) {
    if (sort === x) {
      setOrder(!order);
    } else {
      setSort(x);
    }
  }

  switch (sort) {
    case null:
      break;
    case "Unit":
      UnitPairs.sort((a, b) => compare(a.u.Key.UnitName, b.u.Key.UnitName));
      break;
    case "Points":
      UnitPairs.sort(
        (a, b) => a.u.Key.ProductionPrice - b.u.Key.ProductionPrice
      );
      break;
    case "Cards":
      UnitPairs.sort(
        (a, b) => a.u.Value.MaxPackNumber - b.u.Value.MaxPackNumber
      );
      break;
    case "A":
      UnitPairs.sort((a, b) =>
        compare(a.u.Value.UnitsPerPack[0], b.u.Value.UnitsPerPack[0])
      );
      break;
    case "B":
      UnitPairs.sort((a, b) =>
        compare(a.u.Value.UnitsPerPack[1], b.u.Value.UnitsPerPack[1])
      );
      break;
    case "C":
      UnitPairs.sort((a, b) =>
        compare(a.u.Value.UnitsPerPack[2], b.u.Value.UnitsPerPack[2])
      );
      break;
    case "Spec":
      UnitPairs.sort((a, b) => compare(a.u.Key.SpecToken, b.u.Key.SpecToken));
      break;
    case "Trans":
      UnitPairs.sort((a, b) =>
        compare(a.t ? a.t.Key.UnitName : 0, b.t ? b.t.Key.UnitName : 0)
      );
      break;
    case "tPoints":
      UnitPairs.sort((a, b) =>
        compare(
          a.t ? a.t.Key.ProductionPrice : 0,
          b.t ? b.t.Key.ProductionPrice : 0
        )
      );
      break;
    case "tSpec":
      UnitPairs.sort((a, b) =>
        compare(a.t ? a.t.Key.SpecToken : 0, b.t ? b.t.Key.SpecToken : 0)
      );
      break;
    default:
      global.throw("sortError", sort);
      break;
  }
  return (
    <div className="card popup-unit-panel">
      <div className="card-body">
        <table className="sortable table-hover">
          <tbody>
            <tr>
              <th></th>
              <th onClick={() => setSortValue("Unit")}> Unit⇓</th>
              <th onClick={() => setSortValue("Points")}>Points⇓</th>
              <th onClick={() => setSortValue("Cards")}>Cards⇓</th>
              <th onClick={() => setSortValue("A")}>A⇓|</th>
              <th onClick={() => setSortValue("B")}>B⇓|</th>
              <th onClick={() => setSortValue("C")}>C⇓</th>
              <th onClick={() => setSortValue("Spec")}>Spec⇓</th>
              <th></th>
              <th onClick={() => setSortValue("Trans")}>Transport⇓</th>
              <th onClick={() => setSortValue("tPoints")}>Points⇓</th>
              <th onClick={() => setSortValue("tSpec")}>Spec⇓</th>
            </tr>
            {UnitPairs.map(makeUnitEntry)}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UnitPanel;
