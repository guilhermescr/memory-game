import { saveClickedBtnThemeId } from '../m-themes/AddCards.mjs';
import { shuffleDifficulties } from '../m-themes/ThemesDifficulties.mjs';

const RANDOM_THEMES_TITLE = document.getElementById('random-themes-title');
let [chosenTheme, isShuffling] = [null, false];

function resetStyles(RANDOM_THEME, drawnTheme) {
  RANDOM_THEME.classList.remove('middle-theme');
  RANDOM_THEME.style.display = 'block';
  RANDOM_THEME.style.order = '';
  RANDOM_THEMES_TITLE.innerHTML = 'Random Themes';
  drawnTheme.style.order = '';
}

function shuffleRandomThemes() {
  if (isShuffling) return;
  const RANDOM_THEMES = document.querySelectorAll('.random-theme');
  let drawnTheme =
    RANDOM_THEMES[Math.floor(Math.random() * RANDOM_THEMES.length)];

  isShuffling = true;

  // This "while" prevents the algorithm from choosing the same theme twice.
  while (drawnTheme === chosenTheme) {
    drawnTheme =
      RANDOM_THEMES[Math.floor(Math.random() * RANDOM_THEMES.length)];
  }
  chosenTheme = drawnTheme;

  RANDOM_THEMES.forEach(RANDOM_THEME => {
    resetStyles(RANDOM_THEME, drawnTheme);

    RANDOM_THEME.classList.add('shuffle-animation-start');

    const SHUFFLE_POSITIONS = setInterval(() => {
      let randomPos = Math.floor(Math.random() * RANDOM_THEMES.length);

      // I just want one theme in the middle, so one theme gets order: 2;
      while (randomPos === 2) {
        randomPos = Math.floor(Math.random() * RANDOM_THEMES.length);
      }
      RANDOM_THEME.style.order = randomPos;
    }, 1000);

    // stop shuffle animation
    setTimeout(() => {
      RANDOM_THEME.classList.remove('shuffle-animation-start');
      clearInterval(SHUFFLE_POSITIONS);

      if (RANDOM_THEME === drawnTheme) {
        drawnTheme.style.order = 2;
        drawnTheme.classList.add('middle-theme');
        RANDOM_THEMES_TITLE.innerHTML = drawnTheme.dataset.themename;
      } else {
        RANDOM_THEME.style.display = 'none';
      }
    }, 4000);
  });

  setTimeout(() => {
    saveClickedBtnThemeId(drawnTheme.dataset.themeid);
    shuffleDifficulties();
    isShuffling = false;
  }, 5100);
}

export { shuffleRandomThemes, RANDOM_THEMES_TITLE };
