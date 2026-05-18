const placeNames = ["ones", "tens", "hundreds", "thousands", "ten thousands", "hundred thousands"];
const shortPlaceNames = ["1s", "10s", "100s", "1,000s", "10,000s", "100,000s"];
const rewards = ["Map", "Hat", "Key", "Boat", "Crown"];
const fruitTreasure = ["🍒", "🍎", "🍉", "🍓"];
const treasureGoal = 5;

const translations = {
  en: {
    htmlLang: "en",
    voiceLang: "en-US",
    title: "Treasure Rescue Subtraction",
    eyebrow: "Subtraction Adventure",
    brand: "Treasure Rescue",
    languageLabel: "Language",
    scoreLabel: "Score",
    gems: "Gems",
    rescued: "Rescued",
    mapLabel: "Treasure map progress",
    controlsLabel: "Practice choices",
    numberSize: "Number size",
    digits: (count) => `${count} digits`,
    mix: "Mix",
    includeTrading: "Include trading",
    subtractionProblem: "Subtraction problem",
    verticalSubtraction: "Vertical subtraction",
    gate: (count) => `Gate ${count}`,
    problemTitle: "Unlock the treasure gate",
    newProblem: "New",
    hint: "Hint",
    clear: "Clear",
    openGate: "Open Gate",
    typeAnswer: "Type the answer under the line.",
    helper: "Helper",
    helperStart: "Start with the ones",
    helperTrade: "Trade if a place is too small",
    helperTry: "You can do this",
    helperSparkly: "Sparkly subtraction!",
    helperTradeTitle: "Trade when you need to",
    helperLabel: "Subtraction helper",
    placeLab: "Place value trading",
    rewardsLabel: "Unlocked rewards",
    borrowInto: (place) => `Borrow into the ${place} column`,
    answerDigit: (place) => `${place} answer digit`,
    topNumber: "top number",
    takeAway: "take away",
    answer: "Answer",
    borrowMessage: "Nice trade. That little 1 means this place got ten more.",
    wrongFirst: "Good try. Start on the right side and check each place.",
    wrongAgain: "Almost. Check the glowing box, then try again.",
    gateOpen: "Gate open! Treasure rescued!",
    freshBoxes: "Fresh boxes. Try from the ones place.",
    partyLine: "Awesome job, you got to the treasure...",
    partyQuestion: "What's inside?",
    introSpeech: "Let's practice subtraction. Start with the ones. Type each answer digit under the line. If you need to trade, tap the top number.",
    treasureSpeech: "Awesome job, you got to the treasure. What's inside?",
    places: ["ones", "tens", "hundreds", "thousands", "ten thousands", "hundred thousands"],
    shortPlaces: ["1s", "10s", "100s", "1,000s", "10,000s", "100,000s"],
    rewards: ["Map", "Hat", "Key", "Boat", "Crown"],
    minus: (top, bottom) => `${top} minus ${bottom}`,
    tradeStep: (from, to, total) => `Trade 1 ${from} for 10 ${to}. Now ${to} has ${total}.`,
    subtractStep: (available, place, takeAway, result) => `${available} ${place} take away ${takeAway} ${place} makes ${result}.`
  },
  fr: {
    htmlLang: "fr",
    voiceLang: "fr-FR",
    title: "Sauvetage du trésor",
    eyebrow: "Aventure de soustraction",
    brand: "Sauvetage du trésor",
    languageLabel: "Langue",
    scoreLabel: "Score",
    gems: "Gemmes",
    rescued: "Sauvés",
    mapLabel: "Progression vers le trésor",
    controlsLabel: "Choix d'entraînement",
    numberSize: "Taille du nombre",
    digits: (count) => `${count} chiffres`,
    mix: "Mélange",
    includeTrading: "Avec échange",
    subtractionProblem: "Soustraction",
    verticalSubtraction: "Soustraction posée",
    gate: (count) => `Porte ${count}`,
    problemTitle: "Ouvre la porte du trésor",
    newProblem: "Nouveau",
    hint: "Indice",
    clear: "Effacer",
    openGate: "Ouvrir",
    typeAnswer: "Écris la réponse sous la ligne.",
    helper: "Aide",
    helperStart: "Commence par les unités",
    helperTrade: "Échange si une colonne est trop petite",
    helperTry: "Tu peux y arriver",
    helperSparkly: "Soustraction brillante !",
    helperTradeTitle: "Échange quand il faut",
    helperLabel: "Aide pour la soustraction",
    placeLab: "Échange des colonnes",
    rewardsLabel: "Récompenses débloquées",
    borrowInto: (place) => `Échanger dans la colonne ${place}`,
    answerDigit: (place) => `Chiffre de réponse des ${place}`,
    topNumber: "nombre du haut",
    takeAway: "à enlever",
    answer: "Réponse",
    borrowMessage: "Bel échange. Le petit 1 veut dire que cette colonne a dix de plus.",
    wrongFirst: "Bien essayé. Commence à droite et vérifie chaque colonne.",
    wrongAgain: "Presque. Regarde la case qui brille, puis réessaie.",
    gateOpen: "Porte ouverte ! Trésor sauvé !",
    freshBoxes: "Cases toutes neuves. Essaie depuis les unités.",
    partyLine: "Bravo, tu es arrivé au trésor...",
    partyQuestion: "Qu'est-ce qu'il y a dedans ?",
    introSpeech: "On s'entraîne à soustraire. Commence par les unités. Écris chaque chiffre de la réponse sous la ligne. Si tu dois échanger, touche le nombre du haut.",
    treasureSpeech: "Bravo, tu es arrivé au trésor. Qu'est-ce qu'il y a dedans ?",
    places: ["unités", "dizaines", "centaines", "milliers", "dizaines de milliers", "centaines de milliers"],
    shortPlaces: ["1", "10", "100", "1 000", "10 000", "100 000"],
    rewards: ["Carte", "Chapeau", "Clé", "Bateau", "Couronne"],
    minus: (top, bottom) => `${top} moins ${bottom}`,
    tradeStep: (from, to, total) => `Échange 1 ${from} contre 10 ${to}. Maintenant, les ${to} ont ${total}.`,
    subtractStep: (available, place, takeAway, result) => `${available} ${place} moins ${takeAway} ${place}, ça fait ${result}.`
  },
  yue: {
    htmlLang: "zh-HK",
    voiceLang: "zh-HK",
    title: "寶藏減數大冒險",
    eyebrow: "減數大冒險",
    brand: "救寶藏",
    languageLabel: "語言",
    scoreLabel: "分數",
    gems: "寶石",
    rescued: "救到",
    mapLabel: "寶藏地圖進度",
    controlsLabel: "練習選擇",
    numberSize: "位數",
    digits: (count) => `${count} 位數`,
    mix: "混合",
    includeTrading: "包括借位",
    subtractionProblem: "減數題",
    verticalSubtraction: "直式減數",
    gate: (count) => `第 ${count} 道門`,
    problemTitle: "打開寶藏門",
    newProblem: "新題",
    hint: "提示",
    clear: "清除",
    openGate: "開門",
    typeAnswer: "喺線下面輸入答案。",
    helper: "幫手",
    helperStart: "由個位開始",
    helperTrade: "唔夠減就借位",
    helperTry: "你做到㗎",
    helperSparkly: "閃閃減數！",
    helperTradeTitle: "需要時借位",
    helperLabel: "減數幫手",
    placeLab: "位值借位",
    rewardsLabel: "解鎖獎品",
    borrowInto: (place) => `借去${place}`,
    answerDigit: (place) => `${place}答案`,
    topNumber: "上面個數",
    takeAway: "減去",
    answer: "答案",
    borrowMessage: "借得好。細細個 1 代表呢一位多咗十個。",
    wrongFirst: "好嘗試。由右邊開始，再睇每一位。",
    wrongAgain: "差少少。睇吓發光嗰格，再試。",
    gateOpen: "門開咗！救到寶藏！",
    freshBoxes: "格仔清空咗。由個位再試。",
    partyLine: "好叻呀，你去到寶藏喇...",
    partyQuestion: "入面有咩呢？",
    introSpeech: "一齊練習減數。由個位開始。喺線下面輸入每一個答案數字。如果要借位，就撳上面個數。",
    treasureSpeech: "好叻呀，你去到寶藏喇。入面有咩呢？",
    places: ["個位", "十位", "百位", "千位", "萬位", "十萬位"],
    shortPlaces: ["個", "十", "百", "千", "萬", "十萬"],
    rewards: ["地圖", "帽", "鎖匙", "船", "皇冠"],
    minus: (top, bottom) => `${top} 減 ${bottom}`,
    tradeStep: (from, to, total) => `由${from}借 1，變成 10 個${to}。而家${to}有 ${total}。`,
    subtractStep: (available, place, takeAway, result) => `${available} 個${place}減 ${takeAway} 個${place}等於 ${result}。`
  },
  zh: {
    htmlLang: "zh-CN",
    voiceLang: "zh-CN",
    title: "宝藏减法大冒险",
    eyebrow: "减法大冒险",
    brand: "拯救宝藏",
    languageLabel: "语言",
    scoreLabel: "分数",
    gems: "宝石",
    rescued: "救到",
    mapLabel: "宝藏地图进度",
    controlsLabel: "练习选择",
    numberSize: "位数",
    digits: (count) => `${count} 位数`,
    mix: "混合",
    includeTrading: "包含借位",
    subtractionProblem: "减法题",
    verticalSubtraction: "竖式减法",
    gate: (count) => `第 ${count} 道门`,
    problemTitle: "打开宝藏门",
    newProblem: "新题",
    hint: "提示",
    clear: "清除",
    openGate: "开门",
    typeAnswer: "把答案写在线下面。",
    helper: "帮手",
    helperStart: "从个位开始",
    helperTrade: "不够减就借位",
    helperTry: "你可以做到",
    helperSparkly: "闪闪减法！",
    helperTradeTitle: "需要时借位",
    helperLabel: "减法帮手",
    placeLab: "位值借位",
    rewardsLabel: "解锁奖励",
    borrowInto: (place) => `借到${place}`,
    answerDigit: (place) => `${place}答案`,
    topNumber: "上面的数",
    takeAway: "减去",
    answer: "答案",
    borrowMessage: "借位很好。小小的 1 表示这一位多了十个。",
    wrongFirst: "试得很好。从右边开始，检查每一位。",
    wrongAgain: "快对了。看看发光的格子，再试一次。",
    gateOpen: "门打开了！救到宝藏！",
    freshBoxes: "格子清空了。从个位再试。",
    partyLine: "太棒了，你到达宝藏了...",
    partyQuestion: "里面有什么？",
    introSpeech: "我们来练习减法。从个位开始。把每个答案数字写在线下面。如果需要借位，就点上面的数。",
    treasureSpeech: "太棒了，你到达宝藏了。里面有什么？",
    places: ["个位", "十位", "百位", "千位", "万位", "十万位"],
    shortPlaces: ["个", "十", "百", "千", "万", "十万"],
    rewards: ["地图", "帽子", "钥匙", "船", "皇冠"],
    minus: (top, bottom) => `${top} 减 ${bottom}`,
    tradeStep: (from, to, total) => `从${from}借 1，变成 10 个${to}。现在${to}有 ${total}。`,
    subtractStep: (available, place, takeAway, result) => `${available} 个${place}减 ${takeAway} 个${place}等于 ${result}。`
  },
  ko: {
    htmlLang: "ko",
    voiceLang: "ko-KR",
    title: "보물 빼기 모험",
    eyebrow: "빼기 모험",
    brand: "보물 구출",
    languageLabel: "언어",
    scoreLabel: "점수",
    gems: "보석",
    rescued: "구출",
    mapLabel: "보물 지도 진행",
    controlsLabel: "연습 선택",
    numberSize: "자릿수",
    digits: (count) => `${count}자리`,
    mix: "섞기",
    includeTrading: "받아내림 포함",
    subtractionProblem: "빼기 문제",
    verticalSubtraction: "세로 빼기",
    gate: (count) => `문 ${count}`,
    problemTitle: "보물 문을 열자",
    newProblem: "새 문제",
    hint: "힌트",
    clear: "지우기",
    openGate: "문 열기",
    typeAnswer: "선 아래에 답을 써 봐.",
    helper: "도움",
    helperStart: "일의 자리부터 시작",
    helperTrade: "작으면 받아내림을 해",
    helperTry: "할 수 있어",
    helperSparkly: "반짝 빼기!",
    helperTradeTitle: "필요하면 받아내림",
    helperLabel: "빼기 도움",
    placeLab: "자리값 받아내림",
    rewardsLabel: "받은 보상",
    borrowInto: (place) => `${place}에 받아내림`,
    answerDigit: (place) => `${place} 답 숫자`,
    topNumber: "위 숫자",
    takeAway: "빼기",
    answer: "답",
    borrowMessage: "좋은 받아내림이야. 작은 1은 이 자리에 10이 더 생겼다는 뜻이야.",
    wrongFirst: "잘했어. 오른쪽부터 시작해서 각 자리를 확인해 봐.",
    wrongAgain: "거의 맞았어. 빛나는 칸을 보고 다시 해 봐.",
    gateOpen: "문이 열렸어! 보물을 구했어!",
    freshBoxes: "칸을 비웠어. 일의 자리부터 다시 해 봐.",
    partyLine: "정말 잘했어, 보물에 도착했어...",
    partyQuestion: "안에 뭐가 있을까?",
    introSpeech: "빼기를 연습하자. 일의 자리부터 시작해. 선 아래에 답 숫자를 하나씩 써. 받아내림이 필요하면 위 숫자를 눌러.",
    treasureSpeech: "정말 잘했어, 보물에 도착했어. 안에 뭐가 있을까?",
    places: ["일의 자리", "십의 자리", "백의 자리", "천의 자리", "만의 자리", "십만의 자리"],
    shortPlaces: ["1", "10", "100", "1천", "1만", "10만"],
    rewards: ["지도", "모자", "열쇠", "배", "왕관"],
    minus: (top, bottom) => `${top} 빼기 ${bottom}`,
    tradeStep: (from, to, total) => `${from}에서 1을 받아 ${to} 10개로 바꿔. 이제 ${to}에 ${total}이 있어.`,
    subtractStep: (available, place, takeAway, result) => `${available} ${place}에서 ${takeAway} ${place}를 빼면 ${result}.`
  },
  ja: {
    htmlLang: "ja",
    voiceLang: "ja-JP",
    title: "宝物ひき算アドベンチャー",
    eyebrow: "ひき算アドベンチャー",
    brand: "宝物レスキュー",
    languageLabel: "言語",
    scoreLabel: "スコア",
    gems: "宝石",
    rescued: "救出",
    mapLabel: "宝物マップの進み具合",
    controlsLabel: "れんしゅうの選択",
    numberSize: "けた数",
    digits: (count) => `${count}けた`,
    mix: "ミックス",
    includeTrading: "くり下がりあり",
    subtractionProblem: "ひき算の問題",
    verticalSubtraction: "筆算のひき算",
    gate: (count) => `ゲート ${count}`,
    problemTitle: "宝物のゲートを開けよう",
    newProblem: "新しい",
    hint: "ヒント",
    clear: "消す",
    openGate: "開ける",
    typeAnswer: "線の下に答えを書いてね。",
    helper: "お助け",
    helperStart: "一の位から始めよう",
    helperTrade: "足りない時はくり下がろう",
    helperTry: "できるよ",
    helperSparkly: "きらきらひき算！",
    helperTradeTitle: "必要な時にくり下がり",
    helperLabel: "ひき算ヘルパー",
    placeLab: "位のくり下がり",
    rewardsLabel: "もらったごほうび",
    borrowInto: (place) => `${place}にくり下がる`,
    answerDigit: (place) => `${place}の答え`,
    topNumber: "上の数",
    takeAway: "ひく数",
    answer: "答え",
    borrowMessage: "いいくり下がり。小さい 1 は、この位が 10 ふえたしるしだよ。",
    wrongFirst: "いいね。右から始めて、位を一つずつ見よう。",
    wrongAgain: "もう少し。光っている箱を見て、もう一度。",
    gateOpen: "ゲートが開いた！宝物を助けたよ！",
    freshBoxes: "箱を空にしたよ。一の位からもう一度。",
    partyLine: "すごい、宝物まで来たよ...",
    partyQuestion: "中には何があるかな？",
    introSpeech: "ひき算を練習しよう。一の位から始めてね。線の下に答えの数字を一つずつ書こう。くり下がりが必要なら、上の数をタップしてね。",
    treasureSpeech: "すごい、宝物まで来たよ。中には何があるかな？",
    places: ["一の位", "十の位", "百の位", "千の位", "万の位", "十万の位"],
    shortPlaces: ["1", "10", "100", "千", "万", "十万"],
    rewards: ["地図", "帽子", "鍵", "船", "王冠"],
    minus: (top, bottom) => `${top} ひく ${bottom}`,
    tradeStep: (from, to, total) => `${from}から 1 を借りて、10 ${to}にするよ。今、${to}は ${total} あるよ。`,
    subtractStep: (available, place, takeAway, result) => `${available} ${place}から ${takeAway} ${place}をひくと ${result}。`
  },
  vi: {
    htmlLang: "vi",
    voiceLang: "vi-VN",
    title: "Giải cứu kho báu trừ",
    eyebrow: "Phiêu lưu phép trừ",
    brand: "Giải cứu kho báu",
    languageLabel: "Ngôn ngữ",
    scoreLabel: "Điểm",
    gems: "Đá quý",
    rescued: "Đã cứu",
    mapLabel: "Tiến trình bản đồ kho báu",
    controlsLabel: "Chọn bài tập",
    numberSize: "Số chữ số",
    digits: (count) => `${count} chữ số`,
    mix: "Trộn",
    includeTrading: "Có mượn",
    subtractionProblem: "Bài trừ",
    verticalSubtraction: "Phép trừ đặt dọc",
    gate: (count) => `Cổng ${count}`,
    problemTitle: "Mở cổng kho báu",
    newProblem: "Bài mới",
    hint: "Gợi ý",
    clear: "Xóa",
    openGate: "Mở cổng",
    typeAnswer: "Nhập câu trả lời dưới đường kẻ.",
    helper: "Trợ giúp",
    helperStart: "Bắt đầu từ hàng đơn vị",
    helperTrade: "Mượn khi một hàng quá nhỏ",
    helperTry: "Con làm được",
    helperSparkly: "Phép trừ lấp lánh!",
    helperTradeTitle: "Mượn khi cần",
    helperLabel: "Trợ giúp phép trừ",
    placeLab: "Mượn theo hàng",
    rewardsLabel: "Phần thưởng mở khóa",
    borrowInto: (place) => `Mượn vào ${place}`,
    answerDigit: (place) => `Chữ số đáp án ${place}`,
    topNumber: "số trên",
    takeAway: "trừ đi",
    answer: "Đáp án",
    borrowMessage: "Mượn giỏi lắm. Số 1 nhỏ nghĩa là hàng này có thêm mười.",
    wrongFirst: "Cố gắng tốt. Bắt đầu bên phải và kiểm tra từng hàng.",
    wrongAgain: "Gần đúng rồi. Nhìn ô sáng lên rồi thử lại.",
    gateOpen: "Cổng mở rồi! Cứu được kho báu!",
    freshBoxes: "Ô đã trống. Thử lại từ hàng đơn vị.",
    partyLine: "Tuyệt vời, con đã đến kho báu...",
    partyQuestion: "Bên trong có gì nhỉ?",
    introSpeech: "Mình cùng luyện phép trừ nhé. Bắt đầu từ hàng đơn vị. Nhập từng chữ số của đáp án dưới đường kẻ. Nếu cần mượn, hãy chạm vào số ở trên.",
    treasureSpeech: "Tuyệt vời, con đã đến kho báu. Bên trong có gì nhỉ?",
    places: ["hàng đơn vị", "hàng chục", "hàng trăm", "hàng nghìn", "hàng chục nghìn", "hàng trăm nghìn"],
    shortPlaces: ["1", "10", "100", "1 nghìn", "10 nghìn", "100 nghìn"],
    rewards: ["Bản đồ", "Mũ", "Chìa", "Thuyền", "Vương miện"],
    minus: (top, bottom) => `${top} trừ ${bottom}`,
    tradeStep: (from, to, total) => `Mượn 1 ${from} đổi thành 10 ${to}. Bây giờ ${to} có ${total}.`,
    subtractStep: (available, place, takeAway, result) => `${available} ${place} trừ ${takeAway} ${place} bằng ${result}.`
  }
};

