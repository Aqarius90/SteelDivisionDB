import React, { Component } from "react";

class ReplayDisplay extends Component {
  getPicture = x => {
    return "img/d/" + x.Emblem.toLowerCase() + ".tgv.png";
  };

  makePlayerEntry = (x, i) => {
    return (
      <div className="row" key={i}>
        <div className="col-md-8">{x.Player}</div>
        <div className="col-md-2">
          <img
            src={this.getPicture(x.Deck)}
            className="img-xp"
            alt="unitPortrait"
          />
        </div>
        <div
          className="col-md-2 btn btn-outline-secondary btn-block btn-sm"
          onClick={() => this.props.API.editDeck(x.Deck)}
        >
          <p>To deck builder</p>
        </div>
      </div>
    );
  };

  render() {
    if (this.props.Replay === null) {
      return null;
    }
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-12">
            <h4 className="text-center">{this.props.Replay.Name}</h4>
          </div>
          <div className="col-md-12">
            <p>{this.props.Replay.Description}</p>
          </div>
          <div className="col-md-12">
            {this.props.ReplayDecks.map(this.makePlayerEntry)}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ReplayDisplay;
