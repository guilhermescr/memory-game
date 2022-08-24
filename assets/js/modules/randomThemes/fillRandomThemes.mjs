import { themes, THEMES_LIST } from '../m-themes/themesData.mjs';

let lockCreation = false;

function fillRandomThemes() {
  if (lockCreation) return;

  const randomThemesContainer = document.getElementById('random-themes-images');
  let randomThemesLogos = [];

  for (let i = 0; i < THEMES_LIST.length; i++) {
    randomThemesLogos.push(themes[THEMES_LIST[i]].logo);

    let randomTheme = document.createElement('div');
    randomTheme.classList.add('random-theme');
    randomTheme.innerHTML = `${randomThemesLogos[i]}`;
    randomThemesContainer.appendChild(randomTheme);
  }

  lockCreation = true;
}

export { fillRandomThemes };