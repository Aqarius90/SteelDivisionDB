export function getGameMode(x) {
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
}
export function getGameType(x) {
  switch (x) {
    case "0":
      return "Allies/Axis";
    case "1":
      return "Allies/Allies";
    case "2":
      return "Axis/Axis";
    default:
      return "Unknown";
  }
}
export function getTimeLimit(x) {
  switch (x) {
    case "0":
      return "No time limit";
    default:
      return "Unknown";
  }
}
export function getIncomeRate(x) {
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
}
export function getMap(x) {
  switch (x) {
    case "_2x2_Slutsk_W_LD_1v1":
      return "Slutsk West";
    case "_2x2_Slutsk_E_LD_1v1":
      return "Slutsk East";
    default:
      return "Unknown";
  }
}
/*VictoryCond:3
Duration:559
Victory:4*/
