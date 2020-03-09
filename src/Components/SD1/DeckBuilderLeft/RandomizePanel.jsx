import React, { Component } from "react";

class RandomizePanel extends Component {
  makeButton = (x, i) => {
    let css = "btn";
    if (this.props.RandomizerDecks.filter(e => e === x).length > 0) {
      css += " btn-success";
    }
    let img =
      process.env.PUBLIC_URL +
      "/img/d/" +
      x.EmblemTexture.toLowerCase() +
      ".tgv.png";
    return (
      <div className="col-xl-3" key={i}>
        <button
          className={css}
          onClick={e => this.props.f.toggleRandomizer(x, e)}
        >
          <img src={img} className="img-back" alt="unitPortrait" />
        </button>
      </div>
    );
  };

  makeDeck = () => {
    if (this.props.RandomizerDecks.length === 0) {
      //empty
    } else {
      this.props.f.autofill(
        this.props.RandomizerDecks[
          Math.floor(Math.random() * this.props.RandomizerDecks.length)
        ]
      );
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-xl">
            <button
              className="btn btn-default btn-block"
              onClick={e => this.props.f.toggleRandomizer("Allied", e)}
            >
              Allies
            </button>
          </div>
          <div className="col-xl">
            <button
              className="btn btn-default btn-block"
              onClick={e => this.props.f.toggleRandomizer("Axis", e)}
            >
              Axis
            </button>
          </div>
        </div>
        <div className="row card-body">
          <div className="col-xl">
            <div className="row">
              {this.props.DB.filter(x => {
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
              {this.props.DB.filter(x => {
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
