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
    let button1 = "";
    let button2 = "";
    let button1Click = "";
    let button2Click = "";

    if (this.props.Honey.ActiveTab === "DeckBuilder") {
      button1 = "Decks";
      button2 = "Replays";
      button1Click = () => this.props.Honey.setActiveTab("DeckDB");
      button2Click = () => this.props.Honey.setActiveTab("ReplayDB");
    } else if (this.props.Honey.ActiveTab === "DeckDB") {
      button1 = "Deck Builder";
      button2 = "Replays";
      button1Click = () => this.props.Honey.setActiveTab("DeckBuilder");
      button2Click = () => this.props.Honey.setActiveTab("ReplayDB");
    } else if (this.props.Honey.ActiveTab === "ReplayDB") {
      button1 = "Deck Builder";
      button2 = "Decks";
      button1Click = () => this.props.Honey.setActiveTab("DeckBuilder");
      button2Click = () => this.props.Honey.setActiveTab("DeckDB");
    } else {
      return <div />;
    }
    return (
      <React.Fragment>
        <button className="btn btn-primary btn-block" onClick={button1Click}>
          {button1}
        </button>
        <button className="btn btn-primary btn-block" onClick={button2Click}>
          {button2}
        </button>
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
