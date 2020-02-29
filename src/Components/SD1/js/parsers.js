export function parseToBin(deckCode) {
  var deckBinary = "";
  for (var i = 0; i < deckCode.length; i++) {
    if (deckCode.charAt(i) === "A") {
      deckBinary += "000000";
    } else if (deckCode.charAt(i) === "B") {
      deckBinary += "000001";
    } else if (deckCode.charAt(i) === "C") {
      deckBinary += "000010";
    } else if (deckCode.charAt(i) === "D") {
      deckBinary += "000011";
    } else if (deckCode.charAt(i) === "E") {
      deckBinary += "000100";
    } else if (deckCode.charAt(i) === "F") {
      deckBinary += "000101";
    } else if (deckCode.charAt(i) === "G") {
      deckBinary += "000110";
    } else if (deckCode.charAt(i) === "H") {
      deckBinary += "000111";
    } else if (deckCode.charAt(i) === "I") {
      deckBinary += "001000";
    } else if (deckCode.charAt(i) === "J") {
      deckBinary += "001001";
    } else if (deckCode.charAt(i) === "K") {
      deckBinary += "001010";
    } else if (deckCode.charAt(i) === "L") {
      deckBinary += "001011";
    } else if (deckCode.charAt(i) === "M") {
      deckBinary += "001100";
    } else if (deckCode.charAt(i) === "N") {
      deckBinary += "001101";
    } else if (deckCode.charAt(i) === "O") {
      deckBinary += "001110";
    } else if (deckCode.charAt(i) === "P") {
      deckBinary += "001111";
    } else if (deckCode.charAt(i) === "Q") {
      deckBinary += "010000";
    } else if (deckCode.charAt(i) === "R") {
      deckBinary += "010001";
    } else if (deckCode.charAt(i) === "S") {
      deckBinary += "010010";
    } else if (deckCode.charAt(i) === "T") {
      deckBinary += "010011";
    } else if (deckCode.charAt(i) === "U") {
      deckBinary += "010100";
    } else if (deckCode.charAt(i) === "V") {
      deckBinary += "010101";
    } else if (deckCode.charAt(i) === "W") {
      deckBinary += "010110";
    } else if (deckCode.charAt(i) === "X") {
      deckBinary += "010111";
    } else if (deckCode.charAt(i) === "Y") {
      deckBinary += "011000";
    } else if (deckCode.charAt(i) === "Z") {
      deckBinary += "011001";
    } else if (deckCode.charAt(i) === "a") {
      deckBinary += "011010";
    } else if (deckCode.charAt(i) === "b") {
      deckBinary += "011011";
    } else if (deckCode.charAt(i) === "c") {
      deckBinary += "011100";
    } else if (deckCode.charAt(i) === "d") {
      deckBinary += "011101";
    } else if (deckCode.charAt(i) === "e") {
      deckBinary += "011110";
    } else if (deckCode.charAt(i) === "f") {
      deckBinary += "011111";
    } else if (deckCode.charAt(i) === "g") {
      deckBinary += "100000";
    } else if (deckCode.charAt(i) === "h") {
      deckBinary += "100001";
    } else if (deckCode.charAt(i) === "i") {
      deckBinary += "100010";
    } else if (deckCode.charAt(i) === "j") {
      deckBinary += "100011";
    } else if (deckCode.charAt(i) === "k") {
      deckBinary += "100100";
    } else if (deckCode.charAt(i) === "l") {
      deckBinary += "100101";
    } else if (deckCode.charAt(i) === "m") {
      deckBinary += "100110";
    } else if (deckCode.charAt(i) === "n") {
      deckBinary += "100111";
    } else if (deckCode.charAt(i) === "o") {
      deckBinary += "101000";
    } else if (deckCode.charAt(i) === "p") {
      deckBinary += "101001";
    } else if (deckCode.charAt(i) === "q") {
      deckBinary += "101010";
    } else if (deckCode.charAt(i) === "r") {
      deckBinary += "101011";
    } else if (deckCode.charAt(i) === "s") {
      deckBinary += "101100";
    } else if (deckCode.charAt(i) === "t") {
      deckBinary += "101101";
    } else if (deckCode.charAt(i) === "u") {
      deckBinary += "101110";
    } else if (deckCode.charAt(i) === "v") {
      deckBinary += "101111";
    } else if (deckCode.charAt(i) === "w") {
      deckBinary += "110000";
    } else if (deckCode.charAt(i) === "x") {
      deckBinary += "110001";
    } else if (deckCode.charAt(i) === "y") {
      deckBinary += "110010";
    } else if (deckCode.charAt(i) === "z") {
      deckBinary += "110011";
    } else if (deckCode.charAt(i) === "0") {
      deckBinary += "110100";
    } else if (deckCode.charAt(i) === "1") {
      deckBinary += "110101";
    } else if (deckCode.charAt(i) === "2") {
      deckBinary += "110110";
    } else if (deckCode.charAt(i) === "3") {
      deckBinary += "110111";
    } else if (deckCode.charAt(i) === "4") {
      deckBinary += "111000";
    } else if (deckCode.charAt(i) === "5") {
      deckBinary += "111001";
    } else if (deckCode.charAt(i) === "6") {
      deckBinary += "111010";
    } else if (deckCode.charAt(i) === "7") {
      deckBinary += "111011";
    } else if (deckCode.charAt(i) === "8") {
      deckBinary += "111100";
    } else if (deckCode.charAt(i) === "+") {
      deckBinary += "111110";
    } else if (deckCode.charAt(i) === "9") {
      deckBinary += "111101";
    } else if (deckCode.charAt(i) === "/") {
      deckBinary += "111111";
    }
  }
  return deckBinary;
}

