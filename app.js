const fingerOrder = [
  "left-thumb",
  "left-pointer",
  "left-middle",
  "left-ring",
  "left-pinky",
  "right-thumb",
  "right-pointer",
  "right-middle",
  "right-ring",
  "right-pinky"
];

const state = {
  target: 3,
  mode: "play",
  raised: new Set(),
  solvedRounds: 0,
  roundSolved: false,
  nextLocked: false,
  soundOn: false,
  audioContext: null,
  preferredVoice: null,
  numberAudio: null,
  numberBuffers: {}
};

const numberWords = [
  "zéro",
  "un",
  "deux",
  "trois",
  "quatre",
  "cinq",
  "six",
  "sept",
  "huit",
  "neuf",
  "dix"
];

const els = {
  app: document.querySelector(".app-shell"),
  targetNumber: document.querySelector("#targetNumber"),
  bigNumber: document.querySelector("#bigNumber"),
  roundTitle: document.querySelector("#roundTitle"),
  hintText: document.querySelector("#hintText"),
  currentCount: document.querySelector("#currentCount"),
  fingers: [...document.querySelectorAll(".finger")],
  modeButtons: [...document.querySelectorAll(".mode-button")],
  soundButton: document.querySelector("#soundButton"),
  speakButton: document.querySelector("#speakButton"),
  showButton: document.querySelector("#showButton"),
  nextButton: document.querySelector("#nextButton"),
  stars: [...document.querySelectorAll(".star")],
  cursor: document.querySelector(".big-cursor"),
  sprinkleField: document.querySelector("#sprinkleField")
};

const friendlyHints = {
  low: ["Un doigt de plus peut aider.", "Essaie de lever un autre doigt.", "Tu y es presque. Ajoute-en un."],
  high: ["Essaie de baisser un doigt.", "Il y en a un peu trop.", "Enlève-en un et regarde encore."],
  zero: ["Zéro, c'est aucun doigt levé.", "Pour zéro, garde tous les doigts baissés."]
};

function setTarget(target) {
  state.target = target;
  state.raised.clear();
  state.roundSolved = false;
  els.app.classList.toggle("guided", state.mode === "learn");
  updateFingerDisplay();
  updateCopyPattern();
  updateStatus();
}

function nextTarget() {
  let next = Math.floor(Math.random() * 11);
  if (next === state.target) {
    next = (next + 1 + Math.floor(Math.random() * 10)) % 11;
  }
  setTarget(next);
}

function updateStatus() {
  const count = state.raised.size;
  els.targetNumber.textContent = state.target;
  els.bigNumber.textContent = state.target;
  els.currentCount.textContent = count;
  els.speakButton.textContent = `Écoute ${state.target}`;
  els.speakButton.setAttribute("aria-label", `Écouter le nombre ${state.target}`);
  els.roundTitle.textContent = state.mode === "learn"
    ? `Apprenons ${state.target}`
    : `Peux-tu faire ${state.target} ?`;

  if (count === state.target) {
    els.hintText.textContent = state.target === 0
      ? "Oui. Aucun doigt n'est levé."
      : `Tu as fait ${state.target} !`;
    if (!state.roundSolved) {
      state.roundSolved = true;
      celebrate();
    }
    return;
  }

  if (state.target === 0) {
    els.hintText.textContent = friendlyHints.zero[0];
  } else if (state.mode === "learn") {
    els.hintText.textContent = "Regarde les doigts qui brillent, puis touche-les.";
  } else if (count < state.target) {
    els.hintText.textContent = pickHint(friendlyHints.low, state.target - count);
  } else {
    els.hintText.textContent = pickHint(friendlyHints.high, count - state.target);
  }
}

function pickHint(hints, distance) {
  return hints[Math.min(distance - 1, hints.length - 1)];
}

function updateFingerDisplay() {
  els.fingers.forEach((finger) => {
    const id = finger.dataset.finger;
    const isRaised = state.raised.has(id);
    finger.classList.toggle("raised", isRaised);
    finger.setAttribute("aria-pressed", String(isRaised));
  });
}

function updateCopyPattern() {
  const suggested = new Set(fingerOrder.slice(0, state.target));
  els.fingers.forEach((finger) => {
    const id = finger.dataset.finger;
    finger.classList.toggle("suggested", state.mode === "learn" && suggested.has(id) && !state.raised.has(id));
  });
}

function setRaisedToTarget() {
  state.raised = new Set(fingerOrder.slice(0, state.target));
  updateFingerDisplay();
  updateCopyPattern();
  updateStatus();
  playTone("show");
}

function toggleFinger(finger) {
  const id = finger.dataset.finger;
  if (state.raised.has(id)) {
    state.raised.delete(id);
  } else {
    state.raised.add(id);
  }
  updateFingerDisplay();
  updateCopyPattern();
  updateStatus();
  playTone("tap");
}

function celebrate() {
  const starCount = Math.min(els.stars.length, state.solvedRounds + 1);
  els.stars.forEach((star, index) => star.classList.toggle("earned", index < starCount));
  els.app.classList.remove("celebrate");
  window.requestAnimationFrame(() => els.app.classList.add("celebrate"));
  if (state.solvedRounds < els.stars.length) {
    state.solvedRounds += 1;
  }
  playTone("win");
}

