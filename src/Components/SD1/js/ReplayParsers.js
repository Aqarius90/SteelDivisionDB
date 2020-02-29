import DeckAssembly from "../js/DeckAssembly";

export function parseGameMode(x) {
  switch (x) {
    case "1":
      return "Skirmish";
    case "3":
      return "Historical";
    default:
      return "unknown";
  }
}

export function parseVictoryCond(x) {
  switch (x) {
    case "1":
      return "Destruction";
    case "2":
      return "Siege";
    case "3":
      return "Economy";
    case "4":
      return "Conquest";
    case "5":
      return "Close Combat";
    default:
      return "error";
  }
}

export function parseMap(x) {
  if (x.indexOf("Sainte_Mere_Eglise") !== -1) {
    if (x.indexOf("_Alt") !== -1) {
      //non-duelist is _alt or none
      return "Sainte Mere l'Eglise - Duelist";
    }
    return "Sainte Mere l'Eglise";
  } else if (x.indexOf("Carpiquet") !== -1) {
    if (x.indexOf("_Alt") !== -1) {
      return "Carpiquet - Duelist";
    }
    return "Carpiquet";
  } else if (x.indexOf("Pegasus_Bridge") !== -1) {
    return "Pegasus Bridge";
  } else if (x.indexOf("Omaha") !== -1) {
    return "Omaha";
  } else if (x.indexOf("Colombelles") !== -1) {
    return "Colombelles";
  } else if (x.indexOf("VillersBocage") !== -1) {
    return "Merderet";
  } else if (x.indexOf("Odon") !== -1) {
    return "Odon";
  } else if (x.indexOf("Colleville") !== -1) {
    return "Colleville";
  } else if (x.indexOf("Pointe_Du_Hoc") !== -1) {
    return "Pointe Du Hoc";
  } else if (x.indexOf("Mont_Ormel") !== -1) {
    return "Mont Ormel";
  } else if (x.indexOf("Bois_De_Limors") !== -1) {
    return "Bois De Limors";
  } else if (x.indexOf("Cheux") !== -1) {
    return "Cheux";
  } else if (x.indexOf("Caumont_L_Evente") !== -1) {
    return "Caumont L'Evente";
  } else if (x.indexOf("Cote112") !== -1) {
    return "Cote 112";
  } else if (x.indexOf("Pegaville") !== -1) {
    return "Odon River";
  } else if (x.indexOf("276b22a8:334ddc5e:a85391a2:4deed403") !== -1) {
    return "Rangers lead the way";
  } else if (x.indexOf("c3a20bf5:a1400442:eb590a8a:4953f79d") !== -1) {
    return "Collombelles Assault";
  } else return "unknown";
}

export function parseTimeLimit(x) {
  if (x === "0") {
    return "No limit";
  }
  return x / 60 + "min";
}

export function parseIncomeRate(x) {
  switch (x) {
    case "0":
      return "none";
    case "1":
      return "very low";
    case "2":
      return "low";
    case "3":
      return "medium";
    case "4":
      return "high";
    case "5":
      return "very high";
    default:
      return "error";
  }
}

export function parseGameType(x) {
  switch (x) {
    case "0":
      return "⍟/卐";
    case "1":
      return "⍟/⍟";
    case "2":
      return "卐/卐";
    default:
      return "unknown";
  }
}

export function parsePicture(x) {
  let foo = new DeckAssembly();
  let ID = foo.getEncodeID(x);
  let emblem = "";
  switch (ID) {
    case 22:
      emblem = "3rd_infantry_division";
      break;
    case 74:
      emblem = "2db";
      break;
    case 23:
      emblem = "2db";
      break;
    case 75:
      emblem = "116_panzer";
      break;
    case 24:
      emblem = "116_panzer";
      break;
    case 25:
      emblem = "12_ss_panzer";
      break;
    case 26:
      emblem = "17_ss_panzergrenadier";
      break;
    case 180:
      emblem = "ss_panzerdivision_lssah";
      break;
    case 76:
      emblem = "21_panzer";
      break;
    case 27:
      emblem = "21_panzer";
      break;
    case 28:
      emblem = "352_infanterie";
      break;
    case 66:
      emblem = "352_infanterie";
      break;
    case 77:
      emblem = "3_fallschirmjager";
      break;
    case 29:
      emblem = "3_fallschirmjager";
      break;
    case 30:
      emblem = "716_infanterie";
      break;
    case 31:
      emblem = "luftlanfe";
      break;
    case 32:
      emblem = "panzer_lehr";
      break;
    case 33:
      emblem = "dywizja_pancerna";
      break;
    case 34:
      emblem = "15th_infantry_division";
      break;
    case 35:
      emblem = "6th_airborne_division";
      break;
    case 36:
      emblem = "guards_armoured_division";
      break;
    case 70:
      emblem = "101st_airborne";
      break;
    case 37:
      emblem = "101st_airborne";
      break;
    case 179:
      emblem = "1st_us_infantry_division";
      break;
    case 78:
      emblem = "2nd_infantry_division";
      break;
    case 38:
      emblem = "2nd_infantry_division";
      break;
    case 71:
      emblem = "3rd_armored_division";
      break;
    case 39:
      emblem = "3rd_armored_division";
      break;
    case 45:
      emblem = "16_luftwaffen";
      break;
    case 73:
      emblem = "16_luftwaffen";
      break;
    case 80:
      emblem = "9_panzer";
      break;
    case 46:
      emblem = "9_panzer";
      break;
    case 81:
      emblem = "commando_brigade";
      break;
    case 43:
      emblem = "commando_brigade";
      break;
    case 79:
      emblem = "4th_armored";
      break;
    case 51:
      emblem = "4th_armored";
      break;
    case 47:
      emblem = "demi_brigade_sas";
      break;
    case 48:
      emblem = "2_panzer";
      break;
    case 49:
      emblem = "festung_gross_paris";
      break;
    case 50:
      emblem = "7th_armoured";
      break;

    default:
      break;
  }
  return "SteelDivisionDB/img/d/" + emblem + ".tgv.png";
}
