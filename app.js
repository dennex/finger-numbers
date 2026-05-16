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
  lang: "fr",
  mode: "play",
  raised: new Set(),
  solvedRounds: 0,
  roundSolved: false,
  nextLocked: false,
  selectedAnswer: null,
  soundOn: false,
  audioContext: null,
  preferredVoice: null,
  numberAudio: null,
  numberBuffers: {},
  promptAudio: null,
  promptBuffers: {}
};

const translations = {
  fr: {
    htmlLang: "fr",
    title: "Les nombres avec les doigts",
    brand: "Les doigts et les nombres",
    langLabel: "Langue",
    modesLabel: "Mode",
    actionMake: "Fais",
    actionCount: "Compte",
    modes: { play: "Jouer", learn: "Apprendre", count: "Compter" },
    numberWords: ["zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix"],
    roundTitle: {
      play: (target) => `Peux-tu faire ${target} ?`,
      learn: (target) => `Apprenons ${target}`,
      count: () => "Combien de doigts sont levés ?"
    },
    hints: {
      initial: "Touche les doigts pour les lever.",
      low: ["Un doigt de plus peut aider.", "Essaie de lever un autre doigt.", "Tu y es presque. Ajoute-en un."],
      high: ["Essaie de baisser un doigt.", "Il y en a un peu trop.", "Enlève-en un et regarde encore."],
      zero: ["Zéro, c'est aucun doigt levé.", "Pour zéro, garde tous les doigts baissés."],
      solvedZero: "Oui. Aucun doigt n'est levé.",
      made: (target) => `Tu as fait ${numberLabel(target)} !`,
      learn: "Regarde les doigts qui brillent, puis touche-les.",
      countStart: "Compte les doigts levés, puis touche le bon nombre.",
      countSolved: (target) => `Oui, c'est ${numberLabel(target)} !`,
      countLow: "Il y en a un peu plus. Essaie encore.",
      countHigh: "Il y en a un peu moins. Essaie encore.",
      bravo: "Bravo !",
      loadingSound: (word) => `Chargement du son : ${word}`,
      soundPlaying: (word) => `Son en cours : ${word}`,
      heard: (word) => `Tu as entendu : ${word}`,
      soundBlocked: (name) => `Son bloqué : ${name}`,
      audioError: (code) => `Erreur audio ${code}. J'essaie une autre voix.`,
      noSound: "Le son n'est pas disponible dans ce navigateur.",
      cannotSpeak: "Je n'arrive pas à parler ici.",
      cannotPlay: "Je n'arrive pas à jouer le son ici. Essaie la version localhost."
    },
    counterLabel: "Tu as fait",
    listen: (target) => `Écoute ${target}`,
    listenLabel: (target) => `Écouter le nombre ${target}`,
    show: "Montre-moi",
    next: "Suivant",
    soundOn: "Désactiver le son",
    soundOff: "Activer le son",
    handsLabel: "Deux mains avec des doigts à toucher",
    topBarLabel: "Commandes du jeu",
    actionBarLabel: "Actions du tour",
    numberCardLabel: "Nombre à faire",
    answerPadLabel: "Choisis le nombre de doigts",
    rewardsLabel: "Étoiles gagnées",
    left: "Gauche",
    right: "Droite",
    fingers: {
      thumb: "Pouce",
      pointer: "Index",
      middle: "Majeur",
      ring: "Annulaire",
      pinky: "Auriculaire"
    },
    promptAudio: {
      count: "Combien de doigts sont levés ?",
      play: "Peux-tu faire le chiffre ?"
    },
    voiceLang: "fr-FR"
  },
  yue: {
    htmlLang: "zh-HK",
    title: "手指數字",
    brand: "手指同數字",
    langLabel: "語言",
    modesLabel: "模式",
    actionMake: "做",
    actionCount: "數",
    modes: { play: "玩", learn: "學", count: "數" },
    numberWords: ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"],
    roundTitle: {
      play: (target) => `你可唔可以做 ${numberLabel(target)}？`,
      learn: (target) => `一齊學 ${numberLabel(target)}`,
      count: () => "有幾多隻手指舉起咗？"
    },
    hints: {
      initial: "撳手指舉起佢哋。",
      low: ["再加一隻手指。", "試吓舉多一隻手指。", "差唔多喇，再加一隻。"],
      high: ["試吓放低一隻手指。", "有少少多咗。", "放低一隻再睇吓。"],
      zero: ["零即係冇手指舉起。", "零就放低晒所有手指。"],
      solvedZero: "啱喇。冇手指舉起。",
      made: (target) => `你做咗 ${numberLabel(target)}！`,
      learn: "睇住發光嘅手指，然後撳佢哋。",
      countStart: "數吓舉起咗嘅手指，然後撳啱嘅數字。",
      countSolved: (target) => `啱喇，係 ${numberLabel(target)}！`,
      countLow: "仲有多少少。再試吓。",
      countHigh: "少啲先啱。再試吓。",
      bravo: "叻叻！",
      loadingSound: (word) => `載入聲音：${word}`,
      soundPlaying: (word) => `播放緊：${word}`,
      heard: (word) => `你聽到：${word}`,
      soundBlocked: (name) => `聲音被擋住：${name}`,
      audioError: (code) => `聲音錯誤 ${code}。試另一把聲。`,
      noSound: "呢個瀏覽器冇聲音。",
      cannotSpeak: "呢度講唔到聲。",
      cannotPlay: "呢度播唔到聲。試吓 localhost 版本。"
    },
    counterLabel: "你做咗",
    listen: (target) => `聽 ${target}`,
    listenLabel: (target) => `聽數字 ${target}`,
    show: "示範",
    next: "下一個",
    soundOn: "關聲",
    soundOff: "開聲",
    handsLabel: "兩隻可以撳嘅手",
    topBarLabel: "遊戲控制",
    actionBarLabel: "今次動作",
    numberCardLabel: "要做嘅數字",
    answerPadLabel: "揀手指數量",
    rewardsLabel: "得到嘅星星",
    left: "左",
    right: "右",
    fingers: {
      thumb: "拇指",
      pointer: "食指",
      middle: "中指",
      ring: "無名指",
      pinky: "尾指"
    },
    promptAudio: {
      count: "有幾多隻手指舉起咗？",
      play: "你可唔可以做呢個數字？"
    },
    voiceLang: "zh-HK"
  }
};

