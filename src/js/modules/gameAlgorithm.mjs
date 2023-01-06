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
import {
  resetBirdAnimation,
  startBirdAnimation
} from './animations/forest_theme/BirdAnimation.mjs';
import { fillRandomThemes } from './randomThemes/fillRandomThemes.mjs';
import { onlineUser } from './auth/AccountMethods.mjs';
import { BODY_CLASSLIST_TEMPLATE_OPTIONS } from './templates/TemplatesData.mjs';

const SCOREBOARD = document.getElementById('scorePoints');
const MOVE_COUNT = document.getElementById('moveCount');
const HEARTS = document.querySelectorAll('.hearts-container__heart');
let cards;

function startGame() {
  stopHomeMusic();
  setDefaultSoundTrack();
  resetBirdAnimation();

  if (MusicIsActive) {
    playDefaultSoundTrack();
  }
  renderPlayMusicButtons();

  let firstCard, secondCard;
  let [withLives, hasFlippedCard, lockBoard] = [false, false, false];
  let [scorePoints, moves] = [0, 0];
  let lives = 5;
  changeHomePageState(false);

  if (
    !document
      .querySelector('.left-content__hearts-container')
      .classList.contains('hide')
  ) {
    resetHeartsColor();
    withLives = true;
  }

  [SCOREBOARD.innerHTML, scorePoints, MOVE_COUNT.innerHTML] = [0, 0, 0];
  cards = document.querySelectorAll('.memory-card');

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
        alert('You lost.');
        renderLoaderContainer('Try to do better next time...');
        endGame();
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
    this.classList.add('flip');
    if (this === firstCard) return;

    moves++;
    MOVE_COUNT.innerHTML = moves;

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
    if (isMatch) {
      disableCards();
      withLives ? recoverHeart() : null;
    } else {
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
      setTimeout(() => {
        alert('YOU WON!');
        renderLoaderContainer('Bringing you to home...');
        endGame();
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

function endGame() {
  changeHomePageState(true);
  stopSoundTrack();
  if (MusicIsActive) {
    timeoutItems(playHomeMusic);
  }

  memoryDeck.innerHTML = '';
  TOP_BAR_CONTAINER.classList.remove('top-bar-container--background');

  const GAME_MENU = document.querySelector('.game-menu');
  let topBarContainerIngameElements = document.querySelectorAll(
    '.top-bar-container__top-bar-item'
  );

  hideElements(DECK_CONTAINER);
  hideElements(topBarContainerIngameElements);
  fillRandomThemes();
  timeoutItems(
    BODY_CLASSLIST_TEMPLATE_OPTIONS[onlineUser.userData.CurrentTemplate]
  );
  revealElements(GAME_MENU);
}

export { startGame };
