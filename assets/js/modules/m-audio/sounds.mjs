const SWAP_SOUND_EFFECT = document.getElementById('swap-effect');
const CLICK_SOUND_EFFECT = document.getElementById('click-setting-effect');

function playSwapSoundEffect() {
  SWAP_SOUND_EFFECT.load();
  SWAP_SOUND_EFFECT.play();
  console.clear();
}

function stopSwapSoundEffect() {
  SWAP_SOUND_EFFECT.pause();
}

function playClickSoundEffect() {
  SWAP_SOUND_EFFECT.pause();
  CLICK_SOUND_EFFECT.load();
  CLICK_SOUND_EFFECT.play();
}

export { playSwapSoundEffect, stopSwapSoundEffect, playClickSoundEffect };