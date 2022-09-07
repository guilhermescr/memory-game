import { themes } from "../m-themes/themesData.mjs";
import { btnThemeId } from "../m-themes/addCards.mjs";

const AUDIO_TAG = document.getElementById('themeMusic');
const AUDIO_SOURCE_TAG = document.getElementById('themeSoundTrack');
const VOLUME_INPUT = document.getElementById('rangeInput');
let MusicIsActive = true;

function getPlayMusicButtons() {
  const PLAY_MUSIC_BUTTONS = document.querySelectorAll('.hasMusic');

  PLAY_MUSIC_BUTTONS.forEach((PLAY_MUSIC_BUTTON) => {
    PLAY_MUSIC_BUTTON.addEventListener('click', function() {
      playSoundTrack(this);
    });
  });
}

function renderPlayMusicButtons() {
  const SOUNDTRACKS_AMOUNT = Object.keys(themes[btnThemeId].soundTracks).length;
  let musicButtonsContainer = document.querySelector(".music-options");
  musicButtonsContainer.innerHTML = "";

  for (let index = 1; index <= SOUNDTRACKS_AMOUNT; index++) {
    const MUSIC = `
    <div class="music">
      <button data-music="Music${index}" class="playMusic hasMusic">Music ${index}</button>
    </div>
    `;

    const MUSIC_COMING_SOON = `
    <div class="music">
      <button data-music="ComingSoon" class="playMusic">Coming Soon...</button>
    </div>
    `;

    musicButtonsContainer.innerHTML += themes[btnThemeId].soundTracks[`Music${index}`] ? MUSIC : MUSIC_COMING_SOON;
  }
  getPlayMusicButtons();
}

function playDefaultSoundTrack() {
  AUDIO_SOURCE_TAG.src = themes[btnThemeId].soundTracks.Music1;
  AUDIO_TAG.load();
  AUDIO_TAG.play();
}

function playSoundTrack(playMusicButton) {
  if (!MusicIsActive) return;

  let chosenMusic = playMusicButton.dataset.music;
  AUDIO_SOURCE_TAG.src = themes[btnThemeId].soundTracks[chosenMusic];
  AUDIO_TAG.load();
  AUDIO_TAG.play();
}

function unpauseSoundTrack() {
  AUDIO_TAG.play();
}

function pauseSoundTrack() {
  AUDIO_TAG.pause();
}

function stopSoundTrack() {
  AUDIO_TAG.pause();
  AUDIO_SOURCE_TAG.src = '';
}

function setVolume() {
  AUDIO_TAG.volume = VOLUME_INPUT.value;
}

VOLUME_INPUT.addEventListener('input', setVolume);

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

// Switch Audio Settings
const SWITCH_AUDIO_BUTTONS = document.querySelectorAll('.switchButton');

function switchAudioStyles(SwitchAudioButton) {
  const ACTIVE_SWITCH_AUDIO_CONTAINER_BACKGROUND_COLOR = "#10bb9f";
  const INACTIVE_SWITCH_AUDIO_CONTAINER_BACKGROUND_COLOR = "#444";

  const ACTIVE_SWITCH_AUDIO_BUTTON_BACKGROUND_GRADIENT = "linear-gradient(#01baef 5%, #10bb9f)";
  const INACTIVE_SWITCH_AUDIO_BUTTON_BACKGROUND_GRADIENT = "linear-gradient(#2f4246 5%, #10bb9f)";

  // turn off
  if (SwitchAudioButton.classList.contains("active")) {
    SwitchAudioButton.innerHTML = "Off";
    SwitchAudioButton.parentElement.style.backgroundColor = INACTIVE_SWITCH_AUDIO_CONTAINER_BACKGROUND_COLOR;
    SwitchAudioButton.style.backgroundImage = INACTIVE_SWITCH_AUDIO_BUTTON_BACKGROUND_GRADIENT;

  } else { // turn on
    SwitchAudioButton.innerHTML = "On";
    SwitchAudioButton.parentElement.style.backgroundColor = ACTIVE_SWITCH_AUDIO_CONTAINER_BACKGROUND_COLOR;
    SwitchAudioButton.style.backgroundImage = ACTIVE_SWITCH_AUDIO_BUTTON_BACKGROUND_GRADIENT;
  }
  SwitchAudioButton.classList.toggle("active");
  SwitchAudioButton.classList.contains("switchMusicButton") ? switchMusic() : null;
}

function switchMusic() {
  MusicIsActive = !MusicIsActive;
  MusicIsActive ? unpauseSoundTrack() : pauseSoundTrack();
}

SWITCH_AUDIO_BUTTONS.forEach((SWITCH_AUDIO_BUTTON) => {
  SWITCH_AUDIO_BUTTON.addEventListener("click", function() {
    switchAudioStyles(this);
  });
});

export { MusicIsActive, renderPlayMusicButtons, playDefaultSoundTrack, playSoundTrack, stopSoundTrack, playHoverSoundEffect, stopHoverSoundEffect, playClickSoundEffect };