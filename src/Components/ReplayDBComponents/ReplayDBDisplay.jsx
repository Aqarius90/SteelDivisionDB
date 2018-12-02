import React, { PureComponent } from "react";
import DeckAssembly from "../../js/DeckAssembly";

class ReplayDBDisplay extends PureComponent {
  makeUnitEntry = (x, i) => {
    return (
      <tr key={i} onClick={() => {}}>
        <td>{x.Name}</td>
        <td>
          {x.Players.map((foo, j) => {
            return <p key={j}>{foo}</p>;
          })}
        </td>
        <td>
          {x.Decks.map((foo, j) => {
            return (
              <p key={j}>
                <img
                  src={this.getPicture(foo)}
                  className="img-xp"
                  alt="unitPortrait"
                />
              </p>
            );
          })}
        </td>
        <td>{x.Map}</td>
        <td>{x.Uploaded.toDate().toLocaleDateString()}</td>
        <td>{x.GameMode}</td>
        <td>{x.IncomeRate}</td>
        <td>{x.InitMoney}</td>
        <td>{x.ScoreLimit}</td>
        <td>{x.TimeLimit}</td>
        <td>{x.VictoryCond}</td>
        <td className="text-right">{x.ScoreCount}</td>
        <td>{this.parseAuthor(x)}</td>
        <td>
          <div
            className="btn btn-outline-secondary btn-block btn-sm"
            //onClick={() => this.props.show(x)}
          >
            <a href={x.DL}>Download</a>
          </div>
        </td>
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

  parseVote = x => {
    if (x) {
      return "img/favdecktrue.png";
    }
    return "img/favdeckfalse.png";
  };

  getPicture = x => {
    let foo = new DeckAssembly();
    foo.decodeDeck(x, this.props.DB);
    return "img/d/" + foo.Emblem.toLowerCase() + ".tgv.png";
  };

  render() {
    if (this.props.ReplayList === null) {
      return null;
    }
    return (
      <table className="sortable table-bordered" id="ReplayTable">
        <tbody>
          <tr>
            <th> Replay </th>
            <th> Player </th>
            <th> Deck </th>
            <th> Map </th>
            <th> Uploaded </th>
            <th> Game Mode </th>
            <th> Income </th>
            <th> Starting points </th>
            <th> Win points </th>
            <th> Time limit </th>
            <th> Win condition </th>
            <th> Score </th>
            <th />
            <th />
            <th />
          </tr>
          {this.props.ReplayList.map(this.makeUnitEntry)}
        </tbody>
      </table>
    );
  }
}

export default ReplayDBDisplay;
