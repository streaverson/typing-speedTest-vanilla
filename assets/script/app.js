/**
 * @license
 * amir valadkhani - App JavaScript
 * Copyright (c) 2026 amirValadkhani.com
 * All Rights Reserved.
 *
 * This code is proprietary and confidential.
 * Unauthorized copying, modification, or distribution is prohibited.
 * Contact Me: amirmahdi.valadkhani@gmail.com
 */
///////////////////////////////
const toPersianDigits = (num) => {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  // تبدیل عدد به رشته و سپس جایگزینی هر رقم با معادل فارسی آن
  return num.toString().replace(/\d/g, (digit) => persianDigits[digit]);
};

const textDisplayWrapper = document.querySelector(".textDisplayWrapper");

const paragraphs = [
  {
    text: "hello high down low slow speed dear honey commit come American iran Persian truck detail small create your turn on lower iowa place of tea value war quality zoo quiz book traditional happen trace city Washington cloudy Now field hello page roam white yellow I am keyboard god confusion Day never comes forgiven turn want darling language pahlavi drops creepy feel bless telephone sunshine hurricane water carbon knee Million note airplane jelly listen rain depression imagine courtesy rehearsal compact excavation taxi fountain era drug blast tumour axis excuse departure laborer seat momentum club",
    id: 1,
  },
  {
    text: "Unhealthy kill party dream Reason before you gone like traces axis lock around also base on taste wing baby palestine israel eyes fade black remember gone away far home raindrops Niagara Falls metro Tabriz many Tehran nothing matters confusion Day never comes forgiven turn want darling language pahlavi drops creepy feel parade on face shallow copy gummy USA speed blow out I'm dreaming poker voice interrupt notice gallon platform resign musical tourist hook viable speaker negative  billboards with sober more shout what very few mother air thousands little piece nuclear axis democratic waste meaning loyalty dominate departure nest trunk bride willpower beneficiary pillow",
    id: 2,
  },

  {
    text: "Peak songs sake listen to for car boomer peace pie night one Hundred Indian where late we messy political love stem public steam computer faith wall Soviet Union lonely fold paper woods crush zombie trash clash car parse party wear steve manpower IRAN community socialism stand gym at nationality die metal play freedom moment document ice them condemned silence passage night eye earth edge indefinable scary imagine queen announcement form vision symptom negative excavate undertake stitch confrontation freckle rehabilitation cruel amuse marriage dividend proper unaware minority mud decrease honor piano rear location multimedia understand building",
    id: 3,
  },

  {
    text: "stem public steam computer faith wall Soviet Union lonely fold paper woods crush zombie trash clash car parse party wear The tower broken mirror pretty lunch missile wrong danger real noble radio game here column live notification browser padding desk note whose nose flat file fourth cathedral Head mother zoo tear do shoot kick British decrease I'd cool run from be hurry beautiful walk water Born take back me toxic Ego to Airport cop Amir rain all know snow flash sticker car you ill sport Niagara Falls metro Tabriz many Tehran nothing matters confusion Day never comes forgiven turn want darling language pahlavi drops creepy feel traces axis lock around raindrops Niagara Falls metro Tabriz many superhero kill The tower broken mirror",
    id: 4,
  },
  {
    text: "Born take back me toxic Ego to Airport cop Hasti rain all know snow flash sticker car you ill sport Persepolis fade black remember gone away far home raindrops Niagara Falls metro Tabriz many Tehran nothing matters confusion Day never comes forgiven turn want darling language pahlavi drops creepy feel traces axis lock around raindrops Niagara Falls metro Tabriz many superhero Batman spider too goodbye rust of all way you Persian Empire late long fly run cave fallen ariel angel Cross pain gift my hopes comfortable information left sky flow light forgotten craft jungle wooden city Washington cloudy Now field hello page roam white yellow I am keyboard god bless telephone sunshine glass English hey timer monitor",
    id: 5,
  },
  {
    text: "traces axis lock around raindrops Niagara Falls metro Tabriz many superhero Batman spider too goodbye sleep say carnival rust of all way you late long fly run cave fallen ariel true recently angel Cross pain gift my hopes comfortable information left sky flow light forgotten craft jungle wooden city Washington cloudy Now field hello case sorry shallow how onion shallot excuse rise And fall Empire still love sent follow date booze pen paper desk window of username basket adaptor freeway wall France new notifications cable pencil rug Black Sea apple typing test coffee for ",
    id: 6,
  },
  {
    text: "careful Good young Unhealthy listen Ego kill shallow honey commitment blow piece drops colony rock out fire flatter comfortable information left sky flow light god flesh dear kindness dumb thought value life long live Iran Tehran nothing matters confusion Day never comes forgiven turn want darling language pahlavi drops creepy feel traces axis lock around raindrops Niagara Falls metro Tabriz many superhero Batman spider too goodbye rust of all way Space beautiful walk water kill The tower broken mirror pretty lunch missile wrong danger real noble radio game here column live notification browser padding desk note whose nose flat file cairo",
    id: 7,
  },
];
//
// correctChars = تعداد کاراکترهای درست
// typedChars = تعداد کل کاراکترهای وارد شده
// timeSeconds = زمان سپری شده

