import React, { PureComponent } from "react";
import { parseBool, parseSpeed } from "../../js/parsers";

class UnitModuleMobility extends PureComponent {
  render() {
    let x = this.props.x;
    if (x.VitesseCombat === null) {
      return (
        <div className="row">
          <div className="col-xl">
            <ul>
              <li>
                Speed/Road Speed:
                {parseSpeed(x)}
              </li>
              <li>
                Combat Speed:{" "}
                {x.AirVitesseCombat.replace("(", "").replace(") * Metre)", "")}
              </li>
            </ul>
          </div>
          <div className="col-xl">
            <ul>
              <li>FuelCapacity: {x.FuelCapacity}</li>
              <li>FuelMoveDuration: {x.FuelMoveDuration}</li>
            </ul>
          </div>
          <div className="col-xl">
            <ul>
              <li>Turn-Around time: {x.TempsDemiTour} s</li>
            </ul>
          </div>
        </div>
      );
    }
    return (
      <div className="row">
        <div className="col-xl">
          <ul>
            <li>
              Speed/Road Speed:
              {parseSpeed(x)}
            </li>
            <li>Combat Speed: {x.VitesseCombat.replace("(", "")}</li>
            <li>MaxAcceleration: {x.MaxAcceleration.replace("(", "")}</li>
            <li>MaxDeceleration: {x.MaxDeceleration.replace("(", "")}</li>
            <li>UnitMovingType: {x.UnitMovingType}</li>
          </ul>
        </div>
        <div className="col-xl">
          <ul>
            <li>FuelCapacity: {x.FuelCapacity}</li>
            <li>FuelMoveDuration: {x.FuelMoveDuration}</li>
            <li>
              PathfindType: {x.PathfindType.replace("PathfindTypes/", "")}
            </li>
            <li>IsTransporter: {parseBool(x.IsTransporter)}</li>
            <li>isTowable: {parseBool(x.isTowable)}</li>
          </ul>
        </div>
        <div className="col-xl">
          <ul>
            <li>StartTime: {x.StartTime.replace("* Seconde", "s")}</li>
            <li>StopTime: {x.StopTime.replace("* Seconde", "s")}</li>
            <li>
              RotationStartTime: {x.RotationStartTime.replace("* Seconde", "s")}
            </li>
            <li>
              RotationStopTime: {x.RotationStopTime.replace("* Seconde", "s")}
            </li>
            <li>Turn-Around time: {x.TempsDemiTour} s</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default UnitModuleMobility;
