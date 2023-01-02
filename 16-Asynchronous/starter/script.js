// 'use strict';

const btn = document.querySelector('.btn-country');
// const countriesContainer = document.querySelector('.countries');

// ///////////////////////////////////////

// // // ------------------------------ AJAX calls
// // const getCountryData = function (country) {
// //   const request = new XMLHttpRequest();

// //   // First open the request
// //   request.open('GET', `https://restcountries.com/v2/name/${country}`);
// //   console.log(request);

// //   // Now send the open request
// //   request.send();

// //   console.log(request.responseText);

// //   // Then we wait for the response
// //   request.addEventListener('load', function () {
// //     const [data] = JSON.parse(this.responseText);
// //     console.log(data);

// //     const html = `
// //     <article class="country">
// //     <img class="country__img" src=${data.flag} />
// //     <div class="country__data">
// //     <h3 class="country__name">${data.name}</h3>
// //     <h4 class="country__region">${data.region}</h4>
// //       <p class="country__row"><span>👫</span>POP ${(
// //         +data.population / 1000000
// //         ).toFixed(2)}</p>
// //       <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
// //       <p class="country__row"><span>💰</span>${
// //         data.currencies[0]
// //       }currencies.name</p>
// //     </div>
// //     </article>
// //     `;

// //     countriesContainer.insertAdjacentHTML('beforeend', html);
// //     countriesContainer.style.opacity = 1;
// //   });
// // };

// // getCountryData('mexico');
// // getCountryData('portugal');

// // // ------------------------------ AJAX
// // // (we need promises to avoid nested callbacks (Callback Hell)

// // const renderCountry = function (data, className = '') {
// //   const html = `
// //   <article class="country ${className}">
// //   <img class="country__img" src=${data.flag} />
// //   <div class="country__data">
// //   <h3 class="country__name">${data.name}</h3>
// //   <h4 class="country__region">${data.region}</h4>
// //     <p class="country__row"><span>👫</span>POP ${(
// //       +data.population / 1000000
// //     ).toFixed(2)}</p>
// //     <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
// //     <p class="country__row"><span>💰</span>${
// //       data.currencies[0]
// //     }currencies.name</p>
// //   </div>
// //   </article>
// //   `;

// //   countriesContainer.insertAdjacentHTML('beforeend', html);

// //     // At the end we just need to make the container appear
// //   countriesContainer.style.opacity = 1;

// // };

// // const getCountryAndNeighbours = function (country) {
// //   // Country request
// //   const request = new XMLHttpRequest();

// //   // First open the request
// //   request.open('GET', `https://restcountries.com/v2/name/${country}`);
// //   // console.log(request);

// //   // Now send the open request
// //   request.send();

// //   console.log(request.responseText);

// //   // Then we wait for the response
// //   request.addEventListener('load', function () {
// //     const [data] = JSON.parse(this.responseText);
// //     renderCountry(data);

// //     console.log(data);

// //     // For one neighbour only?
// //     // console.log(data.borders);
// //     const neighbours = data.borders;
// //     console.log(neighbours);

// //     if (!neighbours) return;

// //     // Neighbours request
// //     neighbours.forEach(
// //       // AJAX call for neighbour
// //       function (neighbour) {
// //         const requestNeighbour = new XMLHttpRequest();
// //         requestNeighbour.open(
// //           'GET',
// //           `https://restcountries.com/v2/alpha/${neighbour}`
// //         );
// //         requestNeighbour.send();

// //         requestNeighbour.addEventListener('load', function () {
// //           const data2 = JSON.parse(this.responseText);
// //           console.log(data2);
// //           renderCountry(data2, 'neighbour');
// //         });
// //       }
// //     );

// //     // At the end we just need to make the container appear
// //     countriesContainer.style.opacity = 1;

// //   });
// // };

// // getCountryAndNeighbours('mexico');

// // ------------------------------ Promises

