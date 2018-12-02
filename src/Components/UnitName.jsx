import React, { Component } from "react";
import { parseAlias } from "../js/parsers";

class UnitName extends Component {
  render() {
    let x = this.props.x;
    if (this.props.fValid(this.props.x)) {
      if (this.props.x.TransportUnit === null) {
        return (
          <p>
            {" "}
            {parseAlias(x.Unit)} {this.props.fCount(x)}/{x.PackAvailabilty}{" "}
          </p>
        );
      }
      return (
        <React.Fragment>
          <p>
            {" "}
            {x.Unit.AliasName} {this.props.fCount(x)}/{x.PackAvailabilty}{" "}
          </p>
          <p> {x.TransportUnit.AliasName}</p>
        </React.Fragment>
      );
    } else {
      if (this.props.x.TransportUnit === null) {
        return (
          <p className="p-err">
            {" "}
            {parseAlias(x.Unit)} {this.props.fCount(x)}/{x.PackAvailabilty}{" "}
          </p>
        );
      }
      return (
        <React.Fragment>
          <p className="p-err">
            {" "}
            {x.Unit.AliasName} {this.props.fCount(x)}/{x.PackAvailabilty}{" "}
          </p>
          <p className="p-err">{x.TransportUnit.AliasName}</p>
        </React.Fragment>
      );
    }
  }
}
export default UnitName;
