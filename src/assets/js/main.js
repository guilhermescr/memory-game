import { SETTINGS_OPTIONS } from "./modules/menuActions.mjs";

const LOADER_CONTAINER = document.getElementById('loader-container');
setTimeout(() => {
  LOADER_CONTAINER.style.display = 'none';
}, 3000);