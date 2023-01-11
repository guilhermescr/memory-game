import { revealElements, timeoutItems } from '../../main.js';
import { themes } from './themesData.mjs';
import { btnThemeId } from './addCards.mjs';
import { startGame } from '../gameAlgorithm.mjs';

const DECK_CONTAINER = document.querySelector('.deck-container');
const MEMORY_DECK = document.querySelector('.memory-deck');

function renderDeck() {
  DECK_CONTAINER.style.backgroundImage = `url('${themes[btnThemeId].bodyBackgroundImage}')`;
  revealElements(DECK_CONTAINER);

  let cardsAmountInMemoryDeck = MEMORY_DECK.childElementCount;

  if (cardsAmountInMemoryDeck === 8) {
    MEMORY_DECK.style.gridTemplateColumns = 'repeat(4, auto)';
  }
  if (cardsAmountInMemoryDeck === 14) {
    MEMORY_DECK.style.gridTemplateColumns = 'repeat(5, auto)';
  }
  if (cardsAmountInMemoryDeck === 20) {
    MEMORY_DECK.style.gridTemplateColumns = 'repeat(7, auto)';
  }

  timeoutItems(startGame);
}

export { DECK_CONTAINER, renderDeck };
