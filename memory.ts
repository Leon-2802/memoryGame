//Var-Elemente sammeln:
var stufe1: HTMLInputElement = document.querySelector("#einfach");
var stufe2: HTMLElement = document.querySelector("#normal");
var stufe3: HTMLElement = document.querySelector("#schwer");
var easyContainer: HTMLElement = document.querySelector("#easy-cards");
var mediumContainer: HTMLElement = document.querySelector("#medium-cards");
var hardContainer: HTMLElement = document.querySelector("#hard-cards");
var newGame: HTMLElement = document.querySelector("#new-game");

//????? Warum lädt der window.eventlistener meine deklarationen nicht?!

//Booleans für die Schwierigkeiten:
var easy: boolean = false;
var medium: boolean = false;
var hard: boolean = false;
//weitere Bools:
var lockDifficulty: boolean = false;
var firstFlipped: boolean = false;
var secondFlipped: boolean = false;
var flipBack: boolean = false;

//Counter für Unterscheiden der Kartenrückseiten:
var giveClass: number = 0;

//Event-Listener für die verschiedenen Schalter:
//Schwierigkeitswahl:
stufe1.addEventListener("click", function(): void {
    if (lockDifficulty == false) {
        easy = true;
        createCarddeck();
    }
});
stufe2.addEventListener("click", function(): void {
    if (lockDifficulty == false) {
        medium = true;
        createCarddeck();
    }
});
stufe3.addEventListener("click", function(): void {
    if (lockDifficulty == false) {
        hard = true;
        createCarddeck();
    }
});
//Buttons:
newGame.addEventListener("click", function(): void {
    nextGame();
});

//Interface für die Kartendecks:
interface CardBlueprint {
    source: string;
    class: string;
    key: number;
}

var storeFlippedCards: string [] = [];
var storeImgClass: HTMLImageElement [] = [];

//Array durchmischen (wie funktioniert es?):
function shuffleArray(array: Array<CardBlueprint>): void {
    for (let i: number = array.length - 1; i > 0; i--) {
        const j: number = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createCarddeck(): void {
    if (easy == true && lockDifficulty == false) {
        easyContainer.classList.remove("isHidden");
        stufe1.setAttribute("style", "color: cyan");
        lockDifficulty = true;
        shuffleArray(easyDeck);
        for (var indexEasy: number = 1; indexEasy <= 8; indexEasy++) {
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
        for (var indexMedium: number = 1; indexMedium <= 16; indexMedium++) {
            pushCardsToDom();
        }
    }
    else if (hard == true && lockDifficulty == false) {
        hardContainer.classList.remove("isHidden");
        stufe3.setAttribute("style", "color: cyan");
        lockDifficulty = true;
        for (var indexHard: number = 1; indexHard <= 32; indexHard++) {
            pushCardsToDom();
        }
    }
}

//Rückseiten in den Dom laden
function pushCardsToDom(): void {
    var backsideSource: string = "images/cards_background.png";
    if (easy == true) {
        let newImg: HTMLImageElement = <HTMLImageElement>document.createElement("img");
        newImg.src = backsideSource;
        newImg.classList.add(giveClass.toString());
        giveClass++;
        // newImg.getAttribute("key") == andersImgt.getAttribute("key");
        easyContainer.appendChild(newImg);
        newImg.addEventListener("click", function(): void {
            if (firstFlipped == false || secondFlipped == false) {
                //In beiden Aktionen wird der Klassenname des newImg Elements genommen um das zugehörige Objekt im Array zu erreichen, dazu wird parseFloat benötigt
                //da man den Klassenname (String) zu einem Float ändern muss.
                newImg.setAttribute("key", easyDeck[parseFloat(newImg.className)].key.toString());
                newImg.src = easyDeck[parseFloat(newImg.className)].source;
                // storeFlippedCards.push(newImg.src);
                if (firstFlipped == true) {
                    secondFlipped = true;
                }
                firstFlipped = true;
                checkForPairsEasy();
            }
        });
        function checkForPairsEasy(): void {
            if (firstFlipped == true && secondFlipped == true) {
                if (storeFlippedCards[0] === storeFlippedCards[1]) {
                    newImg.setAttribute("style", "opacity: 0");
                    firstFlipped = false;
                    secondFlipped = false;
                }
                else {
                    newImg.src = backsideSource;
                    firstFlipped = false;
                    secondFlipped = false;
                }
            }
        }
    }
    else if (medium == true) {
        let newImgMedium: HTMLImageElement = <HTMLImageElement>document.createElement("img");
        newImgMedium.src = backsideSource;
        newImgMedium.classList.add(giveClass.toString());
        giveClass++;
        mediumContainer.appendChild(newImgMedium);
        newImgMedium.addEventListener("click", function(): void {
            if (firstFlipped == false || secondFlipped == false) {
                newImgMedium.src = mediumDeck[parseFloat(newImgMedium.className)].source;
                storeFlippedCards.push(newImgMedium.src);
                storeImgClass.push(newImgMedium);
                if (firstFlipped == true) {
                    secondFlipped = true;
                }
                firstFlipped = true;
                checkForPairsMedium();
            }
        });
        function checkForPairsMedium(): void {
            if (firstFlipped == true && secondFlipped == true) {
                if (storeFlippedCards[0] === storeFlippedCards[1]) {
                    setTimeout(function(): void {
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
                    setTimeout(function(): void {
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
        let newImgHard: HTMLImageElement = <HTMLImageElement>document.createElement("img");
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
function nextGame(): void {
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
        medium = false;
    }
}

//Objekt-Arrays:
//Objects für die einfach-Kartenpaare:
var easyDeck: CardBlueprint[] = [
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
var mediumDeck: CardBlueprint [] = [
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