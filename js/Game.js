class Game {
  constructor(phrase) {
    this.missed = 0;
    this.phrases = phrase;
    this.activePhrase = null;
    this.hintCounter = 3;
  }

  // Hides the overlay, selects one phrase randomly, displays boxes that represent each character
  startGame() {
    document.getElementById('overlay').style.display = 'none';
    this.activePhrase = this.getRandomPhrase();
    this.activePhrase.addPhraseToDisplay();
    this.hintCounter = 3;
    const hintBtn = document.querySelector('#hint-btn');
    hintBtn.innerText = `(${this.hintCounter}) Hint`;
  }

  // Creates a Phrase object, inserts a random phrase as argument
  getRandomPhrase() {
    const randomIndex = Math.floor(Math.random() * this.phrases.length);
    const randomPhrase = new Phrase(this.phrases[randomIndex].phrase);
    return randomPhrase;
  }

  // Reveal one random letter/ provide hint
  getHint() {
    if (this.hintCounter > 0) {
      let keyboardKeys = [];
      let randomletter, randbtn;
      const keyrow = document.getElementsByClassName('keyrow');
      const hintBtn = document.querySelector('#hint-btn');
      // Adds all keyboard buttons to an array
      Array.from(keyrow).forEach(keyrow =>
        Array.from(keyrow.children).forEach(key => keyboardKeys.push(key))
      );
      /* Randomly selects a letter from the phrase and if the selected letter 
    is already chosen it loops until it finds unselected key */
      do {
        const randomIndex = Math.floor(Math.random() * this.activePhrase.phrase.length);
        randomletter = this.activePhrase.phrase[randomIndex];
        randbtn = keyboardKeys.filter(key => key.innerText === randomletter)[0];
      } while (randbtn.className === 'chosen');
      // Filters the button whose text match the randomly chosen letter
      const randomButton = keyboardKeys.filter(key => key.innerText === randomletter)[0];
      this.handleInteraction(randomButton);
      this.hintCounter -= 1;
      hintBtn.innerText = `(${this.hintCounter}) Hint`;
    }
  }

  // Handles keyboard button clicks
  handleInteraction(button) {
    button.disabled = true;

    // Checks if selected letter is in the phrase
    if (this.activePhrase.checkLetter(button.textContent)) {
      button.className = 'chosen';
      this.activePhrase.showMatchedLetter(button.textContent);
    } else {
      button.className = 'wrong';
      this.removeLife();
    }

    // Checks if all letters of the phrase are revealed
    if (this.checkForWin()) {
      this.gameOver(false);
    }
  }

  // Triggers whenever the player gusses the wrong letter
  removeLife() {
    const heartImg = document.querySelectorAll('#scoreboard img');
    const heartImgArray = Array.from(heartImg);

    // Replaces one heart img at a time
    for (let heart of heartImgArray) {
      if (heart.getAttribute('src') === 'images/liveHeart.png') {
        this.missed += 1;
        heart.src = 'images/lostHeart.png';
        break;
      }
    }

    // If all 5 hearts have been used, it triggers the 'gameover' method
    if (this.missed === 5) {
      this.gameOver(true);
    }
  }

  // Checks if all letters of the phrase are revealed, which means the player has won
  checkForWin() {
    const phraseLI = document.querySelectorAll('#phrase li');
    const hiddenLI = Array.from(phraseLI).filter(li => li.classList.contains('hide'));
    return hiddenLI.length === 0;
  }

  // Triggers either when all lifes have been used or all letters of the phrase are revealed
  gameOver(lost) {
    const overlay = document.querySelector('#overlay');
    const gameOverMessage = document.querySelector('#game-over-message');
    const currentPhrase = document.querySelector('#active-phrase');

    // when all lifes have been used
    if (lost) {
      gameOverMessage.textContent = 'YOU LOST - TRY AGAIN!';
      currentPhrase.textContent = `The Phrase Was: "${this.activePhrase.phrase}"`;
      overlay.classList = 'lose';

      // when all letters of the phrase are revealed
    } else {
      gameOverMessage.textContent = 'YOU WON - CONGRATULATIONS!';
      currentPhrase.textContent = `The Phrase Was: "${this.activePhrase.phrase}"`;
      overlay.classList = 'win';
    }

    overlay.style.display = 'block';
  }

  // Resets the lives, the keyboard, and removes the old phrase
  resetGame() {
    // Removes the 'ul' element of the old phrase
    const phraseDiv = document.querySelector('#phrase');
    phraseDiv.removeChild(phraseDiv.firstElementChild);
    phraseDiv.appendChild(document.createElement('ul'));

    const keyboardButtons = document.querySelectorAll('#qwerty button');
    const heartImg = document.querySelectorAll('#scoreboard img');

    // Resets the keyboard buttons
    Array.from(keyboardButtons).forEach(button => {
      button.disabled = false;
      button.className = 'key';
    });

    // Resets the hears(lives)
    Array.from(heartImg).forEach(heart => {
      heart.src = 'images/liveHeart.png';
    });

    // Resets the lost lives count
    this.missed = 0;

    // Resets the active phrase message
    document.querySelector('#active-phrase').textContent = '';
  }
}
