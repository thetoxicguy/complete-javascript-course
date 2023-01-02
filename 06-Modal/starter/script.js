'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
// The following line selects not only the first appearance of "show-modal", but all the appearances of that class
// Instead of just one HTML element, "modalButtons" is a list that contains HTML elements with class "show-modal"
const modalButtons = document.querySelectorAll('.show-modal');
const btnCloseModal = document.querySelector('.close-modal');

const openModal = () => {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// Add event listener for each buttons of the array "modalButtons"
for (let button of modalButtons) {
  button.addEventListener('click', openModal);
}

btnCloseModal.addEventListener('click', closeModal);

// Esc key has been pressed
document.addEventListener('keydown', e => {
  console.log(e.key);
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
