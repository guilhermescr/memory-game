import { themes } from '../m-themes/ThemesData.mjs';
import { btnThemeId } from '../m-themes/AddCards.mjs';
import { Is_Home_Page, playHomeMusic, stopHomeMusic } from '../Home.mjs';
import { onlineUser, updateAccount } from '../auth/AccountMethods.mjs';

const MUSIC_AUDIO_TAGS = document.querySelectorAll('.music-audio-tag');
const THEME_AUDIO_TAG = document.getElementById('theme-music');
const THEME_AUDIO_SOURCE_TAG = document.getElementById('theme-sound-track');
const VOLUME_INPUTS = document.querySelectorAll('.volume-input');
let [MusicIsActive, AudioIsActive] = [true, true];

function updateSoundsStatus() {
  let soundButtons;
  const { audio, music } = onlineUser.userData.sounds;
  [AudioIsActive, MusicIsActive] = [audio, music];

  soundButtons = document.querySelectorAll('.switch-sound-button');
  if (!AudioIsActive) {
    switchSoundButtonCSS(soundButtons);
  }

  soundButtons = document.querySelectorAll('.switch-music-button');
  if (!MusicIsActive) {
    switchSoundButtonCSS(soundButtons);
  }
}

function getPlayMusicButtons() {
  const PLAY_MUSIC_BUTTONS = document.querySelectorAll('.has-music');

  PLAY_MUSIC_BUTTONS.forEach(PLAY_MUSIC_BUTTON => {
    PLAY_MUSIC_BUTTON.addEventListener('click', function () {
      playSoundTrack(this);
    });
  });
}

function renderPlayMusicButtons() {
  const SOUNDTRACKS_AMOUNT = Object.keys(themes[btnThemeId].soundTracks).length;
  let musicButtonsContainer = document.querySelector('.music-options');
  musicButtonsContainer.innerHTML = '';

  for (let index = 1; index <= SOUNDTRACKS_AMOUNT; index++) {
    const MUSIC = `
    <div class="music">
      <button data-music="Music${index}" class="play-music-button has-music">Music ${index}</button>
    </div>
    `;

    const MUSIC_COMING_SOON = `
    <div class="music">
      <button data-music="ComingSoon" class="play-music-button">Coming Soon...</button>
    </div>
    `;

    musicButtonsContainer.innerHTML += themes[btnThemeId].soundTracks[
      `Music${index}`
    ]
      ? MUSIC
      : MUSIC_COMING_SOON;
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
  THEME_AUDIO_SOURCE_TAG.src === ''
    ? playDefaultSoundTrack()
    : THEME_AUDIO_TAG.play();
}

function pauseSoundTrack() {
  THEME_AUDIO_TAG.pause();
}

function stopSoundTrack() {
  THEME_AUDIO_TAG.pause();
  THEME_AUDIO_SOURCE_TAG.src = '';
}

// VOLUME_INPUT parameter is the range input for volume
function setVolume(VOLUME_INPUT) {
  let volumeValue;
  // setVolume(1) || setVolume(inputElement) -> number or HTML element
  if (VOLUME_INPUT.value) {
    volumeValue = VOLUME_INPUT.value;
  } else {
    volumeValue = VOLUME_INPUT;
  }

  for (let index = 0; index < MUSIC_AUDIO_TAGS.length; index++) {
    // all audio tags used for music and all range inputs receive the current volume.
    MUSIC_AUDIO_TAGS[index].volume = volumeValue;
    if (VOLUME_INPUTS[index]) {
      VOLUME_INPUTS[index].value = volumeValue;
      updateAccount(['sounds', 'volume'], Number(volumeValue));
    }
  }
}

// SOUND EFFECTS
const HOVER_SOUND_EFFECT = document.getElementById('hover-sound-effect');
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
const SWITCH_BUTTONS = document.querySelectorAll('.switch-button');
let audioButtons;

function switchAudioStyles(SwitchButton) {
  if (
    SwitchButton.classList.contains('switch-music-button') ||
    SwitchButton === 'switch-music-button'
  ) {
    audioButtons = document.querySelectorAll('.switch-music-button');
    switchMusic();
  } else {
    audioButtons = document.querySelectorAll('.switch-sound-button');
    switchSound();
  }

  switchSoundButtonCSS(audioButtons);
}

function switchSoundButtonCSS(soundButtons) {
  soundButtons.forEach(soundButton => {
    // turn off
    if (soundButton.classList.contains('active')) {
      soundButton.innerHTML = 'Off';
      soundButton.parentElement.classList.remove(
        'switch-audio-container--active'
      );
    } else {
      // turn on
      soundButton.innerHTML = 'On';
      soundButton.parentElement.classList.add('switch-audio-container--active');
    }
    soundButton.classList.toggle('active');
  });
}

function switchMusic() {
  MusicIsActive = !MusicIsActive;
  onlineUser.userData.sounds.music = MusicIsActive;

  if (!onlineUser.temporaryAccount) {
    localStorage.setItem('onlineUser', JSON.stringify(onlineUser));
  }

  if (Is_Home_Page) {
    MusicIsActive ? playHomeMusic() : stopHomeMusic();
  } else {
    MusicIsActive ? unpauseSoundTrack() : pauseSoundTrack();
  }
}

function switchSound() {
  AudioIsActive = !AudioIsActive;
  updateAccount(['sounds', 'audio'], AudioIsActive);
}

SWITCH_BUTTONS.forEach(SWITCH_BUTTON => {
  SWITCH_BUTTON.addEventListener('click', function () {
    switchAudioStyles(this);
  });
});

VOLUME_INPUTS.forEach(VOLUME_INPUT => {
  VOLUME_INPUT.addEventListener('input', function () {
    setVolume(this);
  });
});

export {
  MusicIsActive,
  updateSoundsStatus,
  renderPlayMusicButtons,
  setDefaultSoundTrack,
  playDefaultSoundTrack,
  playSoundTrack,
  stopSoundTrack,
  playHoverSoundEffect,
  stopHoverSoundEffect,
  playClickSoundEffect,
  setVolume
};
