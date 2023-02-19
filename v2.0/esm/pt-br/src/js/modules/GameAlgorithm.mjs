import {
  hideElements,
  renderLoaderContainer,
  revealElements,
  timeoutItems
} from '../main.js';
import { changeHomePageState, playHomeMusic, stopHomeMusic } from './Home.mjs';
import {
  MusicIsActive,
  playDefaultSoundTrack,
  renderPlayMusicButtons,
  setDefaultSoundTrack,
  stopSoundTrack
} from './m-audio/Audio.mjs';
import { TOP_BAR_CONTAINER, memoryDeck } from './m-themes/AddCards.mjs';
import { DECK_CONTAINER, setDeckStyles } from './m-themes/DeckStyles.mjs';
import { difficulty } from './m-themes/ThemesDifficulties.mjs';
import { fillRandomThemes } from './m-random-themes/FillRandomThemes.mjs';
import {
  onlineUser,
  renderGeneralInfo,
  updateAccount
} from './auth/AccountMethods.mjs';
import {
  BODY_CLASSLIST_TEMPLATE_OPTIONS,
  stopAllTemplateAnimations
} from './templates/TemplatesAlgorithm.mjs';
import {
  getAchievement,
  isAchievementObtained,
  resetAchievement,
  updateAchievement,
  updateExperienceBar
} from './m-profile/achievements/Achievements.mjs';
import { levelUp } from './m-profile/LevelUp.mjs';
import { closeMenu, openMenu } from './MenuActions.mjs';
import { ACHIEVEMENTS_DATA } from './m-profile/achievements/AchievementsList.mjs';

const SCOREBOARD = document.getElementById('score-points');
const MOVE_COUNT = document.querySelectorAll('.move-count');
const HEARTS = document.querySelectorAll('.hearts-container__heart');
const COMBO_ELEMENT = document.getElementById('combo');
const COMBO_AMOUNT_ELEMENT = document.getElementById('combo-amount');
let [win_streak, mistakes, max_combo] = [0, 0, 0];
let [isWin, isHardMatch] = [null, false];
let cards, interval;

const timing = {
  count: 0,
  start: function () {
    interval = setInterval(() => {
      timing.count++;
    }, 1000);
  },
  end: function () {
    clearInterval(interval);
  },
  render: function () {
    document.querySelectorAll('.timing-count').forEach(timing_count => {
      /*
        # s: seconds,
        # m: minutes,
        # h: hours,
        # d: days

        1 minute: 60s
        1 hour: 3600s -> (60m * 60s)
        1 day: 86400s -> (24h * 3600s)
      */

      // base unit of time in seconds
      let minute_baseUnit = 60;
      let hour_baseUnit = 60 * minute_baseUnit;
      let day_baseUnit = 24 * hour_baseUnit;

      /*
        Note: count is the amount of seconds the user spent playing a match

        - parseInt because float nums are not necessary here
        - days will be 1 or more if count is bigger than the day_baseUnit

        - On the other comment, you saw that a day is 86400. So, if I played a match for a day,
        days will be: 86400 / day_baseUnit (which is 86400). Result: 1
        
        - If I played for 2 days, the calculation will be:
        172800 / day_baseUnit (86400). Result: 2

        - If I played for less than a day, count will be any number below 86400, so:
        [ any number below 86400 / day_baseUnit -> Result: 0]
      */
      const days = parseInt(this.count / day_baseUnit);

      let seconds = this.count - days * day_baseUnit;
      const hours = parseInt(seconds / hour_baseUnit);
      seconds = seconds - hours * hour_baseUnit;
      const minutes = parseInt(seconds / minute_baseUnit);
      seconds = seconds - minutes * minute_baseUnit;

      if (days) {
        timing_count.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      } else if (hours) {
        timing_count.innerHTML = `${hours}h ${minutes}m ${seconds}s`;
      } else if (minutes) {
        timing_count.innerHTML = `${minutes}m ${seconds}s`;
      } else {
        timing_count.innerHTML = `${seconds}s`;
      }
    });
  }
};

function updateWinStreak(wk) {
  win_streak = wk;
}

