import { playClickEffect } from './m-audio/effects.mjs';
import { fillThemes } from './m-themes/themesCreation.mjs';
import { shuffleRandomThemes } from './randomThemes/shuffleRandomThemes.mjs';
import { fillRandomThemes } from './randomThemes/fillRandomThemes.mjs';

const settingsMenus = document.querySelectorAll('.menu');
const settingsOptions = document.querySelectorAll('.setting-option');
const closeMenuButtons = document.querySelectorAll('.close-icon');

function showMenu() {
  playClickEffect();

  for (let i = 0; i < settingsOptions.length; i++) {
    if (this.dataset.setting == settingsMenus[i].dataset.setting) {
      settingsMenus[i].classList.add('show');
    }
    settingsOptions[i].style.cursor = 'default';
  }
}

function closeMenu() {
  settingsMenus.forEach((menu, index) => {
    if (menu.classList.contains('show')) {
      menu.classList.remove('show');
    }
    settingsOptions[index].style.cursor = 'pointer';
  });
}

const playGame = document.getElementById('playBtn');
playGame.addEventListener('click', fillThemes);

const playRandomThemesBtn = document.getElementById('playRandomThemesBtn');
playRandomThemesBtn.addEventListener('click', fillRandomThemes);

const shuffleThemesBtn = document.getElementById('playRandomThemeBtn');
shuffleThemesBtn.addEventListener('click', shuffleRandomThemes);

export { settingsOptions, closeMenuButtons, showMenu, closeMenu };