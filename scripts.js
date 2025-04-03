"use strict";

document.addEventListener("readystatechange", (e) => {
  switch (e.target.readyState) {
    case "interactive":
      beforeInitApp();
      getExperience();
      break;
    case "complete":
      initApp();
      break;
  }
});

function beforeInitApp() {
  document.getElementById("header-contact-btn").onclick = (e) => {
    pageScroller(e, document.body.offsetHeight);
  };
  document.getElementById("footer-top-btn").onclick = (e) => {
    pageScroller(e, 0);
  };
}

function initApp() {
  const hiddenElements = document.querySelectorAll(
    ".hidden, .background-hidden"
  );

  const getImageElements = document.querySelectorAll("img");
  getImageElements.forEach((img) => {
    img.oncontextmenu = (e) => {
      e.preventDefault();
    };
    img.ondragstart = (e) => {
      e.preventDefault();
    };
  });

  function setListener() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.id === "background-image") {
            entry.target.classList.add("background-show");
          }

          if (!entry.target.id || entry.target.id !== "background-image") {
            entry.target.classList.add("show");
            setTimeout(() => {
              entry.target.classList.remove("hidden");
            }, 3000);
          }
          observer.unobserve(entry.target);
        }
      });
    });
    const observerElements = hiddenElements;
    observerElements.forEach((el) => {
      observer.observe(el);
    });
  }

  function scrollListener() {
    if (window.pageYOffset === 0 || window.scrollY === 0) {
      setListener();
      window.removeEventListener("scroll", scrollListener);
    }
  }

  if (window.pageYOffset === 0 || window.scrollY === 0) {
    setListener();
  } else {
    window.scrollTo(0, 0);
    window.addEventListener("scroll", scrollListener);
  }
}

function getExperience() {
  const currYear = new Date();
  const experience = currYear.getFullYear() - 2019;
  document.getElementById("sn_years_experience").innerHTML =
    experience.toString();
}

function pageScroller(e, loc) {
  e.target.blur();
  window.scrollTo({
    top: loc,
    left: 0,
    behavior: "smooth",
  });
}

window.onpageshow = () => {
  history.scrollRestoration = "manual";
};
