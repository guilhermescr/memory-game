let isShuffling = false;
let chosenTheme = '';

function resetThemeStyles(theme, middle_Theme) {
  theme.classList.remove('middle-theme');
  theme.style.display = 'block';
  theme.style.order = '';
  middle_Theme.style.order = '';
}

function shuffleRandomThemes() {
  // This allows you to shuffle only once
  // if (isShuffling) return;
  // isShuffling = true;
  const randomThemes = document.querySelectorAll('.random-theme');

  let isMiddleTheme = true;
  let middleTheme = '';
  middleTheme = randomThemes[Math.floor(Math.random() * (randomThemes.length - 1))];

  while (middleTheme == chosenTheme) {
    middleTheme = randomThemes[Math.floor(Math.random() * (randomThemes.length - 1))];
  }
  chosenTheme = middleTheme;

  randomThemes.forEach((theme) => {
    resetThemeStyles(theme, middleTheme);

    theme.classList.add('shuffleAnimationStart');

    const shufflePositions = setInterval(() => {
      let randomPos = Math.floor(Math.random() * randomThemes.length);

      while (randomPos === 2) {
        randomPos = Math.floor(Math.random() * randomThemes.length);
      }
      theme.style.order = randomPos;
    }, 1000);

    setTimeout(() => {
      theme.classList.remove('shuffleAnimationStart');
      clearInterval(shufflePositions);

      if (middleTheme.style.width === 0 || middleTheme.style.height === 0) {
        alert('Oops! Please, try again. Our system broke.');
        return;
      }

      if (isMiddleTheme) {
        middleTheme.style.order = 2;
        middleTheme.classList.add('middle-theme');
        isMiddleTheme = false;
      }

      if (!(theme.classList.contains('middle-theme'))) {
        theme.style.display = 'none';
      }
    }, 6000);
  });
}

export { shuffleRandomThemes };