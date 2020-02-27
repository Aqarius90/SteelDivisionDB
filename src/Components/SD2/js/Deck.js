import { parseToBin, parseFromBin } from "./binparsers";

class DeckAssembly {
  constructor() {
    //from DB
    this.CodeHeader = "000011000010"; //do not touch
    this.Descriptor = "";
    this.DivisonName = "";
    this.Side = ""; //"Allies"/"Axis"
    this.Tags = [];
    this.Units = []; //{Key, Value} as unit/rule
    this.Transports = []; //same
    this.MaxActivationPoints = 0;
    this.CostMatrix = [[], [], [], [], [], [], [], [], []];
    this.EmblemTexture = "";
    this.TypeTexture = "";
    this.Rating = "";
    this.Serial = 0;
    this.IncomeList = {
      Balanced: [0, 0, 0],
      Vanguard: [0, 0, 0],
      Maverick: [0, 0, 0],
      Juggernaut: [0, 0, 0]
    };

    //dynamic
    this.Income = 0; //default
    this.Cards = []; //units in deck
  }

  /*calculated properties*/
  get CardsJagged() {
    let x = [[], [], [], [], [], [], [], [], []];
    try {
      this.Cards.forEach(e => {
        try {
          switch (e.u.Key.Factory) {
            case "Recons":
              x[0].push(e);
              break;
            case "Infantry":
              x[1].push(e);
              break;
            case "Tanks":
              x[2].push(e);
              break;
            case "Support":
              x[3].push(e);
              break;
            case "AT":
              x[4].push(e);
              break;
            case "DCA":
              x[5].push(e);
              break;
            case "Art":
              x[6].push(e);
              break;
            case "Planes":
              x[7].push(e);
              break;
            case "Defense":
              x[8].push(e);
              break;
            default: {
              throw new Error("Factory parse error");
            }
          }
        } catch {
          if (global.debug) {
            console.error("Factory parse error");
            console.error(e);
          } else {
            //console.error("Factory parse error");
          }
        }
      });
    } catch (error) {
      global.throw("CardsJagged error", this.Cards, error);
    }
    return x; //returns nested array of units, by category
  }

  get DisplayMatrix() {
    //units+cost matrix
    let c = this.CardsJagged;
    let x = [[], [], [], [], [], [], [], [], []];

    for (let i = 0; i < 9; i++) {
      //unit type
      c[i].forEach(e => x[i].push(e));
      for (let j = 0; j < 10; j++) {
        if (x[i].length > j) {
          //place taken, move on
        } else if (this.CostMatrix[i].length > j) {
          x[i][j] = this.CostMatrix[i][j];
        } else {
          x[i][j] = "X";
        }
      }
    }
    return x;
  }

  get ActivPts() {
    //used up activation points = total points in grid - left over points
    let sum = 0;
    this.CostMatrix.forEach(e => e.forEach(f => (sum += f)));
    this.DisplayMatrix.forEach(z =>
      z.forEach(r => {
        //I love/hate JS
        sum -= typeof r === "number" && r;
      })
    );
    return sum;
  }

