const HOME_AUDIO_TAG = document.querySelector('#homeMusic');
const HOME_AUDIO_SOURCE_TAG = document.querySelector('#homeMusicFile');

const HOME_DATA = {
  Templates: {
    ForestTheme: "../src/soundtracks/home_sounds/home_music_forest_theme.mp3",
  },
};

function playHomeMusic() {
  setTimeout(() => {
    HOME_AUDIO_SOURCE_TAG.src = HOME_DATA.Templates.ForestTheme;
    HOME_AUDIO_TAG.load();
    HOME_AUDIO_TAG.play();
  }, 2000);
}

function stopHomeMusic() {
  HOME_AUDIO_TAG.pause();
  HOME_AUDIO_SOURCE_TAG.src = '';
}

export { HOME_AUDIO_TAG, HOME_AUDIO_SOURCE_TAG, playHomeMusic, stopHomeMusic };