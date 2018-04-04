/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n__webpack_require__(/*! ../sass/app.sass */ \"./src/sass/app.sass\");\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n// Shuffle function from http://stackoverflow.com/a/2450976\nfunction shuffle(array) {\n    var currentIndex = array.length,\n        temporaryValue = void 0,\n        randomIndex = void 0;\n    while (currentIndex !== 0) {\n        randomIndex = Math.floor(Math.random() * currentIndex);\n        currentIndex -= 1;\n        temporaryValue = array[currentIndex];\n        array[currentIndex] = array[randomIndex];\n        array[randomIndex] = temporaryValue;\n    }\n    return array;\n}\n\nvar icons = ['anchor', 'leaf', 'diamond', 'bomb', 'bolt', 'bicycle', 'paper-plane-o', 'cube'];\nvar iconsDouble = [].concat(icons, icons);\n\n// CREATE BOARD\nvar div = document.createElement('div');\nvar figure = document.createElement('figure');\n\nvar $gameField = document.getElementById('game-field');\n\nfunction createGame() {\n    for (var _len = arguments.length, icons = Array(_len), _key = 0; _key < _len; _key++) {\n        icons[_key] = arguments[_key];\n    }\n\n    shuffle(icons);\n    var container = document.createDocumentFragment();\n    for (var i = 0; i < icons.length; i++) {\n        var card = div.cloneNode();\n        card.classList = 'game-field__card fa fa-' + icons[i];\n        card.setAttribute('name', icons[i]);\n        container.appendChild(card);\n    }\n    $gameField.appendChild(container);\n    $gameField.addEventListener('click', getValues);\n}\ncreateGame.apply(undefined, _toConsumableArray(iconsDouble));\n\n// GAMEPLAY\nvar counter = 0;\nvar matchCounter = 0;\nvar last = void 0; // Last card choice\n\nvar $movesCounter = document.getElementById('movesCounter');\nvar $stars = document.getElementsByClassName('score-panel__star');\nfunction getValues(e) {\n    console.log(counter);\n    if (e.target.id === 'game-field') {\n        return;\n    } // Prevent click on #game-field\n    if (counter % 2 !== 0 && last === e.target) {\n        return;\n    } // Prevent second click on the same card\n    counter++;\n    if (counter === 1) {\n        timer = setInterval(int, 1000);\n    } //Run timer after first click on card\n    $movesCounter.innerText = Math.floor(counter / 2); // Display only 'pair' flip count\n    if (counter === 20) {\n        $stars[$stars.length - 1].classList.add('hide');\n    } else if (counter === 40) {\n        $stars[$stars.length - 2].classList.add('hide');\n    }\n    e.target.classList.remove('shadow--wrong');\n    e.target.classList.add('flip');\n    if (last && counter % 2 === 0) {\n        compare(last, e);\n    } else {\n        last = e.target;\n    }\n}\n\nfunction compare(last, actual) {\n    console.log($stars[0]);\n    if (last.attributes.name.value === actual.target.attributes.name.value) {\n        // Match\n        matchCounter++;\n        actual.target.classList.add('shadow--match');\n        last.classList.add('shadow--match');\n        if (matchCounter === icons.length) {\n            endGame();\n        }\n    } else {\n        // Not match\n        actual.target.classList.add('shadow--wrong');\n        last.classList.add('shadow--wrong');\n        // Set timeout to enable second card to flip\n        setTimeout(function () {\n            actual.target.classList.remove('flip');\n            last.classList.remove('flip');\n        }, 500);\n    }\n}\n\n// TIMER\nvar $timer = document.getElementById('timer');\nvar timer = void 0;\nvar time = 0;\nvar int = function int() {\n    time++;\n    $timer.innerText = time;\n};\n\n// END GAME\nfunction endGame() {\n    var modal = document.createElement('div');\n    var header = document.createElement('h1');\n    var btn = document.createElement('button');\n    var text = document.createElement('p');\n    var endTime = document.createElement('p');\n    var star = document.getElementsByClassName('score-panel__stars')[0].cloneNode();\n    console.log(star);\n    modal.classList = 'modal';\n    header.innerText = 'YOU WON';\n    btn.classList = 'modal__btn';\n    btn.innerText = 'NEW GAME';\n    btn.onclick = newGame;\n    text.innerText = 'Great work!';\n    endTime.innerText = 'Your time: ' + time;\n    modal.appendChild(header);\n    modal.appendChild(btn);\n    modal.appendChild(text);\n    modal.appendChild(endTime);\n    for (var i = 0; i < $stars.length; i++) {\n        star.appendChild($stars[i].cloneNode());\n    }\n    modal.appendChild(star);\n    function newGame() {\n        restart();\n        modal.classList.add('hide');\n        // Set timeout for smooth fade out animation described in 'hide' CSS class\n        setTimeout(function () {\n            modal.remove();\n        }, 500);\n    }\n    document.body.appendChild(modal);\n}\n\n// RESET\nvar $restart = document.getElementById('restart');\n$restart.addEventListener('click', restart);\n\nfunction restart() {\n    clearInterval(timer);\n    var $gameField = document.getElementById('game-field');\n    counter = 0;\n    matchCounter = 0;\n    time = 0;\n    last = undefined; // I had to use undefined to clear this variable to initial state\n    $movesCounter.innerText = '0';\n    $timer.innerText = '0';\n    var starsArray = [].concat(_toConsumableArray($stars)); // Change DOM node list into Array for easier loop\n    starsArray.forEach(starsReset);\n    function starsReset(item) {\n        item.classList.remove('hide');\n    }\n    $gameField.innerHTML = \"\";\n    createGame.apply(undefined, _toConsumableArray(iconsDouble));\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvYXBwLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3NyYy9qcy9hcHAuanM/MDM1NCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4uL3Nhc3MvYXBwLnNhc3MnXG5cbi8vIFNodWZmbGUgZnVuY3Rpb24gZnJvbSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNDUwOTc2XG5mdW5jdGlvbiBzaHVmZmxlKGFycmF5KSB7XG4gICAgbGV0IGN1cnJlbnRJbmRleCA9IGFycmF5Lmxlbmd0aCwgdGVtcG9yYXJ5VmFsdWUsIHJhbmRvbUluZGV4O1xuICAgIHdoaWxlIChjdXJyZW50SW5kZXggIT09IDApIHtcbiAgICAgICAgcmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjdXJyZW50SW5kZXgpO1xuICAgICAgICBjdXJyZW50SW5kZXggLT0gMTtcbiAgICAgICAgdGVtcG9yYXJ5VmFsdWUgPSBhcnJheVtjdXJyZW50SW5kZXhdO1xuICAgICAgICBhcnJheVtjdXJyZW50SW5kZXhdID0gYXJyYXlbcmFuZG9tSW5kZXhdO1xuICAgICAgICBhcnJheVtyYW5kb21JbmRleF0gPSB0ZW1wb3JhcnlWYWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGFycmF5O1xufVxuXG5sZXQgaWNvbnMgPSBbXG4gICAgJ2FuY2hvcicsXG4gICAgJ2xlYWYnLFxuICAgICdkaWFtb25kJyxcbiAgICAnYm9tYicsXG4gICAgJ2JvbHQnLFxuICAgICdiaWN5Y2xlJyxcbiAgICAncGFwZXItcGxhbmUtbycsXG4gICAgJ2N1YmUnXG5dO1xubGV0IGljb25zRG91YmxlID0gWy4uLmljb25zLCAuLi5pY29uc107XG5cbi8vIENSRUFURSBCT0FSRFxuY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5jb25zdCBmaWd1cmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmaWd1cmUnKTtcblxuY29uc3QgJGdhbWVGaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lLWZpZWxkJyk7XG5cbmZ1bmN0aW9uIGNyZWF0ZUdhbWUoLi4uaWNvbnMpIHtcbiAgICBzaHVmZmxlKGljb25zKTtcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpY29ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBjYXJkID0gZGl2LmNsb25lTm9kZSgpO1xuICAgICAgICBjYXJkLmNsYXNzTGlzdCA9IGBnYW1lLWZpZWxkX19jYXJkIGZhIGZhLSR7aWNvbnNbaV19YDtcbiAgICAgICAgY2FyZC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCBpY29uc1tpXSk7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjYXJkKTtcbiAgICB9XG4gICAgJGdhbWVGaWVsZC5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuICAgICRnYW1lRmllbGQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBnZXRWYWx1ZXMpO1xufVxuY3JlYXRlR2FtZSguLi5pY29uc0RvdWJsZSk7XG5cblxuLy8gR0FNRVBMQVlcbmxldCBjb3VudGVyID0gMDtcbmxldCBtYXRjaENvdW50ZXIgPSAwO1xubGV0IGxhc3Q7IC8vIExhc3QgY2FyZCBjaG9pY2VcblxuY29uc3QgJG1vdmVzQ291bnRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb3Zlc0NvdW50ZXInKTtcbmNvbnN0ICRzdGFycyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3Njb3JlLXBhbmVsX19zdGFyJyk7XG5mdW5jdGlvbiBnZXRWYWx1ZXMoZSkge1xuICAgIGNvbnNvbGUubG9nKGNvdW50ZXIpXG4gICAgaWYoZS50YXJnZXQuaWQgPT09ICdnYW1lLWZpZWxkJykge3JldHVybn0gLy8gUHJldmVudCBjbGljayBvbiAjZ2FtZS1maWVsZFxuICAgIGlmKGNvdW50ZXIgJSAyICE9PSAwICYmIGxhc3QgPT09IGUudGFyZ2V0KSB7cmV0dXJufSAvLyBQcmV2ZW50IHNlY29uZCBjbGljayBvbiB0aGUgc2FtZSBjYXJkXG4gICAgY291bnRlcisrO1xuICAgIGlmKGNvdW50ZXIgPT09IDEpIHt0aW1lciA9IHNldEludGVydmFsKGludCwgMTAwMCl9IC8vUnVuIHRpbWVyIGFmdGVyIGZpcnN0IGNsaWNrIG9uIGNhcmRcbiAgICAkbW92ZXNDb3VudGVyLmlubmVyVGV4dCA9IE1hdGguZmxvb3IoY291bnRlciAvIDIpOyAvLyBEaXNwbGF5IG9ubHkgJ3BhaXInIGZsaXAgY291bnRcbiAgICBpZihjb3VudGVyID09PSAyMCkge1xuICAgICAgICAkc3RhcnNbJHN0YXJzLmxlbmd0aCAtIDFdLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICB9IGVsc2UgaWYoY291bnRlciA9PT0gNDApIHtcbiAgICAgICAgJHN0YXJzWyRzdGFycy5sZW5ndGggLSAyXS5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgfVxuICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ3NoYWRvdy0td3JvbmcnKTtcbiAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKCdmbGlwJyk7XG4gICAgaWYobGFzdCAmJiBjb3VudGVyICUgMiA9PT0gMCkge1xuICAgICAgICBjb21wYXJlKGxhc3QsIGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGxhc3QgPSBlLnRhcmdldFxuICAgIH1cbn1cblxuZnVuY3Rpb24gY29tcGFyZShsYXN0LCBhY3R1YWwpIHtcbiAgY29uc29sZS5sb2coJHN0YXJzWzBdKVxuICAgIGlmIChsYXN0LmF0dHJpYnV0ZXMubmFtZS52YWx1ZSA9PT0gYWN0dWFsLnRhcmdldC5hdHRyaWJ1dGVzLm5hbWUudmFsdWUpIHtcbiAgICAgICAgLy8gTWF0Y2hcbiAgICAgICAgbWF0Y2hDb3VudGVyKys7XG4gICAgICAgIGFjdHVhbC50YXJnZXQuY2xhc3NMaXN0LmFkZCgnc2hhZG93LS1tYXRjaCcpO1xuICAgICAgICBsYXN0LmNsYXNzTGlzdC5hZGQoJ3NoYWRvdy0tbWF0Y2gnKTtcbiAgICAgICAgaWYobWF0Y2hDb3VudGVyID09PSBpY29ucy5sZW5ndGgpIHtlbmRHYW1lKCl9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gTm90IG1hdGNoXG4gICAgICAgIGFjdHVhbC50YXJnZXQuY2xhc3NMaXN0LmFkZCgnc2hhZG93LS13cm9uZycpO1xuICAgICAgICBsYXN0LmNsYXNzTGlzdC5hZGQoJ3NoYWRvdy0td3JvbmcnKTtcbiAgICAgICAgLy8gU2V0IHRpbWVvdXQgdG8gZW5hYmxlIHNlY29uZCBjYXJkIHRvIGZsaXBcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBhY3R1YWwudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2ZsaXAnKTtcbiAgICAgICAgICAgIGxhc3QuY2xhc3NMaXN0LnJlbW92ZSgnZmxpcCcpO1xuICAgICAgICB9LCA1MDApXG4gICAgfVxufVxuXG4vLyBUSU1FUlxuY29uc3QgJHRpbWVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RpbWVyJyk7XG5sZXQgdGltZXI7XG5sZXQgdGltZSA9IDA7XG5jb25zdCBpbnQgPSAoKSA9PiB7XG4gICAgdGltZSsrO1xuICAgICR0aW1lci5pbm5lclRleHQgPSB0aW1lO1xufTtcblxuLy8gRU5EIEdBTUVcbmZ1bmN0aW9uIGVuZEdhbWUoKSB7XG4gICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGNvbnN0IHRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgY29uc3QgZW5kVGltZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBjb25zdCBzdGFyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2NvcmUtcGFuZWxfX3N0YXJzJylbMF0uY2xvbmVOb2RlKCk7XG4gICAgY29uc29sZS5sb2coc3RhcilcbiAgICBtb2RhbC5jbGFzc0xpc3QgPSAnbW9kYWwnO1xuICAgIGhlYWRlci5pbm5lclRleHQgPSAnWU9VIFdPTic7XG4gICAgYnRuLmNsYXNzTGlzdCA9ICdtb2RhbF9fYnRuJztcbiAgICBidG4uaW5uZXJUZXh0ID0gJ05FVyBHQU1FJztcbiAgICBidG4ub25jbGljayA9IG5ld0dhbWU7XG4gICAgdGV4dC5pbm5lclRleHQgPSAnR3JlYXQgd29yayEnO1xuICAgIGVuZFRpbWUuaW5uZXJUZXh0ID0gYFlvdXIgdGltZTogJHt0aW1lfWA7XG4gICAgbW9kYWwuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgICBtb2RhbC5hcHBlbmRDaGlsZChidG4pO1xuICAgIG1vZGFsLmFwcGVuZENoaWxkKHRleHQpO1xuICAgIG1vZGFsLmFwcGVuZENoaWxkKGVuZFRpbWUpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgJHN0YXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBzdGFyLmFwcGVuZENoaWxkKCRzdGFyc1tpXS5jbG9uZU5vZGUoKSk7XG4gICAgfVxuICAgIG1vZGFsLmFwcGVuZENoaWxkKHN0YXIpO1xuICAgIGZ1bmN0aW9uIG5ld0dhbWUoKSB7XG4gICAgICAgIHJlc3RhcnQoKTtcbiAgICAgICAgbW9kYWwuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAvLyBTZXQgdGltZW91dCBmb3Igc21vb3RoIGZhZGUgb3V0IGFuaW1hdGlvbiBkZXNjcmliZWQgaW4gJ2hpZGUnIENTUyBjbGFzc1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIG1vZGFsLnJlbW92ZSgpO1xuICAgICAgICB9LCA1MDApXG4gICAgfVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobW9kYWwpXG59XG5cbi8vIFJFU0VUXG5jb25zdCAkcmVzdGFydCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN0YXJ0Jyk7XG4kcmVzdGFydC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJlc3RhcnQpO1xuXG5mdW5jdGlvbiByZXN0YXJ0KCkge1xuICAgIGNsZWFySW50ZXJ2YWwodGltZXIpO1xuICAgIGNvbnN0ICRnYW1lRmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZS1maWVsZCcpO1xuICAgIGNvdW50ZXIgPSAwO1xuICAgIG1hdGNoQ291bnRlciA9IDA7XG4gICAgdGltZSA9IDA7XG4gICAgbGFzdCA9IHVuZGVmaW5lZDsgLy8gSSBoYWQgdG8gdXNlIHVuZGVmaW5lZCB0byBjbGVhciB0aGlzIHZhcmlhYmxlIHRvIGluaXRpYWwgc3RhdGVcbiAgICAkbW92ZXNDb3VudGVyLmlubmVyVGV4dCA9ICcwJztcbiAgICAkdGltZXIuaW5uZXJUZXh0ID0gJzAnO1xuICAgIGNvbnN0IHN0YXJzQXJyYXkgPSBbLi4uJHN0YXJzXTsgLy8gQ2hhbmdlIERPTSBub2RlIGxpc3QgaW50byBBcnJheSBmb3IgZWFzaWVyIGxvb3BcbiAgICBzdGFyc0FycmF5LmZvckVhY2goc3RhcnNSZXNldCk7XG4gICAgZnVuY3Rpb24gc3RhcnNSZXNldChpdGVtKSB7aXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyl9XG4gICAgJGdhbWVGaWVsZC5pbm5lckhUTUwgPSBcIlwiO1xuICAgIGNyZWF0ZUdhbWUoLi4uaWNvbnNEb3VibGUpO1xufSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/js/app.js\n");

/***/ }),

/***/ "./src/sass/app.sass":
/*!***************************!*\
  !*** ./src/sass/app.sass ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc2Fzcy9hcHAuc2Fzcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9zYXNzL2FwcC5zYXNzP2Q0ZDYiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW4iXSwibWFwcGluZ3MiOiJBQUFBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/sass/app.sass\n");

/***/ })

/******/ });