import React, { Component } from "react";
import CardDisplayRow from "./CardDisplay";
import UnitListing from "./UnitListing";

class UnitPicker extends Component {
  render() {
    return (
      <div className=" card-body">
        <CardDisplayRow
          DB={this.props.DB}
          Parsed={this.props.DeckUnits}
          f={this.props.f}
        />
        <UnitListing
          DB={this.props.DB}
          Units={this.props.DBUnits}
          fadd={this.props.f.addUnit}
          fshow={this.props.f.showUnit}
          fsort={this.props.f.sortBy}
        />
      </div>
    );
  }
}
export default UnitPicker;
