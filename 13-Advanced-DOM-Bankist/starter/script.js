'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
// const section1 = document.querySelector('#section--1');

// Operation tabs
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const nav = document.querySelector('.nav');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btnOpenModal => {
  btnOpenModal.addEventListener('click', openModal);
});
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// -----------------------------------------New functionality code

// -----------------------Scroll to sections with nav
btnScrollTo.addEventListener('click', e => {
  const s1coords = section1.getBoundingClientRect();
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth',
  });
});

// // This approach doesn't perform well we will rather use Target phase
// document.querySelectorAll('.nav__link').forEach((elem, i) => {
//   console.log(elem);
//   elem.addEventListener('click', function (e) {
//     // The following line prevents the html link to be active
//     e.preventDefault();
//     // const id = this.getAttribute('href');
//     const id = elem.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

document.querySelector('.nav__links').addEventListener('click', function (e) {
  if (e.target.classList.contains('nav__link')) {
    e.preventDefault();
    // TODO: fix error that sets '#' as a reference and it's not valid
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// ----------------------------- Tabbed components
tabsContainer.addEventListener('click', function (e) {
  e.preventDefault();

  const clicked = e.target.closest('.operations__tab');
  // Try clicking the number in the button (span)
  console.log('Actual clicked element: ', e.target);
  console.log('Button related to clicked element: ', clicked);

  // Guard clause
  if (!clicked) return;

  // Remove attribute for all tabs
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));

  // Add attribute for active tab
  clicked.classList.add('operations__tab--active');

  // Manage content area

  // Show content related with current tab
  console.log('Data from the pressed button: ', clicked.dataset.tab);
  // clicked.dataset.tab shows the content under "data-anythingText"
  const currentTab = document.querySelector(
    `.operations__content--${clicked.dataset.tab}`
  );

  // Hide all the tabs content
  tabsContent.forEach(tab =>
    tab.classList.remove('operations__content--active')
  );

  // Activate content area
  currentTab.classList.add('operations__content--active');
});

// Menu fade animation
// DOM traversing is not necessary
const transformSiblings = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img'); // This code may be reused for other icons

    // if more than one argument besides the event is passed,
    // we have to specify a list
    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
      logo.style.opacity = this;
    });
  }
};

// Passing "argument" into handler
// We bind just the opacity (not a function or method), so we can write:
nav.addEventListener('mouseover', transformSiblings.bind(0.5));
nav.addEventListener('mouseout', transformSiblings.bind(1));

// nav.addEventListener('mouseover', function (e) {
//   selectSiblings(e, 0.5);
// });

// nav.addEventListener('mouseout', function (e) {
//   selectSiblings(e, 1);
// });

// ------------------------------ Sticky navigation
// // First approach: "scroll" event
// // This has a bad performance because it triggers many times repeatedly
// const initialCoords = section1.getBoundingClientRect();

// window.addEventListener('scroll', function () {
//   console.log(window.scrollY);
//   if (initialCoords.top < window.scrollY) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// Second approach: Intersection Observer API
// This approach performs better!
const header = document.querySelector('.header');

