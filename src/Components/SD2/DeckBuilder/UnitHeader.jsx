import React from "react";
import { getPortrait, getSpec, parseArmor } from "../js/unitGUIparsers";
import { VetIcon } from "./AuxModules";
import ReactTooltip from "react-tooltip";

function UnitHeader({ Pack, show, add }) {
  function makeButton(xp, p, x, i) {
    if (!Math.floor(xp * p.u.Value.UnitsPerPack[x])) {
      return (
        <button className="text-right btn btn-block btn-light" disabled>
          -
        </button>
      );
    }
    return (
      <button
        className="text-right btn btn-block btn-dark rounded-0"
        onClick={() =>
          add({
            ph: x,
            xp: i,
            Unit: p.u,
            Transport: p.t
          })
        }
      >
        {Math.floor(xp * p.u.Value.UnitsPerPack[x])}
      </button>
    );
  }

  return (
    <div className="card-header">
      <div className="row p-1">
        <div className="col-xl-5">{makeHead(Pack.u)}</div>
        <div className="col-xl-5">{makeHead(Pack.t)}</div>
        <button
          className="btn btn-danger popup-close"
          onClick={() => show(null)}
        >
          X
        </button>
        <div className="col-xl-2 justify-content-center p-1">
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>A</th>
                <th>B</th>
                <th>C</th>
              </tr>
              {Pack.u.Value.XPBonus.map((e, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <VetIcon x={i}></VetIcon>
                    </td>
                    <td>{makeButton(e, Pack, 0, i)}</td>
                    <td>{makeButton(e, Pack, 1, i)}</td>
                    <td>{makeButton(e, Pack, 2, i)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function makeHead(x) {
  try {
    if (x) {
      return (
        <div className="row">
          <div className="col-8">
            <div className="row justify-content-center">
              {getPortrait(x, "img-sd-back")}
              {getSpec(x, "img-sd2-rel-spec")}
            </div>
            <div className="row justify-content-center">
              <b>{x.Key.UnitName}</b>
            </div>
            <div className="row">
              <div className="col justify-content-left">
                <h6>
                  {x.Value
                    ? x.Value.Descriptor
                      ? "Cards: " + x.Value.MaxPackNumber
                      : "Units: " + x.Value
                    : ""}
                </h6>
              </div>
              <div className="col justify-content-right">
                <h6>Price: {x.Key.ProductionPrice}</h6>
              </div>
            </div>
            <div className="row">
              <ReactTooltip />
              <h6 data-tip="Front|Side|Back|Top">
                {parseArmor(
                  x.Key.DamageDescriptor.BlindageProperties.ArmorDescriptorFront
                ) +
                  "|" +
                  parseArmor(
                    x.Key.DamageDescriptor.BlindageProperties
                      .ArmorDescriptorSides
                  ) +
                  "|" +
                  parseArmor(
                    x.Key.DamageDescriptor.BlindageProperties
                      .ArmorDescriptorRear
                  ) +
                  "|" +
                  parseArmor(
                    x.Key.DamageDescriptor.BlindageProperties.ArmorDescriptorTop
                  )}
              </h6>
            </div>
          </div>
          <div className="col-4">
            <h6>HP: {x.Key.MaxHP}</h6>
            <h6>Camo: {x.Key.UnitConcealmentBonus}</h6>
            <h6>Towable: {x.isTowable}</h6>
            <ReactTooltip />
            <h6 data-tip="land/air">
              Optics: <br />
              {x.Key.OpticalStrength + "/" + x.Key.OpticalStrengthAltitude}
            </h6>
          </div>
        </div>
      );
    }
    return (
      <React.Fragment>
        <div className="col-xl-3" />
        <div className="col-xl-2 justify-content-center" />
      </React.Fragment>
    );
  } catch (error) {
    global.throw("makeHead error", x, error);
  }
}

export default UnitHeader;
