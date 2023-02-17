import { currentTemplate } from './templates/TemplatesAlgorithm.mjs';
import { TEMPLATES_DATA } from './templates/TemplatesData.mjs';

const HOME_AUDIO_TAG = document.querySelector('#home-music');
const HOME_AUDIO_SOURCE_TAG = document.querySelector('#home-music-file');
let Is_Home_Page = true;

function changeHomePageState(state) {
  Is_Home_Page = state;
}

function playHomeMusic() {
  HOME_AUDIO_SOURCE_TAG.src = TEMPLATES_DATA[currentTemplate].SoundTrack;
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
