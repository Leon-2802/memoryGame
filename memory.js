//Schlüssel für EIA-Satz!
//Var-Elemente sammeln:
var stufe1 = document.querySelector("#einfach");
var stufe2 = document.querySelector("#normal");
var stufe3 = document.querySelector("#schwer");
var easyContainer = document.querySelector("#easy-cards");
var mediumContainer = document.querySelector("#medium-cards");
var hardContainer = document.querySelector("#hard-cards");
//????? Warum lädt der window.eventlistener meine deklarationen nicht?!
//Booleans für die Schwierigkeiten:
var easy = false;
var medium = false;
var hard = false;
//weitere Bools:
var lockDifficulty = false;
//Event-Listener für die verschiedenen Schalter:
stufe1.addEventListener("click", function () {
    easy = true;
    createCarddeck();
});
stufe2.addEventListener("click", function () {
    medium = true;
    createCarddeck();
});
stufe3.addEventListener("click", function () {
    hard = true;
    createCarddeck();
});
function createCarddeck() {
    if (easy == true && lockDifficulty == false) {
        easyContainer.classList.remove("isHidden");
        lockDifficulty = true;
        for (var indexEasy = 1; indexEasy <= 8; indexEasy++) {
            pushCardsToDom();
        }
    }
    else if (medium == true && lockDifficulty == false) {
        mediumContainer.classList.remove("isHidden");
        lockDifficulty = true;
        for (var indexMedium = 1; indexMedium <= 16; indexMedium++) {
            pushCardsToDom();
        }
    }
    else if (hard == true && lockDifficulty == false) {
        hardContainer.classList.remove("isHidden");
        lockDifficulty = true;
        for (var indexHard = 1; indexHard <= 32; indexHard++) {
            pushCardsToDom();
        }
    }
}
function pushCardsToDom() {
    var source = "images/cards_background.png";
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
//# sourceMappingURL=memory.js.map