import { playDefaultSoundTrack, renderPlayMusicButtons } from "./m-audio/audio.mjs";

function startGame() {
  playDefaultSoundTrack();
  renderPlayMusicButtons();

  const CARDS = document.querySelectorAll('.memory-card');

  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard, secondCard;
  const SCORE_POINTS = document.getElementById('scorePoints');

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
    SCORE_POINTS.innerHTML++;
  
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
    CARDS.forEach(card => {
      let randomPosition = Math.floor(Math.random() * CARDS.length);
      card.style.order = randomPosition;
    });
  })();

  CARDS.forEach(card => card.addEventListener('click', flipCard));
}

export { startGame };