function copy() {
  return translations[state.lang] || translations.fr;
}

function numberLabel(value) {
  return state.lang === "yue"
    ? copy().numberWords[value]
    : String(value);
}

const els = {
  app: document.querySelector(".app-shell"),
  actionVerb: document.querySelector("#actionVerb"),
  targetNumber: document.querySelector("#targetNumber"),
  bigNumber: document.querySelector("#bigNumber"),
  roundTitle: document.querySelector("#roundTitle"),
  hintText: document.querySelector("#hintText"),
  currentCount: document.querySelector("#currentCount"),
  fingers: [...document.querySelectorAll(".finger")],
  modeButtons: [...document.querySelectorAll(".mode-button")],
  languageButtons: [...document.querySelectorAll(".language-button")],
  answerPad: document.querySelector("#answerPad"),
  answerButtons: [...document.querySelectorAll(".answer-button")],
  soundButton: document.querySelector("#soundButton"),
  speakButton: document.querySelector("#speakButton"),
  showButton: document.querySelector("#showButton"),
  nextButton: document.querySelector("#nextButton"),
  stars: [...document.querySelectorAll(".star")],
  counterLabel: document.querySelector(".counter-label"),
  eyebrow: document.querySelector(".eyebrow"),
  modeSwitch: document.querySelector(".mode-switch"),
  languageSwitch: document.querySelector(".language-switch"),
  handsStage: document.querySelector(".hands-stage"),
  handLabels: [...document.querySelectorAll(".hand-label")],
  hands: [...document.querySelectorAll(".hand")],
  numberCard: document.querySelector(".number-card"),
  topBar: document.querySelector(".top-bar"),
  actionBar: document.querySelector(".action-bar"),
  rewardTray: document.querySelector(".reward-tray"),
  cursor: document.querySelector(".big-cursor"),
  sprinkleField: document.querySelector("#sprinkleField")
};

