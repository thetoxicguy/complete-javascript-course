'use strict';

// ------------------------------ 1. Contstructor functions blueprints for our objects
const Person = function (firstName, birthDate) {
  this.firstName = firstName;
  this.birthDate = birthDate;
};

const daniel = new Person('Daniel', '1944,01,03');
console.log(daniel);

const matilda = new Person('Matilda', '2017,1,1');
const jack = new Person('Jack', '1975,1,1');
console.log(matilda, jack);

// ------------------------------ Prototypes
// Add a function to the Person prototype
Person.prototype.calcAge = function () {
  const today = new Date();
  const birthDate = new Date(this.birthDate);
  const m = today.getMonth() - new Date(this.birthDate).getMonth();

  let age = today.getFullYear() - birthDate.getFullYear();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  console.log(`La edad de ${this.firstName} es ${age} años`);
};

console.log(Person.prototype);

// Person instances can access the prototype methods!
daniel.calcAge();

// Add a property to the Person prototype
Person.prototype.species = 'Homo Sapiens';
console.log(`${daniel.firstName} es un ${daniel.species}`);

daniel.hasOwnProperty('firstName');
daniel.hasOwnProperty('species');

// ------------------------------ Coding Challenge #1
/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

// We add the methods later, so it gets inherited (not creating a method for each car we create)
Car.prototype.accellerate = function () {
  this.speed = this.speed + 10;
  console.log(`The ${this.make}'s speed is ${this.speed} after acceleration`);
};
Car.prototype.brake = function () {
  this.speed = this.speed - 5;
  console.log(`The ${this.make}'s speed is ${this.speed} after braking`);
};

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

bmw.accellerate();
bmw.brake();

mercedes.accellerate();
mercedes.brake();

// // Getters and setters in an object literal
// const account = {
//   owner: 'Jonas',
//   movements: [200, 530, 120, 300],
//   get latest() {
//     return this.movements.slice(-1).pop();
//   },

//   //   Every set function need to have exactly one parameter
//   set latest(mov) {
//     return this.movements.push(mov);
//   },
// };

// // Get a value with a getter
// console.log(`Latest account movement: $${account.latest}`);

// // Set a value with a setter
// account.latest = 50;
// console.log(`Movement after setting last movement: $${account.latest}`);

// ------------------------------ 2. Object.create (useful for inheritance between classes)
const PersonProto = {
  init(fullName, birthDate) {
    this.fullName = fullName;
    this.birthDate = birthDate;
  },
  calcAge() {
    const today = new Date();
    const birthDate = new Date(this.birthDate);
    const m = today.getMonth() - new Date(this.birthDate).getMonth();

    let age = today.getFullYear() - birthDate.getFullYear();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    console.log(`[calcAge]: La edad de ${this.fullName} es ${age} años`);
  },
};

const steve = Object.create(PersonProto);
steve.init('Steve Wozniak', '1950,08,11');

// ------------------------------ 3. Class Declaration
class PersonCl {
  constructor(fullName, birthDate) {
    this.fullName = fullName;
    this.birthDate = birthDate;
  }
  //   Instance Methods
  //   Methods that will be added to the .prototype property for the class objects
  calcAge = function () {
    const today = new Date();
    const birthDate = new Date(this.birthDate);
    const m = today.getMonth() - new Date(this.birthDate).getMonth();

    let age = today.getFullYear() - birthDate.getFullYear();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    console.log(`[calcAge]: La edad de ${this.fullName} es ${age} años`);
  };

  //   Additional methods can be concatenated without semicolons in between
  greet = function () {
    console.log(`Hey ${this.fullName}!!!`);
  };

  get age() {
    const today = new Date();
    const birthDate = new Date(this.birthDate);
    const m = today.getMonth() - new Date(this.birthDate).getMonth();

    let age = today.getFullYear() - birthDate.getFullYear();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    console.log(`["age" getter]: La edad de ${this.fullName} es ${age} años`);
  }

