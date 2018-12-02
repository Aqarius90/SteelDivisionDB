import React, { Component } from "react";

class SubmitDeckHeader extends Component {
  getPicture = () => {
    let img =
      "img/d/" +
      this.props.SelectedDeckObject.Division.toLowerCase() +
      ".tgv.png";
    return img;
  };

  render() {
    if (this.props.SelectedDeckObject === null) {
      return (
        <React.Fragment>
          <div className="card-header">
            <div className="row">
              <div className="col-md">
                <div
                  className="btn btn-block btn-default btn-primary"
                  onClick={() => this.props.API.showDeck(null)}
                >
                  Import from Deck Builder
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <div className="card-header">
          <div className="row">
            <div className="col-md-2">
              <img
                src={this.getPicture()}
                className="img-big mx-auto"
                alt="unitPortrait"
              />
            </div>
            <div className="col-md-10">
              <div className="row">
                <div className="col-md-10">
                  <h4 className="text-center">
                    {this.props.SelectedDeckObject.Name}
                  </h4>
                  <p>{this.props.SelectedDeckObject.Description}</p>
                </div>
                <div className="col-md-2">
                  <div
                    className="btn btn-outline-secondary btn-block btn-sm"
                    onClick={this.props.API.editDeck}
                  >
                    <p>To deck builder</p>
                  </div>
                  <div
                    className="btn btn-outline-secondary btn-block btn-sm"
                    onClick={() => this.props.API.showDeck(null)}
                  >
                    <p>From deck builder</p>
                  </div>
                  <div
                    className="btn btn-outline-secondary btn-block btn-sm"
                    onClick={this.props.deckDetailsDialog}
                  >
                    <p>Edit header</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <p>{this.props.SelectedDeckObject.code}</p>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SubmitDeckHeader;
