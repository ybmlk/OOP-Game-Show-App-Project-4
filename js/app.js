// Global Declarations
let phrase, game;
const startGameBtn = document.querySelector('#btn__reset');
const easyBtn = document.querySelector('#btn__easy');
const mediumBtn = document.querySelector('#btn__medium');
const hardBtn = document.querySelector('#btn__hard');
const keyboardDiv = document.querySelector('#qwerty');
const hintBtn = document.querySelector('#hint-btn');

// When called fetches words/phrases from the url and creates a new game object
const fetchApi = url => {
  fetch(url)
    .then(data => data.json())
    .then(data => (phrase = data.map(item => ({ phrase: item.word }))))
    .then(data => (game = new Game(data)))
    .catch(err => console.log(err));
};

// When easy button is clicked, it fetches 4 letter words
easyBtn.addEventListener('click', () => {
  // length of the words is between 3 - 4
  const wordLength = Math.floor(Math.random() * 2) + 3;
  const url = `http://api.datamuse.com/words?sp=${'?'.repeat(wordLength)}&max=100`;
  fetchApi(url);
  easyBtn.className = 'active';
  mediumBtn.className = '';
  hardBtn.className = '';
});

// When medium button is clicked, it fetches 7 letter words
mediumBtn.addEventListener('click', () => {
  // length of the words is between 5 - 7
  const wordLength = Math.floor(Math.random() * 3) + 5;
  const url = `http://api.datamuse.com/words?sp=${'?'.repeat(wordLength)}&max=100`;
  fetchApi(url);
  easyBtn.className = '';
  mediumBtn.className = 'active';
  hardBtn.className = '';
});

// When hard button is clicked, it fetches 12 letter words
hardBtn.addEventListener('click', () => {
  // length of the words is between 8 - 11
  const wordLength = Math.floor(Math.random() * 4) + 8;
  const url = `http://api.datamuse.com/words?sp=${'?'.repeat(wordLength)}&max=100`;
  fetchApi(url);
  easyBtn.className = '';
  mediumBtn.className = '';
  hardBtn.className = 'active';
});

// When clicked it resets  the game, and start a new one
startGameBtn.addEventListener('click', () => {
  if (game) {
    game.resetGame();
    game.startGame();
    document.getElementById('select_diff').style.display = 'none';
  } else {
    document.getElementById('select_diff').style.display = 'block';
  }
});

// Listens to the clicked buttons and calles 'handleInteraction()'
keyboardDiv.addEventListener('click', event => {
  const button = event.target;

  if (button.className === 'key') {
    game.handleInteraction(button);
  }
});

// Allows players to type their guesses
window.addEventListener('keydown', event => {
  // Represents the key that's just been typed
  const key = String.fromCharCode(event.keyCode).toLowerCase();
  // Represents all the onscreen keyboard buttons
  const buttons = document.querySelectorAll('#qwerty button');
  // Filters the buttons. Only the button that matches the typed key is left
  const button = Array.from(buttons).filter(chr => chr.textContent === key)[0];

  // Calls 'handleInteraction()' on the button
  if (button.className === 'key') {
    game.handleInteraction(button);
  }
});

// Reveall one letter when hint button is clicked
hintBtn.addEventListener('click', () => {
  game.getHint();
});
