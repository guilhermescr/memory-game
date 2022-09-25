import { hideElements, revealElements } from '../../main.js';
import TEMPLATES_DATA from './TemplatesData.mjs';

const CURRENT_TEMPLATE_IMAGE = document.querySelector('#currentTemplateImage');
const CHANGE_TEMPLATE_BUTTON = document.querySelector(
  '#changeCurrentTemplateButton'
);
const DEFAULT_TEMPLATE_IMAGE = TEMPLATES_DATA.ForestTemplate.CurrentTemplate;

const HOME_SETTINGS_RETURN_ICON = document.querySelector(
  '.home_settings_container .return-icon'
);
const HOME_SETTINGS_TITLE = document.querySelector('#home_settings_title');

function showCurrentTemplateImage() {
  CURRENT_TEMPLATE_IMAGE.src = DEFAULT_TEMPLATE_IMAGE;
}

function changeTemplate() {
  // alert('Pardon me, but this feature is not implemented yet!');
  HOME_SETTINGS_TITLE.innerHTML = 'Templates';
  hideElements([
    document.querySelector('.templates_container'),
    document.querySelector('.audio-container')
  ]);
  revealElements(document.querySelector('.templates'));
  HOME_SETTINGS_RETURN_ICON.style.display = 'block';
}

function hideTemplates() {
  HOME_SETTINGS_TITLE.innerHTML = 'Settings';
  HOME_SETTINGS_RETURN_ICON.style.display = 'none';
  hideElements(document.querySelector('.templates'));
  revealElements([
    document.querySelector('.templates_container'),
    document.querySelector('.audio-container')
  ]);
}

HOME_SETTINGS_RETURN_ICON.onclick = hideTemplates;

CHANGE_TEMPLATE_BUTTON.onclick = changeTemplate;

export { showCurrentTemplateImage };
