class UploadableDeck {
  constructor(data) {
    super();
    this.Description = data.Description;
    this.Description = data.Description;
    this.Division = data.Division;
    this.Uploaded = data.Uploaded;
    this.Name = data.Name;
    this.Score = data.Score;
    this.Side = data.Side;
    this.UID = data.UID; //author UID
    this.by = data.by;
    this.code = data.code;
  }
  Description = "";
  Division = "";
  Uploaded = "";
  Name = "";
  Score = "";
  Side = "";
  UID = ""; //author UID
  by = "";
  code = "";
}
