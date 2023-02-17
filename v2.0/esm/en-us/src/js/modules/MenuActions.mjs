import { fillThemes } from './m-themes/FillThemesInThemesContainer.mjs';
import { fillRandomThemes } from './m-random-themes/FillRandomThemes.mjs';
import { shuffleRandomThemes } from './m-random-themes/ShuffleRandomThemes.mjs';
import {
  playClickSoundEffect,
  playHoverSoundEffect,
  stopHoverSoundEffect
} from './m-audio/Audio.mjs';
import { showSettingsMenu } from './templates/TemplatesAlgorithm.mjs';
import { closeEditAccountMenu } from './auth/AccountMethods.mjs';
import { resetThemesContainerStyles } from './m-themes/ThemesDifficulties.mjs';

const SETTINGS_MENUS = document.querySelectorAll('.menu');
const MENU_SETTINGS_OPTIONS = document.querySelectorAll('.setting-option');
const SETTINGS_BUTTONS = document.querySelectorAll('.setting-button');
const CLOSE_MENU_BUTTONS = document.querySelectorAll(
  '.close-menu-container__close-icon'
);
const TOP_BAR_CONTAINER = document.querySelector('.top-bar-container');
let menuIsOpen = false;

function openMenu(dataset_name) {
  playClickSoundEffect();

  let buttonDataset;
  if (this) {
    buttonDataset = this.dataset.setting;
  } else {
    buttonDataset = dataset_name;
  }

  for (let index = 0; index < SETTINGS_MENUS.length; index++) {
    if (buttonDataset === SETTINGS_MENUS[index].dataset.setting) {
      SETTINGS_MENUS[index].classList.add('show');
      SETTINGS_MENUS[index].style.pointerEvents = 'all';
      document.body.style.pointerEvents = 'none';
      menuIsOpen = true;
    }
  }
  if (buttonDataset === 'ingame-settings') {
    TOP_BAR_CONTAINER.style.display = 'none';
  }
  if (buttonDataset === 'home-settings') {
    showSettingsMenu();
  }
}

function closeMenu() {
  SETTINGS_MENUS.forEach(SETTINGS_MENU => {
    if (SETTINGS_MENU.classList.contains('show')) {
      SETTINGS_MENU.classList.remove('show');
      SETTINGS_MENU.style.pointerEvents = '';
      document.body.style.pointerEvents = '';
      menuIsOpen = false;
    }

    if (SETTINGS_MENU.dataset.setting === 'ingame-settings') {
      TOP_BAR_CONTAINER.style.display = 'flex';
    }

    if (SETTINGS_MENU.dataset.setting === 'home-settings') {
      closeEditAccountMenu();
    }
  });
}

const PLAY_CLASSIC_MODE_BUTTON = document.getElementById(
  'play-classic-mode-button'
);
PLAY_CLASSIC_MODE_BUTTON.addEventListener('click', () => {
  closeMenu();
  fillThemes();
});

const PLAY_RANDOM_MODE_BUTTON = document.getElementById(
  'play-random-mode-button'
);
PLAY_RANDOM_MODE_BUTTON.addEventListener('click', () => {
  closeMenu();
  fillRandomThemes();
});

const SHUFFLE_THEMES_BUTTON = document.getElementById('shuffle-themes');
SHUFFLE_THEMES_BUTTON.addEventListener('click', shuffleRandomThemes);

document
  .querySelector('.random-themes-container .return-icon-container__return-icon')
  .addEventListener('click', () => {
    closeMenu();
    openMenu('play-game');
  });

document
  .querySelector('.themes-container .return-icon-container__return-icon')
  .addEventListener('click', () => {
    if (!document.querySelector('.themes').classList.contains('hide')) {
      closeMenu();
      openMenu('play-game');
    } else {
      resetThemesContainerStyles();
    }
  });

// Open / Close Menu
SETTINGS_BUTTONS.forEach(SETTING_BUTTON => {
  SETTING_BUTTON.addEventListener('click', openMenu);
});

CLOSE_MENU_BUTTONS.forEach(CLOSE_MENU_BUTTON => {
  CLOSE_MENU_BUTTON.addEventListener('click', closeMenu);
});

// Hover Sound Effects

MENU_SETTINGS_OPTIONS.forEach(SETTING_BUTTON => {
  SETTING_BUTTON.addEventListener('mouseenter', playHoverSoundEffect);
});

MENU_SETTINGS_OPTIONS.forEach(SETTING_BUTTON => {
  SETTING_BUTTON.addEventListener('mouseleave', stopHoverSoundEffect);
});

export {
  SETTINGS_BUTTONS,
  CLOSE_MENU_BUTTONS,
  openMenu,
  closeMenu,
  menuIsOpen
};
