import { hideElements, revealElements } from '../../main.js';
import {
  addEasyModeCards,
  addNormalModeCards,
  addHardModeCards,
  saveClickedBtnThemeId
} from './AddCards.mjs';

const THEMES_CONTAINER = document.getElementById('themes-container');
const THEMES_TITLE = document.getElementById('themes-title');

const DIFFICULTIES_CONTAINER = document.querySelector(
  '.difficulties-container'
);
const DIFFICULTY_BUTTONS = document.querySelectorAll('.difficulty-level');
const DIFFICULTY_OPTIONS = {
  Easy: addEasyModeCards,
  Normal: addNormalModeCards,
  Hard: addHardModeCards
};

let difficulty;

function resetThemesContainerStyles() {
  hideElements(DIFFICULTIES_CONTAINER);
  revealElements(THEMES_CONTAINER);
  THEMES_TITLE.innerHTML = 'Themes';
}

function showDifficulties() {
  // get clicked button dataset
  let btnThemeId = this.dataset.themeid;
  saveClickedBtnThemeId(btnThemeId);

  THEMES_TITLE.innerHTML = 'Select Your Difficulty';
  hideElements(THEMES_CONTAINER);
  revealElements(DIFFICULTIES_CONTAINER);
}

function renderPlayThemeButtons() {
  const playThemesBtns = document.querySelectorAll('.choosable-theme');
  playThemesBtns.forEach(playButton => {
    playButton.addEventListener('click', showDifficulties);
  });
}

function checkDifficulty() {
  difficulty = this.innerHTML;

  if (DIFFICULTY_OPTIONS[difficulty]) {
    DIFFICULTY_OPTIONS[difficulty]();
  }
}

function shuffleDifficulties() {
  let DIFFICULTY_NAMES = Object.keys(DIFFICULTY_OPTIONS);
  let drawnDifficultyName =
    DIFFICULTY_NAMES[Math.floor(Math.random() * DIFFICULTY_NAMES.length)];
  difficulty = drawnDifficultyName;
  DIFFICULTY_OPTIONS[drawnDifficultyName]();
}

DIFFICULTY_BUTTONS.forEach(DIFFICULTY_BUTTON => {
  DIFFICULTY_BUTTON.addEventListener('click', checkDifficulty);
});

export {
  resetThemesContainerStyles,
  renderPlayThemeButtons,
  difficulty,
  shuffleDifficulties
};
