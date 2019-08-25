import React, { useState } from "react";
export function parsePhaseAvail(x, y) {
  if (x.reduce((a, b) => a + b)) {
    //if any, return true
    return y;
  }
  return "-";
}

export function parseBool(x) {
  return x ? "True" : "False";
}

export function DisplayAP(AP, css) {
  switch (AP) {
    case "HEAT":
      return (
        <img src="img/icone_fantassin.tgv.png" className={css} alt="HEAT" />
      );
    case "none":
      return <img src="img/icone_ap.tgv.png" className={css} alt="none" />;
    default: {
      if (css === "img-xp") {
        return <h6>AP: {AP}</h6>;
      } else {
        return <h5 className="txt-rel-ap">{AP}</h5>;
      }
    }
  }
}

export function DisplayAV(AV, css) {
  switch (AV) {
    case "none":
      return <img src="img/icone_ap.tgv.png" className={css} alt="none" />;
    default: {
      if (css === "img-xp") {
        return <h6>FAV: {AV}</h6>;
      } else {
        return <h5 className="txt-rel-av">{AV}</h5>;
      }
    }
  }
}
