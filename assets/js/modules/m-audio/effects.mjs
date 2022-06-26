let swapAudio = document.getElementById('swap-effect');
let clickAudio = document.getElementById('click-setting-effect');

function playSwapEffect() {
  swapAudio.load();
  swapAudio.play();
  console.clear();
}

function stopSwapEffect() {
  swapAudio.pause();
}

function playClickEffect() {
  swapAudio.pause();
  clickAudio.load();
  clickAudio.play();
}

export { playSwapEffect, stopSwapEffect, playClickEffect };