// accuracy = (correctChars / typedChars) * 100

// wpm = (correctChars / 5) / (timeSeconds / 60)

// const newArr = paragraphs.map((p) => p.text.split(" ").length);
// console.log(newArr);
// ______________________________________________
const body = document.querySelector("body");
const copyNotification = document.querySelector(".notification");
const textInput = document.querySelector("#textInput");
const timerDisplay = document.querySelector("#timeStat");
const charsStat = document.querySelector("#charsStat");
const accuracyRecord = document.querySelector("#accuracyValue");
const wpmRecord = document.querySelector("#wpmStat");
const progressBar = document.querySelector(".progressBarFill");

// ______________________________________________

// console.log(Boolean(textInput.value));

let randNum = Math.floor(Math.random() * 7) + 1;
// console.log(randNum);
let textToType = paragraphs.find((p) => p.id === randNum).text;

// words
let words = textToType.split(" ");
let wordIndex = 0;
let charIndex = 0;
let timerInterval;
let mistakes = 0;
let correctWords = 0;

// _________________________________________
// 60 second TIMER
timeLeft = 60;
let timerId = null;
let isTimerRunning = false;

const startTimer = function () {
  if (isTimerRunning) return;
  isTimerRunning = true;

  timerDisplay.textContent = toPersianDigits(timeLeft);

  timerId = setInterval(() => {
    // ۱. اول زمان را کم کن
    timeLeft--;

    // ۲. نمایش مقدار جدید
    timerDisplay.textContent = toPersianDigits(timeLeft);

    // ۳. چک کن اگر زمان تمام شد
    if (timeLeft <= 0) {
      clearInterval(timerId); // حتماً از همان نام timerId استفاده کن
      isTimerRunning = false; // وضعیت تایمر را ریست کن
      finishGame(); // بازی تمام شد
    }
  }, 1000);
};

// _______________________________________________

let textToDisplay = words
  .map((word, i) => {
    const wordHtml = word
      .split("")
      .map((ch) => `<span class="characters">${ch}</span>`)
      .join("");

    if (i < words.length) {
      return `${wordHtml}<span class="characters"> </span>`;
    }
    return wordHtml;
  })
  .join("");

textDisplayWrapper.innerHTML = textToDisplay;
// ----------------------------------
const chars = document.querySelectorAll(".characters");
//--
const start = function () {
  // جلوگیری از ثبت چندباره EventListener
  textInput.oninput = function () {
    startTimer();

    textDisplayWrapper.style.opacity = 1;

    // جلوگیری از اسپم کاراکتر
    if (textInput.value.length > textToType.length) {
      textInput.value = textInput.value.slice(0, textToType.length);
    }

    const typedChars = textInput.value.length;
    const totalChars = textToType.length;

    const progress = (typedChars / totalChars) * 100;
    progressBar.style.backgroundColor = "#28a745";
    progressBar.style.width = `${Math.min(progress, 100)}%`;

    const currentValue = textInput.value;

    // نمایش تعداد کاراکتر با سقف طول متن
    charsStat.textContent = toPersianDigits(
      Math.min(currentValue.length, totalChars),
    );

    chars.forEach((char, index) => {
      char.classList.remove("correct", "wrong");

      if (index < currentValue.length) {
        if (currentValue[index] === char.textContent) {
          char.classList.add("correct");
        } else {
          char.classList.add("wrong");
        }
      }
    });
  };
};
// highlight color #1bfc06
// ________________________________________________________
// برای اینککه تقلب نکنن اینا
{
  document.addEventListener("copy", (e) => {
    e.preventDefault();
    let id = null;
    let pos = 0;
    clearInterval(id);
    id = setInterval(frame, 1);
    function frame() {
      if (pos == 10) {
        clearInterval(id);
      } else {
        pos++;
        copyNotification.style.left = pos + "px";
      }
    }
    copyNotification.style.display = "inherit";
    // ---------
    let idBack = setInterval(back, 1);

    function back() {
      setTimeout(function () {
        if (pos == -220) clearInterval();
        else {
          console.log(pos);
          pos--;
          copyNotification.style.left = pos + "px";
        }
      }, 3000);
    }
  });

  document.addEventListener("keydown", function (e) {
    if (
      e.key === "F12" ||
      (e.ctrlKey &&
        e.shiftKey &&
        (e.key === "I" || e.key === "J" || e.key === "C")) ||
      e.altKey
    ) {
      e.preventDefault();
      console.warn(`nakon ${e.key}`);
    }
  });
}

