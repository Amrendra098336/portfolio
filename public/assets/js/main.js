/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.getElementsByClassName("skills__content"),
  skillsHeader = document.querySelectorAll(".skills__header");

function toggleSkills() {
  let itemClass = this.parentNode.className;

  for (i = 0; i < skillsContent.length; i++) {
    skillsContent[i].className = "skills__content skills__close";
  }
  if (itemClass === "skills__content skills__close") {
    this.parentNode.className = "skills__content skills__open";
  }
}

skillsHeader.forEach((el) => {
  el.addEventListener("click", toggleSkills);
});

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll("[data-target]"),
  tabContents = document.querySelectorAll("[data-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);

    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("qualification__active");
    });
    target.classList.add("qualification__active");

    tabs.forEach((tab) => {
      tab.classList.remove("qualification__active");
    });
    tab.classList.add("qualification__active");
  });
});

/*==================== SERVICES MODAL ====================*/
const modalViews = document.querySelectorAll(".services__modal"),
  modalBtns = document.querySelectorAll(".services__button"),
  modalCloses = document.querySelectorAll(".services__modal-close");

let modal = function (modalClick) {
  modalViews[modalClick].classList.add("active-modal");
};

modalBtns.forEach((modalBtn, i) => {
  modalBtn.addEventListener("click", () => {
    modal(i);
  });
});

modalCloses.forEach((modalClose) => {
  modalClose.addEventListener("click", () => {
    modalViews.forEach((modalView) => {
      modalView.classList.remove("active-modal");
    });
  });
});

/*==================== PORTFOLIO SWIPER  ====================*/
let swiperPortfolio = new Swiper(".portfolio__container", {
  cssMode: true,
  loop: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

/*==================== TESTIMONIAL ====================*/
let swiperTestimonial = new Swiper(".testimonial__container", {
  loop: true,
  grabCursor: true,
  spaceBetween: 48,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  breakpoints: {
    568: {
      slidesPerView: 2,
    },
  },
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
  const nav = document.getElementById("header");
  if (this.scrollY >= 80) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*==================== SHOW SCROLL TOP ====================*/
function scrollTop() {
  let scrollTop = document.getElementById("scroll-top");
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 200) scrollTop.classList.add("show-scroll");
  else scrollTop.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollTop);

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);

  // Change the portfolio 1 image based on theme
  const portfolio1Image = document.getElementById("portfolio1-image");
  if (document.body.classList.contains(darkTheme)) {
    portfolio1Image.src = "assets/img/portfolio_1_Light.png"; // replace with your dark theme image path
  } else {
    portfolio1Image.src = "assets/img/portfolio_1.png";
  }

  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

///
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.querySelector(".contact__form");

  contactForm.addEventListener("submit", function (e) {
    const nameInput = contactForm.querySelector(".contact__input--name");
    const emailInput = contactForm.querySelector(".contact__input--email");
    const projectInput = contactForm.querySelector(".contact__input--project");

    const messageTextarea = contactForm.querySelector("textarea");

    let isValid = true; // Let's assume form is valid initially

    // Name Validation
    if (!nameInput.value.trim()) {
      nameInput.nextElementSibling.textContent = "Name is required.";
      isValid = false;
    } else {
      nameInput.nextElementSibling.textContent = ""; // Clear any previous error message
    }

    // Email Validation
    if (!isValidEmail(emailInput.value.trim())) {
      emailInput.nextElementSibling.textContent =
        "Please provide a valid email address.";
      isValid = false;
    } else {
      emailInput.nextElementSibling.textContent = ""; // Clear any previous error message
    }

    // Message Validation
    if (!messageTextarea.value.trim()) {
      messageTextarea.nextElementSibling.textContent =
        "Please enter your message.";
      isValid = false;
    } else {
      messageTextarea.nextElementSibling.textContent = ""; // Clear any previous error message
    }

    if (!isValid) {
      e.preventDefault(); // If form is not valid, prevent it from submitting
    }
  });

  function isValidEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }
});

// Function to display feedback message at the top of the form
function displayFeedbackMessage(message, isError = true) {
  const feedbackDiv = document.getElementById("formFeedback");
  feedbackDiv.style.display = "block";
  feedbackDiv.textContent = message;

  // Set background based on the type of message (error/success)
  feedbackDiv.style.backgroundColor = isError ? "#f8d7da" : "#d4edda";
  feedbackDiv.style.color = isError ? "#721c24" : "#155724";

  // After 15 seconds, hide the feedback message
  setTimeout(() => {
    feedbackDiv.style.display = "none";
  }, 15000);
}

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector(".contact__form");

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get form values
    const name = document.querySelector(".contact__input--name").value;
    const email = document.querySelector(".contact__input--email").value;
    const message = document.querySelector(".contact__input--message").value;
    console.log("message  = " + message);

    try {
      const response = await fetch("/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const responseData = await response.json();

      if (response.ok) {
        displayFeedbackMessage(responseData.message, false); // success, so isError is set to false
        contactForm.reset();
      } else {
        displayFeedbackMessage(responseData.message, true); // error, so isError is set to true
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      displayFeedbackMessage(
        "An error occurred. Please try again later.",
        true
      ); // network or other error, so isError is set to true
    }
  });
});
