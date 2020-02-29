import _ from "lodash";
import pako from "pako";
import DB1 from "../DB1.json";
import DB2 from "../DB2.json";
import firebase from "../js/Firestore";

export function UpdateDatabase(x) {
  if (x) {
    console.log("wait for compile");
    var d = pako.deflate(JSON.stringify(fDB1Decks(DB1)), { to: "string" });
    var u = pako.deflate(JSON.stringify(fDB1Units(DB1)), { to: "string" });
    var a = pako.deflate(JSON.stringify(fDB1Ammo(DB1)), { to: "string" });
    firebase
      .firestore()
      .collection("zip")
      .doc("SD1")
      .set({ d })
      .catch(function(error) {
        console.error("Set error: ", error);
      })
      .then(() => {
        console.log("SD1 update-decks");
      });
    firebase
      .firestore()
      .collection("zip")
      .doc("SD1u")
      .set({ u })
      .catch(function(error) {
        console.error("Set error: ", error);
      })
      .then(() => {
        console.log("SD1 update-units");
      });
    firebase
      .firestore()
      .collection("zip")
      .doc("SD1a")
      .set({ a })
      .catch(function(error) {
        console.error("Set error: ", error);
      })
      .then(() => {
        console.log("SD1 update-ammo");
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

function fDBDecks(DB) {
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

function fDBUnits(DB) {
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

function fDBAmmo(DB) {
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

function fDB1Decks(DB) {
  let Decks = [];
  DB.Decks.forEach(d => {
    Decks.push(_.cloneDeep(d));
    //Decks.push(d);
  });
  Decks.forEach(d => {
    d.PackList.forEach(u => {
      u.Unit = _.cloneDeep(DB.Units.find(x => x.UnitDescriptor === u.Unit));
      //u.Unit = DB.Units.find(x => x.UnitDescriptor === u.Unit);
      if (u.Unit.WeaponsDescriptor) {
        u.Unit.WeaponsDescriptor = _.cloneDeep(
          DB.Weapons.find(x => x.WeaponsDescriptor === u.Unit.WeaponsDescriptor)
        );
      }
      if (u.Unit.Offmap) {
        u.Unit.Offmap = _.cloneDeep(
          DB.Weapons.find(x => x.WeaponsDescriptor === u.Unit.Offmap)
        );
      }
      if (u.TransportUnit) {
        u.TransportUnit = _.cloneDeep(
          DB.Units.find(x => x.UnitDescriptor === u.TransportUnit)
        );
        if (u.TransportUnit.WeaponsDescriptor) {
          u.TransportUnit.WeaponsDescriptor = _.cloneDeep(
            DB.Weapons.find(
              x => x.WeaponsDescriptor === u.TransportUnit.WeaponsDescriptor
            )
          );
        }
        if (u.TransportUnit.Offmap) {
          u.TransportUnit.Offmap = _.cloneDeep(
            DB.Weapons.find(x => x.WeaponsDescriptor === u.TransportUnit.Offmap)
          );
        }
      }
    });
  });
  return { Decks: Decks, Ammo: DB.Ammo };
}

function fDB1Units(DB) {
  let Units = [];
  DB.Units.forEach(d => {
    Units.push(_.cloneDeep(d));
  });
  Units.forEach(u => {
    if (u.WeaponsDescriptor) {
      u.WeaponsDescriptor = _.cloneDeep(
        DB.Weapons.find(x => x.WeaponsDescriptor === u.WeaponsDescriptor)
      );
      u.WeaponsDescriptor.Turrets.forEach(t => {
        t.WeaponList.forEach(w => {
          w.Ammunition = _.cloneDeep(
            DB.Ammo.find(x => x.AmmoDescriptor === w.Ammunition)
          );
        });
      });
    }
    if (u.Offmap) {
      u.Offmap = _.cloneDeep(
        DB.Weapons.find(x => x.WeaponsDescriptor === u.Offmap)
      );
      u.Offmap.Turrets.forEach(t => {
        t.WeaponList.forEach(w => {
          w.Ammunition = _.cloneDeep(
            DB.Ammo.find(x => x.AmmoDescriptor === w.Ammunition)
          );
        });
      });
    }
    /*callbacks*/
    u.Decks = [];
    DB.Decks.forEach(d => {
      let found = d.PackList.filter(e => e.Unit === u.UnitDescriptor);
      found.forEach(e => {
        u.Decks.push({
          Deck: d.Descriptor,
          Emblem: d.EmblemTexture,
          Rule: _.cloneDeep(e)
        });
      });
      found = d.PackList.filter(e => e.TransportUnit === u.UnitDescriptor);
      found.forEach(e => {
        u.Decks.push({
          Deck: d.Descriptor,
          Emblem: d.EmblemTexture,
          Rule: _.cloneDeep(e)
        });
      });
    });
  });
  return Units;
}

function fDB1Ammo(DB, u) {
  let Ammo = [];
  DB.Ammo.forEach(a => {
    Ammo.push(_.cloneDeep(a));
  });
  /*callbacks*/
  Ammo.forEach(a => {
    a.Units = [];
    DB.Weapons.forEach(w => {
      w.Turrets.forEach(t => {
        t.WeaponList.forEach(wp => {
          if (wp.Ammunition == a.AmmoDescriptor) {
            let x = DB.Units.find(
              e =>
                e.WeaponsDescriptor === w.WeaponsDescriptor ||
                e.Offmap === w.WeaponsDescriptor
            );
            if (x) {
              a.Units.push(x.UnitDescriptor);
            } else {
            }
          }
        });
      });
    });
  });
  console.log(Ammo);
  return Ammo;
}
