import { renderLoadingContainer } from '../../main.js';
import { closeMenu } from '../menuActions.mjs';
import { startGame } from '../gameAlgorithm.mjs';
import { themes } from './themesData.mjs';
import { playDefaultSoundTrack } from '../m-audio/audio.mjs';
import { resetStyles } from './themesDifficulty.mjs';

const LOADER_TITLE = document.getElementById('loader-title');
const DECK_CONTAINER = document.querySelector('.deck-container');
const MEMORY_DECK = document.getElementById('deck');
let createCardsTwice, btnThemeId;

function saveClickedBtnThemeId(clickedBtnThemeId) {
  btnThemeId = clickedBtnThemeId;
}

function addEasyCards() {
  closeMenu();
  resetStyles();

  let easyCards = Object.values(themes[btnThemeId].easy);
  createCardsTwice = 0;

  while (createCardsTwice < 2) {
    for (let i = 0; i < easyCards.length; i++) {
      let memoryCard = document.createElement('div');
      
      memoryCard.classList.add('memory-card');
      memoryCard.style.backgroundColor = `${themes[btnThemeId].cardBackgroundColor}`;

      memoryCard.innerHTML = `
      ${themes[btnThemeId].frontFace}
      ${easyCards[i]}
      `;
      MEMORY_DECK.appendChild(memoryCard);
    }
    createCardsTwice++
  }
  LOADER_TITLE.innerHTML = "Downloading cards...";
  renderLoadingContainer();

  setTimeout(() => {
    startGame();
    DECK_CONTAINER.style.backgroundImage = `url('${themes[btnThemeId].bodyBackgroundImage}')`;
    DECK_CONTAINER.style.display = 'flex';
    playDefaultSoundTrack();
  }, 3000);
}

function addNormalCards() {
  let normalCards = Object.values(themes[btnThemeId].normal);
  createCardsTwice = 0;

  while (createCardsTwice < 2) {
    for (let i = 0; i < normalCards.length; i++) {
      let memoryCard = document.createElement('div');
      
      memoryCard.classList.add('memory-card');
      memoryCard.style.backgroundColor = `${themes[btnThemeId].cardBackgroundColor}`;

      memoryCard.innerHTML = `
      ${themes[btnThemeId].frontFace}
      ${normalCards[i]}
      `;
      MEMORY_DECK.appendChild(memoryCard);
    }
    createCardsTwice++
  }
  addEasyCards();
}

function addHardCards() {
  let hardCards = Object.values(themes[btnThemeId].hard);
  createCardsTwice = 0;

  while (createCardsTwice < 2) {
    for (let i = 0; i < hardCards.length; i++) {
      let memoryCard = document.createElement('div');
      
      memoryCard.classList.add('memory-card');
      memoryCard.style.backgroundColor = `${themes[btnThemeId].cardBackgroundColor}`;

      memoryCard.innerHTML = `
      ${themes[btnThemeId].frontFace}
      ${hardCards[i]}
      `;
      MEMORY_DECK.appendChild(memoryCard);
    }
    createCardsTwice++
  }
  addNormalCards();
}



export { addEasyCards, addNormalCards, addHardCards, saveClickedBtnThemeId, btnThemeId };