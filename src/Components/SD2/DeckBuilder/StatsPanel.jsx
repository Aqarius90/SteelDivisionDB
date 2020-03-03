import React, { useState, useEffect } from "react";
import { IncomeSelector } from "./DeckGrid";
import { getIncomeArray } from "../js/serializers";

function StatsPanel({ Deck, setIncome }) {
  /*display param*/
  const [GameDuration, setGameDuration] = useState(30);
  let isDuration = x => (GameDuration === x ? "btn btn-primary" : "btn ");
  const [IncomeRate, setIncomeRate] = useState(1);
  let isIncomeRate = x => (IncomeRate === x ? "btn btn-primary" : "btn ");

  /*derived params (deck stats, really)*/
  const [summedCosts, setSummedcosts] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],

    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]);
  //costs, per section, + total

  /*math for deck evaluation*/
  useEffect(() => {
    let newSummedCosts = [];
    for (let i = 0; i < 3; i++) {
      let summa = [];
      Deck.CardsJagged.forEach(row => {
        summa.push(
          row
            .filter(e => {
              return e.phase === i; //TODO see if phase should be INT by default
            })
            .reduce(sumUnits, 0)
        );
      });
      summa.push(summa.reduce((a, b) => a + b, 0));
      newSummedCosts.push(summa);
    }
    for (let i = 0; i < 3; i++) {
      let summa = [];
      newSummedCosts[i].forEach(e => {
        summa.push(Math.round((e / newSummedCosts[i][9]) * 100) + "% ");
      });
      newSummedCosts.push(summa);
    }
    setSummedcosts(newSummedCosts);
  }, []); // unneeded, you have to leave the tab to modify units

  /*reducer*/
  function sumUnits(total, e) {
    if (!!e) {
      return (
        total + e.u.Key.ProductionPrice + (e.t ? e.t.Key.ProductionPrice : 0)
      ); //empty transport should add to 0
    }
    throw { "Summing of empty unit": e };
  }
  const calculateTotalIncome = React.useCallback(() => {
    let income = getIncomeArray(Deck);
    let totalincome = [];
    totalincome.push(income[0] * 10 * IncomeRate);
    totalincome.push(income[1] * 10 * IncomeRate);
    totalincome.push(income[2] * (GameDuration - 20) * IncomeRate);
    totalincome.push(totalincome.reduce((a, b) => a + b, 0));
    return totalincome;
  }, []);

  const [TotalIncomes, setTotalIncomes] = useState(
    calculateTotalIncome([0, 0, 0, 0])
  );
  useEffect(() => {
    setTotalIncomes(calculateTotalIncome());
  }, [GameDuration, calculateTotalIncome]);
  useEffect(() => {
    setTotalIncomes(calculateTotalIncome());
  }, [IncomeRate, calculateTotalIncome]);
  useEffect(
    function() {
      setTotalIncomes(calculateTotalIncome());
    },
    [Deck.Income, calculateTotalIncome]
  );

  return (
    <React.Fragment>
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-4">
              <IncomeSelector Deck={Deck} setIncome={setIncome} />
            </div>
            <div className="col-2 btn-group btn-group-sm">
              <button
                className={isDuration(30)}
                onClick={() => setGameDuration(30)}
              >
                Short
              </button>
              <button
                className={isDuration(40)}
                onClick={() => setGameDuration(40)}
              >
                Medium
              </button>
              <button
                className={isDuration(60)}
                onClick={() => setGameDuration(60)}
              >
                Long
              </button>
            </div>
            <div className="col-5 btn-group btn-group-sm">
              <button
                className={isIncomeRate(0)}
                onClick={() => setIncomeRate(0)}
              >
                None
              </button>
              <button
                className={isIncomeRate(0.5)}
                onClick={() => setIncomeRate(0.5)}
              >
                Very low
              </button>
              <button
                className={isIncomeRate(0.75)}
                onClick={() => setIncomeRate(0.75)}
              >
                Low
              </button>
              <button
                className={isIncomeRate(1)}
                onClick={() => setIncomeRate(1)}
              >
                Medium
              </button>
              <button
                className={isIncomeRate(1.5)}
                onClick={() => setIncomeRate(1.5)}
              >
                High
              </button>
              <button
                className={isIncomeRate(2)}
                onClick={() => setIncomeRate(2)}
              >
                Very high
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <table className="table" id="statsTable">
                <tbody>
                  <tr>
                    <th>Phase</th>
                    <th>Recon</th>
                    <th>Infantry</th>
                    <th>Tank</th>
                    <th>Support</th>
                    <th>AT</th>
                    <th>AA</th>
                    <th>Artillery</th>
                    <th>Air</th>
                    <th>Static</th>
                    <th>Total</th>
                    <th>Income</th>
                  </tr>
                  <tr key="A">
                    <th>A</th>
                    <td>{summedCosts[0][0]}</td>
                    <td>{summedCosts[0][1]}</td>
                    <td>{summedCosts[0][2]}</td>
                    <td>{summedCosts[0][3]}</td>
                    <td>{summedCosts[0][4]}</td>
                    <td>{summedCosts[0][5]}</td>
                    <td>{summedCosts[0][6]}</td>
                    <td>{summedCosts[0][7]}</td>
                    <td>{summedCosts[0][8]}</td>
                    <td>{summedCosts[0][9]}</td>
                    <td>{TotalIncomes[0]}</td>
                  </tr>
                  <tr key="a%">
                    <th>A%</th>
                    <td>{summedCosts[3][0]}</td>
                    <td>{summedCosts[3][1]}</td>
                    <td>{summedCosts[3][2]}</td>
                    <td>{summedCosts[3][3]}</td>
                    <td>{summedCosts[3][4]}</td>
                    <td>{summedCosts[3][5]}</td>
                    <td>{summedCosts[3][6]}</td>
                    <td>{summedCosts[3][7]}</td>
                    <td>{summedCosts[3][8]}</td>
                    <td>{summedCosts[3][9]}</td>
                    <td>
                      {Math.round((summedCosts[1][9] / TotalIncomes[1]) * 100) +
                        "% "}
                    </td>
                  </tr>
                  <tr key="B">
                    <th>B</th>
                    <td>{summedCosts[1][0]}</td>
                    <td>{summedCosts[1][1]}</td>
                    <td>{summedCosts[1][2]}</td>
                    <td>{summedCosts[1][3]}</td>
                    <td>{summedCosts[1][4]}</td>
                    <td>{summedCosts[1][5]}</td>
                    <td>{summedCosts[1][6]}</td>
                    <td>{summedCosts[1][7]}</td>
                    <td>{summedCosts[1][8]}</td>
                    <td>{summedCosts[1][9]}</td>
                    <td>{TotalIncomes[1]}</td>
                  </tr>
                  <tr key="B%">
                    <th>B%</th>
                    <td>{summedCosts[4][0]}</td>
                    <td>{summedCosts[4][1]}</td>
                    <td>{summedCosts[4][2]}</td>
                    <td>{summedCosts[4][3]}</td>
                    <td>{summedCosts[4][4]}</td>
                    <td>{summedCosts[4][5]}</td>
                    <td>{summedCosts[4][6]}</td>
                    <td>{summedCosts[4][7]}</td>
                    <td>{summedCosts[4][8]}</td>
                    <td>{summedCosts[4][9]}</td>
                    <td>
                      {Math.round((summedCosts[1][9] / TotalIncomes[1]) * 100) +
                        "% "}
                    </td>
                  </tr>
                  <tr key="C">
                    <th>C</th>
                    <td>{summedCosts[2][0]}</td>
                    <td>{summedCosts[2][1]}</td>
                    <td>{summedCosts[2][2]}</td>
                    <td>{summedCosts[2][3]}</td>
                    <td>{summedCosts[2][4]}</td>
                    <td>{summedCosts[2][5]}</td>
                    <td>{summedCosts[2][6]}</td>
                    <td>{summedCosts[2][7]}</td>
                    <td>{summedCosts[2][8]}</td>
                    <td>{summedCosts[2][9]}</td>
                    <td>{TotalIncomes[2]}</td>
                  </tr>
                  <tr key="C%">
                    <th>C%</th>
                    <td>{summedCosts[5][0]}</td>
                    <td>{summedCosts[5][1]}</td>
                    <td>{summedCosts[5][2]}</td>
                    <td>{summedCosts[5][3]}</td>
                    <td>{summedCosts[5][4]}</td>
                    <td>{summedCosts[5][5]}</td>
                    <td>{summedCosts[5][6]}</td>
                    <td>{summedCosts[5][7]}</td>
                    <td>{summedCosts[5][8]}</td>
                    <td>{summedCosts[5][9]}</td>
                    <td>
                      {Math.round((summedCosts[2][9] / TotalIncomes[2]) * 100) +
                        "% "}
                    </td>
                  </tr>
                  <tr key="total">
                    <th>Total</th>
                    <td>{summedCosts[2][0]}</td>
                    <td>{summedCosts[2][1]}</td>
                    <td>{summedCosts[2][2]}</td>
                    <td>{summedCosts[2][3]}</td>
                    <td>{summedCosts[2][4]}</td>
                    <td>{summedCosts[2][5]}</td>
                    <td>{summedCosts[2][6]}</td>
                    <td>{summedCosts[2][7]}</td>
                    <td>{summedCosts[2][8]}</td>
                    <td>{summedCosts[2][9]}</td>
                    <td>
                      {TotalIncomes[0] + TotalIncomes[1] + TotalIncomes[2]}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col" />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default StatsPanel;
