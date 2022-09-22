import {
  hideElements,
  renderLoaderContainer,
  revealElements
} from '../../main.js';
import { closeMenu } from '../menuActions.mjs';
import { themes } from './themesData.mjs';
import { resetThemesContainerStyles } from './themesDifficulty.mjs';
import { renderDeck } from './deckStyles.mjs';

const TOP_BAR_CONTAINER = document.querySelector('.top_bar_container');
let createCardsTwice,
  btnThemeId,
  memoryDeck = document.getElementById('deck');
let themesDifficultiesList;

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
    /*
      OBS: Object.values() returns an array!

      CARDS_LIST[themesDifficulty] -> is equal to:
      CARDS_LIST = {
        themesDifficulty: '...';
      }

      Object.values(themes[btnThemeId].difficulties[themesDifficulty]) -> gets all cards from the chosen difficulty.

      So...
      CARDS_LIST = {
        themesDifficulty: 'all cards stay here';
      }
    */
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
    '.top_bar_item:not(.top_bar_item.hearts_container)'
  );
  TOP_BAR_CONTAINER.classList.add('top_bar_container__background');

  closeMenu();
  resetThemesContainerStyles();

  createCards(themesDifficultiesList[0]);

  renderLoaderContainer('Downloading cards...');
  renderDeck();

  revealElements(topBarContainerIngameElements);
  hideElements(GAME_MENU);
}

function addNormalModeCards() {
  createCards(themesDifficultiesList[1]);
  addEasyModeCards();
}

function addHardModeCards() {
  revealElements(document.querySelector('.hearts_container'));
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
