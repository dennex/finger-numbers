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
  promptBuffers: {},
  resultAudio: null,
  resultBuffers: {},
  boxing: {
    playerEnergy: 20,
    opponentEnergy: 20,
    timeLeft: 5,
    timerId: null,
    resolving: false,
    gameOver: false
  }
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
    actionBoxing: "Frappe",
    modes: { play: "Jouer", learn: "Apprendre", count: "Compter", boxing: "Boxe" },
    numberWords: ["zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix"],
    roundTitle: {
      play: (target) => `Peux-tu faire ${target} ?`,
      learn: (target) => `Apprenons ${target}`,
      count: () => "Combien de doigts sont levés ?",
      boxing: () => "Frappe les doigts !"
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
      cannotPlay: "Je n'arrive pas à jouer le son ici. Essaie la version localhost.",
      boxingStart: "Touche le bon nombre avant zéro.",
      boxingPunch: (damage) => `Bien joué ! L'adversaire perd ${damage}.`,
      boxingHit: (damage) => `Ouille ! Tu perds ${damage}.`,
      boxingWin: "Tu as gagné !",
      boxingLose: "Tu as perdu !"
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
    boxingLabel: "Jeu de boxe",
    playerLabel: "Toi",
    opponentLabel: "Adversaire",
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
      play: "Peux-tu faire le chiffre ?",
      boxing: "Frappe le bon nombre avant zéro."
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
    actionBoxing: "打",
    modes: { play: "玩", learn: "學", count: "數", boxing: "拳擊" },
    numberWords: ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"],
    roundTitle: {
      play: (target) => `你可唔可以做 ${numberLabel(target)}？`,
      learn: (target) => `一齊學 ${numberLabel(target)}`,
      count: () => "有幾多隻手指舉起咗？",
      boxing: () => "打啱手指！"
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
      cannotPlay: "呢度播唔到聲。試吓 localhost 版本。",
      boxingStart: "零之前撳啱嘅數字。",
      boxingPunch: (damage) => `好嘢！對手扣 ${damage}。`,
      boxingHit: (damage) => `哎呀！你扣 ${damage}。`,
      boxingWin: "你贏咗！",
      boxingLose: "你輸咗！"
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
    boxingLabel: "拳擊遊戲",
    playerLabel: "你",
    opponentLabel: "對手",
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
      play: "你可唔可以做呢個數字？",
      boxing: "零之前撳啱嘅數字。"
    },
    voiceLang: "zh-HK"
  },
  zh: {
    htmlLang: "zh-CN",
    title: "手指数字",
    brand: "手指和数字",
    langLabel: "语言",
    modesLabel: "模式",
    actionMake: "做",
    actionCount: "数",
    actionBoxing: "打",
    modes: { play: "玩", learn: "学", count: "数", boxing: "拳击" },
    numberWords: ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"],
    roundTitle: {
      play: (target) => `你能做出 ${numberLabel(target)} 吗？`,
      learn: (target) => `一起学 ${numberLabel(target)}`,
      count: () => "有几根手指举起来？",
      boxing: () => "打对手指！"
    },
    hints: {
      initial: "点手指把它们举起来。",
      low: ["再加一根手指。", "试着再举一根手指。", "快对了，再加一根。"],
      high: ["试着放下一根手指。", "有一点多了。", "放下一根，再看一看。"],
      zero: ["零就是没有手指举起来。", "零的时候，把手指都放下。"],
      solvedZero: "对了。没有手指举起来。",
      made: (target) => `你做出了 ${numberLabel(target)}！`,
      learn: "看发亮的手指，然后点它们。",
      countStart: "数一数举起来的手指，然后点正确的数字。",
      countSolved: (target) => `对了，是 ${numberLabel(target)}！`,
      countLow: "还要多一点。再试试。",
      countHigh: "少一点才对。再试试。",
      bravo: "真棒！",
      loadingSound: (word) => `正在加载声音：${word}`,
      soundPlaying: (word) => `正在播放：${word}`,
      heard: (word) => `你听到了：${word}`,
      soundBlocked: (name) => `声音被阻止：${name}`,
      audioError: (code) => `声音错误 ${code}。我试试别的声音。`,
      noSound: "这个浏览器不能播放声音。",
      cannotSpeak: "这里不能说话。",
      cannotPlay: "这里不能播放声音。试试 localhost 版本。",
      boxingStart: "在零之前点正确的数字。",
      boxingPunch: (damage) => `做得好！对手扣 ${damage}。`,
      boxingHit: (damage) => `哎呀！你扣 ${damage}。`,
      boxingWin: "你赢了！",
      boxingLose: "你输了！"
    },
    counterLabel: "你做出了",
    listen: (target) => `听 ${target}`,
    listenLabel: (target) => `听数字 ${target}`,
    show: "示范",
    next: "下一个",
    soundOn: "关声音",
    soundOff: "开声音",
    handsLabel: "两只可以点的手",
    topBarLabel: "游戏控制",
    actionBarLabel: "本轮操作",
    numberCardLabel: "要做的数字",
    answerPadLabel: "选择手指数量",
    rewardsLabel: "得到的星星",
    boxingLabel: "拳击游戏",
    playerLabel: "你",
    opponentLabel: "对手",
    left: "左",
    right: "右",
    fingers: {
      thumb: "拇指",
      pointer: "食指",
      middle: "中指",
      ring: "无名指",
      pinky: "小指"
    },
    promptAudio: {
      count: "有几根手指举起来？",
      play: "你能做出这个数字吗？",
      boxing: "在零之前点正确的数字。"
    },
    voiceLang: "zh-CN"
  },
  ko: {
    htmlLang: "ko",
    title: "손가락 숫자",
    brand: "손가락과 숫자",
    langLabel: "언어",
    modesLabel: "모드",
    actionMake: "만들기",
    actionCount: "세기",
    actionBoxing: "치기",
    modes: { play: "놀이", learn: "배우기", count: "세기", boxing: "복싱" },
    numberWords: ["영", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구", "십"],
    roundTitle: {
      play: (target) => `${numberLabel(target)}을 만들 수 있을까?`,
      learn: (target) => `${numberLabel(target)}을 배워 보자`,
      count: () => "손가락이 몇 개 올라갔을까?",
      boxing: () => "맞는 손가락을 쳐!"
    },
    hints: {
      initial: "손가락을 눌러서 올려 보자.",
      low: ["손가락을 하나 더 올려 봐.", "하나 더 올리면 돼.", "거의 다 왔어. 하나 더."],
      high: ["손가락을 하나 내려 봐.", "조금 많아.", "하나 내리고 다시 봐."],
      zero: ["영은 올라간 손가락이 없는 거야.", "영은 손가락을 모두 내려."],
      solvedZero: "맞아. 올라간 손가락이 없어.",
      made: (target) => `${numberLabel(target)}을 만들었어!`,
      learn: "빛나는 손가락을 보고 눌러 봐.",
      countStart: "올라간 손가락을 세고 맞는 숫자를 눌러.",
      countSolved: (target) => `맞아, ${numberLabel(target)}이야!`,
      countLow: "조금 더 많아. 다시 해 봐.",
      countHigh: "조금 더 적어. 다시 해 봐.",
      bravo: "잘했어!",
      loadingSound: (word) => `소리 불러오는 중: ${word}`,
      soundPlaying: (word) => `재생 중: ${word}`,
      heard: (word) => `들었어: ${word}`,
      soundBlocked: (name) => `소리가 막혔어: ${name}`,
      audioError: (code) => `오디오 오류 ${code}. 다른 목소리를 써 볼게.`,
      noSound: "이 브라우저에서는 소리를 쓸 수 없어.",
      cannotSpeak: "여기서는 말할 수 없어.",
      cannotPlay: "여기서는 소리를 재생할 수 없어. localhost 버전을 써 봐.",
      boxingStart: "영이 되기 전에 맞는 숫자를 눌러.",
      boxingPunch: (damage) => `좋았어! 상대가 ${damage}만큼 줄었어.`,
      boxingHit: (damage) => `아야! 네가 ${damage}만큼 줄었어.`,
      boxingWin: "이겼어!",
      boxingLose: "졌어!"
    },
    counterLabel: "만든 숫자",
    listen: (target) => `${target} 듣기`,
    listenLabel: (target) => `숫자 ${target} 듣기`,
    show: "보여줘",
    next: "다음",
    soundOn: "소리 끄기",
    soundOff: "소리 켜기",
    handsLabel: "누를 수 있는 두 손",
    topBarLabel: "게임 조작",
    actionBarLabel: "이번 차례 동작",
    numberCardLabel: "만들 숫자",
    answerPadLabel: "손가락 개수 고르기",
    rewardsLabel: "받은 별",
    boxingLabel: "복싱 게임",
    playerLabel: "나",
    opponentLabel: "상대",
    left: "왼손",
    right: "오른손",
    fingers: {
      thumb: "엄지",
      pointer: "검지",
      middle: "중지",
      ring: "약지",
      pinky: "새끼"
    },
    promptAudio: {
      count: "손가락이 몇 개 올라갔을까?",
      play: "숫자를 만들어 볼까?",
      boxing: "영이 되기 전에 맞는 숫자를 눌러."
    },
    voiceLang: "ko-KR"
  },
  ja: {
    htmlLang: "ja",
    title: "指で数字",
    brand: "指と数字",
    langLabel: "言語",
    modesLabel: "モード",
    actionMake: "作って",
    actionCount: "数えて",
    actionBoxing: "パンチ",
    modes: { play: "あそぶ", learn: "まなぶ", count: "かぞえる", boxing: "ボクシング" },
    numberWords: ["ゼロ", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"],
    roundTitle: {
      play: (target) => `${numberLabel(target)}を作れるかな？`,
      learn: (target) => `${numberLabel(target)}を覚えよう`,
      count: () => "何本の指が上がっているかな？",
      boxing: () => "正しい指をパンチ！"
    },
    hints: {
      initial: "指をタップして上げてみよう。",
      low: ["指をもう一本上げてみよう。", "もう一本でいいよ。", "もう少し。一本足してみよう。"],
      high: ["指を一本下げてみよう。", "少し多いよ。", "一本下げて、もう一度見てみよう。"],
      zero: ["ゼロは指が一本も上がっていないことだよ。", "ゼロは全部の指を下げるよ。"],
      solvedZero: "そう。指は一本も上がっていないね。",
      made: (target) => `${numberLabel(target)}ができた！`,
      learn: "光っている指を見て、タップしてみよう。",
      countStart: "上がっている指を数えて、正しい数字をタップしてね。",
      countSolved: (target) => `そう、${numberLabel(target)}だよ！`,
      countLow: "もう少し多いよ。もう一度。",
      countHigh: "もう少し少ないよ。もう一度。",
      bravo: "すごい！",
      loadingSound: (word) => `音を読み込み中: ${word}`,
      soundPlaying: (word) => `再生中: ${word}`,
      heard: (word) => `聞こえたね: ${word}`,
      soundBlocked: (name) => `音が止められたよ: ${name}`,
      audioError: (code) => `音のエラー ${code}。別の声で試すね。`,
      noSound: "このブラウザでは音が使えません。",
      cannotSpeak: "ここでは話せません。",
      cannotPlay: "ここでは音を再生できません。localhost版を試してね。",
      boxingStart: "ゼロになる前に正しい数字をタップしてね。",
      boxingPunch: (damage) => `やった！相手が ${damage} 減ったよ。`,
      boxingHit: (damage) => `いたい！きみが ${damage} 減ったよ。`,
      boxingWin: "勝ったよ！",
      boxingLose: "負けちゃった！"
    },
    counterLabel: "できた数",
    listen: (target) => `${target}を聞く`,
    listenLabel: (target) => `数字 ${target} を聞く`,
    show: "見せて",
    next: "次へ",
    soundOn: "音を消す",
    soundOff: "音を出す",
    handsLabel: "タップできる二つの手",
    topBarLabel: "ゲームの操作",
    actionBarLabel: "この番の操作",
    numberCardLabel: "作る数字",
    answerPadLabel: "指の数を選ぶ",
    rewardsLabel: "もらった星",
    boxingLabel: "ボクシングゲーム",
    playerLabel: "きみ",
    opponentLabel: "相手",
    left: "左",
    right: "右",
    fingers: {
      thumb: "親指",
      pointer: "人差し指",
      middle: "中指",
      ring: "薬指",
      pinky: "小指"
    },
    promptAudio: {
      count: "何本の指が上がっているかな？",
      play: "数字を作れるかな？",
      boxing: "ゼロになる前に正しい数字をタップしてね。"
    },
    voiceLang: "ja-JP"
  },
  vi: {
    htmlLang: "vi",
    title: "Số với ngón tay",
    brand: "Ngón tay và con số",
    langLabel: "Ngôn ngữ",
    modesLabel: "Chế độ",
    actionMake: "Làm",
    actionCount: "Đếm",
    actionBoxing: "Đấm",
    modes: { play: "Chơi", learn: "Học", count: "Đếm", boxing: "Đấm bốc" },
    numberWords: ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín", "mười"],
    roundTitle: {
      play: (target) => `Con làm được ${numberLabel(target)} không?`,
      learn: (target) => `Mình học ${numberLabel(target)} nhé`,
      count: () => "Có mấy ngón tay đang giơ lên?",
      boxing: () => "Đấm đúng ngón tay!"
    },
    hints: {
      initial: "Chạm vào ngón tay để giơ lên.",
      low: ["Thêm một ngón tay nữa nhé.", "Thử giơ thêm một ngón tay.", "Gần đúng rồi. Thêm một ngón nữa."],
      high: ["Thử hạ một ngón tay xuống.", "Hơi nhiều rồi.", "Hạ một ngón rồi nhìn lại nhé."],
      zero: ["Không là không có ngón tay nào giơ lên.", "Với số không, hạ hết các ngón tay xuống."],
      solvedZero: "Đúng rồi. Không có ngón tay nào giơ lên.",
      made: (target) => `Con đã làm số ${numberLabel(target)}!`,
      learn: "Nhìn các ngón tay sáng lên, rồi chạm vào chúng.",
      countStart: "Đếm các ngón tay đang giơ lên, rồi chạm vào số đúng.",
      countSolved: (target) => `Đúng rồi, là ${numberLabel(target)}!`,
      countLow: "Còn nhiều hơn một chút. Thử lại nhé.",
      countHigh: "Ít hơn một chút mới đúng. Thử lại nhé.",
      bravo: "Giỏi lắm!",
      loadingSound: (word) => `Đang tải âm thanh: ${word}`,
      soundPlaying: (word) => `Đang phát: ${word}`,
      heard: (word) => `Con đã nghe: ${word}`,
      soundBlocked: (name) => `Âm thanh bị chặn: ${name}`,
      audioError: (code) => `Lỗi âm thanh ${code}. Mình thử giọng khác nhé.`,
      noSound: "Trình duyệt này không có âm thanh.",
      cannotSpeak: "Ở đây mình chưa nói được.",
      cannotPlay: "Ở đây chưa phát được âm thanh. Thử bản localhost nhé.",
      boxingStart: "Chạm vào số đúng trước khi về không.",
      boxingPunch: (damage) => `Hay lắm! Đối thủ mất ${damage}.`,
      boxingHit: (damage) => `Ui da! Con mất ${damage}.`,
      boxingWin: "Con thắng rồi!",
      boxingLose: "Con thua rồi!"
    },
    counterLabel: "Con đã làm",
    listen: (target) => `Nghe ${target}`,
    listenLabel: (target) => `Nghe số ${target}`,
    show: "Cho con xem",
    next: "Tiếp",
    soundOn: "Tắt âm thanh",
    soundOff: "Bật âm thanh",
    handsLabel: "Hai bàn tay có ngón để chạm",
    topBarLabel: "Điều khiển trò chơi",
    actionBarLabel: "Hành động của lượt này",
    numberCardLabel: "Số cần làm",
    answerPadLabel: "Chọn số ngón tay",
    rewardsLabel: "Sao đã nhận",
    boxingLabel: "Trò chơi đấm bốc",
    playerLabel: "Con",
    opponentLabel: "Đối thủ",
    left: "Trái",
    right: "Phải",
    fingers: {
      thumb: "Ngón cái",
      pointer: "Ngón trỏ",
      middle: "Ngón giữa",
      ring: "Ngón áp út",
      pinky: "Ngón út"
    },
    promptAudio: {
      count: "Có mấy ngón tay đang giơ lên?",
      play: "Con làm được con số này không?",
      boxing: "Chạm vào số đúng trước khi về không."
    },
    voiceLang: "vi-VN"
  }
};

function copy() {
  return translations[state.lang] || translations.fr;
}

function numberLabel(value) {
  return state.lang === "yue" || state.lang === "zh" || state.lang === "ko" || state.lang === "ja" || state.lang === "vi"
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
  boxingStage: document.querySelector("#boxingStage"),
  boxingTimer: document.querySelector("#boxingTimer"),
  playerEnergyFill: document.querySelector("#playerEnergyFill"),
  opponentEnergyFill: document.querySelector("#opponentEnergyFill"),
  playerEnergyText: document.querySelector("#playerEnergyText"),
  opponentEnergyText: document.querySelector("#opponentEnergyText"),
  playerLabel: document.querySelector("#playerLabel"),
  opponentLabel: document.querySelector("#opponentLabel"),
  playerFighter: document.querySelector(".player-fighter"),
  opponentFighter: document.querySelector(".opponent-fighter"),
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
  els.boxingStage.setAttribute("aria-label", text.boxingLabel);
  els.handsStage.setAttribute("aria-label", text.handsLabel);
  els.rewardTray.setAttribute("aria-label", text.rewardsLabel);
  els.counterLabel.textContent = text.counterLabel;
  els.showButton.textContent = text.show;
  els.nextButton.textContent = text.next;
  els.playerLabel.textContent = text.playerLabel;
  els.opponentLabel.textContent = text.opponentLabel;
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
  stopBoxingTimer();
  state.target = target;
  state.raised.clear();
  state.selectedAnswer = null;
  state.roundSolved = false;
  els.app.classList.toggle("guided", state.mode === "learn");
  els.app.classList.toggle("count-mode", state.mode === "count");
  els.app.classList.toggle("boxing-mode", state.mode === "boxing");
  if (state.mode === "count" || state.mode === "boxing") {
    state.raised = new Set(fingerOrder.slice(0, state.target));
  }
  updateFingerDisplay();
  updateCopyPattern();
  updateAnswerPad();
  updateBoxingDisplay();
  updateStatus();
  if (state.mode === "boxing" && !state.boxing.gameOver) {
    startBoxingTimer();
  }
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
  const isBoxing = state.mode === "boxing";
  els.actionVerb.textContent = isBoxing ? text.actionBoxing : (isCounting ? text.actionCount : text.actionMake);
  els.targetNumber.textContent = isCounting || isBoxing ? "?" : numberLabel(state.target);
  els.bigNumber.textContent = isCounting || isBoxing ? "?" : numberLabel(state.target);
  els.currentCount.textContent = count;
  els.speakButton.textContent = text.listen(numberLabel(state.target));
  els.speakButton.setAttribute("aria-label", text.listenLabel(numberLabel(state.target)));
  if (isBoxing) {
    els.roundTitle.textContent = text.roundTitle.boxing();
    if (state.boxing.gameOver) {
      els.hintText.textContent = state.boxing.opponentEnergy <= 0 ? text.hints.boxingWin : text.hints.boxingLose;
    } else {
      els.hintText.textContent = text.hints.boxingStart;
    }
    return;
  }
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
    finger.classList.toggle("folded", (state.mode === "count" || state.mode === "boxing") && !isRaised);
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
  const isBoxing = state.mode === "boxing";
  els.answerPad.hidden = !(isCounting || isBoxing);
  els.answerButtons.forEach((button) => {
    const answer = Number(button.dataset.answer);
    const isSelected = state.selectedAnswer === answer;
    button.textContent = numberLabel(answer);
    button.classList.toggle("selected", isSelected);
    button.classList.toggle("correct", state.roundSolved && answer === state.target);
    button.setAttribute("aria-pressed", String(isSelected));
  });
  els.showButton.hidden = isCounting;
  els.speakButton.hidden = isCounting || isBoxing;
  els.nextButton.hidden = isCounting || isBoxing;
  els.showButton.hidden = isCounting || isBoxing;
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
  if (state.mode === "boxing") {
    chooseBoxingAnswer(answer);
    return;
  }
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

function resetBoxingGame() {
  stopBoxingTimer();
  state.boxing.playerEnergy = 20;
  state.boxing.opponentEnergy = 20;
  state.boxing.timeLeft = 5;
  state.boxing.resolving = false;
  state.boxing.gameOver = false;
}

function startBoxingTimer() {
  stopBoxingTimer();
  state.boxing.timeLeft = 5;
  state.boxing.resolving = false;
  updateBoxingDisplay();
  state.boxing.timerId = window.setInterval(() => {
    state.boxing.timeLeft -= 1;
    updateBoxingDisplay();
    if (state.boxing.timeLeft <= -5) {
      resolveBoxingRound(false);
    }
  }, 1000);
}

function stopBoxingTimer() {
  if (state.boxing.timerId) {
    window.clearInterval(state.boxing.timerId);
    state.boxing.timerId = null;
  }
}

function chooseBoxingAnswer(answer) {
  if (state.boxing.resolving || state.boxing.gameOver) {
    return;
  }
  state.selectedAnswer = answer;
  updateAnswerPad();
  if (answer !== state.target) {
    playTone("tap");
    return;
  }
  resolveBoxingRound(true);
}

function resolveBoxingRound(wasAnswered) {
  if (state.boxing.resolving || state.boxing.gameOver) {
    return;
  }
  state.boxing.resolving = true;
  stopBoxingTimer();
  const text = copy();
  const time = state.boxing.timeLeft;
  if (wasAnswered && time >= 0) {
    const damage = time;
    state.boxing.opponentEnergy = Math.max(0, state.boxing.opponentEnergy - damage);
    els.hintText.textContent = text.hints.boxingPunch(damage);
    animatePunch("player");
    playPunchSound("player");
    launchSprinkles();
  } else {
    const damage = Math.max(1, Math.abs(Math.min(time, -1)));
    state.boxing.playerEnergy = Math.max(0, state.boxing.playerEnergy - damage);
    els.hintText.textContent = text.hints.boxingHit(damage);
    animatePunch("opponent");
    playPunchSound("opponent");
    flashHit();
  }
  updateBoxingDisplay();

  if (state.boxing.opponentEnergy <= 0 || state.boxing.playerEnergy <= 0) {
    state.boxing.gameOver = true;
    window.setTimeout(() => {
      const result = state.boxing.opponentEnergy <= 0 ? "win" : "lose";
      const phrase = result === "win" ? text.hints.boxingWin : text.hints.boxingLose;
      updateStatus();
      playResultWithWebAudio(result, phrase).catch((error) => {
        console.warn("Web Audio result playback failed", error.name, error.message);
        playResultAudio(result, phrase);
      });
      window.setTimeout(() => {
        if (state.mode === "boxing") {
          resetBoxingGame();
          nextTarget();
        }
      }, 1400);
    }, 500);
    return;
  }

  window.setTimeout(() => {
    if (state.mode === "boxing") {
      nextTarget();
    }
  }, 900);
}

function updateBoxingDisplay() {
  if (!els.boxingStage) {
    return;
  }
  const isBoxing = state.mode === "boxing";
  els.boxingStage.hidden = !isBoxing;
  if (!isBoxing) {
    return;
  }
  const playerScale = state.boxing.playerEnergy / 20;
  const opponentScale = state.boxing.opponentEnergy / 20;
  els.playerEnergyText.textContent = state.boxing.playerEnergy;
  els.opponentEnergyText.textContent = state.boxing.opponentEnergy;
  els.playerEnergyFill.style.transform = `scaleX(${playerScale})`;
  els.opponentEnergyFill.style.transform = `scaleX(${opponentScale})`;
  els.boxingTimer.textContent = state.boxing.timeLeft;
  els.boxingTimer.classList.toggle("danger", state.boxing.timeLeft < 0);
}

function animatePunch(who) {
  const attacker = who === "player" ? els.playerFighter : els.opponentFighter;
  const target = who === "player" ? els.opponentFighter : els.playerFighter;
  attacker.classList.remove("punching");
  target.classList.remove("hit");
  window.requestAnimationFrame(() => {
    attacker.classList.add("punching");
    target.classList.add("hit");
  });
  window.setTimeout(() => {
    attacker.classList.remove("punching");
    target.classList.remove("hit");
  }, 420);
}

function flashHit() {
  els.app.classList.remove("hit-flash");
  window.requestAnimationFrame(() => els.app.classList.add("hit-flash"));
  window.setTimeout(() => els.app.classList.remove("hit-flash"), 460);
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
  if (previousMode === "boxing" && mode !== "boxing") {
    stopBoxingTimer();
  }
  state.mode = mode;
  if (mode === "boxing" && previousMode !== "boxing") {
    resetBoxingGame();
  }
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

async function playPunchSound(kind) {
  const audioContext = await unlockAudio();
  if (!audioContext) {
    return;
  }
  const now = audioContext.currentTime;
  const isPlayer = kind === "player";
  const thump = audioContext.createOscillator();
  const body = audioContext.createOscillator();
  const snap = audioContext.createOscillator();
  const noise = audioContext.createBufferSource();
  const thumpGain = audioContext.createGain();
  const bodyGain = audioContext.createGain();
  const snapGain = audioContext.createGain();
  const noiseGain = audioContext.createGain();
  const noiseFilter = audioContext.createBiquadFilter();
  const master = audioContext.createGain();
  const noiseBuffer = audioContext.createBuffer(1, Math.floor(audioContext.sampleRate * 0.09), audioContext.sampleRate);
  const samples = noiseBuffer.getChannelData(0);
  for (let index = 0; index < samples.length; index += 1) {
    const fade = 1 - index / samples.length;
    samples[index] = (Math.random() * 2 - 1) * fade;
  }

  master.gain.setValueAtTime(0.9, now);
  master.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

  thump.type = "sine";
  body.type = "triangle";
  snap.type = "square";
  thump.frequency.setValueAtTime(isPlayer ? 155 : 105, now);
  thump.frequency.exponentialRampToValueAtTime(isPlayer ? 42 : 34, now + 0.18);
  body.frequency.setValueAtTime(isPlayer ? 92 : 72, now + 0.012);
  body.frequency.exponentialRampToValueAtTime(38, now + 0.2);
  snap.frequency.setValueAtTime(isPlayer ? 980 : 720, now);
  snap.frequency.exponentialRampToValueAtTime(isPlayer ? 320 : 240, now + 0.055);
  noise.buffer = noiseBuffer;
  noiseFilter.type = "bandpass";
  noiseFilter.frequency.setValueAtTime(isPlayer ? 1850 : 1350, now);
  noiseFilter.Q.value = 1.6;

  thumpGain.gain.setValueAtTime(0.0001, now);
  thumpGain.gain.exponentialRampToValueAtTime(isPlayer ? 0.72 : 0.58, now + 0.01);
  thumpGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.24);
  bodyGain.gain.setValueAtTime(0.0001, now + 0.012);
  bodyGain.gain.exponentialRampToValueAtTime(isPlayer ? 0.36 : 0.28, now + 0.025);
  bodyGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.19);
  snapGain.gain.setValueAtTime(0.0001, now);
  snapGain.gain.exponentialRampToValueAtTime(isPlayer ? 0.38 : 0.28, now + 0.004);
  snapGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
  noiseGain.gain.setValueAtTime(0.0001, now);
  noiseGain.gain.exponentialRampToValueAtTime(isPlayer ? 0.32 : 0.22, now + 0.003);
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

  thump.connect(thumpGain).connect(master).connect(audioContext.destination);
  body.connect(bodyGain).connect(master);
  snap.connect(snapGain).connect(master);
  noise.connect(noiseFilter).connect(noiseGain).connect(master);
  thump.start(now);
  body.start(now + 0.012);
  snap.start(now);
  noise.start(now);
  thump.stop(now + 0.25);
  body.stop(now + 0.21);
  snap.stop(now + 0.07);
  noise.stop(now + 0.09);
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

function getResultAudioSource(result) {
  return window.APP_AUDIO?.[state.lang]?.results?.[result];
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

function getResultAudioPath(result) {
  return state.lang === "fr"
    ? `audio/${result}.wav`
    : `audio/${state.lang}-${result}.wav`;
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

async function playResultWithWebAudio(result, phrase) {
  const audioContext = await unlockAudio();
  const embeddedSource = getResultAudioSource(result);
  if (!audioContext || !embeddedSource) {
    throw new Error("Result audio source unavailable");
  }

  const bufferKey = `${state.lang}-${result}`;
  if (!state.resultBuffers[bufferKey]) {
    const base64 = embeddedSource.split(",")[1];
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) {
      bytes[index] = binary.charCodeAt(index);
    }
    state.resultBuffers[bufferKey] = await audioContext.decodeAudioData(bytes.buffer);
  }

  const source = audioContext.createBufferSource();
  const gain = audioContext.createGain();
  source.buffer = state.resultBuffers[bufferKey];
  gain.gain.value = 2.2;
  source.connect(gain).connect(audioContext.destination);
  source.onended = () => {
    console.info("Web Audio result finished", result, phrase);
  };
  console.info("Web Audio result playing", result, phrase, audioContext.state);
  source.start();
}

function playResultAudio(result, phrase) {
  const embeddedSource = getResultAudioSource(result);
  const source = embeddedSource || new URL(getResultAudioPath(result), window.location.href).href;
  if (!state.resultAudio) {
    state.resultAudio = new Audio();
    state.resultAudio.preload = "auto";
    state.resultAudio.addEventListener("playing", () => {
      console.info("Result audio playing", state.resultAudio.currentSrc);
    });
    state.resultAudio.addEventListener("ended", () => {
      console.info("Result audio finished", result);
    });
    state.resultAudio.addEventListener("error", () => {
      const errorCode = state.resultAudio.error ? state.resultAudio.error.code : "unknown";
      console.warn("Result audio failed", errorCode, state.resultAudio.currentSrc);
      speakPhrase(phrase);
    });
  }
  state.resultAudio.pause();
  state.resultAudio.src = source;
  state.resultAudio.load();
  state.resultAudio.currentTime = 0;
  state.resultAudio.volume = 1;
  const playPromise = state.resultAudio.play();
  if (playPromise) {
    playPromise.catch((error) => {
      console.warn("Result audio play rejected", error.name, error.message);
      speakPhrase(phrase);
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
