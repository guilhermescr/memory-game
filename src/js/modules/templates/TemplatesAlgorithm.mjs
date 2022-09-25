import { hideElements } from "../../main.js";
import TEMPLATES_DATA from "./TemplatesData.mjs";

const CURRENT_TEMPLATE_IMAGE = document.querySelector('#currentTemplateImage');
const CHANGE_TEMPLATE_BUTTON = document.querySelector('#changeTemplateButton');
const DEFAULT_TEMPLATE_IMAGE = TEMPLATES_DATA.ForestTemplate.CurrentTemplate;

function showCurrentTemplateImage() {
  CURRENT_TEMPLATE_IMAGE.src = DEFAULT_TEMPLATE_IMAGE;
}

function changeTemplate() {
  alert('Pardon me, but this feature is not implemented yet!');
  // hideElements([document.querySelector('.templates_container'), document.querySelector('.audio-container')]);
}

CHANGE_TEMPLATE_BUTTON.onclick = changeTemplate;

export { showCurrentTemplateImage };