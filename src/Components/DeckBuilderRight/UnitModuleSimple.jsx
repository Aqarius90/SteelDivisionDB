import React, { PureComponent } from "react";
import TurretHeader from "./TurretHeader";
import {
  parseArmor,
  parseTopArmor,
  parseSpeed,
  parseTransport
} from "../../js/parsers";

class UnitModuleSimple extends PureComponent {
  parseOffmapSimple = x => {
    if (x === null) {
      return <div />;
    } else {
      return <TurretHeader Turret={x.Turrets[0]} Salves={x.Salves} />;
    }
  };
  render() {
    let x = this.props.x;
    let Dogfight;
    if (x.AgilityRadius === null) {
      Dogfight = "n/a";
    } else {
      Dogfight =
        x.AgilityRadius.replace(") * Metre)", "").replace("((", "") / 2;
    }
    if (x.WeaponsDescriptor != null) {
      return (
        <React.Fragment>
          <div className="row">
            <div className="col-xl">
              <ul>
                <li>
                  Front:{" "}
                  {parseArmor(
                    x.DamageDescriptor.BlindageProperties.ArmorDescriptorFront
                  )}
                </li>
                <li>
                  Side:{" "}
                  {parseArmor(
                    x.DamageDescriptor.BlindageProperties.ArmorDescriptorSides
                  )}
                </li>
                <li>
                  Back:{" "}
                  {parseArmor(
                    x.DamageDescriptor.BlindageProperties.ArmorDescriptorRear
                  )}
                </li>
                <li> Top: {parseTopArmor(x.TagSet)}</li>
              </ul>
            </div>
            <div className="col-xl">
              <ul>
                <li> MaxDamages: {x.MaxDamages} </li>
                <li>
                  Speed/Road Speed:
                  {parseSpeed(x)}
                </li>
                <li> Stealth: {x.UnitConcealmentBonus}</li>
                <li> Optics: {x.OpticalStrength}</li>
              </ul>
            </div>
            <div className="col-xl">
              <ul>
                <li> Can transport: {parseTransport(x.NbSeatsAvailable)} </li>
                <li> Needs transport: {parseTransport(x.NbSeatsOccupied)}</li>
                <li> Supply: {x.SupplyCapacity} </li>
                <li>
                  Dogfight radius:
                  {Dogfight}
                </li>
              </ul>
            </div>
          </div>
          <div>
            {x.WeaponsDescriptor.Turrets.map((arg, i) => (
              <TurretHeader
                Turret={arg}
                Salves={x.WeaponsDescriptor.Salves}
                key={i}
              />
            ))}
          </div>
          <div>{this.parseOffmapSimple(x.Offmap)}</div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div className="row">
            <div className="col-xl">
              <ul>
                <li>
                  Front:{" "}
                  {parseArmor(
                    x.DamageDescriptor.BlindageProperties.ArmorDescriptorFront
                  )}
                </li>
                <li>
                  Side:{" "}
                  {parseArmor(
                    x.DamageDescriptor.BlindageProperties.ArmorDescriptorSides
                  )}
                </li>
                <li>
                  Back:{" "}
                  {parseArmor(
                    x.DamageDescriptor.BlindageProperties.ArmorDescriptorRear
                  )}
                </li>
                <li> Top: {parseTopArmor(x.TagSet)}</li>
              </ul>
            </div>
            <div className="col-xl">
              <ul>
                <li> MaxDamages: {x.MaxDamages} </li>
                <li>
                  Speed/Road Speed:
                  {parseSpeed(x)}
                </li>
                <li> Stealth: {x.UnitConcealmentBonus}</li>
                <li> Optics: {x.OpticalStrength}</li>
              </ul>
            </div>
            <div className="col-xl">
              <ul>
                <li> Can transport: {parseTransport(x.NbSeatsAvailable)} </li>
                <li> Needs transport: {parseTransport(x.NbSeatsOccupied)}</li>
                <li> Supply: {x.SupplyCapacity} </li>
                <li>
                  Dogfight radius:
                  {Dogfight}
                </li>
              </ul>
            </div>
          </div>
          <div />
          <div>{this.parseOffmapSimple(x.Offmap)}</div>
        </React.Fragment>
      );
    }
  }
}

export default UnitModuleSimple;
