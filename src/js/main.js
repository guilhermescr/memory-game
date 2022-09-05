import { SETTINGS_BUTTONS } from "./modules/menuActions.mjs";

const LOADER_CONTAINER = document.getElementById('loader-container');
const LOADER_TITLE = document.getElementById('loader-title');

function renderLoaderContainer(loaderMessage) {
  LOADER_CONTAINER.style.display = '';
  LOADER_CONTAINER.style.display = 'flex';

  if (loaderMessage) {
    LOADER_TITLE.innerHTML = loaderMessage;
  }

  setTimeout(() => {
    LOADER_CONTAINER.style.display = 'none';
  }, 2000);
}

const ROOT_ELEMENT = document.documentElement; // <- <html> tag
const FULLSCREEN_BUTTON = document.querySelector('.toggleFullscreenIcon');
const MAXIMIZE_FULLSCREEN_ICON = '../src/assets/images/icons/maximize_fullscreen.svg';
const MINIMIZE_FULLSCREEN_ICON = '../src/assets/images/icons/minimize_fullscreen.svg';

function toggleFullscreenMode() {
  let isMaximizeFullscreen = FULLSCREEN_BUTTON.classList.contains('fullscreenActivated');

  // turn on fullscreen mode
  if (!isMaximizeFullscreen) {
    FULLSCREEN_BUTTON.src = MINIMIZE_FULLSCREEN_ICON;

    ROOT_ELEMENT.requestFullscreen();
  } else {
    // turn off fullscreen mode
    FULLSCREEN_BUTTON.src = MAXIMIZE_FULLSCREEN_ICON;

    document.exitFullscreen();
  }
  FULLSCREEN_BUTTON.classList.toggle('fullscreenActivated');
}

FULLSCREEN_BUTTON.addEventListener('click', toggleFullscreenMode);

window.addEventListener('keydown', function (event) {
  let { key } = event;

  (key === "F11") ? event.preventDefault() : null;

  if (key === "f") {
    toggleFullscreenMode();
  }
});

function revealElements(elements) {
  if (elements.length !== undefined) {
    elements.forEach((element) => {
      element.classList.remove('hide');
    });
    return;
  }
  elements.classList.remove('hide');
}

function hideElements(elements) {
  if (elements.length !== undefined) {
    elements.forEach((element) => {
      element.classList.add('hide');
    });
    return;
  }
  elements.classList.add('hide');
}

renderLoaderContainer();

export { renderLoaderContainer, revealElements, hideElements };