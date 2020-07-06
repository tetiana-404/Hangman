const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const finalMessageRevealWord = document.getElementById('final-message-reveal-word');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');

const wordsContentSelect = document.getElementById('wordsContent');
let selectWordGroup = wordsContentSelect.value;
let words = ['butterfly', 'chicken', 'rabbit', 'crocodile'];
let selectedWord = words[Math.floor(Math.random() * words.length)];

const figureParts = document.querySelectorAll('.figure-part');

// Init score
let score = 0;

// Init time
let time = 0;

let playable = true;

// Start counting
const timeInterval = setInterval(updateTime, 1000);

const correctLetters = [];
const wrongLetters = [];


function wordsContentChange() {
    time = 0;
    selectWordGroup = wordsContentSelect.value;

    if (selectWordGroup == "animals") {
        words = ['butterfly', 'chicken', 'rabbit', 'crocodile'];
    }
    else if (selectWordGroup == "food") {
        words = ['hamburger', 'chocolate', 'bananas', 'eggs'];
    }
    else if (selectWordGroup == "body") {
        words = ['teeth', 'finger', 'head', 'shoulder'];
    }
    else if (selectWordGroup == "nature") {
        words = ['rainbow', 'river', 'clouds', 'tornado'];
    }
    else if (selectWordGroup == "music") {
        words = ['application', 'programming', 'interface', 'wizard'];
    }
    selectedWord = words[Math.floor(Math.random() * words.length)];
    document.querySelector(".main-game").classList.remove("hidden");
    document.querySelector(".settings").classList.add("hidden");

}
// Show hidden word
function displayWord() {
    wordEl.innerHTML = `
    ${selectedWord
            .split('')
            .map(
                letter => `
          <span class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
          </span>
        `
            )
            .join('')}
  `;

    const innerWord = wordEl.innerText.replace(/[ \n]/g, '');

    if (innerWord === selectedWord) {
        finalMessage.innerText = 'Congratulations! You won! 😃';
        popup.style.display = 'flex';

        playable = false;
    }
    updateTime();
}

// Update the wrong letters
function updateWrongLettersEl() {
    // Display wrong letters
    wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;

    // Display parts
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if (index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });

    // Check if lost
    if (wrongLetters.length === figureParts.length) {
        finalMessage.innerText = 'Unfortunately you lost. 😕';
        finalMessageRevealWord.innerText = `...the word was: ${selectedWord}`;
        popup.style.display = 'flex';

        playable = false;
    }
}

// Show notification
function showNotification() {
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// Keydown letter press
window.addEventListener('keydown', e => {
    if (playable) {
        if (e.keyCode >= 65 && e.keyCode <= 90) {
            const letter = e.key.toLowerCase();

            if (selectedWord.includes(letter)) {
                if (!correctLetters.includes(letter)) {
                    correctLetters.push(letter);
                    updateScorePlus();
                    displayWord();
                } else {
                    showNotification();
                }
            } else {
                if (!wrongLetters.includes(letter)) {
                    wrongLetters.push(letter);
                    updateScoreMinus();
                    updateWrongLettersEl();
                } else {
                    showNotification();
                }
            }
        }
    }
});

// Restart game and play again
playAgainBtn.addEventListener('click', () => {
    playable = true;

    //  Empty arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);

    document.querySelector(".main-game").classList.add("hidden");
    document.querySelector(".settings").classList.remove("hidden");
    //wordsContentChange();

    //selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();

    updateWrongLettersEl();

    popup.style.display = 'none';
});

// Update score
function updateScorePlus() {
    score += 10;
    scoreEl.innerHTML = score;
}
function updateScoreMinus() {
    if (score > 0) {
        score -= 5;
        scoreEl.innerHTML = score;
    }
}

// Update time
function updateTime() {
    time++;
    timeEl.innerHTML = time + 's';
}

wordsContentSelect.addEventListener('change', wordsContentChange);
displayWord();