import { hideElements, revealElements, timeoutItems } from '../../../main.js';
import {
  onlineUser,
  renderGeneralInfo,
  updateAccount
} from '../../auth/AccountMethods.mjs';
import { updateWinStreak } from '../../gameAlgorithm.mjs';
import {
  changeExpProgressBarWidth,
  LEVELS,
  levelUp,
  renderCurrentLevel
} from '../LevelUp.mjs';
import { renderBadge } from './AchievementsBadges.mjs';

const GENERAL_INFO_CONTAINER = document.querySelector(
  '.general-info-container'
);
const ACHIEVEMENTS_CONTAINER = document.querySelector('.achievements-section');
const ACHIEVEMENTS = document.querySelector(
  '.achievements-section__achievements'
);
const OPEN_ACHIEVEMENTS_BUTTON = document.getElementById(
  'open-achievements-button'
);
const OPEN_GENERAL_INFO_BUTTON = document.getElementById(
  'open-general-info-button'
);

const ACHIEVEMENT_POPUP_CONTAINER =
  document.querySelector('.achievement-popup');

let isPopUpActive = false;
let achievement_popup_queue = [];

function showAchievementsSection() {
  if (ACHIEVEMENTS_CONTAINER.classList.contains('hide')) {
    OPEN_ACHIEVEMENTS_BUTTON.classList.add('profile-info-option--active');
    OPEN_GENERAL_INFO_BUTTON.classList.remove('profile-info-option--active');

    hideElements(GENERAL_INFO_CONTAINER);
    revealElements(ACHIEVEMENTS_CONTAINER);
  }
  ACHIEVEMENTS.scrollTo(0, 0);
}

OPEN_ACHIEVEMENTS_BUTTON.addEventListener('click', showAchievementsSection);

const ACHIEVEMENTS_DATA = [
  {
    title: 'Flip It!',
    description: 'Flip your first card',
    xp: 20,
    badge: 'card_badge',
    hierarchy: 'none',
    total_progress: 1,
    iterator_progress_bar_width: 100
  },
  {
    title: 'Perfect Move',
    description: 'Flip three sets of cards sequentially at a game',
    xp: 80,
    badge: 'card_badge',
    hierarchy: 'none',
    total_progress: 3,
    iterator_progress_bar_width: 100 / 3
  },
  {
    title: 'Player Harder Than Rock',
    description: 'Win your first Hard match',
    xp: 100,
    badge: 'crown_badge',
    hierarchy: 'bronze',
    total_progress: 1,
    iterator_progress_bar_width: 100
  },
  {
    title: 'Unstoppable',
    description: 'Win a match without losing a combination',
    xp: 180,
    badge: 'crown_badge',
    hierarchy: 'gold',
    total_progress: 1,
    iterator_progress_bar_width: 100
  },
  {
    title: '3 wins',
    description: 'Win 3 games',
    xp: 300,
    badge: 'crown_badge',
    hierarchy: 'bronze',
    total_progress: 3,
    iterator_progress_bar_width: 100 / 3
  },
  {
    title: '5 wins',
    description: 'Win 5 games',
    xp: 500,
    badge: 'crown_badge',
    hierarchy: 'silver',
    total_progress: 5,
    iterator_progress_bar_width: 100 / 5
  },
  {
    title: '15 wins',
    description: 'Win 15 games',
    xp: 1000,
    badge: 'crown_badge',
    hierarchy: 'silver',
    total_progress: 15,
    iterator_progress_bar_width: 100 / 15
  },
  {
    title: '50 wins',
    description: 'Win 50 games',
    xp: 2000,
    badge: 'crown_badge',
    hierarchy: 'gold',
    total_progress: 50,
    iterator_progress_bar_width: 100 / 50
  },
  {
    title: '100 wins',
    description: 'Win 100 games',
    xp: 4000,
    badge: 'crown_badge',
    hierarchy: 'gold',
    total_progress: 100,
    iterator_progress_bar_width: 100 / 100
  },
  {
    title: 'Win Streak - Easy',
    description: 'Get 3 win streak in Any Difficulty',
    xp: 500,
    badge: 'win_streak_badge',
    hierarchy: 'bronze',
    total_progress: 3,
    iterator_progress_bar_width: 100 / 3
  },
  {
    title: 'Win Streak - Normal',
    description: 'Get 5 win streak in Any Difficulty',
    xp: 600,
    badge: 'win_streak_badge',
    hierarchy: 'silver',
    total_progress: 5,
    iterator_progress_bar_width: 100 / 5
  },
  {
    title: 'Win Streak - Hard',
    description: 'Get 10 win streak in Any Difficulty',
    xp: 1000,
    badge: 'win_streak_badge',
    hierarchy: 'silver',
    total_progress: 10,
    iterator_progress_bar_width: 100 / 10
  },
  {
    title: 'Win Streak - Insane',
    description: 'Get 20 win streak in Hard Difficulty',
    xp: 5000,
    badge: 'win_streak_badge',
    hierarchy: 'gold',
    total_progress: 20,
    iterator_progress_bar_width: 100 / 20
  }
];