// // ----- Making requests the old way with AJAX:

// //   const request = new XMLHttpRequest();
// //   request.open('GET', `https://restcountries.com/v2/name/${country}`);
// //   request.send();
// //   console.log(request.responseText);

// ----- Making requests in the modern way with fetch API
// First we take the DOM element
const countriesContainer = document.querySelector('.countries');

// Handle errors from promises
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // The following line is managed by the "finally" callback
  // countriesContainer.style.opacity = 1;
};

// Then we handle the rendering
const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
  <img class="country__img" src=${data.flag} />
  <div class="country__data">
  <h3 class="country__name">${data.name}</h3>
  <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>POP ${(
      +data.population / 1000000
    ).toFixed(2)}</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
    <p class="country__row"><span>💰</span>${
      data.currencies[0]
    }currencies.name</p>
  </div>
  </article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  // The following line is managed by the "finally" callback
  // At the end we just need to make the container appear
  // countriesContainer.style.opacity = 1;
};

// const request = fetch(`https://restcountries.com/v2/name/mexico`);
// console.log(request);

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(response => {
//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       renderCountry(data.at(0));
//     });
// };

// The return of this function is a promise (fetch)
const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`${errorMsg}`);
    }

    return response.json(); // Promise fulfilled
    // err => alert(err) // Promise rejected
  });
};

// getCountryData('mexico');

const getCountryAndNeighbours = function (country) {
  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
    .then(data => {
      // console.log(data);
      renderCountry(data.at(0));

      // We look for the neighbouring countries
      const neighbours = data.at(0).borders;
      // console.log(neighbours);
      if (!neighbours) return;

      // fetch neighbours
      neighbours.forEach(function (neighbour) {
        const data2 = getJSON(
          `https://restcountries.com/v2/alpha/${neighbour}`,
          'Country not found'
        ).then(data => {
          // console.log(data);
          renderCountry(data, 'neighbour');
        });
      });
    })
    .catch(err => {
      console.error(`${err} 💣💥🤯`);
      renderError(`Something went wrong 💣💥 ${err.message}.
      Try again please`);
      // alert(`${err} 💣💥🤯`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// btn.addEventListener('click', () => {
//   getCountryAndNeighbours('mexico');
// });

///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

// ------------------------------ Answer
// const whereAmI = function (lat, lng) {
//   const requestOptions = {
//     method: 'GET',
//   };
//   const apiKey = 'fcffd4aa547e401ab0e2cc900022f644';
//   const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${apiKey}`;

//   // In this API, the return is a promise
//   const data = fetch(url, requestOptions)
//     .then(response => {
//       if (!response.ok) {
//         return 'There is an error';
//       }
//       // console.log(response); // The promise returned
//       return response.json();
//     })
//     .then(result => {
//       const props = result.features.at(0).properties;
//       console.log(`Yoy are in ${props.city}, ${props.country}`);
//       // console.log(props);
//       getCountryAndNeighbours(props.country);
//     })
//     .catch(error => console.log('Error:', error));
// };

// btn.addEventListener('click', () => whereAmI(-33.933, 18.474));

// ------------------------------ Promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

// Consuming this promisified function:
wait(3).then(() => console.log(`I waited 3 seconds`));

const headTails = new Promise(function (resolve, reject) {
  console.log('The coin is tossed 🔮');
  setTimeout(function () {
    const odd = Math.random();
    if (odd >= 0.5) {
      resolve(`You win! 🤑, the odd number is ${odd}`);
    } else {
      reject(new Error(`You loose 💩, the odd number is ${odd}`));
    }
  }, 2000);
});

headTails.then(res => console.log(res)).catch(err => console.error(err));

// This function promisify the callback API "geolocation"
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    // The previous lines work the same as:
    navigator.geolocation.getCurrentPosition(resolve, reject);
    // because getCurrentPosition is a callback with return itself, as well as the "resolve, reject" structure
  });
};

