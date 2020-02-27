import _ from "lodash";
import pako from "pako";
import DB1 from "../Database1.json";
import DB2 from "../DB2.json";
import firebase from "../js/Firestore";

export function UpdateDatabase(x) {
  if (x === 1) {
    var zip1 = pako.deflate(JSON.stringify(DB1), { to: "string" });
    firebase
      .firestore()
      .collection("zip")
      .doc("SD1")
      .set({ zip1 })
      .catch(function(error) {
        console.error("Set error: ", error);
      })
      .then(() => {
        console.log("SD1 update");
      });
  } else {
    console.log("wait for compile");
    var d = pako.deflate(JSON.stringify(fDBDecks(DB2)), { to: "string" });
    var u = pako.deflate(JSON.stringify(fDBUnits(DB2)), { to: "string" });
    var a = pako.deflate(JSON.stringify(fDBAmmo(DB2)), { to: "string" });
    firebase
      .firestore()
      .collection("zip")
      .doc("SD2")
      .set({ d })
      .catch(function(error) {
        console.error("Set error: ", error);
      })
      .then(() => {
        console.log("SD2 update-decks");
      });
    firebase
      .firestore()
      .collection("zip")
      .doc("SD2u")
      .set({ u })
      .catch(function(error) {
        console.error("Set error: ", error);
      })
      .then(() => {
        console.log("SD2 update-units");
      });
    firebase
      .firestore()
      .collection("zip")
      .doc("SD2a")
      .set({ a })
      .catch(function(error) {
        console.error("Set error: ", error);
      })
      .then(() => {
        console.log("SD2 update-ammo");
      });
  }
}

export function fDBDecks(DB) {
  /*format db for decbuilder*/
  //returns decks, with units and ammo folded in
  let Decks = [];
  DB.Decks.forEach(d => {
    Decks.push(_.cloneDeep(d));
  });
  Decks.forEach(d =>
    d.Units.forEach(u => {
      u.Key = _.cloneDeep(DB.fUnits.find(x => x.UnitDescriptor === u.Key));
      if (u.Key.Weapons) {
        u.Key.Weapons.Turrets.forEach(t => {
          t.Weapons.forEach(w => {
            w.Ammunition = _.cloneDeep(
              DB.fAmmo.find(x => x.AmmoDescriptor === w.Ammunition)
            );
          });
        });
      }
    })
  );
  Decks.forEach(d =>
    d.Transports.forEach(u => {
      u.Key = _.cloneDeep(DB.fUnits.find(x => x.UnitDescriptor === u.Key));
      if (u.Key.Weapons) {
        u.Key.Weapons.Turrets.forEach(t => {
          t.Weapons.forEach(w => {
            w.Ammunition = _.cloneDeep(
              DB.fAmmo.find(x => x.AmmoDescriptor === w.Ammunition)
            );
          });
        });
      }
    })
  );
  return Decks;
}

export function fDBUnits(DB) {
  /*format db for unitdb*/
  //returns units, with ammo folded in and deck callbacks
  let Units = [];
  DB.fUnits.forEach(d => {
    Units.push(_.cloneDeep(d));
  });
  Units.forEach(u => {
    if (u.Weapons) {
      u.Weapons.Turrets.forEach(t => {
        t.Weapons.forEach(w => {
          w.Ammunition = _.cloneDeep(
            DB.fAmmo.find(x => x.AmmoDescriptor === w.Ammunition)
          );
        });
      });
    }
    /*callbacks*/
    u.Decks = [];
    DB.Decks.forEach(d => {
      let ind = d.Units.findIndex(e => e.Key === u.UnitDescriptor);
      if (ind !== -1) {
        u.Decks.push({
          Deck: d.Descriptor,
          Emblem: d.EmblemTexture,
          Rule: _.cloneDeep(d.Units[ind]).Value
        });
      }
      ind = d.Transports.findIndex(e => e.Key === u.UnitDescriptor);
      if (ind !== -1) {
        u.Decks.push({
          Deck: d.Descriptor,
          Emblem: d.EmblemTexture,
          Rule: _.cloneDeep(d.Units[ind]).Value
        });
      }
    });
  });
  return Units;
}

export function fDBAmmo(DB) {
  let Ammo = [];
  DB.fAmmo.forEach(a => {
    Ammo.push(_.cloneDeep(a));
  });
  /*callbacks*/
  Ammo.forEach(a => {
    a.Units = [];
    DB.fUnits.forEach(u => {
      if (u.Weapons) {
        u.Weapons.Turrets.forEach(t => {
          t.Weapons.forEach(w => {
            if (w.Ammunition === a.AmmoDescriptor) {
              a.Units.push(u.UnitDescriptor);
            }
          });
        });
      }
    });
  });
  return Ammo;
}
