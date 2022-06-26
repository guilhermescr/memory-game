let themesContainer = document.getElementById('themesContainer');
let themesTitle = document.getElementById('themes-title');
const difficultiesContainer = document.getElementsByClassName('difficulties-container')[0];
const returnIcons = document.getElementsByClassName('return-icon')[0];

function resetStyles() {
  themesContainer.style.display = 'flex';
  themesTitle.innerHTML = 'Themes';
  difficultiesContainer.style.display = 'none';
  returnIcons.style.display = 'none';
}

function showDifficulties() {
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

export { resetStyles, loadPlayButtons };