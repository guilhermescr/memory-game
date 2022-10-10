import {
  closeMenu,
  menuIsOpen,
  SETTINGS_BUTTONS
} from './modules/menuActions.mjs';
import { playHomeMusic } from './modules/Home.mjs';
import { MusicIsActive } from './modules/m-audio/audio.mjs';
import { BODY_CLASSLIST_TEMPLATE_OPTIONS } from './modules/templates/TemplatesData.mjs';
import { setCurrentTemplateImage } from './modules/templates/TemplatesAlgorithm.mjs';
import { endLogin } from './modules/auth/LoginService.mjs';

const CLICK_ON_WINDOW_CONTAINER = document.querySelector(
  '#click_on_window_message'
);
const LOADER_CONTAINER = document.getElementById('loader-container');
const LOADER_TITLE = document.getElementById('loader-title');

function timeoutItems(functionItems) {
  if (typeof functionItems === 'function') {
    setTimeout(functionItems, 1200);
  }

  // when functionItems is an array
  if (typeof functionItems === 'object') {
    functionItems.forEach(func => {
      setTimeout(func, 1200);
    });
  }
}

function allowGameToStart() {
  setCurrentTemplateImage();

  if (MusicIsActive) {
    timeoutItems(playHomeMusic);
  }

  if (document.body.classList) {
    BODY_CLASSLIST_TEMPLATE_OPTIONS[document.body.classList[0]]();
  }
}

function renderClickOnWindowMessage() {
  document.body.appendChild(CLICK_ON_WINDOW_CONTAINER);
}

function renderLoaderContainer(loaderMessage) {
  document.body.appendChild(LOADER_CONTAINER);

  if (loaderMessage) {
    LOADER_TITLE.innerHTML = loaderMessage;
  } else {
    LOADER_TITLE.innerHTML = 'Loading...';
  }
  timeoutItems(removeLoaderContainer);
}

function removeLoaderContainer() {
  document.body.removeChild(LOADER_CONTAINER);
}

function removeClickOnWindowMessage() {
  document.body.removeChild(CLICK_ON_WINDOW_CONTAINER);
}

CLICK_ON_WINDOW_CONTAINER.onclick = () => {
  removeClickOnWindowMessage();
  allowGameToStart();
};

