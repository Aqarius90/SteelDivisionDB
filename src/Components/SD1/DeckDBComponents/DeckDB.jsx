import React, { Component } from "react";
import FilterHeader from "./FilterHeader";
import SubmitDeck from "./SubmitDeck";
import DeckListDisplay from "./DeckListDisplay";
import SkyLight from "react-skylight";

class DeckDB extends Component {
  constructor() {
    super();
    this.state = {
      Name: "insert name",
      Description: "insert description",
      Author: "insert title"
    };
  }

  showDeck = x => {
    if (x !== null) {
      //deck obj. from DB
      this.setState({
        Name: x.Name,
        Description: x.Description,
        Author: x.Author
      });
    } else {
      //deck obj from deck builder
      this.setState({
        Name: "Tom Atkins",
        Description: "insert description",
        Author: "insert title"
      });
    }
    this.props.deckDB.API.showDeck(x);
  };

  renderEditDialog = x => {
    return (
      <React.Fragment>
        <div className="card">
          <div className="row card-body">
            <div className="col-md-3">
              <h4>Name:</h4>
            </div>
            <div className="col-md-8">
              <input
                className="form-control"
                value={this.state.Name}
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
          <div className="row card-body">
            <div className="col-md-3">
              <h4>Nick:</h4>
            </div>
            <div className="col-md-8">
              <input
                className="form-control"
                value={this.state.Author}
                type="text"
                onChange={this.handleChangeAuth}
              />
            </div>
          </div>
          <div className="row card-footer">
            <div
              className="btn btn-block btn-outline-default"
              onClick={() => {
                this.props.deckDB.API.editHeader(this.state);
                this.deckDetailsDialog.hide();
              }}
            >
              Save change
            </div>
          </div>

          <div className="row card-footer">
            <div
              className="btn btn-block btn-primary"
              onClick={() => {
                this.props.deckDB.API.uploadDeck(this.state);
                this.deckDetailsDialog.hide();
              }}
            >
              Upload Deck
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };

  handleChangeName = event => {
    this.setState({
      Name: event.target.value
    });
  };
  handleChangeDesc = event => {
    this.setState({
      Description: event.target.value
    });
  };
  handleChangeAuth = event => {
    this.setState({
      Author: event.target.value
    });
  };
  showDeckDetails = () => {
    this.deckDetailsDialog.show();
  };

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-xl-5">
            <div className="card">
              <FilterHeader
                DB={this.props.DB}
                filter={this.props.deckDB.API.filter}
              />
              <DeckListDisplay
                DeckList={this.props.deckDB.DeckList}
                vote={this.props.deckDB.API.vote}
                show={this.showDeck}
                delete={this.props.deckDB.API.deleteDeck}
                User={this.props.User}
              />
            </div>
          </div>
          <div className="col-xl-7">
            <div className="card">
              <SubmitDeck
                SelectedDeckCode={this.props.deckDB.SelectedDeckCode}
                SelectedDeckObject={this.props.deckDB.SelectedDeckObject}
                DeckUnits={this.props.deckDB.DeckUnits}
                DB={this.props.DB}
                API={this.props.deckDB.API}
                show={this.showDeck}
                deckDetailsDialog={this.showDeckDetails}
              />
            </div>
          </div>
        </div>
        <SkyLight
          hideOnOverlayClicked
          ref={ref => (this.deckDetailsDialog = ref)}
          title={this.renderEditDialog(this.props.deckDB)}
        />
      </React.Fragment>
    );
  }
}

export default DeckDB;
