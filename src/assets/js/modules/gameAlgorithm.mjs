import { playDefaultSoundTrack, renderPlayMusicButtons } from "./m-audio/audio.mjs";

let cards;
const SCOREBOARD = document.getElementById('scorePoints');

function startGame() {
  playDefaultSoundTrack();
  renderPlayMusicButtons();

  cards = document.querySelectorAll('.memory-card');
  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard, secondCard;
  let scorePoints = Number(SCOREBOARD.innerHTML);

  function flipCard() {
    if (lockBoard) return;
    this.classList.add('flip');
    if (this === firstCard) return;
  
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
    if (scorePoints === 4 || scorePoints === 7 || scorePoints === 10) {
      alert("YOU WON!");
      endGame(addCardsListeners);
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

function endGame(addCardsListeners) {
  addCardsListeners();
}

export { startGame };