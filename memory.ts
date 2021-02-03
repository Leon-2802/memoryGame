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
const p1vscom: HTMLElement = document.querySelector("#h21");
const p1vsp2: HTMLElement = document.querySelector("#h22");
const comvscom: HTMLElement = document.querySelector("#h23");

//Welcher Spieltyp?:
//Booleans:
var comvcom: boolean = false;
var com1turn: boolean;
var preventTheOther: boolean = false;
//QuerySelector und Aktionen für einzelne Spieltyp-Buttons:
//COMvCOM mode noch verbuggt!!
comvscom.addEventListener("click", function(): void {
    comvscom.setAttribute("style", "text-decoration: underline");
    p1vscom.setAttribute("style", "text-decoration: none");
    p1vsp2.setAttribute("style", "text-decoration: none");
    document.querySelector("#player").innerHTML = "Com1";
    document.querySelector("#com").innerHTML = "Com2";
    com1turn = true;
    comvcom = true;
});
p1vscom.addEventListener("click", function(): void {
    p1vscom.setAttribute("style", "text-decoration: underline");
    comvscom.setAttribute("style", "text-decoration: none");
    p1vsp2.setAttribute("style", "text-decoration: none");
    document.querySelector("#player").innerHTML = "Player";
    document.querySelector("#com").innerHTML = "Com";
    comvcom = false;
});

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
var comsTurn: boolean = true;
var playerScored: boolean = false;
var comScored: boolean = false;
var runAgain: boolean = false;

//Interface für Kartenobjekte:
interface CardBlueprint {
    source: string;
    key: number;
}
//Arrays für Karten:
var cardDeck: CardBlueprint[] = [];
//Arrays für das zufällige Aufdecken des Computers:
var availableCards: number [] = [];

//andere Arrays:
var storeImg: HTMLImageElement [] = [];
var storeSource: string [] = [];
var storeSelected: HTMLImageElement [] = [];
var storeClassName: string [] = [];


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
        for (let index: number = 0; index <= 7; index++) {
            availableCards.push(index);
        }
        createCarddeck();
        setTimeout(function(): void {
            comPlays();
        }, 1000);
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
        for (let index: number = 0; index <= 15; index++) {
            availableCards.push(index);
        }
        createCarddeck();
        setTimeout(function(): void {
            comPlays();
        }, 1000);
    }
});
stufe3.addEventListener("click", function(): void {
    if (lockDifficulty == false) {
        hard = true;
        for (let index: number = 1; index <= 2; index++) {
            for (let index: number = 1; index <= 16; index++) {
                let addCard: CardBlueprint = {
                    source: "images/hard-mode-paare/paar" + index + ".jpg",
                    key: index
                };
                cardDeck.push(addCard);
            }
        }
        for (let index: number = 0; index <= 31; index++) {
            availableCards.push(index);
        }
        createCarddeck();
        setTimeout(function(): void {
            comPlays();
        }, 1000);
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
                    if (storeSelected[0].className === storeSelected[1].className) {
                        secondFlipped = false;
                        storeSelected.splice(1, 1);
                        storeSource.splice(1, 1);
                    }
                    else if (storeSelected[0].className != storeSelected[1].className) {
                        checkForPairsEasy();
                    }
                }
            }
        });
        function checkForPairsEasy(): void {
            if (firstFlipped == true && secondFlipped == true) {
                if (storeSource[0] === storeSource[1]) {
                    setTimeout(function(): void {
                        const index: number = availableCards.indexOf(parseFloat(storeSelected[0].className));
                        if (index > -1) {
                            availableCards.splice(index, 1);
                        }
                        const index2: number = availableCards.indexOf(parseFloat(storeSelected[1].className));
                        if (index2 > -1) {
                            availableCards.splice(index2, 1);
                        }
                        storeSelected[0].classList.add("invisible");
                        storeSelected[1].classList.add("invisible");
                        playerScored = true;
                        givePoints();
                        storeSelected.length = 0;
                        storeSource.length = 0;
                        storeClassName.length = 0;
                        firstFlipped = false;
                        secondFlipped = false;
                    }, 2000);
                }
                else {
                    setTimeout(function(): void {
                        storeSelected[0].src = backsideSource;
                        storeSelected[1].src = backsideSource;
                    }, 2000);
                    setTimeout(function(): void {
                        storeSelected.length = 0;
                        storeSource.length = 0;
                        storeClassName.length = 0;
                        firstFlipped = false;
                        secondFlipped = false;
                        comsTurn = true;
                        comPlays();
                    }, 3000);
                }
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
                    if (storeSelected[0].className === storeSelected[1].className) {
                        secondFlipped = false;
                        storeSelected.splice(1, 1);
                        storeSource.splice(1, 1);
                    }
                    else if (storeSelected[0].className != storeSelected[1].className) {
                        checkForPairsMedium();
                    }
                }
            }
        });
        function checkForPairsMedium(): void {
            if (firstFlipped == true && secondFlipped == true) {
                if (storeSource[0] === storeSource[1]) {
                    setTimeout(function(): void {
                        const index: number = availableCards.indexOf(parseFloat(storeSelected[0].className));
                        if (index > -1) {
                            availableCards.splice(index, 1);
                        }
                        const index2: number = availableCards.indexOf(parseFloat(storeSelected[1].className));
                        if (index2 > -1) {
                            availableCards.splice(index2, 1);
                        }
                        storeSelected[0].classList.add("invisible");
                        storeSelected[1].classList.add("invisible");
                        playerScored = true;
                        givePoints();
                        storeSelected.length = 0;
                        storeSource.length = 0;
                        firstFlipped = false;
                        secondFlipped = false;
                    }, 2000);
                }
                else {
                    setTimeout(function(): void {
                        storeSelected[0].src = backsideSource;
                        storeSelected[1].src = backsideSource;
                    }, 2000);
                    setTimeout(function(): void {
                        storeSelected.length = 0;
                        storeSource.length = 0;
                        firstFlipped = false;
                        secondFlipped = false;
                        comsTurn = true;
                        comPlays();
                    }, 3000);
                }
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
        newImgHard.addEventListener("click", function(): void {
            if (comsTurn == false) {
                if (firstFlipped == false || secondFlipped == false) {
                    newImgHard.src = cardDeck[parseFloat(newImgHard.className)].source;
                    storeSource.push(newImgHard.src);
                    storeSelected.push(newImgHard);
                    if (firstFlipped == true) {
                        secondFlipped = true;
                    }
                    firstFlipped = true;
                    if (storeSelected[0].className === storeSelected[1].className) {
                        secondFlipped = false;
                        storeSelected.splice(1, 1);
                        storeSource.splice(1, 1);
                    }
                    else if (storeSelected[0].className != storeSelected[1].className) {
                        checkForPairsHard();
                    }  
                }
            }
        });
        function checkForPairsHard(): void {
            if (firstFlipped == true && secondFlipped == true) {
                if (storeSource[0] === storeSource[1]) {
                    setTimeout(function(): void {
                        const index: number = availableCards.indexOf(parseFloat(storeSelected[0].className));
                        if (index > -1) {
                            availableCards.splice(index, 1);
                        }
                        const index2: number = availableCards.indexOf(parseFloat(storeSelected[1].className));
                        if (index2 > -1) {
                            availableCards.splice(index2, 1);
                        }
                        storeSelected[0].classList.add("invisible");
                        storeSelected[1].classList.add("invisible");
                        playerScored = true;
                        givePoints();
                        storeSelected.length = 0;
                        storeSource.length = 0;
                        firstFlipped = false;
                        secondFlipped = false;
                    }, 2000);
                }
                else {
                    setTimeout(function(): void {
                        storeSelected[0].src = backsideSource;
                        storeSelected[1].src = backsideSource;
                    }, 2000);
                    setTimeout(function(): void {
                        storeSelected.length = 0;
                        storeSource.length = 0;
                        firstFlipped = false;
                        secondFlipped = false;
                        comsTurn = true;
                        comPlays();
                    }, 3000);
                }
            }
        }
    }  
}

