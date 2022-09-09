import { hideElements, renderLoaderContainer, revealElements } from '../main.js';
import { MusicIsActive, playDefaultSoundTrack, renderPlayMusicButtons, stopSoundTrack } from './m-audio/audio.mjs';
import { TOP_BAR_CONTAINER, memoryDeck } from './m-themes/addCards.mjs';
import { DECK_CONTAINER } from './m-themes/deckStyles.mjs';
import { difficulty } from './m-themes/themesDifficulty.mjs';

const SCOREBOARD = document.getElementById('scorePoints');
const MOVE_COUNT = document.getElementById('moveCount');
const HEARTS = document.querySelectorAll('.heart');
let cards;

function startGame() {
  if (MusicIsActive) {
    playDefaultSoundTrack();
  }
  renderPlayMusicButtons();

  let firstCard, secondCard;
  let [hasFlippedCard, lockBoard] = [false, false];
  let [scorePoints, moves] = [0, 0];
  let lives = 5;
  let withLives = false;
  
  if (!(document.querySelector('.hearts_container').classList.contains('hide'))) {
    resetHeartsColor();
    withLives = true;
  }

  [SCOREBOARD.innerHTML, scorePoints, MOVE_COUNT.innerHTML] = [0, 0, 0];
  cards = document.querySelectorAll('.memory-card');

  function resetHeartsColor() {
    for (let heart of HEARTS) {
      heart.classList.add('alive_heart');
      heart.classList.remove('dead_heart');
    }
  }

  function loseHeart() {
    lives--;
    HEARTS[lives].classList.remove('alive_heart');
    HEARTS[lives].classList.add('dead_heart');
    if (lives === 0) {
      setTimeout(() => {
        alert("You lost.");
        renderLoaderContainer("Try to do better next time...");
        endGame();
      }, 800);
    }
  }

  function showCards() {
    cards.forEach((card) => {
      card.classList.add('flip');
      setTimeout(() => {
        card.classList.remove('flip');
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
        alert("YOU WON!");
        renderLoaderContainer("Bringing you to home...");
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
    }, 1500);
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
  addCardsListeners();
  if (difficulty === "Hard") {
    showCards();
  }
}

function endGame() {
  stopSoundTrack();
  memoryDeck.innerHTML = "";
  TOP_BAR_CONTAINER.classList.remove('top_bar_container__background');

  const GAME_MENU = document.querySelector('.game-menu');
  let topBarContainerIngameElements = document.querySelectorAll('.top_bar_item');
  
  hideElements(DECK_CONTAINER);
  hideElements(topBarContainerIngameElements);
  revealElements(GAME_MENU);
}

export { startGame };