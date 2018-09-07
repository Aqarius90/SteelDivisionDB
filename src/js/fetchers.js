export default function fetchUnit(x, DB) {
  if (x === null) {
    return null;
  }
  let unit = DB.Units.filter(function(u) {
    return u.UnitDescriptor === x;
  })[0];
  //if not already parsed
  if (unit.Offmap != null && unit.Offmap.WeaponsDescriptor == null) {
    unit.Offmap = fetchWeapons(unit.Offmap, DB);
  }
  if (
    unit.WeaponsDescriptor != null &&
    unit.WeaponsDescriptor.WeaponsDescriptor == null
  ) {
    unit.WeaponsDescriptor = fetchWeapons(unit.WeaponsDescriptor, DB);
  }
  return unit;
}

function fetchWeapons(x, DB) {
  if (x === null) {
    return null;
  }
  let guns = DB.Weapons.filter(function(u) {
    return u.WeaponsDescriptor === x;
  })[0];
  for (let i = 0; i < guns.Turrets.length; i++) {
    for (let j = 0; j < guns.Turrets[i].WeaponList.length; j++) {
      if (guns.Turrets[i].WeaponList[j].Ammunition.AmmoDescriptor == null) {
        guns.Turrets[i].WeaponList[j].Ammunition = fetchAmmo(
          guns.Turrets[i].WeaponList[j].Ammunition,
          DB
        );
      }
    }
  }
  return guns;
}

function fetchAmmo(x, DB) {
  if (x === null) {
    return null;
  }
  return DB.Ammo.filter(function(u) {
    return u.AmmoDescriptor === x;
  })[0];
}