  get DeckCode() {
    let BinaryOut = "";
    BinaryOut += this.CodeHeader; //unknown purpose

    /*encoding length and code - deck*/
    //5 bits, encoding the length of the next one. Yes, really.
    BinaryOut += this.Serial.toString(2)
      .length.toString(2)
      .padStart(5, "0");
    BinaryOut += this.Serial.toString(2);

    /*card count*/
    //compress packs
    let cardSet = this.Cards.filter(
      //not an actual Set()
      (e, i, a) =>
        a.findIndex(x => {
          return (
            x.xp === e.xp &&
            x.phase === e.phase &&
            x.uid === e.uid &&
            x.tid === e.tid
          );
        }) === i
    );
    cardSet.forEach(e => {
      e.count = this.Cards.filter(x => {
        return (
          x.xp === e.xp &&
          x.phase === e.phase &&
          x.uid === e.uid &&
          x.tid === e.tid
        );
      }).length;
    });

    //see above
    BinaryOut += cardSet.length
      .toString(2)
      .length.toString(2)
      .padStart(5, "0");
    BinaryOut += cardSet.length.toString(2);

    /*income*/
    //using 6-7 bits of space to encode 1-2 bits of data. gg.
    BinaryOut += this.Income.toString(2)
      .length.toString(2)
      .padStart(5, "0");
    BinaryOut += this.Income.toString(2);

    /*unit count bitcount*/
    let bCount = cardSet
      .map(e => e.count)
      .reduce((max, e) => {
        return e > max ? e : max;
      }, 0);
    BinaryOut += bCount
      .toString(2)
      .length.toString(2)
      .padStart(5, "0");

    /*unit phase bitcount*/
    let bPH = cardSet
      .map(e => e.phase)
      .reduce((max, e) => {
        return e > max ? e : max;
      }, 0);
    BinaryOut += bPH
      .toString(2)
      .length.toString(2)
      .padStart(5, "0");

    /*unit xp bitcount*/
    let bXP = cardSet
      .map(e => e.xp)
      .reduce((max, e) => {
        return e > max ? e : max;
      }, 0);
    BinaryOut += bXP
      .toString(2)
      .length.toString(2)
      .padStart(5, "0");

    /*unit bitcount*/
    BinaryOut += "01011"; //11 bits for each unit. Update might change this

    cardSet.forEach(e => {
      BinaryOut += e.count.toString(2).padStart(bCount, "0");
      BinaryOut += e.phase.toString(2).padStart(bPH, "0");
      BinaryOut += e.xp.toString(2).padStart(bXP, "0");
      BinaryOut += e.uid.toString(2).padStart(11, "0");
      BinaryOut += e.tid.toString(2).padStart(11, "0");
    });
    console.log(BinaryOut);
    return parseFromBin(BinaryOut);
  }

  loadFromDB(descriptor, DB) {
    //loads deck from DB, input is descriptor
    if (descriptor === undefined) return;
    let fromDB = DB.find(x => {
      return x.Descriptor === descriptor;
    });

    this.Descriptor = fromDB.Descriptor;
    this.DivisonName = fromDB.DivisionName;
    this.Side = fromDB.Side;
    this.Tags = fromDB.Tags;
    this.Units = fromDB.Units;
    this.Transports = fromDB.Transports;
    this.MaxActivationPoints = fromDB.MaxActivationPoints;
    this.CostMatrix = fromDB.CostMatrix;
    this.EmblemTexture = fromDB.EmblemTexture;
    this.TypeTexture = fromDB.TypeTexture;
    this.Rating = fromDB.Rating;
    this.Serial = fromDB.Serial;
    this.IncomeList = fromDB.Economy;
    return this;
  }