//Durchmischen des Arrays, aus welchem der Computer die Nummern für die aufzudeckenden Karten zieht:
function shuffleAvailableCards(array: Array<number>): void {
    for (let i: number = array.length - 1; i > 0; i--) {
        const j: number = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function comPlays(): void {

    if (runAgain == false) {
        if (com1turn == true) {
            document.querySelector("#com").setAttribute("style", "text-decoration: none");
            document.querySelector("#player").setAttribute("style", "text-decoration: underline"); 
        } else if (com1turn == false) {
            document.querySelector("#player").setAttribute("style", "text-decoration: none");
            document.querySelector("#com").setAttribute("style", "text-decoration: underline");
            preventTheOther = true;
        }
    }

    shuffleAvailableCards(availableCards);
    //Computer zeiht immer die ersten beiden Nummern im Array, durch das Durchmischen wird die Zufälligkeit garantiert.
    let firstImage: number = availableCards[0];
    let secondImage: number = availableCards[1];

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
            const index: number = availableCards.indexOf(parseFloat(storeSelected[0].className));
            if (index > -1) {
                availableCards.splice(index, 1);
            }
            const index2: number = availableCards.indexOf(parseFloat(storeSelected[1].className));
            if (index2 > -1) {
                availableCards.splice(index2, 1);
            }
            storeSelected[0].classList.add("invisible");
            storeSelected[1].classList.add("invisible");
            if (comvcom == false) {
                comScored = true;
                givePoints();
            } else {
                if (com1turn == true) {
                    playerScored = true;
                    givePoints();
                }
                else if (com1turn == false) {
                    comScored = true;
                    givePoints();
                }
            } 
            setTimeout(function(): void {
                storeSelected.length = 0;
                storeSource.length = 0;
                comPlays();
                runAgain = true;
            }, 1000);
        }
        else {
            storeSelected[0].src = backsideSource; 
            storeSelected[1].src = backsideSource; 
            runAgain = false; 
        }
        storeSelected.length = 0;
        storeSource.length = 0;
    }

    if (runAgain == false) {
        if (comvcom == true) {
            setTimeout(function(): void {
                if (com1turn == true) {
                    com1turn = false;
                }
                else if (preventTheOther == true) {
                    com1turn = true;
                }
                comPlays();
            }, 5000);
        }
        // Spieler wieder dran:
        else {
            setTimeout(function(): void {
                comsTurn = false;
            }, 4500);
        }
    }
}

function givePoints(): void {
    if (playerScored == true) {
        playerCounter++;
        playerPoints.innerHTML = playerCounter.toString();
        playerScored = false;
    }
    else if (comScored == true) {
        comCounter++;
        comPoints.innerHTML = comCounter.toString();
        comScored = false;
    }
}

//Neues Game starten: booleans und numbers auf ursprünglichen Wert zurücksetzen; divs leer räumen; divs wieder verstecken; Farbe des zuvor geklickten Buttons zurück zu Standard
function nextGame(): void {
    lockDifficulty = false;
    firstFlipped = false;
    secondFlipped = false;
    comsTurn = true;
    if (comvcom == true) {
        com1turn = true;
    }
    cardDeck = [];
    giveClass = 0;
    availableCards.length = 0;
    storeSource.length = 0;
    storeSelected.length = 0;
    storeImg.length = 0;
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

// for (let: index = 0; index < Array.length; index++) {
//     array1[index] == array2[index];
// }