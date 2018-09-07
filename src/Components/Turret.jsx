import React, { PureComponent } from "react";
import Ammo from "./Ammo";
import TurretHeader from "./TurretHeader";
import { parseBool } from "../js/parsers";

class Turret extends PureComponent {
  render() {
    return (
      <div className="card">
        <TurretHeader Turret={this.props.Turret} Salves={this.props.Salves} />
        <div className="row card-body">
          <div className="col-sm">
            <p>Aim Priority: {this.props.Turret.AimingPriority}</p>
          </div>
          <div className="col-sm">
            <p>Rot. Base: {this.props.Turret.AngleRotationBase}</p>
          </div>
          <div className="col-sm">
            <p>Rot. Max: {this.props.Turret.AngleRotationMax}</p>
          </div>
          <div className="col-sm">
            <p>Rot. Pitch Base: {this.props.Turret.AngleRotationBasePitch}</p>
          </div>
          <div className="col-sm">
            <p>Rot. Pitch Max: {this.props.Turret.AngleRotationMaxPitch}</p>
          </div>
          <div className="col-sm">
            <p>Rot. Pitch Min: {this.props.Turret.AngleRotationMinPitch}</p>
          </div>
          <div className="col-sm">
            <p>Rot. Speed: {this.props.Turret.VitesseRotation}</p>
          </div>
          <div className="col-sm-12">
            {this.props.Turret.WeaponList.map(this.showWeapon)}
          </div>
        </div>
      </div>
    );
  }

  showWeapon = (x, i) => {
    return (
      <div className="card" key={i}>
        <div className="row card-header">
          <div className="col-sm">{x.Ammunition.AmmoDescriptor}</div>
          <div className="col-sm">Power: {x.Power_ForInterface}</div>
          <div className="col-sm">
            Has stabilizer: {parseBool(x.TirEnMouvement)}
          </div>
        </div>
        <Ammo x={x.Ammunition} />
      </div>
    );
  };
}

export default Turret;
