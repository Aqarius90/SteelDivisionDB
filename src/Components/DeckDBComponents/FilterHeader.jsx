import React, { Component } from "react";

class FilterHeader extends Component {
  /*
  constructor() {
    super();
    this.state = {
      DeckName: "",
      Division: "",
      Date: "",
      Author: "",
      Score: ""
    };
  }
  setDeckName = event => {
    this.setState({ DeckName: event.target.value });
  };
  setDivision = event => {
    this.setState({ Division: event.target.value });
  };
  setDate = event => {
    this.setState({ Date: event.target.value });
  };
  setAuthor = event => {
    this.setState({ Author: event.target.value });
  };
  setScore = event => {
    this.setState({ Score: event.target.value });
  };
  listOptions = i => {
    return (
      <React.Fragment>
        <option value="all">All</option>
        <option value="Allies">Allies</option>
        <option value="Axis">Axis</option>
        {this.props.DB.Decks.map((x, i) => {
          return (
            <option key={i} value={x.EmblemTexture}>
              {x.EmblemTexture}
            </option>
          );
        })}
      </React.Fragment>
    );
  };
*/
  render() {
    return (
      <div className="col-md-12 row card-header">
        <div className="col-md-6">
          <div
            className="btn btn-block btn-primary"
            onClick={() => this.props.filter("new")}
          >
            Newest
          </div>
        </div>
        <div className="col-md-6">
          <div
            className="btn btn-block btn-primary"
            onClick={() => this.props.filter("score")}
          >
            Most votes
          </div>
        </div>
      </div>
    );
    /*
    return (
      <div className="col-md-12 card-header">
        <div className="row ">
          <div className="col-xl">Name</div>
          <div className="col-xl">Division</div>
          <div className="col-xl">Player</div>
          <div className="col-xl">Min. Score</div>
          <div className="col-xl" />
        </div>
        <div className="row">
          <div className="col-xl">
            <input
              className="form-control"
              value={this.state.DeckName}
              type="text"
              onChange={this.setDeckName}
            />
          </div>
          <div className="col-xl">
            <select
              className="form-control"
              type="text"
              onChange={this.setDivision}
            >
              {this.listOptions()}
            </select>
          </div>
          <div className="col-xl">
            <input
              className="form-control"
              value={this.state.Author}
              type="text"
              onChange={this.setAuthor}
            />
          </div>
          <div className="col-xl">
            <input
              className="form-control"
              value={this.state.Score}
              type="number"
              onChange={this.setScore}
            />
          </div>
          <div className="col-xl">
            <button
              className="btn btn-default btn-primary btn-block"
              onClick={() => this.props.filter(this.state)}
            >
              Filter
            </button>
          </div>
        </div>
      </div>
    );*/
  }
}

export default FilterHeader;
