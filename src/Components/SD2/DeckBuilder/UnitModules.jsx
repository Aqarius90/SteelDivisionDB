import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import {
  parseSpecialDetection,
  parseTerrainList,
  parseStrategyList
} from "../js/unitGUIparsers";
import { GunNoiseParser, TurretHeader } from "./AuxModules";
import ReactTooltip from "react-tooltip";

function UnitModules({ x }) {
  if (x != null) {
    return (
      <React.Fragment>
        <ReactTooltip />
        <Tabs className="card">
          <TabList className="card-header">
            <Tab>Weapons</Tab>
            <Tab>Recon</Tab>
            <Tab>Mobility</Tab>
            <Tab>Survivability</Tab>
            <Tab>Aux</Tab>
          </TabList>
          <TabPanel>
            <div className="card">
              {x.Key.Weapons
                ? x.Key.Weapons.Turrets.map((arg, i) => (
                    <Weapons t={arg} salves={x.Key.Weapons.Salves} key={i} />
                  ))
                : null}
            </div>
            <div className="card">
              {x.Key.Offmap ? (
                <Weapons
                  t={x.Key.Offmap.Turrets[0]}
                  salves={x.Key.Offmap.Salves}
                />
              ) : (
                <div />
              )}
            </div>
          </TabPanel>
          <TabPanel>
            <Recon x={x.Key}></Recon>
          </TabPanel>
          <TabPanel>
            {x.Key.isPlane ? (
              <Air x={x.Key}></Air>
            ) : (
              <Mobility x={x.Key}></Mobility>
            )}
          </TabPanel>
          <TabPanel>
            <Survivability x={x.Key}></Survivability>
          </TabPanel>
          <TabPanel>
            <Aux x={x.Key}></Aux>
          </TabPanel>
        </Tabs>
      </React.Fragment>
    );
  }
  return <div />;
}
function Recon({ x }) {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-xl">
          <ul>
            <ReactTooltip />
            <li data-tip="land/air">
              Optics:
              {x.OpticalStrength + "/" + x.OpticalStrengthAltitude}
            </li>
            <ReactTooltip />
            <li data-tip="land/air">
              Vision Range: {x.VisionRange + "/" + x.VisionRangeTBA}
            </li>
            <li>Air Detection: {x.DetectionTBA}</li>
            <li>Base identify chance: {x.IdentifyBaseProbability}</li>
            <li>Identify roll interval: {x.TimeBetweenEachIdentifyRoll}</li>
          </ul>
        </div>
        <div className="col-xl">
          <ul>
            <li>Unit Vision Type: {x.VisionUnitType}</li>
            <li>Vision Obstruction Type: {x.VisionObstructionType}</li>
            <li>Terrain Stealth Type: {x.TerrainStealthType}</li>
            <li>Camo: {x.UnitConcealmentBonus}</li>
          </ul>
        </div>
      </div>
      <div className="row m-2">
        {parseSpecialDetection(x.SpecialisedDetection)}
        <GunNoiseParser x={x.Weapons} />
      </div>
    </React.Fragment>
  );
}
function Mobility({ x }) {
  return (
    <div className="row">
      <div className="col-xl">
        <ul>
          <ReactTooltip />
          <li data-tip="Max/Combat">
            Speed: {x.Maxspeed + "/" + x.CombatSpeed}
          </li>
          <li>SpeedBonusOnRoad: {x.SpeedBonusOnRoad}</li>
          <li>MaxAcceleration: {x.MaxAcceleration}</li>
          <li>MaxDeceleration: {x.MaxDeceleration}</li>
        </ul>
      </div>
      <div className="col-xl">
        <ul>
          <li>UnitMovingType: {x.UnitMovingType}</li>
          <li>PathfindType: {x.PathfindType.replace("PathfindTypes/", "")}</li>
          <li>Transporter: {x.IsTransporter ? "Yes" : "No"}</li>
          <li>Towable: {x.isTowable ? "Yes" : "No"}</li>
        </ul>
      </div>
      <div className="col-xl">
        <ul>
          <li>StartTime: {x.StartTime.replace(" * Seconde", "")}</li>
          <li>StopTime: {x.StopTime.replace(" * Seconde", "")}</li>
          <ReactTooltip />
          <li data-tip="start/stop/turn-around">
            Rotation Time:{" "}
            {x.RotationStartTime.replace("(", "").replace(" * Seconde", "") +
              "/" +
              x.RotationStopTime.replace("(", "").replace(" * Seconde", "") +
              "/" +
              x.HalfTurnTime}
          </li>
        </ul>
      </div>
    </div>
  );
}
function Survivability({ x }) {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-xl">
          <ul>
            <li>Default AutoCover: {x.DefaultAutoCover}</li>
            <li>AutoCover Range: {x.AutoCoverRange}</li>
            <li>Cover OccupationRadius: {x.OccupationRadius}</li>
            <li>UseTerrainForEscape: {x.UseTerrainForEscape ? "Yes" : "No"}</li>
            <li>Auto orient front: {x.AutoOrientation ? "Yes" : "No"}</li>
            <li>UseTopArmor: {x.UseTopArmorAgainstFire ? "Yes" : "No"}</li>
            <li>GroundDamageType: {x.TypeForGroundDamageModifier}</li>
          </ul>
        </div>
        <div className="col-xl">
          <ul>
            <li>MoralLevel: {x.MoralLevel}</li>
            <li>
              Stun Freezes Units:{" "}
              {x.DamageDescriptor.StunFreezesUnits ? "Yes" : "No"}
            </li>
            <li>
              Stun Regen:{" "}
              {x.DamageDescriptor.StunDamagesRegen.replace(
                "_StunDamagesRegen",
                ""
              )}
            </li>
            <li>
              Stun Threshold:{" "}
              {x.DamageDescriptor.StunDamagesToGetStunned.replace(
                "_StunDamagesToGetStunned",
                ""
              )}
            </li>
            <li>
              Suppression Threshold:{" "}
              {x.DamageDescriptor.MaxSuppressionDamages.replace(
                "_MaxSuppressionDamages",
                ""
              )}
            </li>
            <li>
              TypeForGroundDamageModifier: {x.TypeForGroundDamageModifier}
            </li>
          </ul>
        </div>
      </div>
      <div className="row m-2">{parseTerrainList(x.AutoCoverTerrainList)}</div>
    </React.Fragment>
  );
}
function Aux({ x }) {
  return (
    <div className="row">
      <div className="col-xl">
        <ul>
          <li>ProductionYear: {x.ProductionYear}</li>
          <li>StrengthDecayPerSecond: {x.StrengthDecayPerSecond}</li>
          <li>PreventsDecayInZone: {x.PreventsDecayInZone ? "Yes" : "No"}</li>
          <li>CircleFormation: {x.CircleFormation ? "Yes" : "No"}</li>
          <li>UnitType: {x.UnitType}</li>
          <li>CommanderLevel: {x.CommanderLevel}</li>
          <li>MotherCountry: {x.MotherCountry}</li>
        </ul>
      </div>
      <div className="col-xl">
        <ul>
          <ReactTooltip />
          <li data-tip='99 means "untransportable"'>
            Seats occupied: {x.NbSeatsOccupied}
          </li>
          <li>TimeToLoad: {x.TimeToLoad ? x.TimeToLoad : "N/A"}</li>
          <li>isTowable: {x.IsTowable ? "True" : "False"}</li>
          <li>TransportableTagSet: {x.TransportableTagSet}</li>
          <li>NbSeatsAvailable: {x.NbSeatsAvailable}</li>
          <li>SupplyCapacity: {x.SupplyCapacity}</li>
          <li>isSupply: {x.isSupply ? "True" : "False"}</li>
        </ul>
      </div>
      <div className="col-xl">
        <ul>
          <li>IsParachutist: {x.IsParachutist ? "True" : "False"}</li>
          <li>IsCommandementUnit: {x.IsCommandementUnit ? "True" : "False"}</li>
          <li>isPlane: {x.isPlane ? "True" : "False"}</li>
          <li>IsTransporter: {x.IsTransporter ? "True" : "False"}</li>
          <li>isBuilding: {x.isBuilding ? "True" : "False"}</li>
          <li>isBunker: {x.isBunker ? "True" : "False"}</li>
        </ul>
      </div>
      <ul>
        <li>
          Tags:
          {x.TagSet.map(x => {
            return x + ", ";
          })}
        </li>
      </ul>
    </div>
  );
}
function Air({ x }) {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-xl">
          <ul>
            <ReactTooltip />
            <li data-tip="min/normal/max">
              Altitude:{" "}
              {x.AltitudeMin.replace("(", "").replace(" * Metre)", "") +
                "/" +
                x.Altitude.replace("((", "").replace(") * Metre)", "") +
                "/" +
                x.AltitudeMax.replace("$/GFX/Everything/", "")}
            </li>
            <li>AirSpeed:{x.AirSpeed}</li>
            <li>Fuel/TOT: {x.FuelCapacity + "/" + x.FuelMoveDuration}</li>
            <li>Turn-Around time: {x.HalfTurnTime} s</li>
            <li>Evacuation Time: {x.PlaneEvacuationTime} s</li>
          </ul>
        </div>
        <div className="col-xl">
          <ul>
            <li>
              AgilityRadius:{" "}
              {x.AgilityRadius.replace("((", "").replace(") * Metre)", "")}
            </li>
            <li>PitchAngle: {x.PitchAngle}</li>
            <li>RollAngle: {x.RollAngle}</li>
            <li>RollSpeed: {x.RollSpeed}</li>
            <li>EvacAngle: {x.EvacAngle}</li>
          </ul>
        </div>
      </div>
      <div className="row m-2">
        {parseStrategyList(x.AttackStrategyDescriptors)}
      </div>
    </React.Fragment>
  );
}
function Weapons({ t, salves }) {
  const [show, setShow] = useState(false);
  return (
    <div className="card">
      <TurretHeader t={t} salves={salves} show={show} setShow={setShow} />
      <div className={show ? "d-block" : "d-none"}>
        <div className="row card-body mr-0 ml-0">
          <div className="col-xl">
            <p>Aim Priority: {t.AimingPriority}</p>
          </div>
          <ReactTooltip />
          <div className="col-xl" data-tip="base/max">
            <p>Rotation: {t.AngleRotationBase + "/" + t.AngleRotationMax}</p>
          </div>
          <ReactTooltip />
          <div className="col-xl" data-tip="min/base/max">
            <p>
              Rotation pitch:{" "}
              {t.AngleRotationMinPitch +
                "/" +
                t.AngleRotationBasePitch +
                "/" +
                t.AngleRotationMaxPitch}
            </p>
          </div>
          <div className="col-xl">
            <p>Rot. Speed: {t.RotationSpeed}</p>
          </div>
          <div className="col-xl">
            <p>Master turret index: {t.MasterTurretIndex}</p>
          </div>
          <div className="col-xl-12">
            {t.Weapons.map((x, i) => {
              return (
                <div className="card" key={i}>
                  <div className="row card-header mr-0 ml-0">
                    <div className="col">
                      <div className="row">
                        <b>{x.Ammunition.AmmoDescriptor}</b>
                      </div>
                      <div className="row">
                        <h6>{x.Ammunition.Caliber}</h6>
                      </div>
                      <div className="row">
                        Indirect fire:{" "}
                        {x.Ammunition.IndirectFire ? "Yes" : "No"}
                      </div>
                      <div className="row">
                        is APCR: {x.Ammunition.isAPCR ? "Yes" : "No"}
                      </div>
                    </div>
                    <div className="col">
                      <ReactTooltip />
                      <h6 data-tip="Idle/Moving">
                        Accuracy:
                        {x.Ammunition.HitRollRule.HitValueModList[1].Value +
                          "/" +
                          x.Ammunition.HitRollRule.HitValueModList[2].Value}
                      </h6>
                      <h6>Aim time:{x.Ammunition.AimTime}</h6>
                      <ReactTooltip />
                      <h6 data-tip="Min range/Max range">
                        Dispersion:
                        {(x.Ammunition.DispersionAtMinRange
                          ? x.Ammunition.DispersionAtMinRange
                          : "N/A") +
                          "/" +
                          (x.Ammunition.DispersionAtMaxRange
                            ? x.Ammunition.DispersionAtMaxRange
                            : "N/A")}
                      </h6>
                      <h6 data-tip="Min/Max/AAA">
                        Range:
                        {x.Ammunition.RangeMin +
                          "/" +
                          x.Ammunition.RangeMax +
                          "/" +
                          x.Ammunition.RangeMaxAAA}
                      </h6>
                    </div>
                  </div>
                  {<Ammo x={x.Ammunition} />}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Ammo({ x }) {
  return (
    <div className="row card-body">
      <div className="col-xl-4">
        <li>
          <p>Power: {x.Power}</p>
        </li>
        <li>
          <ReactTooltip />
          <p data-tip="min, average, max">
            Time between shots: {x.TimeBetweenShots.toString()}
          </p>
        </li>
        <li>
          <p>Time between shot effects: {x.TimeBetweenShotFX}</p>
        </li>
        <li>
          <p>
            Damage drop with range:{" "}
            {(function() {
              if (x.RangeScaling) {
                switch (x.RangeScalingCurve) {
                  case "nil":
                    return "none";
                  case "~/DamageTypeEvolutionOverRangeDescriptor_Chute_Lente":
                    return "Slow";
                  case "~/DamageTypeEvolutionOverRangeDescriptor_Chute_Rapide":
                    return "Fast";
                  case "~/DamageTypeEvolutionOverRangeDescriptor_Chute_Tres_Rapide":
                    return "Very fast";
                  default:
                    global.throw(
                      "Damage drop with range parse error",
                      x.RangeScalingCurve
                    );
                    return "parse error";
                }
              }
              return "None";
            })()}
          </p>
        </li>
        <li>
          <ReactTooltip />
          <p data-tip="Min range/Max range">
            Dispersion:
            {(x.DispersionAtMinRange ? x.DispersionAtMinRange : "N/A") +
              "/" +
              (x.DispersionAtMaxRange ? x.DispersionAtMaxRange : "N/A")}
          </p>
        </li>
        <li>
          <p>
            Physical damage/radius:{" "}
            {x.PhysicalDamages + "/" + x.RadiusSplashPhysicalDamages}
          </p>
        </li>
        <li>
          <p>
            Suppress damage/radius:{" "}
            {x.SuppressDamages + "/" + x.RadiusSplashSuppressDamages}
          </p>
        </li>
        <li>
          <p>Pin radius: {x.PinnedArea}</p>
        </li>
      </div>
      <div className="col-xl-4">
        <li>
          <p>
            Reflex fire:{" "}
            {(x.ReflexFire ? "True" : "False") +
              ", " +
              (x.ForbidReflexFire ? "Allowed" : "Forbidden")}
          </p>
        </li>
        <li>
          <p>Gun Noise Malus: {x.ShotNoiseCamoPenalty}</p>
        </li>
        <li>
          <p>Shots to max noise malus: {x.ShotsBeforeMaxNoise}</p>
        </li>
        <li>
          <p>Supply Cost: {x.SupplyCost}</p>
        </li>
        <li>
          <p>Targets Districts: {x.TargetsDistricts ? "True" : "False"}</p>
        </li>
        <li>
          <p>Aim time: {x.AimTime}</p>
        </li>
        <li>
          <ReactTooltip />
          <p data-tip="min, average, max">
            Time between Salvos: {x.TimeBetweenSalvos.toString()}
          </p>
        </li>
        <li>
          <p>
            Shots/ammo per salvo:{" "}
            {x.ShotsPerSalvo + "/" + x.AmmoDisplayPerSalvo}
          </p>
        </li>
      </div>
      <div className="col-xl-4">
        <li>
          <p>Ripple fires: {x.SimultaneousProjectiles}</p>
        </li>
        <li>
          <p>SmokeDescriptor: {x.SmokeDescriptor}</p>
        </li>
        <li>
          <p>FireDescriptor: {x.FireDescriptor}</p>
        </li>
        <li>
          <p>Friendly fire: {x.IsHarmlessForAllies ? "False" : "True"}</p>
        </li>
        <li>
          <p>AT Weapon: {x.PiercingWeapon ? "True" : "False"}</p>
        </li>
        <li>
          <p>Scales with HP: {x.AffectedByNumber ? "True" : "False"}</p>
        </li>
        <li>
          <p>
            Targers Air/vehicles/infantry:
            {(x.CanHarmAirplanes ? "Yes" : "No") +
              "/" +
              (x.CanHarmVehicles ? "Yes" : "No") +
              "/" +
              (x.CanHarmInfantry ? "Yes" : "No")}
          </p>
        </li>
        <li>
          <ReactTooltip />
          <p data-tip="Base/Idle/Moving/SuccessfulShots/Targeted">
            Hit roll rules:{x.HitRollRule.HitValueModList[0].Value}/
            {x.HitRollRule.HitValueModList[1].Value}/
            {x.HitRollRule.HitValueModList[2].Value}/
            {x.HitRollRule.HitValueModList[3].Value}/
            {x.HitRollRule.HitValueModList[4].Value}
          </p>
        </li>
      </div>
      <p>
        HitMods:{" "}
        {x.HitRollRule.HitModList.map(x => {
          return x + "|";
        })}
      </p>
    </div>
  );
}

export default UnitModules;
