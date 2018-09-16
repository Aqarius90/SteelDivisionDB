import React, { Component } from "react";

class RandomizePanel extends Component {
  constructor(props) {
    super(props);
    this.state = { Decks: [] };
  }

  setFilter = x => {
    let newState;
    if (x === "Allied" || x === "Axis") {
      newState = this.props.DB.Decks.filter(e => e.DivisionNationalite === x);
    } else {
      newState = this.state.Decks;
      if (newState.filter(e => e === x).length > 0) {
        newState.splice(newState.indexOf(x), 1);
      } else {
        newState.push(x);
      }
    }
    this.setState({ Decks: newState });
  };

  makeButton = (x, i) => {
    let css = "btn";
    if (this.state.Decks.filter(e => e === x).length > 0) {
      css += " btn-success";
    }
    let img = "img/d/" + x.EmblemTexture.toLowerCase() + ".tgv.png";
    return (
      <div className="col-xl-3" key={i}>
        <button className={css} onClick={e => this.setFilter(x, e)}>
          <img src={img} className="img-back" alt="unitPortrait" />
        </button>
      </div>
    );
  };

  makeDeck = () => {
    console.log(this.state.Decks);
    if (this.state.Decks.length === 0) {
      //empty
    }
    this.props.f.autofill(
      this.state.Decks[Math.floor(Math.random() * this.state.Decks.length)]
    );
  };

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-xl">
            <button
              className="btn btn-default btn-block"
              onClick={e => this.setFilter("Allied", e)}
            >
              Allies
            </button>
          </div>
          <div className="col-xl">
            <button
              className="btn btn-default btn-block"
              onClick={e => this.setFilter("Axis", e)}
            >
              Axis
            </button>
          </div>
        </div>
        <div className="row card-body">
          <div className="col-xl">
            <div className="row">
              {this.props.DB.Decks.filter(x => {
                return x.DivisionNationalite === "Allied";
              })
                .filter(x => {
                  return x.DivisionTags.includes("DEFAULT");
                })
                .map(this.makeButton)}
            </div>
          </div>
          <div className="col-xl">
            <div className="row">
              {this.props.DB.Decks.filter(x => {
                return x.DivisionNationalite === "Axis";
              })
                .filter(x => {
                  return x.DivisionTags.includes("DEFAULT");
                })
                .map(this.makeButton)}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl">
            <button
              className="btn btn-default btn-block"
              onClick={this.makeDeck}
            >
              Generate
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default RandomizePanel;
