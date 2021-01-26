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

//Counter für Unterscheiden der Kartenrückseiten:
var giveClass: number = 0;
var maximumFlipped: number = 0;

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
        // newImg.setAttribute("key", "1");
        // newImg.getAttribute("key") == andersImgt.getAttribute("key");
        easyContainer.appendChild(newImg);
        newImg.addEventListener("click", function(): void {
            if (maximumFlipped < 2) {
                newImg.src = easyDeck[parseFloat(newImg.className)].source;
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
        let newImgMedium: HTMLImageElement = <HTMLImageElement>document.createElement("img");
        newImgMedium.src = backsideSource;
        mediumContainer.appendChild(newImgMedium);
    }
    else if (hard == true) {
        let newImgHard: HTMLImageElement = <HTMLImageElement>document.createElement("img");
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
function nextGame(): void {
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