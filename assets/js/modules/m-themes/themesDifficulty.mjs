import { addEasyCards, addNormalCards, addHardCards, saveClickedBtnThemeId } from './addCards.mjs';

let themesContainer = document.getElementById('themesContainer');
let themesTitle = document.getElementById('themes-title');
const difficultiesContainer = document.getElementsByClassName('difficulties-container')[0];
const difficultyButtons = document.querySelectorAll('.difficulty-level');
const returnIcons = document.getElementsByClassName('return-icon')[0];

function resetStyles() {
  themesContainer.style.display = 'flex';
  themesTitle.innerHTML = 'Themes';
  difficultiesContainer.style.display = 'none';
  returnIcons.style.display = 'none';
}

function showDifficulties() {
  // Clicked button dataset
  let btnThemeId = this.dataset.themeid;
  saveClickedBtnThemeId(btnThemeId);

  themesContainer.style.display = 'none';
  themesTitle.innerHTML = 'Select your Difficulty';
  difficultiesContainer.style.display = 'flex';
  returnIcons.style.display = 'block';
  returnIcons.addEventListener('click', resetStyles);
}

function loadPlayButtons() {
  const playThemesBtns = document.querySelectorAll('.choosable-theme');
  playThemesBtns.forEach(playButton => {
    playButton.addEventListener('click', showDifficulties);
  });
}

function checkDifficulty() {
  const difficultyChoice = {
    Easy: addEasyCards,
    Normal: addNormalCards,
    Hard: addHardCards
  };

  if (difficultyChoice[this.innerHTML]) {
    difficultyChoice[this.innerHTML]();
  }
}

difficultyButtons.forEach((button) => {
  button.addEventListener('click', checkDifficulty);
});

export { resetStyles, loadPlayButtons };