import React, { PureComponent } from "react";
import { DisplayAmmoProps } from "./DisplayComponents";

class TurretHeader extends PureComponent {
  getWeaponPicture = x => {
    if (x === null) {
      return "no such picture";
    }
    let str = x.toLowerCase();
    str = str.replace("~/texture_interface_weapon_", "");
    return "img/w/" + str + ".tgv.png";
  };
  parseGunCount = x => {
    if (x.SalvoStockIndex === x.SalvoStockIndex_ForInterface) {
      return <h3>x{x.WeaponNumber_ForInterface}</h3>;
    } else {
      return <p>hidden or merged</p>;
    }
  };
  render() {
    if (this.props.Turret === null) {
      return <div />;
    }
    return (
      <div className="card-header row">
        <div className="col-sm-3">
          <img
            src={this.getWeaponPicture(
              this.props.Turret.WeaponList[0].Ammunition.InterfaceWeaponTexture
            )}
            className="img-weapon"
            alt={
              this.props.Turret.WeaponList[0].Ammunition.InterfaceWeaponTexture
            }
          />
        </div>
        <div className="col-sm">
          <h5>{this.props.Turret.WeaponList[0].Ammunition.Caliber}</h5>
        </div>
        <div className="col-sm">
          {this.parseGunCount(this.props.Turret.WeaponList[0])}
        </div>
        <DisplayAmmoProps
          Weapons={this.props.Turret.WeaponList}
          salves={this.props.Salves}
        />
      </div>
    );
  }
}

export default TurretHeader;
