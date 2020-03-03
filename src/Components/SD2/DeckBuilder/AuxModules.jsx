import React from "react";
import { parseArmor } from "../js/unitGUIparsers";
import ReactTooltip from "react-tooltip";

export function ParseArmor({ x, tag }) {
  return (
    <ul>
      <li>
        Front:
        {parseArmor(x.ArmorDescriptorFront)}
      </li>
      <li>Side: {parseArmor(x.ArmorDescriptorSides)}</li>
      <li>Back: {parseArmor(x.ArmorDescriptorRear)}</li>
      <li>Top: {tag.indexOf("Vehicule_OpenTop") === -1 ? "Closed" : "True"}</li>
    </ul>
  );
}

export function GunNoiseParser({ x }) {
  if (x === null) {
    return <div />;
  }
  return (
    <div className="col-xl p-1">
      <h6>Gun Noise Malus:</h6>
      {x.Turrets.map((e, i) => {
        return (
          <div key={i}>
            {e.Weapons.map((ew, j) => {
              return (
                <ul key={j}>
                  <li>{ew.Ammunition.AmmoDescriptor.replace("Ammo_", "")}:</li>
                  <li>{ew.Ammunition.ShotNoiseCamoPenalty}</li>
                </ul>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export function TurretHeader({ t, salves, show, setShow }) {
  if (t) {
    return (
      <div className="row card-header mr-0 ml-0">
        <div className="col-2">
          <div className="row">
            <img
              src={
                "/SteelDivisionDB/img-sd2/guns/" +
                t.Weapons[0].Ammunition.InterfaceWeaponTexture.toLowerCase() +
                ".png"
              }
              className="img-weapon"
              alt={t.Weapons[0].Ammunition.InterfaceWeaponTexture}
            />
          </div>
          <div className="row justify-content-center">
            <b>
              {t.Weapons[0].Ammunition.Name.replace("#arme{", "").replace(
                "} ",
                "x"
              )}
            </b>
          </div>
          <div className="row justify-content-center">
            <b>{t.Weapons[0].Ammunition.Caliber}</b>
          </div>
          <div className="row justify-content-center">
            <h6>{t.Weapons[0].FireOnMove ? "Stabilized" : "Static"}</h6>
          </div>
          <div className="row justify-content-center">
            <button
              className="btn btn-block btn-secondary"
              onClick={() => setShow(!show)}
            >
              Details
            </button>
          </div>
        </div>
        <div className="col-10">
          <div className="row">
            <DisplayAmmoProps x={t.Weapons} salves={salves} />
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}

function DisplayAmmoProps({ x, salves }) {
  function showWeapon(x, salves, a, i) {
    //barrage for normal artillery, burst for normal units and MRLS
    /*if (a.SalvosPerFirePosition !== 0 && a.ShotsPerSalvo === 1) {
      a.ShotsPerSalvo = a.SalvosPerFirePosition;
    } */

    let type = "";
    switch (a.DamageTypeDisplay) {
      case "BalleDCA":
        type = "AAA";
        break;
      case "Artillerie":
        type = "Shells";
        break;
      case "Balle":
        type = "Rounds";
        break;
      case "Flamme":
        type = "Napalm";
        break;
      case "BalleAA":
        type = "AA Rounds";
        break;
      case "Frag":
        type = "HE-Frag";
        break;
      case "Bombe":
        type = "Bomb";
        break;

      default:
        type = a.DamageTypeDisplay;
        break;
    }
    return (
      <div className="col-3 card" key={i}>
        <ReactTooltip />
        <p
          data-tip={
            salves[x.SalvoStockIndex] +
            " salvos, " +
            a.ShotsPerSalvo +
            " shots each, from rack " +
            x.SalvoStockIndex
          }
        >
          {type}:{salves[x.SalvoStockIndex]}x{a.ShotsPerSalvo} (
          {x.SalvoStockIndex})
        </p>
        <ReactTooltip />
        <p data-tip="Idle/Moving">
          Accuracy:
          {a.HitRollRule.HitValueModList[1].Value +
            "/" +
            a.HitRollRule.HitValueModList[2].Value}
        </p>
        <p>Aim time:{a.AimTime}</p>
        <p data-tip="Physical/Supression">
          AOE:
          {a.RadiusSplashPhysicalDamages + "/" + a.RadiusSplashSuppressDamages}
        </p>
        <ReactTooltip />
        <p data-tip="Min range/Max range">
          Dispersion:
          {(a.DispersionAtMinRange ? a.DispersionAtMinRange : "N/A") +
            "/" +
            (a.DispersionAtMaxRange ? a.DispersionAtMaxRange : "N/A")}
        </p>
        <p data-tip="Min/Max/AAA">
          Range:{a.RangeMin + "/" + a.RangeMax + "/" + a.RangeMaxAAA}
        </p>
        <p data-tip="Physical/Supression">
          Damage:
          {a.PhysicalDamages && a.SuppressDamages
            ? a.PhysicalDamages + "/" + a.SuppressDamages
            : "Smoke"}
        </p>
      </div>
    );
  }

  return (
    <React.Fragment>
      {x.map((e, i) => showWeapon(e, salves, e.Ammunition, i))}
    </React.Fragment>
  );
}

export function VetIcon({ x, css }) {
  switch (x) {
    case 0:
      return (
        <img
          className={css}
          src="/SteelDivisionDB/img-sd2/iconrankveteran.tgv.png"
          alt="-"
        />
      );
    case 1:
      return (
        <img
          className={css}
          src="/SteelDivisionDB/img-sd2/iconrankelite.tgv.png"
          alt="^"
        />
      );
    case 2:
      return (
        <img
          className={css}
          src="/SteelDivisionDB/img-sd2/iconranksuperelite.tgv.png"
          alt="^^"
        />
      );
    default:
      global.throw("VetIcon in unit panel", x);
      return <div />;
  }
}
