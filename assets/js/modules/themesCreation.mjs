import { themes, themesNames} from './themesList.mjs';

let lockCreation = false;

function fillThemes() {
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
    <button class="play-themeBtn" data-themeId="${themesNames[i]}">Play Theme</button>
    `;
    themesContainer.appendChild(theme);
  }

  lockCreation = true;
}

export { fillThemes };