import React, { PureComponent } from "react";
import { parseAlias, parsePhase, parsePicture } from "../js/parsers";
import {
  DisplayAP,
  DisplayAV,
  DisplayExp,
  DisplayPara,
  DisplaySpecial
} from "./DisplayComponents";

class DetailUnitHeader extends PureComponent {
  addUnit = () => {
    this.props.fadd(this.props.Pack);
  };
  hideUnit = () => {
    this.props.fhide(this.props.Pack);
  };

  render() {
    let Unit = this.props.Unit;
    return (
      <div className="row card-header">
        <div className="col-xl-3">
          <img
            src={parsePicture(this.props.Unit, "bg")}
            className="img-big"
            alt="unitPortrait"
          />
        </div>
        <div className="col-xl-3">
          <h3>{parseAlias(this.props.Unit)}</h3>
        </div>
        <div className="col-xl-2">
          <DisplayExp
            Experiencelevel={this.props.Pack.Experiencelevel}
            css="img-xp"
          />
          <DisplayAP AP={Unit.APValue} css="img-xp" />
          <DisplayAV AV={Unit.PlatingValue} css="img-xp" />
          <DisplayPara IsParachutist={this.props.Unit.IsParachutist} />
          <DisplaySpecial
            Spec={this.props.Unit.SpecialtyTexture}
            css="img-xp"
          />
          <h6>Phase: {parsePhase(this.props.Pack.AvailableFromPhase)}</h6>
        </div>
        <div className="col-xl-2">
          <h4>{this.props.Pack.PackAvailabilty} cards,</h4>
          <h4>{this.props.Pack.UnitsPerPack} units</h4>
        </div>
        <div className="col-xl-2">
          <button className="btn btn-dark btn-block" onClick={this.addUnit}>
            <h4>Add</h4>
          </button>
          <button className="btn btn-block btn-danger" onClick={this.hideUnit}>
            <h4>X</h4>
          </button>
        </div>
      </div>
    );
  }
}

export default DetailUnitHeader;
