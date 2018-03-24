import '../sass/GameField.sass'

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
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

function createGame(...icons) {
    shuffle(icons);
    const container = document.createDocumentFragment();
    for (let i = 0; i < icons.length; i++) {
        const card = div.cloneNode();
        card.classList = `game-field__card fa fa-${icons[i]}`;
        card.setAttribute('name', icons[i])
        container.appendChild(card);
    }
    $gameField.appendChild(container);
    $gameField.addEventListener('click', getValues);
}
createGame(...iconsDouble);


// GAMEPLAY
let counter = 0;
let matchCounter = 0;
let last;
const $movesCounter = document.getElementById('movesCounter');
const $stars = document.getElementsByClassName('score-panel__star');

function getValues(e) {
    if(e.target.id === 'game-field') {return}
    if(counter % 2 !== 0 && last === e.target) {return}
    counter++;
    $movesCounter.innerText = Math.floor(counter / 2) + ' Moves';
    if(counter === 6 || counter === 12 || counter === 20) {
        $stars[$stars.length - 1].classList.add('hide');
    }
    e.target.classList.remove('shadow--wrong');
    e.target.classList.add('flip');
    if(last && counter % 2 === 0) {
        compare(last, e);
    } else {
        last = e.target
    }
}

function compare(last, actual) {
    if (last.attributes.name.value === actual.target.attributes.name.value) {
        matchCounter++;
        console.log('match');
        actual.target.classList.add('shadow--match');
        last.classList.add('shadow--match');
        if(matchCounter === icons.length) {endGame()}
    } else {
        console.log('not match');
        actual.target.classList.add('shadow--wrong');
        last.classList.add('shadow--wrong');
        setTimeout(() => {
            actual.target.classList.remove('flip');
            last.classList.remove('flip');
        }, 500)
    }
}

// END GAME
function endGame() {
    console.log('end')
    const modal = document.createElement('div');
    modal.classList = 'modal';
    const header = document.createElement('h1');
    header.innerText = 'YOU WON';
    const btn = document.createElement('button');
    btn.innerText = 'NEW GAME';
    btn.onclick = newGame;
    const text = document.createElement('p');
    text.innerText = 'Great work!';
    modal.appendChild(header);
    modal.appendChild(btn);
    modal.appendChild(text);
    function newGame() {
        restart();
        modal.classList.add('hide');
        setTimeout(() => {
            modal.remove();
        }, 500)
    }
    document.body.appendChild(modal)
}


// RESET
const $restart = document.getElementById('restart');
$restart.addEventListener('click', restart)
function restart() {
    const $gameField = document.getElementById('game-field');
    counter = 0;
    matchCounter = 0;
    last = undefined; // I had to use undefined to clear this variable to initial state
    const starsArray = [...$stars];
    starsArray.forEach(starsReset);
    function starsReset(item) {item.classList.remove('hide')};
    $gameField.innerHTML = "";
    createGame(...iconsDouble);
}