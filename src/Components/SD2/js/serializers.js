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
    case 4:
      return (Deck.Income = "Flat");
    case 5:
      return (Deck.Income = "V for Victory");

    default:
      global.throw("Income array parsing error", Deck);
  }
}
