import React, { Component } from "react";

function Header({ Honey }) {
  return (
    <div className="row card-header">
      <div className="col-xl-1">
        <button
          className="btn btn-primary btn-block"
          onClick={() => Honey.setActiveTab("DeckBuilder")}
          disabled={
            Honey.loadedDB && Honey.ActiveTab !== "DeckBuilder" ? false : true
          }
        >
          DeckBuilder
        </button>

        <button
          className="btn btn-primary btn-block"
          onClick={() => Honey.setActiveTab("Database")}
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
              : Honey.logIn
          }
        >
          {Honey.User ? "Report a bug" : "Login"}
        </button>
        <button
          disabled={Honey.ActiveTab === "DeckBuilder" ? false : true}
          className="btn btn-primary btn-block"
          onClick={Honey.share}
        >
          Share
        </button>
      </div>
    </div>
  );
}

export default Header;
