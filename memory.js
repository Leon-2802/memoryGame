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
//Counter für Unterscheiden der Kartenrückseiten:
var giveClass = 0;
var maximumFlipped = 0;
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
        // newImg.setAttribute("key", "1");
        // newImg.getAttribute("key") == andersImgt.getAttribute("key");
        easyContainer.appendChild(newImg_1);
        newImg_1.addEventListener("click", function () {
            if (maximumFlipped < 2) {
                newImg_1.src = easyDeck[parseFloat(newImg_1.className)].source;
                // maximumFlipped++;
                // //Karten zurückdrehen wenn zwei unterschiedliche aufgedeckt wurden:
                // if (maximumFlipped == 2) {
                //     setTimeout(function(): void {
                //         document.querySelector("img").src = backsideSource;
                //         maximumFlipped = 0;
                //     }, 1000);
                // }
            }
        });
    }
    else if (medium == true) {
        var newImgMedium = document.createElement("img");
        newImgMedium.src = backsideSource;
        mediumContainer.appendChild(newImgMedium);
    }
    else if (hard == true) {
        var newImgHard = document.createElement("img");
        newImgHard.src = backsideSource;
        newImgHard.classList.add(giveClass.toString());
        giveClass++;
        hardContainer.appendChild(newImgHard);
        // newImgHard.addEventListener("click", function(): void {
        //     newImgHard.src = firstHalfEasy[parseFloat(newImgHard.className)].source;
        // });
    }
}
//Neues Game starten: booleans und numbers auf ursprünglichen Wert zurücksetzen; divs leer räumen; divs wieder verstecken; Farbe des zuvor geklickten Buttons zurück zu Standard
function nextGame() {
    lockDifficulty = false;
    giveClass = 0;
    maximumFlipped = 0;
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
        medium = false;
    }
}
//# sourceMappingURL=memory.js.map