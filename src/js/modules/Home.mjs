import TEMPLATES_DATA from './templates/TemplatesData.mjs';

const HOME_AUDIO_TAG = document.querySelector('#homeMusic');
const HOME_AUDIO_SOURCE_TAG = document.querySelector('#homeMusicFile');
let Is_Home_Page = true;

// ? Is_Home_Page = true : Is_Home_Page = false;
function changeHomePageState(state) {
  state ? (Is_Home_Page = state) : (Is_Home_Page = state);
}

function playHomeMusic() {
  HOME_AUDIO_SOURCE_TAG.src =
    TEMPLATES_DATA.ForestTemplate.SoundTrack;
  HOME_AUDIO_TAG.load();
  HOME_AUDIO_TAG.play();
}

function stopHomeMusic() {
  HOME_AUDIO_TAG.pause();
  HOME_AUDIO_SOURCE_TAG.src = '';
}

export {
  HOME_AUDIO_TAG,
  HOME_AUDIO_SOURCE_TAG,
  Is_Home_Page,
  changeHomePageState,
  playHomeMusic,
  stopHomeMusic
};
