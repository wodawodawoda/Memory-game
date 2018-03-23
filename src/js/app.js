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

// SHuffle ES6
// function shuffleArray(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//         let j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array;
// }

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

const div = document.createElement('div');

function createGame(...icons) {
    shuffle(icons);
    const gameField = div.cloneNode();
    gameField.classList = 'game-field';
    gameField.id = 'game-field';
    for (let i = 0; i < icons.length; i++) {
        const card = div.cloneNode();
        card.classList = `game-field__card fa fa-${icons[i]}`;
        card.setAttribute('name', icons[i])
        gameField.appendChild(card);
    }
    document.body.appendChild(gameField)
}
createGame(...iconsDouble);

const $gameField = document.getElementById('game-field');
let counter = 0;
let divStorage = {};
const open = 'game-field__card--open';
const correct = 'game-field__card--correct';
const incorrect = 'game-field__card--incorrect';


$gameField.addEventListener('click', (e) => {
    counter++;
    // if(counter % 2 !== 0 && counter > 2) {divStorage = {}} else {divStorage = e.target};
    if(counter % 2 !== 0) {divStorage = e.target}
    else {
        if(e.target.attributes.name.value === divStorage.attributes.name.value) {
            e.target.classList.add(correct);
            divStorage.classList.add(correct);
        }
        divStorage = {}
    }
    console.log(divStorage)

});

// $gameField.addEventListener('click', (e) => {
//     console.log(divStorage)
//     if(e.target.id === 'game-field' || e.target === divStorage) return;
//     console.log('click')
//     counter++;
//     e.target.classList.add(open);
//     if(e.target.attributes.name.value === divStorage.attributes.name.value) {
//         e.target.classList.add(correct);
//         divStorage.classList.add(correct);
//     }
//     divStorage = e.target
// });

// e.target.classList.add(reset);
// if(counter % 2 === 0 && name === nameStorage) {
//     e.target.classList.add(correct);
//     divStorage.classList.add(correct);
//     divStorage = ''
// } else if (counter % 2 === 0) {
//     e.target.classList.remove(open);
//     divStorage.classList.remove(open);
//     divStorage = ''
// }
