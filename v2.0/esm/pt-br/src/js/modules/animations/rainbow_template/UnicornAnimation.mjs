const TEMPLATE_ANIMATION_CONTAINER = document.querySelector(
  '.game-menu__template-animation'
);
let rainbow_template_timeouts = [];
let rainbow_template_viewport_width = document.body.clientWidth;
let isMobileScreen = rainbow_template_viewport_width <= 580;
let isLargerScreen = !isMobileScreen;
let isBreakpointUpdated = false;

let rainbow,
  left_unicorn,
  right_unicorn,
  rainbow_template_interval,
  start_rainbow_animation_class,
  end_rainbow_animation_class;

function getViewportWidthToAdjustRainbowPosition() {
  rainbow_template_viewport_width = document.body.clientWidth;
  isMobileScreen = document.body.clientWidth <= 580;

  if (isMobileScreen) {
    start_rainbow_animation_class = 'mobile-rainbow--start-animation';
    end_rainbow_animation_class = 'mobile-rainbow--end-animation';

    if (isLargerScreen) {
      isLargerScreen = false;
      isBreakpointUpdated = false;
    }
  } else {
    start_rainbow_animation_class = 'larger-screen-rainbow--start-animation';
    end_rainbow_animation_class = 'larger-screen-rainbow--end-animation';

    if (!isLargerScreen) {
      isLargerScreen = true;
      isBreakpointUpdated = false;
    }
  }

  if (!isBreakpointUpdated) {
    isBreakpointUpdated = true;
    resetUnicornAnimation();
    startUnicornAnimation();
  }
}

function startUnicornAnimation() {
  window.addEventListener('resize', getViewportWidthToAdjustRainbowPosition);

  if (rainbow_template_interval) {
    clearInterval(rainbow_template_interval);
  }

  let renderRainbowTemplateAnimationTimeout = setTimeout(() => {
    TEMPLATE_ANIMATION_CONTAINER.innerHTML = `
    <img
      id="left-corner-unicorn"
      class="rainbow-template__unicorn"
      src="../src/assets/images/templates/rainbow_template/unicorn-with-mouth-open.png"
      alt="Unicorn with its mouth open"
    />
    <img
      id="right-corner-unicorn"
      class="rainbow-template__unicorn"
      src="../src/assets/images/templates/rainbow_template/unicorn-with-mouth-open.png"
      alt="Unicorn with its mouth open"
    />
    <div class="rainbow"></div>
    `;
    rainbow_template_timeouts.push(renderRainbowTemplateAnimationTimeout);

    rainbow = document.querySelector('.rainbow');
    left_unicorn = document.getElementById('left-corner-unicorn');
    right_unicorn = document.getElementById('right-corner-unicorn');

    /*
    Rainbow Template | Animation Timings
    - 400
    - 1300
    - 4300
    - 5400
    - 9400
    */

    leftUnicornComes();
    startRainbowAnimation();
    rightUnicornComes();
    endRainbowAnimation();
    leftAndRightUnicornLeave();
    restartUnicornAnimation();
  }, 1000);
}

function restartUnicornAnimation() {
  rainbow_template_interval = setInterval(startUnicornAnimation, 9400);
}

function resetUnicornAnimation() {
  if (rainbow_template_timeouts) {
    rainbow_template_timeouts.forEach(rainbow_template_timeout => {
      clearTimeout(rainbow_template_timeout);
    });
  }

  if (rainbow_template_interval) {
    clearInterval(rainbow_template_interval);
  }

  window.removeEventListener('resize', getViewportWidthToAdjustRainbowPosition);

  TEMPLATE_ANIMATION_CONTAINER.innerHTML = '';
  [rainbow, left_unicorn, right_unicorn, rainbow_template_interval] = [
    null,
    null,
    null,
    null
  ];

  rainbow_template_timeouts = [];
  rainbow_template_viewport_width = document.body.clientWidth;

  isMobileScreen = rainbow_template_viewport_width <= 580;
  isLargerScreen = !isMobileScreen;
  isBreakpointUpdated = false;
}

function leftUnicornComes() {
  let leftUnicornTimeout = setTimeout(() => {
    left_unicorn.classList.add('left-unicorn-comes');
  }, 400);
  rainbow_template_timeouts.push(leftUnicornTimeout);
}

function rightUnicornComes() {
  let rightUnicornTimeout = setTimeout(() => {
    right_unicorn.classList.add('right-unicorn-comes');
  }, 4300);
  rainbow_template_timeouts.push(rightUnicornTimeout);
}

function startRainbowAnimation() {
  let startRainbowAnimationTimeout = setTimeout(() => {
    rainbow.classList.add(start_rainbow_animation_class);
  }, 1300);
  rainbow_template_timeouts.push(startRainbowAnimationTimeout);
}

function endRainbowAnimation() {
  let endRainbowAnimationTimeout = setTimeout(() => {
    rainbow.classList.remove(start_rainbow_animation_class);
    rainbow.classList.add(end_rainbow_animation_class);
  }, 5400);
  rainbow_template_timeouts.push(endRainbowAnimationTimeout);
}

function leftAndRightUnicornLeave() {
  let leftAndRightUnicornLeaveTimeout = setTimeout(() => {
    left_unicorn.classList.remove('left-unicorn-comes');
    right_unicorn.classList.remove('right-unicorn-comes');
  }, 9400);
  rainbow_template_timeouts.push(leftAndRightUnicornLeaveTimeout);
}

export {
  getViewportWidthToAdjustRainbowPosition,
  startUnicornAnimation,
  resetUnicornAnimation
};
