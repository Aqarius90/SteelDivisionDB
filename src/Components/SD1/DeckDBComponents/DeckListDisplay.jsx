import React, { PureComponent } from "react";

class DeckListDisplay extends PureComponent {
  getPicture = x => {
    let img = "img/d/" + x.Division.toLowerCase() + ".tgv.png";
    return img;
  };

  parseAuthor = x => {
    if (this.props.User !== null && x.UID === this.props.User.uid) {
      return (
        <button
          className="btn btn-block btn-danger"
          onClick={() => this.props.delete(x)}
        >
          <p>X</p>
        </button>
      );
    } else {
      return (
        <div onClick={() => this.props.vote(x)}>
          <img
            alt="voteIcon"
            src={this.parseVote(
              x.Score.includes(this.props.User !== null && this.props.User.uid)
            )}
          />
        </div>
      );
    }
  };

  makeUnitEntry = (x, i) => {
    return (
      <tr key={i} onClick={() => {}}>
        <td>{x.Name}</td>
        <td>
          <img src={this.getPicture(x)} className="img-xp" alt="unitPortrait" />
        </td>
        <td>{x.by}</td>
        <td className="text-right">{x.Score.length}</td>
        <td>{this.parseAuthor(x)}</td>
        <td>
          <div
            className="btn btn-outline-secondary btn-block btn-sm"
            onClick={() => this.props.show(x)}
          >
            <p>Display</p>
          </div>
        </td>
      </tr>
    );
  };

  parseVote = x => {
    if (x) {
      return "img/favdecktrue.png";
    }
    return "img/favdeckfalse.png";
  };

  render() {
    if (this.props.DeckList === null) {
      return null;
    }
    return (
      <div className="col-md-12  card-body">
        <table className="sortable table-hover" id="deckTable">
          <tbody>
            <tr>
              <th>Deck Name</th>
              <th>Division</th>
              <th>By</th>
              <th>Date</th>
              <th>Score</th>
              <th />
              <th />
            </tr>
            {this.props.DeckList.map(this.makeUnitEntry)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default DeckListDisplay;
