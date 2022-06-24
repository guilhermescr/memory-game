import { playSwapEffect, stopSwapEffect } from "./modules/effects.mjs";
import { closeMenuButtons } from "./modules/menuActions.mjs";
import { showMenu, closeMenu } from "./modules/menuActions.mjs";
import { settingsOptions } from "./modules/menuActions.mjs";

settingsOptions.forEach((setting) => {
  setting.addEventListener('click', showMenu);
});
closeMenuButtons.forEach((closeButton) => {
  closeButton.addEventListener('click', closeMenu);
});

settingsOptions.forEach((setting) => {
  setting.addEventListener('mouseenter', playSwapEffect);
});

settingsOptions.forEach((setting) => {
  setting.addEventListener('mouseleave', stopSwapEffect);
});
// End Switching

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