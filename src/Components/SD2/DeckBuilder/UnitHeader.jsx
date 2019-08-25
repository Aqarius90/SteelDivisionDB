import React from "react";

function UnitHeader({ Pack, add }) {
  console.log(Pack.trans);
  function makeButton(x, i) {
    if (x === 0 || x === "-") {
      return (
        <td key={i}>
          <button className="text-right btn btn-block btn-light" disabled>
            -
          </button>
        </td>
      );
    }
    return (
      <td key={i}>
        <button
          className="text-right btn btn-block btn-dark rounded-0"
          onClick={() =>
            add({ ph: this.ph, xp: i, Unit: Pack.pack, Transport: Pack.trans })
          }
        >
          {x}
        </button>
      </td>
    );
  }
  let makeTransport = x => {
    if (x.Descriptor === "-") {
      return (
        <React.Fragment>
          <div className="col-xl-3" />
          <div className="col-xl-2 justify-content-center" />
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <div className="col-xl-3">
          <div className="row justify-content-center">
            <img
              src={"img-sd2/pictures/" + x.Icon.toLowerCase() + ".tgv.png"}
              className="img-sd2-back"
              alt="unitPortrait"
            />
          </div>
          <div className="row justify-content-center">
            <b>{x.Name}</b>
          </div>
        </div>
        <div className="col-xl-2 justify-content-center">
          <h5>Available: {x.Avail}</h5>
          <h5>Price: {x.Price}</h5>
        </div>
      </React.Fragment>
    );
  };

  return (
    <div className="card-header">
      <div className="row">
        <div className="col-xl-3">
          <div className="row justify-content-center">
            <img
              src={
                "img-sd2/pictures/" +
                Pack.pack.Unit.Icon.toLowerCase() +
                ".tgv.png"
              }
              className="img-sd2-back"
              alt="unitPortrait"
            />
          </div>
          <div className="row justify-content-center">
            <b>{Pack.pack.Unit.Name}</b>
          </div>
        </div>
        <div className="col-xl-2 justify-content-center">
          <h5>Cards: {Pack.pack.PackAvail}</h5>
          <h5>Price: {Pack.pack.Unit.Price}</h5>
          <h5>ATshow: {Pack.pack.Unit.ATshow}</h5>
          <h5>AVshow: {Pack.pack.Unit.AVshow}</h5>
        </div>
        {makeTransport(Pack.trans.Unit)}
        <div className="col-xl-2 justify-content-center">
          <table>
            <tbody>
              <tr>{Pack.pack.AvMatrix[0].map(makeButton, { ph: "0" })}</tr>
              <tr>{Pack.pack.AvMatrix[1].map(makeButton, { ph: "1" })}</tr>
              <tr>{Pack.pack.AvMatrix[2].map(makeButton, { ph: "2" })}</tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UnitHeader;
