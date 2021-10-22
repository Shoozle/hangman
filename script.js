const wordsToGuess = [
    'Aberystwyth',
    'Merthyr Tydfil',
    'Port Talbot Parkway',
    'Rhoose Cardiff International Airport',
    'Fishguard Harbour',
    'Dyffryn Ardudwy'
]

const buttonArea = document.querySelector('.letter__buttons');
const wordArea = document.querySelector('.hangmanword');
const hangmanLivesArea = document.querySelector('.hangmanlives');
const letters = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase();
let currentLives = 6;
let wordToGuess;
let secretWord;
let word;

hangmanLivesArea.textContent = currentLives;
wordArea.textContent = secretWord;

const displayLetters = () => {
    const lettersArray = [...letters];
    const letterElements = lettersArray.map(letter => 
        `<button class="letter__btn" id="${letter}" onClick="checkLetter(${letter})">${letter}</button>`
    ).join('');
    buttonArea.innerHTML = letterElements;
}

const newWordToGuess = () => {
    wordToGuess = Math.floor(Math.random() * 6);
    word = wordsToGuess[wordToGuess].toUpperCase();
    secretWord = [...word].map(letter => letter !== ' ' ? '_' : ' ').join('');
    wordArea.innerHTML = secretWord;
}

const revealLetter = (letter) => {
    const oldWord = [...secretWord]
    for (let i=0; i <word.length; i++) {
        if (word[i] === letter) {
            oldWord[i] = letter
        }
    }
    secretWord = [...oldWord]
    wordArea.textContent = oldWord.join('')

    setTimeout(() => {
        if (!secretWord.includes('_')) {
            alert('YOU WIN')
        }
    }, 250);
}

const addFail = () => {
    currentLives--;

    if (currentLives == 0) {
        setTimeout(() => {
            alert('You died')
            resetGame();
        }, 250);
    }

    hangmanLivesArea.textContent = currentLives;
}

const checkLetter = (letter) => {
    letter.setAttribute("disabled", "true")
    letter = letter.innerHTML;
    const wordArray = [...word]
    if (wordArray.includes(letter)) {
        revealLetter(letter)
    } else {
        addFail();
    }
    
}

const resetGame = () => {
    newWordToGuess();
    currentLives = 6;
    hangmanLivesArea.textContent = currentLives;
    buttonArea.querySelectorAll('*').forEach(n => n.remove());
    displayLetters();
}

newWordToGuess();
displayLetters();