import React, { useState } from "react";
import { getPortrait, getSpec, parseArmor } from "../js/unitGUIparsers";
import UnitModules, { Ammo } from "../DeckBuilder/UnitModules";
import { makeHead } from "../DeckBuilder/UnitHeader";
import ReactTooltip from "react-tooltip";

export function DeckUnitCard({ x, i }) {
  const [show, setShow] = useState(false);
  return (
    <div className="card" key={i}>
      <div className="card-header" onClick={() => setShow(!show)}>
        <div className="row" data="test">
          <div className="col-3">{getPortrait(x, "img-sd2-back")}</div>
          <div className="col-3">
            <h5>{x.Key.UnitName}</h5>
            <h5>Cards: {x.Value.MaxPackNumber}</h5>
          </div>
          <div className="col-2">
            <h5>Per card:</h5>
            <h5>Vet. coeff.:</h5>
          </div>
          <div className="col-2 justify-content-end">
            <h5>
              {x.Value.UnitsPerPack[0] +
                " / " +
                x.Value.UnitsPerPack[1] +
                " / " +
                x.Value.UnitsPerPack[2]}
            </h5>
            <h5>
              {x.Value.XPBonus[0] +
                " / " +
                x.Value.XPBonus[1] +
                " / " +
                x.Value.XPBonus[2]}
            </h5>
          </div>
          <div className="col-2">
            <img
              src={
                "/SteelDivisionDB/img-sd2/units/" +
                x.Key.UnitDescriptor.toLowerCase() +
                ".png"
              }
              className="img-sd2-back"
              alt="unitPortrait"
            />
          </div>
        </div>
      </div>
      <div className={show ? "d-block" : "d-none"}>
        <div className={"card-body "}>
          <div className="row">
            {x.Value.AvailableTransportList.map((e, i) => {
              if (e) {
                return (
                  <img
                    key={i}
                    src={
                      "/SteelDivisionDB/img-sd2/pictures/" +
                      e.split("Unit_")[1].toLowerCase() +
                      ".png"
                    }
                    className={"img-back"}
                    alt={"DisplaySpecial"}
                  ></img>
                );
              }
              return <div />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export function DeckDeckRow({ x, setUnits }) {
  const [show, setShow] = useState(false);
  return (
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="col-3" onClick={() => setShow(!show)}>
            <h4>{x.DivisionName}</h4>
          </div>
          <div className="col-2" onClick={() => setShow(!show)}>
            <img
              src={
                "/SteelDivisionDB/img-sd2/divs/" +
                x.EmblemTexture.split("Emblem_")[1].toLowerCase() +
                ".png"
              }
              className="img-back"
              alt="divemblem"
            />
          </div>
          <div className="col-2" onClick={() => setShow(!show)}>
            <img
              src={
                "/SteelDivisionDB/img-sd2/" +
                x.TypeTexture.split("Type_")[1].toLowerCase() +
                ".tgv.png"
              }
              className="img-back"
              alt="divType"
            />
          </div>
          <div className="col-3" onClick={() => setShow(!show)}>
            <h4>{"Points: " + x.MaxActivationPoints}</h4>
            <h4>{"Rating : " + x.Rating}</h4>
          </div>
          <div className="col-2">
            <button
              className="btn btn-primary btn-block py-4"
              onClick={() => setUnits(x.Units)}
            >
              Units
            </button>
          </div>
        </div>
      </div>
      <div className={show ? "d-block" : "d-none"}>
        <div className={"card-body "}>
          <div className="row">
            <div className="col-2">
              <h5>Tags</h5>
            </div>
            <div className="col-2">
              {x.Tags.map((e, i) => (
                <p key={i}> {e}</p>
              ))}
            </div>
            <div className="col-2">
              <h5>Cost Matrix</h5>
            </div>
            <div className="col-4">
              {x.CostMatrix.map((e, i) => (
                <p key={i}> {e.map(el => el + ",  ")}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function UnitUnitRow({ x, i }) {
  try {
    if ([1365, 1367, 1371].includes(x.Serial)) {
      return <React.Fragment></React.Fragment>;
    }
    return (
      <React.Fragment>
        <td>{getPortrait({ Key: x }, "img-sd2-xp")}</td>
        <td>{x.UnitName}</td>
        <td>{getSpec({ Key: x })}</td>
        <td>{x.ProductionPrice}</td>
        <td>
          {parseArmor(
            x.DamageDescriptor.BlindageProperties.ArmorDescriptorFront
          )}
        </td>
        <td>
          {parseArmor(
            x.DamageDescriptor.BlindageProperties.ArmorDescriptorSides
          )}
        </td>
        <td>
          {parseArmor(
            x.DamageDescriptor.BlindageProperties.ArmorDescriptorRear
          )}
        </td>
        <td>
          {parseArmor(x.DamageDescriptor.BlindageProperties.ArmorDescriptorTop)}
        </td>
        <td>{x.Factory}</td>
        <td>{x.VisionRange + "/" + x.VisionRangeTBA}</td>
        <td>{x.UnitConcealmentBonus}</td>
        <td>{x.isPlane ? x.AirSpeed : x.Maxspeed + "/" + x.CombatSpeed}</td>
        <td>
          {x.DamageDescriptor.StunDamagesRegen.replace(
            "_StunDamagesRegen",
            ""
          ) +
            "/" +
            x.DamageDescriptor.MaxSuppressionDamages.replace(
              "_MaxSuppressionDamages",
              ""
            )}
        </td>
        <td>{x.isPlane ? x.SupplyCapacity : x.FuelMoveDuration}</td>
      </React.Fragment>
    );
  } catch (error) {
    global.throw("Unit DB invalid", x, error);
    return <React.Fragment></React.Fragment>;
  }
}

export function UnitUnitCard({ detail, setDetail }) {
  return detail ? (
    <div className=" popup-unit">
      <div className="card">
        <div className="card-header">
          <div className="row p-1">
            <div className="col-md-5">{makeHead({ Key: detail })}</div>
            <div className="col-md-7">
              {detail.Decks.map((e, i) => {
                return (
                  <div className="row" key={i}>
                    <img
                      src={
                        "/SteelDivisionDB/img-sd2/divs/" +
                        e.Emblem.split("Emblem_")[1].toLowerCase() +
                        ".png"
                      }
                      className="img-back"
                      alt="divemblem"
                    />
                    <h5>
                      {e.Rule
                        ? e.Rule.Descriptor
                          ? "Cards: " + e.Rule.MaxPackNumber
                          : "Units: " + e.Rule
                        : ""}
                    </h5>
                    <h5>Per pack: {e.Rule.UnitsPerPack.toString()}</h5>
                    <h5>Vet. bonus: {e.Rule.XPBonus.toString()}</h5>
                  </div>
                );
              })}
            </div>
            <button
              className="btn btn-danger popup-close"
              onClick={() => setDetail(null)}
            >
              X
            </button>
          </div>
        </div>
        <UnitModules x={{ Key: detail }} />
      </div>
    </div>
  ) : (
    <div />
  );
}

export function WeaponWeaponRow({ x, i }) {
  try {
    return (
      <React.Fragment>
        <td key={i}>
          <img
            src={
              "/SteelDivisionDB/img-sd2/guns/" +
              x.InterfaceWeaponTexture.toLowerCase() +
              ".png"
            }
            className="img-weapon"
            alt={x.InterfaceWeaponTexture}
          />
        </td>
        <td>{x.Name.replace("#arme{", "").replace("} ", "x")}</td>
        <td>{x.Caliber}</td>
        <td>{x.IndirectFire ? "Yes" : "No"}</td>
        <td>{x.isAPCR ? "Yes" : "No"}</td>
        <td>{x.HitRollRule.HitValueModList[1].Value}</td>
        <td>{x.HitRollRule.HitValueModList[2].Value}</td>
        <td>{x.AimTime}</td>
        <td>{x.DispersionAtMinRange ? x.DispersionAtMinRange : "N/A"}</td>
        <td>{x.DispersionAtMaxRange ? x.DispersionAtMaxRange : "N/A"}</td>
        <td>{x.RangeMin}</td>
        <td>{x.RangeMax}</td>
        <td>{x.RangeMaxAAA}</td>
      </React.Fragment>
    );
  } catch (error) {
    global.throw("Weapon DB invalid", x, error);
    return <React.Fragment></React.Fragment>;
  }
}

export function WeaponWeaponCard({ detail, setDetail }) {
  return detail ? (
    <div className=" popup-unit">
      <div className="card">
        <div className="row card-header mr-0 ml-0">
          <div className="col-1">
            <button
              className="btn btn-danger popup-close"
              onClick={() => setDetail(null)}
            >
              X
            </button>
          </div>
          <div className="col-2">
            <img
              src={
                "/SteelDivisionDB/img-sd2/guns/" +
                detail.InterfaceWeaponTexture.toLowerCase() +
                ".png"
              }
              className="img-weapon"
              alt={detail.InterfaceWeaponTexture}
            />
          </div>
          <div className="col-3">
            <div className="row">
              <b>{detail.AmmoDescriptor}</b>
            </div>
            <div className="row">
              <h6>{detail.Caliber}</h6>
            </div>
            <div className="row">
              Indirect fire: {detail.IndirectFire ? "Yes" : "No"}
            </div>
            <div className="row">is APCR: {detail.isAPCR ? "Yes" : "No"}</div>
          </div>
          <div className="col-2">
            <ReactTooltip />
            <h6 data-tip="Idle/Moving">
              Accuracy:
              {detail.HitRollRule.HitValueModList[1].Value +
                "/" +
                detail.HitRollRule.HitValueModList[2].Value}
            </h6>
            <h6>Aim time:{detail.AimTime}</h6>
            <ReactTooltip />
            <h6 data-tip="Min range/Max range">
              Dispersion:
              {(detail.DispersionAtMinRange
                ? detail.DispersionAtMinRange
                : "N/A") +
                "/" +
                (detail.DispersionAtMaxRange
                  ? detail.DispersionAtMaxRange
                  : "N/A")}
            </h6>
            <h6 data-tip="Min/Max/AAA">
              Range:
              {detail.RangeMin +
                "/" +
                detail.RangeMax +
                "/" +
                detail.RangeMaxAAA}
            </h6>
          </div>
          <div className="col-4">
            {detail.Units.map((e, i) => (
              <h6 key={i}>{e}</h6>
            ))}
          </div>
        </div>
        <Ammo x={detail} />
      </div>
    </div>
  ) : (
    <div />
  );
}