function startGame() {
  timing.start();
  stopHomeMusic();
  setDefaultSoundTrack();
  stopAllTemplateAnimations();

  if (MusicIsActive) {
    playDefaultSoundTrack();
  }
  renderPlayMusicButtons();

  let firstCard, secondCard;
  let [withLives, hasFlippedCard, lockBoard, isCombo] = [
    false,
    false,
    false,
    false
  ];
  let [scorePoints, moves, cardSequence, combo_count] = [0, 0, 0, 0];
  let lives = 5;
  [mistakes, max_combo] = [0, 0];
  isHardMatch = false;
  COMBO_ELEMENT.style.top = '';
  COMBO_ELEMENT.style.left = '';
  changeHomePageState(false);

  if (
    !document
      .querySelector('.left-content__hearts-container')
      .classList.contains('hide')
  ) {
    resetHeartsColor();
    [withLives, isHardMatch] = [true, true];
  }

  [SCOREBOARD.innerHTML, scorePoints] = [0, 0];
  cards = document.querySelectorAll('.memory-card');
  changeMovesCount(0);

  function changeMovesCount(val) {
    MOVE_COUNT.forEach(moves_tag => {
      moves_tag.innerHTML = val;
    });
  }

  function resetHeartsColor() {
    for (let heart of HEARTS) {
      heart.classList.add('hearts-container__alive-heart');
      heart.classList.remove('hearts-container__dead-heart');
    }
  }

  function recoverHeart() {
    if (HEARTS[lives]) {
      HEARTS[lives].classList.remove('hearts-container__dead-heart');
      HEARTS[lives].classList.add('hearts-container__alive-heart');
      lives < 5 ? lives++ : null;
    }
  }

  function loseHeart() {
    lives--;
    HEARTS[lives].classList.remove('hearts-container__alive-heart');
    HEARTS[lives].classList.add('hearts-container__dead-heart');
    if (lives === 0) {
      setTimeout(() => {
        isWin = false;
        endGame('lostMatches', false);
      }, 800);
    }
  }

  function showCards() {
    lockBoard = true;

    cards.forEach(card => {
      card.classList.add('flip');
      setTimeout(() => {
        card.classList.remove('flip');
        lockBoard = false;
      }, 3000);
    });
  }

  function comboCards() {
    revealElements(COMBO_ELEMENT);

    COMBO_ELEMENT.classList.add('combo-animation');

    let right = secondCard.getBoundingClientRect().right;
    let top = secondCard.getBoundingClientRect().top;
    combo_count++;
    isCombo = true;

    COMBO_ELEMENT.style.top = `${top + 50}px`;
    COMBO_ELEMENT.style.left = `${right - 50}px`;

    COMBO_AMOUNT_ELEMENT.innerHTML = combo_count;

    if (combo_count > max_combo) {
      max_combo = combo_count;
    }

    timeoutItems(() => {
      hideElements(COMBO_ELEMENT);
      COMBO_ELEMENT.classList.remove('combo-animation');
      isCombo = false;
    }, 1000);

    timeoutItems(() => {
      if (!isCombo) {
        combo_count = 0;
      }
    }, 2000);
  }

  function flipCard() {
    if (lockBoard) return;

    if (!isAchievementObtained('Flip It!')) {
      updateAchievement('Flip It!', 1, true);
    }

    this.classList.add('flip');
    if (this === firstCard) return;

    moves++;
    changeMovesCount(moves);

    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
    }

    secondCard = this;

    checkForMatch();
  }

  function checkForMatch() {
    // get back-face images' datasets
    let firstCardDataset = firstCard.children[1].dataset.character;
    let secondCardDataset = secondCard.children[1].dataset.character;
    let isMatch = firstCardDataset === secondCardDataset;
    let isObtained = isAchievementObtained('Perfect Move');

    if (isMatch) {
      comboCards();
      disableCards();
      cardSequence++;
      if (!isObtained && cardSequence <= 3) {
        updateAchievement('Perfect Move', cardSequence, cardSequence === 3);
      }
      withLives ? recoverHeart() : null;
    } else {
      cardSequence = 0;
      mistakes++;
      unflipCards();
      withLives ? loseHeart() : null;
    }
  }

  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    scorePoints++;
    SCOREBOARD.innerHTML = scorePoints;
    if (scorePoints === cards.length / 2) {
      timeoutItems(() => {
        isWin = true;
        endGame('wonMatches', false);
      }, 1000);
    }

    resetBoard();
  }

  function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');

      resetBoard();
    }, 800);
  }

  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

  (function shuffle() {
    cards.forEach(card => {
      let randomPosition = Math.floor(Math.random() * cards.length);
      card.style.order = randomPosition;
    });
  })();

  function addCardsListeners() {
    cards.forEach(card => card.addEventListener('click', flipCard));
  }

  if (difficulty === 'Hard') {
    showCards();
  }

  addCardsListeners();
}

