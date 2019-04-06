import React, { Component } from "react";
import {
  parseGameMode,
  parseVictoryCond,
  parseMap,
  parseTimeLimit,
  parseIncomeRate,
  parseGameType
} from "./js/ReplayParsers";

class UploadDialog extends Component {
  state = { Replay: null, replayFile: null, desc: "Description" };

  parseReplay = (x, f) => {
    let HeaderStart = x.indexOf('"game"');
    let HeaderEnd = x.indexOf("}}star");
    let header = x.slice(HeaderStart, HeaderEnd);
    header = JSON.parse("{" + header + "}}"); //to valid JSON
    //game, ...player

    let headerArr = [];
    for (var key in header) {
      if (header.hasOwnProperty(key)) {
        headerArr.push(header[key]);
      }
    }
    let Game = [];
    let Players = [];
    for (let i = 0; i < headerArr.length; i++) {
      if (i === 0) {
        Game = headerArr[i];
      } else {
        Players.push(headerArr[i]);
      }
    }

    let FooterStart = x.indexOf('"result"');
    let FooterEnd = x.length - 1;
    let footer = x.slice(FooterStart, FooterEnd);
    footer = JSON.parse(
      footer.slice(footer.indexOf(":") + 1) //remove title
    ); //duration, score, victory

    let Replay = {};
    Replay.VictoryCond = Game.VictoryCond;
    Replay.TimeLimit = Game.TimeLimit;
    Replay.ScoreLimit = Game.ScoreLimit;
    Replay.Map = Game.Map;
    Replay.InitMoney = Game.InitMoney;
    Replay.IncomeRate = Game.IncomeRate;
    Replay.GameType = Game.GameType;
    Replay.GameMode = Game.GameMode;
    Replay.Name = Game.ServerName;
    Replay.gameID = Game.UniqueSessionId;

    Replay.Players = [];
    Replay.Decks = [];

    Players.forEach(player => {
      Replay.Decks.push(player.PlayerDeckContent);
      Replay.Players.push(player.PlayerName);
    });
    this.setState({ Replay: Replay, replayFile: f });
  };

  handleFileSelect = evt => {
    let replayFile = evt.target.files[0];
    let reader = new FileReader();
    reader.onload = () => {
      this.parseReplay(reader.result, replayFile);
    };
    reader.readAsText(replayFile);
  };

  handleChangeName = event => {
    let x = this.state.Replay;
    x.Name = event.target.value;
    this.setState({
      Replay: x
    });
  };

  handleChangeDescription = event => {
    let x = this.state.Replay;
    x.Description = event.target.value;
    this.setState({
      Replay: x,
      desc: x.Description
    });
  };

  render() {
    if (this.state.Replay === null) {
      return (
        <input id="replayFile" type="file" onChange={this.handleFileSelect} />
      );
    } else if (this.props.IsUploading) {
      return (
        <div className="card">
          <div className="mx-auto">
            <div className="lds-dual-ring" />
          </div>
        </div>
      );
    } else {
      return (
        <React.Fragment>
          <input id="replayFile" type="file" onChange={this.handleFileSelect} />
          <div className="row">
            <div className="col-md-3">
              <h5>Name</h5>
            </div>
            <div className="col-md-9">
              <input
                className="form-control"
                value={this.state.Replay.Name}
                type="text"
                onChange={this.handleChangeName}
              />
            </div>
            <div className="col-md-3">
              <h5>Description</h5>
            </div>
            <div className="col-md-9">
              <input
                className="form-control"
                value={this.state.desc}
                type="text"
                onChange={this.handleChangeDescription}
              />
            </div>
            <div className="col-md-12">
              <h5>Players:</h5>
            </div>
            {this.state.Replay.Players.map((x, i) => {
              return (
                <div className="col-md-3" key={i}>
                  <h5>{x + ", "}</h5>
                </div>
              );
            })}
            <div className="col-md-2">
              <h5>
                {"Victory: " + parseVictoryCond(this.state.Replay.VictoryCond)}
              </h5>
            </div>
            <div className="col-md-3">
              <h5>
                {"TimeLimit: " + parseTimeLimit(this.state.Replay.TimeLimit)}
              </h5>
            </div>
            <div className="col-md-3">
              <h5>{"ScoreLimit: " + this.state.Replay.ScoreLimit}</h5>
            </div>
            <div className="col-md-3">
              <h5>{"InitMoney: " + this.state.Replay.InitMoney}</h5>
            </div>
            <div className="col-md-4">
              <h5>{"Map: " + parseMap(this.state.Replay.Map)}</h5>
            </div>
            <div className="col-md-2">
              <h5>
                {"IncomeRate: " + parseIncomeRate(this.state.Replay.IncomeRate)}
              </h5>
            </div>
            <div className="col-md-2">
              <h5>
                {"GameType: " + parseGameType(this.state.Replay.GameType)}
              </h5>
            </div>
            <div className="col-md-2">
              <h5>
                {"GameMode: " + parseGameMode(this.state.Replay.GameMode)}
              </h5>
            </div>

            <div
              className="btn btn-block btn-primary"
              onClick={() => {
                this.props.upload(this.state.Replay, this.state.replayFile);
              }}
            >
              Upload
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default UploadDialog;
