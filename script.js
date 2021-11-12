/** @type{HTMLCanvasElement}*/

let wordsToGuess = [
    'Aberystwyth',
    'Merthyr Tydfil',
    'Port Talbot Parkway',
    'Rhoose Cardiff International Airport',
    'Fishguard Harbour',
    'Dyffryn Ardudwy'
]

const buttonArea = document.querySelector('.letter__buttons');
const wordArea = document.querySelector('.hangmanword');
const canvas = document.querySelector('.hangmancanvas');
const ctx = canvas.getContext('2d');
ctx.strokePath = 'black';
ctx.lineWidth = 5;
const letters = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase();
let currentLives = 8;
let currentStage = -1;
let wordToGuess;
let secretWord;
let word;
let wordIndex;

wordArea.textContent = secretWord;

const drawStage = (stage) => {
    switch (stage) {
        case 0: {
            ctx.fillRect(20, 20, 5, 200);
            break;
        }
        case 1: {
            ctx.fillRect(20, 20, 100, 5);
            break;
        }
        case 2: {
            ctx.fillRect(120, 20, 5, 20);
            break;
        }
        case 3: {
            ctx.beginPath();
            ctx.arc(123, 55, 15, 0, 2 * Math.PI, true);
            ctx.stroke();
            break;
        }
        case 4: {
            ctx.fillRect(120, 68, 5, 30);
            break; 
        }
        case 5: {
            ctx.fillRect(105, 80, 35, 5);
            break; 
        }
        case 6: {
            ctx.beginPath();
            ctx.moveTo(122, 95);
            ctx.lineTo(140, 110);
            ctx.stroke();
            break; 
        }
        case 7: {
            ctx.beginPath();
            ctx.moveTo(122, 95);
            ctx.lineTo(102, 110);
            ctx.stroke();
            break; 
        }
    }
}

const displayLetters = () => {
    const lettersArray = [...letters];
    const letterElements = lettersArray.map(letter =>
        `<button class="letter__btn" id="${letter}" onClick="checkLetter(${letter})">${letter}</button>`
    ).join('');
    buttonArea.innerHTML = letterElements;
}

const newWordToGuess = () => {
    if (wordsToGuess.length === 0) { 
        alert('NO MORE WORDS TO GUESS! GO OUTSIDE!');
    } else {
        wordToGuess = Math.floor(Math.random() * wordsToGuess.length);
        wordIndex = wordsToGuess.indexOf(wordsToGuess[wordToGuess]);
        console.log({wordIndex, wordsToGuess});
        word = wordsToGuess[wordToGuess].toUpperCase();
        secretWord = [...word].map(letter => letter !== ' ' ? '_' : ' ').join('');
        wordArea.innerHTML = secretWord;
    }
}

const revealLetter = (letter) => {
    const oldWord = [...secretWord]
    for (let i = 0; i < word.length; i++) {
        if (word[i] === letter) {
            oldWord[i] = letter
        }
    }
    secretWord = [...oldWord]
    wordArea.textContent = oldWord.join('')

    setTimeout(() => {
        if (!secretWord.includes('_')) {
            alert('YOU WIN');
            const newArray = wordsToGuess.filter(wd => wd.toUpperCase() !== word);
            wordsToGuess = [...newArray]
            resetGame();
        }
    }, 250);
}

const addFail = () => {
    currentLives--;
    currentStage++;
    if (currentLives == 0) {
        setTimeout(() => {
            alert('We lost them')
            resetGame();
        }, 250);
    }
    drawStage(currentStage);   
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
    currentLives = 8;
    currentStage = -1;
    buttonArea.querySelectorAll('*').forEach(n => n.remove());
    if (wordsToGuess.length > 0) { 
        displayLetters();
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

newWordToGuess();
displayLetters();