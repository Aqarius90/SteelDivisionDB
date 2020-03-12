import React, { useState } from "react";
import {
  parseAlias,
  parsePhase,
  parsePicture,
  parseArmor
} from "../../SD1/js/parsers";
import {
  DisplayAP,
  DisplayAV,
  DisplayPara,
  DisplaySpecial
} from "../../SD1/DisplayComponents";
import ReactTooltip from "react-tooltip";
import UnitModuleSimple from "../../SD1/DeckBuilderRight/UnitModuleSimple";
import { UnitModules } from "../../SD1/DeckBuilderRight/UnitModules";
import Ammo from "../../SD1/DeckBuilderRight/Ammo";

export function SD1DeckUnitCard({ x, i }) {
  const [show, setShow] = useState(false);
  return (
    <div className="card" key={i}>
      <div className="card-header" onClick={() => setShow(!show)}>
        <div className="row" data="test">
          <div className="col-2">
            <img
              src={parsePicture(x.Unit, "md")}
              className="img-sd2-back"
              alt="unitPortrait"
            />
            {x.Unit.SpecialtyTexture ? (
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/img/" +
                  x.Unit.SpecialtyTexture.replace(
                    "Texture_Speciality_Icon_",
                    ""
                  ).toLowerCase() +
                  ".tgv.png"
                }
                className={"img-xp"}
                alt={"DisplaySpecial"}
              />
            ) : (
              <div />
            )}
          </div>
          <div className="col-2">
            {x.TransportUnit ? (
              <>
                <img
                  src={parsePicture(x.TransportUnit, "md")}
                  className="img-sd2-back"
                  alt="unitPortrait"
                />
                <>
                  {x.Unit.SpecialtyTexture ? (
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        "/img/" +
                        x.Unit.SpecialtyTexture.replace(
                          "Texture_Speciality_Icon_",
                          ""
                        ).toLowerCase() +
                        ".tgv.png"
                      }
                      className={"img-xp"}
                      alt={"DisplaySpecial"}
                    />
                  ) : (
                    <div />
                  )}
                </>
              </>
            ) : (
              <div />
            )}
          </div>
          <div className="col-3">
            <h5>{parseAlias(x.Unit)}</h5>
            <h5>{x.TransportUnit ? parseAlias(x.TransportUnit) : ""}</h5>
          </div>
          <div className="col-3">
            <h5>
              Availability : {x.PackAvailabilty} of {x.UnitsPerPack}
            </h5>
            <h5>
              Phase: {parsePhase(x.AvailableFromPhase)} /Level:{" "}
              {x.Experiencelevel}:
            </h5>
          </div>
          <div className="col-2">
            <h5>
              {x.TransportUnit
                ? "Price: " +
                  x.Unit.ProductionPrice +
                  "+" +
                  x.TransportUnit.ProductionPrice
                : "Price: " + x.Unit.ProductionPrice}
            </h5>
          </div>
        </div>
      </div>
      <div className={show ? "d-block" : "d-none"}>
        <div className={"card-body "}>
          <UnitModuleSimple x={x.Unit} />
          {x.TransportUnit ? <UnitModuleSimple x={x.Unit} /> : <></>}
        </div>
      </div>
    </div>
  );
}

