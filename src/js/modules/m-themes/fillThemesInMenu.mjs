import { themes, THEMES_NAMES, THEMES_LIST } from './themesData.mjs';
import { resetThemesContainerStyles, renderPlayThemeButtons } from './themesDifficulty.mjs';

let lockCreation = false;

function fillThemes() {
  resetThemesContainerStyles();
  if (lockCreation) return;

  let themesContainer = document.getElementById('themesContainer');
  let randomThemesLogos = [];

  for (let i = 0; i < THEMES_LIST.length; i++) {
    randomThemesLogos.push(themes[THEMES_LIST[i]].logo);

    let theme = document.createElement('div');
    theme.classList.add('theme');
    theme.innerHTML = `
    <div class="theme-image-container">
      ${randomThemesLogos[i]}
    </div>
    <h3>${THEMES_NAMES[i]}</h3>
    <button class="play-themeBtn choosable-theme" data-themeid="${THEMES_LIST[i]}">Play Theme</button>
    `;
    themesContainer.appendChild(theme);
  }

  lockCreation = true;
  renderPlayThemeButtons();
}

export { fillThemes };