export function parseFromBin(charArray) {
  let pad = "000000";
  charArray[charArray.length - 1] =
    charArray[charArray.length - 1] +
    pad.substring(0, pad.length - charArray[charArray.length - 1].length); //pad last to 6
  let CharOut = "*";
  for (let i = 0; i < charArray.length; i++) {
    if (charArray[i] === "000000") {
      CharOut += "A";
    } else if (charArray[i] === "000001") {
      CharOut += "B";
    } else if (charArray[i] === "000010") {
      CharOut += "C";
    } else if (charArray[i] === "000011") {
      CharOut += "D";
    } else if (charArray[i] === "000100") {
      CharOut += "E";
    } else if (charArray[i] === "000101") {
      CharOut += "F";
    } else if (charArray[i] === "000110") {
      CharOut += "G";
    } else if (charArray[i] === "000111") {
      CharOut += "H";
    } else if (charArray[i] === "001000") {
      CharOut += "I";
    } else if (charArray[i] === "001001") {
      CharOut += "J";
    } else if (charArray[i] === "001010") {
      CharOut += "K";
    } else if (charArray[i] === "001011") {
      CharOut += "L";
    } else if (charArray[i] === "001100") {
      CharOut += "M";
    } else if (charArray[i] === "001101") {
      CharOut += "N";
    } else if (charArray[i] === "001110") {
      CharOut += "O";
    } else if (charArray[i] === "001111") {
      CharOut += "P";
    } else if (charArray[i] === "010000") {
      CharOut += "Q";
    } else if (charArray[i] === "010001") {
      CharOut += "R";
    } else if (charArray[i] === "010010") {
      CharOut += "S";
    } else if (charArray[i] === "010011") {
      CharOut += "T";
    } else if (charArray[i] === "010100") {
      CharOut += "U";
    } else if (charArray[i] === "010101") {
      CharOut += "V";
    } else if (charArray[i] === "010110") {
      CharOut += "W";
    } else if (charArray[i] === "010111") {
      CharOut += "X";
    } else if (charArray[i] === "011000") {
      CharOut += "Y";
    } else if (charArray[i] === "011001") {
      CharOut += "Z";
    } else if (charArray[i] === "011010") {
      CharOut += "a";
    } else if (charArray[i] === "011011") {
      CharOut += "b";
    } else if (charArray[i] === "011100") {
      CharOut += "c";
    } else if (charArray[i] === "011101") {
      CharOut += "d";
    } else if (charArray[i] === "011110") {
      CharOut += "e";
    } else if (charArray[i] === "011111") {
      CharOut += "f";
    } else if (charArray[i] === "100000") {
      CharOut += "g";
    } else if (charArray[i] === "100001") {
      CharOut += "h";
    } else if (charArray[i] === "100010") {
      CharOut += "i";
    } else if (charArray[i] === "100011") {
      CharOut += "j";
    } else if (charArray[i] === "100100") {
      CharOut += "k";
    } else if (charArray[i] === "100101") {
      CharOut += "l";
    } else if (charArray[i] === "100110") {
      CharOut += "m";
    } else if (charArray[i] === "100111") {
      CharOut += "n";
    } else if (charArray[i] === "101000") {
      CharOut += "o";
    } else if (charArray[i] === "101001") {
      CharOut += "p";
    } else if (charArray[i] === "101010") {
      CharOut += "q";
    } else if (charArray[i] === "101011") {
      CharOut += "r";
    } else if (charArray[i] === "101100") {
      CharOut += "s";
    } else if (charArray[i] === "101101") {
      CharOut += "t";
    } else if (charArray[i] === "101110") {
      CharOut += "u";
    } else if (charArray[i] === "101111") {
      CharOut += "v";
    } else if (charArray[i] === "110000") {
      CharOut += "w";
    } else if (charArray[i] === "110001") {
      CharOut += "x";
    } else if (charArray[i] === "110010") {
      CharOut += "y";
    } else if (charArray[i] === "110011") {
      CharOut += "z";
    } else if (charArray[i] === "110100") {
      CharOut += "0";
    } else if (charArray[i] === "110101") {
      CharOut += "1";
    } else if (charArray[i] === "110110") {
      CharOut += "2";
    } else if (charArray[i] === "110111") {
      CharOut += "3";
    } else if (charArray[i] === "111000") {
      CharOut += "4";
    } else if (charArray[i] === "111001") {
      CharOut += "5";
    } else if (charArray[i] === "111010") {
      CharOut += "6";
    } else if (charArray[i] === "111011") {
      CharOut += "7";
    } else if (charArray[i] === "111100") {
      CharOut += "8";
    } else if (charArray[i] === "111110") {
      CharOut += "+";
    } else if (charArray[i] === "111101") {
      CharOut += "9";
    } else if (charArray[i] === "111111") {
      CharOut += "/";
    }
  }
  //parser throws out decks with no padding.
  if (CharOut.length % 4 === 0) {
    CharOut += "A";
  } else if (CharOut.length % 4 === 1) {
    CharOut += "";
  } else if (CharOut.length % 4 === 2) {
    CharOut += "A==";
  } else if (CharOut.length % 4 === 3) {
    CharOut += "A=";
  }
  return CharOut;
}
export function parseBool(x) {
  return x ? "True" : "False";
}

