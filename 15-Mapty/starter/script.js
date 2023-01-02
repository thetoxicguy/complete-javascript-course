'use strict';

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);

  // This is just an example of a method outside of the subclasses
  clicks = 0;

  constructor(coords, distance, duration) {
    // this.date = new Date();
    // this.id = (new Date() + '').slice(-10);
    this.coords = coords;
    this.distance = distance;
    this.duration = duration;
  }
  _setDescription() {
    // To ignore formatting in the next block:
    // prettier-ignore
    // const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.description = `${this.workoutType[0].toUpperCase()}${this.workoutType.slice(1)} on ${this.date.toDateString()}`;
  }

  click() {
    this.clicks++;
    console.log(`This workout has been clicked ${this.clicks} times`);
  }
}

class Running extends Workout {
  workoutType = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    // this.popupContent = `Running on ${date.}`;
    this._setDescription();
  }
  calcPace() {
    this.pace = this.duration / this.distance; // min/Km
  }
}
class Cycling extends Workout {
  workoutType = 'cycling';
  constructor(coords, distance, duration, elevation) {
    super(coords, distance, duration);
    this.elevation = elevation;
    this.calcSpeed();
    this._setDescription();
  }
  calcSpeed() {
    this.speed = this.distance / this.duration; // Km/Hr
  }
}

class App {
  #map;
  #mapZoomLevel = 13;
  #mapEvent;
  #workouts = [];

  constructor() {
    // Get user's position
    this._getPosition();

    // Get data from Local Storage
    this._getLocalStorage();

    // We always have to bind callbacks when using event listeners in a class
    form.addEventListener('submit', this._newWorkout.bind(this)); // We set "this" binded to the object ("this")
    inputType.addEventListener('change', this._toggleElevationField); // .bind this is not necessary because "this" is not used

    // Event listener to locate a specific workout that has been listed
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
  }

  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this), // We set "this" (inside the callback) to the object ("this")
        function () {
          alert('Could not get your position');
        }
      );
    }
  }

  _loadMap(position) {
    const { latitude, longitude } = position.coords;
    const locationUrl = `https://www.google.com/maps/@${latitude},${longitude}z`;
    // console.log(locationUrl);
    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);
    // console.log(this);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // As this is an event listener, we have to bind "this" to the object ("this")
    this.#map.on('click', this._showForm.bind(this));
    this.#workouts.forEach(work => {
      this._renderWorkoutMarker(work);
    });
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _hideForm() {
    // prettier-ignore
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';

    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    const validInputs = (...inputs) =>
      inputs.every(input => Number.isFinite(input));

    const allPositive = (...inputs) => inputs.every(input => 0 < input);

    e.preventDefault();

    // 1. Get data from form & map
    const workoutType = inputType.value;
    const distance = +inputDistance.value; // + converts it to a number
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;

    let workout; //We set the scope in the event (so we can use it for both types)

    // 2. If the activity is running, create running object
    if (workoutType === 'running') {
      const cadence = +inputCadence.value;
      // 3. Check if data is valid
      if (
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        alert('Inputs have to be positive numbers');

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    // 2. If the activity is cycling, create cycling object
    if (workoutType === 'cycling') {
      const elevation = +inputElevation.value;
      // 3. Check if data is valid
      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      )
        alert('Inputs have to be positive numbers');
      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    // 4. Add new object to workouts array
    this.#workouts.push(workout); // See the scope of "workout" (line 83)

    // 5. Render workout on map as marker
    this._renderWorkoutMarker(workout);

    // 6. Render workout on list (Event Delegation can ocur here "this" keyword to use in the children)
    this._renderWorkout(workout);

    // 7. Hide form & clear input fields
    this._hideForm();

    // Save in Local Storage
    this._setLocalStorage();
  }

  _renderWorkoutMarker(workoutToRender) {
    // L is the namespace for Leaflet library
    L.marker(workoutToRender.coords) // Create a marker in memory
      .addTo(this.#map) // add the marker in the clicked position 🚩
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false, // Prevents the popup to close when another popup is opened
          closeOnClick: false, // Prevents the popup to close when clicking again
          className: `${workoutToRender.workoutType}-popup`,
        })
        // 'A pretty CSS3 popup.<br> Easily customizable.'
      ) // Bind a message in a popup
      .openPopup()
      .setPopupContent(
        `${workoutToRender.workoutType === 'running' ? '🏃‍♂️' : '🚴‍♂️'} ${
          workoutToRender.description
        }`
      ); // Set the popup content
  }

  _renderWorkout(workoutToRender) {
    let html = `
    <li class="workout workout--${workoutToRender.workoutType}" data-id="${
      workoutToRender.id
    }">
      <h2 class="workout__title">${workoutToRender.description}</h2>
      <div class="workout__details">
        <span class="workout__icon">${
          workoutToRender.workoutType === 'running' ? '🏃‍♂️' : '🚴‍♀️'
        }</span>
        <span class="workout__value">${workoutToRender.distance}</span>
        <span class="workout__unit">km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⏱</span>
        <span class="workout__value">${workoutToRender.duration}</span>
        <span class="workout__unit">min</span>
      </div>`;

    if (workoutToRender.workoutType === 'running')
      html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workoutToRender.pace.toFixed(1)}</span>
          <span class="workout__unit">min/km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">🦶🏼</span>
          <span class="workout__value">${workoutToRender.cadence}</span>
          <span class="workout__unit">spm</span>
        </div>
      </li>
      `;

    if (workoutToRender.workoutType === 'cycling')
      html += `
          <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workoutToRender.speed.toFixed(
              1
            )}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workoutToRender.elevation}</span>
            <span class="workout__unit">m</span>
          </div>
        </li>
      `;

    form.insertAdjacentHTML('afterend', html);
  }

  _moveToPopup(e) {
    const workoutEl = e.target.closest('.workout');
    if (!workoutEl) return;

    // console.log(workoutEl.dataset.id);

    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id
    );
    // console.log(workout);

    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: { duration: 1 },
    });

    /* This inherited method will only be enabled
    when prototypal inheritance is implemented
    for the Local Storage */
    // workout.click();
  }
  // Set Local Storage to all workouts
  // IMPORTANT: We will loose the prototype chain!!!
  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  // IMPORTANT: We will loose the prototype chain!!!
  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));
    // console.log(data);
    if (!data) return;
    this.#workouts = data;
    this.#workouts.forEach(work => {
      this._renderWorkout(work);
    });
  }
  reset() {
    localStorage.removeItem('workouts');
    /* location contains a lot of methods and properties in the browser API
    In this case, we use it to reload the page
    */
    location.reload();
  }
}

// // Examples for the classes
// const run1 = new Running([39, -12], 5.2, 24, 178);
// const cycling1 = new Cycling([39, -12], 27, 95, 523);

// console.log(run1, cycling1);

const app = new App();

// let map, mapEvent; // We need these variables in the global scope

// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(
//     function (position) {
//       console.log(position);
//       const { latitude, longitude } = position.coords;
//       console.log(latitude, longitude);
//       const locationUrl = `https://www.google.com/maps/@${latitude},${longitude}z`;
//       console.log(locationUrl);
//       const coords = [latitude, longitude];

