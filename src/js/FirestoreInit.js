import fetchUnit from "./fetchers";

function FirestoreInit(dict, db) {
  let localDB = dict;
  console.log("start db refactor");
  //create basic deck info, for initial load
  let DeckList = [];
  localDB.Decks.forEach(deck => {
    DeckList.push({
      Descriptor: deck.Descriptor,
      DivisionNationalite: deck.DivisionNationalite,
      DivisionTags: deck.DivisionTags,
      EmblemTexture: deck.EmblemTexture,
      EncodeInt: deck.EncodeInt
    });
  });

  //aggregate deck&unit&guns&ammo info into single file (firestore charges /by document read/)
  localDB.Decks.forEach(deck => {
    deck.PackList.forEach(pack => {
      pack.Unit = fetchUnit(pack.Unit, localDB);
      pack.TransportUnit = fetchUnit(pack.TransportUnit, localDB);
    });
  });

  //remove nested arrays (firebase limitation)
  localDB.Decks.forEach(deck => {
    deck.CostMatrix = {
      0: deck.CostMatrix[0],
      1: deck.CostMatrix[1],
      2: deck.CostMatrix[2],
      3: deck.CostMatrix[3],
      4: deck.CostMatrix[4],
      5: deck.CostMatrix[5],
      6: deck.CostMatrix[6],
      7: deck.CostMatrix[7]
    };
    /*
    deck.PackList.forEach(pack => {
      //a particular unit may be called multiple times, in multiple packs
      //the typeof detects if the conversion has already been made
      if (pack.Unit !== null && typeof pack.Unit.TagSet !== "string") {
        pack.Unit.TagSet = pack.Unit.TagSet.join(",");
      }
      if (
        pack.TransportUnit !== null &&
        typeof pack.TransportUnit.TagSet !== "string"
      ) {
        pack.TransportUnit.TagSet = pack.TransportUnit.TagSet.join(",");
      }
    });*/
  });

  //upload deck list, and individual decks

  send(localDB.Decks, db);
  sendList(localDB.Decks, db);
  //firestore splits arrays into individual documents
  /*db.collection("Decks")
    .doc("DeckList")
    .set({ DeckList: DeckList });*/
}

async function send(array, ref) {
  for (const x of array) {
    //multiple writes interrupt eachother.
    console.log(x);
    await ref
      .doc(x.Descriptor)
      .set(x)
      .catch(function(error) {
        console.error("Get error: ", error);
      });
    console.log("done");
  }
  console.log("Done!");
}

function sendList(decks, db) {
  let decklist = [];
  for (const x of decks) {
    decklist.push({
      Descriptor: x.Descriptor,
      DivisionNationalite: x.DivisionNationalite,
      DivisionTags: x.DivisionTags,
      EmblemTexture: x.EmblemTexture,
      EncodeInt: x.EncodeInt
    });
  }
  console.log(decklist);
  db.doc("DeckList")
    .set({ decklist })
    .catch(function(error) {
      console.error("Get error: ", error);
    });
  console.log("Done!");
}

export default FirestoreInit;
