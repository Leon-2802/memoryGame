//Var-Elemente sammeln:
var stufe1 = document.querySelector("#einfach");
var stufe2 = document.querySelector("#normal");
var stufe3 = document.querySelector("#schwer");
var easyContainer = document.querySelector("#easy-cards");
var mediumContainer = document.querySelector("#medium-cards");
var hardContainer = document.querySelector("#hard-cards");
var newGame = document.querySelector("#new-game");
//????? Warum lädt der window.eventlistener meine deklarationen nicht?!
//Booleans für die Schwierigkeiten:
var easy = false;
var medium = false;
var hard = false;
//weitere Bools:
var lockDifficulty = false;
var firstFlipped = false;
var secondFlipped = false;
var flipBack = false;
//Counter für Unterscheiden der Kartenrückseiten:
var giveClass = 0;
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
var storeFlippedCards = [];
var storeImgClass = [];
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
    var backsideSource = "images/cards_background.png";
    if (easy == true) {
        var newImg_1 = document.createElement("img");
        newImg_1.src = backsideSource;
        newImg_1.classList.add(giveClass.toString());
        giveClass++;
        // newImg.getAttribute("key") == andersImgt.getAttribute("key");
        easyContainer.appendChild(newImg_1);
        newImg_1.addEventListener("click", function () {
            if (firstFlipped == false || secondFlipped == false) {
                //In beiden Aktionen wird der Klassenname des newImg Elements genommen um das zugehörige Objekt im Array zu erreichen, dazu wird parseFloat benötigt
                //da man den Klassenname (String) zu einem Float ändern muss.
                newImg_1.setAttribute("key", easyDeck[parseFloat(newImg_1.className)].key.toString());
                newImg_1.src = easyDeck[parseFloat(newImg_1.className)].source;
                // storeFlippedCards.push(newImg.src);
                if (firstFlipped == true) {
                    secondFlipped = true;
                }
                firstFlipped = true;
                checkForPairsEasy();
            }
        });
        function checkForPairsEasy() {
            if (firstFlipped == true && secondFlipped == true) {
                if (storeFlippedCards[0] === storeFlippedCards[1]) {
                    newImg_1.setAttribute("style", "opacity: 0");
                    firstFlipped = false;
                    secondFlipped = false;
                }
                else {
                    newImg_1.src = backsideSource;
                    firstFlipped = false;
                    secondFlipped = false;
                }
            }
        }
    }
    else if (medium == true) {
        var newImgMedium_1 = document.createElement("img");
        newImgMedium_1.src = backsideSource;
        newImgMedium_1.classList.add(giveClass.toString());
        giveClass++;
        mediumContainer.appendChild(newImgMedium_1);
        newImgMedium_1.addEventListener("click", function () {
            if (firstFlipped == false || secondFlipped == false) {
                newImgMedium_1.src = mediumDeck[parseFloat(newImgMedium_1.className)].source;
                storeFlippedCards.push(newImgMedium_1.src);
                storeImgClass.push(newImgMedium_1);
                if (firstFlipped == true) {
                    secondFlipped = true;
                }
                firstFlipped = true;
                checkForPairsMedium();
            }
        });
        function checkForPairsMedium() {
            if (firstFlipped == true && secondFlipped == true) {
                if (storeFlippedCards[0] === storeFlippedCards[1]) {
                    setTimeout(function () {
                        // document.querySelector("." + storeImgClass[0] + "").setAttribute("style", "opacity: 0");
                        // document.querySelector("." + storeImgClass[1] + "").setAttribute("style", "opacity: 0");
                        storeImgClass[0].classList.add("invisible");
                        storeImgClass[1].classList.add("invisible");
                        storeImgClass.length = 0;
                        storeFlippedCards.length = 0;
                        firstFlipped = false;
                        secondFlipped = false;
                    }, 2000);
                }
                else {
                    setTimeout(function () {
                        storeImgClass[0].src = backsideSource;
                        storeImgClass[1].src = backsideSource;
                        storeImgClass = [];
                        // newImgMedium.src = backsideSource;
                        storeImgClass.length = 0;
                        storeFlippedCards.length = 0;
                        firstFlipped = false;
                        secondFlipped = false;
                    }, 2000);
                }
            }
        }
    }
    else if (hard == true) {
        var newImgHard = document.createElement("img");
        newImgHard.src = backsideSource;
        newImgHard.classList.add(giveClass.toString());
        giveClass++;
        hardContainer.appendChild(newImgHard);
        // newImgHard.addEventListener("click", function(): void {
        //     newImgHard.src = [parseFloat(newImgHard.className)].source;
        // });
    }
}
//Neues Game starten: booleans und numbers auf ursprünglichen Wert zurücksetzen; divs leer räumen; divs wieder verstecken; Farbe des zuvor geklickten Buttons zurück zu Standard
function nextGame() {
    lockDifficulty = false;
    firstFlipped = false;
    secondFlipped = false;
    storeFlippedCards.length = 0;
    storeImgClass.length = 0;
    giveClass = 0;
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