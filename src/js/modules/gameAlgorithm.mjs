import { hideElements, renderLoaderContainer, revealElements } from "../main.js";
import { MusicIsActive, playDefaultSoundTrack, renderPlayMusicButtons, stopSoundTrack } from "./m-audio/audio.mjs";
import { TOP_BAR_CONTAINER, memoryDeck } from "./m-themes/addCards.mjs";
import { DECK_CONTAINER } from "./m-themes/deckStyles.mjs";

const SCOREBOARD = document.getElementById('scorePoints');
const MOVE_COUNT = document.getElementById('moveCount');
let cards;

function startGame() {
  if (MusicIsActive) {
    playDefaultSoundTrack();
  }
  renderPlayMusicButtons();

  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard, secondCard;
  let [scorePoints, moves] = [Number(SCOREBOARD.innerHTML), Number(MOVE_COUNT.innerHTML)];

  [SCOREBOARD.innerHTML, MOVE_COUNT.innerHTML, scorePoints] = [0, 0, 0];
  cards = document.querySelectorAll('.memory-card');

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
    }
  }
  
  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    scorePoints++;
    SCOREBOARD.innerHTML = scorePoints;
    if (scorePoints === cards.length / 2) {
      console.log("YOU WON!");
      renderLoaderContainer("Bringing you to home...");
      endGame();
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
}

function endGame() {
  stopSoundTrack();
  memoryDeck.innerHTML = "";
  TOP_BAR_CONTAINER.classList.remove('top_bar_container__background');

  const GAME_MENU = document.querySelector('.game-menu');
  let topBarContainerIngameElements = document.querySelectorAll('#score, #settingsIcon');
  
  hideElements(DECK_CONTAINER);
  hideElements(topBarContainerIngameElements);
  revealElements(GAME_MENU);
}

export { startGame };