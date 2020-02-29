import React, { PureComponent } from "react";
import { parseRange, parseAOE } from "./js/parsers";

export class DisplayAP extends PureComponent {
  render() {
    let AP = this.props.AP;
    let css = this.props.css;
    if (AP === "True") {
      return (
        <img
          src="SteelDivisionDB/img/icone_fantassin.tgv.png"
          className={css}
          alt="bazooka"
        />
      );
    } else if (AP === "False") {
      return (
        <img
          src="SteelDivisionDB/img/icone_ap.tgv.png"
          className={css}
          alt="none"
        />
      );
    } else {
      if (css === "img-xp") {
        return <h6>AP: {AP}</h6>;
      } else {
        return <h5 className="txt-rel-ap">{AP}</h5>;
      }
    }
  }
}

export class DisplayAV extends PureComponent {
  render() {
    let AV = this.props.AV;
    let css = this.props.css;
    if (AV === 0) {
      return (
        <img
          src="SteelDivisionDB/img/icone_ap.tgv.png"
          className={css}
          alt="none"
        />
      );
    } else {
      if (css === "img-xp") {
        return <h6>FAV: {AV}</h6>;
      } else {
        return <h5 className="txt-rel-av">{AV}</h5>;
      }
    }
  }
}

export class DisplayAmmoProps extends PureComponent {
  showWeapon = (x, i) => {
    if (x.Type.includes("AP")) {
      x.Power = x.Type.replace("AP_", "");
      x.Type = "AP";
    }
    if (x.Barrage !== 0 && x.Salvos === 1) {
      x.Salvos = x.Barrage;
    } //barrage for normal artillery, burst for normal units and MRLS
    return (
      <div className="col-xl" key={i}>
        <p>
          {x.Type}: {x.Mags} loads of {x.Salvos}
        </p>
        <p>
          Power:
          {x.Power}
        </p>
        <p>
          Accuracy:
          {x.Accuracy}
        </p>
        <p>
          Range:
          {x.Range}
        </p>
        <p>{x.AOE}</p>
      </div>
    );
  };

  render() {
    let x = this.props.Weapons;
    let salves = this.props.salves;
    let Ammos = [];

    for (let i = 0; i < x.length; i++) {
      let Type = x[i].Ammunition.Arme.replace(
        "Arme                              = EArmeType/",
        ""
      );
      let Mags = salves[x[i].SalvoStockIndex];
      let Salvos = x[i].Ammunition.NbTirParSalves;
      let Barrage = x[i].Ammunition.NbSalvosShootOnPosition;
      let Power = x[i].Power_ForInterface;
      let Accuracy;
      if (x[i].Ammunition.HitRollRule.Idling === "0.0") {
        Accuracy = x[i].Ammunition.DispersionAtMaxRange.replace(
          ") * Metre)",
          ""
        ).replace("((", "");
      } else {
        Accuracy = x[i].Ammunition.HitRollRule.Idling;
      }
      let Range = parseRange(x[i].Ammunition);
      let AOE = parseAOE(x[i].Ammunition.RadiusSplashPhysicalDamages);

      Ammos.push({ Type, Mags, Salvos, Barrage, Power, Accuracy, Range, AOE });
    }

    return <React.Fragment>{Ammos.map(this.showWeapon)}</React.Fragment>;
  }
}

export class DisplayExp extends PureComponent {
  render() {
    let x = this.props.Experiencelevel;
    let css = this.props.css;
    if (x === 0) {
      return <div />;
    } else if (x === 1) {
      return (
        <img src="SteelDivisionDB/img/grade1.tgv.png" className={css} alt={x} />
      );
    } else if (x === 2) {
      return (
        <img src="SteelDivisionDB/img/grade2.tgv.png" className={css} alt={x} />
      );
    } else if (x === 3) {
      return (
        <img src="SteelDivisionDB/img/grade3.tgv.png" className={css} alt={x} />
      );
    }
  }
}

export class DisplayPara extends PureComponent {
  render() {
    let x = this.props.IsParachutist;
    if (x) {
      return (
        <img
          src="SteelDivisionDB/img/para_wingr.tgv.png"
          className="img-xp"
          alt="displayPara"
        />
      );
    }
    return <div />;
  }
}

export class DisplaySpecial extends PureComponent {
  render() {
    let x = this.props.Spec;
    let css = this.props.css;
    if (x === null) {
      return <div />;
    }
    return (
      <img
        src={
          "SteelDivisionDB/img/" +
          x.replace("Texture_Speciality_Icon_", "").toLowerCase() +
          ".tgv.png"
        }
        className={css}
        alt={"DisplaySpecial"}
      />
    );
  }
}
