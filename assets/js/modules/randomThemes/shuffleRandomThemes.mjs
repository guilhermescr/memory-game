let isShuffling = false;
let isMiddleTheme = true;

function resetThemeStyles(theme, middle_Theme) {
  theme.style.display = 'block';
  theme.style.order = 0;
  middle_Theme.style.order = 0;
  middle_Theme.classList.remove('middle-theme');
  console.log('Chamando Reset Function!');
}

function shuffleRandomThemes() {
  // This allows you to shuffle only once
  // if (isShuffling) return;
  // isShuffling = true;

  let randomThemes = document.querySelectorAll('.random-theme');

  
  const middleTheme = randomThemes[Math.floor(Math.random() * (randomThemes.length - 1))];

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