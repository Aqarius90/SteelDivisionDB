import React, { PureComponent } from "react";
import { parseBool, parseDescriptor } from "../js/parsers";

class Ammo extends PureComponent {
  parseLength = x => {
    if (x === null) {
      return "none";
    }
    let r = x.replace(") * Metre)", "").replace("((", "");
    return Math.round(r / 5) + "m";
  };

  render() {
    return (
      <div className="row card-body">
        <div className="col-sm-4">
          <li>
            <p>TypeArme: {this.props.x.TypeArme}</p>
          </li>

          <li>
            <p>Caliber: {this.props.x.Caliber}</p>
          </li>
          <li>
            <p>Weapon: {parseDescriptor(this.props.x.Arme)}</p>
          </li>
          <li>
            <p>
              Projectile Type: {parseDescriptor(this.props.x.ProjectileType)}
            </p>
          </li>
          <li>
            <p>Power: {this.props.x.Puissance}</p>
          </li>
          <li>
            <p>Time between shots: {this.props.x.TempsEntreDeuxTirs}</p>
          </li>
          <li>
            <p>
              Time between shots, min: {this.props.x.TempsEntreDeuxTirs_Min}
            </p>
          </li>
          <li>
            <p>
              Time between shots, max: {this.props.x.TempsEntreDeuxTirs_Max}
            </p>
          </li>
          <li>
            <p>Max. range: {this.parseLength(this.props.x.PorteeMaximale)}</p>
          </li>
          <li>
            <p>Min. range: {this.parseLength(this.props.x.PorteeMinimale)}</p>
          </li>
          <li>
            <p>Affected by range: {this.props.x.EfficaciteSelonPortee}</p>
          </li>
          <li>
            <p>
              Max range dispersion:{" "}
              {this.parseLength(this.props.x.DispersionAtMaxRange)}
            </p>
          </li>
          <li>
            <p>
              Physical damage radius:{" "}
              {this.parseLength(this.props.x.RadiusSplashPhysicalDamages)}
            </p>
          </li>
          <li>
            <p>Physical Damage: {this.props.x.PhysicalDamages}</p>
          </li>
        </div>
        <div className="col-sm-4">
          <li>
            <p>
              Suppress damage radius:{" "}
              {this.props.x.RadiusSplashSuppressDamages.replace(
                ") * Metre)",
                ""
              ).replace("((", "") / 5}
            </p>
          </li>
          <li>
            <p>Suppress Damage: {this.props.x.SuppressDamages}</p>
          </li>
          <li>
            <p>Pin radius: {this.parseLength(this.props.x.RayonPinned)}</p>
          </li>
          <li>
            <p>Indirect fire: {parseBool(this.props.x.TirIndirect)}</p>
          </li>
          <li>
            <p>Reflex fire: {parseBool(this.props.x.TirReflexe)}</p>
          </li>
          <li>
            <p>
              Reflex fire forbid: {parseBool(this.props.x.InterdireTirReflexe)}
            </p>
          </li>
          <li>
            <p>Gun Noise Malus: {this.props.x.NoiseDissimulationMalus}</p>
          </li>
          <li>
            <p>Supply Cost: {this.props.x.SupplyCost}</p>
          </li>
          <li>
            <p>Targets Districts: {parseBool(this.props.x.TargetsDistricts)}</p>
          </li>
          <li>
            <p>Aim time: {this.props.x.TempsDeVisee}</p>
          </li>
          <li>
            <p>Time between Salvos: {this.props.x.TempsEntreDeuxSalves}</p>
          </li>
          <li>
            <p>
              Time between Salvos, min: {this.props.x.TempsEntreDeuxSalves_Min}
            </p>
          </li>
          <li>
            <p>
              Time between Salvos, max: {this.props.x.TempsEntreDeuxSalves_Max}
            </p>
          </li>
        </div>
        <div className="col-sm-4">
          <li>
            <p>Shots per salvo: {this.props.x.NbTirParSalves}</p>
          </li>
          <li>
            <p>Ripple fires: {this.props.x.NbrProjectilesSimultanes}</p>
          </li>
          <li>
            <p>Ammo cost/salvo: {this.props.x.AffichageMunitionParSalve}</p>
          </li>
          <li>
            <p>Display ammo: {parseBool(this.props.x.AffichageMenu)}</p>
          </li>
          <li>
            <p>SmokeDescriptor: {this.props.x.SmokeDescriptor}</p>
          </li>
          <li>
            <p>FireDescriptor: {this.props.x.FireDescriptor}</p>
          </li>
          <li>
            <p>
              Friendly fire off: {parseBool(this.props.x.IsHarmlessForAllies)}
            </p>
          </li>
          <li>
            <p>Piercing Weapon: {parseBool(this.props.x.PiercingWeapon)}</p>
          </li>
          <li>
            <p>HitRoll - Targeted: {this.props.x.HitRollRule.Targeted}</p>
          </li>
          <li>
            <p>HitRoll - Idling: {this.props.x.HitRollRule.Idling}</p>
          </li>
          <li>
            <p>
              HitRoll - SuccessfulShots:{" "}
              {this.props.x.HitRollRule.SuccessfulShots}
            </p>
          </li>
          <li>
            <p>HitRoll - Base: {this.props.x.HitRollRule.Base}</p>
          </li>
          <li>
            <p>HitRoll - Moving: {this.props.x.HitRollRule.Moving}</p>
          </li>
        </div>
        <p>
          HitMods:{" "}
          {this.props.x.HitRollRule.HitModList.map(x => {
            return x + "|";
          })}
        </p>
      </div>
    );
  }
}

export default Ammo;
