//Var-Elemente sammeln:
// Warum werden 4 Karten aufgedeckt wenn nur noch 4 da sind?!
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
//Arrays für Karten:
var cardDeck = [];
//andere Arrays:
var storeImg = [];
var storeSource = [];
var storeSelected = [];
var storeClassName = [];
var storeDisappeared = [];
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
        for (var index = 1; index <= 2; index++) {
            for (var index_1 = 1; index_1 <= 4; index_1++) {
                var addCard = {
                    source: "images/easy-mode-paare/paar" + index_1 + ".jpg",
                    key: index_1
                };
                cardDeck.push(addCard);
            }
        }
        createCarddeck();
    }
});
stufe2.addEventListener("click", function () {
    if (lockDifficulty == false) {
        medium = true;
        for (var index = 1; index <= 2; index++) {
            for (var index_2 = 1; index_2 <= 8; index_2++) {
                var addCard = {
                    source: "images/medium-mode-paare/paar" + index_2 + ".jpg",
                    key: index_2
                };
                cardDeck.push(addCard);
            }
        }
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
        shuffleArray(cardDeck);
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
        shuffleArray(cardDeck);
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
                    newImg_1.src = cardDeck[parseFloat(newImg_1.className)].source;
                    storeSource.push(newImg_1.src);
                    storeSelected.push(newImg_1);
                    storeClassName.push(newImg_1.className);
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
                        storeDisappeared.push(parseFloat(storeClassName[0]));
                        storeDisappeared.push(parseFloat(storeClassName[1]));
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
                    storeClassName.length = 0;
                    firstFlipped = false;
                    secondFlipped = false;
                    comPlays(0, 8);
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
                    newImgMedium_1.src = cardDeck[parseFloat(newImgMedium_1.className)].source;
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
                    comPlays(0, 16);
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
function comPlays(min, max) {
    var firstImage = Math.floor(Math.random() * (max - min)) + min;
    var secondImage = Math.floor(Math.random() * (max - min)) + min;
    if (easy == true) {
        if (firstImage == secondImage) {
            comPlays(0, 8);
        }
        for (var index = 0; index < storeDisappeared.length; index++) {
            if (firstImage == storeDisappeared[index]) {
                comPlays(0, 8);
            }
            else if (secondImage == storeDisappeared[index]) {
                comPlays(0, 8);
            }
        }
        storeImg[firstImage].src = cardDeck[parseFloat(storeImg[firstImage].className)].source;
        storeSource.push(storeImg[firstImage].src);
        storeSelected.push(storeImg[firstImage]);
        //Zweite Karte:
        setTimeout(function () {
            storeImg[secondImage].src = cardDeck[parseFloat(storeImg[secondImage].className)].source;
            storeSource.push(storeImg[secondImage].src);
            storeSelected.push(storeImg[secondImage]);
            setTimeout(function () {
                checkPairsEasy();
            }, 3000);
        }, 1000);
        function checkPairsEasy() {
            if (storeSource[0] === storeSource[1]) {
                storeSelected[0].classList.add("invisible");
                storeSelected[1].classList.add("invisible");
                storeDisappeared.push(firstImage);
                storeDisappeared.push(secondImage);
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
    cardDeck = [];
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
//# sourceMappingURL=memory.js.map