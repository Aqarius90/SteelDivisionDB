import React, { PureComponent } from "react";
import { parseRange, parseAOE } from "./js/parsers";
import APicon from "../../pics/SD1/icone_ap.tgv.png";
import bazooka from "../../pics/SD1/icone_fantassin.tgv.png";
import xp1 from "../../pics/SD1/grade1.tgv.png";
import xp2 from "../../pics/SD1/grade2.tgv.png";
import xp3 from "../../pics/SD1/grade3.tgv.png";
import parawing from "../../pics/SD1/para_wingr.tgv.png";
import reco from "../../pics/SD1/spec_reconnaissance.tgv.png";
import supply from "../../pics/SD1/spec_ravitaillement.tgv.png";
import arty from "../../pics/SD1/spec_tir_indirect.tgv.png";
import radio from "../../pics/SD1/spec_radio.tgv.png";
import cmd from "../../pics/SD1/spec_commandement.tgv.png";
import nplm from "../../pics/SD1/spec_flamme.tgv.png";
import bmb1 from "../../pics/SD1/spec_bombes_1.tgv.png";
import bmb2 from "../../pics/SD1/spec_bombes_2.tgv.png";
import bmb3 from "../../pics/SD1/spec_bombes_3.tgv.png";
import amph from "../../pics/SD1/spec_amphibie.tgv.png";
import fighter from "../../pics/SD1/spec_canon.tgv.png";
import rck1 from "../../pics/SD1/spec_roquettes_1.tgv.png";
import rck2 from "../../pics/SD1/spec_roquettes_2.tgv.png";
import rck3 from "../../pics/SD1/spec_roquettes_3.tgv.png";
import smoke from "../../pics/SD1/spec_fumigene.tgv.png";
import AT1 from "../../pics/SD1/spec_at_1.tgv.png";
import shtraf from "../../pics/SD1/spec_decourage.tgv.png";
import shturm from "../../pics/SD1/spec_straffing.tgv.png";
import suicide from "../../pics/SD1/spec_suicide.tgv.png";

export class DisplayAP extends PureComponent {
  render() {
    let AP = this.props.AP;
    let css = this.props.css;
    if (AP === "True") {
      return <img src={bazooka} className={css} alt="bazooka" />;
    } else if (AP === "False") {
      return <img src={APicon} className={css} alt="none" />;
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
      return <img src={APicon} className={css} alt="none" />;
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
      return <img src={xp1} className={css} alt={x} />;
    } else if (x === 2) {
      return <img src={xp2} className={css} alt={x} />;
    } else if (x === 3) {
      return <img src={xp3} className={css} alt={x} />;
    }
  }
}

export class DisplayPara extends PureComponent {
  render() {
    let x = this.props.IsParachutist;
    if (x) {
      return <img src={parawing} className="img-xp" alt="displayPara" />;
    }
    return <div />;
  }
}

export class DisplaySpecial extends PureComponent {
  render() {
    let x = this.props.Spec;
    let css = this.props.css;
    switch (x) {
      case null:
        return <div />;
      case "Texture_Speciality_Icon_Spec_reconnaissance":
        x = reco;
        break;
      case "Texture_Speciality_Icon_Spec_ravitaillement":
        x = supply;
        break;
      case "Texture_Speciality_Icon_Spec_tir_indirect":
        x = arty;
        break;
      case "Texture_Speciality_Icon_Spec_radio":
        x = radio;
        break;
      case "Texture_Speciality_Icon_Spec_commandement":
        x = cmd;
        break;
      case "Texture_Speciality_Icon_Spec_flamme":
        x = nplm;
        break;
      case "Texture_Speciality_Icon_Spec_bombes_1":
        x = bmb1;
        break;
      case "Texture_Speciality_Icon_Spec_bombes_2":
        x = bmb2;
        break;
      case "Texture_Speciality_Icon_Spec_bombes_3":
        x = bmb3;
        break;
      case "Texture_Speciality_Icon_Spec_amphibie":
        x = amph;
        break;
      case "Texture_Speciality_Icon_Spec_canon":
        x = fighter;
        break;
      case "Texture_Speciality_Icon_Spec_roquettes_1":
        x = rck1;
        break;
      case "Texture_Speciality_Icon_Spec_roquettes_2":
        x = rck2;
        break;
      case "Texture_Speciality_Icon_Spec_roquettes_3":
        x = rck3;
        break;
      case "Texture_Speciality_Icon_Spec_fumigene":
        x = smoke;
        break;
      case "Texture_Speciality_Icon_Spec_AT_1":
        x = AT1;
        break;
      case "Texture_Speciality_Icon_Spec_Straffing":
        x = shturm;
        break;
      case "Texture_Speciality_Icon_Spec_suicide":
        x = suicide;
        break;
      case "Texture_Speciality_Icon_spec_decourage":
        x = shtraf;
        break;
      default:
        break;
    }
    return <img src={x} className={css} alt={"DisplaySpecial"} />;
  }
}
