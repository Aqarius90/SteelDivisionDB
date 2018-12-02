import React, { PureComponent } from "react";
import { parseBool } from "../../js/parsers";

class UnitModuleAux extends PureComponent {
  render() {
    let x = this.props.x;
    let NbSoldatInGroupeCombat;
    if (x.Behaviour !== null) {
      NbSoldatInGroupeCombat = x.Behaviour.NbSoldatInGroupeCombat;
    } else {
      NbSoldatInGroupeCombat = "N/A";
    }
    return (
      <div className="row">
        <div className="col-xl">
          <ul>
            <li>IsSapery: {parseBool(x.IsSapery)}</li>
            <li>Soldiers in squad: {NbSoldatInGroupeCombat}</li>
            <li>ProductionYear: {x.ProductionYear}</li>
            <li>ProductionTime: {x.ProductionTime}</li>
            <li>Dangerousness: {x.Dangerousness}</li>
          </ul>
        </div>
        <div className="col-xl">
          <ul>
            <li>StrengthDecayPerSecond: {x.StrengthDecayPerSecond}</li>
            <li>PreventsDecayInZone: {parseBool(x.PreventsDecayInZone)}</li>
            <li>CircleFormation: {parseBool(x.CircleFormation)}</li>
            <li>InfluenceStrength: {x.InfluenceStrength}</li>
            <li>MinimumInfluenceStrength: {x.MinimumInfluenceStrength}</li>
          </ul>
        </div>
        <ul>
          <li>
            Tags:
            {x.TagSet.map(x => {
              return x + ", ";
            })}
          </li>
        </ul>
      </div>
    );
  }
}

export default UnitModuleAux;
