// Elements
const input = document.getElementById("query");
const buttons = document.querySelectorAll(".buttons button");
const calculateBtn = document.getElementById("calculateBtn");
const resultDiv = document.getElementById("result");
const buttonsContainer = document.querySelector(".buttons");
const textModeBtn = document.getElementById("textModeBtn");

// Table buttons
const multiplicationBtn = document.getElementById("multiplicationBtn");
const scientificBtn = document.getElementById("scientificBtn");

// Sounds
const clickSound = document.getElementById("clickSound");
const successSound = document.getElementById("successSound");
const errorSound = document.getElementById("errorSound");
const funErrorSound = document.getElementById("funErrorSound");

// Error Modal
const errorModal = document.getElementById("errorModal");
const errorMessage = document.getElementById("errorMessage");
const closeError = document.getElementById("closeError");

closeError.addEventListener("click", () => {
  errorModal.classList.remove("show");
});

// Funny captions
const funnyCaptions = [
  "Oops! Numbers are rebelling 😅",
  "Uh-oh! Lost in space 🌌",
  "🤯 Mind blown! Check that equation.",
  "Yikes! Even I can’t calculate 🙃",
  "😂 Are you confusing me?",
  "Oopsie! Syntax is funky 🕺",
  "🤪 Math circus! Try again.",
  "Error 404: Brain not found 🧠",
  "Whoa! Beyond calculator powers ⚡",
  "😵 Inventing new math rules?",
  "Hmm... circuits dizzy 🤖",
  "Oops! Doesn’t compute 🖥️",
  "Are you sure that’s a number? 🤔",
  "💥 Equation exploded 🤸",
  "Oh no! Brain backflip 🤯"
];

// Text mode
let textMode = false;

// Button clicks
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    clickSound.play();
    const val = btn.textContent;
    if(val === "C") input.value = "";
    else if(val === "=") calculateExpression();
    else if(val === "√") input.value += "sqrt(";
    else if(val === "⌫") input.value = input.value.slice(0, -1);
    else input.value += val;
  });
});

// Calculate button
calculateBtn.addEventListener("click", async () => {
  const query = input.value.trim();
  if(!query) return;

  calculateBtn.textContent = "⏳ Calculating...";
  resultDiv.innerHTML = "";

  try {
    // For demo, we evaluate locally
    calculateExpression();
  } catch {
    showFunnyError();
    errorSound.play();
  } finally {
    calculateBtn.textContent = "🔍 Calculate";
  }
});

// Local calculation
function calculateExpression() {
  try {
    input.value = eval(input.value.replace(/sqrt/g, "Math.sqrt"));
    successSound.play();
  } catch {
    input.value = "Error";
    errorSound.play();
    showFunnyError();
  }
}

// Text mode toggle
textModeBtn.addEventListener("click", () => {
  textMode = !textMode;
  input.value = "";
  resultDiv.innerHTML = "";

  if(textMode) {
    buttonsContainer.classList.add("hidden");
    textModeBtn.textContent = "Switch Back";
    input.removeAttribute("readonly");
  } else {
    buttonsContainer.classList.remove("hidden");
    textModeBtn.textContent = "Text Mode";
    input.setAttribute("readonly", true);
  }
});

// Show funny error modal with human voice
function showFunnyError() {
  const randomIndex = Math.floor(Math.random() * funnyCaptions.length);
  const message = funnyCaptions[randomIndex];
  errorMessage.innerHTML = message;
  errorModal.classList.add("show");

  // Speak using Web Speech API
  const utter = new SpeechSynthesisUtterance(message);
  utter.rate = 1;
  utter.pitch = 1;
  speechSynthesis.speak(utter);

  funErrorSound.play();
}

// Multiplication table
multiplicationBtn.addEventListener("click", () => {
  let num = prompt("Enter a number for multiplication table:");
  if (!num || isNaN(num)) {
    showFunnyError();
    return;
  }
  let tableHTML = `<div class="pod-card"><h3>Multiplication Table of ${num}</h3>`;
  for (let i = 1; i <= 12; i++) {
    tableHTML += `<p>${num} × ${i} = ${num * i}</p>`;
  }
  tableHTML += `</div>`;
  resultDiv.innerHTML = tableHTML;
});

// Scientific formulas table
scientificBtn.addEventListener("click", () => {
  const formulas = [
    { eq: "E = mc²", desc: "Energy-Mass Equivalence" },
    { eq: "F = ma", desc: "Force = Mass × Acceleration" },
    { eq: "V = IR", desc: "Ohm's Law" },
    { eq: "pV = nRT", desc: "Ideal Gas Law" },
    { eq: "a² + b² = c²", desc: "Pythagoras Theorem" },
    { eq: "v = u + at", desc: "Linear Motion Equation" }
  ];

  let tableHTML = `<div class="pod-card"><h3>Common Scientific Formulas</h3>`;
  formulas.forEach(f => {
    tableHTML += `<p>🔹 ${f.eq} → ${f.desc}</p>`;
  });
  tableHTML += `</div>`;
  resultDiv.innerHTML = tableHTML;
});
