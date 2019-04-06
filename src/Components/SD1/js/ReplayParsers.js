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
      emblem = "3rd_Infantry_Division";
      break;
    case 74:
      emblem = "2DB";
      break;
    case 23:
      emblem = "2DB";
      break;
    case 75:
      emblem = "116_Panzer";
      break;
    case 24:
      emblem = "116_Panzer";
      break;
    case 25:
      emblem = "12_SS_Panzer";
      break;
    case 26:
      emblem = "17_SS_Panzergrenadier";
      break;
    case 180:
      emblem = "SS_Panzerdivision_LSSAH";
      break;
    case 76:
      emblem = "21_Panzer";
      break;
    case 27:
      emblem = "21_Panzer";
      break;
    case 28:
      emblem = "352_Infanterie";
      break;
    case 66:
      emblem = "352_Infanterie";
      break;
    case 77:
      emblem = "3_Fallschirmjager";
      break;
    case 29:
      emblem = "3_Fallschirmjager";
      break;
    case 30:
      emblem = "716_Infanterie";
      break;
    case 31:
      emblem = "Luftlanfe";
      break;
    case 32:
      emblem = "Panzer_Lehr";
      break;
    case 33:
      emblem = "Dywizja_Pancerna";
      break;
    case 34:
      emblem = "15th_Infantry_Division";
      break;
    case 35:
      emblem = "6th_Airborne_Division";
      break;
    case 36:
      emblem = "Guards_Armoured_Division";
      break;
    case 70:
      emblem = "101st_Airborne";
      break;
    case 37:
      emblem = "101st_Airborne";
      break;
    case 179:
      emblem = "1st_US_Infantry_Division";
      break;
    case 78:
      emblem = "2nd_Infantry_Division";
      break;
    case 38:
      emblem = "2nd_Infantry_Division";
      break;
    case 71:
      emblem = "3rd_Armored_Division";
      break;
    case 39:
      emblem = "3rd_Armored_Division";
      break;
    case 45:
      emblem = "16_luftwaffen";
      break;
    case 73:
      emblem = "16_luftwaffen";
      break;
    case 80:
      emblem = "9_Panzer";
      break;
    case 46:
      emblem = "9_Panzer";
      break;
    case 81:
      emblem = "Commando_Brigade";
      break;
    case 43:
      emblem = "Commando_Brigade";
      break;
    case 79:
      emblem = "4th_Armored";
      break;
    case 51:
      emblem = "4th_Armored";
      break;
    case 47:
      emblem = "Demi_Brigade_SAS";
      break;
    case 48:
      emblem = "2_Panzer";
      break;
    case 49:
      emblem = "Festung_Gross_Paris";
      break;
    case 50:
      emblem = "7th_Armoured";
      break;

    default:
      break;
  }
  return "img/d/" + emblem + ".tgv.png";
}