// ________________________________________________________
// این متغیرها باید در اسکوپ اصلی (بیرون از تابع) تعریف شده باشند
// این تابع جایگزین هر دو تا تابع finishGame قبلی تو میشه
function finishGame() {
  // --- بخش محاسبات (همان کدهای تابع اول تو) ---
  const textInput = document.getElementById("textInput");
  if (textInput) {
    textInput.setAttribute("disabled", "");
    textInput.value = "";
  }

  const timeSec = 60;
  const maxChars = textToType.length;

  const correctChars = Math.min(
    document.querySelectorAll(".correct").length,
    maxChars,
  );

  const wrongChars = Math.min(
    document.querySelectorAll(".wrong").length,
    maxChars - correctChars,
  );

  const totalTyped = Math.min(correctChars + wrongChars, maxChars);

  const accuracy = totalTyped > 0 ? (correctChars / totalTyped) * 100 : 0;
  const netWPM = Math.max(
    0,
    correctChars / 5 / (timeSec / 60) - wrongChars / (timeSec / 60),
  );

  console.log("--- Results ---");
  console.log(`Accuracy: ${accuracy}`);
  console.log(`Net WPM: ${netWPM}`);

  // --- بخش ذخیره‌سازی و UI (همان کدهای تابع دوم تو) ---
  saveToLocalStorage(netWPM, accuracy);
  updateMainUI(netWPM, accuracy);
  showResultModal(netWPM, accuracy, totalTyped);
}

// ۳. تابع ذخیره‌سازی (فقط و فقط ذخیره کردن)
function saveToLocalStorage(wpm, accuracy) {
  // ذخیره تاریخچه (History)
  const history = JSON.parse(localStorage.getItem("typingHistory") || "[]");
  history.push({ wpm, accuracy, date: new Date().toISOString() });
  if (history.length > 10) history.shift();
  localStorage.setItem("typingHistory", JSON.stringify(history));

  // ذخیره رکورد اصلی (High Score)
  const highScore = JSON.parse(
    localStorage.getItem("typingHighScore") || '{"wpm": 0, "accuracy": 0}',
  );

  if (wpm > highScore.wpm) {
    const newHigh = { wpm: wpm, accuracy: accuracy };
    localStorage.setItem("typingHighScore", JSON.stringify(newHigh));
    currentRecord = newHigh; // آپدیت کردن متغیر اصلی برای نمایش در صفحه
  } else {
    currentRecord = highScore; // استفاده از همان رکورد قبلی
  }
}

// ________________________________
function resetGame() {
  // توقف تایمر قبلی
  clearInterval(timerId);
  timerId = null;
  isTimerRunning = false;

  // ریست زمان
  timeLeft = 60;
  timerDisplay.textContent = toPersianDigits(timeLeft);

  // ریست ورودی
  textInput.removeAttribute("disabled");
  textInput.value = "";
  textInput.focus();

  // ریست آمار صفحه
  charsStat.textContent = "۰";
  progressBar.style.width = "0%";

  // پاک کردن رنگ کاراکترها
  chars.forEach((char) => {
    char.classList.remove("correct", "wrong");
  });
}

