import React, { PureComponent } from "react";
import DeckCodeParser from "./DeckCodeParser";
import RightPanel from "../DeckBuilderRight/RightPanel";
import LeftPanel from "../DeckBuilderLeft/LeftPanel";

class DeckBuilder extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <div className="card">
          <DeckCodeParser Honey={this.props.Honey} pload={this.props.pload} />
        </div>
        <div className="row">
          <div className="col-xl-7">
            <LeftPanel Honey={this.props.Honey} />
          </div>
          <div className="col-xl-5">
            <RightPanel Honey={this.props.Honey} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default DeckBuilder;
