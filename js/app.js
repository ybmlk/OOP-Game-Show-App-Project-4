/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

let game = new Game();
const startGameBtn = document.querySelector('#btn__reset');
const keyboardDiv = document.querySelector('#qwerty');

startGameBtn.addEventListener('click', () => {

    game.resetGame();
    game.startGame();
});

keyboardDiv.addEventListener('click', event => {
    const button = event.target;

    if (button.getAttribute('class') === 'key') {
        game.handleInteraction(button);
    }
});

