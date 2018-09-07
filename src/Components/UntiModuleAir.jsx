import React, { PureComponent } from "react";

class UnitModuleAir extends PureComponent {
  render() {
    let x = this.props.x;
    if (x.AirMaxspeed === null) {
      return <div />;
    }
    console.log(x.AltitudeMin.replace(" * Metre)", "").replace("(", ""));
    return (
      <div className="card">
        <div className="card-header"> Air Data </div>
        <div className="row card-body">
          <div className="col-sm">
            <ul>
              <li>
                AirMaxspeed:{" "}
                {x.AirMaxspeed.replace(") * Metre)", "").replace("((", "") / 2}
              </li>
              <li>
                Altitude:{" "}
                {x.Altitude.replace(") * Metre)", "").replace("((", "") / 2}
              </li>
              <li>
                AltitudeMin:{" "}
                {x.AltitudeMin.replace(" * Metre)", "").replace("(", "") / 2}
              </li>
              <li>
                Speed: {x.Speed.replace(") * Metre)", "").replace("((", "") / 2}
              </li>
              <li>
                Dogfight radius:{" "}
                {x.AgilityRadius.replace(") * Metre)", "").replace("((", "") /
                  2}
              </li>
            </ul>
          </div>
          <div className="col-sm">
            <ul>
              <li>PitchAngle: {x.PitchAngle}</li>
              <li>RollAngle: {x.RollAngle}</li>
              <li>RollSpeed: {x.RollSpeed}</li>
              <li>EvacAngle: {x.EvacAngle}</li>
              <li>PlaneEvacuationTime: {x.PlaneEvacuationTime}</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default UnitModuleAir;
