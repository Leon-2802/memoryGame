//Schlüssel für EIA-Satz!
//Var-Elemente sammeln:
const stufe1: HTMLElement = document.getElementById("eins");
const stufe2: HTMLElement = document.getElementById("zwei");
const stufe3: HTMLElement = document.getElementById("drei");

//Booleans für die Schwierigkeiten:
var easy: boolean = false;
var medium: boolean = false;
var hard: boolean = false;

//Interfaces für die Kartendecks:
interface CardBlueprint {
    source: string;
    key: number;
}

//Event-Listener für die verschiedenen Schalter:
stufe1.addEventListener("click", function(): void {
    easy = true;
});
stufe2.addEventListener("click", function(): void {
    medium = true;
});
stufe3.addEventListener("click", function(): void {
    hard = true;
});

function createCarddeck(): void {

}