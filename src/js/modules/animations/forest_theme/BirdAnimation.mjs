// Bird Animation
const BIRD_CONTAINER = document.querySelector('.bird_animated_gif_container');
let birdAnimationInterval;

function startBirdAnimation() {
  BIRD_CONTAINER.classList.add('flying_animation');
  switchBirdState();
  setBirdAnimationInterval();
}

function setBirdAnimationInterval() {
  birdAnimationInterval = setInterval(switchBirdState, 20000);
}

function setBirdPosition() {
  // get title (h1) top and right position
  let titleTopPosition = document
    .querySelector('#game-menu-title')
    .getBoundingClientRect()
    .top.toFixed();

  let titleRightPosition = document
    .querySelector('#game-menu-title')
    .getBoundingClientRect()
    .right.toFixed();

  // set bird position through CSS variable at :root
  let root = document.querySelector(':root');

  root.style.setProperty(
    '--bird_top_position_animation',
    titleTopPosition + 'px'
  );
  root.style.setProperty(
    '--bird_left_position_animation',
    titleRightPosition - 35 + 'px'
  );

  /* W3Schools helped me to code the setBirdPosition algorithm:
    - https://www.w3schools.com/css/css3_variables_javascript.asp
  */
}

function resetBirdAnimation() {
  clearInterval(birdAnimationInterval);
  BIRD_CONTAINER.classList.remove('flying_animation');
}

function switchBirdState() {
  setTimeout(() => {
    BIRD_CONTAINER.firstElementChild.src =
      '../src/assets/images/templates/forest_theme/perched_bird.png';
  }, 8000);

  setTimeout(() => {
    BIRD_CONTAINER.firstElementChild.src =
      '../src/assets/gifs/single-bird-flying.gif';
  }, 14000);
}

export { startBirdAnimation, setBirdPosition, resetBirdAnimation };