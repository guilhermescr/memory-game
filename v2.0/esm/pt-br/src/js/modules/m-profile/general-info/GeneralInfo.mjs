import { hideElements, revealElements } from '../../../main.js';

const ACHIEVEMENTS_CONTAINER = document.querySelector('.achievements-section');
const GENERAL_INFO_CONTAINER = document.querySelector(
  '.general-info-container'
);
const OPEN_ACHIEVEMENTS_BUTTON = document.getElementById(
  'open-achievements-button'
);
const OPEN_GENERAL_INFO_BUTTON = document.getElementById(
  'open-general-info-button'
);

function showGeneralInfoSection() {
  if (GENERAL_INFO_CONTAINER.classList.contains('hide')) {
    OPEN_GENERAL_INFO_BUTTON.classList.add('profile-info-option--active');
    OPEN_ACHIEVEMENTS_BUTTON.classList.remove('profile-info-option--active');
    revealElements(GENERAL_INFO_CONTAINER);
    hideElements(ACHIEVEMENTS_CONTAINER);
  }
}

OPEN_GENERAL_INFO_BUTTON.addEventListener('click', showGeneralInfoSection);
