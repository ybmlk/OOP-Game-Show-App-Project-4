/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
    constructor() {
        this.missed = 0;
        this.phrases = [
            { phrase: 'Keep it fun' },
            { phrase: 'Go for it' },
            { phrase: 'Now or never' },
            { phrase: 'Never look back' },
            { phrase: 'Change is good' }
        ];
        this.activePhrase = null;
    }

    startGame() {
        document.getElementById('overlay').style.display = 'none';

        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
    }

    getRandomPhrase() {
        const randIndex = Math.floor(Math.random() * this.phrases.length)
        return phrases.map(phr => phr.phrase)[randIndex]
    }

    handleInteraction(button) {
        button.display = true;

        if (this.activePhrase.checkLetter(button.textContent)) {

            button.className = 'chosen';
            this.activePhrase.showMatchedLetter(button.textContent)
        } else {

            button.className = 'wrong';
            this.removeLife();
        }

        if (this.checkForWin()) {

            this.gameOver(false);
        }
    }

    removeLife() {

        const heartImg = document.querySelectorAll('#scoreboard img');

        Array.from(heartImg).forEach(heart => {

            if (heart.getAttribute('src') === 'images/liveHeart.png') {

                this.missed += 1;
                heart.src = 'images/lostHeart.png';
                break;
            }
        })

        if (this.missed === 5) {
            this.gameOver(true);
        }

    }

    checkForWin() {

        const phraseLI = document.querySelectorAll('#phrase li');
        const hiddenLI = Array.from(phraseLI).filter(li => li.classList.contains('hide'))
        return hiddenLI === 0;
    }

    gameOver(lost) {

        const overlay = document.querySelector('#overlay');
        const gameOverMessage = document.querySelector('##game-over-message');

        if (lost) {
            gameOverMessage.textContent = 'YOU LOST - TRY AGAIN!';
            overlay.classList = 'lose';

        } else {
            gameOverMessage.textContent = 'YOU WON - CONGRATULATIONS!';
            overlay.classList = 'win';
        }

        overlay.style.display = 'block';
    }

    resetGame() {

        const phraseDiv = document.querySelector('#phrase');
        phraseDiv.removeChild(phraseDiv.firstElementChild);
        phraseDiv.appendChild(document.createElement('ul'));

        const keyboardButtons = document.querySelectorAll('#qwerty button');

        Array.from(keyboardButtons).forEach(button => {
            button.disabled = false;
            button.className = 'key';
        });

        const heartImg = document.querySelectorAll('#scoreboard img');

        Array.from(heartImg).forEach(heart => {
            heart.src = 'images/liveHeart.png';
        });

        this.missed = 0;

    }
}