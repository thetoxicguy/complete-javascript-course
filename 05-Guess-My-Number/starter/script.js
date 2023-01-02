'use strict';
/* console.log(document.querySelector('.message'));
document.querySelector('.message').textContent = 'Algo chido 2';
document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 21;
document.querySelector('.guess').value = 23;
*/

const generateSecret = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

let score = 20;
let highScore = 0;
let min = 1;
let max = 20;
let secret = generateSecret(min, max);
const checkButton = document.querySelector('.check');
const resetButton = document.querySelector('.again');
const body = document.querySelector('body');
const numberBoard = document.querySelector('.number');

const displayMessage = msg => {
  document.querySelector('.message').textContent = msg;
};

const reset = () => {
  score = 20;
  document.querySelector('.score').textContent = score;
  document.querySelector('.guess').value = '';
  secret = generateSecret(min, max);
  checkButton.disabled = false;
  checkButton.textContent = 'Check!';
  document.querySelector('.number').textContent = '??';
  displayMessage('Start Guessing...');
  body.style.backgroundColor = '#222';
  numberBoard.style.width = '15rem';
  console.log(secret);
};

const reduceScore = () => {
  score--;
  document.querySelector('.score').textContent = score;
};

let setHighScore = () => {
  if (highScore < score) {
    highScore = score;
    document.querySelector('.highscore').textContent = highScore;
  }
};

checkButton.addEventListener('click', () => {
  const guess = Number(document.querySelector('.guess').value);

  // In the case that 0 is not included as a guess, we can set this first test
  // In case that 0 is included, another test on the type has to be made
  if (!guess) {
    displayMessage('No number! ⛔');
  } else if (guess === secret) {
    {
      setHighScore();
      displayMessage('You have the right number! 🎉');
      numberBoard.textContent = secret;
      checkButton.textContent = 'Again?!';
      checkButton.disabled = true;
      body.style.backgroundColor = 'green';
      numberBoard.style.width = '30rem';
    }
  } else if (guess !== secret && 1 <= score) {
    reduceScore();
    displayMessage(guess < secret ? 'Too low 🔻' : 'Too high 🔺');
  }
  if (score < 1) {
    displayMessage('You lost the game 💥');
  }
});

resetButton.addEventListener('click', () => {
  reset();
});
console.log(secret);
