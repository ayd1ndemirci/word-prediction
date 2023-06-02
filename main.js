const axios = require('axios');

const wordList = [
  "araba",
  "minibüs",
  "okul",
  "kelime",
  "ülke",
  "türkiye",
  "elmas",
  "kazma",
  "güçlü",
  "eşya",
  "nodejs",
  "iyi"
];

let word = "";

function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * wordList.length);
  word = wordList[randomIndex];
}

function generateHint(guessedLetters) {
  let hint = "";
  for (const letter of word) {
    if (guessedLetters.includes(letter)) {
      hint += letter;
    } else {
      hint += "_";
    }
  }
  return hint;
}

async function startGame() {
  console.log("Kelime Tahmin Etme Oyunu\nNasıl oynanır?\nKod ana hafızasında rastgele bir kelime tutacak bu kelimenin içindeki harfleri yazarsan ipucu olarak gösterecek. Kelimeyi tahmin edersen kazanacaksın.");
  console.log("İyi Oyunlar!");

  getRandomWord();

  const guessedLetters = [];
  let hint = generateHint(guessedLetters);

  console.log("Kelime:", hint);

  while (true) {
    const guessedInput = await askForLetter();

    let guessedLetter = guessedInput.charAt(0).toLowerCase();
    let guessedWord = guessedInput.toLowerCase();

    if (guessedLetters.includes(guessedLetter) || guessedLetters.includes(guessedWord)) {
      console.log("Bu harfi zaten tahmin ettiniz. Lütfen başka bir tahminde bulunun.");
      continue;
    }

    guessedLetters.push(guessedLetter);
    guessedLetters.push(guessedWord);

    if (!word.includes(guessedLetter) && word !== guessedWord) {
      console.log("Kelimede böyle bir harf yok!");
    }

    hint = generateHint(guessedLetters);
    console.log("Kelime:", hint);

    if (!hint.includes("_")) {
      console.log("Tebrikler, Kelimeyi doğru tahmin ederek oyunu bitirdiniz. Yaşasın!");
      break;
    }
  }
}

function askForLetter() {
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question("Bir harf gir: ", (input) => {
      rl.close();
      resolve(input);
    });
  });
}

startGame();