function renderTotalAchievements() {
  const { amount } = onlineUser.userData.achievements_data;
  document.getElementById(
    'total-achievements'
  ).innerHTML = `${amount}/${ACHIEVEMENTS_DATA.length}`;
}

function renderAchievements() {
  renderTotalAchievements();

  for (let index = 0; index < ACHIEVEMENTS_DATA.length; index++) {
    const { current_progress } =
      onlineUser.userData.achievements_data.achievements[index];

    let achievement_container = document.createElement('div');
    achievement_container.classList.add('achievements__achievement');
    achievement_container.dataset.achievement = ACHIEVEMENTS_DATA[index].title;

    achievement_container.innerHTML = `
    <div class="achievement__badge-container">
      <div class="badge-container__custom-border">
        <div class="custom-border__circle"></div>
        <div class="custom-border__circle"></div>
        <div class="custom-border__circle"></div>
        <div class="custom-border__circle"></div>
      </div>

      ${renderBadge(ACHIEVEMENTS_DATA[index])}
    </div>

    <div class="achievement__achievement-info">
      <h4 class="achievement-info__title">${ACHIEVEMENTS_DATA[index].title}</h4>
      <p>${ACHIEVEMENTS_DATA[index].description}</p>
    </div>

    <p class="achievement__achievement-xp">${ACHIEVEMENTS_DATA[index].xp}XP</p>

    <div class="achievement__progress-bar">
      <div class="progress-bar__current-progress"></div>
      <p><span data-achievementprogress="${ACHIEVEMENTS_DATA[index].title}">${
      onlineUser.userData.achievements_data.achievements[index].current_progress
    }</span>/${ACHIEVEMENTS_DATA[index].total_progress}</p>
    </div>
    `;
    ACHIEVEMENTS.appendChild(achievement_container);
    setAchievementProgressBarWidth(
      ACHIEVEMENTS_DATA[index].title,
      index,
      current_progress,
      false
    );
  }
}

function setAchievementProgressBarWidth(
  achievementTitle,
  achievementIndex,
  current_progress,
  isPopUp
) {
  const { iterator_progress_bar_width, total_progress } =
    ACHIEVEMENTS_DATA[achievementIndex];
  let progress_bar_width = parseInt(
    current_progress * iterator_progress_bar_width
  );
  let progress_bar;

  if (isPopUp) {
    progress_bar = document.querySelector(
      `.achievement-popup[data-achievement="${achievementTitle}"] .progress-bar__current-progress`
    );
  } else {
    progress_bar = document.querySelector(
      `.achievements__achievement[data-achievement="${achievementTitle}"] .progress-bar__current-progress`
    );
  }

  if (current_progress === total_progress) {
    progress_bar.style.width = '100%';
  } else {
    progress_bar.style.width = `${progress_bar_width}%`;
  }

  document
    .querySelectorAll(`span[data-achievementprogress="${achievementTitle}"]`)
    .forEach(achievement_current_progress => {
      achievement_current_progress.innerHTML = current_progress;
    });
}

function popupAchievement(achievementIndex) {
  isPopUpActive = true;

  ACHIEVEMENT_POPUP_CONTAINER.innerHTML = '';

  const { current_progress } =
    onlineUser.userData.achievements_data.achievements[achievementIndex];

  const { title, description, xp, total_progress } =
    ACHIEVEMENTS_DATA[achievementIndex];

  ACHIEVEMENT_POPUP_CONTAINER.dataset.achievement =
    ACHIEVEMENTS_DATA[achievementIndex].title;

  ACHIEVEMENT_POPUP_CONTAINER.innerHTML = `
    <div class="achievement__badge-container">
      <div class="badge-container__custom-border">
        <div class="custom-border__circle"></div>
        <div class="custom-border__circle"></div>
        <div class="custom-border__circle"></div>
        <div class="custom-border__circle"></div>
      </div>

      ${renderBadge(ACHIEVEMENTS_DATA[achievementIndex])}
    </div>

    <div class="achievement__achievement-info">
      <h4 class="achievement-info__title">${title}</h4>
      <p>${description}</p>
    </div>

    <p class="achievement__achievement-xp">${xp}XP</p>

    <div class="achievement__progress-bar">
      <div class="progress-bar__current-progress"></div>
      <p><span data-achievementprogress="${title}">${current_progress}</span>/${total_progress}</p>
    </div>
    `;

  setAchievementProgressBarWidth(
    title,
    achievementIndex,
    current_progress,
    true
  );
  ACHIEVEMENT_POPUP_CONTAINER.classList.add('achievement-popup--show');
  timeoutItems(() => {
    ACHIEVEMENT_POPUP_CONTAINER.classList.remove('achievement-popup--show');
    ACHIEVEMENT_POPUP_CONTAINER.removeAttribute('data-achievement');
    ACHIEVEMENT_POPUP_CONTAINER.innerHTML = '';
    isPopUpActive = false;

    if (achievement_popup_queue.length) {
      timeoutItems(() => {
        popupAchievement(achievement_popup_queue[0]);
        achievement_popup_queue.shift();
      }, 300);
    }
  }, 2000);
}

