import { revealElements, timeoutItems } from '../../main.js';
import { themes } from './ThemesData.mjs';
import { btnThemeId } from './AddCards.mjs';
import { startGame } from '../GameAlgorithm.mjs';

const DECK_CONTAINER = document.querySelector('.deck-container');
const MEMORY_DECK = document.querySelector('.memory-deck');

function setDeckStyles() {
  let cards_amount = MEMORY_DECK.childElementCount;

  MEMORY_DECK.style.maxWidth = '';
  MEMORY_DECK.classList.remove('max-width-easy-mode');
  MEMORY_DECK.classList.remove('max-width-normal-mode');
  MEMORY_DECK.classList.remove('max-width-hard-mode');

  if (document.body.clientWidth > 1366) {
    MEMORY_DECK.style.maxWidth = '1200px';
    return;
  }

  if (cards_amount === 8) {
    MEMORY_DECK.classList.add('max-width-easy-mode');
  }
  if (cards_amount === 14) {
    MEMORY_DECK.classList.add('max-width-normal-mode');
  }
  if (cards_amount === 20) {
    MEMORY_DECK.classList.add('max-width-hard-mode');
  }
}

function renderDeck() {
  window.addEventListener('resize', setDeckStyles);
  setDeckStyles();

  DECK_CONTAINER.style.backgroundImage = `url('${themes[btnThemeId].bodyBackgroundImage}')`;
  revealElements(DECK_CONTAINER);

  timeoutItems(startGame);
}

export { DECK_CONTAINER, renderDeck, setDeckStyles };
