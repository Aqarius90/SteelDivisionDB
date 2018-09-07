import React, { PureComponent } from "react";
import { parseBool } from "../js/parsers";

class UnitModuleSurvivability extends PureComponent {
  render() {
    let x = this.props.x;
    return (
      <div className="row">
        <div className="col-sm">
          <ul>
            <li>DefaultAutoCover: {parseBool(x.DefaultAutoCover)}</li>
            <li>MoralLevel: {x.MoralLevel}</li>
            <li>Orient front: {parseBool(x.AlwaysOrientArmorTowardsThreat)}</li>
            <li>
              StunFreezesUnits: {parseBool(x.DamageDescriptor.StunFreezesUnits)}
            </li>
          </ul>
        </div>
        <div className="col-sm">
          <ul>
            <li>
              StunDamagesRegen:{" "}
              {x.DamageDescriptor.StunDamagesRegen.replace(
                "_StunDamagesRegen",
                ""
              )}
            </li>
            <li>
              StunDamagesToGetStunned:{" "}
              {x.DamageDescriptor.StunDamagesToGetStunned.replace(
                "_StunDamagesToGetStunned",
                ""
              )}
            </li>
            <li>
              MaxSuppressionDamages:{" "}
              {x.DamageDescriptor.MaxSuppressionDamages.replace(
                "_MaxSuppressionDamages",
                ""
              )}
            </li>
            <li>
              TypeForGroundDamageModifier: {x.TypeForGroundDamageModifier}
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default UnitModuleSurvivability;
