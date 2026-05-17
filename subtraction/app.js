const placeNames = ["ones", "tens", "hundreds", "thousands", "ten thousands", "hundred thousands"];
const shortPlaceNames = ["1s", "10s", "100s", "1,000s", "10,000s", "100,000s"];
const rewards = ["Map", "Hat", "Key", "Boat", "Crown"];
const fruitTreasure = ["🍒", "🍎", "🍉", "🍓"];
const treasureGoal = 5;

const state = {
  digits: 2,
  includeRegrouping: true,
  minuend: 52,
  subtrahend: 18,
  answer: 34,
  solved: 0,
  gems: 0,
  attempts: 0,
  borrowMarks: new Set(),
  completing: false,
  audioContext: null
};

const els = {
  board: document.querySelector("#subtractionBoard"),
  placeLab: document.querySelector("#placeLab"),
  feedback: document.querySelector("#feedbackText"),
  helperTitle: document.querySelector("#helperTitle"),
  roundLabel: document.querySelector("#roundLabel"),
  gemCount: document.querySelector("#gemCount"),
  rescuedCount: document.querySelector("#rescuedCount"),
  path: document.querySelector("#treasurePath"),
  chest: document.querySelector("#treasureChest"),
  treasureParty: document.querySelector("#treasureParty"),
  partyChest: document.querySelector("#partyChest"),
  fruitField: document.querySelector("#fruitField"),
  sparkleField: document.querySelector("#sparkleField"),
  regroupToggle: document.querySelector("#regroupToggle"),
  levelButtons: [...document.querySelectorAll(".level-button")],
  rewardBadges: [...document.querySelectorAll(".reward")]
};

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getDigitCount() {
  if (state.digits === "mix") {
    return randomInt(2, 6);
  }
  return Number(state.digits);
}

function rangeForDigits(digits) {
  return {
    min: digits === 1 ? 0 : 10 ** (digits - 1),
    max: 10 ** digits - 1
  };
}

function needsRegrouping(top, bottom) {
  let borrow = 0;
  const width = String(top).length;
  const topDigits = String(top).padStart(width, "0").split("").map(Number).reverse();
  const bottomDigits = String(bottom).padStart(width, "0").split("").map(Number).reverse();

  for (let index = 0; index < width; index += 1) {
    const available = topDigits[index] - borrow;
    if (available < bottomDigits[index]) {
      return true;
    }
    borrow = 0;
  }
  return false;
}

function makeProblem() {
  const digits = getDigitCount();
  const { min, max } = rangeForDigits(digits);
  let top = 0;
  let bottom = 0;
  let tries = 0;
  const wantsRegrouping = state.includeRegrouping;

  do {
    top = randomInt(min, max);
    bottom = randomInt(Math.max(1, Math.floor(min / 3)), top - 1);
    tries += 1;
  } while (tries < 900 && needsRegrouping(top, bottom) !== wantsRegrouping);

  state.minuend = top;
  state.subtrahend = bottom;
  state.answer = top - bottom;
  state.attempts = 0;
  state.borrowMarks.clear();
  state.completing = false;
}

function digitsOf(number, width) {
  return String(number).padStart(width, "0").split("");
}

function regroupSteps(top, bottom) {
  const width = String(top).length;
  const topDigits = digitsOf(top, width).map(Number).reverse();
  const bottomDigits = digitsOf(bottom, width).map(Number).reverse();
  const steps = [];
  let borrow = 0;

  for (let index = 0; index < width; index += 1) {
    const place = placeNames[index];
    let available = topDigits[index] - borrow;
    const takeAway = bottomDigits[index];
    const borrowed = available < takeAway;
    let displayAvailable = available;

    if (borrowed) {
      displayAvailable += 10;
      borrow = 1;
      steps.push(`Trade 1 ${placeNames[index + 1] || "next place"} for 10 ${place}. Now ${place} has ${displayAvailable}.`);
    } else {
      borrow = 0;
    }

    steps.push(`${displayAvailable} ${place} take away ${takeAway} ${place} makes ${displayAvailable - takeAway}.`);
  }

  return steps;
}

