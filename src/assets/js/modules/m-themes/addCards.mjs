import { hideElements, renderLoaderContainer, revealElements } from '../../main.js';
import { closeMenu } from '../menuActions.mjs';
import { themes } from './themesData.mjs';
import { resetThemesContainerStyles } from './themesDifficulty.mjs';
import { renderDeck } from './deckStyles.mjs';

let createCardsTwice, btnThemeId, memoryDeck = document.getElementById('deck');

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
      memoryDeck.appendChild(memoryCard);
    }
    createCardsTwice++
  }
}

function addEasyModeCards() {
  const GAME_MENU = document.querySelector('.game-menu');
  let topBarContainerIngameElements = document.querySelectorAll('#score, #settingsIcon');

  closeMenu();
  resetThemesContainerStyles();~

  createCards("easy");

  renderLoaderContainer("Downloading cards...");
  renderDeck();

  revealElements(topBarContainerIngameElements);
  hideElements(GAME_MENU);
}

function addNormalModeCards() {
  addEasyModeCards();
  createCards("normal");
}

function addHardModeCards() {
  addNormalModeCards();
  createCards("hard");
}

export { addEasyModeCards, addNormalModeCards, addHardModeCards, saveClickedBtnThemeId, btnThemeId, memoryDeck };