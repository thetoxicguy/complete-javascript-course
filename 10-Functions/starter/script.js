'use strict';

// const poll = {
//   question: 'What is your favorite programming language?',
//   options: ['0: Javascript', '1: Python', '2: Rust', '3: C++'],
//   answers: new Array(4).fill(0),
//   registerNewAnswer: function () {
//     const favorite = Number(
//       window.prompt(
//         `${this.question}
// ${this.options.join('\n')}
// (Write option number)`
//       )
//     );

//     0 <= favorite && favorite < this.answers.length && this.answers[favorite]++;

//     //   if-else statement to return error in input
//     //   if (isNaN(favorite) || 3 < favorite || favorite < 0) {
//     //     console.log('Please enter a number between 0 and 3');
//     //   } else {
//     //     const index = favorite;
//     //     this.answers[index]++;
//     //     //   console.log(this.answers);
//     //   }

//     this.displayResults('array');
//     return favorite;
//   },

//   displayResults: function (type = 'array') {
//     if (type === 'array') {
//       console.log(this.answers);
//     } else if (type === 'string') {
//       console.log(`Poll results are ${this.answers.join(', ')}`);
//     }
//   },
// };

// // const result = poll.registerNewAnswer();

// document
//   //   .querySelector('.poll')
//   .addEventListener('click', poll.registerNewAnswer.bind(poll));

// poll.displayResults.call({ answers: [5, 2, 3] }, 'string');

// // ------------------------------ Coding challenge #2: IIFE
// (function () {
//   const header = document.querySelector('h1');
//   header.style.color = 'red';

//   document.body.addEventListener('click', () => {
//     header.style.color = 'Blue';
//   });
// })();

// // ------------------------------ Closure example 1: Returning a function
// const secureEnvironment = function () {
//   let temp = 16;

//   return function () {
//     temp++;
//     console.log('Temperature now is set to ', temp);
//   };
// };

// const riseTemp = secureEnvironment();

// riseTemp();
// riseTemp();
// riseTemp();

// // ------------------------------ Closure example 2: Reassigning a function
// let saySomething = function () {};

// const actionChange = function () {
//   let speak = 'Hi';
//   saySomething = function () {
//     console.log(speak);
//   };
// };

// actionChange();
// saySomething();

// ------------------------------ Closure example 3: Set a timed function

const bomb = function () {
  let event = 'boom!!!';
  setTimeout(function () {
    console.log(event);
  }, 3000);
};

bomb();
