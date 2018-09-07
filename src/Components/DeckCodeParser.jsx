import React, { PureComponent } from "react";

class DeckCodeParser extends PureComponent {
  handleChange = event => {
    this.props.fset(event.target.value);
  };

  render() {
    return (
      <div className="row card-body">
        <div className="col-sm-3">
          <h2>
            {this.props.Deck.Emblem}: {this.props.Deck.Cards.length} /{" "}
            {this.props.Deck.DeckPointsTotal}
          </h2>
        </div>
        <div className="col-sm-7">
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
