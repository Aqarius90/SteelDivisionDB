import DeckAssembly from "./DeckAssembly";

export function deckListFilter(x) {
  let deckdb = this.state.DeckDB;
  deckdb.sortby = x;
  this.setState({ DeckDB: deckdb });
  this.loadDecks(x);
}
export function deckListVote(x) {
  if (this.props.Honey.User === null) {
    return;
  }
  if (x.Score.includes(this.props.Honey.User.uid)) {
    var index = x.Score.indexOf(this.props.Honey.User.uid);
    if (index > -1) {
      x.Score.splice(index, 1);
    }
    x.ScoreCount--;
  } else {
    x.Score.push(this.props.Honey.User.uid);
    x.ScoreCount++;
  }
  this.props.Honey.Firebase.collection("SubmittedDecks")
    .doc(x.ID)
    .update({ Score: x.Score, ScoreCount: x.ScoreCount });
  //triggers another data load. should circumvent, maybe
  this.loadDecks(this.state.DeckDB.sortby);
}
export function deckListGet(x) {
  let newDeckCode;
  if (x === null) {
    //an empty arg is functionally a "pull from deck builder"
    newDeckCode = this.state.code;
    //set blank object, to fill later
    x = {
      Name: "untitled",
      Division: this.state.DeckBuilder.Deck.Emblem,
      Description: "",
      Side: this.state.DeckBuilder.Deck.DivisionNationalite,
      Author: "", //if not logged in, will be added before upload
      UID: "",
      Score: [],
      ScoreCount: 0,
      code: this.state.DeckBuilder.Deck.ExportCode
    };
  } else {
    newDeckCode = x.code;
  }

  //deck decoding
  let deckdb = this.state.DeckDB;
  let newDeck = new DeckAssembly();
  let dataarray = this.state.DB;

  //check if deck loaded into DB
  let deckID = newDeck.getEncodeID(newDeckCode);
  let index = dataarray.findIndex(e => e.EncodeInt === deckID);

  if (index === -1) {
    console.error("no such deck");
  } else {
    if (typeof dataarray[index].MaxActivationPoints !== "undefined") {
      newDeck.decodeDeck(newDeckCode, this.state.DB);
      let newCode = newDeck.ExportCode;
      deckdb.SelectedDeck = newDeck;
      deckdb.SelectedDeckCode = newCode;
      deckdb.SelectedDeckObject = x;
      deckdb.DeckUnits = sortByCategoryForDisplay(newDeck);
      this.setState({ DeckDB: deckdb });
    } else {
      this.setState({ isLoading: true });
      this.state.Firebase.doc(dataarray[index].Descriptor)
        .get()
        .then(queryDocumentSnapshot => {
          dataarray[index] = queryDocumentSnapshot.data();
          newDeck.decodeDeck(newDeckCode, this.state.DB);
          let newCode = newDeck.ExportCode;
          deckdb.SelectedDeck = newDeck;
          deckdb.SelectedDeckCode = newCode;
          deckdb.SelectedDeckObject = x;
          deckdb.DeckUnits = sortByCategoryForDisplay(newDeck);
          this.setState({
            DB: dataarray,
            DeckDB: deckdb,
            isLoading: false
          });
        });
    }
  }
}
export function deckListSet() {
  this.parseDeckCode(this.state.DeckDB.SelectedDeckCode);
}
export function deckListEdit(x) {
  let deckdb = this.state.DeckDB;
  deckdb.SelectedDeckObject.Name = x.Name;
  deckdb.SelectedDeckObject.Description = x.Description;
  this.setState({ DeckDB: deckdb });
}
export function deckListDelete(x) {
  this.props.Honey.Firebase.collection("SubmittedDecks")
    .doc(x.ID)
    .delete()
    .then(() => {
      this.loadDecks(this.state.DeckDB.sortby);
    })
    .catch(function(error) {
      console.error("Error removing document: ", error);
    });
}
export function deckListUpload(x) {
  if (this.props.Honey.User !== null) {
    let newDeck = {
      Name: x.Name,
      Description: x.Description,
      Division: this.state.DeckDB.SelectedDeck.Emblem,
      Score: [this.props.Honey.User.uid],
      ScoreCount: 1,
      Side: this.state.DeckDB.SelectedDeck.DivisionNationalite,
      UID: this.props.Honey.User.uid,
      by: x.Author,
      code: this.state.DeckDB.SelectedDeckCode
    };
    this.props.Honey.Firebase.collection("SubmittedDecks")
      .add(newDeck)
      .then(() => {
        this.loadDecks(this.state.DeckDB.sortby);
      })
      .catch(function(error) {
        console.error("Error removing document: ", error);
      });
  } else {
    this.props.Honey.PleaseLogIn();
  }
}

export function loadDecks(x) {
  if (this.state.DeckDB.sortBy === null) {
    return;
  }
  let DeckList = [];
  //TODO pagination
  let ref = null;
  if (x === "new") {
    ref = this.props.Honey.Firebase.collection("SubmittedDecks").orderBy(
      "Uploaded",
      "desc"
    );
    //.limit(15);
  } else if (x === "score") {
    ref = this.props.Honey.Firebase.collection("SubmittedDecks").orderBy(
      "ScoreCount",
      "desc"
    );
    //.limit(15);
  }
  ref
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        DeckList.push(doc.data());
        DeckList[DeckList.length - 1].ID = doc.id;
      });
      let deckdb = this.state.DeckDB;
      deckdb.FullDeckList = DeckList;
      deckdb.DeckList = DeckList;
      this.setState({ DeckDB: deckdb });
    })
    .catch(function(error) {
      console.error("Get error: ", error);
    });
}

function sortByCategoryForDisplay(deck) {
  let x = sortByCategory(deck.Cards);
  for (let i = 0; i < 8; i++) {
    // interpolate with CostMatrix for display
    while (x[i].length < 10 && deck.CostMatrix[i].length >= x[i].length) {
      x[i].push(deck.CostMatrix[i][x[i].length]);
    }
  }
  return x;
}

function sortByCategory(units) {
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
        console.error("UnitParseError: " + units[i].Factory);
      }
    }
  }
  return x; //returns nested array of units, by category
}
