import {
  setBirdPosition,
  SETTINGS_BUTTONS,
  startBirdAnimation
} from './modules/menuActions.mjs';
import { playHomeMusic } from './modules/Home.mjs';

const LOADER_CONTAINER = document.getElementById('loader-container');
const LOADER_TITLE = document.getElementById('loader-title');

function timeoutFunctionForTwoSeconds(functionInputs) {
  if (typeof functionInputs === 'function') {
    setTimeout(functionInputs, 2000);
  }
  if (typeof functionInputs === 'object') {
    functionInputs.forEach(func => {
      setTimeout(func, 2000);
    });
  }
}

function allowGameToStart() {
  document.querySelector('#click_on_window_message').style.display = 'none';
  renderLoaderContainer();
  timeoutFunctionForTwoSeconds([
    playHomeMusic,
    startBirdAnimation,
    setBirdPosition
  ]);
}

function renderLoaderContainer(loaderMessage) {
  LOADER_CONTAINER.style.display = '';
  LOADER_CONTAINER.style.display = 'flex';

  if (loaderMessage) {
    LOADER_TITLE.innerHTML = loaderMessage;
  } else {
    LOADER_TITLE.innerHTML = 'Loading...';
  }

  timeoutFunctionForTwoSeconds(() => {
    LOADER_CONTAINER.style.display = 'none';
  });
}

const ROOT_ELEMENT = document.documentElement; // <- <html> tag
const FULLSCREEN_BUTTON = document.querySelector('.toggleFullscreenIcon');
const MAXIMIZE_FULLSCREEN_ICON =
  '../src/assets/images/icons/maximize_fullscreen.svg';
const MINIMIZE_FULLSCREEN_ICON =
  '../src/assets/images/icons/minimize_fullscreen.svg';

function toggleFullscreenMode() {
  let isMaximizeFullscreen = FULLSCREEN_BUTTON.classList.contains(
    'fullscreenActivated'
  );

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

  key === 'F11' ? event.preventDefault() : null;

  if (key === 'f') {
    toggleFullscreenMode();
  }
});

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

document.querySelector('#click_on_window_message').onclick = allowGameToStart;
window.onresize = setBirdPosition;

export {
  timeoutFunctionForTwoSeconds,
  renderLoaderContainer,
  revealElements,
  hideElements
};