function switchMode(mode) {
  state.mode = mode;
  els.modeButtons.forEach((button) => {
    const active = button.dataset.mode === mode;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  setTarget(state.target);
}

function ensureAudio() {
  if (!state.audioContext) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      state.audioContext = new AudioContext();
    }
  }
  return state.audioContext;
}

async function unlockAudio() {
  const audioContext = ensureAudio();
  if (audioContext && audioContext.state === "suspended") {
    await audioContext.resume();
  }
  return audioContext;
}

function playTone(kind) {
  if (!state.soundOn) {
    return;
  }
  const audioContext = ensureAudio();
  if (!audioContext) {
    return;
  }
  const tones = {
    tap: [330, 0.06],
    show: [440, 0.12],
    win: [523, 0.18]
  };
  const [frequency, duration] = tones[kind] || tones.tap;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.frequency.value = frequency;
  oscillator.type = "sine";
  gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.12, audioContext.currentTime + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);
  oscillator.connect(gain).connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + duration);
}

async function playFestiveSound() {
  const audioContext = await unlockAudio();
  if (!audioContext) {
    return;
  }
  const now = audioContext.currentTime;
  const notes = [523.25, 659.25, 783.99, 1046.5];
  notes.forEach((frequency, index) => {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const start = now + index * 0.075;
    oscillator.frequency.value = frequency;
    oscillator.type = index % 2 === 0 ? "triangle" : "sine";
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.2, start + 0.018);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.19);
    oscillator.connect(gain).connect(audioContext.destination);
    oscillator.start(start);
    oscillator.stop(start + 0.2);
  });
}

function launchSprinkles() {
  if (!els.sprinkleField) {
    return;
  }
  const colors = ["#ef6b54", "#f2b84b", "#5b7fbf", "#2f766f", "#ffffff"];
  els.sprinkleField.textContent = "";
  for (let index = 0; index < 42; index += 1) {
    const sprinkle = document.createElement("span");
    const angle = (Math.PI * 2 * index) / 42;
    const distance = 110 + Math.random() * 260;
    const drift = (Math.random() - 0.5) * 80;
    const dx = Math.cos(angle) * distance + drift;
    const dy = Math.sin(angle) * distance - 120 - Math.random() * 80;
    sprinkle.className = "sprinkle";
    sprinkle.style.setProperty("--dx", `${dx}px`);
    sprinkle.style.setProperty("--dy", `${dy}px`);
    sprinkle.style.setProperty("--spin", `${Math.random() * 720 - 360}deg`);
    sprinkle.style.setProperty("--sprinkle-color", colors[index % colors.length]);
    sprinkle.style.animationDelay = `${Math.random() * 90}ms`;
    els.sprinkleField.append(sprinkle);
  }
  window.setTimeout(() => {
    els.sprinkleField.textContent = "";
  }, 1100);
}

function goToNextRound() {
  nextTarget();
  speakNumber();
}

function handleNextRound() {
  if (state.nextLocked) {
    return;
  }
  if (!state.roundSolved) {
    goToNextRound();
    return;
  }

  state.nextLocked = true;
  els.nextButton.disabled = true;
  els.hintText.textContent = "Bravo !";
  launchSprinkles();
  playFestiveSound();
  window.setTimeout(() => {
    goToNextRound();
    state.nextLocked = false;
    els.nextButton.disabled = false;
  }, 720);
}

function chooseFrenchVoice() {
  if (!("speechSynthesis" in window)) {
    return null;
  }
  const voices = window.speechSynthesis.getVoices();
  state.preferredVoice = voices.find((voice) => voice.lang === "fr-FR")
    || voices.find((voice) => voice.lang.startsWith("fr"))
    || voices.find((voice) => voice.default)
    || voices[0]
    || null;
  return state.preferredVoice;
}

function speakNumber() {
  const spokenNumber = numberWords[state.target] || String(state.target);
  els.hintText.textContent = `Chargement du son : ${spokenNumber}`;
  playNumberWithWebAudio(spokenNumber).catch((error) => {
    console.warn("Web Audio number playback failed", error.name, error.message);
    playNumberAudio(spokenNumber);
  });
}

async function playNumberWithWebAudio(spokenNumber) {
  const audioContext = await unlockAudio();
  const embeddedSource = window.NUMBER_AUDIO && window.NUMBER_AUDIO[String(state.target)];
  if (!audioContext || !embeddedSource) {
    throw new Error("Web Audio source unavailable");
  }

  if (!state.numberBuffers[state.target]) {
    const base64 = embeddedSource.split(",")[1];
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) {
      bytes[index] = binary.charCodeAt(index);
    }
    state.numberBuffers[state.target] = await audioContext.decodeAudioData(bytes.buffer);
  }

  const source = audioContext.createBufferSource();
  const gain = audioContext.createGain();
  const chime = audioContext.createOscillator();
  const chimeGain = audioContext.createGain();
  const now = audioContext.currentTime;
  source.buffer = state.numberBuffers[state.target];
  gain.gain.value = 2.4;
  source.connect(gain).connect(audioContext.destination);
  chime.frequency.value = 660;
  chime.type = "sine";
  chimeGain.gain.setValueAtTime(0.0001, now);
  chimeGain.gain.exponentialRampToValueAtTime(0.28, now + 0.015);
  chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.11);
  chime.connect(chimeGain).connect(audioContext.destination);
  source.onended = () => {
    els.hintText.textContent = `Tu as entendu : ${spokenNumber}`;
    console.info("Web Audio number finished", spokenNumber);
  };
  els.hintText.textContent = `Son en cours : ${spokenNumber}`;
  console.info("Web Audio number playing", spokenNumber, audioContext.state);
  chime.start(now);
  chime.stop(now + 0.12);
  source.start(now + 0.14);
}

