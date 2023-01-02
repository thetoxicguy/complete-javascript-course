'use strict';

// // -------------------------------- Coding Challenge #1
// const checkDogs = function (arr1, arr2) {
//   // 1.
//   const cleanArr1 = arr1.slice(1, -2);
//   // let cleanArr1 = arr1.slice();
//   // cleanArr1.splice(0, 1);
//   // cleanArr1.splice(-2);
//   // console.log(cleanArr1);

//   // 2.
//   const arr = cleanArr1.concat(arr2);

//   // 3.
//   arr.forEach(function (item, index) {
//     console.log(
//       `Dog number ${index + 1} is ${
//         item < 3 ? 'still a puppy' : `an adult and is ${item} years old`
//       }`
//     );
//   });
// };

// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// console.log('----Other data set----');
// checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

// // -------------------------------- Coding Challenge #2
// const calcAverageHumanAge = arr => {
//   const humanAges = arr.map(dogAge =>
//     dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4
//   );
//   const adults = humanAges.filter(humanAge => 18 < humanAge);
//   const adultAvg = adults.reduce((acc, item) => acc + item, 0) / adults.length;

//   // const adultAvg = adults.reduce(
//   //   (acc, age, i, iterationArr) => acc + age / iterationArr.length,
//   //   0
//   // );

//   console.log(`Adults in human age are: ${adults.join(', ')}`);
//   console.log(`Average of human ages for adults: ${adultAvg}`);
//   // return adults;
// };

// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

// // -------------------------------- Coding Challenge #3
// const calcAverageHumanAge = arr =>
//   arr
//     .map(dogAge => (dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4))
//     .filter(humanAge => 18 < humanAge)
//     .reduce((acc, age, i, iterationArr) => acc + age / iterationArr.length, 0);

// console.log(
//   `Average of human ages for adults: ${calcAverageHumanAge([
//     5, 2, 4, 1, 15, 8, 3,
//   ])}`
// );
// console.log(
//   `Average of human ages for adults: ${calcAverageHumanAge([
//     16, 6, 10, 5, 6, 1, 4,
//   ])}`
// );

// -------------------------------- Coding Challenge #4
// Coding Challenge #4

// TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1.
const recommendedPortion = dog => dog.weight ** 0.75 * 28; // grams;

dogs.forEach(dog => (dog.recommendedFoodPortion = recommendedPortion(dog)));
console.log(dogs);

// 2.
const isRecommendedPortion = dog =>
  0.9 * dog.recommendedFoodPortion < dog.curFood &&
  dog.curFood < 1.1 * dog.recommendedFoodPortion;

const isDogPortionOk = dogsOwner =>
  isRecommendedPortion(dogs.find(dog => dog.owners.includes(dogsOwner)));

const sarahsDog = dogs.find(dog => dog.owners.includes('Sarah'));

console.log(`Sarahs dog recommended portion: ${sarahsDog.recommendedFoodPortion}
The minimum portion can be: ${sarahsDog.recommendedFoodPortion * 0.9}
The maximum portion is ${sarahsDog.recommendedFoodPortion * 1.1}`);

console.log(`Is Sarah's dog portion OK? ${isDogPortionOk('Sarah')}`);

// 3. Owners that feed their dogs too much

// Create full owners list
const ownersList = dogs.flatMap(dog => dog.owners);

console.log(`Owners list: ${ownersList}`);

// Calculate if a dog is overfed
const isDogOverfeed = dog => 1.1 * dog.recommendedFoodPortion < dog.curFood;

// List owners who feed their dogs excesively
const ownersFeedTooMuch = () =>
  dogs.filter(dog => isDogOverfeed(dog)).flatMap(dog => (dog = dog.owners));

console.log(`Sarah's dog is overfeed? ${isDogOverfeed(sarahsDog)}`);

console.log(ownersFeedTooMuch());

// List owners who feed their dogs with less than indicated
const isDogUnderfeed = dog => dog.curFood < 0.9 * dog.recommendedFoodPortion;

const ownersFeedTooLittle = () => {
  const underfeeders = [];
  dogs.forEach(dog => {
    underfeeders.push(isDogUnderfeed(dog) ? dog.owners : []);
  });
  console.log(`The list of underfeeders is: ${underfeeders.flat()}`);
  return underfeeders.flat();
};

console.log(ownersFeedTooLittle());

// 4.Strings from the results of 3
console.log(
  `${ownersFeedTooMuch().join(
    ' and '
  )}'s dogs eat too much!, and ${ownersFeedTooLittle().join(
    ' and '
  )}'s dogs eat too little!`
);

// 5. Is there any dog that eats exactly the recommended amount?
console.log(
  `Is there any dog that eats the exact recommended amount? ${dogs.some(
    dog => dog.recommendedFoodPortion === dog.curFood
  )}`
);

