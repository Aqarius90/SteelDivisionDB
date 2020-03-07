import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

function Header({ Honey, API }) {
  let params = useParams();
  let history = useHistory();
  console.log(params);
  const [share, setShare] = useState(false);
  function renderShare() {
    if (share) {
      let link =
        "https://localhost:3000/SteelDivisionDB/" +
        params.DB +
        "/" +
        params.Page +
        "/" +
        params.code;
      return (
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
          onClick={() => setShare(false)}
        >
          <div className="modal-dialog" onClick={e => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header"></div>
              <div className="modal-body">{link}</div>
              <div className="modal-footer"></div>
            </div>
          </div>
        </div>
      );
    }
    return <div />;
  }
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
        {/*<button
          disabled={params.DB && params.Page !== "DeckBuilder" ? false : true}
          className="btn btn-primary btn-block"
          onClick={() => setShare(!share)}
        >
          Share
        </button>*/}
      </div>
      <div className="col-xl-8 col-md-6 panel">
        <h1 align="center">Steel Division Database</h1>
      </div>
      <div className="col-xl-2 col-md-3">
        {/*<button className="btn btn-primary btn-block" onClick={API.logIn}>
          {params.User ? "Logout" : "Login"}
        </button>*/}
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
      {renderShare()}
    </div>
  );
}

export default Header;
