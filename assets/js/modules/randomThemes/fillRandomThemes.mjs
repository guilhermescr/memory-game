import { themes, themesKeys } from '../m-themes/themesList.mjs';

let lockCreation = false;

function fillRandomThemes() {
  if (lockCreation) return;

  const randomThemesContainer = document.getElementById('random-themes-images');
  let randomThemesLogo = [];

  for (let i = 0; i < themesKeys.length; i++) {
    randomThemesLogo.push(themes[themesKeys[i]].logo);

    let randomTheme = document.createElement('div');
    randomTheme.classList.add('random-theme');
    randomTheme.innerHTML = `${randomThemesLogo[i]}`;
    randomThemesContainer.appendChild(randomTheme);
  }

  lockCreation = true;
}

export { fillRandomThemes };