function renderBoard() {
  const width = String(state.minuend).length;
  const top = digitsOf(state.minuend, width);
  const bottom = digitsOf(state.subtrahend, width);
  const answer = digitsOf(state.answer, width);

  els.board.innerHTML = "";
  els.board.style.setProperty("--places", String(width));
  const labelRow = document.createElement("div");
  labelRow.className = "place-row labels";

  const blank = document.createElement("span");
  labelRow.append(blank);
  top.forEach((_, index) => {
    const place = document.createElement("span");
    place.textContent = shortPlaceNames[width - index - 1];
    place.title = placeNames[width - index - 1];
    labelRow.append(place);
  });
  els.board.append(labelRow);

  const topRow = makeNumberRow("", top, "top number", "top");
  const bottomRow = makeNumberRow("-", bottom, "take away", "bottom");
  bottomRow.classList.add("bottom-row");
  const inputRow = document.createElement("div");
  inputRow.className = "number-row answer-row";
  inputRow.setAttribute("aria-label", "Answer");

  const equals = document.createElement("span");
  equals.className = "operator";
  equals.textContent = "=";
  inputRow.append(equals);

  answer.forEach((_, index) => {
    const input = document.createElement("input");
    input.className = "digit-input";
    input.inputMode = "numeric";
    input.maxLength = 1;
    input.autocomplete = "off";
    input.pattern = "[0-9]";
    input.ariaLabel = `${placeNames[width - index - 1]} answer digit`;
    input.dataset.index = String(index);
    input.addEventListener("input", handleDigitInput);
    input.addEventListener("keydown", handleDigitKeys);
    inputRow.append(input);
  });

  els.board.append(topRow, bottomRow, inputRow);
}

function makeNumberRow(operator, digits, label) {
  const row = document.createElement("div");
  row.className = "number-row";
  row.setAttribute("aria-label", label);

  const op = document.createElement("span");
  op.className = "operator";
  op.textContent = operator;
  row.append(op);

  digits.forEach((digit, index) => {
    const cell = document.createElement(label === "top number" ? "button" : "span");
    cell.className = "digit-cell";
    cell.dataset.index = String(index);
    cell.textContent = digit;

    if (label === "top number") {
      cell.type = "button";
      cell.ariaLabel = `Borrow into the ${placeNames[digits.length - index - 1]} column`;
      cell.disabled = index === 0;
      cell.addEventListener("click", () => toggleBorrow(index));
      if (state.borrowMarks.has(index)) {
        cell.classList.add("borrow-in");
      }
    }

    if (label === "take away" && state.borrowMarks.has(index + 1)) {
      cell.classList.add("borrow-from");
    }

    row.append(cell);
  });

  return row;
}

function toggleBorrow(index) {
  if (index === 0) {
    return;
  }
  const typedDigits = [...document.querySelectorAll(".digit-input")].map((input) => input.value);
  if (state.borrowMarks.has(index)) {
    state.borrowMarks.delete(index);
  } else {
    state.borrowMarks.add(index);
  }
  renderBoard();
  document.querySelectorAll(".digit-input").forEach((input, inputIndex) => {
    input.value = typedDigits[inputIndex] || "";
    checkDigitInput(input);
  });
  renderPlaceLab(String(state.minuend).length - index - 1);
  els.feedback.textContent = "Nice trade. That little 1 means this place got ten more.";
  playTone("borrow");
}

function renderPlaceLab(stepIndex = -1) {
  const width = String(state.minuend).length;
  const top = digitsOf(state.minuend, width).map(Number);
  const bottom = digitsOf(state.subtrahend, width).map(Number);
  els.placeLab.innerHTML = "";

  top.forEach((digit, index) => {
    const card = document.createElement("div");
    card.className = "place-card";
    const reverseIndex = width - index - 1;
    const needsTrade = digit < bottom[index] && index > 0;
    if (stepIndex === reverseIndex || needsTrade) {
      card.classList.add("active");
    }
    card.innerHTML = `
      <span>${placeNames[reverseIndex]}</span>
      <strong>${digit}</strong>
      <small>${digit} minus ${bottom[index]}</small>
    `;
    els.placeLab.append(card);
  });
}

function getTypedAnswer() {
  return [...document.querySelectorAll(".digit-input")].map((input) => input.value || "0").join("");
}

function handleDigitInput(event) {
  const input = event.currentTarget;
  input.value = input.value.replace(/\D/g, "").slice(-1);
  input.classList.remove("wrong");
  checkDigitInput(input);

  if (input.value) {
    const next = input.nextElementSibling;
    if (next?.classList.contains("digit-input")) {
      next.focus();
      next.select();
    }
  }
}

function handleDigitKeys(event) {
  const input = event.currentTarget;
  if (event.key === "Backspace" && !input.value) {
    const previous = input.previousElementSibling;
    if (previous?.classList.contains("digit-input")) {
      previous.focus();
      previous.value = "";
      previous.classList.remove("wrong", "correct");
      previous.dataset.celebrated = "";
    }
  }
  if (event.key === "Enter") {
    checkAnswer();
  }
}

