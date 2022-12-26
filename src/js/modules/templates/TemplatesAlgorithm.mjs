import {
  hideElements,
  revealElements,
  renderClickOnWindowMessage
} from '../../main.js';
import { updateAccount } from '../auth/AccountMethods.mjs';
import { stopHomeMusic } from '../Home.mjs';
import { closeMenu } from '../menuActions.mjs';
import { TEMPLATES_DATA, TEMPLATES_KEYS } from './TemplatesData.mjs';

const HOME_SETTINGS_RETURN_ICON = document.querySelector(
  '.home_settings_container .return-icon'
);
const HOME_SETTINGS_TITLE = document.querySelector('#home_settings_title');
const CURRENT_TEMPLATE_IMAGE = document.querySelector('#currentTemplateImage');
const CHANGE_TEMPLATE_BUTTON = document.querySelector(
  '#changeCurrentTemplateButton'
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

    // if (!src) return;

    let template = document.createElement('div');
    template.classList.add('template');

    template.innerHTML = `
    <h3>${TEMPLATES_KEYS[templateIndex].replace('Template', ' Template')}</h3>
    <img
      class="templateImage"
      src=${src}
      alt=${alt}
    />
    <button id="${
      TEMPLATES_KEYS[templateIndex]
    }" class="changeTemplateButton" type="button">Change</button>
    `;
    TEMPLATES_CONTAINER.appendChild(template);

    document
      .querySelector(`#${TEMPLATES_KEYS[templateIndex]}`)
      .addEventListener('click', event => {
        event.preventDefault();
        changeCurrentTemplate(TemplateStyles);
        setCurrentTemplateImage();
        updateAccount(['CurrentTemplate'], document.body.classList[0]);
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
    document.querySelector('.templates_container'),
    document.querySelector('.audio-container'),
    document.querySelector('.open_profile_menu')
  ]);
  HOME_SETTINGS_RETURN_ICON.style.display = 'block';
  createTemplates();
  revealElements(TEMPLATES_CONTAINER);
}

function showSettingsMenu() {
  hideElements([TEMPLATES_CONTAINER, document.querySelector('.profile_menu')]);
  revealElements([
    document.querySelector('.templates_container'),
    document.querySelector('.audio-container'),
    document.querySelector('.open_profile_menu')
  ]);
  TEMPLATES_CONTAINER.innerHTML = '';
  HOME_SETTINGS_TITLE.innerHTML = 'Settings';
  HOME_SETTINGS_RETURN_ICON.style.display = 'none';
}

function showUserProfileInfo() {
  hideElements([
    document.querySelector('.templates_container'),
    document.querySelector('.audio-container'),
    document.querySelector('.open_profile_menu')
  ]);
  revealElements(document.querySelector('.profile_menu'));

  HOME_SETTINGS_TITLE.innerHTML = 'Profile Info';
  HOME_SETTINGS_RETURN_ICON.style.display = 'block';
}

HOME_SETTINGS_RETURN_ICON.onclick = showSettingsMenu;

CHANGE_TEMPLATE_BUTTON.onclick = showTemplatesInMenu;

document.querySelector('.open_profile_menu').onclick = showUserProfileInfo;

export { currentTemplate, setCurrentTemplateImage, changeCurrentTemplate };
