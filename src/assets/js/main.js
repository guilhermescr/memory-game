import { SETTINGS_OPTIONS } from "./modules/menuActions.mjs";

const LOADER_CONTAINER = document.getElementById('loader-container');
setTimeout(() => {
  LOADER_CONTAINER.style.display = 'none';
}, 3000);

const ROOT_ELEMENT = document.documentElement; // <html> tag
const FULLSCREEN_BUTTON = document.querySelector('.toggleFullscreenIcon');
const MAXIMIZE_FULLSCREEN_ICON = "../src/assets/images/icons/maximize_fullscreen.svg";
const MINIMIZE_FULLSCREEN_ICON = "../src/assets/images/icons/minimize_fullscreen.svg";

function toggleFullscreenMode(eventKey) {
  let isMaximizeFullscreen = FULLSCREEN_BUTTON.classList.contains('fullscreenActivated');

  if (!isMaximizeFullscreen) {
    FULLSCREEN_BUTTON.src = MINIMIZE_FULLSCREEN_ICON;

    eventKey !== "F11" ? ROOT_ELEMENT.requestFullscreen() : null;
  } else {
    FULLSCREEN_BUTTON.src = MAXIMIZE_FULLSCREEN_ICON;

    eventKey !== "F11" ? document.exitFullscreen() : null;
  }
  FULLSCREEN_BUTTON.classList.toggle('fullscreenActivated');
}

FULLSCREEN_BUTTON.addEventListener('click', toggleFullscreenMode);

function checkFullscreenState() {
  let fullscreenActivated = (window.fullScreen) || (window.innerWidth == screen.width && window.innerHeight == screen.height);

  return fullscreenActivated ? true : false;
}

function handleF11AndEscKeysEvents(event) {
  let fullscreenActivated = checkFullscreenState();

  // It happens when fullscreen is activated
  if ((event.key === "Escape" && fullscreenActivated) || (event.key === "F11" && fullscreenActivated)) {
    toggleFullscreenMode(event.key);
  }

  // Turn Fullscreen Mode On
  if (event.key === "F11" && !fullscreenActivated) {
    toggleFullscreenMode(event.key);
  }
}

window.addEventListener('keydown', function (event) {
  handleF11AndEscKeysEvents(event);
});