function checkDigitInput(input) {
  const expected = String(state.answer).padStart(String(state.minuend).length, "0");
  const index = Number(input.dataset.index);
  if (!input.value) {
    input.classList.remove("correct");
    input.dataset.celebrated = "";
    return;
  }

  if (input.value === expected[index]) {
    input.classList.add("correct");
    if (input.dataset.celebrated !== "true") {
      input.dataset.celebrated = "true";
      sparkleAt(input, 8);
      playTone("digit");
    }
  } else {
    input.classList.remove("correct");
    input.dataset.celebrated = "";
  }

  maybeCompleteAnswer();
}

function maybeCompleteAnswer() {
  if (state.completing) {
    return;
  }
  const inputs = [...document.querySelectorAll(".digit-input")];
  const expected = String(state.answer).padStart(String(state.minuend).length, "0");
  const typed = inputs.map((input) => input.value).join("");
  if (typed.length === expected.length && typed === expected) {
    rescueTreasure();
  }
}

function checkAnswer() {
  if (state.completing) {
    return;
  }
  const expected = String(state.answer).padStart(String(state.minuend).length, "0");
  const typed = getTypedAnswer();
  const inputs = [...document.querySelectorAll(".digit-input")];
  state.attempts += 1;

  inputs.forEach((input, index) => {
    input.classList.toggle("wrong", typed[index] !== expected[index]);
  });

  if (Number(typed) === state.answer) {
    rescueTreasure();
    return;
  }

  const firstWrong = inputs.find((input) => input.classList.contains("wrong"));
  firstWrong?.focus();
  els.feedback.textContent = state.attempts > 1
    ? "Almost. Check the glowing box, then try again."
    : "Good try. Start on the right side and check each place.";
  els.helperTitle.textContent = "You can do this";
}

function rescueTreasure() {
  if (state.completing) {
    return;
  }
  state.completing = true;
  state.solved += 1;
  state.gems += Math.max(1, 4 - state.attempts);
  els.feedback.textContent = "Gate open! Treasure rescued!";
  els.helperTitle.textContent = "Sparkly subtraction!";
  document.querySelectorAll(".digit-input").forEach((input) => {
    input.classList.remove("wrong");
    input.classList.add("correct");
  });
  els.chest.classList.add("open");
  updateScore();
  sparkle();
  playTone("win");
  if (state.solved >= treasureGoal) {
    window.setTimeout(showTreasureParty, 700);
    return;
  }
  window.setTimeout(() => {
    makeProblem();
    renderGame();
  }, 1000);
}

function showHint() {
  const steps = regroupSteps(state.minuend, state.subtrahend);
  const hintIndex = Math.min(state.attempts, steps.length - 1);
  const placeIndex = hintIndex % String(state.minuend).length;
  els.feedback.textContent = steps[hintIndex];
  els.helperTitle.textContent = state.includeRegrouping ? "Trade when you need to" : "Subtract each place";
  renderPlaceLab(placeIndex);
}

function clearAnswer() {
  document.querySelectorAll(".digit-input").forEach((input) => {
    input.value = "";
    input.classList.remove("wrong", "correct");
    input.dataset.celebrated = "";
  });
  document.querySelector(".digit-input")?.focus();
  els.feedback.textContent = "Fresh boxes. Try from the ones place.";
}

function updateScore() {
  els.gemCount.textContent = String(state.gems);
  els.rescuedCount.textContent = String(state.solved);
  els.roundLabel.textContent = `Gate ${Math.min(state.solved + 1, treasureGoal)}`;
  els.path.style.setProperty("--progress", `${Math.min(100, (state.solved / treasureGoal) * 100)}%`);
  els.rewardBadges.forEach((badge, index) => {
    badge.classList.toggle("unlocked", index <= Math.floor(state.solved / 2));
    badge.textContent = rewards[index];
  });
}

function sparkle() {
  els.sparkleField.innerHTML = "";
  for (let index = 0; index < 28; index += 1) {
    const dot = document.createElement("span");
    dot.style.left = `${randomInt(12, 88)}vw`;
    dot.style.top = `${randomInt(18, 78)}vh`;
    dot.style.animationDelay = `${index * 18}ms`;
    els.sparkleField.append(dot);
  }
  window.setTimeout(() => {
    els.sparkleField.innerHTML = "";
  }, 900);
}

