/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

// Global Declarations
const game = new Game();
const startGameBtn = document.querySelector('#btn__reset');
const keyboardDiv = document.querySelector('#qwerty');

// When clicked it resets  the game, and start a new one
startGameBtn.addEventListener('click', () => {
    game.resetGame();
    game.startGame();
});

// Listens to the clicked buttons and calles 'handleInteraction()'
keyboardDiv.addEventListener('click', event => {
    const button = event.target;

    if (button.className === 'key') {
        game.handleInteraction(button);
    }
});

