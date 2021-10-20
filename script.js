const wordsToGuess = [
    'Hidetaka Miyazaki',
    'Shu Takumi',
    'Hideki Kamiya',
    'Hideaki Itsuno',
    'Shinji Mikami',
    'Tetsuya Takahashi'
]

const buttonArea = document.querySelector('.letter__buttons');
const wordArea = document.querySelector('.hangmanword');
const letters = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase();
let currentLives = 6;
let wordToGuess = Math.floor(Math.random() * 6);
let secretWord = [...wordsToGuess[wordToGuess]].map(letter => letter !== ' ' ? '_' : ' ').join('');
let word = wordsToGuess[wordToGuess].toUpperCase();

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
}

const addFail = () => {
    console.log('you failed')
}

const checkLetter = (letter) => {
    letter = letter.innerHTML;
    const wordArray = [...word]
    if (wordArray.includes(letter)) {
        revealLetter(letter)
    } else {
        addFail();
    }
}

const restGame = () => {
    wordToGuess = Math.floor(Math.random() * 6);
    newWordToGuess();
    currentLives = 6;
}

displayLetters();