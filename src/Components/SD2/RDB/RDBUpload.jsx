import React, { useState } from "react";
import { SD1Parsers, SD2Parsers } from "./replayParsers";
import { useParams } from "react-router-dom";

export default function RDBUpload({ DB, upload, parsed, hide }) {
  let params = useParams();
  let prs = params.DB === "SD1" ? SD1Parsers : SD2Parsers;
  const [isUploading, setIsUploading] = useState(false);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  let handleTitle = event => {
    setTitle(event.target.value);
  };
  let handleDesc = event => {
    setDesc(event.target.value);
  };

  let uploadThis = () => {
    setIsUploading(true);
    upload(title, desc, parsed);
  };

  if (isUploading) {
    return (
      <div className="container">
        <div className="card">
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <div className="row">
                <div className="col-2">
                  <div className="row">
                    <div className="col-12">Title:</div>
                    <div className="col-12">
                      <input
                        className="form-control"
                        value={title}
                        type="text"
                        onChange={handleTitle}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-2">
                  <div className="col-12">Description:</div>
                  <div className="col-12">
                    <input
                      className="form-control"
                      value={desc}
                      type="text"
                      onChange={handleDesc}
                    />
                  </div>
                </div>
                <div className="col-2">
                  <h6>Game mode: {prs.getGameMode(parsed.meta.h.GameMode)}</h6>
                  <h6>Game type: {prs.getGameType(parsed.meta.h.GameType)}</h6>
                  <h6>Map: {prs.getMap(parsed.meta.h.Map)}</h6>
                </div>
                <div className="col-2">
                  <h6>Income: {prs.getIncomeRate(parsed.meta.h.IncomeRate)}</h6>
                  <h6>Starting points:{parsed.meta.h.InitMoney}</h6>
                  <h6>
                    Time Limit: {prs.getTimeLimit(parsed.meta.h.TimeLimit)}
                  </h6>
                </div>
                <div className="col-2">
                  <h6>
                    Duration:
                    {new Date(1000 * parsed.meta.f.Duration)
                      .toISOString()
                      .substr(11, 8)}
                  </h6>
                  <h6>Score Limit: {parsed.meta.h.ScoreLimit}</h6>
                  <h6>Victory condition: {parsed.meta.h.VictoryCond}</h6>
                  <h6>Victory:{parsed.meta.f.Victory}</h6>
                </div>
                <div className="col-2">
                  <div className="row">
                    <div className="col-8">
                      <button
                        className="btn btn-block btn-outline-dark"
                        onClick={() => uploadThis()}
                      >
                        Upload
                      </button>
                    </div>
                    <div className="col-4">
                      <button className="btn btn-danger" onClick={hide}>
                        X
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">
                {parsed.meta.p.map((e, i) => {
                  return (
                    <div key={i}>
                      <h6>PlayerName:{e.PlayerName}</h6>
                      <h6>PlayerElo:{e.PlayerElo}</h6>
                      <h6>PlayerDeckContent:{e.PlayerDeckContent}</h6>
                      <h6>PlayerIncomeRate:{e.PlayerIncomeRate}</h6>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