const state = {
  lang: "en",
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
  audioContext: null,
  preferredVoice: null,
  introSpoken: false,
  treasureSpeechStarted: false
};

const els = {
  gameShell: document.querySelector(".game-shell"),
  topBar: document.querySelector(".top-bar"),
  brandEyebrow: document.querySelector(".brand-block .eyebrow"),
  brandTitle: document.querySelector(".brand-block h1"),
  languageSwitch: document.querySelector(".language-switch"),
  languageButtons: [...document.querySelectorAll(".language-button")],
  scoreBoard: document.querySelector(".score-board"),
  scoreLabels: [...document.querySelectorAll(".score-board span")],
  mapBand: document.querySelector(".map-band"),
  controlsPanel: document.querySelector(".controls-panel"),
  levelPicker: document.querySelector(".level-picker"),
  toggleLabel: document.querySelector(".toggle-row span"),
  problemCard: document.querySelector(".problem-card"),
  problemTitle: document.querySelector("#problemTitle"),
  newProblemButton: document.querySelector("#newProblemButton"),
  hintButton: document.querySelector("#hintButton"),
  clearButton: document.querySelector("#clearButton"),
  checkButton: document.querySelector("#checkButton"),
  helperPanel: document.querySelector(".helper-panel"),
  helperEyebrow: document.querySelector(".buddy .eyebrow"),
  rewardCase: document.querySelector(".reward-case"),
  partyLine: document.querySelector(".party-card p"),
  partyQuestion: document.querySelector(".party-card h2"),
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

function copy() {
  return translations[state.lang] || translations.en;
}

function placeName(index) {
  return copy().places[index] || translations.en.places[index];
}

function shortPlaceName(index) {
  return copy().shortPlaces[index] || translations.en.shortPlaces[index];
}

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
  const text = copy();
  const steps = [];
  let borrow = 0;

  for (let index = 0; index < width; index += 1) {
    const place = placeName(index);
    let available = topDigits[index] - borrow;
    const takeAway = bottomDigits[index];
    const borrowed = available < takeAway;
    let displayAvailable = available;

    if (borrowed) {
      displayAvailable += 10;
      borrow = 1;
      steps.push(text.tradeStep(placeName(index + 1) || place, place, displayAvailable));
    } else {
      borrow = 0;
    }

    steps.push(text.subtractStep(displayAvailable, place, takeAway, displayAvailable - takeAway));
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

  const topRow = makeNumberRow("", top, "top number", "top");
  const bottomRow = makeNumberRow("-", bottom, "take away", "bottom");
  bottomRow.classList.add("bottom-row");
  const inputRow = document.createElement("div");
  inputRow.className = "number-row answer-row";
  inputRow.setAttribute("aria-label", copy().answer);

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
    input.ariaLabel = copy().answerDigit(placeName(width - index - 1));
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
  row.setAttribute("aria-label", label === "top number" ? copy().topNumber : copy().takeAway);

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
      cell.ariaLabel = copy().borrowInto(placeName(digits.length - index - 1));
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
  els.feedback.textContent = copy().borrowMessage;
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
      <span>${placeName(reverseIndex)}</span>
      <strong>${digit}</strong>
      <small>${copy().minus(digit, bottom[index])}</small>
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
    ? copy().wrongAgain
    : copy().wrongFirst;
  els.helperTitle.textContent = copy().helperTry;
}

function rescueTreasure() {
  if (state.completing) {
    return;
  }
  state.completing = true;
  state.solved += 1;
  state.gems += Math.max(1, 4 - state.attempts);
  els.feedback.textContent = copy().gateOpen;
  els.helperTitle.textContent = copy().helperSparkly;
  document.querySelectorAll(".digit-input").forEach((input) => {
    input.classList.remove("wrong");
    input.classList.add("correct");
  });
  els.chest.classList.add("open");
  updateScore();
  sparkle();
  playTone("win");
  if (state.solved >= treasureGoal) {
    state.treasureSpeechStarted = false;
    speakTreasure();
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
  els.helperTitle.textContent = state.includeRegrouping ? copy().helperTradeTitle : copy().helperStart;
  renderPlaceLab(placeIndex);
}

function clearAnswer() {
  document.querySelectorAll(".digit-input").forEach((input) => {
    input.value = "";
    input.classList.remove("wrong", "correct");
    input.dataset.celebrated = "";
  });
  document.querySelector(".digit-input")?.focus();
  els.feedback.textContent = copy().freshBoxes;
}

function updateScore() {
  els.gemCount.textContent = String(state.gems);
  els.rescuedCount.textContent = String(state.solved);
  els.roundLabel.textContent = copy().gate(Math.min(state.solved + 1, treasureGoal));
  els.path.style.setProperty("--progress", `${Math.min(100, (state.solved / treasureGoal) * 100)}%`);
  els.rewardBadges.forEach((badge, index) => {
    badge.classList.toggle("unlocked", index <= Math.floor(state.solved / 2));
    badge.textContent = copy().rewards[index];
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
  els.partyLine.textContent = copy().partyLine;
  els.partyQuestion.textContent = copy().partyQuestion;
  speakTreasure();
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

function speakTreasure() {
  if (state.treasureSpeechStarted) {
    return;
  }
  state.treasureSpeechStarted = speak(copy().treasureSpeech, true);
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
  state.treasureSpeechStarted = false;
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

function getSpeechVoice() {
  const text = copy();
  const voices = window.speechSynthesis?.getVoices?.() || [];
  const voicePrefix = text.voiceLang.split("-")[0];
  state.preferredVoice = voices.find((voice) => voice.lang === text.voiceLang)
    || voices.find((voice) => voice.lang?.startsWith(`${voicePrefix}-`))
    || voices.find((voice) => voice.lang?.startsWith(voicePrefix))
    || null;
  return state.preferredVoice;
}

function speak(message, important = false) {
  if (!("speechSynthesis" in window) || !message) {
    return false;
  }
  if (important) {
    window.speechSynthesis.cancel();
  }
  const utterance = new SpeechSynthesisUtterance(message);
  utterance.lang = copy().voiceLang;
  const voice = getSpeechVoice();
  if (voice) {
    utterance.voice = voice;
  }
  utterance.rate = 0.9;
  utterance.pitch = 1.08;
  utterance.onstart = () => {
    if (message === copy().introSpeech) {
      state.introSpoken = true;
    }
  };
  window.speechSynthesis.speak(utterance);
  return true;
}

function speakIntro(force = false) {
  if (state.introSpoken && !force) {
    return;
  }
  speak(copy().introSpeech, true);
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
  applyTranslations();
  renderBoard();
  renderPlaceLab();
  updateScore();
  els.feedback.textContent = copy().typeAnswer;
  els.helperTitle.textContent = state.includeRegrouping ? copy().helperTrade : copy().helperStart;
}

function applyTranslations() {
  const text = copy();
  document.documentElement.lang = text.htmlLang;
  document.title = text.title;
  els.topBar.setAttribute("aria-label", text.controlsLabel);
  els.brandEyebrow.textContent = text.eyebrow;
  els.brandTitle.textContent = text.brand;
  els.languageSwitch.setAttribute("aria-label", text.languageLabel);
  els.scoreBoard.setAttribute("aria-label", text.scoreLabel);
  els.scoreLabels[0].textContent = text.gems;
  els.scoreLabels[1].textContent = text.rescued;
  els.mapBand.setAttribute("aria-label", text.mapLabel);
  els.controlsPanel.setAttribute("aria-label", text.controlsLabel);
  els.levelPicker.setAttribute("aria-label", text.numberSize);
  els.levelButtons.forEach((button) => {
    button.textContent = button.dataset.digits === "mix" ? text.mix : text.digits(button.dataset.digits);
  });
  els.toggleLabel.textContent = text.includeTrading;
  els.problemCard.setAttribute("aria-label", text.subtractionProblem);
  els.problemTitle.textContent = text.problemTitle;
  els.newProblemButton.textContent = text.newProblem;
  els.newProblemButton.setAttribute("aria-label", text.newProblem);
  els.newProblemButton.title = text.newProblem;
  els.board.setAttribute("aria-label", text.verticalSubtraction);
  els.hintButton.textContent = text.hint;
  els.clearButton.textContent = text.clear;
  els.checkButton.textContent = text.openGate;
  els.helperPanel.setAttribute("aria-label", text.helperLabel);
  els.helperEyebrow.textContent = text.helper;
  els.placeLab.setAttribute("aria-label", text.placeLab);
  els.rewardCase.setAttribute("aria-label", text.rewardsLabel);
  els.partyLine.textContent = text.partyLine;
  els.partyQuestion.textContent = text.partyQuestion;
  els.languageButtons.forEach((button) => {
    const active = button.dataset.lang === state.lang;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
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

els.languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!translations[button.dataset.lang]) {
      return;
    }
    state.lang = button.dataset.lang;
    state.introSpoken = false;
    renderGame();
    speakIntro(true);
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
if ("speechSynthesis" in window) {
  window.speechSynthesis.addEventListener?.("voiceschanged", () => getSpeechVoice());
}
window.setTimeout(() => speakIntro(), 350);
document.addEventListener("pointerdown", () => speakIntro(), { once: true });
