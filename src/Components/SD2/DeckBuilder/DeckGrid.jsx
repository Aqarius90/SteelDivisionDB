import React from "react";
import CDRow from "./CDRow";

function DeckGrid({ Deck, setIncome }) {
  return (
    <div className="card-body">
      {setIncome ? <IncomeSelector Deck={Deck} setIncome={setIncome} /> : <></>}
      <CDRow Deck={Deck} Parsed={Deck.DisplayMatrix[0]} />
      <CDRow Deck={Deck} Parsed={Deck.DisplayMatrix[1]} />
      <CDRow Deck={Deck} Parsed={Deck.DisplayMatrix[2]} />
      <CDRow Deck={Deck} Parsed={Deck.DisplayMatrix[3]} />
      <CDRow Deck={Deck} Parsed={Deck.DisplayMatrix[4]} />
      <CDRow Deck={Deck} Parsed={Deck.DisplayMatrix[5]} />
      <CDRow Deck={Deck} Parsed={Deck.DisplayMatrix[6]} />
      <CDRow Deck={Deck} Parsed={Deck.DisplayMatrix[7]} />
      <CDRow Deck={Deck} Parsed={Deck.DisplayMatrix[8]} />
    </div>
  );
}

export function IncomeSelector({ Deck, setIncome }) {
  let Income = Deck.Income;
  let IncomeList = Deck.IncomeList;
  let isSelected = x => {
    if (Income === x) {
      return "btn btn-primary";
    }
    return "btn ";
  };
  return (
    <div className="card-title btn-group btn-group-sm">
      <button className={isSelected(0)} onClick={() => setIncome(0)}>
        {"Balanced:  " +
          IncomeList.Balanced[0] +
          "/" +
          IncomeList.Balanced[1] +
          "/" +
          IncomeList.Balanced[2]}
      </button>
      <button className={isSelected(1)} onClick={() => setIncome(1)}>
        {"Vanguard:  " +
          IncomeList.Vanguard[0] +
          "/" +
          IncomeList.Vanguard[1] +
          "/" +
          IncomeList.Vanguard[2]}
      </button>
      <button className={isSelected(2)} onClick={() => setIncome(2)}>
        {"Maverick:  " +
          IncomeList.Maverick[0] +
          "/" +
          IncomeList.Maverick[1] +
          "/" +
          IncomeList.Maverick[2]}
      </button>
      <button className={isSelected(3)} onClick={() => setIncome(3)}>
        {"Juggernaut:  " +
          IncomeList.Juggernaut[0] +
          "/" +
          IncomeList.Juggernaut[1] +
          "/" +
          IncomeList.Juggernaut[2]}
      </button>
      <button className={isSelected(4)} onClick={() => setIncome(4)}>
        {"Flat:  " +
          IncomeList.Flat[0] +
          "/" +
          IncomeList.Flat[1] +
          "/" +
          IncomeList.Flat[2]}
      </button>
      <button className={isSelected(5)} onClick={() => setIncome(5)}>
        {"V for Victory:  " +
          IncomeList.V[0] +
          "/" +
          IncomeList.V[1] +
          "/" +
          IncomeList.V[2]}
      </button>
    </div>
  );
}
export default DeckGrid;
