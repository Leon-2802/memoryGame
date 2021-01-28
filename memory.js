//Var-Elemente sammeln:
var stufe1 = document.querySelector("#einfach");
var stufe2 = document.querySelector("#normal");
var stufe3 = document.querySelector("#schwer");
var easyContainer = document.querySelector("#easy-cards");
var mediumContainer = document.querySelector("#medium-cards");
var hardContainer = document.querySelector("#hard-cards");
var newGame = document.querySelector("#new-game");
var playerPoints = document.querySelector("#p-number");
var comPoints = document.querySelector("#c-number");
//Quelle für die Kartenrückseiten:
var backsideSource = "images/cards_background.png";
//Booleans für die Schwierigkeiten:
var easy = false;
var medium = false;
var hard = false;
//weitere Bools:
var lockDifficulty = false;
var firstFlipped = false;
var secondFlipped = false;
var flipBack = false;
var comsTurn = false;
var playerScored = false;
var comScored = false;
//Counter für Unterscheiden der Kartenrückseiten:
var giveClass = 0;
//Counter für Punktevergabe:
var playerCounter = 0;
playerPoints.innerHTML = playerCounter.toString();
var comCounter = 0;
comPoints.innerHTML = comCounter.toString();
//Event-Listener für die verschiedenen Schalter:
//Schwierigkeitswahl:
stufe1.addEventListener("click", function () {
    if (lockDifficulty == false) {
        easy = true;
        createCarddeck();
    }
});
stufe2.addEventListener("click", function () {
    if (lockDifficulty == false) {
        medium = true;
        createCarddeck();
    }
});
stufe3.addEventListener("click", function () {
    if (lockDifficulty == false) {
        hard = true;
        createCarddeck();
    }
});
//Buttons:
newGame.addEventListener("click", function () {
    nextGame();
});
var storeImg = [];
var storeSource = [];
var storeSelected = [];
//Array durchmischen (wie funktioniert es?):
function shuffleArray(array) {
    var _a;
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [array[j], array[i]], array[i] = _a[0], array[j] = _a[1];
    }
}
function createCarddeck() {
    if (easy == true && lockDifficulty == false) {
        easyContainer.classList.remove("isHidden");
        stufe1.setAttribute("style", "color: cyan");
        lockDifficulty = true;
        shuffleArray(easyDeck);
        for (var indexEasy = 1; indexEasy <= 8; indexEasy++) {
            pushCardsToDom();
        }
        // for (var twoTimes: number = 1; twoTimes <= 2; twoTimes++) {
        //     for (var frontEasy: number = 1; frontEasy <= 4; frontEasy++) {
        //         pushCardsFront(cardFrontIndex);
        //         cardFrontIndex++;
        //     }
        //     cardFrontIndex = 0;
        // }
    }
    else if (medium == true && lockDifficulty == false) {
        mediumContainer.classList.remove("isHidden");
        stufe2.setAttribute("style", "color: cyan");
        lockDifficulty = true;
        shuffleArray(mediumDeck);
        for (var indexMedium = 1; indexMedium <= 16; indexMedium++) {
            pushCardsToDom();
        }
    }
    else if (hard == true && lockDifficulty == false) {
        hardContainer.classList.remove("isHidden");
        stufe3.setAttribute("style", "color: cyan");
        lockDifficulty = true;
        for (var indexHard = 1; indexHard <= 32; indexHard++) {
            pushCardsToDom();
        }
    }
}
//Rückseiten in den Dom laden
function pushCardsToDom() {
    if (easy == true) {
        var newImg_1 = document.createElement("img");
        newImg_1.src = backsideSource;
        newImg_1.classList.add(giveClass.toString());
        storeImg.push(newImg_1);
        giveClass++;
        // newImg.getAttribute("key") == andersImgt.getAttribute("key");
        easyContainer.appendChild(newImg_1);
        newImg_1.addEventListener("click", function () {
            if (comsTurn == false) {
                if (firstFlipped == false || secondFlipped == false) {
                    newImg_1.src = easyDeck[parseFloat(newImg_1.className)].source;
                    storeSource.push(newImg_1.src);
                    storeSelected.push(newImg_1);
                    if (firstFlipped == true) {
                        secondFlipped = true;
                    }
                    firstFlipped = true;
                    checkForPairsEasy();
                }
            }
        });
        function checkForPairsEasy() {
            if (firstFlipped == true && secondFlipped == true) {
                comsTurn = true;
                if (storeSource[0] === storeSource[1]) {
                    setTimeout(function () {
                        storeSelected[0].classList.add("invisible");
                        storeSelected[1].classList.add("invisible");
                        playerScored = true;
                        givePoints();
                    }, 2000);
                }
                else {
                    setTimeout(function () {
                        storeSelected[0].src = backsideSource;
                        storeSelected[1].src = backsideSource;
                    }, 2000);
                }
                setTimeout(function () {
                    storeSelected.length = 0;
                    storeSource.length = 0;
                    firstFlipped = false;
                    secondFlipped = false;
                    comPlays();
                }, 3000);
            }
        }
    }
    else if (medium == true) {
        var newImgMedium_1 = document.createElement("img");
        newImgMedium_1.src = backsideSource;
        newImgMedium_1.classList.add(giveClass.toString());
        storeImg.push(newImgMedium_1);
        giveClass++;
        mediumContainer.appendChild(newImgMedium_1);
        newImgMedium_1.addEventListener("click", function () {
            if (comsTurn == false) {
                if (firstFlipped == false || secondFlipped == false) {
                    newImgMedium_1.src = mediumDeck[parseFloat(newImgMedium_1.className)].source;
                    storeSource.push(newImgMedium_1.src);
                    storeSelected.push(newImgMedium_1);
                    if (firstFlipped == true) {
                        secondFlipped = true;
                    }
                    firstFlipped = true;
                    checkForPairsMedium();
                }
            }
        });
        function checkForPairsMedium() {
            if (firstFlipped == true && secondFlipped == true) {
                if (storeSource[0] === storeSource[1]) {
                    setTimeout(function () {
                        storeSelected[0].classList.add("invisible");
                        storeSelected[1].classList.add("invisible");
                    }, 2000);
                }
                else {
                    setTimeout(function () {
                        storeSelected[0].src = backsideSource;
                        storeSelected[1].src = backsideSource;
                    }, 2000);
                }
                setTimeout(function () {
                    storeSelected.length = 0;
                    storeSource.length = 0;
                    firstFlipped = false;
                    secondFlipped = false;
                    comPlays();
                }, 3000);
            }
        }
    }
    else if (hard == true) {
        var newImgHard = document.createElement("img");
        newImgHard.src = backsideSource;
        newImgHard.classList.add(giveClass.toString());
        storeImg.push(newImgHard);
        giveClass++;
        hardContainer.appendChild(newImgHard);
        // newImgHard.addEventListener("click", function(): void {
        //     newImgHard.src = [parseFloat(newImgHard.className)].source;
        // });
    }
}
function comPlays() {
    var firstImage;
    var secondImage;
    if (easy == true) {
        storeImg[0].src = easyDeck[parseFloat(storeImg[0].className)].source;
        storeSource.push(storeImg[0].src);
        storeSelected.push(storeImg[0]);
        //Zweite Karte:
        setTimeout(function () {
            storeImg[1].src = easyDeck[parseFloat(storeImg[1].className)].source;
            storeSource.push(storeImg[1].src);
            storeSelected.push(storeImg[1]);
            setTimeout(function () {
                checkPairsEasy();
            }, 3000);
        }, 1000);
        function checkPairsEasy() {
            if (storeSource[0] === storeSource[1]) {
                storeSelected[0].classList.add("invisible");
                storeSelected[1].classList.add("invisible");
            }
            else {
                storeSelected[0].src = backsideSource;
                storeSelected[1].src = backsideSource;
            }
            storeSelected.length = 0;
            storeSource.length = 0;
        }
        // Spieler wieder dran
        setTimeout(function () {
            comsTurn = false;
        }, 5000);
    }
}
function givePoints() {
    if (playerScored == true) {
        playerCounter++;
        playerPoints.innerHTML = playerCounter.toString();
    }
}
//Neues Game starten: booleans und numbers auf ursprünglichen Wert zurücksetzen; divs leer räumen; divs wieder verstecken; Farbe des zuvor geklickten Buttons zurück zu Standard
function nextGame() {
    lockDifficulty = false;
    firstFlipped = false;
    secondFlipped = false;
    comsTurn = false;
    storeSource.length = 0;
    storeSelected.length = 0;
    storeImg.length = 0;
    giveClass = 0;
    playerCounter = 0;
    playerPoints.innerHTML = playerCounter.toString();
    comCounter = 0;
    comPoints.innerHTML = comCounter.toString();
    if (easy == true) {
        easyContainer.innerHTML = "";
        easyContainer.classList.add("isHidden");
        stufe1.setAttribute("style", "color: black");
        easy = false;
    }
    else if (medium == true) {
        mediumContainer.innerHTML = "";
        mediumContainer.classList.add("isHidden");
        stufe2.setAttribute("style", "color: black");
        medium = false;
    }
    else if (hard == true) {
        hardContainer.innerHTML = "";
        hardContainer.classList.add("isHidden");
        stufe3.setAttribute("style", "color: black");
        hard = false;
    }
}
//Objekt-Arrays:
//Objects für die einfach-Kartenpaare:
var easyDeck = [
    {
        source: "images/easy-mode-paare/paar1.jpg",
        class: "front",
        key: 1
    },
    {
        source: "images/easy-mode-paare/paar2.jpg",
        class: "front",
        key: 2
    },
    {
        source: "images/easy-mode-paare/paar3.jpg",
        class: "front",
        key: 3
    },
    {
        source: "images/easy-mode-paare/paar4.jpg",
        class: "front",
        key: 4
    },
    {
        source: "images/easy-mode-paare/paar1.jpg",
        class: "front",
        key: 1
    },
    {
        source: "images/easy-mode-paare/paar2.jpg",
        class: "front",
        key: 2
    },
    {
        source: "images/easy-mode-paare/paar3.jpg",
        class: "front",
        key: 3
    },
    {
        source: "images/easy-mode-paare/paar4.jpg",
        class: "front",
        key: 4
    }
];
//Objekt-Array für Medium-Cards:
var mediumDeck = [
    {
        source: "images/medium-mode-paare/paar1.jpg",
        class: "front",
        key: 1
    },
    {
        source: "images/medium-mode-paare/paar2.jpg",
        class: "front",
        key: 2
    },
    {
        source: "images/medium-mode-paare/paar3.jpg",
        class: "front",
        key: 3
    },
    {
        source: "images/medium-mode-paare/paar4.jpg",
        class: "front",
        key: 4
    },
    {
        source: "images/medium-mode-paare/paar5.jpg",
        class: "front",
        key: 5
    },
    {
        source: "images/medium-mode-paare/paar6.jpg",
        class: "front",
        key: 6
    },
    {
        source: "images/medium-mode-paare/paar7.jpg",
        class: "front",
        key: 7
    },
    {
        source: "images/medium-mode-paare/paar8.jpg",
        class: "front",
        key: 8
    },
    {
        source: "images/medium-mode-paare/paar1.jpg",
        class: "front",
        key: 1
    },
    {
        source: "images/medium-mode-paare/paar2.jpg",
        class: "front",
        key: 2
    },
    {
        source: "images/medium-mode-paare/paar3.jpg",
        class: "front",
        key: 3
    },
    {
        source: "images/medium-mode-paare/paar4.jpg",
        class: "front",
        key: 4
    },
    {
        source: "images/medium-mode-paare/paar5.jpg",
        class: "front",
        key: 5
    },
    {
        source: "images/medium-mode-paare/paar6.jpg",
        class: "front",
        key: 6
    },
    {
        source: "images/medium-mode-paare/paar7.jpg",
        class: "front",
        key: 7
    },
    {
        source: "images/medium-mode-paare/paar8.jpg",
        class: "front",
        key: 8
    }
];
//# sourceMappingURL=memory.js.map