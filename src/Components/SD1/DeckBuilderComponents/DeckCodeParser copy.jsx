import React, { Component } from "react";
class DeckCodeParser extends Component {
  /*Honey={this.props.Honey}
  pload={this.props.pload}
pset={this.props.pset}*/
  state = { isFirst: true };

  handleChange = event => {
    this.props.Honey.API.setDeckCode(event.target.value);
  };

  render() {
    if (this.state.isFirst && this.props.pload) {
      console.log("setonload");
      this.props.Honey.API.parseDeckCode(this.props.pload);
      this.setState({ isFirst: false });
    }
    let Deck = this.props.Honey.DeckBuilder.Deck;
    return (
      <div className="row card-body">
        <div className="col-xl-5">
          <h2>
            {Deck.Emblem}: {Deck.Cards.length} / {Deck.DeckPointsTotal} |A:
            {Deck.PhaseA.Income}
            |B:
            {Deck.PhaseB.Income}
            |C:
            {Deck.PhaseC.Income}|
          </h2>
        </div>
        <div className="col-xl-4">
          <input
            className="form-control"
            value={this.props.Honey.code}
            type="text"
            onChange={this.handleChange}
          />
        </div>
        <div className="col-xl">
          <button
            type="button"
            className="btn btn-default btn-block btn-top-line"
            onClick={() =>
              this.props.Honey.API.parseDeckCode(this.props.Honey.code)
            }
          >
            DECODE
          </button>
        </div>
        <div className="col-xl">
          <button
            type="button"
            className="btn btn-default btn-block btn-top-line"
            onClick={() => this.props.Honey.API.parseDeckCode("")}
          >
            CLEAR
          </button>
        </div>
      </div>
    );
  }
}

export default DeckCodeParser;
