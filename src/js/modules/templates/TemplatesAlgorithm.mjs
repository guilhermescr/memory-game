import { hideElements, revealElements } from '../../main.js';
import { TEMPLATES_DATA, TEMPLATES_KEYS } from './TemplatesData.mjs';

const HOME_SETTINGS_RETURN_ICON = document.querySelector(
  '.home_settings_container .return-icon'
);
const HOME_SETTINGS_TITLE = document.querySelector('#home_settings_title');
const CURRENT_TEMPLATE_IMAGE = document.querySelector('#currentTemplateImage');
const CHANGE_TEMPLATE_BUTTON = document.querySelector(
  '#changeCurrentTemplateButton'
);
const DEFAULT_TEMPLATE_IMAGE = TEMPLATES_DATA.ForestTemplate.MenuTemplate.src;
const TEMPLATES_CONTAINER = document.querySelector('.templates');

function showCurrentTemplateImage(templateImage) {
  console.log(templateImage);
  if (templateImage) {
    CURRENT_TEMPLATE_IMAGE.src = templateImage;
    return;
  }
  CURRENT_TEMPLATE_IMAGE.src = DEFAULT_TEMPLATE_IMAGE;
}

function changeCurrentTemplate(templateClass, templateImage) {
  document.body.classList = '';
  document.body.classList.add(templateClass);
  showCurrentTemplateImage(templateImage)
}

function createTemplates() {
  for (let templateIndex = 0; templateIndex < TEMPLATES_KEYS.length; templateIndex++) {
    if (!TEMPLATES_DATA[TEMPLATES_KEYS[templateIndex]].MenuTemplate.src) return;

    let template = document.createElement('div');
    template.classList.add('template');

    template.innerHTML = `
    <h3>${TEMPLATES_KEYS[templateIndex]}</h3>
    <img
      class="templateImage"
      src=${TEMPLATES_DATA[TEMPLATES_KEYS[templateIndex]].MenuTemplate.src}
      alt=${TEMPLATES_DATA[TEMPLATES_KEYS[templateIndex]].MenuTemplate.alt}
    />
    <button id="${TEMPLATES_KEYS[templateIndex]}" class="changeTemplateButton" type="button">Change</button>
    `;
    TEMPLATES_CONTAINER.appendChild(template);

    document.querySelector(`#${TEMPLATES_KEYS[templateIndex]}`).addEventListener('click', (event) => {
      event.preventDefault();
      changeCurrentTemplate(TEMPLATES_DATA[TEMPLATES_KEYS[templateIndex]].TemplateStyles, TEMPLATES_DATA[TEMPLATES_KEYS[templateIndex]].MenuTemplate.src);
      showSettingsMenu();
    });
  }
}

function showTemplatesInMenu() {
  HOME_SETTINGS_TITLE.innerHTML = 'Templates';
  hideElements([
    document.querySelector('.templates_container'),
    document.querySelector('.audio-container')
  ]);
  HOME_SETTINGS_RETURN_ICON.style.display = 'block';
  createTemplates();
  revealElements(TEMPLATES_CONTAINER);
}

function showSettingsMenu() {
  hideElements(TEMPLATES_CONTAINER);
  revealElements([
    document.querySelector('.templates_container'),
    document.querySelector('.audio-container')
  ]);
  TEMPLATES_CONTAINER.innerHTML = '';
  HOME_SETTINGS_TITLE.innerHTML = 'Settings';
  HOME_SETTINGS_RETURN_ICON.style.display = 'none';
}

HOME_SETTINGS_RETURN_ICON.onclick = showSettingsMenu;

CHANGE_TEMPLATE_BUTTON.onclick = showTemplatesInMenu;

export { showCurrentTemplateImage };