const stickyNav = function (entries) {
  // observer parameter is not needed here
  const [entry] = entries; // the same as [entry] = entries[0]
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const navHeight = nav.getBoundingClientRect().height;

const stickyNavOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`, //inwards margins in pixels
  // for the observed element in the intersection
};

const headerObserver = new IntersectionObserver(stickyNav, stickyNavOptions);
headerObserver.observe(header);

// ------------------------------ Reveal sections

const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');

  // Remove observer
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: '0.15',
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

// ------------------------------ Lazy loading images
// We select only the images which have "data-src" as an attribute in CSS
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  console.log(entry);
  // Replace "src" with "data-src"
  entry.target.src = entry.target.dataset.src;

  // Remove blur (only after the load has been effective)
  // Slow load can be simulated by altering the speed in the "Network" tab
  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img');
  });

  // Remove observer
  observer.unobserve(entry.target);
};

const imageObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0.2,
  rootMargin: '200px', // Load a bit before the image intersects
});

imgTargets.forEach(img => imageObserver.observe(img));

// ------------------------------ Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const dotContainer = document.querySelector('.dots');

  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class= "dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  let currSlide = 0;
  const maxSlide = slides.length;

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const init = function () {
    createDots();
    goToSlide(0);
    activateDot(0);
  };

  const nextSlide = function () {
    if (currSlide === maxSlide - 1) {
      currSlide = 0;
    } else {
      currSlide++;
    }
    goToSlide(currSlide);
    activateDot(currSlide);
  };

  const prevSlide = function () {
    if (currSlide === 0) {
      currSlide = maxSlide - 1;
    } else {
      currSlide--;
    }
    goToSlide(currSlide);
    activateDot(currSlide);
  };

  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);
  // arrow keys sliding
  document.addEventListener('keydown', function (e) {
    console.log(e.key);
    e.key === 'ArrowLeft' && prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      // const slide = e.target.dataset.slide;
      goToSlide(slide);
      e.target.classList.add;
      activateDot(slide);
    }
  });
};

slider();

// // ------------------------------ Intersection Observer API
// // entries can be a single value or an array
// conts obsCallback = function(entries, observer){
//   entries.forEach(entry => {
//     console.log(entry)

//   })
// }

// const obsOptions = {
//   root: null, // The element to be observed for intersecion
//   // null to intersect the viewport

//   threshold: 0.1, // Threshold for the root percentage being intercepted
//   // This can also be an array along with the entries
//   rootMargin: '-90px', // inwards margins in pixels
//   // for the observed element in the intersection
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions)
// observer.observe(section1)

// ----------------------------- DOM traversing
// const h1 = document.querySelector('h1');

// // Going downwards: child
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes); // children in the html
// console.log(h1.children); // children in the DOM (live)
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';

// // // Going up: parents
// // console.log(h1.parentNode) // parent in the html
// // console.log(h1.parentElement); // parent in the DOM (live)

// // find a specific parent element (including the element itself)
// h1.closest('.header').style.background = 'var(--gradient-secondary)';

// // Going sideways: siblings
// console.log(h1.previousSibling); // previous sibling in the html
// console.log(h1.previousElementSibling); // previous sibling in the DOM (live)
// console.log(h1.nextSibling); // next sibling in the html
// console.log(h1.nextElementSibling); //next sibling in the DOM (live)

// // Select all siblings (using the direct parent)
// console.log(h1.parentElement.children);

// // Select siblings only
// [...h1.parentElement.children].forEach(el => {
//   if (el !== h1) el.style.transform = 'scale(0.5)';
// });

// // ----------------------------------------------------Intro Exercise
// const header = document.querySelector('.header');
// const allSections = document.querySelectorAll('.section');

// // The following selector returns a collection (it updates live), not a node list
// const allButtons = document.getElementsByTagName('button');
// const allButtonsCollection = document.getElementsByClassName('.btn');

// const message = document.createElement('div');

// message.innerHTML =
//   'We use cookies for improved functionality and analytics. <button class = "btn btn--close-cookie">Got it</button>';
// header.prepend(message);

// message.style.height;
// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30;

// const btnScrollTo = document.querySelector('.btn--scroll-to');
// const section1 = document.querySelector('#section--1');

// btnScrollTo.addEventListener('click', e => {
//   const s1coords = section1.getBoundingClientRect();
//   // window.scrollTo(
//   //   s1coords.left + window.pageXOffset,
//   //   s1coords.top + window.pageYOffset
//   // );
//   window.scrollTo({
//     left: s1coords.left + window.pageXOffset,
//     top: s1coords.top + window.pageYOffset,
//     behavior: 'smooth',
//   });
// });

// const ramdomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const ramdomColor = () =>
//   `rgb(${ramdomInt(0, 255)},${ramdomInt(0, 255)},${ramdomInt(0, 255)})`;

// /*
// The event nav__link event listener bubbles up to the parent elements,
// so when the nav__link is clicked, also the parents (nav__links and nav)
// reflect the changes.
// */
// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = ramdomColor();
//   /*
//   The following line shows where the event took place
//   and then the current element that is being affected (current target)
//   */
//   console.log('LINK', e.target, e.currentTarget);
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = ramdomColor();
//   // The following line shows where the event took place
//   console.log('CONTAINER', e.target, e.currentTarget);
// });

// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = ramdomColor();
//   // The following line shows where the event took place
//   console.log('NAV', e.target, e.currentTarget);
// });
