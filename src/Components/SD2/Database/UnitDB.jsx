import React, { useState } from "react";
import { DisplayAP, DisplayAV } from "../js/unitGUIparsers";

function UnitDB({ filterList }) {
  let parseDecks = x => {
    let inner = "";
    x.forEach(e => {
      inner = inner + e + " \n ";
    });
    return inner; //TODO rework
  };

  let showUnit = x => {
    //TODO make this to something?
  };

  let makeEntry = (x, index) => {
    if (x.Descriptor === "-") {
      return <tr key={index} />;
    }
    return (
      <tr key={index} onClick={() => showUnit(x)}>
        <td>{x.Enc}</td>
        <td>{x.Name}</td>
        <td>{parseDecks(x.Decks)}</td>
        <td>{x.Price}</td>
        <td>{x.Category}</td>
        <td>{x.AV[0]}</td>
        <td>{x.AV[1]}</td>
        <td>{x.AV[2]}</td>
        <td>{x.AV[3]}</td>
        <td>{DisplayAP(x.APshow, "img-xp") /*TODO no filed in DB yet*/}</td>
        <td>{x.Speed}</td>
        <td>{x.RoadSpeed}</td>
      </tr>
    );
  };

  return (
    <React.Fragment>
      <div>placeholder for comparatives fold in</div>
      <div className="row">
        <div className="col-xl-12">
          <table className="sortable table-hover">
            <tbody>
              <tr>
                <th> enum⇓ </th>
                <th> Name⇓ </th>
                <th> Decks⇓ </th>
                <th> Price⇓ </th>
                <th> Type⇓ </th>
                <th> FAV⇓ </th>
                <th> Roof⇓ </th>
                <th> SAV⇓ </th>
                <th> BAV⇓ </th>
                <th> AP⇓ </th>
                <th> Speed⇓ </th>
                <th> Road Speed⇓ </th>
              </tr>
              {filterList.map(makeEntry)}
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
}

export default UnitDB;
