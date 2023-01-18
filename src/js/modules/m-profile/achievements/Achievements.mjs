import { hideElements, revealElements } from '../../../main.js';
import { renderBadge } from './AchievementsBadges.mjs';

const GENERAL_INFO_CONTAINER = document.querySelector(
  '.general-info-container'
);
const ACHIEVEMENTS_CONTAINER = document.querySelector('.achievements-section');

const OPEN_ACHIEVEMENTS_BUTTON = document.getElementById(
  'open-achievements-button'
);

function showAchievementsSection() {
  if (ACHIEVEMENTS_CONTAINER.classList.contains('hide')) {
    hideElements(GENERAL_INFO_CONTAINER);
    revealElements(ACHIEVEMENTS_CONTAINER);
  }
}

OPEN_ACHIEVEMENTS_BUTTON.addEventListener('click', showAchievementsSection);

const ACHIEVEMENTS_DATA = [
  {
    title: 'Flip It!',
    description: 'Flip your first card',
    xp: 10,
    badge: 'card_badge',
    hierarchy: 'none',
    total_progress: 1
  },
  {
    title: 'Perfect Move',
    description: 'Flip three sets of cards sequentially',
    xp: 80,
    badge: 'card_badge',
    hierarchy: 'none',
    total_progress: 3
  },
  {
    title: 'Player Harder Than Rock',
    description: 'Win your first Hard match',
    xp: 25,
    badge: 'crown_badge',
    hierarchy: 'bronze',
    total_progress: 1
  },
  {
    title: 'Unstoppable',
    description: 'Win a match without losing a combination',
    xp: 150,
    badge: 'crown_badge',
    hierarchy: 'gold',
    total_progress: 1
  },
  {
    title: '3 wins',
    description: 'Win 3 games',
    xp: 30,
    badge: 'crown_badge',
    hierarchy: 'silver',
    total_progress: 3
  },
  {
    title: '5 wins',
    description: 'Win 5 games',
    xp: 50,
    badge: 'crown_badge',
    hierarchy: 'silver',
    total_progress: 5
  },
  {
    title: '15 wins',
    description: 'Win 15 games',
    xp: 80,
    badge: 'crown_badge',
    hierarchy: 'silver',
    total_progress: 15
  },
  {
    title: '50 wins',
    description: 'Win 50 games',
    xp: 150,
    badge: 'crown_badge',
    hierarchy: 'gold',
    total_progress: 50
  },
  {
    title: '100 wins',
    description: 'Win 100 games',
    xp: 300,
    badge: 'crown_badge',
    hierarchy: 'gold',
    total_progress: 100
  },
  {
    title: 'Win Streak - Easy',
    description: 'Get 3 win streak in Normal Difficulty',
    xp: 20,
    badge: 'win_streak_badge',
    hierarchy: 'bronze',
    total_progress: 3
  },
  {
    title: 'Win Streak - Normal',
    description: 'Get 5 win streak in Normal Difficulty',
    xp: 40,
    badge: 'win_streak_badge',
    hierarchy: 'silver',
    total_progress: 5
  },
  {
    title: 'Win Streak - Hard',
    description: 'Get 10 win streak in Normal Difficulty',
    xp: 75,
    badge: 'win_streak_badge',
    hierarchy: 'silver',
    total_progress: 10
  },
  {
    title: 'Win Streak - Insane',
    description: 'Get 20 win streak in Hard Difficulty',
    xp: 800,
    badge: 'win_streak_badge',
    hierarchy: 'gold',
    total_progress: 20
  }
];

const ACHIEVEMENTS = document.querySelector(
  '.achievements-section__achievements'
);

function renderAchievements() {
  for (let index = 0; index < ACHIEVEMENTS_DATA.length; index++) {
    let achievement_container = document.createElement('div');
    achievement_container.classList.add('achievements__achievement');

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
      <p>${ACHIEVEMENTS_DATA[index].total_progress}/${
      ACHIEVEMENTS_DATA[index].total_progress
    }</p>
    </div>
    `;
    ACHIEVEMENTS.appendChild(achievement_container);
  }
}

export { renderAchievements };
