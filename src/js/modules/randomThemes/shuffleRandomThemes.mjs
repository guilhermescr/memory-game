let isShuffling = false;
let chosenTheme = null;

function resetThemeStyles(RANDOM_THEME, middle_Theme) {
  RANDOM_THEME.classList.remove('middle-theme');
  RANDOM_THEME.style.display = 'block';
  RANDOM_THEME.style.order = '';
  middle_Theme.style.order = '';
}

function shuffleRandomThemes() {
  if (isShuffling) return;
  let middleTheme = null;
  isShuffling = true;
  const RANDOM_THEMES = document.querySelectorAll('.random-theme');

  let isMiddleTheme = true;
  
  middleTheme = RANDOM_THEMES[Math.floor(Math.random() * RANDOM_THEMES.length)];

  while (middleTheme === chosenTheme) {
    middleTheme = RANDOM_THEMES[Math.floor(Math.random() * RANDOM_THEMES.length)];
  }
  chosenTheme = middleTheme;

  RANDOM_THEMES.forEach((RANDOM_THEME) => {
    resetThemeStyles(RANDOM_THEME, middleTheme);

    RANDOM_THEME.classList.add('shuffleAnimationStart');

    const shufflePositions = setInterval(() => {
      let randomPos = Math.floor(Math.random() * RANDOM_THEMES.length);

      // I just want one theme in the middle, so one theme gets order: 2;
      while (randomPos === 2) {
        randomPos = Math.floor(Math.random() * RANDOM_THEMES.length);
      }
      RANDOM_THEME.style.order = randomPos;
    }, 1000);

    setTimeout(() => {
      RANDOM_THEME.classList.remove('shuffleAnimationStart');
      clearInterval(shufflePositions);

      if (isMiddleTheme) {
        middleTheme.style.order = 2;
        middleTheme.classList.add('middle-theme');
        isMiddleTheme = false;
      }

      if (!(RANDOM_THEME.classList.contains('middle-theme'))) {
        RANDOM_THEME.style.display = 'none';
      }
    }, 6000);
  });
}

export { shuffleRandomThemes };