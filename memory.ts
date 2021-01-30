//Var-Elemente sammeln:
// Warum werden 4 Karten aufgedeckt wenn nur noch 4 da sind?!
const stufe1: HTMLInputElement = document.querySelector("#einfach");
const stufe2: HTMLElement = document.querySelector("#normal");
const stufe3: HTMLElement = document.querySelector("#schwer");
const easyContainer: HTMLElement = document.querySelector("#easy-cards");
const mediumContainer: HTMLElement = document.querySelector("#medium-cards");
const hardContainer: HTMLElement = document.querySelector("#hard-cards");
const newGame: HTMLElement = document.querySelector("#new-game");
const playerPoints: HTMLElement = document.querySelector("#p-number");
const comPoints: HTMLElement = document.querySelector("#c-number");

//Quelle für die Kartenrückseiten:
var backsideSource: string = "images/cards_background.png";

//Booleans für die Schwierigkeiten:
var easy: boolean = false;
var medium: boolean = false;
var hard: boolean = false;
//weitere Bools:
var lockDifficulty: boolean = false;
var firstFlipped: boolean = false;
var secondFlipped: boolean = false;
var flipBack: boolean = false;
var comsTurn: boolean = false;
var playerScored: boolean = false;
var comScored: boolean = false;

//Interface für Kartenobjekte:
interface CardBlueprint {
    source: string;
    key: number;
}
//Arrays für Karten:
var cardDeck: CardBlueprint[] = [];

//andere Arrays:
var storeImg: HTMLImageElement [] = [];
var storeSource: string [] = [];
var storeSelected: HTMLImageElement [] = [];
var storeClassName: string [] = [];
var storeDisappeared: number [] = [];

//Counter für Unterscheiden der Kartenrückseiten:
var giveClass: number = 0;
//Counter für Punktevergabe:
var playerCounter: number = 0;
playerPoints.innerHTML = playerCounter.toString();
var comCounter: number = 0;
comPoints.innerHTML = comCounter.toString();

//Event-Listener für die verschiedenen Schalter:
//Schwierigkeitswahl:
stufe1.addEventListener("click", function(): void {
    if (lockDifficulty == false) {
        easy = true;
        for (let index: number = 1; index <= 2; index++) {
            for (let index: number = 1; index <= 4; index++) {
                let addCard: CardBlueprint = {
                    source: "images/easy-mode-paare/paar" + index + ".jpg",
                    key: index
                };
                cardDeck.push(addCard);
            }
        }
        createCarddeck();
    }
});
stufe2.addEventListener("click", function(): void {
    if (lockDifficulty == false) {
        medium = true;
        for (let index: number = 1; index <= 2; index++) {
            for (let index: number = 1; index <= 8; index++) {
                let addCard: CardBlueprint = {
                    source: "images/medium-mode-paare/paar" + index + ".jpg",
                    key: index
                };
                cardDeck.push(addCard);
            }
        }
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
        shuffleArray(cardDeck);
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
        shuffleArray(cardDeck);
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
    if (easy == true) {
        let newImg: HTMLImageElement = <HTMLImageElement>document.createElement("img");
        newImg.src = backsideSource;
        newImg.classList.add(giveClass.toString());
        storeImg.push(newImg);
        giveClass++;
        // newImg.getAttribute("key") == andersImgt.getAttribute("key");
        easyContainer.appendChild(newImg);
        newImg.addEventListener("click", function(): void {
            if (comsTurn == false) {
                if (firstFlipped == false || secondFlipped == false) {
                    newImg.src = cardDeck[parseFloat(newImg.className)].source;
                    storeSource.push(newImg.src);
                    storeSelected.push(newImg);
                    storeClassName.push(newImg.className);
                    if (firstFlipped == true) {
                        secondFlipped = true;
                    }
                    firstFlipped = true;
                    checkForPairsEasy();
                }
            }
        });
        function checkForPairsEasy(): void {
            if (firstFlipped == true && secondFlipped == true) {
                comsTurn = true;
                if (storeSource[0] === storeSource[1]) {
                    setTimeout(function(): void {
                        storeSelected[0].classList.add("invisible");
                        storeSelected[1].classList.add("invisible");
                        storeDisappeared.push(parseFloat(storeClassName[0]));
                        storeDisappeared.push(parseFloat(storeClassName[1]));
                        playerScored = true;
                        givePoints();
                    }, 2000);
                }
                else {
                    setTimeout(function(): void {
                        storeSelected[0].src = backsideSource;
                        storeSelected[1].src = backsideSource;
                    }, 2000);
                }
                setTimeout(function(): void {
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
        let newImgMedium: HTMLImageElement = <HTMLImageElement>document.createElement("img");
        newImgMedium.src = backsideSource;
        newImgMedium.classList.add(giveClass.toString());
        storeImg.push(newImgMedium);
        giveClass++;
        mediumContainer.appendChild(newImgMedium);
        newImgMedium.addEventListener("click", function(): void {
            if (comsTurn == false) {
                if (firstFlipped == false || secondFlipped == false) {
                    newImgMedium.src = cardDeck[parseFloat(newImgMedium.className)].source;
                    storeSource.push(newImgMedium.src);
                    storeSelected.push(newImgMedium);
                    if (firstFlipped == true) {
                        secondFlipped = true;
                    }
                    firstFlipped = true;
                    checkForPairsMedium();
                }
            }
        });
        function checkForPairsMedium(): void {
            if (firstFlipped == true && secondFlipped == true) {
                if (storeSource[0] === storeSource[1]) {
                    setTimeout(function(): void {
                        storeSelected[0].classList.add("invisible");
                        storeSelected[1].classList.add("invisible");
                    }, 2000);
                }
                else {
                    setTimeout(function(): void {
                        storeSelected[0].src = backsideSource;
                        storeSelected[1].src = backsideSource;
                    }, 2000);
                }
                setTimeout(function(): void {
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
        let newImgHard: HTMLImageElement = <HTMLImageElement>document.createElement("img");
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

function comPlays(min: number, max: number): void {
    let firstImage: number = Math.floor(Math.random() * (max - min)) + min;
    let secondImage: number = Math.floor(Math.random() * (max - min)) + min;

    if (easy == true) {
        if (firstImage == secondImage) {
            comPlays(0, 8);
        }
        for (let index: number = 0; index < storeDisappeared.length; index++) {
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
        setTimeout(function(): void {
            storeImg[secondImage].src = cardDeck[parseFloat(storeImg[secondImage].className)].source;
            storeSource.push(storeImg[secondImage].src);
            storeSelected.push(storeImg[secondImage]);
            setTimeout(function(): void {
                checkPairsEasy();
            }, 3000);
        },1000);
        function checkPairsEasy(): void {
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
        setTimeout(function(): void {
            comsTurn = false;
        }, 5000);
    }
}

function givePoints(): void {
    if (playerScored == true) {
        playerCounter++;
        playerPoints.innerHTML = playerCounter.toString();
    }
}

//Neues Game starten: booleans und numbers auf ursprünglichen Wert zurücksetzen; divs leer räumen; divs wieder verstecken; Farbe des zuvor geklickten Buttons zurück zu Standard
function nextGame(): void {
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