function updateStaticCopy() {
  const text = copy();
  document.documentElement.lang = text.htmlLang;
  document.title = text.title;
  els.eyebrow.textContent = text.brand;
  els.modeSwitch.setAttribute("aria-label", text.modesLabel);
  els.topBar.setAttribute("aria-label", text.topBarLabel);
  els.actionBar.setAttribute("aria-label", text.actionBarLabel);
  els.languageSwitch.setAttribute("aria-label", text.langLabel);
  els.numberCard.setAttribute("aria-label", text.numberCardLabel);
  els.answerPad.setAttribute("aria-label", text.answerPadLabel);
  els.handsStage.setAttribute("aria-label", text.handsLabel);
  els.rewardTray.setAttribute("aria-label", text.rewardsLabel);
  els.counterLabel.textContent = text.counterLabel;
  els.showButton.textContent = text.show;
  els.nextButton.textContent = text.next;
  els.soundButton.setAttribute("aria-label", state.soundOn ? text.soundOn : text.soundOff);
  els.handLabels[0].textContent = text.left;
  els.handLabels[1].textContent = text.right;
  els.hands[0].setAttribute("aria-label", text.left);
  els.hands[1].setAttribute("aria-label", text.right);

  els.modeButtons.forEach((button) => {
    button.textContent = text.modes[button.dataset.mode];
  });
  els.languageButtons.forEach((button) => {
    const active = button.dataset.lang === state.lang;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  els.fingers.forEach((finger) => {
    const [, fingerName] = finger.dataset.finger.split("-");
    const handName = finger.dataset.finger.startsWith("left") ? text.left : text.right;
    const label = text.fingers[fingerName];
    finger.querySelector("span").textContent = label;
    finger.setAttribute("aria-label", `${label} ${handName}`);
  });
}

function setTarget(target) {
  state.target = target;
  state.raised.clear();
  state.selectedAnswer = null;
  state.roundSolved = false;
  els.app.classList.toggle("guided", state.mode === "learn");
  els.app.classList.toggle("count-mode", state.mode === "count");
  if (state.mode === "count") {
    state.raised = new Set(fingerOrder.slice(0, state.target));
  }
  updateFingerDisplay();
  updateCopyPattern();
  updateAnswerPad();
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
  const text = copy();
  const count = state.raised.size;
  const isCounting = state.mode === "count";
  els.actionVerb.textContent = isCounting ? text.actionCount : text.actionMake;
  els.targetNumber.textContent = isCounting ? "?" : numberLabel(state.target);
  els.bigNumber.textContent = isCounting ? "?" : numberLabel(state.target);
  els.currentCount.textContent = count;
  els.speakButton.textContent = text.listen(numberLabel(state.target));
  els.speakButton.setAttribute("aria-label", text.listenLabel(numberLabel(state.target)));
  if (isCounting) {
    els.roundTitle.textContent = text.roundTitle.count();
    if (state.roundSolved) {
      els.hintText.textContent = text.hints.countSolved(state.target);
    } else if (state.selectedAnswer === null) {
      els.hintText.textContent = text.hints.countStart;
    } else {
      els.hintText.textContent = state.selectedAnswer < state.target
        ? text.hints.countLow
        : text.hints.countHigh;
    }
    return;
  }

  els.roundTitle.textContent = text.roundTitle[state.mode](state.target);

  if (count === state.target) {
    els.hintText.textContent = state.target === 0
      ? text.hints.solvedZero
      : text.hints.made(state.target);
    if (!state.roundSolved) {
      state.roundSolved = true;
      celebrate();
    }
    return;
  }

  if (state.target === 0) {
    els.hintText.textContent = text.hints.zero[0];
  } else if (state.mode === "learn") {
    els.hintText.textContent = text.hints.learn;
  } else if (count < state.target) {
    els.hintText.textContent = pickHint(text.hints.low, state.target - count);
  } else {
    els.hintText.textContent = pickHint(text.hints.high, count - state.target);
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
    finger.classList.toggle("folded", state.mode === "count" && !isRaised);
    finger.setAttribute("aria-pressed", String(isRaised));
    finger.disabled = state.mode === "count";
  });
}

function updateCopyPattern() {
  const suggested = new Set(fingerOrder.slice(0, state.target));
  els.fingers.forEach((finger) => {
    const id = finger.dataset.finger;
    finger.classList.toggle("suggested", state.mode === "learn" && suggested.has(id) && !state.raised.has(id));
  });
}

function updateAnswerPad() {
  const isCounting = state.mode === "count";
  els.answerPad.hidden = !isCounting;
  els.answerButtons.forEach((button) => {
    const answer = Number(button.dataset.answer);
    const isSelected = state.selectedAnswer === answer;
    button.textContent = numberLabel(answer);
    button.classList.toggle("selected", isSelected);
    button.classList.toggle("correct", state.roundSolved && answer === state.target);
    button.setAttribute("aria-pressed", String(isSelected));
  });
  els.showButton.hidden = isCounting;
  els.speakButton.hidden = isCounting;
  els.nextButton.hidden = isCounting;
}

function setRaisedToTarget() {
  state.raised = new Set(fingerOrder.slice(0, state.target));
  updateFingerDisplay();
  updateCopyPattern();
  updateStatus();
  playTone("show");
}

function toggleFinger(finger) {
  if (state.mode === "count") {
    return;
  }
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

function chooseAnswer(answer) {
  if (state.mode !== "count" || state.roundSolved) {
    return;
  }
  state.selectedAnswer = answer;
  if (answer === state.target) {
    state.roundSolved = true;
    updateAnswerPad();
    updateStatus();
    celebrate();
    launchSprinkles();
    playFestiveSound();
    speakNumber();
    window.setTimeout(() => {
      if (state.mode === "count") {
        nextTarget();
      }
    }, 900);
    return;
  }
  updateAnswerPad();
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
  const previousMode = state.mode;
  state.mode = mode;
  els.modeButtons.forEach((button) => {
    const active = button.dataset.mode === mode;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  setTarget(state.target);
  if (previousMode !== mode) {
    speakModePrompt(mode);
  }
}

function switchLanguage(lang) {
  if (!translations[lang] || state.lang === lang) {
    return;
  }
  state.lang = lang;
  state.preferredVoice = null;
  updateStaticCopy();
  updateCopyPattern();
  updateAnswerPad();
  updateStatus();
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
  if (state.mode !== "count") {
    speakNumber();
  }
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
  els.hintText.textContent = copy().hints.bravo;
  launchSprinkles();
  playFestiveSound();
  window.setTimeout(() => {
    goToNextRound();
    state.nextLocked = false;
    els.nextButton.disabled = false;
  }, 720);
}

function choosePreferredVoice() {
  if (!("speechSynthesis" in window)) {
    return null;
  }
  const text = copy();
  const voices = window.speechSynthesis.getVoices();
  const voicePrefix = text.voiceLang.split("-")[0];
  state.preferredVoice = voices.find((voice) => voice.lang === text.voiceLang)
    || voices.find((voice) => voice.lang.startsWith(voicePrefix))
    || voices.find((voice) => voice.default)
    || voices[0]
    || null;
  return state.preferredVoice;
}

function getNumberAudioSource() {
  return window.APP_AUDIO?.[state.lang]?.numbers?.[String(state.target)]
    || window.NUMBER_AUDIO?.[String(state.target)];
}

function getPromptAudioSource(mode) {
  return window.APP_AUDIO?.[state.lang]?.prompts?.[mode]
    || window.PROMPT_AUDIO?.[mode];
}

function getNumberAudioPath() {
  return state.lang === "fr"
    ? `audio/${state.target}.wav`
    : `audio/${state.lang}-${state.target}.wav`;
}

function getPromptAudioPath(mode) {
  return state.lang === "fr"
    ? `audio/${mode}-prompt.wav`
    : `audio/${state.lang}-${mode}-prompt.wav`;
}

function speakNumber() {
  const text = copy();
  const spokenNumber = text.numberWords[state.target] || String(state.target);
  els.hintText.textContent = text.hints.loadingSound(spokenNumber);
  playNumberWithWebAudio(spokenNumber).catch((error) => {
    console.warn("Web Audio number playback failed", error.name, error.message);
    playNumberAudio(spokenNumber);
  });
}

async function playNumberWithWebAudio(spokenNumber) {
  const audioContext = await unlockAudio();
  const embeddedSource = getNumberAudioSource();
  if (!audioContext || !embeddedSource) {
    throw new Error("Web Audio source unavailable");
  }

  const bufferKey = `${state.lang}-${state.target}`;
  if (!state.numberBuffers[bufferKey]) {
    const base64 = embeddedSource.split(",")[1];
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) {
      bytes[index] = binary.charCodeAt(index);
    }
    state.numberBuffers[bufferKey] = await audioContext.decodeAudioData(bytes.buffer);
  }

  const source = audioContext.createBufferSource();
  const gain = audioContext.createGain();
  const chime = audioContext.createOscillator();
  const chimeGain = audioContext.createGain();
  const now = audioContext.currentTime;
  source.buffer = state.numberBuffers[bufferKey];
  gain.gain.value = 2.4;
  source.connect(gain).connect(audioContext.destination);
  chime.frequency.value = 660;
  chime.type = "sine";
  chimeGain.gain.setValueAtTime(0.0001, now);
  chimeGain.gain.exponentialRampToValueAtTime(0.28, now + 0.015);
  chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.11);
  chime.connect(chimeGain).connect(audioContext.destination);
  source.onended = () => {
    els.hintText.textContent = copy().hints.heard(spokenNumber);
    console.info("Web Audio number finished", spokenNumber);
  };
  els.hintText.textContent = copy().hints.soundPlaying(spokenNumber);
  console.info("Web Audio number playing", spokenNumber, audioContext.state);
  chime.start(now);
  chime.stop(now + 0.12);
  source.start(now + 0.14);
}

function playNumberAudio(spokenNumber) {
  const embeddedSource = getNumberAudioSource();
  const source = embeddedSource || new URL(getNumberAudioPath(), window.location.href).href;
  if (!state.numberAudio) {
    state.numberAudio = new Audio();
    state.numberAudio.preload = "auto";
    state.numberAudio.addEventListener("canplaythrough", () => {
      console.info("Number audio ready", state.numberAudio.currentSrc);
    });
    state.numberAudio.addEventListener("playing", () => {
      els.hintText.textContent = copy().hints.soundPlaying(spokenNumber);
      console.info("Number audio playing", state.numberAudio.currentSrc);
    });
    state.numberAudio.addEventListener("ended", () => {
      els.hintText.textContent = copy().hints.heard(spokenNumber);
      console.info("Number audio finished");
    });
    state.numberAudio.addEventListener("error", () => {
      const errorCode = state.numberAudio.error ? state.numberAudio.error.code : "unknown";
      els.hintText.textContent = copy().hints.audioError(errorCode);
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
      els.hintText.textContent = copy().hints.soundBlocked(error.name);
      console.warn("Number audio play rejected", error.name, error.message);
      speakNumberWithBrowserVoice(spokenNumber);
    });
  }
}

function speakNumberWithBrowserVoice(spokenNumber) {
  speakPhrase(spokenNumber, {
    onStartText: copy().hints.soundPlaying(spokenNumber),
    onErrorText: copy().hints.cannotPlay
  });
}

function speakModePrompt(mode) {
  const prompt = copy().promptAudio[mode];
  if (!prompt) {
    return;
  }
  playPromptWithWebAudio(mode, prompt).catch((error) => {
    console.warn("Web Audio prompt playback failed", error.name, error.message);
    playPromptAudio(mode, prompt);
  });
}

async function playPromptWithWebAudio(mode, prompt) {
  const audioContext = await unlockAudio();
  const embeddedSource = getPromptAudioSource(mode);
  if (!audioContext || !embeddedSource) {
    throw new Error("Prompt audio source unavailable");
  }

  const bufferKey = `${state.lang}-${mode}`;
  if (!state.promptBuffers[bufferKey]) {
    const base64 = embeddedSource.split(",")[1];
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) {
      bytes[index] = binary.charCodeAt(index);
    }
    state.promptBuffers[bufferKey] = await audioContext.decodeAudioData(bytes.buffer);
  }

  const source = audioContext.createBufferSource();
  const gain = audioContext.createGain();
  source.buffer = state.promptBuffers[bufferKey];
  gain.gain.value = 2.2;
  source.connect(gain).connect(audioContext.destination);
  source.onended = () => {
    console.info("Web Audio prompt finished", mode);
  };
  console.info("Web Audio prompt playing", mode, prompt, audioContext.state);
  source.start();
}

function playPromptAudio(mode, prompt) {
  const embeddedSource = getPromptAudioSource(mode);
  const source = embeddedSource || new URL(getPromptAudioPath(mode), window.location.href).href;
  if (!state.promptAudio) {
    state.promptAudio = new Audio();
    state.promptAudio.preload = "auto";
    state.promptAudio.addEventListener("playing", () => {
      console.info("Prompt audio playing", state.promptAudio.currentSrc);
    });
    state.promptAudio.addEventListener("ended", () => {
      console.info("Prompt audio finished", mode);
    });
    state.promptAudio.addEventListener("error", () => {
      const errorCode = state.promptAudio.error ? state.promptAudio.error.code : "unknown";
      console.warn("Prompt audio failed", errorCode, state.promptAudio.currentSrc);
      speakPhrase(prompt);
    });
  }
  state.promptAudio.pause();
  state.promptAudio.src = source;
  state.promptAudio.load();
  state.promptAudio.currentTime = 0;
  state.promptAudio.volume = 1;
  const playPromise = state.promptAudio.play();
  if (playPromise) {
    playPromise.catch((error) => {
      console.warn("Prompt audio play rejected", error.name, error.message);
      speakPhrase(prompt);
    });
  }
}

function speakPhrase(phrase, options = {}) {
  if (!("speechSynthesis" in window)) {
    els.hintText.textContent = copy().hints.noSound;
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(phrase);
  const text = copy();
  const voice = state.preferredVoice || choosePreferredVoice();
  if (voice) {
    utterance.voice = voice;
  }
  utterance.lang = text.voiceLang;
  utterance.volume = 1;
  utterance.rate = 0.68;
  utterance.pitch = 1.12;
  if (options.onStartText) {
    utterance.onstart = () => {
      els.hintText.textContent = options.onStartText;
    };
  }
  utterance.onerror = () => {
    els.hintText.textContent = options.onErrorText || text.hints.cannotSpeak;
  };
  window.speechSynthesis.speak(utterance);
}

els.fingers.forEach((finger) => {
  finger.addEventListener("click", () => toggleFinger(finger));
});

els.modeButtons.forEach((button) => {
  button.addEventListener("click", () => switchMode(button.dataset.mode));
});

els.languageButtons.forEach((button) => {
  button.addEventListener("click", () => switchLanguage(button.dataset.lang));
});

els.answerButtons.forEach((button) => {
  button.addEventListener("click", () => chooseAnswer(Number(button.dataset.answer)));
});

els.showButton.addEventListener("click", setRaisedToTarget);
els.speakButton.addEventListener("click", speakNumber);
els.nextButton.addEventListener("click", handleNextRound);

els.soundButton.addEventListener("click", async () => {
  state.soundOn = !state.soundOn;
  els.soundButton.setAttribute("aria-pressed", String(state.soundOn));
  els.soundButton.setAttribute("aria-label", state.soundOn ? copy().soundOn : copy().soundOff);
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
  choosePreferredVoice();
  window.speechSynthesis.addEventListener("voiceschanged", choosePreferredVoice);
}

updateStaticCopy();
setTarget(3);
