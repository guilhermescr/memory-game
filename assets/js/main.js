import { playSwapEffect, stopSwapEffect } from "./modules/m-audio/effects.mjs";
import { closeMenuButtons } from "./modules/menuActions.mjs";
import { showMenu, closeMenu } from "./modules/menuActions.mjs";
import { settingsOptions } from "./modules/menuActions.mjs";

const loaderContainer = document.getElementById('loader-container');
setTimeout(() => {
  loaderContainer.style.display = 'none';
}, 4000);

settingsOptions.forEach((setting) => {
  setting.addEventListener('click', showMenu);
});
closeMenuButtons.forEach((closeButton) => {
  closeButton.addEventListener('click', closeMenu);
});

settingsOptions.forEach((setting) => {
  setting.addEventListener('mouseenter', playSwapEffect);
});

settingsOptions.forEach((setting) => {
  setting.addEventListener('mouseleave', stopSwapEffect);
});
// End Switching