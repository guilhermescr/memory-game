import { themes } from '../themesList.mjs';

let lockCreation = false;

function fillRandomThemes() {
  if (lockCreation) return;

  const randomThemesContainer = document.getElementById('random-themes-images');
  let randomThemesLogo = Object.values(themes);

  for (let i = 0; i < randomThemesLogo.length; i++) {
    let randomTheme = document.createElement('div');
    randomTheme.classList.add('random-theme');
    randomTheme.innerHTML = `${randomThemesLogo[i]}`;
    randomThemesContainer.appendChild(randomTheme);
  }

  lockCreation = true;
}

export { fillRandomThemes };