function checkResultsForAchievements() {
  if (isHardMatch && !isAchievementObtained('Player Harder Than Rock')) {
    updateAchievement('Player Harder Than Rock', 1, true);
  }

  if (!mistakes && !isAchievementObtained('Unstoppable')) {
    updateAchievement('Unstoppable', 1, true);
  }

  let win_achievements = [
    '3 wins',
    '5 wins',
    '15 wins',
    '50 wins',
    '100 wins',
    'Win Streak - Easy',
    'Win Streak - Normal',
    'Win Streak - Hard',
    'Win Streak - Insane'
  ];
  win_achievements.forEach(win_achievement => {
    if (!isAchievementObtained(win_achievement)) {
      if (win_achievement === 'Win Streak - Insane' && !isHardMatch) return;

      let achievementIndex = getAchievement(win_achievement)[1];
      const { current_progress } =
        onlineUser.userData.achievements_data.achievements[achievementIndex];
      const { total_progress } = ACHIEVEMENTS_DATA[achievementIndex];

      let progress = current_progress + 1;
      updateAchievement(win_achievement, progress, progress === total_progress);
    }
  });
}

function quitGame() {
  closeMenu();

  const { CurrentTemplate } = onlineUser.userData;
  if (isWin) {
    checkResultsForAchievements();
    renderLoaderContainer('Indo para o início...');
  } else {
    renderLoaderContainer('Se empenhe mais na próxima...');
    updateWinStreak(0);
    renderGeneralInfo();
  }
  isWin = null;

  changeHomePageState(true);
  stopSoundTrack();
  if (MusicIsActive) {
    timeoutItems(playHomeMusic);
  }

  memoryDeck.innerHTML = '';

  const GAME_MENU = document.querySelector('.game-menu');

  hideElements(DECK_CONTAINER);
  fillRandomThemes();
  timeoutItems(BODY_CLASSLIST_TEMPLATE_OPTIONS[CurrentTemplate], 500);
  revealElements([GAME_MENU, document.querySelector('.languages')]);
}

function endGame(matchResult, isQuitGame) {
  timing.end();
  window.removeEventListener('resize', setDeckStyles);

  const { exp, matches } = onlineUser.userData;
  const END_GAME_TITLE = document.getElementById('match-result-title');
  const END_GAME_XP = document.getElementById('end-game-xp');
  const END_GAME_MAX_COMBO = document.getElementById('max-combo');
  let xp = 0;

  updateAccount(['matches'], matches + 1);
  updateAccount([matchResult], onlineUser.userData[matchResult] + 1);
  resetAchievement('Perfect Move');

  let topBarContainerIngameElements = document.querySelectorAll(
    '.top-bar-container__top-bar-item'
  );
  hideElements(topBarContainerIngameElements);
  TOP_BAR_CONTAINER.classList.remove('top-bar-container--background');

  openMenu('end-game-menu');
  timing.render();
  END_GAME_TITLE.innerHTML = isWin ? 'Vitória!' : 'Game Over!';
  END_GAME_MAX_COMBO.innerHTML = max_combo;

  if (isQuitGame) {
    END_GAME_XP.innerHTML = 0;
    return;
  } else if (isWin) {
    xp = Math.round(Math.random() * (50 - 20) + 20);
    END_GAME_XP.innerHTML = xp;
    updateWinStreak(win_streak + 1);
  } else {
    xp = Math.round(Math.random() * (15 - 5) + 5);
    END_GAME_XP.innerHTML = xp;
  }
  let newXP = exp + xp;
  updateAccount(['exp'], newXP);
  updateExperienceBar(newXP, 0);
  renderGeneralInfo();
  levelUp();
}

document
  .querySelector('.deck-container__ingame-settings .quit-match-icon')
  .addEventListener('click', () => {
    isWin = false;
    endGame('lostMatches', true);
    quitGame();
  });
document
  .querySelector('.deck-container__end-game .quit-match-icon')
  .addEventListener('click', quitGame);

export { startGame, win_streak, updateWinStreak };
