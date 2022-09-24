const HOME_AUDIO_TAG = document.querySelector('#homeMusic');
const HOME_AUDIO_SOURCE_TAG = document.querySelector('#homeMusicFile');
let Is_Home_Page = true;

const HOME_DATA = {
  Templates: {
    ForestTheme: "../src/soundtracks/home_sounds/templates/forest_template/forest_theme.mp3",
  },
};

// ? Is_Home_Page = true : Is_Home_Page = false;
function changeHomePageState(state) {
  state ? Is_Home_Page = state : Is_Home_Page = state;
}

function playHomeMusic() {
  HOME_AUDIO_SOURCE_TAG.src = HOME_DATA.Templates.ForestTheme;
  HOME_AUDIO_TAG.load();
  HOME_AUDIO_TAG.play();
}

function stopHomeMusic() {
  HOME_AUDIO_TAG.pause();
  HOME_AUDIO_SOURCE_TAG.src = '';
}

export { HOME_AUDIO_TAG, HOME_AUDIO_SOURCE_TAG, Is_Home_Page, changeHomePageState, playHomeMusic, stopHomeMusic };