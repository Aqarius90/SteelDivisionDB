import React from "react";
import { SD1Parsers, SD2Parsers } from "./replayParsers";
import pako from "pako";
import { useParams } from "react-router-dom";

export default function RDBRow({ x, exportDeck, del, isUser }) {
  let params = useParams();
  let prs = params.DB === "SD1" ? SD1Parsers : SD2Parsers;
  return (
    <div className="row">
      <div className="col-2">
        <h4>{x.title}</h4>
        <h6>{x.desc}</h6>
      </div>
      <div className="col-3">
        <h6>Game mode: {prs.getGameMode(x.meta.h.GameMode)}</h6>
        <h6>Map:{prs.getMap(x.meta.h.Map)}</h6>
        <h6>Game type: {prs.getGameType(x.meta.h.GameType)}</h6>

        <h6>Time Limit: {prs.getTimeLimit(x.meta.h.TimeLimit)}</h6>
        <h6>Score Limit: {x.meta.h.ScoreLimit}</h6>
        <h6>Victory condition: {prs.getVictoryCond(x.meta.h.VictoryCond)}</h6>
      </div>
      <div className="col-2">
        <h6>Starting points:{x.meta.h.InitMoney}</h6>
        <h6>Income: {prs.getIncomeRate(x.meta.h.IncomeRate)}</h6>
        <h6>
          Duration:
          {new Date(1000 * x.meta.f.Duration).toISOString().substr(11, 8)}
        </h6>
        <h6>{x.timestamp ? x.timestamp.toDate().toLocaleDateString() : ""}</h6>

        <h6>Victory:{x.meta.f.Victory}</h6>
      </div>
      <div className="col-3">
        <div className="row">
          {x.meta.p.map((e, i) => {
            return (
              <div className="col-12" key={i}>
                <div className="row">
                  <div className="col-2">
                    <img
                      src={
                        params.DB === "SD1"
                          ? process.env.PUBLIC_URL +
                            "/img/d/" +
                            e.divEm.toLowerCase() +
                            ".tgv.png"
                          : process.env.PUBLIC_URL +
                            "/img-sd2/divs/" +
                            e.divEm.split("Emblem_")[1].toLowerCase() +
                            ".tgv.png"
                      }
                      className="img-sd2-mini"
                      alt="divEmblem"
                    />
                  </div>
                  <div className="col-7">
                    <h6>{e.PlayerName}</h6>
                    <p>Elo:{e.PlayerElo}</p>
                  </div>
                  <div className="col-3">
                    <button
                      className="btn btn-secondary"
                      onClick={() => exportDeck(e.PlayerDeckContent)}
                    >
                      export
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="col-1">
        <button
          className="btn btn-outline-dark"
          onClick={() => download(x.zip)}
        >
          Download
        </button>
      </div>
      <div className="col-1">
        {isUser ? (
          <button className="btn btn-outline-dark" onClick={() => del(x)}>
            Delete
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

function download(blob) {
  blob = pako.inflate(pako.inflate(blob));
  var file = new Blob([blob]);
  if (window.navigator.msSaveOrOpenBlob)
    // IE10+
    window.navigator.msSaveOrOpenBlob(file);
  else {
    // Others
    var a = document.createElement("a"),
      url = URL.createObjectURL(file);
    a.href = url;
    a.download = "Replay.rpl3";
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
}
