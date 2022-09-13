const AUDIO_TAG = document.querySelector('#homeMusic');
const AUDIO_SOURCE_TAG = document.querySelector('#homeMusicFile');

const HOME_DATA = {
  Templates: {
    ForestTheme: "../src/soundtracks/home_sounds/home_music_forest_theme.mp3",
  },
};

function playHomeMusic() {
  AUDIO_SOURCE_TAG.src = HOME_DATA.Templates.ForestTheme;
  AUDIO_TAG.load();
  AUDIO_TAG.play();
}

export { playHomeMusic };