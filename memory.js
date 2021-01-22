//Schlüssel für EIA-Satz!
//Var-Elemente sammeln:
var stufe1 = document.getElementById("eins");
var stufe2 = document.getElementById("zwei");
var stufe3 = document.getElementById("drei");
//Booleans für die Schwierigkeiten:
var easy = false;
var medium = false;
var hard = false;
//Event-Listener für die verschiedenen Schalter:
stufe1.addEventListener("click", function () {
    easy = true;
});
stufe2.addEventListener("click", function () {
    medium = true;
});
stufe3.addEventListener("click", function () {
    hard = true;
});
function createCarddeck() {
}
//# sourceMappingURL=memory.js.map