const ROOT_ELEMENT = document.documentElement; // <- <html> tag
const FULLSCREEN_BUTTON = document.querySelector(
  '.toggleFullscreenIcon_container'
);
const MAXIMIZE_FULLSCREEN_ICON = `
<svg
      class="toggleFullscreenIcon"
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 384.97 384.97"
      style="enable-background: new 0 0 384.97 384.97"
      xml:space="preserve"
    >
      <g>
        <g id="Fullscreen">
          <path
            d="M384.97,12.03c0-6.713-5.317-12.03-12.03-12.03H264.847c-6.833,0-11.922,5.39-11.934,12.223
			c0,6.821,5.101,11.838,11.934,11.838h96.062l-0.193,96.519c0,6.833,5.197,12.03,12.03,12.03c6.833-0.012,12.03-5.197,12.03-12.03
			l0.193-108.369c0-0.036-0.012-0.06-0.012-0.084C384.958,12.09,384.97,12.066,384.97,12.03z"
          />
          <path
            d="M120.496,0H12.403c-0.036,0-0.06,0.012-0.096,0.012C12.283,0.012,12.247,0,12.223,0C5.51,0,0.192,5.317,0.192,12.03
			L0,120.399c0,6.833,5.39,11.934,12.223,11.934c6.821,0,11.838-5.101,11.838-11.934l0.192-96.339h96.242
			c6.833,0,12.03-5.197,12.03-12.03C132.514,5.197,127.317,0,120.496,0z"
          />
          <path
            d="M120.123,360.909H24.061v-96.242c0-6.833-5.197-12.03-12.03-12.03S0,257.833,0,264.667v108.092
			c0,0.036,0.012,0.06,0.012,0.084c0,0.036-0.012,0.06-0.012,0.096c0,6.713,5.317,12.03,12.03,12.03h108.092
			c6.833,0,11.922-5.39,11.934-12.223C132.057,365.926,126.956,360.909,120.123,360.909z"
          />
          <path
            d="M372.747,252.913c-6.833,0-11.85,5.101-11.838,11.934v96.062h-96.242c-6.833,0-12.03,5.197-12.03,12.03
			s5.197,12.03,12.03,12.03h108.092c0.036,0,0.06-0.012,0.084-0.012c0.036-0.012,0.06,0.012,0.096,0.012
			c6.713,0,12.03-5.317,12.03-12.03V264.847C384.97,258.014,379.58,252.913,372.747,252.913z"
          />
        </g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
      </g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
    </svg>
`;
const MINIMIZE_FULLSCREEN_ICON = `
<svg
      class="toggleFullscreenIcon"
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 385.331 385.331"
      style="enable-background: new 0 0 385.331 385.331"
      xml:space="preserve"
    >
      <g>
        <g id="Fullscreen_Exit">
          <path
            d="M264.943,156.665h108.273c6.833,0,11.934-5.39,11.934-12.211c0-6.833-5.101-11.85-11.934-11.838h-96.242V36.181
			c0-6.833-5.197-12.03-12.03-12.03s-12.03,5.197-12.03,12.03v108.273c0,0.036,0.012,0.06,0.012,0.084
			c0,0.036-0.012,0.06-0.012,0.096C252.913,151.347,258.23,156.677,264.943,156.665z"
          />
          <path
            d="M120.291,24.247c-6.821,0-11.838,5.113-11.838,11.934v96.242H12.03c-6.833,0-12.03,5.197-12.03,12.03
			c0,6.833,5.197,12.03,12.03,12.03h108.273c0.036,0,0.06-0.012,0.084-0.012c0.036,0,0.06,0.012,0.096,0.012
			c6.713,0,12.03-5.317,12.03-12.03V36.181C132.514,29.36,127.124,24.259,120.291,24.247z"
          />
          <path
            d="M120.387,228.666H12.115c-6.833,0.012-11.934,5.39-11.934,12.223c0,6.833,5.101,11.85,11.934,11.838h96.242v96.423
			c0,6.833,5.197,12.03,12.03,12.03c6.833,0,12.03-5.197,12.03-12.03V240.877c0-0.036-0.012-0.06-0.012-0.084
			c0-0.036,0.012-0.06,0.012-0.096C132.418,233.983,127.1,228.666,120.387,228.666z"
          />
          <path
            d="M373.3,228.666H265.028c-0.036,0-0.06,0.012-0.084,0.012c-0.036,0-0.06-0.012-0.096-0.012
			c-6.713,0-12.03,5.317-12.03,12.03v108.273c0,6.833,5.39,11.922,12.223,11.934c6.821,0.012,11.838-5.101,11.838-11.922v-96.242
			H373.3c6.833,0,12.03-5.197,12.03-12.03S380.134,228.678,373.3,228.666z"
          />
        </g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
      </g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
    </svg>
`;

/* page starts with maximize fullscreen icon */
FULLSCREEN_BUTTON.innerHTML = MAXIMIZE_FULLSCREEN_ICON;

function toggleFullscreenMode() {
  let isMaximizeFullscreen = FULLSCREEN_BUTTON.classList.contains(
    'fullscreenActivated'
  );

  // turn on fullscreen mode
  if (!isMaximizeFullscreen) {
    FULLSCREEN_BUTTON.innerHTML = MINIMIZE_FULLSCREEN_ICON;

    ROOT_ELEMENT.requestFullscreen();
  } else {
    // turn off fullscreen mode
    FULLSCREEN_BUTTON.innerHTML = MAXIMIZE_FULLSCREEN_ICON;

    document.exitFullscreen();
  }
  FULLSCREEN_BUTTON.classList.toggle('fullscreenActivated');
}

FULLSCREEN_BUTTON.addEventListener('click', toggleFullscreenMode);

function handleKeydownEvent(keydown) {
  if (keydown === 'f') {
    toggleFullscreenMode();
  }

  if (keydown === 'Escape' && menuIsOpen) {
    closeMenu();
  }
}

function revealElements(elements) {
  if (elements.length !== undefined) {
    elements.forEach(element => {
      element.classList.remove('hide');
    });
    return;
  }
  elements.classList.remove('hide');
}

function hideElements(elements) {
  if (elements.length !== undefined) {
    elements.forEach(element => {
      element.classList.add('hide');
    });
    return;
  }
  elements.classList.add('hide');
}

document.body.onload = () => {
  removeLoaderContainer();
  removeClickOnWindowMessage();
  hideElements(document.querySelector('.toggleFullscreenIcon_container'));
};

export {
  timeoutItems,
  allowGameToStart,
  renderClickOnWindowMessage,
  renderLoaderContainer,
  revealElements,
  hideElements,
  handleKeydownEvent
};
