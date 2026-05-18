const rewards = ["Map", "Hat", "Key", "Boat", "Crown"];
const treasureContents = [
  { kind: "emoji", value: "🍒", label: "cherries" },
  { kind: "emoji", value: "🍎", label: "apple" },
  { kind: "emoji", value: "🍉", label: "watermelon" },
  { kind: "emoji", value: "🍓", label: "strawberry" },
  { kind: "emoji", value: "💎", label: "diamond" },
  { kind: "emoji", value: "💍", label: "jewel" },
  { kind: "coin", value: "$", label: "gold coin" },
  { kind: "bill", value: "50", label: "play Canadian fifty dollar bill" }
];
const treasureGoal = 5;

const translations = {
  en: {
    htmlLang: "en",
    voiceLang: "en-US",
    title: "Treasure Rescue Subtraction",
    eyebrow: "Subtraction Adventure",
    mathEyebrow: "Math Adventure",
    brand: "Treasure Rescue",
    languageLabel: "Language",
    scoreLabel: "Score",
    gems: "Gems",
    rescued: "Rescued",
    mapLabel: "Treasure map progress",
    controlsLabel: "Practice choices",
    numberSize: "Number size",
    operationLabel: "Math operation",
    operations: {
      subtraction: "Subtract",
      addition: "Add",
      multiplication: "Multiply",
      division: "Divide"
    },
    digits: (count) => `${count} digits`,
    mix: "Mix",
    includeTrading: "Include trading",
    subtractionProblem: "Subtraction problem",
    verticalSubtraction: "Vertical subtraction",
    gate: (count) => `Gate ${count}`,
    problemTitle: "Unlock the treasure gate",
    problemTitles: {
      subtraction: "Unlock the treasure gate",
      addition: "Add gems to open the gate",
      multiplication: "Build a treasure stack",
      division: "Share the treasure fairly"
    },
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
    carryMessage: "Nice carry. That little number helps the next column.",
    carryInto: (place) => `Carry into the ${place} column`,
    carryDigit: (place) => `${place} carry`,
    optionalCarry: "Carry boxes are optional.",
    divisionGuide: "Try each quotient box above the house. Multiply, subtract, then bring down.",
    wrongFirst: "Good try. Start on the right side and check each place.",
    wrongAgain: "Almost. Check the glowing box, then try again.",
    gateOpen: "Gate open! Treasure rescued!",
    freshBoxes: "Fresh boxes. Try from the ones place.",
    partyLine: "Awesome job, you got to the treasure...",
    partyQuestion: "What's inside?",
    closeTreasure: "Close treasure",
    introSpeech: "Let's practice subtraction. Start with the ones. Type each answer digit under the line. If you need to trade, tap the top number.",
    introSpeeches: {
      subtraction: "Let's practice subtraction. Start with the ones. Type each answer digit under the line. If you need to trade, tap the top number.",
      addition: "Let's practice addition. Start with the ones. Type each answer digit under the line. If you carry, tap the little carry box above the next column.",
      multiplication: "Let's practice multiplication. Multiply by the bottom number, starting on the right. Type the answer under the line. Carry boxes are there if you want to use them.",
      division: "Let's practice division. Put the answer boxes on top of the division house. Think: divide, multiply, subtract, and bring down."
    },
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
    mathEyebrow: "Aventure de maths",
    brand: "Sauvetage du trésor",
    languageLabel: "Langue",
    scoreLabel: "Score",
    gems: "Gemmes",
    rescued: "Sauvés",
    mapLabel: "Progression vers le trésor",
    controlsLabel: "Choix d'entraînement",
    numberSize: "Taille du nombre",
    operationLabel: "Opération",
    operations: {
      subtraction: "Soustraire",
      addition: "Additionner",
      multiplication: "Multiplier",
      division: "Diviser"
    },
    digits: (count) => `${count} chiffres`,
    mix: "Mélange",
    includeTrading: "Avec échange",
    subtractionProblem: "Soustraction",
    verticalSubtraction: "Soustraction posée",
    gate: (count) => `Porte ${count}`,
    problemTitle: "Ouvre la porte du trésor",
    problemTitles: {
      subtraction: "Ouvre la porte du trésor",
      addition: "Ajoute des gemmes pour ouvrir",
      multiplication: "Construis une pile de trésors",
      division: "Partage le trésor équitablement"
    },
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
    carryMessage: "Beau report. Ce petit nombre aide la colonne suivante.",
    carryInto: (place) => `Reporter dans la colonne ${place}`,
    carryDigit: (place) => `Report des ${place}`,
    optionalCarry: "Les cases de report sont facultatives.",
    divisionGuide: "Essaie les cases du quotient en haut. Multiplie, soustrais, puis descends.",
    wrongFirst: "Bien essayé. Commence à droite et vérifie chaque colonne.",
    wrongAgain: "Presque. Regarde la case qui brille, puis réessaie.",
    gateOpen: "Porte ouverte ! Trésor sauvé !",
    freshBoxes: "Cases toutes neuves. Essaie depuis les unités.",
    partyLine: "Bravo, tu es arrivé au trésor...",
    partyQuestion: "Qu'est-ce qu'il y a dedans ?",
    closeTreasure: "Fermer le trésor",
    introSpeech: "On s'entraîne à soustraire. Commence par les unités. Écris chaque chiffre de la réponse sous la ligne. Si tu dois échanger, touche le nombre du haut.",
    introSpeeches: {
      subtraction: "On s'entraîne à soustraire. Commence par les unités. Écris chaque chiffre de la réponse sous la ligne. Si tu dois échanger, touche le nombre du haut.",
      addition: "On s'entraîne à additionner. Commence par les unités. Écris chaque chiffre de la réponse sous la ligne. Si tu reportes, touche la petite case de report au-dessus de la colonne suivante.",
      multiplication: "On s'entraîne à multiplier. Multiplie par le nombre du bas, en commençant à droite. Écris la réponse sous la ligne. Les cases de report sont là si tu veux les utiliser.",
      division: "On s'entraîne à diviser. Mets les chiffres de la réponse au-dessus de la maison de division. Pense : diviser, multiplier, soustraire, puis descendre."
    },
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
    mathEyebrow: "數學大冒險",
    brand: "救寶藏",
    languageLabel: "語言",
    scoreLabel: "分數",
    gems: "寶石",
    rescued: "救到",
    mapLabel: "寶藏地圖進度",
    controlsLabel: "練習選擇",
    numberSize: "位數",
    operationLabel: "運算",
    operations: {
      subtraction: "減",
      addition: "加",
      multiplication: "乘",
      division: "除"
    },
    digits: (count) => `${count} 位數`,
    mix: "混合",
    includeTrading: "包括借位",
    subtractionProblem: "減數題",
    verticalSubtraction: "直式減數",
    gate: (count) => `第 ${count} 道門`,
    problemTitle: "打開寶藏門",
    problemTitles: {
      subtraction: "打開寶藏門",
      addition: "加寶石開門",
      multiplication: "砌起寶藏堆",
      division: "公平分享寶藏"
    },
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
    carryMessage: "進位好叻。細細個數會幫下一欄。",
    carryInto: (place) => `進位去${place}`,
    carryDigit: (place) => `${place}進位`,
    optionalCarry: "進位格可以填，唔填都得。",
    divisionGuide: "喺屋頂試商。乘、減，再拉落下一位。",
    wrongFirst: "好嘗試。由右邊開始，再睇每一位。",
    wrongAgain: "差少少。睇吓發光嗰格，再試。",
    gateOpen: "門開咗！救到寶藏！",
    freshBoxes: "格仔清空咗。由個位再試。",
    partyLine: "好叻呀，你去到寶藏喇...",
    partyQuestion: "入面有咩呢？",
    closeTreasure: "關閉寶藏",
    introSpeech: "一齊練習減數。由個位開始。喺線下面輸入每一個答案數字。如果要借位，就撳上面個數。",
    introSpeeches: {
      subtraction: "一齊練習減數。由個位開始。喺線下面輸入每一個答案數字。如果要借位，就撳上面個數。",
      addition: "一齊練習加數。由個位開始。喺線下面輸入答案數字。如果要進位，就撳下一欄上面嘅細格。",
      multiplication: "一齊練習乘數。用下面個數去乘，由右邊開始。喺線下面輸入答案。進位格想用就用。",
      division: "一齊練習除數。將答案寫喺除數屋頂上面。記住：除、乘、減，再拉下一位落嚟。"
    },
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
    mathEyebrow: "数学大冒险",
    brand: "拯救宝藏",
    languageLabel: "语言",
    scoreLabel: "分数",
    gems: "宝石",
    rescued: "救到",
    mapLabel: "宝藏地图进度",
    controlsLabel: "练习选择",
    numberSize: "位数",
    operationLabel: "运算",
    operations: {
      subtraction: "减",
      addition: "加",
      multiplication: "乘",
      division: "除"
    },
    digits: (count) => `${count} 位数`,
    mix: "混合",
    includeTrading: "包含借位",
    subtractionProblem: "减法题",
    verticalSubtraction: "竖式减法",
    gate: (count) => `第 ${count} 道门`,
    problemTitle: "打开宝藏门",
    problemTitles: {
      subtraction: "打开宝藏门",
      addition: "加宝石开门",
      multiplication: "搭起宝藏堆",
      division: "公平分享宝藏"
    },
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
    carryMessage: "进位很好。这个小数字会帮助下一列。",
    carryInto: (place) => `进位到${place}`,
    carryDigit: (place) => `${place}进位`,
    optionalCarry: "进位格可以填，也可以不填。",
    divisionGuide: "试着填上面的商。乘、减，再把下一位带下来。",
    wrongFirst: "试得很好。从右边开始，检查每一位。",
    wrongAgain: "快对了。看看发光的格子，再试一次。",
    gateOpen: "门打开了！救到宝藏！",
    freshBoxes: "格子清空了。从个位再试。",
    partyLine: "太棒了，你到达宝藏了...",
    partyQuestion: "里面有什么？",
    closeTreasure: "关闭宝藏",
    introSpeech: "我们来练习减法。从个位开始。把每个答案数字写在线下面。如果需要借位，就点上面的数。",
    introSpeeches: {
      subtraction: "我们来练习减法。从个位开始。把每个答案数字写在线下面。如果需要借位，就点上面的数。",
      addition: "我们来练习加法。从个位开始。把每个答案数字写在线下面。如果要进位，就点下一列上方的小进位格。",
      multiplication: "我们来练习乘法。用下面的数去乘，从右边开始。把答案写在线下面。进位格想用就用。",
      division: "我们来练习除法。把答案写在除法屋顶上。记住：除、乘、减，再把下一位带下来。"
    },
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
    mathEyebrow: "수학 모험",
    brand: "보물 구출",
    languageLabel: "언어",
    scoreLabel: "점수",
    gems: "보석",
    rescued: "구출",
    mapLabel: "보물 지도 진행",
    controlsLabel: "연습 선택",
    numberSize: "자릿수",
    operationLabel: "연산",
    operations: {
      subtraction: "빼기",
      addition: "더하기",
      multiplication: "곱하기",
      division: "나누기"
    },
    digits: (count) => `${count}자리`,
    mix: "섞기",
    includeTrading: "받아내림 포함",
    subtractionProblem: "빼기 문제",
    verticalSubtraction: "세로 빼기",
    gate: (count) => `문 ${count}`,
    problemTitle: "보물 문을 열자",
    problemTitles: {
      subtraction: "보물 문을 열자",
      addition: "보석을 더해 문을 열자",
      multiplication: "보물 더미를 만들자",
      division: "보물을 똑같이 나누자"
    },
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
    carryMessage: "좋은 올림이야. 작은 숫자가 다음 자리를 도와줘.",
    carryInto: (place) => `${place}에 올림`,
    carryDigit: (place) => `${place} 올림`,
    optionalCarry: "올림 칸은 안 써도 괜찮아.",
    divisionGuide: "위 칸에 몫을 써 봐. 곱하고, 빼고, 다음 숫자를 내려.",
    wrongFirst: "잘했어. 오른쪽부터 시작해서 각 자리를 확인해 봐.",
    wrongAgain: "거의 맞았어. 빛나는 칸을 보고 다시 해 봐.",
    gateOpen: "문이 열렸어! 보물을 구했어!",
    freshBoxes: "칸을 비웠어. 일의 자리부터 다시 해 봐.",
    partyLine: "정말 잘했어, 보물에 도착했어...",
    partyQuestion: "안에 뭐가 있을까?",
    closeTreasure: "보물 닫기",
    introSpeech: "빼기를 연습하자. 일의 자리부터 시작해. 선 아래에 답 숫자를 하나씩 써. 받아내림이 필요하면 위 숫자를 눌러.",
    introSpeeches: {
      subtraction: "빼기를 연습하자. 일의 자리부터 시작해. 선 아래에 답 숫자를 하나씩 써. 받아내림이 필요하면 위 숫자를 눌러.",
      addition: "더하기를 연습하자. 일의 자리부터 시작해. 선 아래에 답 숫자를 써. 올림이 있으면 다음 자리 위의 작은 올림 칸을 눌러.",
      multiplication: "곱하기를 연습하자. 아래 숫자로 오른쪽부터 곱해. 선 아래에 답을 써. 올림 칸은 쓰고 싶을 때 쓰면 돼.",
      division: "나누기를 연습하자. 나눗셈 집 위에 답을 써. 나누고, 곱하고, 빼고, 다음 숫자를 내려."
    },
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
    mathEyebrow: "算数アドベンチャー",
    brand: "宝物レスキュー",
    languageLabel: "言語",
    scoreLabel: "スコア",
    gems: "宝石",
    rescued: "救出",
    mapLabel: "宝物マップの進み具合",
    controlsLabel: "れんしゅうの選択",
    numberSize: "けた数",
    operationLabel: "計算",
    operations: {
      subtraction: "ひく",
      addition: "たす",
      multiplication: "かける",
      division: "わる"
    },
    digits: (count) => `${count}けた`,
    mix: "ミックス",
    includeTrading: "くり下がりあり",
    subtractionProblem: "ひき算の問題",
    verticalSubtraction: "筆算のひき算",
    gate: (count) => `ゲート ${count}`,
    problemTitle: "宝物のゲートを開けよう",
    problemTitles: {
      subtraction: "宝物のゲートを開けよう",
      addition: "宝石をたしてゲートを開けよう",
      multiplication: "宝物の山を作ろう",
      division: "宝物を同じ数に分けよう"
    },
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
    carryMessage: "いいくり上がり。小さい数が次の位を助けるよ。",
    carryInto: (place) => `${place}にくり上がる`,
    carryDigit: (place) => `${place}のくり上がり`,
    optionalCarry: "くり上がりの箱は使っても使わなくてもいいよ。",
    divisionGuide: "上の商の箱に入れてみよう。かけて、ひいて、次を下ろすよ。",
    wrongFirst: "いいね。右から始めて、位を一つずつ見よう。",
    wrongAgain: "もう少し。光っている箱を見て、もう一度。",
    gateOpen: "ゲートが開いた！宝物を助けたよ！",
    freshBoxes: "箱を空にしたよ。一の位からもう一度。",
    partyLine: "すごい、宝物まで来たよ...",
    partyQuestion: "中には何があるかな？",
    closeTreasure: "宝物を閉じる",
    introSpeech: "ひき算を練習しよう。一の位から始めてね。線の下に答えの数字を一つずつ書こう。くり下がりが必要なら、上の数をタップしてね。",
    introSpeeches: {
      subtraction: "ひき算を練習しよう。一の位から始めてね。線の下に答えの数字を一つずつ書こう。くり下がりが必要なら、上の数をタップしてね。",
      addition: "たし算を練習しよう。一の位から始めてね。線の下に答えを書こう。くり上がりがある時は、次の位の上の小さい箱をタップしてね。",
      multiplication: "かけ算を練習しよう。下の数を使って、右からかけてね。線の下に答えを書こう。くり上がりの箱は使いたい時に使えるよ。",
      division: "わり算を練習しよう。わり算の家の上に答えを書いてね。わって、かけて、ひいて、次を下ろそう。"
    },
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
    mathEyebrow: "Phiêu lưu toán học",
    brand: "Giải cứu kho báu",
    languageLabel: "Ngôn ngữ",
    scoreLabel: "Điểm",
    gems: "Đá quý",
    rescued: "Đã cứu",
    mapLabel: "Tiến trình bản đồ kho báu",
    controlsLabel: "Chọn bài tập",
    numberSize: "Số chữ số",
    operationLabel: "Phép tính",
    operations: {
      subtraction: "Trừ",
      addition: "Cộng",
      multiplication: "Nhân",
      division: "Chia"
    },
    digits: (count) => `${count} chữ số`,
    mix: "Trộn",
    includeTrading: "Có mượn",
    subtractionProblem: "Bài trừ",
    verticalSubtraction: "Phép trừ đặt dọc",
    gate: (count) => `Cổng ${count}`,
    problemTitle: "Mở cổng kho báu",
    problemTitles: {
      subtraction: "Mở cổng kho báu",
      addition: "Cộng đá quý để mở cổng",
      multiplication: "Xếp chồng kho báu",
      division: "Chia kho báu đều nhau"
    },
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
    carryMessage: "Nhớ giỏi lắm. Số nhỏ này giúp hàng tiếp theo.",
    carryInto: (place) => `Nhớ vào ${place}`,
    carryDigit: (place) => `Số nhớ ${place}`,
    optionalCarry: "Ô nhớ có thể điền hoặc bỏ qua.",
    divisionGuide: "Thử từng ô thương ở trên. Nhân, trừ, rồi hạ xuống.",
    wrongFirst: "Cố gắng tốt. Bắt đầu bên phải và kiểm tra từng hàng.",
    wrongAgain: "Gần đúng rồi. Nhìn ô sáng lên rồi thử lại.",
    gateOpen: "Cổng mở rồi! Cứu được kho báu!",
    freshBoxes: "Ô đã trống. Thử lại từ hàng đơn vị.",
    partyLine: "Tuyệt vời, con đã đến kho báu...",
    partyQuestion: "Bên trong có gì nhỉ?",
    closeTreasure: "Đóng kho báu",
    introSpeech: "Mình cùng luyện phép trừ nhé. Bắt đầu từ hàng đơn vị. Nhập từng chữ số của đáp án dưới đường kẻ. Nếu cần mượn, hãy chạm vào số ở trên.",
    introSpeeches: {
      subtraction: "Mình cùng luyện phép trừ nhé. Bắt đầu từ hàng đơn vị. Nhập từng chữ số của đáp án dưới đường kẻ. Nếu cần mượn, hãy chạm vào số ở trên.",
      addition: "Mình cùng luyện phép cộng nhé. Bắt đầu từ hàng đơn vị. Nhập từng chữ số của đáp án dưới đường kẻ. Nếu có nhớ, hãy chạm vào ô nhớ nhỏ phía trên hàng tiếp theo.",
      multiplication: "Mình cùng luyện phép nhân nhé. Nhân với số ở dưới, bắt đầu từ bên phải. Nhập đáp án dưới đường kẻ. Ô nhớ có thể dùng nếu con muốn.",
      division: "Mình cùng luyện phép chia nhé. Nhập đáp án phía trên ngôi nhà chia. Hãy nghĩ: chia, nhân, trừ, rồi hạ xuống."
    },
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
  operation: "subtraction",
  digits: 2,
  includeRegrouping: true,
  minuend: 52,
  subtrahend: 18,
  addendA: 34,
  addendB: 18,
  factorTop: 24,
  factorBottom: 3,
  dividend: 48,
  divisor: 4,
  quotient: 12,
  answer: 34,
  solved: 0,
  gems: 0,
  attempts: 0,
  borrowMarks: new Set(),
  carryMarks: new Set(),
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
  operationTabs: [...document.querySelectorAll(".operation-tab")],
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
  partyCloseButton: document.querySelector("#partyCloseButton"),
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

function needsAdditionCarry(top, bottom) {
  const width = Math.max(String(top).length, String(bottom).length);
  const topDigits = digitsOf(top, width).map(Number).reverse();
  const bottomDigits = digitsOf(bottom, width).map(Number).reverse();
  let carry = 0;

  for (let index = 0; index < width; index += 1) {
    const total = topDigits[index] + bottomDigits[index] + carry;
    if (total >= 10) {
      return true;
    }
    carry = total >= 10 ? 1 : 0;
  }
  return false;
}

function makeProblem() {
  if (state.operation === "addition") {
    makeAdditionProblem();
    return;
  }
  if (state.operation === "multiplication") {
    makeMultiplicationProblem();
    return;
  }
  if (state.operation === "division") {
    makeDivisionProblem();
    return;
  }

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
  state.carryMarks.clear();
  state.completing = false;
}

function makeAdditionProblem() {
  const digits = getDigitCount();
  const { min, max } = rangeForDigits(digits);
  let top = 0;
  let bottom = 0;
  let tries = 0;
  const wantsCarry = state.includeRegrouping;

  do {
    top = randomInt(min, max);
    bottom = randomInt(min, max);
    tries += 1;
  } while (tries < 900 && needsAdditionCarry(top, bottom) !== wantsCarry);

  state.addendA = top;
  state.addendB = bottom;
  state.answer = top + bottom;
  state.attempts = 0;
  state.borrowMarks.clear();
  state.carryMarks.clear();
  state.completing = false;
}

function makeMultiplicationProblem() {
  const digits = getDigitCount();
  const { min, max } = rangeForDigits(digits);
  state.factorTop = randomInt(min, max);
  state.factorBottom = randomInt(2, 9);
  state.answer = state.factorTop * state.factorBottom;
  state.attempts = 0;
  state.borrowMarks.clear();
  state.carryMarks.clear();
  state.completing = false;
}

function makeDivisionProblem() {
  const digits = getDigitCount();
  const quotientRange = rangeForDigits(Math.max(1, digits - 1));
  state.divisor = randomInt(2, 9);
  state.quotient = randomInt(quotientRange.min, quotientRange.max);
  state.dividend = state.divisor * state.quotient;
  state.answer = state.quotient;
  state.attempts = 0;
  state.borrowMarks.clear();
  state.carryMarks.clear();
  state.completing = false;
}

function digitsOf(number, width) {
  return String(number).padStart(width, "0").split("");
}

function displayDigitsOf(number, width) {
  const raw = String(number);
  return raw.padStart(width, " ").split("");
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

function answerText() {
  return String(state.answer);
}

function answerWidth() {
  if (state.operation === "subtraction") {
    return String(state.minuend).length;
  }
  return answerText().length;
}

function renderBoard() {
  if (state.operation === "addition") {
    renderAdditionBoard();
    return;
  }
  if (state.operation === "multiplication") {
    renderMultiplicationBoard();
    return;
  }
  if (state.operation === "division") {
    renderDivisionBoard();
    return;
  }

  const width = String(state.minuend).length;
  const top = digitsOf(state.minuend, width);
  const bottom = digitsOf(state.subtrahend, width);
  const answer = digitsOf(state.answer, width);

  els.board.innerHTML = "";
  els.board.classList.remove("division-board");
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

function makeAnswerRow(width) {
  const answer = digitsOf(state.answer, width);
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

  return inputRow;
}

function renderAdditionBoard() {
  const width = Math.max(String(state.addendA).length, String(state.addendB).length, answerWidth());
  const top = displayDigitsOf(state.addendA, width);
  const bottom = displayDigitsOf(state.addendB, width);

  els.board.innerHTML = "";
  els.board.classList.remove("division-board");
  els.board.style.setProperty("--places", String(width));

  const carryRow = document.createElement("div");
  carryRow.className = "number-row carry-row";
  carryRow.append(document.createElement("span"));
  top.forEach((_, index) => {
    const marker = document.createElement("button");
    marker.className = "carry-marker";
    marker.type = "button";
    marker.textContent = state.carryMarks.has(index) ? "1" : "";
    marker.ariaLabel = (copy().carryInto || translations.en.carryInto)(placeName(width - index - 1));
    marker.disabled = index === width - 1;
    marker.addEventListener("click", () => toggleCarry(index));
    if (state.carryMarks.has(index)) {
      marker.classList.add("active");
    }
    carryRow.append(marker);
  });

  const topRow = makeNumberRow("", top, "top number", "top");
  const bottomRow = makeNumberRow("+", bottom, "add", "bottom");
  bottomRow.classList.add("bottom-row");
  els.board.append(carryRow, topRow, bottomRow, makeAnswerRow(width));
}

function renderMultiplicationBoard() {
  const answer = answerText();
  const topWidth = String(state.factorTop).length;
  const width = Math.max(topWidth, answer.length);
  const top = displayDigitsOf(state.factorTop, width);
  const bottom = displayDigitsOf(state.factorBottom, width);

  els.board.innerHTML = "";
  els.board.classList.remove("division-board");
  els.board.style.setProperty("--places", String(width));

  const carryRow = document.createElement("div");
  carryRow.className = "number-row multiply-carry-row";
  carryRow.append(document.createElement("span"));
  top.forEach((_, index) => {
    const input = document.createElement("input");
    input.className = "carry-input";
    input.inputMode = "numeric";
    input.maxLength = 2;
    input.autocomplete = "off";
    input.pattern = "[0-9]*";
    input.ariaLabel = (copy().carryDigit || translations.en.carryDigit)(placeName(width - index - 1));
    input.dataset.index = String(index);
    input.addEventListener("input", handleCarryInput);
    carryRow.append(input);
  });

  const topRow = makeNumberRow("", top, "top number", "top");
  const bottomRow = makeNumberRow("×", bottom, "multiply", "bottom");
  bottomRow.classList.add("bottom-row");
  els.board.append(carryRow, topRow, bottomRow, makeAnswerRow(width));
}

function renderDivisionBoard() {
  const quotient = answerText();
  const dividend = String(state.dividend);
  const quotientWidth = quotient.length;
  const dividendWidth = dividend.length;

  els.board.innerHTML = "";
  els.board.classList.add("division-board");
  els.board.style.setProperty("--places", String(Math.max(quotientWidth, dividendWidth)));

  const shell = document.createElement("div");
  shell.className = "division-shell";

  const divisor = document.createElement("div");
  divisor.className = "division-divisor";
  divisor.textContent = state.divisor;

  const work = document.createElement("div");
  work.className = "division-work";

  const quotientRow = document.createElement("div");
  quotientRow.className = "division-quotient-row";
  quotientRow.style.gridTemplateColumns = `repeat(${quotientWidth}, minmax(42px, 1fr))`;
  digitsOf(state.answer, quotientWidth).forEach((_, index) => {
    const input = document.createElement("input");
    input.className = "digit-input";
    input.inputMode = "numeric";
    input.maxLength = 1;
    input.autocomplete = "off";
    input.pattern = "[0-9]";
    input.ariaLabel = copy().answerDigit(placeName(quotientWidth - index - 1));
    input.dataset.index = String(index);
    input.addEventListener("input", handleDigitInput);
    input.addEventListener("keydown", handleDigitKeys);
    quotientRow.append(input);
  });

  const dividendRow = document.createElement("div");
  dividendRow.className = "division-dividend-row";
  dividendRow.style.gridTemplateColumns = `repeat(${dividendWidth}, minmax(42px, 1fr))`;
  digitsOf(state.dividend, dividendWidth).forEach((digit) => {
    const cell = document.createElement("span");
    cell.className = "digit-cell";
    cell.textContent = digit;
    dividendRow.append(cell);
  });

  work.append(quotientRow, dividendRow);
  shell.append(divisor, work);
  els.board.append(shell);
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
    const isBorrowButton = state.operation === "subtraction" && label === "top number";
    const cell = document.createElement(isBorrowButton ? "button" : "span");
    cell.className = "digit-cell";
    cell.dataset.index = String(index);
    cell.textContent = digit;

    if (isBorrowButton) {
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

function toggleCarry(index) {
  const typedDigits = [...document.querySelectorAll(".digit-input")].map((input) => input.value);
  if (state.carryMarks.has(index)) {
    state.carryMarks.delete(index);
  } else {
    state.carryMarks.add(index);
  }
  renderBoard();
  document.querySelectorAll(".digit-input").forEach((input, inputIndex) => {
    input.value = typedDigits[inputIndex] || "";
    checkDigitInput(input);
  });
  renderPlaceLab();
  els.feedback.textContent = (copy().carryMessage || translations.en.carryMessage);
  playTone("borrow");
}

function multiplicationCarries() {
  const digits = String(state.factorTop).split("").map(Number).reverse();
  const carries = new Map();
  let carry = 0;

  digits.forEach((digit, reverseIndex) => {
    const product = digit * state.factorBottom + carry;
    carry = Math.floor(product / 10);
    const displayIndex = String(state.answer).length - reverseIndex - 2;
    if (carry > 0 && displayIndex >= 0) {
      carries.set(displayIndex, String(carry));
    }
  });

  return carries;
}

function handleCarryInput(event) {
  const input = event.currentTarget;
  input.value = input.value.replace(/\D/g, "").slice(0, 2);
  input.classList.remove("wrong", "correct");

  if (!input.value) {
    return;
  }

  const expected = multiplicationCarries().get(Number(input.dataset.index));
  input.classList.toggle("correct", input.value === expected);
  input.classList.toggle("wrong", input.value !== expected);
  if (input.value === expected) {
    sparkleAt(input, 5);
    playTone("digit");
  }
}

function renderPlaceLab(stepIndex = -1) {
  if (state.operation === "addition") {
    renderAdditionLab();
    return;
  }
  if (state.operation === "multiplication") {
    renderMultiplicationLab();
    return;
  }
  if (state.operation === "division") {
    renderDivisionLab();
    return;
  }

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

function renderAdditionLab() {
  const width = Math.max(String(state.addendA).length, String(state.addendB).length, answerWidth());
  const top = digitsOf(state.addendA, width).map(Number);
  const bottom = digitsOf(state.addendB, width).map(Number);
  els.placeLab.innerHTML = "";

  top.forEach((digit, index) => {
    const reverseIndex = width - index - 1;
    const total = digit + bottom[index];
    const card = document.createElement("div");
    card.className = "place-card";
    if (total >= 10 || state.carryMarks.has(index)) {
      card.classList.add("active");
    }
    card.innerHTML = `
      <span>${placeName(reverseIndex)}</span>
      <strong>${digit + bottom[index]}</strong>
      <small>${digit} + ${bottom[index]}</small>
    `;
    els.placeLab.append(card);
  });
}

function renderMultiplicationLab() {
  els.placeLab.innerHTML = "";
  const card = document.createElement("div");
  card.className = "place-card active";
  card.innerHTML = `
    <span>${copy().operations?.multiplication || translations.en.operations.multiplication}</span>
    <strong>× ${state.factorBottom}</strong>
    <small>${copy().optionalCarry || translations.en.optionalCarry}</small>
  `;
  els.placeLab.append(card);
}

function renderDivisionLab() {
  els.placeLab.innerHTML = "";
  const card = document.createElement("div");
  card.className = "place-card active division-help";
  card.innerHTML = `
    <span>${copy().operations?.division || translations.en.operations.division}</span>
    <strong>÷ ${state.divisor}</strong>
    <small>${copy().divisionGuide || translations.en.divisionGuide}</small>
  `;
  els.placeLab.append(card);
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
  const expected = answerText().padStart(answerWidth(), "0");
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
  const expected = answerText().padStart(answerWidth(), "0");
  const typed = inputs.map((input) => input.value).join("");
  if (typed.length === expected.length && typed === expected) {
    rescueTreasure();
  }
}

function checkAnswer() {
  if (state.completing) {
    return;
  }
  const expected = answerText().padStart(answerWidth(), "0");
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
  if (state.operation === "addition") {
    els.feedback.textContent = copy().carryMessage || translations.en.carryMessage;
    els.helperTitle.textContent = copy().helperTradeTitle;
    renderPlaceLab();
    return;
  }
  if (state.operation === "multiplication") {
    els.feedback.textContent = copy().optionalCarry || translations.en.optionalCarry;
    els.helperTitle.textContent = copy().helperTry;
    renderPlaceLab();
    return;
  }
  if (state.operation === "division") {
    els.feedback.textContent = copy().divisionGuide || translations.en.divisionGuide;
    els.helperTitle.textContent = copy().helperTry;
    renderPlaceLab();
    return;
  }
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
}

function closeTreasureParty() {
  els.treasureParty.hidden = true;
  els.treasureParty.classList.remove("revealed");
  els.fruitField.innerHTML = "";
  restartTreasureRun();
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
  for (let index = 0; index < 96; index += 1) {
    const treasure = treasureContents[index % treasureContents.length];
    const item = document.createElement("span");
    const angle = (Math.PI * 2 * index) / 80 + Math.random() * 0.5;
    const distance = randomInt(120, Math.max(220, Math.min(window.innerWidth, window.innerHeight)));
    item.className = `treasure-item ${treasure.kind}`;
    item.setAttribute("aria-label", treasure.label);
    if (treasure.kind === "bill") {
      item.innerHTML = `<b>PLAY $${treasure.value}</b><small>CANADA</small><em>Carney</em>`;
    } else {
      item.textContent = treasure.value;
    }
    item.style.left = `${centerX}px`;
    item.style.top = `${centerY}px`;
    item.style.setProperty("--tx", `${Math.cos(angle) * distance}px`);
    item.style.setProperty("--ty", `${Math.sin(angle) * distance - randomInt(30, 190)}px`);
    item.style.setProperty("--spin", `${randomInt(-720, 720)}deg`);
    item.style.animationDelay = `${randomInt(0, 420)}ms`;
    els.fruitField.append(item);
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

function introSpeechText() {
  const text = copy();
  return text.introSpeeches?.[state.operation]
    || translations.en.introSpeeches[state.operation]
    || text.introSpeech;
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
    if (message === introSpeechText()) {
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
  speak(introSpeechText(), true);
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
  if (state.operation === "division") {
    els.helperTitle.textContent = copy().divisionGuide || translations.en.divisionGuide;
  } else if (state.operation === "multiplication") {
    els.helperTitle.textContent = copy().optionalCarry || translations.en.optionalCarry;
  } else if (state.operation === "addition") {
    els.helperTitle.textContent = copy().carryMessage || translations.en.carryMessage;
  } else {
    els.helperTitle.textContent = state.includeRegrouping ? copy().helperTrade : copy().helperStart;
  }
}

function applyTranslations() {
  const text = copy();
  const english = translations.en;
  document.documentElement.lang = text.htmlLang;
  document.title = state.operation === "subtraction" ? text.title : "Treasure Rescue Math";
  els.topBar.setAttribute("aria-label", text.controlsLabel);
  els.brandEyebrow.textContent = state.operation === "subtraction"
    ? text.eyebrow
    : text.mathEyebrow || english.mathEyebrow;
  els.brandTitle.textContent = text.brand;
  els.languageSwitch.setAttribute("aria-label", text.languageLabel);
  els.scoreBoard.setAttribute("aria-label", text.scoreLabel);
  els.scoreLabels[0].textContent = text.gems;
  els.scoreLabels[1].textContent = text.rescued;
  els.mapBand.setAttribute("aria-label", text.mapLabel);
  els.controlsPanel.setAttribute("aria-label", text.controlsLabel);
  els.operationTabs[0]?.parentElement?.setAttribute("aria-label", text.operationLabel || english.operationLabel);
  els.operationTabs.forEach((button) => {
    const active = button.dataset.operation === state.operation;
    button.textContent = text.operations?.[button.dataset.operation] || english.operations[button.dataset.operation];
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });
  els.levelPicker.setAttribute("aria-label", text.numberSize);
  els.levelButtons.forEach((button) => {
    button.textContent = button.dataset.digits === "mix" ? text.mix : text.digits(button.dataset.digits);
  });
  els.toggleLabel.textContent = text.includeTrading;
  els.problemCard.setAttribute("aria-label", text.subtractionProblem);
  els.problemTitle.textContent = text.problemTitles?.[state.operation] || english.problemTitles[state.operation];
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
  els.partyCloseButton.setAttribute("aria-label", text.closeTreasure);
  els.partyCloseButton.title = text.closeTreasure;
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

els.operationTabs.forEach((button) => {
  button.addEventListener("click", () => {
    state.operation = button.dataset.operation;
    state.introSpoken = false;
    makeProblem();
    renderGame();
    speakIntro(true);
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
els.partyCloseButton.addEventListener("click", closeTreasureParty);

makeProblem();
renderGame();
if ("speechSynthesis" in window) {
  window.speechSynthesis.addEventListener?.("voiceschanged", () => getSpeechVoice());
}
window.setTimeout(() => speakIntro(), 350);
document.addEventListener("pointerdown", () => speakIntro(), { once: true });
