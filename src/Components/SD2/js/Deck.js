import { parseToBin, parseFromBin } from "./binparsers";

class DeckAssembly {
  constructor() {
    //from DB
    this.Descriptor = "";
    this.CodeHeader = "000011000010"; //beta phase 3, "DCR"
    this.Name = "";
    this.Side = ""; //"Allies"/"Axis"
    this.DivisionTags = "";
    this.MaxActivPts = 0;
    this.Enc = 0;
    this.CostMatrix = [
      ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
      ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
      ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
      ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
      ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
      ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
      ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
      ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
      ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"]
    ];
    this.Emblem = "";
    this.IncomeList = {
      Balanced: ["-", "-", "-"],
      Vanguard: ["-", "-", "-"],
      Maverick: ["-", "-", "-"],
      Juggernaut: ["-", "-", "-"]
    };
    this.PackList = []; //avail. units
    this.TransportList = []; //avail. units

    //dynamic
    this.Income = 0; //default
    this.Cards = []; //units in deck
  }

  /*calculated properties*/
  get CardsJagged() {
    try {
      let x = [[], [], [], [], [], [], [], [], []];
      this.Cards.forEach(e => {
        try {
          switch (e.Pack.Unit.Factory) {
            case "Reco":
              x[0].push(e);
              break;
            case "Inf":
              x[1].push(e);
              break;
            case "Tank":
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
            case "Air":
              x[7].push(e);
              break;
            case "Static":
              x[8].push(e);
              break;
            case "none": //TODO remove
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
      return x; //returns nested array of units, by category
    } catch (error) {
      if (global.debug) {
        console.error(this.Cards);
        throw "CardsJagged error";
      } else {
        throw "CardsJagged error";
      }
    }
  }

  get DisplayMatrix() {
    //units+cost matrix
    let c = this.CardsJagged;
    let x = [[], [], [], [], [], [], [], [], []];
    for (let i = 0; i < c.length - 1; i++) {
      for (let j = 0; j < this.CostMatrix[i].length; j++) {
        if (c[i].length > j) {
          x[i].push(c[i][j]);
        } else {
          x[i].push(this.CostMatrix[i][j]);
        }
      }
    }
    return x;
  }

  get ActivPts() {
    //used up activation points
    let c = this.CardsJagged;
    let points = 0;
    for (let i = 0; i < c.length - 1; i++) {
      for (let j = 0; j < c[i].length; j++) {
        //if unit, and cmatrix exists, add
        if (this.CostMatrix[i].length >= j) {
          points += this.CostMatrix[i][j];
        } else {
          points += "x";
        }
      }
    }
    return points;
  }

  get DeckCode() {
    let BinaryOut = "";
    BinaryOut += this.CodeHeader; //unknown purpose

    /*encoding length and code - deck*/
    //5 bits, encoding the length of the next one. Yes, really.
    BinaryOut += this.Enc.toString(2)
      .length.toString(2)
      .padStart(5, "0");
    BinaryOut += this.Enc.toString(2);

    /*card count*/
    //compress packs
    let cardsZip = [];
    this.Cards.forEach(e => {
      let prev = cardsZip.find(x => {
        return (
          x.xp === e.xp &&
          x.phase === e.phase &&
          x.Pack.Enc === e.Pack.Enc &&
          x.Transport.Enc === e.Transport.Enc
        );
      });
      if (prev) {
        prev.count++;
      } else {
        cardsZip.push({
          xp: e.xp,
          phase: e.phase,
          Pack: e.Pack,
          Transport: e.Transport,
          count: 1
        });
      }
    });
    //see above
    BinaryOut += cardsZip.length
      .toString(2)
      .length.toString(2)
      .padStart(5, "0");
    BinaryOut += cardsZip.length.toString(2);

    /*income*/
    //using 6-7 bits of space to encode 1-2 bits of data. gg.
    BinaryOut += this.Income.toString(2)
      .length.toString(2)
      .padStart(5, "0");
    BinaryOut += this.Income.toString(2);

    /*unit count bitcount*/
    let bCount = cardsZip
      .map(e => e.count)
      .reduce((max, e) => {
        return e > max ? e : max;
      }, 0);
    console.log(cardsZip);
    BinaryOut += bCount
      .toString(2)
      .length.toString(2)
      .padStart(5, "0");

    /*unit phase bitcount*/
    let bPH = cardsZip
      .map(e => e.phase)
      .reduce((max, e) => {
        return e > max ? e : max;
      }, 0);
    BinaryOut += bPH
      .toString(2)
      .length.toString(2)
      .padStart(5, "0");

    /*unit xp bitcount*/
    let bXP = cardsZip
      .map(e => e.xp)
      .reduce((max, e) => {
        return e > max ? e : max;
      }, 0);
    BinaryOut += bXP
      .toString(2)
      .length.toString(2)
      .padStart(5, "0");

    /*unit bitcount*/
    BinaryOut += "01011"; //11 bits, TODO check if there's more.

    cardsZip.forEach(e => {
      BinaryOut += e.count.toString(2).padStart(bCount, "0");
      BinaryOut += e.phase.toString(2).padStart(bPH, "0");
      BinaryOut += e.xp.toString(2).padStart(bXP, "0");
      BinaryOut += e.Pack.Enc.toString(2).padStart(11, "0");
      BinaryOut += e.Transport.Enc.toString(2).padStart(11, "0");
    });
    return parseFromBin(BinaryOut);
  }

  loadFromDB(descriptor, DB) {
    if (descriptor === undefined) return;
    let fromDB = DB.Decks.find(x => {
      return x.Descriptor === descriptor;
    });

    this.Descriptor = fromDB.Descriptor;
    this.CodeHeader = fromDB.Header;
    this.Name = fromDB.Name;
    this.Side = fromDB.Side;
    this.DivisionTags = fromDB.DivisionTags;
    this.MaxActivPts = fromDB.MaxActivPts;
    this.Enc = fromDB.Enc;
    this.CostMatrix = fromDB.CostMatrix;
    this.Emblem = fromDB.Emblem;
    this.IncomeList = {
      Balanced: fromDB.Income.Balanced,
      Vanguard: fromDB.Income.Vanguard,
      Maverick: fromDB.Income.Maverick,
      Juggernaut: fromDB.Income.Juggernaut
    };
    this.PackList = fromDB.PackList;
    this.TransportList = fromDB.TransportList;

    /*units-as-packs are stored as:
     *unit pack{ Descriptor, Enc,
     *      AvMatrix, PackAvail, Transports,
     *      Unit{data}}
     *    }
     * transport pack:{Enc, Avail, Desc, Unit:{data}}
     */
    this.PackList.forEach(e => {
      let x = DB.Units.find(y => {
        return y.Descriptor === e.Descriptor;
      });
      if (x === undefined) {
        if (global.debug) {
          console.error(e);
          throw { "DBparsing error": e };
        } else {
          throw { "DBparsing error": e };
        }
      } else {
        e.Unit = x;
      }
    });
    this.TransportList.forEach(e => {
      let x = DB.Units.find(y => {
        return y.Descriptor === e.Desc;
      });
      if (x === undefined) {
        if (global.debug) {
          console.error(e);
          throw { "DBparsing error": e };
        } else {
          throw { "DBparsing error": e };
        }
      } else {
        e.Unit = x;
      }
    });
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
    let dbDeck = DB.Decks.find(x => {
      return x.Enc === Enc;
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
      let ID = parseInt(bin.slice(posc, posc + unitBits), 2);
      posc += unitBits;
      let tID = parseInt(bin.slice(posc, posc + unitBits), 2);
      posc += unitBits;
      let unit = this.PackList.find(x => {
        return x.Enc === ID;
      });
      let transport = this.TransportList.find(x => {
        return x.Enc === tID;
      });

      if (!unit && !transport) {
        console.error("## ERROR no such unit: " + ID + "/" + tID);
      } else if (!unit) {
        console.error("## ERROR no such unit: " + ID + "/" + transport.Desc);
      } else if (!transport) {
        console.error("## ERROR no such unit: " + unit.Descriptor + "/" + tID);
      } else {
        for (let y = 0; y < count; y++) {
          //breaking up [2xdozor] into [dozor, dozor]. much easier down the line
          //a <Card> is {ph, xp, PackUnit, PackTrans}
          //Unit is a unit as such, Pack is unit in a particular div, and Card is a deployment
          this.Cards.push(new Card(phase, xp, unit, transport));
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
    return this.PackList.some(e => {
      return x.Pack.Enc === e.Enc;
    });
  }

  unitCount(x) {
    return this.Cards.filter(e => {
      return e.Pack.Enc === x.Pack.Enc;
    }).length;
  }

  unitIsValid(x) {
    //see if units are overused
    return x.Pack.PackAvail >= this.unitCount(x);
  }

  transCount(x) {
    if (x.Transport.Enc !== 0) {
      let tally = 0;
      this.Cards.filter(e => {
        return x.Transport.Enc === e.Transport.Enc;
      }).forEach(y => {
        return (tally += y.avail);
      });
      return tally;
    } else {
      return 0;
    }
  }

  transIsValid(x) {
    //total amount of given transport used in deck
    if (x.Transport.Enc !== 0) {
      return this.transCount(x) <= x.Transport.Avail;
    } else {
      return true;
    }
  }

  setIncome(x) {
    console.log("setincome" + x);
    if (x in [0, 1, 2, 3]) {
      //only valid inputs
      this.Income = x;
    } else {
      throw { "Invalid income input": x };
    }
    return this;
  }
}
export default DeckAssembly;

class Card {
  constructor(ph, xp, unit, transport) {
    this.phase = ph;
    this.xp = xp;
    this.avail = unit.AvMatrix[ph][xp];
    this.Pack = unit;
    this.Transport = transport;
    //transport should be 0 anyway, but still
  }
}
