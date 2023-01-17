import { hideElements, revealElements } from '../../../main.js';

const ACHIEVEMENTS_CONTAINER = document.querySelector(
  '.achievements-container'
);
const GENERAL_INFO_CONTAINER = document.querySelector(
  '.general-info-container'
);
const OPEN_GENERAL_INFO_BUTTON = document.getElementById(
  'open-general-info-button'
);

function showGeneralInfoSection() {
  if (GENERAL_INFO_CONTAINER.classList.contains('hide')) {
    revealElements(GENERAL_INFO_CONTAINER);
    hideElements(ACHIEVEMENTS_CONTAINER);
  }
}

OPEN_GENERAL_INFO_BUTTON.addEventListener('click', showGeneralInfoSection);
