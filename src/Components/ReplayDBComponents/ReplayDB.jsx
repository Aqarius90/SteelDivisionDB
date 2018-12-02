import React, { Component } from "react";
import ReplayDBDisplay from "./ReplayDBDisplay";
import ReplayDisplay from "./ReplayDisplay";

class ReplayDB extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="card">
          <div className="row card-header">
            <div className="col-md-3">
              <div
                className="btn btn-block btn-primary"
                onClick={() => this.props.filter("new")}
              >
                Newest
              </div>
            </div>
            <div className="col-md-3">
              <div
                className="btn btn-block btn-primary"
                onClick={() => this.props.filter("score")}
              >
                Most votes
              </div>
            </div>
            <div className="col-md-3" />
            <div className="col-md-3">
              <div
                className="btn btn-block btn-primary"
                onClick={() => this.props.upload()}
              >
                Upload
              </div>
            </div>
          </div>
          <div className="row card-body">
            <div className="col-md-8">
              <ReplayDBDisplay
                DB={this.props.DB}
                ReplayList={this.props.ReplayDB.ReplayList}
                vote={this.props.ReplayDB.API.vote}
                show={this.props.ReplayDB.API.showReplay}
                delete={this.props.ReplayDB.API.deleteReplay}
                User={this.props.User}
              />
            </div>
            <div className="col-md-4">
              <ReplayDisplay
                Replay={this.props.ReplayDB.Replay}
                ReplayDecks={this.props.ReplayDB.ReplayDecks}
                DB={this.props.DB}
                API={this.props.ReplayDB.API}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ReplayDB;
