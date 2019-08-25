import React, { Component } from "react";
import SkyLight from "react-skylight";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      Bug: "insert title",
      Description: "insert description"
    };
  }

  renderButtons() {
    let buttonsArr = [];

    switch (this.props.Honey.loadedDB) {
      case "SD1":
        buttonsArr = [
          ["DeckBuilder", "DeckBuilder"],
          ["Decks", "DeckDB"],
          ["Replays", "ReplayDB"]
        ];
        break;

      case "SD2":
        buttonsArr = [["DeckBuilder", "DeckBuilder"], ["Database", "Database"]];
        break;

      default:
        return <div />;
    }
    return (
      <React.Fragment>
        {buttonsArr.map(x => {
          console.log(this.props.Honey.ActiveTab);
          if (this.props.Honey.ActiveTab === x[1]) {
            return <div />;
          } else {
            return (
              <button
                key={x[1]}
                className="btn btn-primary btn-block"
                onClick={() => this.props.Honey.setActiveTab(x[1])}
              >
                {x[0]}
              </button>
            );
          }
        })}
      </React.Fragment>
    );
  }

  logInText() {
    if (this.props.Honey.User === null) {
      return "Login";
    } else {
      return "Log out";
    }
  }

  renderBugReportButton() {
    if (this.props.Honey.User === null) {
      return <div />;
    } else {
      return (
        <button
          className="btn btn-primary btn-block"
          onClick={() => this.bugreport.show()}
        >
          Bug report
        </button>
      );
    }
  }

  handleChangeName = event => {
    this.setState({
      Bug: event.target.value
    });
  };
  handleChangeDesc = event => {
    this.setState({
      Description: event.target.value
    });
  };

  renderBugReport() {
    return (
      <React.Fragment>
        <div className="card">
          <div className="row card-body">
            <div className="col-md-3">
              <h4>Bug:</h4>
            </div>
            <div className="col-md-8">
              <input
                className="form-control"
                value={this.state.Bug}
                type="text"
                onChange={this.handleChangeName}
              />
            </div>
          </div>
          <div className="row card-body">
            <div className="col-md-3">
              <h4>Description:</h4>
            </div>
            <div className="col-md-8">
              <input
                className="form-control"
                value={this.state.Description}
                type="text"
                onChange={this.handleChangeDesc}
              />
            </div>
          </div>

          <div className="row card-footer">
            <div
              className="btn btn-block btn-primary"
              onClick={() => {
                this.props.Honey.Firebase.collection("bugreports").add({
                  Bug: this.state.Bug,
                  desc: this.state.Description,
                  user: this.props.Honey.User.uid
                });
                this.bugreport.hide();
              }}
            >
              Report
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  render() {
    return (
      <div className="row card-header">
        <div className="col-xl-1">{this.renderButtons()}</div>
        <div className="col-xl-10 panel">
          <h1 align="center">Steel Division Database</h1>
        </div>
        <div className="col-xl-1">
          <button
            className="btn btn-default btn-primary btn-block"
            onClick={this.props.Honey.logIn}
          >
            {this.logInText()}
          </button>
          {this.renderBugReportButton()}
        </div>
        <SkyLight
          hideOnOverlayClicked
          ref={ref => (this.bugreport = ref)}
          title={this.renderBugReport()}
        />
      </div>
    );
  }
}

export default Header;