  //   Set an already existing property (fullname here is declared in the constructor)
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name`);
  }

  get fullName() {
    return this._fullName;
  }

  //   Static Methods
  static hey() {
    console.log('Hey there! 👋');
  }
}

// We can add a method after we have defined the class
// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.fullName}!!!`);
// };

// According to the setter, Jessica Davis is a fullName, but the next (Walter) is not
const jessica = new PersonCl('Jessica Davis', '2010,05,24');
console.log(jessica);
console.log(jessica.__proto__ === PersonCl.prototype);
jessica.calcAge();
jessica.greet();

// Calculate age with a getter
jessica.age;

// Try just Walter. It is not a fullName, so the setter constraint acts accordingly
const walter = new PersonCl('Walter White', 1956);
PersonCl.hey();

// ------------------------------ Coding challenge #2
/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  // start Public Interface
  accellerate() {
    this.speed = this.speed + 10;
    console.log(`The ${this.make}'s speed is ${this.speed} after acceleration`);
  }
  brake() {
    this.speed = this.speed - 5;
    console.log(`The ${this.make}'s speed is ${this.speed} after braking`);
  }
  // end Public Interface

  // Getters and Setters
  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(mph) {
    this.speed = mph * 1.6;
  }
}

const rogue = new CarCl('Nissan', 140);
console.log(rogue);
console.log(`The speed in mph is ${rogue.speedUS}`);

rogue.speedUS = 100;
console.log(`The speed in Km/h is ${rogue.speed}`);

// ---------------------------------------- Inheritance between classes

// ------------------------------ Case 1. Constructor functions inheritance
// The parent is Person, the child will be:
// Step 1: Define the constructor for the child
const Student = function (firstName, birthDate, course) {
  // We execute Person in this function (setting this to the present instance)
  Person.call(this, firstName, birthDate);
  this.course = course;
};

// Set the student constructor to have "Person" attributes
Student.prototype = Object.create(Person.prototype);
// 3. Linking Student prototype to Person prototype
Student.prototype.constructor = Student;
// If we omit the following, mike wouldn't be instance of Person
//

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Michael Wasowski', '2001,05,21', 'Fear Science');

// introduce is a method that lies in Student prototype (with Person as parent)
mike.introduce();

// calcAge is a method that lies in Person.prototype
mike.calcAge();

// mike's __proto__ is Student that has Person.prototype linked
console.log(mike.__proto__);
// mike's __proto__.__proto__ is Person. the following line shows Person.prototype
console.log(mike.__proto__.__proto__);

// Prototype chain
console.log(mike instanceof Student);
console.log(mike instanceof Person);
console.log(mike instanceof Object);

// ------------------------------ Coding challenge #3
/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

// Set the EV constructor to have "Person" attributes
EV.prototype = Object.create(Car.prototype);
// 3. Linking EV prototype to Person prototype
EV.prototype.constructor = Car;
// If we omit the following, mike wouldn't be instance of Person

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

// Polymorphism (changing "accellerate" in the particular case of EVs)
EV.prototype.accellerate = function () {
  this.speed = this.speed + 20;
  this.charge--;
  // this.charge -= 1;
  console.log(`The ${this.make}'s speed is ${this.speed} after acceleration, with a
  charge of ${this.charge}`);
};
// EV.prototype.brake = function () {
//   this.speed = this.speed - 7;
//   console.log(`The ${this.make}'s speed is ${this.speed} after braking`);

const lumberjackCar = new EV('Tesla', 96, '20');

lumberjackCar.chargeBattery(78);
lumberjackCar.accellerate();
lumberjackCar.brake();

console.log(lumberjackCar);

// ------------------------------ Case 2. ES6 Classes inheritance
class StudentCl extends PersonCl {
  // The following needs to happen first in the constructor (in case of extending attributes)
  constructor(fullName, birthDate, course) {
    super(fullName, birthDate);
    this.course = course;
  }
  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  // Polymorphism overriding calcAge method (from Person)
  calcAge = function () {
    console.log("I don't want to calculate any student's age!");
  };
}

