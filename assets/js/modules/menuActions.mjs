import { playClickEffect } from './effects.mjs';
import { fillThemes } from './themesCreation.mjs';
import { shuffleThemes } from './shuffleThemes.mjs';

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

const playRandomTheme = document.getElementById('playRandomThemeBtn');
playRandomTheme.addEventListener('click', shuffleThemes);

export { settingsOptions, closeMenuButtons, showMenu, closeMenu };