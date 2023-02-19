import { THEMES_LIST, THEMES_NAMES, THEMES_LOGOS } from '../m-themes/ThemesData.mjs';
import { RANDOM_THEMES_TITLE } from './ShuffleRandomThemes.mjs';

const RANDOM_THEMES_CONTAINER = document.getElementById('random-themes-images');

function fillRandomThemes() {
  RANDOM_THEMES_CONTAINER.innerHTML = '';
  RANDOM_THEMES_TITLE.innerHTML = 'Temas Aleatórios';

  for (let index = 0; index < THEMES_LIST.length; index++) {
    let randomTheme = document.createElement('div');
    randomTheme.classList.add('random-theme');
    randomTheme.dataset.themeid = THEMES_LIST[index];
    randomTheme.dataset.themename = THEMES_NAMES[index];
    randomTheme.innerHTML = `${THEMES_LOGOS[index]}`;
    RANDOM_THEMES_CONTAINER.appendChild(randomTheme);
  }
}

export { fillRandomThemes };