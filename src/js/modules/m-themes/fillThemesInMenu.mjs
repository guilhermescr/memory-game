import { THEMES_NAMES, THEMES_LIST, THEMES_LOGOS } from './themesData.mjs';
import { resetThemesContainerStyles, renderPlayThemeButtons } from './themesDifficulty.mjs';

let lockCreation = false;

function fillThemes() {
  resetThemesContainerStyles();
  if (lockCreation) return;

  let themesContainer = document.getElementById('themesContainer');

  for (let index = 0; index < THEMES_LIST.length; index++) {

    let theme = document.createElement('div');
    theme.classList.add('theme');
    theme.innerHTML = `
    <div class="theme-image-container">
      ${THEMES_LOGOS[index]}
    </div>
    <h3>${THEMES_NAMES[index]}</h3>
    <button class="play-themeBtn choosable-theme" data-themeid="${THEMES_LIST[index]}">Play Theme</button>
    `;
    themesContainer.appendChild(theme);
  }

  lockCreation = true;
  renderPlayThemeButtons();
}

export { fillThemes };