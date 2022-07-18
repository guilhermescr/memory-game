import { themes } from "../m-themes/themesList.mjs";
import { btnThemeId } from "../m-themes/themesCards.mjs";

const activateMusic = document.querySelectorAll('.playMusicIcon');
const muteMusic = document.querySelectorAll('.stopMusicIcon');
let audioElement = document.getElementById('themeMusic');
let audioSource = document.getElementById('themeSoundTrack');

function playSoundTrack(themeId) {
  audioSource.src = themes[themeId].soundTracks.Default;
  audioElement.load();
  audioElement.play();
}

function stopSoundTrack() {
  audioSource.src = '';
  audioElement.pause();
}

function showPlayMusicIcon() {
  this.classList.remove('activeMusicIcon');
  activateMusic.forEach((activateMusicIcon) => {
    activateMusicIcon.classList.add('activeMusicIcon');
  });
  playSoundTrack(btnThemeId);
}

function showMuteMusicIcon() {
  this.classList.remove('activeMusicIcon');
  muteMusic.forEach((muteMusicIcon) => {
    muteMusicIcon.classList.add('activeMusicIcon');
  });
  stopSoundTrack();
}

activateMusic.forEach((activateMusicIcon) => {
  activateMusicIcon.addEventListener('click', showMuteMusicIcon);
});
muteMusic.forEach((muteMusicIcon) => {
  muteMusicIcon.addEventListener('click', showPlayMusicIcon);
});

export { playSoundTrack };