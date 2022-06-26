import { themes, themesNames} from './themesList.mjs';
import { themesKeys } from './themesList.mjs';
import { resetStyles, loadPlayButtons } from './themesDifficulty.mjs';

let lockCreation = false;

function fillThemes() {
  resetStyles();
  if (lockCreation) return;

  let themesContainer = document.getElementById('themesContainer');
  let themesContent = Object.values(themes);

  for (let i = 0; i < themesNames.length; i++) {
    let theme = document.createElement('div');
    theme.classList.add('theme');
    theme.innerHTML = `
    <div class="theme-image-container">
      ${themesContent[i]}
    </div>
    <h3>${themesNames[i]}</h3>
    <button class="play-themeBtn choosable-theme" data-themeId="${themesKeys[i]}">Play Theme</button>
    `;
    themesContainer.appendChild(theme);
  }

  lockCreation = true;
  loadPlayButtons();
}

export { fillThemes };