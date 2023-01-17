import { hideElements, revealElements } from '../../../main.js';

const GENERAL_INFO_CONTAINER = document.querySelector(
  '.general-info-container'
);
const ACHIEVEMENTS_CONTAINER = document.querySelector(
  '.achievements-container'
);

const OPEN_ACHIEVEMENTS_BUTTON = document.getElementById(
  'open-achievements-button'
);

function showAchievementsSection() {
  if (ACHIEVEMENTS_CONTAINER.classList.contains('hide')) {
    hideElements(GENERAL_INFO_CONTAINER);
    revealElements(ACHIEVEMENTS_CONTAINER);
  }
}

OPEN_ACHIEVEMENTS_BUTTON.addEventListener('click', showAchievementsSection);
