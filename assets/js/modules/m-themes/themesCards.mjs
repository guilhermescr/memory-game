import { startGame } from './gameAlgorithm.mjs';
import { themes } from './themesList.mjs';
import { playSoundTrack } from '../m-audio/music.mjs';

let createCardsTwice;
let btnThemeId;
const deckContainer = document.getElementsByClassName('deck-container')[0];
let memoryDeck = document.getElementById('deck');

function saveClickedBtnThemeId(clickedBtnThemeId) {
  btnThemeId = clickedBtnThemeId;
}

function addEasyCards() {
  let easyCards = Object.values(themes[btnThemeId].easy);
  createCardsTwice = 0;

  // Don't forget to add data-character to the images!! for instance:
  // <img data-character="Vegeta">
  while (createCardsTwice < 2) {
    for (let i = 0; i < easyCards.length; i++) {
      let memoryCard = document.createElement('div');
      
      memoryCard.classList.add('memory-card');
      memoryCard.style.backgroundColor = `${themes[btnThemeId].cardBackgroundColor}`;

      memoryCard.innerHTML = `
      ${themes[btnThemeId].frontFace}
      ${easyCards[i]}
      `;
      memoryDeck.appendChild(memoryCard);
    }
    createCardsTwice++
  }
  startGame();
  
  deckContainer.style.backgroundImage = `url('${themes[btnThemeId].bodyBackgroundImage}')`;
  deckContainer.style.display = 'flex';
  playSoundTrack();
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
      memoryDeck.appendChild(memoryCard);
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
      memoryDeck.appendChild(memoryCard);
    }
    createCardsTwice++
  }
  addNormalCards();
}



export { addEasyCards, addNormalCards, addHardCards, saveClickedBtnThemeId, btnThemeId };