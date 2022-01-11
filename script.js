'use strict';

// TODO:
// - Add instructions modal
// - Optimization: create a function that returns JSON of all player turn details
// - Duplicate code - use dynamic selectors, toggle() for classes, or switchPlayer() function
// - Use `scores` array

// Selectors
const scoreElement1 = document.getElementById('score--0');
const scoreElement2 = document.getElementById('score--1');
const currScoreElement1 = document.getElementById('current--0');
const currScoreElement2 = document.getElementById('current--1');
const sectionElement1 = document.querySelector('.player--0');
const sectionElement2 = document.querySelector('.player--1');
const dice = document.querySelector('.dice');

const newGameButton = document.querySelector('.btn--new');
const rollDiceButton = document.querySelector('.btn--roll');
const holdButton = document.querySelector('.btn--hold');

// Initial game state
scoreElement1.textContent = 0;
scoreElement2.textContent = 0;
dice.classList.add('hidden');

// const scores = [0, 0];
let playerTurn = 1;
let currScore1 = 0;
let currScore2 = 0;
let score1 = 0;
let score2 = 0;
let winner = false;
let diceNumber = 1;

const rollDice = () => {
  diceNumber = Math.trunc(Math.random() * 6) + 1;
  if (score1 >= 100 || score2 >= 100) {
    return;
  } else {
    dice.textContent = diceNumber;
    dice.src = `dice-${diceNumber}.png`;
    dice.classList.remove('hidden');
    if (diceNumber === 1) {
      if (playerTurn) {
        currScore1 = 0;
      } else {
        currScore2 = 0;
      }
      playerTurn = playerTurn ? 0 : 1;
      if (playerTurn) {
        sectionElement2.classList.remove('player--active');
        sectionElement1.classList.add('player--active');
      } else {
        sectionElement1.classList.remove('player--active');
        sectionElement2.classList.add('player--active');
      }
    } else {
      if (playerTurn) {
        currScore1 += diceNumber;
        currScoreElement1.textContent = currScore1;
      } else {
        currScore2 += diceNumber;
        currScoreElement2.textContent = currScore2;
      }
    }
  }
};

const hold = () => {
  if (playerTurn && !winner) {
    score1 += currScore1;
    currScore1 = 0;
    scoreElement1.textContent = score1;
    currScoreElement1.textContent = currScore1;
  } else {
    score2 += currScore2;
    currScore2 = 0;
    scoreElement2.textContent = score2;
    currScoreElement2.textContent = currScore2;
  }

  if (score1 >= 100 || score2 >= 100) {
    sectionElement1.classList.remove('player--active');
    sectionElement2.classList.remove('player--active');
    if (score1 >= 100 && score2 < 100) {
      sectionElement1.classList.add('player--winner');
    }
    if (score2 >= 100 && score1 < 100) {
      sectionElement2.classList.add('player--winner');
    }
    dice.classList.add('hidden');
    winner = true;
  } else {
    playerTurn = playerTurn ? 0 : 1;
    if (playerTurn) {
      sectionElement2.classList.remove('player--active');
      sectionElement1.classList.add('player--active');
    } else {
      sectionElement1.classList.remove('player--active');
      sectionElement2.classList.add('player--active');
    }
  }
};

const reset = () => {
  // Reset game state values
  playerTurn = 1;
  currScore1 = 0;
  currScore2 = 0;
  score1 = 0;
  score2 = 0;
  winner = false;
  diceNumber = 1;

  // Reset UI
  scoreElement1.textContent = score1;
  scoreElement2.textContent = score2;
  currScoreElement1.textContent = currScore1;
  currScoreElement2.textContent = currScore2;
  sectionElement1.classList.add('player--active');
  sectionElement2.classList.remove('player--active');
  sectionElement1.classList.remove('player--winner');
  sectionElement2.classList.remove('player--winner');
  dice.classList.add('hidden');
};

// Event Handlers
newGameButton.addEventListener('click', reset);
rollDiceButton.addEventListener('click', rollDice);
holdButton.addEventListener('click', hold);
