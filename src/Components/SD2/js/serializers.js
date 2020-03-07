export function getIncomeArray(Deck) {
  /*inputs deck, returns income array, A/B/C */
  switch (Deck.Income) {
    case 0:
      return (Deck.Income = "Balanced");
    case 1:
      return (Deck.Income = "Vanguard");
    case 2:
      return (Deck.Income = "Maverick");
    case 3:
      return (Deck.Income = "Juggernaut");

    default:
      global.throw("Income array parsing error", Deck);
  }
}
