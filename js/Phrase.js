/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
    constructor(phrase) {
        this.phrase = phrase;
    }

    // Displays empty boxes which represent each chracter in a phrase 
    addPhraseToDisplay() {
        const characters = this.phrase.split('');
        const phraseUl = document.querySelector('#phrase ul');

        // loops through each chracter in a phrase and creates an 'li' element for eachone
        characters.forEach(character => {
            const li = document.createElement('li');

            if (character === ' ') {
                li.className = 'space';
            } else {
                li.className = `hide letter ${character}`
                li.textContent = `${character}`
            }
            phraseUl.appendChild(li);
        })

    }

    // Checks if the pharse contains the letter selected by the player
    checkLetter(letter) {
        const match = this.phrase.split('').find(character => character === letter);

        if (match !== undefined) {
            return true
        } else {
            return false
        }
    }

    // Displays letters on the board that are correctly selected by the player
    showMatchedLetter(letter) {
        const phraseLi = document.querySelectorAll('#phrase li')

        Array.from(phraseLi).forEach(li => {

            if (li.textContent === letter) {
                li.className = 'show';
            }
        })

    }
}