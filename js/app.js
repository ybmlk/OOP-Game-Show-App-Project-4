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
    };
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
    };
});