// Now we call our promisified callback function
// (the lines are commented in order to use async await syntax)
// const whereAmI = function () {
//   const apiKey = 'fcffd4aa547e401ab0e2cc900022f644';

//   const requestOptions = {
//     method: 'GET',
//   };

//   getPosition()
//     .then(pos => {
//       console.log(pos.coords);
//       const { latitude: lat, longitude: lng } = pos.coords;
//       const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${apiKey}`;
//       return fetch(url, requestOptions); // The fetch API returns a promise, so we immediately chain "then" 2 lines ahead
//     })
//     .then(response => {
//       //"response" is a promise returned by "fetch"
//       if (!response.ok) {
//         return 'There is an error';
//       }
//       console.log(response); // The response is a promise returned from fetch
//       return response.json(); // The return from geoapify
//     })
//     .then(data => {
//       //... so we can chain "then" again
//       // console.log(data);
//       const props = data.features.at(0).properties;
//       console.log(`Yoy are in ${props.city}, ${props.country}`);
//       // console.log(props);
//       getCountryAndNeighbours(props.country);
//     })
//     .catch(error => console.log('Error:', error));
// };

// btn.addEventListener('click', whereAmI);

///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise((resolve, reject) => {
    const image = document.createElement('img');
    image.src = imgPath;
    image.addEventListener('load', () => {
      imgContainer.appendChild(image);
      resolve(image);
    });
    image.addEventListener('error', () => {
      reject(new Error('Image not found'));
    });
  });
};

let currImage; // In the async/await version this is not needed because the scope is limited to just 1 block (try/catch)

// createImage('./img/img-1.jpg')
//   .then(img => {
//     currImage = img;
//     console.log('Image loaded successfuly');
//     return wait(2);
//   })
//   .then(() => {
//     currImage.style.display = 'none';
//     return wait(2);
//   })
//   .then(() => {
//     return createImage('./img/img-2.jpg');
//   })
//   .then(img => {
//     currImage = img;
//     console.log('Second image loaded');
//     return wait(2);
//   })
//   .then(() => (currImage.style.display = 'none'))
//   .catch(err => console.log(err));

// // ---------- async/await version (consume):
// const loadNPause = async function () {
//   try {
//     let img = await createImage('./img/img-1.jpg');
//     console.log('Image loaded successfuly');
//     await wait(2); // wait(s) doesn't have resolve value, so we don't store anything from it
//     img.style.display = 'none';
//     await wait(1);

//     img = await createImage('./img/img-2.jpg');
//     console.log('Second image loaded');
//     await wait(2); // wait(s) doesn't have resolve value, so we don't store anything from it
//     img.style.display = 'none';
//   } catch (err) {
//     console.log(err);
//   }
// };

// loadNPause();

// ------------------------------ Async Await
const whereAmI = async function () {
  try {
    const apiKey = 'fcffd4aa547e401ab0e2cc900022f644';

    const requestOptions = {
      method: 'GET',
    };

    const pos = await getPosition();
    // console.log(pos.coords);
    const { latitude: lat, longitude: lng } = pos.coords;
    const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${apiKey}`;
    // If we use the next line instead, an error comes out (just to test our error handling)
    // const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${apiKey}-algo-para-generar-error`;

    //"response" is a promise returned by "fetch"
    const response = await fetch(url, requestOptions); // The fetch API returns a promise, so we immediately chain "then" 2 lines ahead

    // The getPosition promis has a reject case, so it can throw that as an error,
    // In the case of fetch, itonly rejects when there's no internet connection, but we can generate it using "response.ok" to set it manually
    if (!response.ok) {
      throw new Error('Problem getting location data');
    }
    console.log(response); // The response is a promise returned from fetch
    const data = await response.json(); // The return from geoapify, .json() returns a promise
    const props = data.features.at(0).properties;
    console.log(`You are in ${props.city}, ${props.country}`);
    // console.log(props);
    getCountryAndNeighbours(props.country);

    // An async function always return a promise, not just a value of function
    return `You are in ${props.city}, ${props.country}`;
  } catch (err) {
    console.error(`${err.message} 💥`);
    renderError(`Something went wrong 💥 ${err.message}`);
    alert(`Something went wrong 💥 ${err.message}`);
  }

  // It is useful sometimes to re-throw the existing error to spread it in the return from async function
  throw err;
};