export function SD1DeckDeckRow({ x, setUnits }) {
  const [show, setShow] = useState(false);
  return (
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="col-3" onClick={() => setShow(!show)}>
            <h5>{x.Descriptor}</h5>
          </div>
          <div className="col-2" onClick={() => setShow(!show)}>
            <img
              src={
                process.env.PUBLIC_URL +
                "/img/d/" +
                x.EmblemTexture.toLowerCase() +
                ".tgv.png"
              }
              className="img-back"
              alt="divemblem"
            />
          </div>
          <div className="col-5" onClick={() => setShow(!show)}>
            <h4>{"Points: " + x.MaxActivationPoints}</h4>
            <h4>
              {"Income: " +
                x.PhaseA.Income +
                "/" +
                x.PhaseB.Income +
                "/" +
                x.PhaseC.Income}
            </h4>
          </div>
          <div className="col-2">
            <button
              className="btn btn-primary btn-block p-4"
              onClick={() => setUnits(x.PackList)}
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
            <div className="col-2">{x.DivisionTags}</div>
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

export function SD1UnitUnitRow({ x, i }) {
  try {
    return (
      <React.Fragment>
        <td>
          <img
            src={parsePicture(x, "md")}
            className="img-sd2-back"
            alt="unitPortrait"
          />
        </td>
        <td>{parseAlias(x)}</td>
        <td>
          {x.SpecialtyTexture ? (
            <img
              src={
                process.env.PUBLIC_URL +
                "/img/" +
                x.SpecialtyTexture.replace(
                  "Texture_Speciality_Icon_",
                  ""
                ).toLowerCase() +
                ".tgv.png"
              }
              className={"img-xp"}
              alt={"DisplaySpecial"}
            />
          ) : (
            <div />
          )}
        </td>
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
        <td>{x.Category}</td>
        <td>{x.OpticalStrength}</td>
        <td>{x.UnitConcealmentBonus}</td>
        <td>
          {x.AirMaxspeed
            ? x.AirMaxspeed.replace("((", "").replace(") * Metre)", "") +
              "/" +
              x.AirVitesseCombat.replace("((", "").replace(") * Metre)", "")
            : x.Maxspeed.replace("(", "") +
              "/" +
              x.VitesseCombat.replace("(", "")}
        </td>
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
        <td>{x.AirMaxspeed ? x.SupplyCapacity : x.FuelMoveDuration}</td>
      </React.Fragment>
    );
  } catch (error) {
    global.throw("Unit DB invalid", x, error);
    return <React.Fragment></React.Fragment>;
  }
}

export function SD1UnitUnitCard({ detail, setDetail }) {
  return detail ? (
    <div className=" popup-unit">
      <div className="card">
        <div className="card-header">
          <div className="row p-1">
            <div className="col-xl-3">
              <img
                src={parsePicture(detail, "bg")}
                className="img-big"
                alt="unitPortrait"
              />
            </div>
            <div className="col-xl-2">
              <h4>{parseAlias(detail)}</h4>
              <DisplayAP AP={detail.APValue} css="img-xp" />
              <DisplayAV AV={detail.PlatingValue} css="img-xp" />
              <DisplayPara IsParachutist={detail.IsParachutist} />
              <DisplaySpecial Spec={detail.SpecialtyTexture} css="img-xp" />
            </div>
            <div className="col-xl-7">
              {detail.Decks.map((e, i) => {
                return (
                  <div className="row" key={i}>
                    <div className="col-2">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/img/d/" +
                          e.Emblem.toLowerCase() +
                          ".tgv.png"
                        }
                        className="img-back"
                        alt="divemblem"
                      />
                    </div>
                    <div className="col-10">
                      <h6>
                        {e.Rule
                          ? e.Rule.TransportUnit
                            ? e.Rule.Unit + "/" + e.Rule.TransportUnit
                            : e.Rule.Unit
                          : ""}
                      </h6>
                      <h6>
                        {e.Rule.PackAvailabilty +
                          " cards of " +
                          e.Rule.UnitsPerPack +
                          ", " +
                          parsePhase(e.Rule.AvailableFromPhase) +
                          "/" +
                          e.Rule.Experiencelevel}
                      </h6>
                    </div>
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
        <UnitModules Unit={detail} />
      </div>
    </div>
  ) : (
    <div />
  );
}

export function SD1WeaponWeaponRow({ x, i }) {
  try {
    return (
      <React.Fragment>
        <td key={i}>
          <img
            src={
              process.env.PUBLIC_URL +
              "/img/w/" +
              x.InterfaceWeaponTexture.toLowerCase().replace(
                "~/texture_interface_weapon_",
                ""
              ) +
              ".tgv.png"
            }
            className="img-weapon"
            alt={x.InterfaceWeaponTexture}
          />
        </td>
        <td>{x.AmmoDescriptor.replace("Ammo_", " ").replace("_", " ")}</td>
        <td>{x.Caliber}</td>
        <td>{x.TirIndirect ? "Yes" : "No"}</td>
        <td>{}</td>
        <td>{x.HitRollRule.Idling}</td>
        <td>{x.HitRollRule.Moving}</td>
        <td>{x.TempsDeVisee}</td>
        <td>
          {x.DispersionAtMaxRange
            ? x.DispersionAtMaxRange.replace("((", "").replace(") * Metre)", "")
            : "N/A"}
        </td>
        <td>
          {x.PorteeMinimale
            ? x.PorteeMinimale.replace("((", "").replace(") * Metre)", "")
            : "N/A"}
        </td>
        <td>
          {x.PorteeMaximale
            ? x.PorteeMaximale.replace("((", "").replace(") * Metre)", "")
            : "N/A"}
        </td>
        <td>
          {x.PorteeMinimaleTBA
            ? x.PorteeMinimaleTBA.replace("((", "").replace(") * Metre)", "")
            : "N/A"}
        </td>
        <td>
          {x.PorteeMaximaleTBA
            ? x.PorteeMaximaleTBA.replace("((", "").replace(") * Metre)", "")
            : "N/A"}
        </td>
      </React.Fragment>
    );
  } catch (error) {
    global.throw("Weapon DB invalid", x, error);
    return <React.Fragment></React.Fragment>;
  }
}

export function SD1WeaponWeaponCard({ detail, setDetail }) {
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
                process.env.PUBLIC_URL +
                "/img/w/" +
                detail.InterfaceWeaponTexture.toLowerCase().replace(
                  "~/texture_interface_weapon_",
                  ""
                ) +
                ".tgv.png"
              }
              className="img-weapon"
              alt={detail.InterfaceWeaponTexture}
            />
          </div>
          <div className="col-3">
            <div className="row">
              <b>
                {detail.AmmoDescriptor.replace("Ammo_", "").replace("_", "")}
              </b>
            </div>
            <div className="row">
              <h6>{detail.Caliber}</h6>
            </div>
            <div className="row">
              Indirect fire: {detail.TirIndirect ? "Yes" : "No"}
            </div>
          </div>
          <div className="col-2">
            <ReactTooltip />
            <h6 data-tip="Idle/Moving">
              Accuracy:
              {detail.HitRollRule.Idling + "/" + detail.HitRollRule.Moving}
            </h6>
            <h6>Aim time:{detail.TempsDeVisee}</h6>
            <ReactTooltip />
            <h6 data-tip="Max range">
              Dispersion:
              {detail.DispersionAtMaxRange
                ? detail.DispersionAtMaxRange.replace("((", "").replace(
                    ") * Metre)",
                    ""
                  )
                : "N/A"}
            </h6>
            <h6 data-tip="Min/Max/MinAAA/MaxAAA">
              Range:
              {detail.PorteeMinimale.replace("((", "").replace(
                ") * Metre)",
                ""
              ) +
                "/" +
                detail.PorteeMaximale.replace("((", "").replace(
                  ") * Metre)",
                  ""
                ) +
                "/" +
                detail.PorteeMinimaleTBA.replace("((", "").replace(
                  ") * Metre)",
                  ""
                ) +
                "/" +
                detail.PorteeMaximaleTBA.replace("((", "").replace(
                  ") * Metre)",
                  ""
                )}
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
