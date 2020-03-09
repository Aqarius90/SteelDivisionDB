import React from "react";
import { Spec } from "./dict";

export function getSpec(x, css) {
  if (x.Key.SpecToken) {
    return (
      <img
        src={Spec.find(e => e.k === x.Key.SpecToken).i}
        className={css}
        alt={x.Key.SpecToken}
      />
    );
  }
  return;
}

export function getPortrait(x, css) {
  if (css) {
    return (
      <img
        src={
          process.env.PUBLIC_URL +
          "/img-sd2/pictures/" +
          x.Key.UnitDescriptor.toLowerCase() +
          ".png"
        }
        className={css}
        alt="unitPortrait"
      />
    );
  }
  return (
    <img
      src={
        process.env.PUBLIC_URL +
        "/img-sd2/units/" +
        x.Key.UnitDescriptor.toLowerCase() +
        ".png"
      }
      className="img-sd-back"
      alt="unitPortrait"
    />
  );
}

export function parsePhaseAvail(x, y) {
  if (x.reduce((a, b) => a + b)) {
    //if any, return true
    return y;
  }
  return "-";
}

export function parseArmor(x) {
  if (x) {
    var foo = x;
    //foo = foo === "ArmorDescriptor_Toit" ? "Roof" : foo;
    foo = foo.replace("ArmorDescriptor_", "");
    foo = foo.replace("Lourd", "Heavy");
    foo = foo.replace("Toit", "Roof"); //"roof"
    foo = foo.replace("_", " ");
    foo = foo.replace("Infanterie", "Infantry");
    foo = foo.replace("Batiment", "Fortification");
    foo = foo.replace("Canon", "Gun");
    foo = foo.replace("Avion", "Aircraft");
    if (foo.includes("Blindage")) {
      foo = foo.replace("Blindage", "");
      foo = parseInt(foo) * 5 + "mm";
    }
    return foo;
  }
  return "DBERROR";
}
export function parseTransport(x) {
  if (x === 0) {
    return "none";
  } else if (x === 2) {
    return "Light";
  } else if (x === 3) {
    return "Heavy";
  } else if (x === 3) {
    return "Not towable";
  } else {
    return "N/A";
  }
}

export function parseSpecialDetection(x) {
  if (x) {
    return (
      <div className="col-xl">
        <h6>Special detection bonus:</h6>
        <ul>
          {x.map((e, i) => {
            return (
              <li key={i}>
                {e.replace("EVisionUnitType/", "").replace(".0 * Metre", "")}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
  return <div />;
}

export function parseTerrainList(x) {
  if (x) {
    return (
      <div className="col-xl">
        <h6>AutoCover Terrain List:</h6>
        <ul>
          {x.map((e, i) => {
            return e ? (
              <li key={i}>{e.replace("/ETerrainType/", "")}</li>
            ) : (
              <div key={i} />
            );
          })}
        </ul>
      </div>
    );
  }
  return <div />;
}

export function parseStrategyList(x) {
  if (x) {
    return (
      <div className="col-xl">
        <h6>Attack strategy list:</h6>
        <ul>
          {x.map((e, i) => {
            return e ? <li key={i}>{e}</li> : <div key={i} />;
          })}
        </ul>
      </div>
    );
  }
  return <div />;
}