// 6. Is there any dog that eats the recommended amount?
console.log(
  `Is there any dog properly fed? ${dogs.some(dog =>
    isRecommendedPortion(dog)
  )}`
);

// 7. Create an array with the dogs (indexes) that are eating ok
const dogsEatingOk = [];
dogs.forEach((dog, i) => {
  if (isRecommendedPortion(dog)) {
    dogsEatingOk.push(i);
  }
});

console.log(dogsEatingOk);

// 8. Create a shallow copy of the dogs array and sort it by recommended food portion
const dogsSorted = dogs
  .slice()
  .sort((a, b) => a.recommendedFoodPortion - b.recommendedFoodPortion);

console.log(dogsSorted);
/*
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array,
   simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array,
   and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

*/

// --------------------------------BANKIST APP
// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const euroToUSD = 1.1;

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// const movementsUSD = account1.movements.map(mov =>
//   Number((mov * euroToUSD).toFixed(2))
//   );

//   console.log(movementsUSD);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// The following lines work just because of the last line,
// but they create an array that is useless:

// const displayMovements = function (account) {
//   containerMovements.innerHTML = '';
//   account.movements.map((mov, i) => {
//     const movType = 0 < mov ? 'deposit' : 'withdrawal';
//     const html = `<div class="movements__row">
//         <div class="movements__type movements__type--${movType}">${
//       i + 1
//     } ${movType} </div>
//         <div class="movements__value">${mov}€</div>
//       </div>`;
//     containerMovements.insertAdjacentHTML('afterbegin', html);
//   });
// };
/////////////////////////////////////////////////
/////////////////////////////////////////////////
const createUsernames = accs =>
  // For each is used here to produce a "side effect", not just a new array
  accs.forEach((acc, i) => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(str => str.at(0))
      .join('');
  });

createUsernames(accounts);
console.log(accounts);

// Login

let currentAccount;

// ---------------Display Balance
let balance;

const calcDisplayBalance = movements => {
  balance = movements.reduce((prev, mov) => prev + mov);
  labelBalance.textContent = `${balance}€`;
};

// ---------------Empty Movements list
const clearMovementsList = () => {
  containerMovements.innerHTML = '';
};

// ---------------Display Movements
let sorted = false;

const displayMovements = function (movements, sort) {
  clearMovementsList();
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const movType = 0 < mov ? 'deposit' : 'withdrawal';
    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${movType}">${
      i + 1
    } ${movType} </div>  
    <div class="movements__value">${mov}€</div>
      </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
  console.log(sort);
};

btnSort.addEventListener('click', e => {
  e.preventDefault();
  sorted = !sorted;
  displayMovements(currentAccount.movements, sorted);
});

// ---------------Movements Descriptions (pending)
const movementDescriptions = account1.movements.map((mov, i) => {
  const movType = 0 < mov ? 'deposited' : 'withdrew';
  return `Movement ${i + 1}: You ${movType} ${Math.abs(mov)}`;
});

// ---------------Display Summary
let deposits;
let withdrawals;

const calculateDisplaySummary = acc => {
  deposits = acc.movements.filter(mov => 0 < mov);
  withdrawals = acc.movements.filter(mov => mov < 0);

  const depositsTotal = deposits.reduce((prev, curr) => prev + curr, 0);
  const withdrawalsTotal = withdrawals.reduce((prev, curr) => prev + curr, 0);

  labelSumIn.textContent = `${depositsTotal}€`;
  labelSumOut.textContent = `${Math.abs(withdrawalsTotal)}€`;

  const interests = deposits.map(deposit => (deposit * acc.interestRate) / 100);
  // The account only pays interests if that interest is at least 1€
  const interestsTotal = interests
    .filter(interest => 1 <= interest)
    .reduce((acc, item) => acc + item);
  labelSumInterest.textContent = `${interestsTotal}€`;
};

// ---------------Test login
const refreshUI = acc => {
  calcDisplayBalance(acc.movements);
  displayMovements(acc.movements);
  calculateDisplaySummary(acc);
};

const displayWelcome = owner => {
  labelWelcome.textContent = `Welcome ${owner.split(' ').at(0)}`;
};

// ---------------Test login
const testLogin = (userInput, pinInput) => {
  currentAccount = accounts.find(account => account.username === userInput);
  // The following "optional chaining" is because we may have undefined currentAccount
  if (currentAccount?.pin === Number(pinInput)) {
    containerApp.style.opacity = 100;
    displayWelcome(currentAccount.owner);
    refreshUI(currentAccount);
    inputLoginUsername.value = inputLoginPin.value = '';
    // The following two lines make the inputs loose focus
    inputLoginUsername.blur();
    inputLoginPin.blur();
  } else {
    console.log('Incorrect user or password, try again');
  }
};

