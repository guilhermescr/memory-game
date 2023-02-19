import {
  hideElements,
  renderLoaderContainer,
  revealElements
} from '../../main.js';
import { closeMenu } from '../MenuActions.mjs';
import { themes } from './ThemesData.mjs';
import { resetThemesContainerStyles } from './ThemesDifficulties.mjs';
import { renderDeck } from './DeckStyles.mjs';

const TOP_BAR_CONTAINER = document.querySelector('.top-bar-container');
let memoryDeck = document.querySelector('.memory-deck');
let createCardsTwice, btnThemeId, themesDifficultiesList;

function saveClickedBtnThemeId(clickedBtnThemeId) {
  btnThemeId = clickedBtnThemeId;
  saveCurrentThemeDifficulties();
}

function saveCurrentThemeDifficulties() {
  themesDifficultiesList = Object.keys(themes[btnThemeId].difficulties);
}

function createCards(difficulty) {
  createCardsTwice = 0;

  const CARDS_LIST = {};
  /*
    The code below creates keys for CARDS_LIST. These keys are the difficulties (easy, normal, hard etc.) in themesData module.
    If we choose "easy", for example, easy has 4 objects, which are the names of the characters.
    Therefore, we get the values of the 4 objects and give it to CARDS_LIST[themesDifficulty].
  */

  themesDifficultiesList.forEach(themesDifficulty => {
    CARDS_LIST[themesDifficulty] = Object.values(
      themes[btnThemeId].difficulties[themesDifficulty]
    );
  });

  // I.e.: createCards('easy') -> all easy cards go to cards variable.
  let cards = CARDS_LIST[difficulty];

  while (createCardsTwice < 2) {
    for (let card = 0; card < cards.length; card++) {
      let memoryCard = document.createElement('div');

      memoryCard.classList.add('memory-card');
      memoryCard.style.backgroundColor = `${themes[btnThemeId].cardBackgroundColor}`;

      memoryCard.innerHTML = `
      ${themes[btnThemeId].frontFace}
      ${cards[card]}
      `;
      memoryDeck.appendChild(memoryCard);
    }
    createCardsTwice++;
  }
}

function addEasyModeCards() {
  const GAME_MENU = document.querySelector('.game-menu');
  let topBarContainerIngameElements = document.querySelectorAll(
    '.top-bar-container__top-bar-item:not(.top-bar-container__top-bar-item.left-content__hearts-container)'
  );
  TOP_BAR_CONTAINER.classList.add('top-bar-container--background');

  closeMenu();
  resetThemesContainerStyles();

  createCards(themesDifficultiesList[0]);

  renderLoaderContainer('Renderizando cartas...');
  renderDeck();

  revealElements(topBarContainerIngameElements);
  hideElements([GAME_MENU, document.querySelector('.languages')]);
}

function addNormalModeCards() {
  createCards(themesDifficultiesList[1]);
  addEasyModeCards();
}

function addHardModeCards() {
  revealElements(document.querySelector('.left-content__hearts-container'));
  createCards(themesDifficultiesList[2]);
  addNormalModeCards();
}

export {
  TOP_BAR_CONTAINER,
  addEasyModeCards,
  addNormalModeCards,
  addHardModeCards,
  saveClickedBtnThemeId,
  btnThemeId,
  memoryDeck
};
