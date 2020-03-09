import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

function Header({ Honey, API }) {
  let params = useParams();
  let history = useHistory();
  const [quiz, setQuiz] = useState(false);
  return (
    <div className="row card-header">
      <div className="col-xl-2 col-md-3">
        <button
          className="btn btn-primary btn-block"
          onClick={() =>
            history.push(
              "/SteelDivisionDB/" +
                params.DB +
                "/DeckBuilder" +
                (params.code ? "/" + params.code : "")
            )
          }
          disabled={params.DB && params.Page !== "DeckBuilder" ? false : true}
        >
          DeckBuilder
        </button>
        <button
          className="btn btn-primary btn-block"
          onClick={() =>
            history.push(
              "/SteelDivisionDB/" +
                params.DB +
                "/Database" +
                (params.code ? "/" + params.code : "")
            )
          }
          disabled={params.DB && params.Page !== "Database" ? false : true}
        >
          Database
        </button>
      </div>
      <div className="col-xl-8 col-md-6 panel">
        <h1 align="center" onClick={() => setQuiz(!quiz)}>
          Steel Division Database
        </h1>
      </div>
      <div className="col-xl-2 col-md-3">
        <button
          className="btn btn-primary btn-block"
          onClick={() =>
            history.push(
              "/SteelDivisionDB/" +
                params.DB +
                "/DDB" +
                (params.code ? "/" + params.code : "")
            )
          }
          disabled={params.Page !== "DDB" ? false : true}
        >
          Decks
        </button>
        <button
          className="btn btn-primary btn-block"
          onClick={() =>
            history.push(
              "/SteelDivisionDB/" +
                params.DB +
                "/RDB" +
                (params.code ? "/" + params.code : "")
            )
          }
          disabled={params.DB && params.Page !== "RDB" ? false : true}
        >
          Replays
        </button>
      </div>
      {/*Honey.User && quiz ? (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            background: "rgba(0,0,0,0.6)",
            zIndex: 5,
            width: "100%",
            height: "100%"
          }}
          onClick={() => setQuiz(false)}
        >
        </div>
      ) : (
        <></>
      )*/}
    </div>
  );
}

export default Header;
