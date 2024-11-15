const ballEl = document.querySelector(".ball");
const outerEl = document.querySelector(".outer-layer");
const starsEl = Array.from(document.querySelectorAll(".icon"));
const okBtn = document.querySelector(".ok");
const laterBtn = document.querySelector(".later");
const overlayEl = document.querySelector(".overlay");
const modalEl = document.querySelector(".modal");
const ratingContainer = document.querySelector(".ratings-container");
const heightEl = document.getElementById("height");
const weightEl = document.getElementById("weight");
const buttonEl = document.getElementById("button");
const faqs = document.querySelectorAll(".faq");
const expandToggle = document.querySelectorAll(".expand");
const formId = document.getElementById("bmi");
const heightErr = document.querySelector(".heightErr");
const weightErr = document.querySelector(".weightErr");
const faqButton = document.querySelector(".faq-btn");
const mainSection = document.querySelector(".main-section");
const resultSection = document.querySelector(".result-section");

//Adding rating related text
let theme = "white";
const emojis = ["🥲", "🙂", "😁", "😄", "🤩"];
const text = [
  "Sorry to disappoint you",
  "we will comeback better",
  "Thank you! we will improve",
  "Great! Thank you soo much",
  "YES!, thank you for the love",
];

let emojiIndex = 0;

let formDataE = {
  heigh: "",
  weigh: "",
};

//Validating fields
function validateFields(data) {
  let { heigh, weigh } = data;

  if (heigh === "" && weigh === "") {
    heightErr.textContent = "Required*";
    weightErr.textContent = "Required*";
  } else if (weigh === "") {
    weightErr.textContent = "Required*";
  } else if (heigh === "") {
    heightErr.textContent = "Required";
  } else {
    const heightVal = Number(heightEl.value) / 100;
    const weightVal = Number(weightEl.value);
    heightEl.value = "";
    weightEl.value = "";

    const bmiVal = weightVal / heightVal ** 2;

    document.querySelector(".result").textContent = bmiVal.toFixed(1);
    document.querySelector(".result-container").classList.remove("hidden");
    sectionToggle();
  }
}

heightEl.addEventListener("blur", function (e) {
  if (e.target.value === "") {
    heightErr.textContent = "Required*";
  } else {
    heightErr.textContent = "";
  }

  formDataE.heigh = e.target.value;
});

weightEl.addEventListener("blur", function (e) {
  if (e.target.value === "") {
    weightErr.textContent = "Required*";
  } else {
    weightErr.textContent = "";
  }

  formDataE.weigh = e.target.value;
});

//Validating form
formId.addEventListener("submit", function (e) {
  e.preventDefault();
  validateFields(formDataE);
});

faqButton.addEventListener("click", function () {
  mainSection.classList.toggle("hidden");
  resultSection.classList.toggle("hidden");
  document.querySelector(".result-container").classList.toggle("hidden");
});

//Dark and light theme
ballEl.addEventListener("click", () => {
  theme = "black";
  ballEl.classList.toggle("transform");
  document.body.classList.toggle("background");
  outerEl.classList.toggle("border");
  formId.classList.toggle("toggle-changes");
  buttonEl.classList.toggle("toggle-changes");
  document
    .querySelectorAll(".input-box")
    .forEach((each) => each.classList.toggle("toggle-changes"));

  heightEl.classList.toggle("toggle-input");
  weightEl.classList.toggle("toggle-input");

  // 2nd section changes
  ratingContainer.classList.toggle("toggle-rating");
  overlayEl.classList.toggle("toggle-overlay");
  document.querySelector(".back").classList.toggle("section2-color");
  expandToggle.forEach((each) => each.classList.toggle("section2-color"));
  questionEl.forEach((each) => each.classList.toggle("question2"));
});

//Calculation

function sectionToggle() {
  mainSection.classList.toggle("hidden");
  resultSection.classList.toggle("hidden");
}

buttonEl.addEventListener("click", function (e) {
  e.preventDefault();
  validateFields(formDataE);
});

// Clicking on stars
starsEl.forEach((each, index) => {
  each.addEventListener("click", (e) => {
    okBtn.classList.remove("hidden");
    starsEl.forEach((every) => every.classList.remove("change-color"));

    for (let i = 0; i < index + 1; i++) {
      starsEl[i].classList.add("change-color");
    }

    emojiIndex = index;
  });
});

// Ignoring rating
laterBtn.addEventListener("click", function () {
  modalEl.classList.add("hidden");
  overlayEl.classList.add("hidden");
});

// Submitting rating
okBtn.addEventListener("click", function (e) {
  document.querySelector(".stars").classList.add("disable");
  document.querySelector(".rate-us").style.opacity = 0;
  okBtn.classList.add("hidden");
  laterBtn.textContent = "Close";
  laterBtn.style.transform = "translateY(-100px)";

  const html = `
  <div class='final-rating'>
      <h1 class='emoji'>${emojis[emojiIndex]}</h1>
      <p>${text[emojiIndex]}</p>
  </div>
  `;
  ratingContainer.insertAdjacentHTML("beforebegin", html);
});

// Accordian
const questionEl = document.querySelectorAll(".question");
const contentEl = document.querySelectorAll(".content");

questionEl.forEach((each) => {
  each.addEventListener("click", function () {
    const index = each.dataset.value;

    faqs.forEach((faq) => {
      faqIndex = faq.dataset.value;

      if (index === faqIndex) {
        faq.classList.toggle("active");
        // each.classList.toggle("toggle-color");
        if (theme === "white") {
          each.classList.toggle("toggle-color");
        } else {
          each.classList.toggle("toggle-black");
        }
      } else {
        faq.classList.remove("active");
        questionEl.forEach((eachQue) => {
          if (eachQue !== each) {
            eachQue.classList.remove("toggle-color");
            eachQue.classList.remove("toggle-black");
          }
        });
      }
    });

    expandToggle.forEach((expand) => {
      if (expand.dataset.value === index) {
        expand.classList.toggle("button-rotate");
      } else {
        expand.classList.remove("button-rotate");
      }
    });
  });
});

//go back

const back = document.querySelector(".go-back");

back.addEventListener("click", function () {
  sectionToggle();
});
