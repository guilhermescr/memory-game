import { renderLoaderContainer } from '../../main.js';
import { closeMenu, toggleElementsDisplayState } from '../menuActions.mjs';
import { themes } from './themesData.mjs';
import { resetThemesContainerStyles } from './themesDifficulty.mjs';
import { renderDeck } from './deckStyles.mjs';

const LOADER_TITLE = document.getElementById('loader-title');
const MEMORY_DECK = document.getElementById('deck');
let createCardsTwice, btnThemeId;

function saveClickedBtnThemeId(clickedBtnThemeId) {
  btnThemeId = clickedBtnThemeId;
}

function createCards(difficulty) {
  createCardsTwice = 0;

  const CARDS_LIST = {
    easy: Object.values(themes[btnThemeId].easy),
    normal: Object.values(themes[btnThemeId].normal),
    hard: Object.values(themes[btnThemeId].hard),
  };
  let cards = CARDS_LIST[difficulty];

  while (createCardsTwice < 2) {
    for (let index = 0; index < cards.length; index++) {
      let memoryCard = document.createElement('div');
      
      memoryCard.classList.add('memory-card');
      memoryCard.style.backgroundColor = `${themes[btnThemeId].cardBackgroundColor}`;

      memoryCard.innerHTML = `
      ${themes[btnThemeId].frontFace}
      ${cards[index]}
      `;
      MEMORY_DECK.appendChild(memoryCard);
    }
    createCardsTwice++
  }
}

function addEasyModeCards() {
  let elementsToReveal = document.querySelectorAll('#score, #settingsIcon');
  let elementsToHide = document.querySelectorAll('.game-menu');

  closeMenu();
  resetThemesContainerStyles();
  createCards("easy");

  LOADER_TITLE.innerHTML = "Downloading cards...";
  renderLoaderContainer();
  renderDeck();

  // elementsToReveal, elementsToHide
  toggleElementsDisplayState(elementsToReveal, elementsToHide);
}

function addNormalModeCards() {
  addEasyModeCards();
  createCards("normal");
}

function addHardModeCards() {
  addNormalModeCards();
  createCards("hard");
}

export { addEasyModeCards, addNormalModeCards, addHardModeCards, saveClickedBtnThemeId, btnThemeId };