import { themes } from "../m-themes/themesData.mjs";
import { btnThemeId } from "../m-themes/addCards.mjs";

// PLAY MUSIC
const AUDIO_TAG = document.getElementById('themeMusic');
const AUDIO_SOURCE_TAG = document.getElementById('themeSoundTrack');

function getPlayMusicButtons() {
  const PLAY_MUSIC_BUTTONS = document.querySelectorAll('.playMusic');

  PLAY_MUSIC_BUTTONS.forEach((PLAY_MUSIC_BUTTON) => {
    PLAY_MUSIC_BUTTON.addEventListener('click', function() {
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
  AUDIO_TAG.pause();
  AUDIO_SOURCE_TAG.src = '';
}

// SOUND EFFECTS
const HOVER_SOUND_EFFECT = document.getElementById('hover-soundEffect');
const CLICK_SOUND_EFFECT = document.getElementById('click-setting-effect');

function playHoverSoundEffect() {
  HOVER_SOUND_EFFECT.load();
  HOVER_SOUND_EFFECT.play();
  console.clear();
}

function stopHoverSoundEffect() {
  HOVER_SOUND_EFFECT.pause();
}

function playClickSoundEffect() {
  HOVER_SOUND_EFFECT.pause();
  CLICK_SOUND_EFFECT.load();
  CLICK_SOUND_EFFECT.play();
}

// LISTENERS
const SWITCH_MUSIC_BUTTON = document.querySelector('.switchMusicButton');

function switchMusicButton() {
  let currenctMusicButtonState = SWITCH_MUSIC_BUTTON.innerHTML;
  const ON_BACKGROUND_IMAGE = "linear-gradient(#01baef 5%, #10bb9f)";
  const OFF_BACKGROUND_IMAGE = "linear-gradient(#2f4246 5%, #10bb9f)";

  if (currenctMusicButtonState == "On") {
    stopSoundTrack();
    SWITCH_MUSIC_BUTTON.innerHTML = "Off";

    SWITCH_MUSIC_BUTTON.style.backgroundImage = OFF_BACKGROUND_IMAGE;
    SWITCH_MUSIC_BUTTON.classList.add("inactiveAudioAnimation");
    SWITCH_MUSIC_BUTTON.classList.remove("activeAudioAnimation");

    SWITCH_MUSIC_BUTTON.style.right = "45%";
  } else {
    playDefaultSoundTrack();
    SWITCH_MUSIC_BUTTON.innerHTML = "On";

    SWITCH_MUSIC_BUTTON.style.backgroundImage = ON_BACKGROUND_IMAGE;
    SWITCH_MUSIC_BUTTON.classList.add("activeAudioAnimation");
    SWITCH_MUSIC_BUTTON.classList.remove("inactiveAudioAnimation");

    SWITCH_MUSIC_BUTTON.style.right = "-5%";
  }
}

SWITCH_MUSIC_BUTTON.addEventListener("click", switchMusicButton);

export { renderPlayMusicButtons, playSoundTrack, playDefaultSoundTrack, playHoverSoundEffect, stopHoverSoundEffect, playClickSoundEffect };