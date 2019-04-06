import React, { PureComponent } from "react";
/**C8iA8cIDyEQPJxA8XEDwYQPLBA80EDw4QPOSA8iEDyMQPDRA84EDzcgPEBA8yEDxYQPGBA8vEDwUQPMBBEWEDw8QPHRA8gEERgQPJBBEXEERkgPKBBEVEDxUQPCBA8KE*/
class DeckCodeParser extends PureComponent {
  handleChange = event => {
    this.props.Honey.API.setDeckCode(event.target.value);
  };

  render() {
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
