'use strict';

// ---------------------------------- DOM Common display
const buttonNew = document.querySelector('.btn--new');

const dice = document.querySelector('.dice');

const buttonRoll = document.querySelector('.btn--roll');
const buttonHold = document.querySelector('.btn--hold');

// ---------------------------------- DOM Player one display
const player0Panel = document.querySelector('.player--0');
const scoreP0El = document.getElementById('score--0');
// const scoreP0 = document.querySelector('#score--0'); // This is the same (for small calls)
const currentScoreP0El = document.querySelector('#current--0');

// ---------------------------------- DOM Player one display
const player1Panel = document.querySelector('.player--1');
const scoreP1El = document.getElementById('score--1');
// const scoreP1 = document.querySelector('#score--1'); // This is the same (for small calls)
const currentScoreP1El = document.querySelector('#current--1');

// ---------------------------------- Starting conditions
let activePlayer, isPlaying, scores, currentScore;

// ---------------------------------- New Game
const init = () => {
  activePlayer = 0;
  isPlaying = true;
  scores = [0, 0];
  currentScore = 0;

  scoreP0El.textContent = scores[0];
  scoreP1El.textContent = scores[1];
  currentScoreP0El.textContent = 0;
  currentScoreP1El.textContent = 0;

  dice.classList.add('hidden');

  player0Panel.classList.add('player--active');
  player1Panel.classList.remove('player--active');
  player0Panel.classList.remove('player--winner');
  player1Panel.classList.remove('player--winner');
};

init();

// ---------------------------------- Switch player
const switchPlayer = () => {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  //   document
  //     .querySelector(`.player--${activePlayer}`)
  //     .classList.remove('player--active');

  activePlayer = ++activePlayer % 2;
  player0Panel.classList.toggle('player--active');
  player1Panel.classList.toggle('player--active');
};

const holdHandler = () => {
  if (isPlaying) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (100 <= scores[activePlayer]) {
      isPlaying = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.toggle('player--active');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      console.log(`Player ${activePlayer + 1} wins!!!`);
    } else {
      switchPlayer();
    }
    dice.classList.add('hidden');
  }
};

// ---------------------------------- Roll the dice
// diceRollHandler
const diceRollHandler = () => {
  if (isPlaying) {
    // 1. Generate random number between 1 and 6
    const rolledNumber = Math.floor(Math.random() * 6 + 1);
    console.log(rolledNumber);

    // 2. Display dice
    dice.classList.remove('hidden');
    dice.src = `dice-${rolledNumber}.png`;

    //   3. Add rolled number to the score (if different than 1)
    if (rolledNumber === 1) {
      switchPlayer();
    } else {
      currentScore += rolledNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
  }
};

buttonRoll.addEventListener('click', diceRollHandler);
buttonHold.addEventListener('click', holdHandler);
buttonNew.addEventListener('click', init);
