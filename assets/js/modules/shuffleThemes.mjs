let randomThemes = document.querySelectorAll('.random-theme');
let isShuffling = false;

function shuffleThemes() {
  if (isShuffling) return;
  isShuffling = true;

  randomThemes.forEach((theme) => {
    theme.classList.add('shuffleAnimationStart');
    setTimeout(() => {
      theme.classList.remove('shuffleAnimationStart');
    }, 6000);
  });
}

export { shuffleThemes };