import { revealElements, hideElements } from '../main.js';
import { fillThemes } from './m-themes/fillThemesInMenu.mjs';
import { fillRandomThemes } from './randomThemes/fillRandomThemes.mjs';
import { shuffleRandomThemes } from './randomThemes/shuffleRandomThemes.mjs';
import { playClickSoundEffect, playHoverSoundEffect, stopHoverSoundEffect } from './m-audio/audio.mjs';
import { startGame } from './gameAlgorithm.mjs'

const SETTINGS_MENUS = document.querySelectorAll('.menu');
const MENU_SETTINGS_OPTIONS = document.querySelectorAll('.setting-option');
const SETTINGS_BUTTONS = document.querySelectorAll('.settingButton');
const CLOSE_MENU_BUTTONS = document.querySelectorAll('.close-icon');
const TOP_BAR_CONTAINER = document.querySelector('.top_bar_container');

function toggleElementsDisplayState() {
  setTimeout(() => {
    startGame();

    let elementsToReveal = document.querySelectorAll('#score, #settingsIcon');
    let elementsToHide = document.querySelectorAll('.game-menu');

    revealElements(elementsToReveal);
    hideElements(elementsToHide);
  }, 2000);
}

function openMenu() {
  playClickSoundEffect();
  let buttonDataset = this.dataset.setting;
  
  for (let index = 0; index < SETTINGS_MENUS.length; index++) {
    if (buttonDataset === SETTINGS_MENUS[index].dataset.setting) {
      SETTINGS_MENUS[index].classList.add('show');
      SETTINGS_MENUS[index].style.pointerEvents = 'all';
      document.body.style.pointerEvents = 'none';
    }
  }
  if (buttonDataset === "ingame-settings") {
    TOP_BAR_CONTAINER.style.display = 'none';
  }
}

function closeMenu() {
  SETTINGS_MENUS.forEach((SETTINGS_MENU) => {
    if (SETTINGS_MENU.classList.contains('show')) {
      SETTINGS_MENU.classList.remove('show');
      SETTINGS_MENU.style.pointerEvents = '';
      document.body.style.pointerEvents = '';
    }

    if (SETTINGS_MENU.dataset.setting === "ingame-settings") {
      TOP_BAR_CONTAINER.style.display = 'flex';
    }
  });
}

const PLAY_GAME_BUTTON = document.getElementById('playBtn');
PLAY_GAME_BUTTON.addEventListener('click', fillThemes);

const PLAY_RANDOM_THEMES_BUTTON = document.getElementById('playRandomThemesBtn');
PLAY_RANDOM_THEMES_BUTTON.addEventListener('click', fillRandomThemes);

const SHUFFLE_THEMES_BUTTON = document.getElementById('playRandomThemeBtn');
SHUFFLE_THEMES_BUTTON.addEventListener('click', shuffleRandomThemes);

// Open / Close Menu

SETTINGS_BUTTONS.forEach((SETTING_BUTTON) => {
  SETTING_BUTTON.addEventListener('click', openMenu);
});

CLOSE_MENU_BUTTONS.forEach((CLOSE_MENU_BUTTON) => {
  CLOSE_MENU_BUTTON.addEventListener('click', closeMenu);
});

// Hover Sound Effects

MENU_SETTINGS_OPTIONS.forEach((SETTING_BUTTON) => {
  SETTING_BUTTON.addEventListener('mouseenter', playHoverSoundEffect);
});

MENU_SETTINGS_OPTIONS.forEach((SETTING_BUTTON) => {
  SETTING_BUTTON.addEventListener('mouseleave', stopHoverSoundEffect);
});

export { SETTINGS_BUTTONS, CLOSE_MENU_BUTTONS, openMenu, closeMenu, toggleElementsDisplayState };