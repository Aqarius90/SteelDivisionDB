import React, { useState } from "react";
import DeckGrid from "./DumbDeckDisplay";

export function DDBRow({ x, show, del, isUser }) {
  return (
    <>
      <th className="col-2"> {x.title} </th>
      <th className="col-5"> {x.desc} </th>
      <th className="col-1">
        {!!x.divEm ? (
          <img
            src={"/SteelDivisionDB/img/d/" + x.divEm.toLowerCase() + ".tgv.png"}
            className="img-back"
            alt="divEmblem"
          />
        ) : (
          <></>
        )}
      </th>
      <th className="col-1"> {x.Side} </th>
      <th className="col-1">
        {x.timestamp ? x.timestamp.toDate().toLocaleDateString() : ""}{" "}
      </th>
      <th className="col-1">
        <button className="btn btn-outline-dark" onClick={() => show(x)}>
          Show
        </button>
      </th>
      <th className="col-1">
        {isUser(x.user) ? (
          <button className="btn btn-outline-dark" onClick={() => del(x)}>
            Delete
          </button>
        ) : (
          ""
        )}
      </th>
    </>
  );
}
export function DDBUpload({ obj, DB, upload, exportDeck, hide }) {
  const [title, setTitle] = useState(obj.title);
  const [desc, setDesc] = useState(obj.desc);
  let handleTitle = event => {
    setTitle(event.target.value);
  };
  let handleDesc = event => {
    setDesc(event.target.value);
  };

  return (
    <div className="row">
      <div className="col-12">
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-1">
                {!!obj.divEm ? (
                  <img
                    src={
                      "/SteelDivisionDB/img/d/" +
                      obj.divEm.toLowerCase() +
                      ".png"
                    }
                    className="img-back"
                    alt="divEmblem"
                  />
                ) : (
                  <></>
                )}
                <h6>{obj.div}</h6>
              </div>
              <div className="col-5">
                <div className="row">
                  <div className="col-2">Title:</div>
                  <div className="col-10">
                    <input
                      className="form-control"
                      value={title}
                      type="text"
                      onChange={handleTitle}
                    />
                  </div>
                  <div className="col-2">Description:</div>
                  <div className="col-10">
                    <input
                      className="form-control"
                      value={desc}
                      type="text"
                      onChange={handleDesc}
                    />
                  </div>
                </div>
              </div>
              <div className="col-4">
                <p>{obj.code}</p>
              </div>
              <div className="col-2">
                <div className="row">
                  <div className="col-8">
                    <button
                      className="btn btn-block btn-outline-dark"
                      onClick={() => exportDeck(obj.code)}
                    >
                      Edit in Deckbuilder
                    </button>
                    <button
                      className="btn btn-block btn-outline-dark"
                      onClick={() => upload(obj, title, desc)}
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
          </div>
          <div className="row">
            <div className="col-7">
              <DeckGrid
                DeckUnits={obj.sortByCategory(obj.deck.Cards)}
                Deck={obj}
              ></DeckGrid>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