//       // ------------------------------ Leaflet

//       //    Map rendering

//       //   The following is an object created by Leaflet
//       //   The second parameter of setView is the zoom
//       map = L.map('map').setView(coords, this.#mapZoomLevel);

//       /*
//         openstreetmap.org/ (default)
//         openstreetmap.fr/hot/
//         maps.google.com/
//       */
//       L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution:
//           '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//       }).addTo(map);

//       //   Handling clicks on map (map.on is an eventListener provided by "map")
//       map.on('click', function (mapE) {
//         mapEvent = mapE;
//         //   Activates the workout input form
//         form.classList.remove('hidden');
//         inputDistance.focus();
//       });
//     },
//     function () {
//       alert('Could not get your position');
//     }
//   );
// }

// ------------------------------------
// // Render the marker/popup
// form.addEventListener('submit', function (e) {
//   e.preventDefault();
//   // Clear input fields
//   inputDistance.value =
//     inputDuration.value =
//     inputCadence.value =
//     inputElevation.value =
//       '';

//   // set the coordinates for the lat, lng that has been clicked
//   const { lat, lng } = mapEvent.latlng;

//   // L is the namespace for Leaflet library
//   L.marker([lat, lng]) // Create a marker in memoty
//     .addTo(map) // add the marker in the clicked position 🚩
//     .bindPopup(
//       L.popup({
//         maxWidth: 250,
//         minWidth: 100,
//         autoClose: false, // Prevents the popup to close when another popup is opened
//         closeOnClick: false, // Prevents the popup to close when clicking again
//         className: 'running-popup',
//       })
//       // 'A pretty CSS3 popup.<br> Easily customizable.'
//     ) // Bind a message in a popup
//     .openPopup()
//     .setPopupContent(`Workout`); // Set the popup content
// });

// ---------------------------------------------------------
// inputType.addEventListener('change', function () {
//   inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
//   inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
// });
