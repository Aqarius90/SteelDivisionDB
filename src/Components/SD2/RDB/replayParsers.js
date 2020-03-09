export let SD2Parsers = {};
SD2Parsers.getGameMode = function(x) {
  switch (x) {
    case "0":
      return "Meeting engagement";
    case "1":
      return "Closer Combat";
    case "2":
      return "Breakthrough";
    default:
      return "Unknown";
  }
};
SD2Parsers.getGameType = function(x) {
  switch (x) {
    case "0":
      return "⍟/卐";
    case "1":
      return "⍟/⍟";
    case "2":
      return "卐/卐";
    default:
      return "Unknown";
  }
};
SD2Parsers.getTimeLimit = function(x) {
  if (x === "0") {
    return "No limit";
  }
  return x / 60 + "min";
};
SD2Parsers.getIncomeRate = function(x) {
  switch (x) {
    case "0":
      return "No income";
    case "1":
      return "Very low";
    case "2":
      return "Low";
    case "3":
      return "Normal";
    case "4":
      return "High";
    case "5":
      return "Very high";
    default:
      return "Unknown";
  }
};
SD2Parsers.getMap = function(x) {
  switch (x) {
    case "_2x2_Slutsk_W_LD_1v1":
      return "Slutsk West";
    case "_2x2_Slutsk_E_LD_1v1":
      return "Slutsk East";
    default:
      return x;
  }
};
SD2Parsers.getVictoryCond = function(x) {
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
};

export let SD1Parsers = {};
SD1Parsers.getGameType = function(x) {
  switch (x) {
    case "0":
      return "⍟/卐";
    case "1":
      return "⍟/⍟";
    case "2":
      return "卐/卐";
    default:
      return "Unknown";
  }
};
SD1Parsers.getGameMode = function(x) {
  switch (x) {
    case "1":
      return "Skirmish";
    case "3":
      return "Historical";
    default:
      return "unknown";
  }
};
SD1Parsers.getMap = function(x) {
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
};
SD1Parsers.getIncomeRate = function(x) {
  switch (x) {
    case "0":
      return "No income";
    case "1":
      return "Very low";
    case "2":
      return "Low";
    case "3":
      return "Normal";
    case "4":
      return "High";
    case "5":
      return "Very high";
    default:
      return "Unknown";
  }
};
SD1Parsers.getTimeLimit = function(x) {
  if (x === "0") {
    return "No limit";
  }
  return x / 60 + "min";
};
SD1Parsers.getVictoryCond = function(x) {
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
};
