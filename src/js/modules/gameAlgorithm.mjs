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
} from './m-audio/audio.mjs';
import { TOP_BAR_CONTAINER, memoryDeck } from './m-themes/addCards.mjs';
import { DECK_CONTAINER } from './m-themes/deckStyles.mjs';
import { difficulty } from './m-themes/themesDifficulty.mjs';
import { resetBirdAnimation } from './animations/forest_theme/BirdAnimation.mjs';
import { fillRandomThemes } from './randomThemes/fillRandomThemes.mjs';
import {
  onlineUser,
  renderGeneralInfo,
  updateAccount
} from './auth/AccountMethods.mjs';
import { BODY_CLASSLIST_TEMPLATE_OPTIONS } from './templates/TemplatesData.mjs';
import {
  ACHIEVEMENTS_DATA,
  getAchievement,
  isAchievementObtained,
  resetAchievement,
  updateAchievement
} from './m-profile/achievements/Achievements.mjs';
import { openMenu } from './menuActions.mjs';

const SCOREBOARD = document.getElementById('score-points');
const MOVE_COUNT = document.querySelectorAll('.move-count');
const HEARTS = document.querySelectorAll('.hearts-container__heart');
let win_streak = 0;
let cards, interval;

let timing = {
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
    console.log(this.count);
    document.querySelectorAll('.timing-count').forEach(timing_count => {
      if (this.count < 60) {
        timing_count.innerHTML = `${this.count}s`;
      } else if (this.count < 120) {
        timing_count.innerHTML = `1min ${this.count}s`;
      } else if (this.count < 180) {
        timing_count.innerHTML = `2min ${this.count}s`;
      } else if (this.count < 240) {
        timing_count.innerHTML = `3min ${this.count}s`;
      }
    });
  }
};

function startGame() {
  timing.start();
  stopHomeMusic();
  setDefaultSoundTrack();
  resetBirdAnimation();

  if (MusicIsActive) {
    playDefaultSoundTrack();
  }
  renderPlayMusicButtons();

  let firstCard, secondCard;
  let [withLives, hasFlippedCard, lockBoard, isHardMatch] = [
    false,
    false,
    false,
    false
  ];
  let [scorePoints, moves, cardSequence, mistakes] = [0, 0, 0, 0];
  let lives = 5;
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
        console.log('You lost.');
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

  function checkResultsForAchievements() {
    if (isHardMatch && !isAchievementObtained('Player Harder Than Rock')) {
      updateAchievement('Player Harder Than Rock', 1, true);
    }

    if (!mistakes && !isAchievementObtained('Unstoppable')) {
      updateAchievement('Unstoppable', 1, true);
    }

    win_streak++;
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
        updateAchievement(
          win_achievement,
          progress,
          progress === total_progress
        );
      }
    });
  }

  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    scorePoints++;
    SCOREBOARD.innerHTML = scorePoints;
    if (scorePoints === cards.length / 2) {
      timeoutItems(() => {
        console.log('YOU WON!');
        endGame('wonMatches', true);
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

function endGame(matchResult, isWin) {
  timing.end();

  const { CurrentTemplate, matches } = onlineUser.userData;
  const END_GAME_TITLE = document.getElementById('match-result-title');
  const END_GAME_XP = document.getElementById('end-game-xp');

  updateAccount(['matches'], matches + 1);
  updateAccount([matchResult], onlineUser.userData[matchResult] + 1);
  renderGeneralInfo();
  resetAchievement('Perfect Move');

  let topBarContainerIngameElements = document.querySelectorAll(
    '.top-bar-container__top-bar-item'
  );
  hideElements(topBarContainerIngameElements);
  TOP_BAR_CONTAINER.classList.remove('top-bar-container--background');

  openMenu('end-game-menu');
  timing.render();
  END_GAME_TITLE.innerHTML = isWin ? 'Win!' : 'Game Over!';

  // drop the code below on the other if statement.
  if (isWin) {
    END_GAME_XP.innerHTML = Math.round(Math.random() * (30 - 15) + 15);
  } else {
    END_GAME_XP.innerHTML = Math.round(Math.random() * (15 - 5) + 5);
  }

  return;
  if (isWin) {
    checkResultsForAchievements();
    renderLoaderContainer('Bringing you to home...');
  } else {
    renderLoaderContainer('Try to do better next time...');
  }

  changeHomePageState(true);
  stopSoundTrack();
  if (MusicIsActive) {
    timeoutItems(playHomeMusic);
  }

  memoryDeck.innerHTML = '';

  const GAME_MENU = document.querySelector('.game-menu');

  hideElements(DECK_CONTAINER);
  fillRandomThemes();
  timeoutItems(BODY_CLASSLIST_TEMPLATE_OPTIONS[CurrentTemplate]);
  revealElements(GAME_MENU);
}

export { startGame, win_streak };