export function parseDescriptor(x) {
  return x.split("/")[1];
}
export function parseAlias(x) {
  if (x.AliasName === null) {
    return x.ClassNameForDebug.replace("Unit_", "");
  } else return x.AliasName.replace("(!TUTO!)", "");
}
export function parsePhase(x) {
  if (x === 0) {
    return "A";
  } else if (x === 1) {
    return "B";
  } else if (x === 2) {
    return "C";
  }
}
export function parseArmor(x) {
  var foo = x;
  foo = foo.replace("ArmorDescriptor_", "");
  foo = foo.replace("Lourd", "");
  foo = foo.replace("_", " ");
  foo = foo.replace("Blindage", "AV");
  foo = foo.replace("Infanterie", "Infantry");
  foo = foo.replace("Canon", "Gun");
  foo = foo.replace("Avion", "Aircraft");
  return foo;
}
export function parseTopArmor(x) {
  if (x.indexOf("Vehicule_OpenTop") === -1) {
    return "Closed";
  } else {
    return "Open";
  }
}
export function parseSpeed(x) {
  if (x.AirMaxspeed === null) {
    var foo = x.Maxspeed.replace("(", "");
    return foo + "/" + (foo * x.SpeedBonusOnRoad).toFixed(0);
  }
}
export function parseTransport(x) {
  if (x === 0) {
    return "none";
  } else if (x === 2) {
    return "Light";
  } else if (x === 3) {
    return "Heavy";
  } else if (x === 3) {
    return "Not towable";
  } else {
    return "N/A";
  }
}

export function parsePicture(x, size) {
  let img;
  if (size === "sm") {
    img =
      "SteelDivisionDB/img/u-sm/" +
      x.VisualsForInterface.toLowerCase() +
      ".tgv.png";
  } else if (size === "md") {
    img =
      "SteelDivisionDB/img/u-md/" +
      x.VisualsForInterface.toLowerCase() +
      ".tgv.png";
  } else {
    img =
      "SteelDivisionDB/img/u/" +
      x.VisualsForInterface.toLowerCase() +
      ".tgv.png";
  }
  return img;
}

export function parseRange(x) {
  let max = x.PorteeMaximale.replace(") * Metre)", "").replace("((", "");
  let maxTBA = x.PorteeMaximaleTBA.replace(") * Metre)", "").replace("((", "");
  let maxHA = x.PorteeMaximaleHA.replace(") * Metre)", "").replace("((", "");
  max = max > maxHA ? max : maxHA > maxTBA ? maxHA : maxTBA;
  return Math.round(max / 5) + "m";
}

export function parseAOE(x) {
  let aoe = x.replace("((", "");
  return "AOE:" + Math.round(aoe.replace(") * Metre)", "") / 5) + "m";
}
