//Schlüssel für EIA-Satz!
//Var-Elemente sammeln:
var stufe1: HTMLInputElement = document.querySelector("#einfach");
var stufe2: HTMLElement = document.querySelector("#normal");
var stufe3: HTMLElement = document.querySelector("#schwer");
var easyContainer: HTMLElement = document.querySelector("#easy-cards");
var mediumContainer: HTMLElement = document.querySelector("#medium-cards");
var hardContainer: HTMLElement = document.querySelector("#hard-cards");

//????? Warum lädt der window.eventlistener meine deklarationen nicht?!

//Booleans für die Schwierigkeiten:
var easy: boolean = false;
var medium: boolean = false;
var hard: boolean = false;
//weitere Bools:
var lockDifficulty: boolean = false;

//Interfaces für die Kartendecks:
interface CardBlueprint {
    source: string;
    key: number;
}

//Event-Listener für die verschiedenen Schalter:
stufe1.addEventListener("click", function(): void {
    easy = true;
    createCarddeck();
});
stufe2.addEventListener("click", function(): void {
    medium = true;
    createCarddeck();
});
stufe3.addEventListener("click", function(): void {
    hard = true;
    createCarddeck();
});

function createCarddeck(): void {
    if (easy == true && lockDifficulty == false) {
        easyContainer.classList.remove("isHidden");
        lockDifficulty = true;
        for (var indexEasy: number = 1; indexEasy <= 8; indexEasy++) {
            pushCardsToDom();
        }
    }
    else if (medium == true && lockDifficulty == false) {
        mediumContainer.classList.remove("isHidden");
        lockDifficulty = true;
        for (var indexMedium: number = 1; indexMedium <= 16; indexMedium++) {
            pushCardsToDom();
        }
    }
    else if (hard == true && lockDifficulty == false) {
        hardContainer.classList.remove("isHidden");
        lockDifficulty = true;
        for (var indexHard: number = 1; indexHard <= 32; indexHard++) {
            pushCardsToDom();
        }
    }
}

function pushCardsToDom(): void {
    var source: string = "images/cards_background.png";
    if (easy == true) {
        easyContainer.innerHTML += "<img src=" + source + " />";
    }
    else if (medium == true) {
        mediumContainer.innerHTML += "<img src=" + source + " />";
    }
    else if (hard == true) {
        hardContainer.innerHTML += "<img src=" + source + " />";
    }
}