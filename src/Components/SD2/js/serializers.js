export function getIncomeArray(Deck) {
  /*inputs deck, returns income array, A/B/C */
  switch (Deck.Income) {
    case 0:
      return Deck.IncomeList.Balanced;
    case 1:
      return Deck.IncomeList.Vanguard;
    case 2:
      return Deck.IncomeList.Maverick;
    case 3:
      return Deck.IncomeList.Juggernaut;
    default:
      throw { "Income array parsing error": Deck };
  }
}
