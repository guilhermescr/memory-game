import { addEasyModeCards, addNormalModeCards, addHardModeCards, saveClickedBtnThemeId } from './addCards.mjs';

const THEMES_CONTAINER = document.getElementById('themesContainer');
const THEMES_TITLE = document.getElementById('themes-title');
const DIFFICULTIES_CONTAINER = document.querySelector('.difficulties-container');
const DIFFICULTY_BUTTONS = document.querySelectorAll('.difficulty-level');
const RETURN_ICONS = document.querySelector('.return-icon');

function resetThemesContainerStyles() {
  THEMES_CONTAINER.style.display = 'flex';
  THEMES_TITLE.innerHTML = 'Themes';
  DIFFICULTIES_CONTAINER.style.display = 'none';
  RETURN_ICONS.style.display = 'none';
}

function showDifficulties() {
  // get clicked button dataset
  let btnThemeId = this.dataset.themeid;
  saveClickedBtnThemeId(btnThemeId);

  THEMES_CONTAINER.style.display = 'none';
  THEMES_TITLE.innerHTML = 'Select Your Difficulty';
  DIFFICULTIES_CONTAINER.style.display = 'flex';
  RETURN_ICONS.style.display = 'block';
  RETURN_ICONS.addEventListener('click', resetThemesContainerStyles);
}

function renderPlayThemeButtons() {
  const playThemesBtns = document.querySelectorAll('.choosable-theme');
  playThemesBtns.forEach(playButton => {
    playButton.addEventListener('click', showDifficulties);
  });
}

function checkDifficulty() {
  let difficulty = this.innerHTML;

  const DIFFICULTY_OPTIONS = {
    Easy: addEasyModeCards,
    Normal: addNormalModeCards,
    Hard: addHardModeCards,
  };

  if (DIFFICULTY_OPTIONS[difficulty]) {
    DIFFICULTY_OPTIONS[difficulty]();
  }
}

DIFFICULTY_BUTTONS.forEach((DIFFICULTY_BUTTON) => {
  DIFFICULTY_BUTTON.addEventListener('click', checkDifficulty);
});

export { resetThemesContainerStyles, renderPlayThemeButtons };