// ۴. تابع آپدیت کردن اعداد در صفحه اصلی
function updateMainUI(wpm, accuracy) {
  // آپدیت کردن اعداد مربوط به همین تست فعلی (اگر در HTML داری)
  const wpmDisplay = document.getElementById("wpmValue");
  const accDisplay = document.getElementById("accuracyValue");
  if (wpmDisplay) wpmDisplay.textContent = Number(wpm).toFixed(2);
  if (accDisplay) accDisplay.textContent = Number(accuracy).toFixed(2) + "%";

  if (wpmRecord) wpmRecord.textContent = Number(currentRecord.wpm).toFixed(2);
  if (accuracyRecord)
    accuracyRecord.textContent =
      Number(currentRecord.accuracy).toFixed(2) + "%";
}

// ۵. تابع نمایش مودال
function showResultModal(wpm, accuracy, characters) {
  const modal = document.getElementById("resultModal");
  const modalWpm = document.getElementById("modalWpm");
  const modalAcc = document.getElementById("modalAccuracy");
  const modalChars = document.getElementById("modalCharacters");

  if (!modal || !modalWpm || !modalAcc) return;

  const realChars = Math.min(textInput.value.length, textToType.length);

  modalWpm.textContent = Number(wpm).toFixed(2);
  modalAcc.textContent = Number(accuracy).toFixed(2) + "%";

  if (modalChars) {
    modalChars.textContent = toPersianDigits(characters);
  }

  modal.style.display = "flex";
}

// ۶. بستن مودال
document.getElementById("closeModalBtn")?.addEventListener("click", () => {
  document.getElementById("resultModal").style.display = "none";
});
document.getElementById("retryButton")?.addEventListener("click", () => {
  resetGame();
  document.getElementById("resultModal").style.display = "none";
});
document
  .getElementById("closeModalBtnBottom")
  ?.addEventListener("click", () => {
    document.getElementById("resultModal").style.display = "none";
  });

// ۷. لود اولیه (وقتی صفحه باز میشه، رکوردها رو از حافظه بیار و نشون بده)

// ________________________________________________________

// The main function App
function app() {
  start();
}

// Executing of the app
app();

// این کد باعث می‌شود با هر بار رفرش، رکوردها از حافظه خوانده و در صفحه نوشته شوند
window.addEventListener("DOMContentLoaded", () => {
  const rawData = localStorage.getItem("typingHighScore");
  const savedRecord = JSON.parse(rawData || '{"wpm": 0, "accuracy": 0}');

  if (wpmRecord) {
    // تبدیل به عدد و اعمال 2 رقم اعشار
    wpmRecord.textContent = Number(savedRecord.wpm).toFixed(0);
  }
  if (accuracyRecord) {
    // تبدیل به عدد و اعمال 2 رقم اعشار
    accuracyRecord.textContent = Number(savedRecord.accuracy).toFixed(2) + "%";
  }
});

// فرض کن این اعداد رو محاسبه کردی
// let myWpm = 50;
// let myAcc = 95;

// // فقط همین رو صدا بزن، بقیه کارها رو این تابع انجام میده
// finishGame(myWpm, myAcc);

// ________________________________________________________

// حالا در تابع پایان بازی خودت، اینطوری

/**
function loadInitialRecord() {
  const highScore = JSON.parse(
    localStorage.getItem("typingHighScore") || '{"wpm":0,"accuracy":0}',
  );

  if (wpmRecord) {
    wpmRecord.textContent = toPersianDigits(highScore.wpm);
  }

  if (accuracyRecord) {
    accuracyRecord.textContent = toPersianDigits(highScore.accuracy);
  }
}

// ذخیره رکورد جدید
function saveToLocalStorageAndRecord(accuracy, wpm) {
  const highScore = JSON.parse(
    localStorage.getItem("typingHighScore") || '{"wpm":0,"accuracy":0}',
  );

  // فقط اگر WPM جدید بهتر بود رکورد عوض شود
  if (wpm > highScore.wpm) {
    const newRecord = {
      wpm: Math.round(wpm),
      accuracy: Number(accuracy.toFixed(1)),
    };

    localStorage.setItem("typingHighScore", JSON.stringify(newRecord));

    if (wpmRecord) {
      wpmRecord.textContent = toPersianDigits(newRecord.wpm);
    }

    if (accuracyRecord) {
      accuracyRecord.textContent = toPersianDigits(newRecord.accuracy);
    }
  }
}

// هنگام لود صفحه رکورد را نمایش بده
loadInitialRecord();
 */
