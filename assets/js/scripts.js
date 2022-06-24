const playGameBtn = document.getElementById('playBtn');
const themes = document.querySelector('.themes-container');
const closeThemesBtn = document.querySelector('.close-icon');
const startDiv = document.getElementById('startDiv');
let startButton = document.getElementById("startBtn");

/* Play Test */

playGameBtn.addEventListener('click', showThemes);
closeThemesBtn.addEventListener('click', closeThemes);

function showThemes() {
  themes.style.display = '';
  setTimeout(() => {
    themes.classList.add('show');
  }, 10);
}

function closeThemes() {
  themes.style.display = 'none';
  themes.classList.remove('show');
}

/* Play Test */

function hideStartDiv() {
  const memoryDeck = document.getElementById('deck');
  startDiv.style.display = 'none';
  memoryDeck.style.display = 'flex';
}

function startGame() {
  hideStartDiv();
  
  const cards = document.querySelectorAll('.memory-card');

  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard, secondCard;

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
    let isMatch = firstCard.dataset.character === secondCard.dataset.character;
    isMatch ? disableCards() : unflipCards();
  }
  
  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
  
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
      let randomPos = Math.floor(Math.random() * cards.length);
      card.style.order = randomPos;
    });
  })();

  cards.forEach(card => card.addEventListener('click', flipCard));
}

startButton.addEventListener('click', startGame);