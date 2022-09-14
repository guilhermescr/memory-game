import { themes } from "../m-themes/themesData.mjs";
import { btnThemeId } from "../m-themes/addCards.mjs";

const THEME_AUDIO_TAG = document.getElementById('themeMusic');
const THEME_AUDIO_SOURCE_TAG = document.getElementById('themeSoundTrack');
const VOLUME_INPUT = document.getElementById('rangeInput');
let [MusicIsActive, AudioIsActive] = [true, true];

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

function setDefaultSoundTrack() {
  THEME_AUDIO_SOURCE_TAG.src = themes[btnThemeId].soundTracks.Music1;
  THEME_AUDIO_TAG.load();
}

function playDefaultSoundTrack() {
  setDefaultSoundTrack();
  THEME_AUDIO_TAG.load();
  THEME_AUDIO_TAG.play();
}

function playSoundTrack(playMusicButton) {
  if (!MusicIsActive) return;

  let chosenMusic = playMusicButton.dataset.music;
  THEME_AUDIO_SOURCE_TAG.src = themes[btnThemeId].soundTracks[chosenMusic];
  THEME_AUDIO_TAG.load();
  THEME_AUDIO_TAG.play();
}

function unpauseSoundTrack() {
  THEME_AUDIO_SOURCE_TAG.src === '' ? playDefaultSoundTrack() : THEME_AUDIO_TAG.play();
}

function pauseSoundTrack() {
  THEME_AUDIO_TAG.pause();
}

function stopSoundTrack() {
  THEME_AUDIO_TAG.pause();
  THEME_AUDIO_SOURCE_TAG.src = '';
}

function setVolume() {
  THEME_AUDIO_TAG.volume = VOLUME_INPUT.value;
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
const ACTIVE_SWITCH_AUDIO_CONTAINER_BACKGROUND_COLOR = "#10bb9f";
const INACTIVE_SWITCH_AUDIO_CONTAINER_BACKGROUND_COLOR = "#444";
const ACTIVE_SWITCH_BUTTON_BACKGROUND_GRADIENT = "linear-gradient(#01baef 5%, #10bb9f)";
const INACTIVE_SWITCH_BUTTON_BACKGROUND_GRADIENT = "linear-gradient(#2f4246 5%, #10bb9f)";

const SWITCH_BUTTONS = document.querySelectorAll('.switchButton');
let audioButtons;

function switchAudioStyles(SwitchButton) {
  if (SwitchButton.classList.contains("switchMusicButton")) {
    audioButtons = document.querySelectorAll('.switchMusicButton');
    switchMusic();
  } else {
    audioButtons = document.querySelectorAll('.switchSoundButton');
    switchSound();
  }

  audioButtons.forEach((audioButton) => {
    // turn off
    if (audioButton.classList.contains("active")) {
      audioButton.innerHTML = "Off";
      audioButton.parentElement.style.backgroundColor = INACTIVE_SWITCH_AUDIO_CONTAINER_BACKGROUND_COLOR;
      audioButton.style.backgroundImage = INACTIVE_SWITCH_BUTTON_BACKGROUND_GRADIENT;
    } else { // turn on
      audioButton.innerHTML = "On";
      audioButton.parentElement.style.backgroundColor = ACTIVE_SWITCH_AUDIO_CONTAINER_BACKGROUND_COLOR;
      audioButton.style.backgroundImage = ACTIVE_SWITCH_BUTTON_BACKGROUND_GRADIENT;
    }
    audioButton.classList.toggle("active");
  });
}

function switchMusic() {
  MusicIsActive = !MusicIsActive;
  MusicIsActive ? unpauseSoundTrack() : pauseSoundTrack();
}

function switchSound() {
  AudioIsActive = !AudioIsActive;
}

SWITCH_BUTTONS.forEach((SWITCH_BUTTON) => {
  SWITCH_BUTTON.addEventListener("click", function() {
    switchAudioStyles(this);
  });
});

export { MusicIsActive, renderPlayMusicButtons, setDefaultSoundTrack, playDefaultSoundTrack, playSoundTrack, stopSoundTrack, playHoverSoundEffect, stopHoverSoundEffect, playClickSoundEffect };