function playNumberAudio(spokenNumber) {
  const embeddedSource = window.NUMBER_AUDIO && window.NUMBER_AUDIO[String(state.target)];
  const source = embeddedSource || new URL(`audio/${state.target}.wav`, window.location.href).href;
  if (!state.numberAudio) {
    state.numberAudio = new Audio();
    state.numberAudio.preload = "auto";
    state.numberAudio.addEventListener("canplaythrough", () => {
      console.info("Number audio ready", state.numberAudio.currentSrc);
    });
    state.numberAudio.addEventListener("playing", () => {
      els.hintText.textContent = `Son en cours : ${spokenNumber}`;
      console.info("Number audio playing", state.numberAudio.currentSrc);
    });
    state.numberAudio.addEventListener("ended", () => {
      els.hintText.textContent = `Tu as entendu : ${spokenNumber}`;
      console.info("Number audio finished");
    });
    state.numberAudio.addEventListener("error", () => {
      const errorCode = state.numberAudio.error ? state.numberAudio.error.code : "unknown";
      els.hintText.textContent = `Erreur audio ${errorCode}. J'essaie une autre voix.`;
      console.warn("Number audio failed", errorCode, state.numberAudio.currentSrc);
      speakNumberWithBrowserVoice(spokenNumber);
    });
  }
  state.numberAudio.pause();
  state.numberAudio.src = source;
  state.numberAudio.load();
  state.numberAudio.currentTime = 0;
  state.numberAudio.volume = 1;
  const playPromise = state.numberAudio.play();
  if (playPromise) {
    playPromise.catch((error) => {
      els.hintText.textContent = `Son bloqué : ${error.name}`;
      console.warn("Number audio play rejected", error.name, error.message);
      speakNumberWithBrowserVoice(spokenNumber);
    });
  }
}

function speakNumberWithBrowserVoice(spokenNumber) {
  if (!("speechSynthesis" in window)) {
    els.hintText.textContent = "Le son n'est pas disponible dans ce navigateur.";
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(spokenNumber);
  const voice = state.preferredVoice || chooseFrenchVoice();
  if (voice) {
    utterance.voice = voice;
  }
  utterance.lang = "fr-FR";
  utterance.volume = 1;
  utterance.rate = 0.68;
  utterance.pitch = 1.12;
  utterance.onstart = () => {
    els.hintText.textContent = `Écoute : ${spokenNumber}`;
  };
  utterance.onerror = () => {
    els.hintText.textContent = "Je n'arrive pas à jouer le son ici. Essaie la version localhost.";
  };
  window.speechSynthesis.speak(utterance);
}

els.fingers.forEach((finger) => {
  finger.addEventListener("click", () => toggleFinger(finger));
});

els.modeButtons.forEach((button) => {
  button.addEventListener("click", () => switchMode(button.dataset.mode));
});

els.showButton.addEventListener("click", setRaisedToTarget);
els.speakButton.addEventListener("click", speakNumber);
els.nextButton.addEventListener("click", handleNextRound);

els.soundButton.addEventListener("click", async () => {
  state.soundOn = !state.soundOn;
  els.soundButton.setAttribute("aria-pressed", String(state.soundOn));
  els.soundButton.setAttribute("aria-label", state.soundOn ? "Désactiver le son" : "Activer le son");
  els.soundButton.textContent = state.soundOn ? "♫" : "♪";
  await unlockAudio();
  playTone("show");
});

window.addEventListener("pointermove", (event) => {
  if (event.pointerType === "touch" || !els.cursor) {
    return;
  }
  els.cursor.classList.add("visible");
  els.cursor.style.setProperty("--cursor-x", `${event.clientX - 5}px`);
  els.cursor.style.setProperty("--cursor-y", `${event.clientY - 3}px`);
});

window.addEventListener("pointerdown", (event) => {
  if (event.pointerType !== "touch" && els.cursor) {
    els.cursor.classList.add("down");
  }
});

window.addEventListener("pointerup", () => {
  els.cursor?.classList.remove("down");
});

window.addEventListener("pointerleave", () => {
  els.cursor?.classList.remove("visible");
});

if ("serviceWorker" in navigator && location.protocol !== "file:") {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}

if ("speechSynthesis" in window) {
  chooseFrenchVoice();
  window.speechSynthesis.addEventListener("voiceschanged", chooseFrenchVoice);
}

setTarget(3);
