import DeckAssembly from "./DeckAssembly";

export function setDeck(deck) {
  //sets the division. for full deck, use "decode"
  //check if the division data is loaded yet
  let dataarray = this.state.DB;
  let index = dataarray.findIndex(e => e.Descriptor === deck.Descriptor);
  if (index === -1) {
    console.error("no such deck descriptor");
  } else {
    if (typeof dataarray[index].MaxActivationPoints !== "undefined") {
      //the division is already loaded
      let deckbuilder = this.state.DeckBuilder;

      let newDeck = deckbuilder.Deck.setDeck(dataarray[index]);
      let newCode = deckbuilder.Deck.ExportCode;
      deckbuilder.DBUnits = sortByCategory(dataarray[index].PackList);
      deckbuilder.DeckUnits = sortByCategoryForDisplay(newDeck);
      deckbuilder.Deck = newDeck;
      this.setState({ DeckBuilder: deckbuilder, code: newCode });
    } else {
      this.setState({ isLoading: true });
      this.state.Firebase.doc(deck.Descriptor)
        .get()
        .then(queryDocumentSnapshot => {
          dataarray[index] = queryDocumentSnapshot.data(); //load actual deck

          let deckbuilder = this.state.DeckBuilder;
          let newDeck = deckbuilder.Deck.setDeck(dataarray[index]);
          let newCode = deckbuilder.Deck.ExportCode;

          deckbuilder.DBUnits = sortByCategory(dataarray[index].PackList);
          deckbuilder.DeckUnits = sortByCategoryForDisplay(newDeck);
          deckbuilder.Deck = newDeck;

          this.setState({
            isLoading: false,
            DeckBuilder: deckbuilder,
            code: newCode,
            DB: dataarray
          });
        });
    }
  }
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

export function addUnit(x) {
  let state = this.state.DeckBuilder;
  let newDeck = state.Deck;
  if (newDeck.PackList.filter(e => e === x).length > 0) {
    newDeck = newDeck.addUnit(x);
    let newCode = newDeck.ExportCode;
    state.DeckUnits = sortByCategoryForDisplay(newDeck);
    state.Deck = newDeck;
    this.setState({ DeckBuilder: state, code: newCode });
  }
}
export function deleteUnit(x) {
  let state = this.state.DeckBuilder;
  let newDeck = state.Deck.deleteUnit(x);
  let newCode = newDeck.ExportCode;
  state.DeckUnits = sortByCategoryForDisplay(newDeck);
  state.Deck = newDeck;
  this.setState({ DeckBuilder: state, code: newCode });
}

export function showUnit(x) {
  let newstr = this.state.DeckBuilder.UnitsToDisplay;
  if (newstr.filter(e => e.EncodeInt === x.EncodeInt).length === 0) {
    newstr.push(x);
    let state = this.state.DeckBuilder;
    state.UnitsToDisplay = newstr;
    this.setState({ DeckBuilder: state });
  }
}

export function hideUnit(x) {
  let newstr = this.state.DeckBuilder.UnitsToDisplay;
  newstr.splice(newstr.indexOf(x), 1);
  let state = this.state.DeckBuilder;
  state.UnitsToDisplay = newstr;
  this.setState({ DeckBuilder: state });
}

export function sortBy(u, x) {
  console.log("sortby"); //debug, to check if it's even called
  let state = this.state.DeckBuilder;
  let newArray = state.DBUnits;
  if (u === 0) {
    for (let i = 0; i < newArray.length; i++) {
      newArray[i].sort(function(a, b) {
        return a[x] > b[x] ? 1 : b[x] > a[x] ? -1 : 0;
      });
    }
  } else if (u === 1) {
    for (let i = 0; i < newArray.length; i++) {
      newArray[i].sort(function(a, b) {
        return a.Unit[x] > b.Unit[x] ? 1 : b.Unit[x] > a.Unit[x] ? -1 : 0;
      });
    }
  } else if (u === 2) {
    for (let i = 0; i < newArray.length; i++) {
      newArray[i].sort(function(a, b) {
        if (a.TransportUnit === null) return 0;
        if (b.TransportUnit === null) return 1;
        return a.TransportUnit[x] > b.TransportUnit[x]
          ? 1
          : b.TransportUnit[x] > a.TransportUnit[x]
          ? -1
          : 0;
      });
    }
  }
  state.DBUnits = newArray;
  this.setState({ DeckBuilder: state });
}

export function setDeckCode(x) {
  this.setState({ code: x });
}

export function parseDeckCode(x) {
  let deckbuilder = this.state.DeckBuilder;
  let newDeck = new DeckAssembly();
  let dataarray = this.state.DB;

  //check if deck loaded into DB
  let deckID = newDeck.getEncodeID(x);
  let index = dataarray.findIndex(e => e.EncodeInt === deckID);

  if (index === -1) {
    console.error("no such deck");
  } else {
    if (typeof dataarray[index].MaxActivationPoints !== "undefined") {
      newDeck = newDeck.decodeDeck(x, this.state.DB);
      let newCode = newDeck.ExportCode;
      deckbuilder.DBUnits = sortByCategory(newDeck.PackList);
      deckbuilder.DeckUnits = sortByCategoryForDisplay(newDeck);
      deckbuilder.Deck = newDeck;

      this.setState({
        DeckBuilder: deckbuilder,
        code: newCode
      });
    } else {
      this.setState({ isLoading: true });

      this.state.Firebase.doc(dataarray[index].Descriptor)
        .get()
        .then(queryDocumentSnapshot => {
          dataarray[index] = queryDocumentSnapshot.data();

          newDeck = newDeck.decodeDeck(x, this.state.DB);
          let newCode = newDeck.ExportCode;
          deckbuilder.DBUnits = sortByCategory(newDeck.PackList);
          deckbuilder.DeckUnits = sortByCategoryForDisplay(newDeck);
          deckbuilder.Deck = newDeck;

          this.setState({
            DB: dataarray,
            DeckBuilder: deckbuilder,
            isLoading: false,
            code: newCode
          });
        });
    }
  }
}

export function isValid(x) {
  if (
    this.state.DeckBuilder.Deck.PackList.filter(
      e => e.Descriptor === x.Descriptor
    ).length > 0 &&
    this.state.DeckBuilder.Deck.Cards.filter(e => e.Descriptor === x.Descriptor)
      .length <= x.PackAvailabilty
  ) {
    return true;
  }
  return false;
}

export function getUsedCount(x) {
  return this.state.DeckBuilder.Deck.Cards.filter(
    e => e.Descriptor === x.Descriptor
  ).length;
}

export function toggleRandomizer(x) {
  let newState = this.state.DB.filter(
    e => e.Descriptor.indexOf("SCENARIO") === -1
  ); //remove scenario decks

  if (x === "Allied" || x === "Axis") {
    newState = newState.filter(e => e.DivisionNationalite === x);
  } else {
    newState = this.state.DeckBuilder.RandomizerDecks;
    if (newState.filter(e => e === x).length > 0) {
      newState.splice(newState.indexOf(x), 1);
    } else {
      newState.push(x);
    }
  }
  let deckb = this.state.DeckBuilder;
  deckb.RandomizerDecks = newState;
  this.setState({ DeckBuilder: deckb });
}
