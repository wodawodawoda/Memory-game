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
const figure = document.createElement('figure');

function createGame(...icons) {
    shuffle(icons);
    const gameField = div.cloneNode();
    gameField.classList = 'game-field';
    gameField.id = 'game-field';
    for (let i = 0; i < icons.length; i++) {
        const card = div.cloneNode();
        const front = figure.cloneNode();
        const back = figure.cloneNode();
        card.appendChild(front);
        card.appendChild(back);
        card.classList = `game-field__card`;
        front.classList = `game-field__card--front`;
        back.classList = `game-field__card--back fa fa-${icons[i]}`;
        card.setAttribute('name', icons[i])
        gameField.appendChild(card);
    }
    document.body.appendChild(gameField)
}
createGame(...iconsDouble);

const $gameField = document.getElementById('game-field');
let counter = 0;
let last;
const open = 'game-field__card--open';
const correct = 'game-field__card--correct';
const incorrect = 'game-field__card--incorrect';
const reset = 'game-field__card--reset'

$gameField.addEventListener('click', getValues);


// WORKING DO NOT DELETE :::
function getValues(e) {
    if(last === e.target.parentNode) {return}
    counter++;
    e.target.parentNode.classList.add('flip');
    console.log(counter)
    if(last && counter % 2 === 0) {
        console.log('notempty');
        if(last.attributes.name.value === e.target.parentNode.attributes.name.value){
            console.log('match')
            e.target.nextElementSibling.classList.remove('game-field__card--back');
            e.target.nextElementSibling.classList.remove('game-field__card--back');
            e.target.nextElementSibling.classList.add('correct');
        } else {
            console.log('not match');
            setTimeout(() => {
                e.target.parentNode.classList.remove('flip');
                console.log(last);
                last.classList.remove('flip');
            }, 800)
        }
    } else {
        console.log('empty')
        last = e.target.parentNode
    }
    // setTimeout(() => {last = e.target.parentNode}, 800 ); //FIX FIX FIX

}

// $gameField.addEventListener('click', (e) => {
//     if(divStorage === e.target) {return}
//     counter++;
//         // divStorage.classList.remove(reset);
//         e.target.classList.remove(reset);
//     console.log(divStorage);
//     if(counter % 2 !== 0) {
//         e.target.classList.add(open);
//         divStorage = e.target
//     } else {
//         if(e.target.attributes.name.value === divStorage.attributes.name.value) {
//             e.target.classList.add(correct);
//             divStorage.classList.add(correct);
//         } else {
//             divStorage.classList.add(reset);
//             e.target.classList.add(reset);
//         }
//         e.target.classList.remove(open);
//         divStorage = undefined
//     }
// });
//SEPARATE FUNCTION TO COMPARE TWO COMPARE TWO VALUES

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
