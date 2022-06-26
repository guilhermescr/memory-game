import { themesKeys } from './themesList.mjs';

let themesId = [];

function registerThemesId(themeId) {
  themesId.push(themeId);
}

export { themesKeys, registerThemesId };