export function replayFilter(x) {
  let ReplayDB = this.state.ReplayDB;
  ReplayDB.sortby = x;
  this.setState({ ReplayDB: ReplayDB });
  this.loadReplays(x);
}
export function replayVote(x) {
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
  this.props.Honey.Firebase.collection("SubmittedReplays")
    .doc(x.ID)
    .update({ Score: x.Score, ScoreCount: x.ScoreCount });
  //triggers another data load. should circumvent, maybe
  this.loadReplays(this.state.ReplayDB.sortby);
}
export function replayGet(x) {
  console.log("replayGet");
  let Arr = [];
  for (let i = 0; i < x.Players.length; i++) {
    Arr.push({}); //array init
    Arr[i].Player = x.Players[i];
    Arr[i].Deck = x.Decks[i];
  }

  let ReplayDB = this.state.ReplayDB;
  ReplayDB.Replay = x;
  ReplayDB.ReplayDecks = Arr;
  this.setState({ ReplayDB: ReplayDB });
}
export function ReplayDeckSet(x) {
  this.parseDeckCode(x);
}
export function replayDelete(x) {
  this.props.Honey.Firebase.collection("SubmittedReplays")
    .doc(x.ID)
    .delete()
    .then(() => {
      this.props.Honey.Storage.child(x.ID + "/" + x.gameID + ".rpl")
        .delete()
        .then(() => {
          console.log("file deleted");
          this.loadDecks(this.props.Honey.ReplayDB.sortby);
        })
        .catch(function(error) {
          console.error("Error removing document: ", error);
        });
    })
    .catch(function(error) {
      console.error("Error removing document: ", error);
    });
}
export function replayShowUpload() {
  this.uploadDialog.show();
}
export function replayUpload(r, f) {
  if (this.props.Honey.User !== null) {
    if (r === null || f === null) {
      return;
    } else {
      //set loading text
      let replay = this.state.ReplayDB;
      replay.IsUploading = true;
      this.setState({ ReplayDB: replay });

      //replay DB entry
      r.UID = this.props.Honey.User.uid;
      r.Score = [this.props.Honey.User.uid];
      r.ScoreCount = 1;

      let metadata = { type: "SD1" };
      let filename = r.gameID + ".rpl3";
      let replaysRef = this.props.Honey.Firebase.collection("SubmittedReplays");
      //upload
      replaysRef
        .add(r)
        .then(docRef => {
          //document path is DB ID/UUID
          let ID = docRef.id;
          this.props.Honey.Storage.child(ID + "/" + filename)
            .put(f, metadata)
            .then(snapshot =>
              snapshot.ref
                .getDownloadURL()
                .then(url => {
                  //set DL URL to DB
                  replaysRef.doc(ID).update({ DL: url });

                  this.loadReplays(this.state.ReplayDB.sortby);

                  let replay = this.state.ReplayDB;
                  replay.IsUploading = true;
                  this.setState({ ReplayDB: replay });
                  this.uploadDialog.hide();
                })
                .catch(function(error) {
                  this.props.Honey.ErrorOut();
                  console.error("URL error: ", error);
                })
            )
            .catch(function(error) {
              this.uploadDialog.hide();
              this.props.Honey.ErrorOut();
              console.error("Error adding replay: ", error);
            });
        })
        .catch(function(error) {
          this.props.Honey.ErrorOut();
          console.error("Error adding document: ", error);
        });
    }
  } else {
    this.uploadDialog.hide();
    this.props.Honey.PleaseLogIn();
  }
}

export function loadReplays(x) {
  if (this.state.ReplayDB.sortBy === null) {
    return;
  }
  let ReplayList = [];
  //TODO pagination
  let ref = null;
  if (x === "new") {
    ref = this.props.Honey.Firebase.collection("SubmittedReplays").orderBy(
      "Uploaded",
      "desc"
    );
    //.limit(15);
  } else if (x === "score") {
    ref = this.props.Honey.Firebase.collection("SubmittedReplays").orderBy(
      "ScoreCount",
      "desc"
    );
    //.limit(15);
  }
  ref
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        ReplayList.push(doc.data());
        ReplayList[ReplayList.length - 1].ID = doc.id;
      });
      let ReplayDB = this.state.ReplayDB;
      ReplayDB.ReplayList = ReplayList;
      this.setState({ ReplayDB: ReplayDB });
    })
    .catch(function(error) {
      console.error("Get error: ", error);
    });
}
