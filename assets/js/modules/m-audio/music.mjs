import { themes } from "../m-themes/themesData.mjs";
import { btnThemeId } from "../m-themes/addCards.mjs";

const activateMusic = document.querySelectorAll('.playMusicIcon');
const muteMusic = document.querySelectorAll('.stopMusicIcon');
const AUDIO_TAG = document.getElementById('themeMusic');
const AUDIO_SOURCE_TAG = document.getElementById('themeSoundTrack');

function getPlayMusicButtons() {
  const playMusicButtons = document.querySelectorAll('.playMusic');

  playMusicButtons.forEach((playMusicButton) => {
    playMusicButton.addEventListener('click', function() {
      playSoundTrack(this);
    });
  });
}

function renderPlayMusicButtons() {
  const musicButtonsContainer = document.querySelector(".music-options");

  if (themes[btnThemeId].soundTracks.Music1) {
    musicButtonsContainer.innerHTML += `
    <div class="music">
      <button data-music="Music1" class="playMusic">Music 1</button>
    </div>
    `;
  }
  if (themes[btnThemeId].soundTracks.Music2) {
    musicButtonsContainer.innerHTML += `
    <div class="music">
      <button data-music="Music2" class="playMusic">Music 2</button>
    </div>
    `;
  }
  if (themes[btnThemeId].soundTracks.Music3) {
    musicButtonsContainer.innerHTML += `
    <div class="music">
      <button data-music="Music3" class="playMusic">Music 3</button>
    </div>
    `;
  }
  getPlayMusicButtons();
}

function playSoundTrack(playMusicButton) {
  let chosenMusic = playMusicButton.dataset.music;
  AUDIO_SOURCE_TAG.src = themes[btnThemeId].soundTracks[chosenMusic];
  AUDIO_TAG.load();
  AUDIO_TAG.play();
}

function playDefaultSoundTrack() {
  AUDIO_SOURCE_TAG.src = themes[btnThemeId].soundTracks.Music1;
  AUDIO_TAG.load();
  AUDIO_TAG.play();
}

function stopSoundTrack() {
  AUDIO_SOURCE_TAG.src = '';
  AUDIO_TAG.pause();
}

function showPlayMusicIcon() {
  this.classList.remove('activeMusicIcon');
  activateMusic.forEach((activateMusicIcon) => {
    activateMusicIcon.classList.add('activeMusicIcon');
  });
  playDefaultSoundTrack();
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

export { renderPlayMusicButtons, playSoundTrack, playDefaultSoundTrack };