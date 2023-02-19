import {
  hideElements,
  revealElements,
  renderClickOnWindowMessage
} from '../../main.js';
import {
  resetBirdAnimation,
  setBirdPosition,
  startBirdAnimation
} from '../animations/forest_theme/BirdAnimation.mjs';
import {
  resetArmySoldiersAnimation,
  startArmySoldiersAnimation
} from '../animations/military_template/ArmySoldiersAnimation.js';
import {
  getViewportWidthToAdjustRainbowPosition,
  resetUnicornAnimation
} from '../animations/rainbow_template/UnicornAnimation.mjs';
import {
  closeEditAccountMenu,
  updateAccount
} from '../auth/AccountMethods.mjs';
import { stopHomeMusic } from '../Home.mjs';
import {
  changeExpProgressBarWidth,
  isExpProgressBarWidthUpdated
} from '../m-profile/LevelUp.mjs';
import { closeMenu } from '../MenuActions.mjs';
import { TEMPLATES_DATA, TEMPLATES_KEYS } from './TemplatesData.mjs';

const HOME_SETTINGS_RETURN_ICON = document.querySelector(
  '.home-settings-container .return-icon-container__return-icon'
);
const HOME_SETTINGS_TITLE = document.querySelector('#home-settings-title');
const CURRENT_TEMPLATE_IMAGE = document.querySelector(
  '#current-template-image'
);
const CHANGE_TEMPLATE_BUTTON = document.querySelector(
  '#change-current-template-button'
);
const TEMPLATES_CONTAINER = document.querySelector('.templates');
let currentTemplate;

// add current template image in home settings menu
function setCurrentTemplateImage() {
  TEMPLATES_KEYS.forEach((_, TEMPLATE_KEY) => {
    const { TemplateStyles } = TEMPLATES_DATA[TEMPLATES_KEYS[TEMPLATE_KEY]];
    const { src, alt } =
      TEMPLATES_DATA[TEMPLATES_KEYS[TEMPLATE_KEY]].MenuTemplate;

    if (TemplateStyles === document.body.classList[0]) {
      currentTemplate = TEMPLATES_KEYS[TEMPLATE_KEY];
      CURRENT_TEMPLATE_IMAGE.src = src;
      CURRENT_TEMPLATE_IMAGE.alt = alt;
      return;
    }
  });
}

function changeCurrentTemplate(templateClass) {
  document.body.classList = '';
  document.body.classList.add(templateClass);
}

function createTemplates() {
  for (
    let templateIndex = 0;
    templateIndex < TEMPLATES_KEYS.length;
    templateIndex++
  ) {
    const { TemplateStyles } = TEMPLATES_DATA[TEMPLATES_KEYS[templateIndex]];
    const { src, alt } =
      TEMPLATES_DATA[TEMPLATES_KEYS[templateIndex]].MenuTemplate;

    let template = document.createElement('div');
    template.classList.add('template');

    template.innerHTML = `
    <h3>${TEMPLATES_KEYS[templateIndex].replace('Template', ' Template')}</h3>
    <img
      class="template-image"
      src=${src}
      alt=${alt}
    />
    <button id="${
      TEMPLATES_KEYS[templateIndex]
    }" class="change-template-button" type="button">Change</button>
    `;
    TEMPLATES_CONTAINER.appendChild(template);

    document
      .querySelector(`#${TEMPLATES_KEYS[templateIndex]}`)
      .addEventListener('click', event => {
        event.preventDefault();
        changeCurrentTemplate(TemplateStyles);
        setCurrentTemplateImage();
        updateAccount(['CurrentTemplate'], TemplateStyles);
        showSettingsMenu();
        closeMenu();
        stopHomeMusic();
        renderClickOnWindowMessage();
      });
  }
}

function showTemplatesInMenu() {
  HOME_SETTINGS_TITLE.innerHTML = 'Templates';
  hideElements([
    document.querySelector('.current-template'),
    document.querySelector('.audio-container'),
    document.querySelector('.open-profile-menu')
  ]);
  createTemplates();
  revealElements([HOME_SETTINGS_RETURN_ICON, TEMPLATES_CONTAINER]);
}

function showSettingsMenu() {
  closeEditAccountMenu();

  hideElements([
    TEMPLATES_CONTAINER,
    HOME_SETTINGS_RETURN_ICON,
    document.querySelector('.profile-menu')
  ]);
  revealElements([
    document.querySelector('.current-template'),
    document.querySelector('.audio-container'),
    document.querySelector('.open-profile-menu')
  ]);
  TEMPLATES_CONTAINER.innerHTML = '';
  HOME_SETTINGS_TITLE.innerHTML = 'Settings';
}

function showUserProfileInfo() {
  hideElements([
    document.querySelector('.current-template'),
    document.querySelector('.audio-container'),
    document.querySelector('.open-profile-menu')
  ]);
  revealElements([
    HOME_SETTINGS_RETURN_ICON,
    document.querySelector('.profile-menu')
  ]);

  HOME_SETTINGS_TITLE.innerHTML = 'Profile Info';

  if (!isExpProgressBarWidthUpdated.state) {
    changeExpProgressBarWidth(isExpProgressBarWidthUpdated.width === 100);
  }
}

function addForestTemplateChanges() {
  stopAllTemplateAnimations();

  startBirdAnimation();
  window.addEventListener('resize', setBirdPosition);
}

function addRainbowTemplateChanges() {
  stopAllTemplateAnimations();

  // it starts the animation too
  getViewportWidthToAdjustRainbowPosition();
}

function addMilitaryTemplateChanges() {
  stopAllTemplateAnimations();

  startArmySoldiersAnimation();
}

function stopAllTemplateAnimations() {
  resetBirdAnimation();
  resetArmySoldiersAnimation();
  resetUnicornAnimation();
}

const BODY_CLASSLIST_TEMPLATE_OPTIONS = {
  forest_template: addForestTemplateChanges,
  rainbow_template: addRainbowTemplateChanges,
  military_template: addMilitaryTemplateChanges
};

HOME_SETTINGS_RETURN_ICON.onclick = showSettingsMenu;

CURRENT_TEMPLATE_IMAGE.onclick = showTemplatesInMenu;
CHANGE_TEMPLATE_BUTTON.onclick = showTemplatesInMenu;

document
  .querySelector('.open-profile-menu')
  .addEventListener('click', event => {
    if (event.target.id !== 'logout-button') {
      showUserProfileInfo();
    }
  });

export {
  currentTemplate,
  setCurrentTemplateImage,
  changeCurrentTemplate,
  showSettingsMenu,
  stopAllTemplateAnimations,
  BODY_CLASSLIST_TEMPLATE_OPTIONS
};
