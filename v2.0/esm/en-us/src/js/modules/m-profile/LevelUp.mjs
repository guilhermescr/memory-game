import { timeoutItems } from '../../main.js';
import { onlineUser, updateAccount } from '../auth/AccountMethods.mjs';
import { updateExperienceBar } from './achievements/Achievements.mjs';

const LEVELS = {
  lvl1: {
    lvl: 1,
    exp: 100
  },
  lvl2: {
    lvl: 2,
    exp: 300
  },
  lvl3: {
    lvl: 3,
    exp: 500
  },
  lvl4: {
    lvl: 4,
    exp: 1000
  },
  lvl5: {
    lvl: 5,
    exp: 2000
  },
  lvl6: {
    lvl: 6,
    exp: 3500
  },
  lvl7: {
    lvl: 7,
    exp: 5000
  },
  lvl8: {
    lvl: 8,
    exp: 7000
  },
  lvl9: {
    lvl: 9,
    exp: 8000
  },
  lvl10: {
    lvl: 10,
    exp: 10000
  }
};

const EXP_CURRENT_PROGRESS_BARS = document.querySelectorAll(
  '.exp-progress__current-progress'
);
const LEVEL_CONTAINER_MIDDLE_CONTAINERS = document.querySelectorAll(
  '.level-container__middle-container'
);
const MIDDLE_CONTAINERS_CURRENT_LEVEL = document.querySelectorAll(
  '.middle-container__current-level'
);
let isExpProgressBarWidthUpdated = {
  state: false,
  width: 0
};

function levelUp() {
  isExpProgressBarWidthUpdated.state = false;

  const { lvl, exp } = onlineUser.userData;
  let next_level = lvl + 1;
  let next_level_xp = LEVELS[`lvl${next_level}`].exp;

  if (exp >= next_level_xp) {
    updateAccount(['lvl'], next_level);
    renderCurrentLevel(next_level);
    isExpProgressBarWidthUpdated.width = 100;
  } else {
    let bar_width = 100 * exp;
    isExpProgressBarWidthUpdated.width = bar_width / next_level_xp;
  }
  updateExperienceBar(exp, LEVELS[`lvl${onlineUser.userData.lvl + 1}`].exp);
}

function renderCurrentLevel(lvl) {
  MIDDLE_CONTAINERS_CURRENT_LEVEL.forEach(current_level => {
    current_level.innerHTML = lvl;
  });
}

function changeExpProgressBarWidth(is_lvl_up) {
  isExpProgressBarWidthUpdated.state = true;

  EXP_CURRENT_PROGRESS_BARS.forEach((PROGRESS_BAR, index) => {
    let middle_container = LEVEL_CONTAINER_MIDDLE_CONTAINERS[index];

    if (is_lvl_up) {
      PROGRESS_BAR.style.width = '100%';
      timeoutItems(() => {
        middle_container.style.backgroundColor = '#423535';
        PROGRESS_BAR.style.width = '0%';
        isExpProgressBarWidthUpdated.width = 0;
        levelUp();
        changeExpProgressBarWidth(false);
      }, 800);
      return;
    }

    if (isExpProgressBarWidthUpdated.width) {
      middle_container.classList.add('lvlup');
      middle_container.style.backgroundColor =
        'var(--window_message_text_color)';

      timeoutItems(() => {
        middle_container.classList.remove('lvlup');
        PROGRESS_BAR.style.width = `${isExpProgressBarWidthUpdated.width}%`;
      }, 800);
      return;
    }

    if (!isExpProgressBarWidthUpdated.width) {
      middle_container.style.backgroundColor = '#423535';
    }

    PROGRESS_BAR.style.width = `${isExpProgressBarWidthUpdated.width}%`;
  });
}

export {
  LEVELS,
  isExpProgressBarWidthUpdated,
  levelUp,
  changeExpProgressBarWidth,
  renderCurrentLevel
};
