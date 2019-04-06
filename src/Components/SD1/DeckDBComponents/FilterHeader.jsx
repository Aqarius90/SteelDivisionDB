import React, { Component } from "react";

class FilterHeader extends Component {
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
  }
}

export default FilterHeader;
