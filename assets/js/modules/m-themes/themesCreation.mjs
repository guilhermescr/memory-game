import { themes, themesNames} from './themesList.mjs';
import { themesKeys } from './themesList.mjs';
import { resetStyles, loadPlayButtons } from './themesDifficulty.mjs';

let lockCreation = false;

function fillThemes() {
  resetStyles();
  if (lockCreation) return;

  let themesContainer = document.getElementById('themesContainer');
  let randomThemesLogo = [];

  for (let i = 0; i < themesNames.length; i++) {
    randomThemesLogo.push(themes[themesKeys[i]].logo);

    let theme = document.createElement('div');
    theme.classList.add('theme');
    theme.innerHTML = `
    <div class="theme-image-container">
      ${randomThemesLogo[i]}
    </div>
    <h3>${themesNames[i]}</h3>
    <button class="play-themeBtn choosable-theme" data-themeid="${themesKeys[i]}">Play Theme</button>
    `;
    themesContainer.appendChild(theme);
  }

  lockCreation = true;
  loadPlayButtons();
}

export { fillThemes };