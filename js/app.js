import { dictionary } from './dictionary.js';

const wordLength = 5;
const attempts = 6;
let attemptsLeft = attempts;
let nextSymbol = 0;
let correctWord = dictionary[Math.floor(Math.random() * dictionary.length)];
let symbolsArr = [];

function gameField() {
  let playingField = document.querySelector('#wordle-game');
  let i = 0;
  while (i < attempts) {
    let row = document.createElement('section');
    row.className = 'game-row';
    let j = 0;
    while (j < wordLength) {
      let cell = document.createElement('section');
      cell.className = 'game-cell';
      cell.style.backgroundColor = 'rgb(249, 237, 216)';
      row.appendChild(cell);
      j++;
    }
    playingField.appendChild(row);
    i++;
  }
}

gameField();

const check = document.getElementById('check');
check.addEventListener('click', checkLetters);

const reset = document.getElementById('reset');
reset.addEventListener('click', resetPressed);

function resetPressed() {
  let cell = document.querySelectorAll('.filled-cell');
  for (let item of cell) {
    item.innerHTML = '';
    item.style.backgroundColor = 'rgb(249, 237, 216)';
  }
  nextSymbol = 0;
  symbolsArr = [];
  attemptsLeft = attempts;
  correctWord = dictionary[Math.floor(Math.random() * dictionary.length)];
}

document.addEventListener('keyup', (event) => {
  if (attemptsLeft === 0) {
    return;
  }

  let keyPressed = event.key.toString();

  let letter = keyPressed.match(/[А-яа-яЇїІіЄє]/gi);
  if (!letter || letter.length > 1) {
    return;
  } else {
    addSymbol(keyPressed);
  }
});

function checkLetters() {
  let row = document.querySelectorAll('.game-row')[attempts - attemptsLeft];
  let guessWord = '';
  let rightWord = correctWord.split('');

  for (const value of symbolsArr) {
    guessWord += value;
  }

  if (!dictionary.includes(guessWord) || guessWord.length < wordLength) {
    alert('Word not in list!');

    let row = document.querySelectorAll('.game-row')[attempts - attemptsLeft];
    let cell = row.children;
    for (let item of cell) {
      item.innerHTML = '';
      item.style.backgroundColor = 'rgb(249, 237, 216)';
      symbolsArr.pop();
      nextSymbol -= 1;
    }
    return;
  }

  for (let i = 0; i < wordLength; i++) {
    let colorCell = '';
    let cell = row.children[i];

    let symbolIndex = rightWord.indexOf(symbolsArr[i]);
    if (symbolIndex === -1) {
      colorCell = 'rgb(206, 200, 200)';
    } else {
      if (symbolsArr[i] === rightWord[i]) {
        colorCell = 'rgb(68, 172, 12)';
      } else {
        colorCell = 'rgb(248, 238, 90)';
      }
      rightWord[symbolIndex] = '#';
    }
    cell.style.backgroundColor = colorCell;
  }

  if (guessWord === correctWord) {
    alert('Congratulations! You won.');
    attemptsLeft = 0;
    return;
  } else {
    attemptsLeft -= 1;
    symbolsArr = [];
    nextSymbol = 0;

    if (attemptsLeft === 0) {
      alert('Game over!');
    }
  }
}

function addSymbol(keyPressed) {
  if (nextSymbol < wordLength) {
    check.setAttribute('disabled', true);
  }
  keyPressed = keyPressed.toLowerCase();
  let row = document.querySelectorAll('.game-row')[attempts - attemptsLeft];
  let cell = row.children[nextSymbol];
  cell.textContent = keyPressed;
  cell.classList.add('filled-cell');
  symbolsArr.push(keyPressed);
  nextSymbol += 1;
  if (nextSymbol === wordLength) {
    check.removeAttribute('disabled');
    return;
  }
}
