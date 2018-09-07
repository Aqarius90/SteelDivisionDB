import React, { PureComponent } from "react";

class UnitModuleRecon extends PureComponent {
  render() {
    let x = this.props.x;
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-sm">
            <ul>
              <li>IdentifyBaseProbability: {x.IdentifyBaseProbability}</li>
              <li>VisionObstructionType: {x.VisionObstructionType}</li>
              <li>VisionUnitType: {x.VisionUnitType}</li>
            </ul>
          </div>
          <div className="col-sm">
            <ul>
              <li>
                TimeBetweenEachIdentifyRoll: {x.TimeBetweenEachIdentifyRoll}
              </li>
              <li> UnitConcealmentBonus: {x.UnitConcealmentBonus}</li>
              <li> OpticalStrength: {x.OpticalStrength}</li>
            </ul>
          </div>
        </div>
        <div className="row">
          <GunNoiseParser x={this.props.x.WeaponsDescriptor} />
        </div>
      </React.Fragment>
    );
  }
}

class GunNoiseParser extends PureComponent {
  render() {
    let x = this.props.x;
    if (x === null) {
      return <div />;
    }
    return x.Turrets.map((x, i) => {
      return (
        <div className="col-sm" key={i}>
          <h6>Gun Noise Malus:</h6>
          {x.WeaponList.map((x, i) => {
            return (
              <ul key={i}>
                <li>{x.Ammunition.AmmoDescriptor.replace("Ammo_", "")}:</li>
                <li>{x.Ammunition.NoiseDissimulationMalus}</li>
              </ul>
            );
          })}
        </div>
      );
    });
  }
}

export default UnitModuleRecon;