function sparkleAt(element, count = 8) {
  const box = element.getBoundingClientRect();
  const centerX = box.left + box.width / 2;
  const centerY = box.top + box.height / 2;

  for (let index = 0; index < count; index += 1) {
    const dot = document.createElement("span");
    dot.className = "mini-sparkle";
    dot.style.left = `${centerX + randomInt(-24, 24)}px`;
    dot.style.top = `${centerY + randomInt(-18, 18)}px`;
    dot.style.animationDelay = `${index * 14}ms`;
    els.sparkleField.append(dot);
  }

  window.setTimeout(() => {
    els.sparkleField.querySelectorAll(".mini-sparkle").forEach((dot) => dot.remove());
  }, 760);
}

function showTreasureParty() {
  els.treasureParty.hidden = false;
  els.treasureParty.classList.remove("revealed");
  els.fruitField.innerHTML = "";
  playTone("treasure");

  window.setTimeout(() => {
    els.treasureParty.classList.add("revealed");
    explodeFruit();
    playTone("fruit");
  }, 1000);

  window.setTimeout(() => {
    els.treasureParty.hidden = true;
    els.treasureParty.classList.remove("revealed");
    els.fruitField.innerHTML = "";
    restartTreasureRun();
  }, 5000);
}

function explodeFruit() {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2 + 70;
  for (let index = 0; index < 80; index += 1) {
    const fruit = document.createElement("span");
    const angle = (Math.PI * 2 * index) / 80 + Math.random() * 0.5;
    const distance = randomInt(120, Math.max(220, Math.min(window.innerWidth, window.innerHeight)));
    fruit.textContent = fruitTreasure[index % fruitTreasure.length];
    fruit.style.left = `${centerX}px`;
    fruit.style.top = `${centerY}px`;
    fruit.style.setProperty("--tx", `${Math.cos(angle) * distance}px`);
    fruit.style.setProperty("--ty", `${Math.sin(angle) * distance - randomInt(30, 190)}px`);
    fruit.style.setProperty("--spin", `${randomInt(-720, 720)}deg`);
    fruit.style.animationDelay = `${randomInt(0, 420)}ms`;
    els.fruitField.append(fruit);
  }
}

function restartTreasureRun() {
  state.solved = 0;
  state.gems = 0;
  els.chest.classList.remove("open");
  makeProblem();
  renderGame();
}

function getAudioContext() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) {
    return null;
  }
  if (!state.audioContext) {
    state.audioContext = new AudioContextClass();
  }
  if (state.audioContext.state === "suspended") {
    state.audioContext.resume().catch(() => {});
  }
  return state.audioContext;
}

function playTone(type) {
  const audioContext = getAudioContext();
  if (!audioContext) {
    return;
  }

  const now = audioContext.currentTime;
  const notes = {
    borrow: [330, 440],
    digit: [660, 880],
    win: [523, 659, 784, 1046],
    treasure: [392, 523, 659],
    fruit: [784, 988, 1175, 1568]
  }[type];

  notes.forEach((frequency, index) => {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = type === "borrow" ? "triangle" : "sine";
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, now + index * 0.08);
    gain.gain.exponentialRampToValueAtTime(0.12, now + index * 0.08 + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.08 + 0.16);
    oscillator.connect(gain).connect(audioContext.destination);
    oscillator.start(now + index * 0.08);
    oscillator.stop(now + index * 0.08 + 0.17);
  });
}

function renderGame() {
  els.chest.classList.remove("open");
  renderBoard();
  renderPlaceLab();
  updateScore();
  els.feedback.textContent = "Type the answer under the line.";
  els.helperTitle.textContent = state.includeRegrouping ? "Trade if a place is too small" : "Start with the ones";
}

els.levelButtons.forEach((button) => {
  button.addEventListener("click", () => {
    els.levelButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    state.digits = button.dataset.digits === "mix" ? "mix" : Number(button.dataset.digits);
    makeProblem();
    renderGame();
  });
});

els.regroupToggle.addEventListener("change", () => {
  state.includeRegrouping = els.regroupToggle.checked;
  makeProblem();
  renderGame();
});

document.querySelector("#checkButton").addEventListener("click", checkAnswer);
document.querySelector("#hintButton").addEventListener("click", showHint);
document.querySelector("#clearButton").addEventListener("click", clearAnswer);
document.querySelector("#newProblemButton").addEventListener("click", () => {
  makeProblem();
  renderGame();
});

makeProblem();
renderGame();