btn.addEventListener('click', whereAmI);

// // ------------------------------ Return for an async function
// // async functions always return a promise (see line 466):
// // These lines only calls in the log the promise itself
// // const city = whereAmI();
// // console.log(city);

// console.log('1. Will get the location');

// // This line resolves and returns the value that the promise returns
// // whereAmI().then(city => console.log(city));

// // Rethrown error

// // whereAmI()
// //   .then(city => console.log(`2: ${city}`))
// //   .catch(err => console.error(`2: ${err.message} 💥`))
// //   .finally(() => console.log('3. Finished getting location')); // This will execute in the end of the promise

// // ---------- IIFE async function
// // We put the previous 4 lines in an IIFE function
// (async function () {
//   try {
//     const city = await whereAmI();
//     console.log(`2: ${city}`);
//   } catch (err) {
//     console.error(`2: ${err.message} 💥`);
//   }
//   console.log('3. Finished getting location');
// })();

// // ---------- The best approach (instead of the previous one)
// async function (){
//  try{
//   const  = await
//   } catch(err) {}
//   finally
// }

// ------------------------------ Promise combinators
// ---------- Promise.all: Running promises in parallel
const get3Countries = async function (c1, c2, c3) {
  try {
    // // The following 3 lines are 3 different promises which run one after another
    // const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`);

    // console.log(data1.capital, data2.capital, data3.capital);

    // To run our promises at the same time (not one after another), we specify an array with these promises (one rejection is enough to reject the whole Promise.all):
    data = await Promise.all([
      getJSON(`https://restcountries.com/v2/name/${c1}`),
      getJSON(`https://restcountries.com/v2/name/${c2}`),
      getJSON(`https://restcountries.com/v2/name/${c3}`),
    ]);
    console.log(data.map(el => el.at(0).capital));
  } catch (err) {
    console.error(err);
  }
};

get3Countries('mexico', 'spain', 'portugal');

// ---------- Promise.race: The first promise to be fulfilled is returned
const timeout = function (sec) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('Request took too long'));
    }, sec * 1000);
  });
};

Promise.race([
  getJSON('https://restcountries.com/v2/name/italy'),
  timeout(0.011), //This value is in the limit of my ISP
])
  .then(res => console.log(res.at(0).languages.at(0).nativeName))
  .catch(err => console.error(err));

// ---------- Promise.allSettled (ES2020): Returns a list of all the promises that were fulfilled from the given list

Promise.allSettled([
  Promise.resolve('Success 1'),
  Promise.reject('Error 1'),
  Promise.resolve('Success 2'),
]).then(res => console.log(res));

// ---------- Promise.any (ES2021): It works almost like Promise.race, but ignoring the rejected promises
Promise.any([
  Promise.reject('Error 1'),
  Promise.resolve('Success 1'),
  Promise.resolve('Success 2'),
])
  .then(res => console.log(res))
  .catch(err => console.error('Oops 🤯'));

// ------------------------------ Coding challence #3: Promise combinators
const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async img => {
      return await createImage(img);
    });
    // console.log(imgs); // The array of promises which return an image when fulfilled
    const imgEl = await Promise.all(imgs);
    // console.log(imgEl); // The array of images
    imgEl.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.error(`Oops again: ${err}`);
  }
  imgEl;
};

loadAll(['./img/img-1.jpg', './img/img-2.jpg', './img/img-3.jpg']);
