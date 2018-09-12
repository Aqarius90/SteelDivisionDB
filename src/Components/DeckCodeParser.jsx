import React, { PureComponent } from "react";

class DeckCodeParser extends PureComponent {
  handleChange = event => {
    this.props.fset(event.target.value);
  };

  render() {
    let Deck = this.props.Deck;
    return (
      <div className="row card-body">
        <div className="col-sm-5">
          <h2>
            {Deck.Emblem}: {Deck.Cards.length} / {Deck.DeckPointsTotal} |A:
            {Deck.PhaseA.Income}
            |B:
            {Deck.PhaseB.Income}
            |C:
            {Deck.PhaseC.Income}|
          </h2>
        </div>
        <div className="col-sm-5">
          <input
            className="form-control"
            value={this.props.code}
            type="text"
            onChange={this.handleChange}
          />
        </div>
        <div className="col-sm-1">
          <button
            type="button"
            className="btn btn-default btn-block btn-top-line"
            onClick={this.props.fparse}
          >
            DECODE
          </button>
        </div>{" "}
        <div className="col-sm-1">
          <button
            type="button"
            className="btn btn-default btn-block btn-top-line"
            onClick={this.props.fparsenull}
          >
            CLEAR
          </button>
        </div>
      </div>
    );
  }
}

export default DeckCodeParser;
