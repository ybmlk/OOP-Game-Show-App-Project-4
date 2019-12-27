/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
    constructor() {
        this.missed = 0;
        this.phrases = [
            { phrase: 'keep it fun' },
            { phrase: 'go for it' },
            { phrase: 'now or never' },
            { phrase: 'never look back' },
            { phrase: 'change is good' }
        ];
        this.activePhrase = null;
    }

    // Hides the overlay, selects one phrase randomly, displays boxes that represent each character
    startGame() {
        document.getElementById('overlay').style.display = 'none';
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay()
    }

    // Creates a Phrase object, inserts a random phrase as argument
    getRandomPhrase() {
        const randomIndex = Math.floor(Math.random() * this.phrases.length)
        const randomPhrase = new Phrase(this.phrases[randomIndex].phrase);
        return randomPhrase;
    }

    // Handles keyboard button clicks
    handleInteraction(button) {
        button.disabled = true;

        // Checks if selected letter is in the phrase 
        if (this.activePhrase.checkLetter(button.textContent)) {
            button.className = 'chosen';
            this.activePhrase.showMatchedLetter(button.textContent)

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
        const hiddenLI = Array.from(phraseLI).filter(li => li.classList.contains('hide'))
        return hiddenLI.length === 0;
    }

    // Triggers either when all lifes have been used or all letters of the phrase are revealed
    gameOver(lost) {
        const overlay = document.querySelector('#overlay');
        const gameOverMessage = document.querySelector('#game-over-message');
        const currentPhrase = document.querySelector('#active-phrase')

        // when all lifes have been used
        if (lost) {
            gameOverMessage.textContent = 'YOU LOST - TRY AGAIN!';
            currentPhrase.textContent = `The Phrase Was: "${this.activePhrase.phrase}"`
            overlay.classList = 'lose';

        // when all letters of the phrase are revealed
        } else {
            gameOverMessage.textContent = 'YOU WON - CONGRATULATIONS!';
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