btnLogin.addEventListener('click', e => {
  e.preventDefault();
  clearMovementsList();
  testLogin(inputLoginUsername.value, inputLoginPin.value);
});

// ---------------Transfer money
const transfer = (usernameInput, transferAmount) => {
  inputTransferTo.value = inputTransferAmount.value = '';
  inputTransferTo.blur();
  inputTransferAmount.blur();
  let recipientAccount = accounts.find(
    account => account.username === usernameInput
  );
  if (
    recipientAccount &&
    recipientAccount.username !== currentAccount.username &&
    0 < transferAmount &&
    transferAmount <= balance
  ) {
    currentAccount.movements.push(-transferAmount);
    recipientAccount.movements.push(Number(transferAmount));
    console.log(
      `Recipient: ${recipientAccount.owner}, Ammount ${transferAmount}`
    );
    refreshUI(currentAccount);
  } else {
    console.log('Invalid transfer, try again please');
  }
};

btnTransfer.addEventListener('click', e => {
  e.preventDefault();
  transfer(inputTransferTo.value, inputTransferAmount.value);
});

const clearUI = () => {
  currentAccount = undefined;
  balance = 0;
  deposits = [];
  withdrawals = [];
};

// ---------------Request loan
const requestLoan = amountInput => {
  if (
    0 < amountInput &&
    currentAccount.movements.some(mov => amountInput * 0.1 <= mov)
  ) {
    currentAccount.movements.push(amountInput);
    inputLoanAmount.value = '';
    inputLoanAmount.blur();
    refreshUI(currentAccount);
    console.log('Loan accepted');
  } else {
    console.log('The loan cannot be accepted');
  }
};

btnLoan.addEventListener('click', e => {
  e.preventDefault();
  requestLoan(Number(inputLoanAmount.value));
});

// ---------------Close account
const closeAccount = (usernameInput, pinInput) => {
  // console.log(currentAccount.username, currentAccount.pin);
  if (
    usernameInput === currentAccount.username &&
    Number(pinInput) === currentAccount.pin
  ) {
    const closeIndex = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    accounts.splice(closeIndex, 1);
    containerApp.style.opacity = 0;
    clearUI();
    console.log(accounts);
  } else {
    console.log('Invalid user or pin');
  }
  inputCloseUsername.value = '';
  inputClosePin.value = '';
  inputCloseUsername.blur();
  inputClosePin.blur();
};

btnClose.addEventListener('click', e => {
  e.preventDefault();
  closeAccount(inputCloseUsername.value, inputClosePin.value);
});

// // ---------------Array constructor exercise
// labelBalance.addEventListener('click', () => {
//   const movementsUI = Array.from(
//     document.querySelectorAll('.movements__value')
//   );
//   console.log(movementsUI.map(el => el.textContent.replace('€', '')));
// });

// //---------------More exercises
// // 1. flatMap
// const bankDepositSum = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => 0 < mov)
//   .reduce((accum, cur) => accum + cur);
// console.log(`Total Bankist deposits: $${bankDepositSum}`);

// // 2.Deposits over $1,000
// const numDeposits1000Bis = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => 1000 <= mov).length;
// console.log(`Number of Bankist deposits above 1,000: ${numDeposits1000Bis}`);

// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((count, cur) => (1000 <= cur ? ++count : count), 0);
// console.log(`Number of Bankist deposits above 1,000: ${numDeposits1000}`);

// //  3. Show sums of Deposits & Withdrawals
// const { totalDeposits, totalWithdrawals } = accounts
//   .flatMap(acc => acc.movements)
//   .reduce(
//     (tots, cur) => {
//       // 0 < cur ? (tots.totalDeposits += cur) : (tots.totalWithdrawals += cur);
//       tots[0 < cur ? 'totalDeposits' : 'totalWithdrawals'] += cur;
//       return tots;
//     },
//     {
//       totalDeposits: 0,
//       totalWithdrawals: 0,
//     }
//   );

// console.log(`Total amount of deposits is ${totalDeposits}
// Total amount of withdrawals is  ${totalWithdrawals}`);

// // 4. Convert to titlecase
// // This callback will be used two times
// const capitalize = text => text[0].toUpperCase() + text.slice(1);

// const convertTitleCase = title => {
//   const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

//   const titleCase = title
//     .toLowerCase()
//     .split(' ')
//     .map(word => (exceptions.includes(word) ? word : capitalize(word)))
//     .join(' ');
//   // In case the text starts with an exception word
//   return capitalize(titleCase);
// };

// console.log(convertTitleCase('this is a nice title'));
// console.log(convertTitleCase('this is a LONG title but not too long'));
// console.log(convertTitleCase('and here is another title with an example'));
