import { parseToBin, parseFromBin } from "./parsers";

class DeckAssembly {
  constructor() {
    //missing: actual div name
    this.Serializer = 0;
    this.DivisionNationalite = ""; // Axis/Allied

    this.PhaseA = 0; //incomes
    this.PhaseB = 0;
    this.PhaseC = 0;

    this.PackList = []; //avail. units

    this.Emblem = "";
    this.Portrait = "";

    this.CostMatrix = [
      ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
      ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
      ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
      ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
      ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
      ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
      ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
      ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"]
    ];
    this.Cards = [];
    this.DeckPointsTotal = 0; //max
  }

  setDeck(deck) {
    this.Serializer = deck.EncodeInt;
    this.DivisionNationalite = deck.DivisionNationalite;
    this.PhaseA = deck.PhaseA;
    this.PhaseB = deck.PhaseB;
    this.PhaseC = deck.PhaseC;
    this.PackList = deck.PackList;

    this.Emblem = deck.EmblemTexture;
    this.Portrait = deck.PortraitTexture;

    let matrix = new Array(8);
    for (let i = 0; i < 8; i++) {
      matrix[i] = new Array(10);
      for (let j = 0; j < 10; j++) {
        if (typeof deck.CostMatrix[i][j] === "undefined") {
          matrix[i][j] = "X";
        } else {
          matrix[i][j] = deck.CostMatrix[i][j];
        }
      }
    }

    /*:eugene:
     *cost matrix enum:
     *0 ~air~ "avion"
     *1 ~tank~ 'char"
     *2 arty
     *3 support
     *4 inf
     *5 recon
     *6 PAK
     *7 AA*/

    this.CostMatrix[7] = matrix[0];
    this.CostMatrix[2] = matrix[1];
    this.CostMatrix[6] = matrix[2];
    this.CostMatrix[3] = matrix[3];
    this.CostMatrix[1] = matrix[4];
    this.CostMatrix[0] = matrix[5];
    this.CostMatrix[4] = matrix[6];
    this.CostMatrix[5] = matrix[7];

    this.DeckPointsTotal = deck.MaxActivationPoints;
    this.encodeDeck();
    return this;
  }

  decodeDeck(deckCode, DB) {
    //decode to binary
    if (typeof deckCode === "undefined" || deckCode.length < 4) {
      let newdeck = new DeckAssembly(); //if code infalid return empty deck
      newdeck.ExportCode = newdeck.encodeDeck();
      return newdeck;
    }
    this.Cards = [];
    let deckBinary = parseToBin(deckCode);

    let sUCount = 10; //start of unit counter
    let sUCOdes = 18; //start of unit encoding
    let sULen = 18; //unit card length (+4 for count)

    //extract deck
    let bin = "";
    for (let i = 0; i < sUCount; i++) {
      bin += deckBinary.charAt(i);
    }
    let deckInt = parseInt(bin, 2);

    for (let i = 0; i < DB.Decks.length; i++) {
      if (DB.Decks[i].EncodeInt === deckInt) {
        this.setDeck(DB.Decks[i]);
      }
    }

    //Units
    let sCount = ""; //get number of unique units in deck
    for (let i = sUCount; i < sUCOdes; i++) {
      sCount += deckBinary.charAt(i);
    }
    let CardsCount = parseInt(sCount, 2); //total amount of unique units in deck

    let iPC = sUCOdes; //<-positioncounter
    for (let i = 0; i < CardsCount; i++) {
      /*for the rest of the binary, count out the unit, then the amount of cards*/
      let sUnit = "",
        sAmount = "";
      for (let j = iPC; j < iPC + sULen; j++) {
        sUnit += deckBinary.charAt(j);
      }
      iPC += sULen;
      for (let j = iPC; j < iPC + 4; j++) {
        sAmount += deckBinary.charAt(j);
      }
      iPC += 4;
      let iAmount = parseInt(sAmount, 2);

      /*get unit from DB and add to deck, one per amount
       * since the deck records two identical cards as {card, 2}
       * and we need them as {card}, {card}, we'll be incrementing
       * CardsCount on every non-first idencital card, since they
       * "don't count" in the code's cards counter
       */
      this.Cards[i] = DB.Packs.filter(function(pack) {
        //first card is added right away
        return pack.EncodeInt === parseInt(sUnit, 2);
      })[0];
      for (let j = 0; j < iAmount - 1; j++) {
        //second, if it's there, is added after the index move
        i++;
        CardsCount++;
        this.Cards[i] = DB.Packs.filter(function(pack) {
          return pack.EncodeInt === parseInt(sUnit, 2);
        })[0];
      }
    }
    this.ExportCode = this.encodeDeck();
    return this;
  }

  encodeDeck() {
    let BinaryOut = "";
    let padDeck = "0000000000";
    BinaryOut +=
      padDeck.substring(
        0,
        padDeck.length - this.Serializer.toString(2).length
      ) + this.Serializer.toString(2); //pad left

    /*compression*/
    //sort for tally  <<will not return the same code as input, but will return a working code
    this.Cards.sort(function(a, b) {
      return a.EncodeInt > b.EncodeInt ? 1 : b.EncodeInt > a.EncodeInt ? -1 : 0;
    });

    //unit count
    let uniqueUnits = [];
    let currentCount = 0;
    for (let i = 0; i < this.Cards.length; i++) {
      if (
        typeof this.Cards[i + 1] !== "undefined" &&
        this.Cards[i].EncodeInt === this.Cards[i + 1].EncodeInt
      ) {
        currentCount++;
      } else {
        currentCount++;
        let unit = this.Cards[i].EncodeInt;
        uniqueUnits.push({ unit, currentCount });
        currentCount = 0;
      }
    }

    let padUnique = "00000000";
    BinaryOut +=
      padUnique.substring(
        0,
        padUnique.length - uniqueUnits.length.toString(2).length
      ) + uniqueUnits.length.toString(2); //pad left

    //export units
    let padUnit = "000000000000000000";
    let padCount = "0000";
    for (let i = 0; i < uniqueUnits.length; i++) {
      let unit = uniqueUnits[i].unit.toString(2);
      let tally = uniqueUnits[i].currentCount.toString(2);
      BinaryOut += padUnit.substring(0, padUnit.length - unit.length) + unit; //pad left
      BinaryOut +=
        padCount.substring(0, padCount.length - tally.length) + tally;
    }
    let charArray = BinaryOut.match(/.{1,6}/g); //groups of six
    this.ExportCode = parseFromBin(charArray);
    return this.ExportCode;
  }

  addUnit(unit) {
    this.Cards.push(unit);
    this.encodeDeck();
    return this;
  }

  deleteUnit(unit) {
    this.Cards.splice(this.Cards.indexOf(unit), 1);
    this.encodeDeck();
    return this;
  }
}
export default DeckAssembly;