  loadFromCode(code, DB) {
    let bin = parseToBin(code);
    if (global.debug) {
      console.log("bin");
      console.log(bin);
    }
    let posc = 0;
    this.CodeHeader = bin.slice(posc + 0, posc + 12); //TODO figure out what this is
    posc += 12;

    //deck encode int
    let EncBin = parseInt(bin.slice(posc + 0, posc + 5), 2);
    posc += 5;
    let Enc = parseInt(bin.slice(posc + 0, posc + EncBin), 2);
    posc += EncBin;

    //load deck defaults from DB
    let dbDeck = DB.find(x => {
      return x.Serial === Enc;
    });
    if (dbDeck) {
      this.loadFromDB(dbDeck.Descriptor, DB);
    } else if (global.debug) {
      console.error("no such deck"); //keep parsing, for debug ease
    }

    //number of cards
    let bitsofCardCount = parseInt(bin.slice(posc, posc + 5), 2);
    posc += 5;
    let cardcount = parseInt(bin.slice(posc, posc + bitsofCardCount), 2);
    posc += bitsofCardCount;

    //income
    let bitsofIncome = parseInt(bin.slice(posc, posc + 5), 2);
    posc += 5;
    this.Income = parseInt(bin.slice(posc + 0, posc + bitsofIncome));
    posc += bitsofIncome;

    //unit loop bit counts
    let unitCountBits = parseInt(bin.slice(posc + 0, posc + 5), 2);
    posc += 5;
    let phaseCountBits = parseInt(bin.slice(posc + 0, posc + 5), 2);
    posc += 5;
    let xpCountBits = parseInt(bin.slice(posc + 0, posc + 5), 2);
    posc += 5;
    let unitBits = parseInt(bin.slice(posc + 0, posc + 5), 2);
    posc += 5;

    //unit loop
    for (let i = 0; i < cardcount; i++) {
      let count = parseInt(bin.slice(posc, posc + unitCountBits), 2);
      posc += unitCountBits;
      let phase = parseInt(bin.slice(posc, posc + phaseCountBits), 2);
      posc += phaseCountBits;
      let xp = parseInt(bin.slice(posc, posc + xpCountBits), 2);
      posc += xpCountBits;
      let ID = parseInt(bin.slice(posc, posc + unitBits), 2) - 1; //off by one. :eugen:
      posc += unitBits;
      let tID = parseInt(bin.slice(posc, posc + unitBits), 2) - 1; //same
      posc += unitBits;

      let unitPack = this.Units.find(x => {
        return x.Key.Serial === ID;
      });
      tID = tID === -1 ? 0 : tID; //to falsey
      let transportPack = tID; //to falsey
      if (tID) {
        transportPack = this.Transports.find(x => {
          return x.Key.Serial === tID;
        });
      }

      if (!unitPack && !transportPack && tID) {
        console.error("## ERROR no such unitPack: " + ID + "/" + tID);
      } else if (!unitPack) {
        console.error(
          "## ERROR no such unitPack: " +
            ID +
            "/" +
            transportPack.Key.UnitDescriptor
        );
      } else if (!transportPack && tID) {
        console.error(
          "## ERROR no such unitPack: " +
            unitPack.Key.UnitDescriptor +
            "/" +
            tID
        );
      } else {
        for (let y = 0; y < count; y++) {
          //breaking up [2xdozor] into [dozor, dozor]. much easier down the line
          //a <Card> is {ph, xp, PackUnit, PackTrans}
          //Unit is a unit as such, Pack is unit in a particular div, and Card is a deployment
          this.Cards.push(new Card(phase, xp, unitPack, transportPack));
        }
      }
    }
    if (global.debug) {
      console.log(this.DeckCode);
    }
    return this;
  }

  addUnit({ ph, xp, Unit, Transport }) {
    this.Cards.push(new Card(ph, xp, Unit, Transport));
    return this;
  }

  deleteUnit(Unit) {
    this.Cards.splice(
      this.Cards.findIndex(e => {
        return Unit === e;
      }),
      1
    );
    return this;
  }

  packIsValid(x) {
    //see if unit is in division at all
    return this.Units.some(e => {
      return (
        x.u.Key.Serial === e.Key.Serial &&
        (!x.t ||
          e.Value.AvailableTransportList.some(f => x.t.Key.Descriptor === f))
      );
    });
  }

  unitCount(x) {
    //count cards of given unit currently in deck
    return this.Cards.filter(e => {
      return e.u.Key.Serial === x.u.Key.Serial;
    }).length;
  }

  unitIsValid(x) {
    //see if units are overused
    return x.u.Value.MaxPackNumber >= this.unitCount(x);
  }

  transCount(x) {
    //count number of transports used by deck currently
    if (x.t) {
      let tally = 0;
      this.Cards.filter(e => {
        return x.t.Key.Serial === (e.t ? e.t.Key.Serial : 0);
      }).forEach(y => {
        return (tally += y.avail);
      });
      return tally;
    } else {
      global.throw("non-trans trans count", x);
    }
  }

  transIsValid(x) {
    //total amount of given transport used in deck
    return !x.t || this.transCount(x) <= x.t.Value;
  }

  setIncome(x) {
    if (x in [0, 1, 2, 3]) {
      //only valid inputs
      this.Income = x;
    } else {
      global.throw("Invalid income input", x);
    }
    return this;
  }
}
export default DeckAssembly;

class Card {
  constructor(ph, xp, unit, transport) {
    if ([ph, xp, unit, transport].includes(null)) {
      global.throw("parameter input error - Card constructor", [
        ph,
        xp,
        unit,
        transport
      ]);
    }

    this.phase = ph;
    this.xp = xp;
    this.avail = Math.floor(
      unit.Value.UnitsPerPack[ph] * unit.Value.XPBonus[xp]
    );
    this.u = unit;
    this.t = transport;
    //for encoding convenience
    this.uid = unit.Key.Serial + 1;
    this.tid = transport ? transport.Key.Serial + 1 : 0;
  }
}
