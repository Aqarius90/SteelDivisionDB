import React, { useState } from "react";

function Header({ Honey, API }) {
  const [share, setShare] = useState(false);
  function renderShare() {
    console.log(share);
    if (share) {
      let link =
        "https://localhost:3000/?" +
        Honey.loadedDB +
        "?" +
        Honey.ActiveTab +
        "?" +
        Honey.input;
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
      <div className="col-xl-1">
        <button
          className="btn btn-primary btn-block"
          onClick={() => API.setTab.DeckBuilder()}
          disabled={
            Honey.loadedDB && Honey.ActiveTab !== "DeckBuilder" ? false : true
          }
        >
          DeckBuilder
        </button>

        <button
          className="btn btn-primary btn-block"
          onClick={() => API.setTab.Database()}
          disabled={
            Honey.loadedDB && Honey.ActiveTab !== "DeckDB" ? false : true
          }
        >
          Database
        </button>
      </div>
      <div className="col-xl-10 panel">
        <h1 align="center">Steel Division Database</h1>
      </div>
      <div className="col-xl-1">
        <button
          className="btn btn-primary btn-block"
          onClick={
            Honey.User
              ? () => global.throw("Bugreport is bugged. How ironic.")
              : API.logIn
          }
        >
          {Honey.User ? "Report a bug" : "Login"}
        </button>
        <button
          disabled={Honey.ActiveTab === "DeckBuilder" ? false : true}
          className="btn btn-primary btn-block"
          onClick={() => setShare(!share)}
        >
          Share
        </button>
      </div>
      {renderShare()}
    </div>
  );
}

export default Header;
