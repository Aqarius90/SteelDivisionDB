import React, { Component } from "react";
import { parsePhase, parseAlias, parsePicture } from "../js/parsers";
import {
  DisplayAP,
  DisplayAV,
  DisplaySpecial,
  DisplayExp
} from "./DisplayComponents";

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
class CardDisplay extends Component {
  deleteUnit = () => {
    this.props.fdel(this.props.x);
  };

  drawUnit = () => {
    this.props.fshow(this.props.x);
  };
  parsePrice = () => {
    if (this.props.x.TransportUnit === null) {
      return this.props.x.Unit.ProductionPrice;
    }
    return (
      this.props.x.Unit.ProductionPrice +
      this.props.x.TransportUnit.ProductionPrice
    );
  };
  parseName = x => {
    if (x.TransportUnit === null) {
      return (
        x.Unit.AliasName + " " + this.props.fCount(x) + "/" + x.PackAvailabilty
      );
    } else {
      return (
        x.Unit.AliasName + " " + this.props.fCount(x) + "/" + x.PackAvailabilty
      );
    }
  };
  parseValidity = x => {
    if (this.props.fValid(x)) {
      return "";
    } else {
      return "p-err";
    }
  };
  parsePrice = (x, y) => {
    if (y === null) {
      return Number(x.ProductionPrice);
    }
    return Number(x.ProductionPrice) + Number(y.ProductionPrice);
  };

  render() {
    let Unit = this.props.x.Unit;
    let TransportUnit = this.props.x.TransportUnit;
    return (
      <React.Fragment>
        <div className="div-rel">
          <img
            src={parsePicture(Unit, "md")}
            className="img-back"
            alt="unitPortrait"
            onClick={this.drawUnit}
          />
          <h5 className="txt-price">{this.parsePrice(Unit, TransportUnit)}</h5>
          <h5 className="txt-avail">{this.props.x.UnitsPerPack}</h5>
          <h5 className="txt-phase">
            {parsePhase(this.props.x.AvailableFromPhase)}
          </h5>
          <DisplayExp
            Experiencelevel={this.props.x.Experiencelevel}
            css="img-rel-xp"
          />
          <DisplaySpecial Spec={Unit.SpecialtyTexture} css="img-rel-spec" />
          <DisplayAP AP={Unit.APValue} css="img-rel-ap" />
          <DisplayAV AV={Unit.PlatingValue} css="img-rel-ap" />
        </div>
        <UnitName
          x={this.props.x}
          fValid={this.props.fValid}
          fCount={this.props.fCount}
        />
        <button type="button" onClick={this.deleteUnit} className="btn btn-sm">
          <p>DELETE</p>
        </button>
      </React.Fragment>
    );
  }
}

class CardDisplayRow extends Component {
  showCard = (x, i) => {
    if (typeof x.Descriptor === "undefined") {
      return (
        <div className="col-xl-1 col-xl-10" key={i}>
          <h3 key={i}> {x} </h3>
        </div>
      );
    }
    return (
      <div className="col-xl-1 col-xl-10" key={i}>
        <CardDisplay
          DB={this.props.DB}
          x={x}
          fshow={this.props.f.showUnit}
          fdel={this.props.f.deleteUnit}
          fValid={this.props.f.isValid}
          fCount={this.props.f.getUsedCount}
        />
      </div>
    );
  };

  render() {
    return <div className="row">{this.props.Parsed.map(this.showCard)}</div>;
  }
}

export default CardDisplayRow;
