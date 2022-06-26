import { themesKeys } from './themesList.mjs';

let themesId = [];
let themesCards = {};
const themesDifficultyLevels = {};


for (let i = 0; i < themesKeys.length; i++) {
  themesDifficultyLevels[themesKeys[i]] = {
    easy: '',
    normal: '',
    hard: '',
  };
}

class Card {
  constructor(backgroundColor, frontFace, backFace) {
    this.backgroundColor = backgroundColor;
    this.frontFace = frontFace;
    this.backFace = backFace;
  }
}

function registerThemesId(themeId) {
  themesId.push(themeId);
}

export { themesKeys, registerThemesId };