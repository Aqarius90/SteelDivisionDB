import React, { Component } from "react";
import PureDisplayRow from "./PureDisplayRow";
import SubmitDeckHeader from "./SubmitDeckHeader";

class SubmitDeck extends Component {
  render() {
    if (this.props.DeckCode === null) {
      return null;
    }
    return (
      <React.Fragment>
        <SubmitDeckHeader
          API={this.props.API}
          SelectedDeckCode={this.props.SelectedDeckCode}
          SelectedDeckObject={this.props.SelectedDeckObject}
          showEditDialog={this.props.showEditDialog}
          deckDetailsDialog={this.props.deckDetailsDialog}
        />
        <PureDisplayRow DB={this.props.DB} Parsed={this.props.DeckUnits[0]} />
        <PureDisplayRow DB={this.props.DB} Parsed={this.props.DeckUnits[1]} />
        <PureDisplayRow DB={this.props.DB} Parsed={this.props.DeckUnits[2]} />
        <PureDisplayRow DB={this.props.DB} Parsed={this.props.DeckUnits[3]} />
        <PureDisplayRow DB={this.props.DB} Parsed={this.props.DeckUnits[4]} />
        <PureDisplayRow DB={this.props.DB} Parsed={this.props.DeckUnits[5]} />
        <PureDisplayRow DB={this.props.DB} Parsed={this.props.DeckUnits[6]} />
        <PureDisplayRow DB={this.props.DB} Parsed={this.props.DeckUnits[7]} />
      </React.Fragment>
    );
  }
}

export default SubmitDeck;
