'use strict';

// Data needed for first part of the section
// const restaurant = {
//   name: 'Classico Italiano',
//   location: 'Via Angelo Tavanti 23, Firenze, Italy',
//   categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
//   starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
//   mainMenu: ['Pizza', 'Pasta', 'Risotto'],

//   openingHours: {
//     thu: {
//       open: 12,
//       close: 22,
//     },
//     fri: {
//       open: 11,
//       close: 23,
//     },
//     sat: {
//       open: 0, // Open 24 hours
//       close: 24,
//     },
//   },
// };

// // Coding Challenge #1
// const game = {
//   team1: 'Bayern Munich',
//   team2: 'Borrussia Dortmund',
//   players: [
//     [
//       'Neuer',
//       'Pavard',
//       'Martinez',
//       'Alaba',
//       'Davies',
//       'Kimmich',
//       'Goretzka',
//       'Coman',
//       'Muller',
//       'Gnarby',
//       'Lewandowski',
//     ],
//     [
//       'Burki',
//       'Schulz',
//       'Hummels',
//       'Akanji',
//       'Hakimi',
//       'Weigl',
//       'Witsel',
//       'Hazard',
//       'Brandt',
//       'Sancho',
//       'Gotze',
//     ],
//   ],
//   score: '4:0',
//   scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
//   date: 'Nov 9th, 2037',
//   odds: {
//     team1: 1.33,
//     x: 3.25,
//     team2: 6.5,
//   },
// };

// //  1. Create player array for each team
// const [players1, players2] = game.players;
// console.log(players1, players2);
// // console.log(`Team 1 players: ${players1}
// // Team 2 players ${players2}`);

// // 2. First player is the gk
// const [gk, ...fieldPlayers] = players1;
// console.log(gk, fieldPlayers);

// // 3. Create a list of all players from both teams
// const allPlayers = [...players1, ...players2];
// console.log(allPlayers);

// // 4. Add substitute players to players1
// const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
// console.log(players1Final);

// // 5. Create variables for the odds
// const {
//   odds: { team1, x: draw, team2 },
// } = game;
// console.log(`Team 1: ${team1}, Draw: ${draw}, Team 3: ${team2}`);

// 6. Print goals function
// const printGoals = (...scorers) => {
//   console.log(`${scorers.length} goals were scored`);
//   for (let [i, player] of scorers.entries()) {
//     console.log(`Goal ${i + 1}: ${player}`);
//   }
// };

// printGoals(...game.scored);

// team1 < team2 && console.log('Team 1 is more likely to win');
// team2 < team1 && console.log('Team 2 is more likely to win');

// Coding challenge #2
// 1. Print goals with corresponding players
// const printGoals = (...scorers) => {
//   console.log(`${scorers.length} goals were scored`);
//   for (let [i, player] of scorers.entries()) {
//     console.log(`Goal ${i + 1}: ${player}`);
//   }
// };

// // 2. Print the odds average
// let average = 0;
// const odds = Object.values(game?.odds);
// for (const odd of odds) {
//   average += odd;
// }
// average /= odds.length;

// console.log(average);

// // 3. Print odds for each expected result
// function printOdds(match) {
//   const oddsArr = Object.entries(match?.odds);
//   for (const [team, odd] of oddsArr) {
//     console.log(
//       `Odds for ${team === 'x' ? 'draw' : `victory of ${match[team]}`}: ${odd}`
//     );
//   }
// }

// printGoals(...game.scored);
// printOdds(game);

// const [team1, team2] = Object.entries(game.odds);

// const scorers = game.scored;
// const count = {};

// scorers.forEach(el => {
//   count[el] = (count[el] || 0) + 1;
// });

// console.log(count);

// // Coding challenge #3
// const gameEvents = new Map([
//   [17, '⚽️ GOAL'],
//   [36, '🔁 Substitution'],
//   [47, '⚽️ GOAL'],
//   [61, '🔁 Substitution'],
//   [64, '🔶 Yellow card'],
//   [69, '🔴 Red card'],
//   [70, '🔁 Substitution'],
//   [72, '🔁 Substitution'],
//   [76, '⚽️ GOAL'],
//   [80, '⚽️ GOAL'],
//   [92, '🔶 Yellow card'],
// ]);

// // 1. Creat an events array (no duplicates)
// const events = [...gameEvents.values()];

// console.log(events);

// // 2. Remove Yellow card from gameEvents
// gameEvents.delete(64);
// console.log(gameEvents);

// // 3. Print average minutes on which an event took place during the game

// console.log(gameEvents);
// console.log(
//   `An event happened, on average, every ${90 / gameEvents.size} minutes`
// );

// for (let [minute, event] of gameEvents) {
//   console.log(
//     `${event} ocurred in the ${minute <= 45 ? 'first' : 'second'} half`
//   );
// }

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

const button = document.querySelector('button');
button.addEventListener('click', () => {
  const text = document.querySelector('textarea').value;
  convertTextareaInput(text);
});

const check = '✅';

// const convertList = function (arr) {
//   let arrCamelCase = [];
//   for (let i = 0; i < arr.length; i++) {
//     arrCamelCase.push(toCamelCase(arr[i], '_') + check.repeat(i + 1));
//   }
//   console.log(arrCamelCase);
// };

const toCamelCase = function (str) {
  let strSplit = str.toLowerCase().trim().split('_');
  if (strSplit.length < 3) {
    let [first, second] = strSplit;
    const output = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`;
    return output;
  }
};

const convertTextareaInput = function (str) {
  const strSplit = str.split('\n');
  let arrCamelCase = [];

  for (let [i, text] of strSplit.entries()) {
    console.log(toCamelCase(text).padEnd(20) + check.repeat(i + 1));
  }
};

let drl = ['daniel_robles', 'es_matemático', 'que_programa', 'para_apps'];
let drl2 = [
  'daniel_robles_lopez',
  'es_un_matemático',
  'que_ahora_está_programando',
  'para_hacer_apps',
];

// convertList(drl);
toCamelCase('Daniel_robles');
