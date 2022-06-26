import { themesKeys } from './themesList.mjs';

class Card {
  constructor(backgroundColor, frontFace, backFace) {
    this.backgroundColor = backgroundColor;
    this.frontFace = frontFace;
    this.backFace = backFace;
  }
}

let themesCards = {};
for (let i = 0; i < themesKeys.length; i++) {
  const card = new Card();
  themesCards[themesKeys[i]] = card;
}

export { themesKeys };