import React from "react";
import {
  DisplayAP,
  DisplayAV,
  DisplaySpecial,
  DisplayExp
} from "../DisplayComponents";

function UnitName({ Deck, x }) {
  let cl = Deck.isValid(x) ? "" : "p-err";
  return (
    <React.Fragment>
      <p className={cl}>
        {x.Unit.AliasName
          ? x.Unit.AliasName.replace("(!TUTO!)", "")
          : x.Unit.ClassNameForDebug.replace("Unit_", "")}{" "}
        {Deck.getUsedCount(x)}/{x.PackAvailabilty}
      </p>
      {x.TransportUnit ? (
        <p className={cl}>
          {x.TransportUnit.AliasName
            ? x.TransportUnit.AliasName.replace("(!TUTO!)", "")
            : x.TransportUnit.ClassNameForDebug.replace("Unit_", "")}
        </p>
      ) : (
        <></>
      )}
    </React.Fragment>
  );
}

function CardDisplay({ Deck, x }) {
  let Unit = x.Unit;
  let tUnit = x.TransportUnit;
  return (
    <React.Fragment>
      <div className="div-rel">
        <img
          src={
            "/SteelDivisionDB/img/u-md/" +
            Unit.VisualsForInterface.toLowerCase() +
            ".tgv.png"
          }
          className="img-back"
          alt="unitPortrait"
        />
        <h5 className="txt-price">
          {parseInt(Unit.ProductionPrice) +
            (tUnit ? parseInt(tUnit.ProductionPrice) : 0)}
        </h5>
        <h5 className="txt-avail">{x.UnitsPerPack}</h5>
        <h5 className="txt-phase">
          {x.AvailableFromPhase
            ? x.AvailableFromPhase === 1
              ? "B"
              : "C"
            : "A"}
        </h5>
        <DisplayExp Experiencelevel={x.Experiencelevel} css="img-rel-xp" />
        <DisplaySpecial Spec={Unit.SpecialtyTexture} css="img-rel-spec" />
        <DisplayAP AP={Unit.APValue} css="img-rel-ap" />
        <DisplayAV AV={Unit.PlatingValue} css="img-rel-ap" />
      </div>
      <UnitName x={x} Deck={Deck} />
    </React.Fragment>
  );
}

function CardDisplayRow({ Deck, Parsed }) {
  function showCard(x, i) {
    if (typeof x.Descriptor === "undefined") {
      return (
        <div className="col-xl-1 col-xl-10" key={i}>
          <h3 key={i}> {x} </h3>
        </div>
      );
    }
    return (
      <div className="col-xl-1 col-xl-10" key={i}>
        <CardDisplay x={x} Deck={Deck} />
      </div>
    );
  }

  return <div className="row">{Parsed.map((e, i) => showCard(e, i))}</div>;
}
function DeckGrid({ DeckUnits, Deck }) {
  return (
    <div className="card-body">
      <CardDisplayRow Deck={Deck} Parsed={DeckUnits[0]} />
      <CardDisplayRow Deck={Deck} Parsed={DeckUnits[1]} />
      <CardDisplayRow Deck={Deck} Parsed={DeckUnits[2]} />
      <CardDisplayRow Deck={Deck} Parsed={DeckUnits[3]} />
      <CardDisplayRow Deck={Deck} Parsed={DeckUnits[4]} />
      <CardDisplayRow Deck={Deck} Parsed={DeckUnits[5]} />
      <CardDisplayRow Deck={Deck} Parsed={DeckUnits[6]} />
      <CardDisplayRow Deck={Deck} Parsed={DeckUnits[7]} />
    </div>
  );
}

export default DeckGrid;
