import React from "react";
import { parsePhaseAvail, DisplayAP, DisplayAV } from "../js/unitGUIparsers";
import CDRow from "./CDRow";
import UnitDisplay from "./UnitDisplay";

function UnitPanel({ Deck, API, Index, Pack, show }) {
  let Parsed = Deck.DisplayMatrix[Index];
  /* pack:{pack: e, trans: t }*/
  return (
    <div className="card-body">
      <CDRow Deck={Deck} Parsed={Parsed} show={show} API={API} />
      <div className="row">
        <div className="col-xl-6">
          <UnitList Deck={Deck} Index={Index} show={show} />
        </div>
        <div className="col-xl-6">
          <UnitDisplay Pack={Pack} add={API.addUnit} />
        </div>
      </div>
    </div>
  );
}

function UnitList({ Deck, Index, show }) {
  let types = [
    "Reco",
    "Inf",
    "Tank",
    "Support",
    "AT",
    "DCA",
    "Art",
    "Air",
    "Static"
  ];
  let Type = types[Index];
  let makeUnitEntry = (x, index) => {
    if (x.pack === undefined) {
      throw "no unit in display";
    }
    return (
      <tr key={index} onClick={() => show(x)}>
        <td>{x.pack.Unit.Name}</td>
        <td>{x.pack.Unit.Price}</td>
        <td>{x.pack.PackAvail}</td>
        <td>{DisplayAP(x.pack.Unit.ATshow, "img-xp")}</td>
        <td>{DisplayAV(x.pack.Unit.AVshow, "img-xp")}</td>
        <td>{x.pack.Unit.SpecShow}</td>
        <td>{x.trans.Unit.Name}</td>
        <td>{x.trans.Unit.Price}</td>
        <td>{DisplayAP(x.trans.Unit.ATshow, "img-xp")}</td>
        <td>{DisplayAV(x.trans.Unit.AVshow, "img-xp")}</td>
        <td>{x.trans.Unit.SpecShow}</td>
        <td>{parsePhaseAvail(x.pack.AvMatrix[0], "A")}</td>
        <td>{parsePhaseAvail(x.pack.AvMatrix[1], "B")}</td>
        <td>{parsePhaseAvail(x.pack.AvMatrix[2], "C")}</td>
      </tr>
    );
  };

  let Unitslist = [];
  Deck.PackList.forEach(e => {
    if (Type === e.Unit.Factory) {
      //constructs a unit for display
      e.Transports.forEach(l => {
        let t = Deck.TransportList.find(x => {
          return x.Desc === l;
        });
        Unitslist.push({ pack: e, trans: t });
      });
    }
  });
  return (
    <div className="card">
      <div className="card-body">
        <table className="sortable table-hover" id="recTable">
          <tbody>
            <tr>
              <th>Unit⇓</th>
              <th>Points⇓</th>
              <th>Cards⇓</th>
              <th>AT⇓</th>
              <th>FAV⇓</th>
              <th>Spec⇓</th>
              <th>Transport⇓</th>
              <th>Points⇓</th>
              <th>AT⇓</th>
              <th>FAV⇓</th>
              <th>Spec⇓</th>
              <th>A⇓</th>
              <th>B⇓</th>
              <th>C⇓</th>
            </tr>
            {Unitslist.map(makeUnitEntry)}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UnitPanel;
