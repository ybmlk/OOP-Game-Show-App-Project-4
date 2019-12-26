/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
    constructor(phrase) {
        this.phrase = phrase;
    }

    addPhraseToDisplay() {
        const characters = this.phrase.split('');
        const phraseUl = document.querySelector('#phrase ul');

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

    checkLetter(letter) {

        const match = this.phrase.split('').find(character => character === letter);

        if (match !== undefined) {
            return true
        } else {
            return false
        }
    }

    showMatchedLetter(letter) {

        const phraseLi = document.querySelectorAll('#phrase li')

        Array.from(phraseLi).forEach(li => {

            if (li.textContent === letter) {
                li.className = 'show';
            }
        })

    }
}