import '../sass/app.sass';

// Shuffle function from http://stackoverflow.com/a/2450976
// @description Shuffle items in array
// @param {array} array - array to shuffle
// @return randomized array
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

let icons = [
    'anchor',
    'leaf',
    'diamond',
    'bomb',
    'bolt',
    'bicycle',
    'paper-plane-o',
    'cube'
];
let iconsDouble = [...icons, ...icons];

// CREATE BOARD
const div = document.createElement('div');
const figure = document.createElement('figure');
const $gameField = document.getElementById('game-field');

// @description Append new cards in game field
// @param {array} icons - Array of all cards icons in game
function createGame(...icons) {
    shuffle(icons);
    const container = document.createDocumentFragment();
    for (let i = 0; i < icons.length; i++) {
        const card = div.cloneNode();
        card.classList = `game-field__card fa fa-${icons[i]}`;
        card.setAttribute('name', icons[i]);
        container.appendChild(card);
    }
    $gameField.appendChild(container);
    $gameField.addEventListener('click', getValues);
}
createGame(...iconsDouble);


// GAMEPLAY
let counter = 0;
let matchCounter = 0;
let last; // Last card choice

const $movesCounter = document.getElementById('movesCounter');
const $stars = document.getElementsByClassName('score-panel__star');

// @description Track value of clicked card
// @param {object} e - Click event response
function getValues(e) {
    if(e.target.id === 'game-field') {return} // Prevent click on #game-field
    if(counter % 2 !== 0 && last === e.target) {return} // Prevent second click on the same card
    counter++;
    if(counter === 1) {timer = setInterval(int, 1000)} //Run timer after first click on card
    $movesCounter.innerText = Math.floor(counter / 2); // Display only 'pair' flip count
    if(counter === 20) {
        $stars[$stars.length - 1].classList.add('hide');
    } else if(counter === 40) {
        $stars[$stars.length - 2].classList.add('hide');
    }
    e.target.classList.remove('shadow--wrong');
    e.target.classList.add('flip');
    if(last && counter % 2 === 0) {
        compare(last, e);
    } else {
        last = e.target
    }
}
// TIMER
const $timer = document.getElementById('timer');
let timer;
let time = 0;

// @description Timer interval function
const int = () => {
  time++;
  $timer.innerText = time;
};

// @description Compare two cards
// @param {HTMLnode} last chosen card
// @param {object} e - Click event response
function compare(last, actual) {
    if (last.attributes.name.value === actual.target.attributes.name.value) {
        // Match
        matchCounter++;
        actual.target.classList.add('shadow--match');
        last.classList.add('shadow--match');
        if(matchCounter === icons.length) {endGame()}
    } else {
        // Not match
        actual.target.classList.add('shadow--wrong');
        last.classList.add('shadow--wrong');
        // Set timeout to enable second card to flip
        setTimeout(() => {
            actual.target.classList.remove('flip');
            last.classList.remove('flip');
        }, 500)
    }
}

// END GAME

// @description Display modal at the end of the game
function endGame() {
    const modal = document.createElement('div');
    const header = document.createElement('h1');
    const btn = document.createElement('button');
    const text = document.createElement('p');
    const endTime = document.createElement('p');
    const star = document.getElementsByClassName('score-panel__stars')[0].cloneNode();
    modal.classList = 'modal';
    header.innerText = 'YOU WON';
    btn.classList = 'modal__btn';
    btn.innerText = 'NEW GAME';
    btn.onclick = newGame;
    text.innerText = 'Great work!';
    endTime.innerText = `Your time: ${time}`;
    modal.appendChild(header);
    modal.appendChild(btn);
    modal.appendChild(text);
    modal.appendChild(endTime);
    for (let i = 0; i < $stars.length; i++) {
      star.appendChild($stars[i].cloneNode());
    }
    modal.appendChild(star);
    function newGame() {
        restart();
        modal.classList.add('hide');
        // Set timeout for smooth fade out animation described in 'hide' CSS class
        setTimeout(() => {
            modal.remove();
        }, 500)
    }
    document.body.appendChild(modal)
}

// RESET
const $restart = document.getElementById('restart');
$restart.addEventListener('click', restart);

// @description Reset timer, variables and create new cards in game field
function restart() {
    clearInterval(timer);
    const $gameField = document.getElementById('game-field');
    counter = 0;
    matchCounter = 0;
    time = 0;
    last = undefined; // I had to use undefined to clear this variable to initial state
    $movesCounter.innerText = '0';
    $timer.innerText = '0';
    const starsArray = [...$stars]; // Change DOM node list into Array for easier loop
    starsArray.forEach(starsReset);
    function starsReset(item) {item.classList.remove('hide')}
    $gameField.innerHTML = "";
    createGame(...iconsDouble);
}