function getAchievement(achievementTitle) {
  let { achievements } = onlineUser.userData.achievements_data;
  let achievement_data = [];
  achievements.find((achievement, achievementIndex) => {
    if (achievement.name === achievementTitle) {
      achievement_data.push(achievement, achievementIndex);
    }
  });
  return achievement_data;
}

function isAchievementObtained(achievementTitle) {
  return onlineUser.userData.achievements_data.achievements[
    getAchievement(achievementTitle)[1]
  ].done;
}

function updateExperienceBar(exp, total_exp) {
  document.querySelectorAll('.xp-amount').forEach((xp_tag, index) => {
    xp_tag.innerHTML = exp;
    document.querySelectorAll('.next-level-xp')[index].innerHTML = total_exp;
  });
}

function updateAchievement(achievementTitle, currentProgress, isObtained) {
  const { exp } = onlineUser.userData;
  const { amount } = onlineUser.userData.achievements_data;

  let achievement = getAchievement(achievementTitle);
  let [_, achievementIndex] = achievement;

  updateAccount(
    ['achievements_data', 'achievements', achievementIndex, 'current_progress'],
    currentProgress
  );
  updateAccount(
    ['achievements_data', 'achievements', achievementIndex, 'done'],
    isObtained
  );

  if (
    isPopUpActive &&
    ACHIEVEMENT_POPUP_CONTAINER.dataset.achievement === achievementTitle
  ) {
    setAchievementProgressBarWidth(
      achievementTitle,
      achievementIndex,
      currentProgress,
      true
    );
  }

  if (!isPopUpActive && currentProgress) {
    popupAchievement(achievementIndex);
  }

  if (
    isPopUpActive &&
    ACHIEVEMENT_POPUP_CONTAINER.dataset.achievement !== achievementTitle
  ) {
    achievement_popup_queue.push(achievementIndex);
  }

  setAchievementProgressBarWidth(
    achievementTitle,
    achievementIndex,
    currentProgress,
    false
  );

  if (isObtained) {
    let newXP = exp + ACHIEVEMENTS_DATA[achievementIndex].xp;
    updateAccount(['exp'], newXP);
    updateExperienceBar(newXP, 0);
    levelUp();
    updateAccount(['achievements_data', 'amount'], amount + 1);
    renderTotalAchievements();
  }
}

function resetAllAchievements() {
  achievement_popup_queue = [];

  ACHIEVEMENTS_DATA.forEach(achievement => {
    updateAchievement(achievement.title, 0, false);
  });
  updateAccount(['achievements_data', 'amount'], 0);
  updateAccount(['exp'], 0);
  updateAccount(['lvl'], 0);
  updateAccount(['matches'], 0);
  updateAccount(['wonMatches'], 0);
  updateAccount(['lostMatches'], 0);
  levelUp();
  updateWinStreak(0);
  renderCurrentLevel(0);
  renderGeneralInfo();
  renderTotalAchievements();
}

function resetAchievement(achievementTitle) {
  const { exp } = onlineUser.userData;
  const { amount } = onlineUser.userData.achievements_data;

  if (achievementTitle.includes('-D')) {
    achievementTitle = achievementTitle.replace('-D', '').trim();
    let achievementIndex = getAchievement(achievementTitle)[1];
    let achievement_obtained = isAchievementObtained(achievementTitle);

    if (achievement_obtained) {
      let newXP = exp - ACHIEVEMENTS_DATA[achievementIndex].xp;
      exp > 0 && updateAccount(['exp'], newXP);
      levelUp();
    }

    if (amount && achievement_obtained) {
      amount && updateAccount(['achievements_data', 'amount'], amount - 1);
      renderTotalAchievements();
    }

    updateAchievement(achievementTitle, 0, false);
    return;
  }

  if (!isAchievementObtained(achievementTitle)) {
    updateAchievement(achievementTitle, 0, false);
  }
}

function resetTemporaryAchievements() {
  resetAchievement('Perfect Move');
  resetAchievement('Win Streak - Easy');
  resetAchievement('Win Streak - Normal');
  resetAchievement('Win Streak - Hard');
  resetAchievement('Win Streak - Insane');
  updateWinStreak(0);
  document.getElementById('win-streak').innerHTML = 0;
}

export {
  ACHIEVEMENTS_DATA,
  renderAchievements,
  setAchievementProgressBarWidth,
  getAchievement,
  isAchievementObtained,
  updateAchievement,
  resetAllAchievements,
  resetAchievement,
  resetTemporaryAchievements,
  updateExperienceBar
};
