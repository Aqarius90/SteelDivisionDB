import React, { PureComponent } from "react";
import CardDisplayRow from "./CardDisplay";

class DeckGrid extends PureComponent {
  render() {
    return (
      <div className="card-body">
        <CardDisplayRow
          DB={this.props.DB}
          Parsed={this.props.DeckUnits[0]}
          f={this.props.f}
        />
        <CardDisplayRow
          DB={this.props.DB}
          Parsed={this.props.DeckUnits[1]}
          f={this.props.f}
        />
        <CardDisplayRow
          DB={this.props.DB}
          Parsed={this.props.DeckUnits[2]}
          f={this.props.f}
        />
        <CardDisplayRow
          DB={this.props.DB}
          Parsed={this.props.DeckUnits[3]}
          f={this.props.f}
        />
        <CardDisplayRow
          DB={this.props.DB}
          Parsed={this.props.DeckUnits[4]}
          f={this.props.f}
        />
        <CardDisplayRow
          DB={this.props.DB}
          Parsed={this.props.DeckUnits[5]}
          f={this.props.f}
        />
        <CardDisplayRow
          DB={this.props.DB}
          Parsed={this.props.DeckUnits[6]}
          f={this.props.f}
        />
        <CardDisplayRow
          DB={this.props.DB}
          Parsed={this.props.DeckUnits[7]}
          f={this.props.f}
        />
      </div>
    );
  }
}

export default DeckGrid;
