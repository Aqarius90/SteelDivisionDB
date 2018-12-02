import React, { PureComponent } from "react";

class Header extends PureComponent {
  onClick() {
    window.location.href = `mailto:${this.props.email}`;
  }
  renderButtons() {
    if (this.props.ActiveTab === "Deck Builder") {
      return (
        <React.Fragment>
          <button
            className="btn btn-primary btn-block"
            onClick={() => this.props.setActiveTab("Deck DB")}
          >
            Decks (BETA)
          </button>
          <button
            className="btn btn-primary btn-block"
            onClick={() => this.props.setActiveTab("Replay DB")}
          >
            Replays (BETA)
          </button>
        </React.Fragment>
      );
    } else if (this.props.ActiveTab === "Deck DB") {
      return (
        <React.Fragment>
          <button
            className="btn btn-primary btn-block"
            onClick={() => this.props.setActiveTab("Deck Builder")}
          >
            Deck Builder
          </button>
          <button
            className="btn btn-primary btn-block"
            onClick={() => this.props.setActiveTab("Replay DB")}
          >
            Replays (BETA)
          </button>
        </React.Fragment>
      );
    } else if (this.props.ActiveTab === "Replay DB") {
      return (
        <React.Fragment>
          <button
            className="btn btn-primary btn-block"
            onClick={() => this.props.setActiveTab("Deck Builder")}
          >
            Deck Builder
          </button>
          <button
            className="btn btn-primary btn-block"
            onClick={() => this.props.setActiveTab("Deck DB")}
          >
            Decks (BETA)
          </button>
        </React.Fragment>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="row card-header">
        <div className="col-xl-1">{this.renderButtons()}</div>
        <div className="col-xl-10 panel">
          <h1 align="center">Steel Division Database</h1>
          <h6 align="center">last patch: v.300093911</h6>
        </div>
        <div className="col-xl-1">
          <button
            className="btn btn-default btn-primary btn-block"
            onClick={this.props.LogIn}
          >
            {this.props.LogInButtonText}
          </button>
        </div>
      </div>
    );
  }
}

export default Header;