const martha = new StudentCl('Martha Jones', '2012,04,16', 'Logic');
console.log(martha);
martha.calcAge();
martha.introduce();

// ------------------------------ Case 3. Object.create inheritance
const StudentProto = Object.create(PersonProto);
// Then you can add any method you want using StudentProto.prototype = ...

// ------------------------------ Encapsulation: Protected Properties and Methods
// Consider our prior Bankist App and let us now create a Class
/*
class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.pin = pin;
    this.movements = [];
    this.locale = navigator.language;
  }

  // Public interface
  deposit(val) {
    this.movements.push(val);
  }

  withdraw(val) {
    this.deposit(-val);
  }

  approveLoan(val) {
    return true;
  }

  requestLoan(val) {
    if (this.approveLoan) {
      this.deposit(val);
      console.log('Loan approved');
    }
  }
}
*/

/* We need to protect these internal methods by two reasons:
A. Prevent code from outside of a class to manipulate our
   data and methods inside the CLASS
B. When we expose part of our API, we can change all the other
   internal methods without breaking external code

We will set sensitive data and methods as private in our objects
*/

/*
To solve these issues, we have to:
1. Create the Public Interface for our class (see below), instead of manipulate our data directly
   (our properties and methods in the objects are exposed at first)
    - add underscore to properties that are
      not supposed to be touched outside the class
      movements  -->  _movements (not private, can be manipulated)
      pin  -->  _pin (next we make it private in step 3)
      approveLoan  -->  _approveLoan (next we make it private in step 3)
3.
*/

/*
class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.pin = pin;
    this._movements = [];
    this.locale = navigator.language;
  }

  // Public interface

  // We add these methods in the API instead of common getters and setters
  getMovements() {
    return this._movements;
  }

  deposit(val) {
    this._movements.push(val);
  }

  withdraw(val) {
    this.deposit(-val);
  }

  approveLoan(val) {
    return true;
  }

  requestLoan(val) {
    if (this.approveLoan) {
      this.deposit(val);
      console.log('Loan approved');
    }
  }
}
*/

/*
2. Set public and private fields
*/
class Account {
  // Public fields (like variables but with no declaration; const, let, var)
  locale = navigator.language;

  // Private fields (using # to declare them as private)
  #movements = [];

  // Protected fields (private to use later in the constructor)
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
  }

  // Public interface
  // We add these methods in the API instead of common getters and setters
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this; // So we can chain methods afterwards
  }

  withdraw(val) {
    this.deposit(-val);
    return this; // So we can chain methods afterwards
  }

  approveLoan(val) {
    return true;
  }

  requestLoan(val) {
    if (this.approveLoan) {
      this.deposit(val);
      console.log('Loan approved');
    }
    return this; // So we can chain methods afterwards
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
// console.log(acc1.#movements); // This throws an error because can't be accessed outside the object

// Chaining methods
acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);
console.log(acc1.getMovements());

// ------------------------------ Coding challenge #4
/* 
1. Re-create challenge #3, but this time using ES6 classes: create an
  'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery'
   methods of this class, and also update the 'brake' method in the
   'CarCl' class. They experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

class EVCl extends CarCl {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  // Polymorphism (changing "accellerate" in the particular case of EVs)
  accellerate() {
    this.speed = this.speed + 20;
    this.#charge--;
    // this.#charge -= 1;
    console.log(`The ${this.make}'s speed is ${
      this.speed
    } after acceleration, with a
    charge of ${this.#charge}`);
    return this;
  }

  // Polymorphism (changing "brake" in the particular case of EVs)
  brake() {
    this.speed = this.speed - 7;
    console.log(`The ${this.make}'s speed is ${this.speed} after braking`);
    return this;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    console.log(`You've set the current charge to ${this.#charge}`);
    return this;
  }
}

const beatCar = new EVCl('Tesla Cab', 96, '20');

beatCar.chargeBattery(78);
beatCar.accellerate();
beatCar.brake();

console.log(beatCar);

console.log('------------------------------');

beatCar.accellerate().brake().chargeBattery(50);
