import { themes } from "./themesData.mjs";
import { btnThemeId } from "./addCards.mjs";

const DECK_CONTAINER = document.querySelector('.deck-container');
const MEMORY_DECK = document.getElementById('deck');

function renderDeck() {
  DECK_CONTAINER.style.backgroundImage = `url('${themes[btnThemeId].bodyBackgroundImage}')`;
  DECK_CONTAINER.style.display = 'flex';

  let cardsAmountInMemoryDeck = MEMORY_DECK.childElementCount;

  if (cardsAmountInMemoryDeck === 8) {
    MEMORY_DECK.style.gridTemplateColumns = 'repeat(4, auto)';
  }
  if (cardsAmountInMemoryDeck === 14 || cardsAmountInMemoryDeck === 20) {
    MEMORY_DECK.style.gridTemplateColumns = 'repeat(5, auto)';
  }
}

export { renderDeck };