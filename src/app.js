// Variables 
let password = '';

// DOM ELEMENTS

// Navigation Bar
const nav = document.querySelector("body header nav");
const navItems = document.querySelectorAll("body header nav ul li a");
const footer = document.querySelector('footer')

// EVENT LISTENERS

// Users have 8 seconds to type in the password
setInterval(() => {
  clearPassword();
}, 8000);

// Scroll Navigation
window.addEventListener("scroll", function (e) {
  handleScroll();
});

// Easter Egg Starwars music
window.addEventListener('keydown', handleSecretCode)

// FUNCTIONS

function handleNavSelection(e) {
  // Styles selected nav item as active and
  // the remaining nav items as inactive
  navItems.forEach((nav) => {
    if (nav.textContent === e.target.textContent) {
      nav.classList.add("active");
    } else {
      nav.classList.remove("active");
    }
  });

  // Without this, users can click other nav sections while
  // the page is scrolling
  handleNotClickableNavBar();
}

// Prevent users from clicking on the nav bar for the duration of the scrolling
function handleNotClickableNavBar() {
  nav.classList.add("not-clickable");

  setTimeout(() => {
    nav.classList.remove("not-clickable");
  }, 600);
}

function handleScroll() {
  let sections = document.querySelectorAll("body main section");

  // Account for header height
  let currentHeader = document.querySelector("header").offsetHeight;
  let currentScroll = window.scrollY + currentHeader;
  // Default to 0 because the offsetTop for the first section is unreliable
  let currentIndex = 0;
  // ### This will need refactoring ###
  // Get the current section based off the currentScroll
  for (let i = 1; i < sections.length - 1; i++) {
    if (
      currentScroll >= sections[i].offsetTop &&
      currentScroll < sections[i + 1].offsetTop
    ) {
      currentIndex = i;
    } else if (currentScroll >= sections[i + 1].offsetTop) {
      currentIndex = sections.length - 1;
    }
  }

  // Look for the corresponding navItem at the currentIndex and render it active
  navItems.forEach((nav, index) => {
    if (index === currentIndex) {
      nav.classList.add("active");
    } else {
      nav.classList.remove("active");
    }
  });
}

// EASTER EGG FUNCTIONS

function handleSecretCode(e) {
  let charCode = e.keyCode;
  let key = String.fromCharCode(charCode).toLowerCase();
  password += key;
  
  if (password ==='space force') {
    addAudioToFooter();
    document.querySelector('audio').play();
  } else if (password === 'stop') {
    document.querySelector('audio').pause();
  }
}

function clearPassword() {
  password = '';
}

function addAudioToFooter() {
  if (document.querySelector('audio')) return;
  let audio = document.createElement('audio');
  audio.src = "../audio/Star Wars Main Theme (Full).mp3";
  footer.append(audio);
}
