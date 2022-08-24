import { playSwapSoundEffect, stopSwapSoundEffect } from "./modules/m-audio/sounds.mjs";
import { CLOSE_MENU_BUTTONS } from "./modules/menuActions.mjs";
import { openMenu, closeMenu } from "./modules/menuActions.mjs";
import { SETTINGS_OPTIONS } from "./modules/menuActions.mjs";

const LOADER_CONTAINER = document.getElementById('loader-container');
setTimeout(() => {
  LOADER_CONTAINER.style.display = 'none';
}, 3000);

SETTINGS_OPTIONS.forEach((setting) => {
  setting.addEventListener('click', openMenu);
});

CLOSE_MENU_BUTTONS.forEach((closeButton) => {
  closeButton.addEventListener('click', closeMenu);
});

// Hover Sounds
SETTINGS_OPTIONS.forEach((setting) => {
  setting.addEventListener('mouseenter', playSwapSoundEffect);
});

SETTINGS_OPTIONS.forEach((setting) => {
  setting.addEventListener('mouseleave', stopSwapSoundEffect);
});