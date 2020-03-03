import DeckAssembly from "../js/Deck";

export default class uploadObj {
  constructor(user) {
    this.deck = new DeckAssembly();
    this.title = "Title";
    this.desc = "Description";
    this.code = null;
    this.user = user;
    this.divEm = null;
    this.div = null;
    this.Side = null;
    this.Income = null;
    this.Rating = null;
    this.timestamp = null;
  }

  importDeck(DB, code, id) {
    this.deck.loadFromCode(code, DB);
    this.title = "";
    this.desc = "";
    this.code = code;
    this.user = id;
    this.divEm = this.deck.EmblemTexture;
    this.div = this.deck.DivisonName;
    this.Side = this.deck.Side;
    switch (this.deck.Income) {
      case 0:
        this.Income = "Balanced";
        break;
      case 1:
        this.Income = "Vanguard";
        break;
      case 2:
        this.Income = "Maverick";
        break;
      case 3:
        this.Income = "Juggernaut";
        break;

      default:
        break;
    }
    this.Rating = this.deck.Rating;
    return this;
  }

  load(DB, obj, id) {
    this.importDeck(DB, obj.code, id);
    this.title = obj.title;
    this.desc = obj.desc;
    this.timestamp = obj.timestamp;
    return this;
  }
}
