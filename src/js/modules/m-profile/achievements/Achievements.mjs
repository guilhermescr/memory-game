import { hideElements, revealElements } from '../../../main.js';
import { onlineUser, updateAccount } from '../../auth/AccountMethods.mjs';
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

function showAchievementsSection() {
  if (ACHIEVEMENTS_CONTAINER.classList.contains('hide')) {
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

function updateTotalAchievements(total_achievements) {
  document.getElementById(
    'total-achievements'
  ).innerHTML = `${total_achievements}/${ACHIEVEMENTS_DATA.length}`;
}

function renderAchievements() {
  const { amount } = onlineUser.userData.achievements_data;
  updateTotalAchievements(amount);

  for (let index = 0; index < ACHIEVEMENTS_DATA.length; index++) {
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
      <p><span id="${ACHIEVEMENTS_DATA[index].title}">${
      onlineUser.userData.achievements_data.achievements[index].current_progress
    }</span>/${ACHIEVEMENTS_DATA[index].total_progress}</p>
    </div>
    `;
    ACHIEVEMENTS.appendChild(achievement_container);
  }
}

function setAchievementProgressBarWidth(
  increaseWidth,
  achievementTitle,
  currentProgress
) {
  const { achievements } = onlineUser.userData.achievements_data;

  for (
    let achievementIndex = 0;
    achievementIndex < ACHIEVEMENTS_DATA.length;
    achievementIndex++
  ) {
    let { title, iterator_progress_bar_width, total_progress } =
      ACHIEVEMENTS_DATA[achievementIndex];
    let current_progress;

    if (increaseWidth && title === achievementTitle) {
      current_progress = currentProgress;
    } else {
      current_progress = achievements[achievementIndex].current_progress;
    }

    let progress_bar = document.querySelector(
      `.achievements__achievement[data-achievement="${title}"] .progress-bar__current-progress`
    );
    let progress_bar_width = current_progress * iterator_progress_bar_width;

    if (current_progress === total_progress) {
      progress_bar.style.width = '100%';
    } else {
      progress_bar.style.width = progress_bar_width + '%';
    }

    // span of the achievement current progress, i.e.: <span>1</span>/3
    document.getElementById(`${title}`).innerHTML = current_progress;
  }
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

function updateExperienceBar(exp) {
  document.querySelectorAll('.xp-amount').forEach(xp_tag => {
    xp_tag.innerHTML = exp;
  });
}

function updateAchievement(achievementTitle, currentProgress, isObtained) {
  const { exp } = onlineUser.userData;
  const { amount, achievements } = onlineUser.userData.achievements_data;

  let achievement = getAchievement(achievementTitle);
  let [_, achievementIndex] = achievement;

  if (!achievements[achievementIndex].done) {
    updateAccount(
      [
        'achievements_data',
        'achievements',
        achievementIndex,
        'current_progress'
      ],
      currentProgress
    );
    updateAccount(
      ['achievements_data', 'achievements', achievementIndex, 'done'],
      isObtained
    );

    setAchievementProgressBarWidth(true, achievementTitle, currentProgress);

    if (isObtained) {
      updateAccount(['achievements_data', 'amount'], amount + 1);
      let newXP = exp + ACHIEVEMENTS_DATA[achievementIndex].xp;
      updateAccount(['exp'], newXP);
      updateTotalAchievements(amount);
      updateExperienceBar(newXP);
    }
  }
}

function resetAchievement(achievementTitle) {
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
}

export {
  ACHIEVEMENTS_DATA,
  renderAchievements,
  setAchievementProgressBarWidth,
  getAchievement,
  isAchievementObtained,
  updateAchievement,
  resetAchievement,
  resetTemporaryAchievements,
  updateExperienceBar
};
