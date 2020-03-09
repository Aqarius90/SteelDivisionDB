import DeckAssembly from "../js/DeckAssembly";

export default class uploadObj {
  constructor(user) {
    this.deck = new DeckAssembly();
    this.title = "Title";
    this.desc = "Description";
    this.code = null;
    this.user = user;
    this.divEm = null;
    this.Side = null;
    this.timestamp = null;
  }

  importDeck(DB, code, id) {
    this.deck.decodeDeck(code, DB);
    this.title = "";
    this.desc = "";
    this.code = code;
    this.user = id;
    this.divEm = this.deck.Emblem;
    this.Side = this.deck.DivisionNationalite;
    return this;
  }

  load(DB, obj, id) {
    this.importDeck(DB, obj.code, id);
    this.title = obj.title;
    this.desc = obj.desc;
    this.timestamp = obj.timestamp;
    return this;
  }

  sortByCategory(units) {
    let x = [[], [], [], [], [], [], [], []];
    for (let i = 0; i < units.length; i++) {
      switch (units[i].Factory) {
        case "Reco":
          x[0].push(units[i]);
          break;
        case "Infanterie":
          x[1].push(units[i]);
          break;
        case "Tank":
          x[2].push(units[i]);
          break;
        case "Support":
          x[3].push(units[i]);
          break;
        case "AT":
          x[4].push(units[i]);
          break;
        case "DCA":
          x[5].push(units[i]);
          break;
        case "Art":
          x[6].push(units[i]);
          break;
        case "Air":
          x[7].push(units[i]);
          break;
        default: {
          global.throw("UnitParseError: " + units[i].Factory);
        }
      }
    }
    return x; //returns nested array of units, by category
  }

  sortByCategoryForDisplay = deck => {
    let x = this.sortByCategory(deck.Cards);
    for (let i = 0; i < 8; i++) {
      // interpolate with CostMatrix for display
      while (x[i].length < 10 && deck.CostMatrix[i].length >= x[i].length) {
        x[i].push(deck.CostMatrix[i][x[i].length]);
      }
    }
    return x;
  };

  isValid = x => {
    return (
      this.deck.PackList.some(e => e.Descriptor === x.Descriptor) &&
      this.deck.Cards.filter(e => e.Descriptor === x.Descriptor).length <=
        x.PackAvailabilty
    );
  };

  getUsedCount = x => {
    return this.deck.Cards.filter(e => e.Descriptor === x.Descriptor).length;
  };
}
