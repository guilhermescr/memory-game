import { themes } from "../m-themes/themesList.mjs";
import { btnThemeId } from "../m-themes/themesCards.mjs";

function playSoundTrack() {
  let audioElement = document.getElementById('themeMusic');
  let audioSource = document.getElementById('themeSoundTrack');
  // Fix this later (I mean, don't use a fixed value)
  audioSource.src = themes[btnThemeId].soundTracks.gilmoreGirlsTheme;
  audioElement.load();
  audioElement.play();
}

export { playSoundTrack };