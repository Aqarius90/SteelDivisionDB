import React, { useState } from "react";

export default function Quiz({ User }) {
  return (
    <div className="modal-dialog" onClick={e => e.stopPropagation()}>
      <div className="modal-content">
        <div className="modal-header"></div>
        <div className="modal-body"></div>
        <div className="modal-footer">
          <div className="row">
            <div className="col">
              <button className="btn btn-block"></button>
            </div>
            <div className="col">
              <button className="btn btn-block"></button>
            </div>
            <div className="col">
              <button className="btn btn-block"></button>
            </div>
            <div className="col">
              <button className="btn btn-block"></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
