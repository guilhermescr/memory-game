import { themes } from "../m-themes/themesData.mjs";
import { btnThemeId } from "../m-themes/addCards.mjs";
import { Is_Home_Page, playHomeMusic, stopHomeMusic } from "../Home.mjs";

const MUSIC_AUDIO_TAGS = document.querySelectorAll('.musicAudioTag');
const THEME_AUDIO_TAG = document.getElementById('themeMusic');
const THEME_AUDIO_SOURCE_TAG = document.getElementById('themeSoundTrack');
const VOLUME_INPUTS = document.querySelectorAll('.volumeInput');
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

// parameter gets the clicked range input
function setVolume(VOLUME_INPUT) {
  for (let index = 0; index < MUSIC_AUDIO_TAGS.length; index++) {
    // all audio tags used for music and all range inputs receive the current volume.
    MUSIC_AUDIO_TAGS[index].volume = VOLUME_INPUT.value;
    if (VOLUME_INPUTS[index]) {
      VOLUME_INPUTS[index].value = VOLUME_INPUT.value;
    }
  }
}

// SOUND EFFECTS
const HOVER_SOUND_EFFECT = document.getElementById('hover-soundEffect');
const CLICK_SOUND_EFFECT = document.getElementById('click-setting-effect');

/* console.clear() has been used to hide the following error:
Uncaught (in promise) DOMException: The play() request was interrupted by a call to pause().
*/
function playHoverSoundEffect() {
  if (!AudioIsActive) return;
  HOVER_SOUND_EFFECT.load();
  HOVER_SOUND_EFFECT.play();
  console.clear();
}

function stopHoverSoundEffect() {
  HOVER_SOUND_EFFECT.pause();
}

function playClickSoundEffect() {
  if (!AudioIsActive) return;
  HOVER_SOUND_EFFECT.pause();
  CLICK_SOUND_EFFECT.load();
  CLICK_SOUND_EFFECT.play();
  console.clear();
}

// Switch Audio Settings
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
      audioButton.parentElement.classList.remove('switch-audio-container--active');
    } else { // turn on
      audioButton.innerHTML = "On";
      audioButton.parentElement.classList.add('switch-audio-container--active');
    }
    audioButton.classList.toggle("active");
  });
}

function switchMusic() {
  MusicIsActive = !MusicIsActive;

  if (Is_Home_Page) {
    MusicIsActive ? playHomeMusic() : stopHomeMusic();
  } else {
    MusicIsActive ? unpauseSoundTrack() : pauseSoundTrack();
  }
}

function switchSound() {
  AudioIsActive = !AudioIsActive;
}

SWITCH_BUTTONS.forEach((SWITCH_BUTTON) => {
  SWITCH_BUTTON.addEventListener("click", function() {
    switchAudioStyles(this);
  });
});

VOLUME_INPUTS.forEach((VOLUME_INPUT) => {
  VOLUME_INPUT.addEventListener('input', function() {
    setVolume(this);
  });
})

export { MusicIsActive, renderPlayMusicButtons, setDefaultSoundTrack, playDefaultSoundTrack, playSoundTrack, stopSoundTrack, playHoverSoundEffect, stopHoverSoundEffect, playClickSoundEffect };