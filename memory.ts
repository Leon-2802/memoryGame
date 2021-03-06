//!! Ich habe Alessia und Neele öfters bei Fragen geholfen und ihnen vor allem Anfangs bisschen auf die
//Sprünge geholfen, daher ähnelt sich unser Code an vielen Stellen, kopiert wurde aber nichts!

//const-variablen (HTMLElemente) sammeln:
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
const announce: HTMLElement = document.querySelector("#announce");

//Spieltyp wählen:
//Booleans für das Wählen des Spieltyps:
var playervplayer: boolean = false;
var playervcom: boolean = true;
var player1turn: boolean;
var preventTheOther: boolean = false;
var comsTurn: boolean = true;
var lockPlaymode: boolean = false;

//QuerySelector und Aktionen für einzelne Spieltyp-Buttons:
p1vscom.addEventListener("click", function(): void {
    //Wenn man das Spiel noch nicht begonnen hat -> lockPlaymode == false:
    if (lockPlaymode == false) {
        //Den passenden Button markieren:
        p1vscom.setAttribute("style", "text-decoration: underline");
        p1vsp2.setAttribute("style", "text-decoration: none");
        //InnerHTML der Spielteilnehmer-Anzeige ändern:
        document.querySelector("#player").innerHTML = "Player:";
        document.querySelector("#com").innerHTML = "Com:";
        //Boolean des anderen modus auf false setzen
        playervplayer = false;
        //Boolean des gewählten Modus auf true:
        playervcom = true;
        //ComsTurn = true -> Com fängt an, Spieler kann nichts tun
        comsTurn = true;
        //com-Anzeige unterstreichen:
        document.querySelector("#com").setAttribute("style", "text-decoration: underline");
        document.querySelector("#player").setAttribute("style", "text-decoration: none");
    }
});
p1vsp2.addEventListener("click", function(): void {
    //Das Gleiche wie oben, nur anders herum:
    if (lockPlaymode == false) {
        p1vscom.setAttribute("style", "text-decoration: none");
        p1vsp2.setAttribute("style", "text-decoration: underline");
        document.querySelector("#player").innerHTML = "Player 1:";
        document.querySelector("#com").innerHTML = "Player 2:";
        playervcom = false;
        playervplayer = true;
        //Player eins beginnt:
        player1turn = true;
        document.querySelector("#player").setAttribute("style", "text-decoration: underline");
        document.querySelector("#com").setAttribute("style", "text-decoration: none"); 
        comsTurn = false;
    }
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
var playerScored: boolean = false;
var comScored: boolean = false;

//Interface für Kartenobjekte:
interface CardBlueprint {
    source: string;
    key: number;
}
//Array für die Karten-Objekte:
var cardDeck: CardBlueprint[] = [];
//Arrays für das zufällige Aufdecken des Computers (wird gekürzt wenn Karten verschwinden, Com mischt es durch bevor er zwei karten wählt):
var availableCards: number [] = [];

//andere Arrays:
//alle Bilder sammeln:
var storeImg: HTMLImageElement [] = [];
//Bildquellen der zwei aufgedeckten Karten zum vergleichen sammeln:
var storeSource: string [] = [];
//Für Medium und Hard wird der Key zum Vergleichen benutzt, da es hier keine gleichen Quellen gibt:
var storeKey: number [] = [];
//die ausgewählten Bilder als images sammeln um dann die Quellen zu ändern um die Karten aufzudecken:
var storeSelected: HTMLImageElement [] = [];
//Class-Names aller Bilder sammeln um auf sie zurückgreifen zu können beim Aufdecken:
var storeClassName: string [] = [];

//Counter für Unterscheiden der Kartenrückseiten durch Classname = giveclass:
var giveClass: number = 0;
//Counter für Punktevergabe:
var playerCounter: number = 0;
//am Anfang 0 anzeigen, indem die number zum string geändert wird:
playerPoints.innerHTML = playerCounter.toString();
//Computer Punkte:
var comCounter: number = 0;
comPoints.innerHTML = comCounter.toString();

//Event-Listener für die verschiedenen Schwierigkeitsgradbuttons:
//Schwierigkeitswahl:
stufe1.addEventListener("click", function(): void {
    //Boolean auf false checken, das nach wählen des Schwierigkeitsgrad zu true gesetzt wird. So wird verhindert, dass 
    //während dem Spiel der Schwierigkeitsgrad gewechselt werden kann.
    if (lockDifficulty == false) {
        //Boolean des Schwierigkeitsgrad auf true, wichtig für den weiteren Verlauf des Codes:
        easy = true;
        //Jetzt wird das Boolean auf true gesetzt, was verhindert, dass während dem Spiel der Spielmodus gewechselt werden kann:
        lockPlaymode = true;
        //for loop geht zwei mal durch für beide Hälften der Kartenpaare:
        for (let index: number = 1; index <= 2; index++) {
            //for loop 4mal für die vier karten paare:
            for (let index: number = 1; index <= 4; index++) {
                //neues Objekt wird erstellt, mit der Quelle der Vorseite und dem passenden key:
                let addCard: CardBlueprint = {
                    //da sich die Namen der einzelnen Bilder nur über die Zahl unterscheiden, kann mit Index alles variabel gestaltet werden,
                    //also hat man am Ende "paar1", "paar2", usw wie im Images-Ordner:
                    source: "images/easy-mode-paare/paar" + index + ".jpg",
                    key: index
                };
                //Objekt ins Array gepusht:
                cardDeck.push(addCard);
            }
        }
        //Für den Computer wird ein Array mit den Nummern der später festgelegten Classnames der Karten erstellt, die der Computer verwenden wird:
        for (let index: number = 0; index <= 7; index++) {
            availableCards.push(index);
        }
        //Funktion zum erstellen der Karten aufgerufen:
        createCarddeck();
        //Der Computer beginnt (in der comPlays-Funktion) wenn der player vs com mode gewählt ist nach 1 Sekunde, also ist noch genug Zeit die restlichen Berechnungen durchzuführen:
        if (playervplayer == false) {
            setTimeout(function(): void {
                comPlays();
            }, 1000);
        }
    }
});
//Für die anderen Stufen ist fast alles gleich, doch gibt es ein Paar Unterschiede:
stufe2.addEventListener("click", function(): void {
    if (lockDifficulty == false) {
        //Natürlich muss ein anderes Boolean für die verwendet werden, damit der richtige Teil der Funktion durchläuft:
        medium = true;
        lockPlaymode = true;
        //Hier geht nicht der gleiche For-Loop 2 Mal durch, sondern braucht es zwei verschiedene For-Loops, da die Paare in zwei Ordner aufgeteilt sind, weil ich die Namen der Bilder
        //gleich halten möchte, die Bilder aber unterschiedlich sind aufgrund der EIA-Sätze.
        //So kann ich weiterhin mit dem Index arbeiten und habe die Bilder zudem übersichtlich auf zwei Ordner aufgeteilt:
        for (let index: number = 1; index <= 8; index++) {
            let addCard: CardBlueprint = {
                source: "images/medium-mode-paare/paar" + index + ".jpg",
                key: index
            };
            cardDeck.push(addCard);
        }
        for (let index: number = 1; index <= 8; index++) {
            let addCard: CardBlueprint = {
                source: "images/medium-mode-paare/zweiteHaelfte/paar" + index + ".jpg",
                key: index
            };
            cardDeck.push(addCard);
        }
        //Natürlich muss der Computer mit 16 Karten-Indikatoren arbeiten, anstatt mit 8 wie bei Easy:
        for (let index: number = 0; index <= 15; index++) {
            availableCards.push(index);
        }
        createCarddeck();
        if (playervplayer == false) {
            setTimeout(function(): void {
                comPlays();
            }, 1000);
        }
    }
});
//Hier ist alles gleich wie bei stufe2, nur sind es eben zweimal 16 Karten bei den For Loops und 32 Nummern für das availableCards-Array:
stufe3.addEventListener("click", function(): void {
    if (lockDifficulty == false) {
        hard = true;
        lockPlaymode = true;
        for (let index: number = 1; index <= 16; index++) {
            let addCard: CardBlueprint = {
                source: "images/hard-mode-paare/paar" + index + ".jpg",
                key: index
            };
            cardDeck.push(addCard);
        }
        for (let index: number = 1; index <= 16; index++) {
            let addCard: CardBlueprint = {
                source: "images/hard-mode-paare/zweiteHaelfte/paar" + index + ".jpg",
                key: index
            };
            cardDeck.push(addCard);
        }
        for (let index: number = 0; index <= 31; index++) {
            availableCards.push(index);
        }
        createCarddeck();
        if (playervplayer == false) {
            setTimeout(function(): void {
                comPlays();
            }, 1000);
        }
    }
});
//Klick auf New Game Button -> Funktion für neues Game aufgerufen:
newGame.addEventListener("click", function(): void {
        nextGame();
});

//Array durchmischen, indem beim eingesetzten Array für die Länge des Arrays immer wieder die Plätze zweier Array-Elemente getauscht werden:
function shuffleArray(array: Array<CardBlueprint>): void {
    for (let i: number = array.length - 1; i > 0; i--) {
        const j: number = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createCarddeck(): void {
    //Passend zur gewählten Stufe wird einer code-Blöcke ausgeführt:
    if (easy == true && lockDifficulty == false) {
        //Der Erklärtext wird entfernt
        easyContainer.innerHTML = "";
        //Für den Fall, dass zu einem späteren Punkt der easy-Mode gewählt wird muss an das Div wieder hervorholen, da es ja in diesem Fall schon versteckt wurde:
        easyContainer.classList.remove("isHidden");
        //Der Text des Buttons wird zu orangerot gefärbt, um den gewählten Button zu markieren:
        stufe1.setAttribute("style", "color: orangered");
        //Das Boolean zum verhindern, dass ein anderer Schwierigkeitsgrad gewählt wird, wird auf true gesetzt -> Buttons sind gesperrt:
        lockDifficulty = true;
        //Das Karten-Array wird gemischt:
        shuffleArray(cardDeck);
        //Die Funktion zum erstellen der Karten auf der Webseite wird 8 Mal aufgerufen (so oft wie es karten braucht):
        for (var indexEasy: number = 1; indexEasy <= 8; indexEasy++) {
            pushCardsToDom();
        }
    }
    //Gleiches bei den anderen Stufen..
    else if (medium == true && lockDifficulty == false) {
        //...nur muss man den easyContainer verstecken und den Erklärtext entfernen für den Fall das nach dem Starten direkt die Medium-Stufe gewählt wird:
        easyContainer.innerHTML = "";
        easyContainer.classList.add("isHidden");
        //...und ein anderer Div-Container wird gebraucht, angepasst an die 16 Karten
        //+ das Div, wo die Karten reinkommen verliert die Klassen "isHidden" und somit das Atrribut display: none
        mediumContainer.classList.remove("isHidden");
        stufe2.setAttribute("style", "color: orangered");
        lockDifficulty = true;
        shuffleArray(cardDeck);
        //...und mehr Durchläufe beim for-loop:
        for (var indexMedium: number = 1; indexMedium <= 16; indexMedium++) {
            pushCardsToDom();
        }
    }
    else if (hard == true && lockDifficulty == false) {
        easyContainer.innerHTML = "";
        easyContainer.classList.add("isHidden");
        hardContainer.classList.remove("isHidden");
        stufe3.setAttribute("style", "color: orangered");
        lockDifficulty = true;
        shuffleArray(cardDeck);
        for (var indexHard: number = 1; indexHard <= 32; indexHard++) {
            pushCardsToDom();
        }
    }
}

function pushCardsToDom(): void {
    //wieder in Abschnitte aufgeteilt, durch den Schwierigkeitsgrad getrennt:
    if (easy == true) {
        //Dieser Bereich wird bis zum EventListener so oft wie es der forLoop in createDeck() sagt durchgeführt:
        //Ein Bildelement erstellen:
        let newImg: HTMLImageElement = <HTMLImageElement>document.createElement("img");
        //Die Quelle des Bildes auf die Rückseiten-Quelle legen, so erscheinen alle Karten gleich:
        newImg.src = backsideSource;
        //Eine Klasse wird hinzugefügt, hier wird die number-variable giveClass verwendet und zum String geändert, so hat man durch das spätere Inkrementieren von giveClass
        //immer eine andere Nummer. Zudem entsprechen die Klassen so der Nummerierung des cardDeck-Arrays, da giveClass bei 0 startet. Das wird bei anklicken der Karten wichtig.
        newImg.classList.add(giveClass.toString());
        //Das Bild wird im storeImg array gesammelt, wird später für den Computer wichtig sein:
        storeImg.push(newImg);
        //Zum Abschluss wird giveClass Inkrementiert für den nächsten Durchlauf und das Bild wird dem Div als Child angehängt:
        giveClass++;
        easyContainer.appendChild(newImg);
        //Hier kommt der EventListener ins Spiel. Bei Klick auf eines der Bilder, die im Moment nur die Rückseite zeigen, wird die Aufdeck-Funktion gestartet.
        //Da der Eventlistener innerhalb der PushCardsToDom-Funktion liegt, weiß der Browser welche Karte gemeint ist, auch wenn keine Klasse dazu zum Element genannt wird:
        newImg.addEventListener("click", function(): void {
            //comsTurn ist nur False nachdem der Com seine Funktion abgeschlossen hat und der Spieler noch nicht zwei nicht passender Karten aufgedeckt hat.
            if (comsTurn == false) {
                //Die beiden Bools werden auf true gesetzt nachdem die erste, bzw zweite Karte aufgedeckt wurde
                if (firstFlipped == false || secondFlipped == false) {
                    //Nur wenn player vs player modus läuft:
                    if (playervplayer == true) {
                        //Durch zwei verschachtelte Booleans wird klargestellt, dass die Player eins und zwei nacheinander dran sind:
                        if (player1turn == false) {
                            //Hier wird das Boolean vom Ende der Funktion verändert, separat von der Abfrage:
                            preventTheOther = true;
                        }
                    }
                    //Die Quelle des angeklickte Bildes wird zur passenden Vorderseite geändert. Durch den Klassenname wählt jedes Bild immer konsequent die gleiche Instanz im Array aus
                    //Das Bild mit Klasse "2" wählt so immer cardDeck[2].source zum Beispiel. Durch das Mischen des Arrays wird gesichert, dass die Quellen nicht immer die gleichen sind.
                    newImg.src = cardDeck[parseFloat(newImg.className)].source;
                    //Die Quelle wird zum Vergleichen in einem Array gesammelt:
                    storeSource.push(newImg.src);
                    //Die ausgewählte Karte wird in einem anderen Array gespeichert, um später wieder die Rückseiten-Quelle zu wählen, falls es kein Paar war:
                    storeSelected.push(newImg);
                    //Ich glaube dieses Array brauche ich nicht mehr, zur Sicherheit lasse ich  es noch drin xD
                    storeClassName.push(newImg.className);
                    //wenn die erste Karte schon aufgedeckt wurde, und somit das Boolean firstFlipped true ist, darf das zweite Boolean verändert werden:
                    if (firstFlipped == true) {
                        secondFlipped = true;
                        //Für den Fall, dass zwei Mal die selbe Karte angeklickt wurde, die Klassen also gleich sind...
                        if (storeSelected[0].className === storeSelected[1].className) {
                            //...wird das zweite Boolean wieder zu False gesetzt um ein weiteres Anklicken einer Karte zu ermöglichen:
                            secondFlipped = false;
                            //Das zweite Element, also die doppelt gewählte karte, wird aus dem Array gelöscht, sowie die Quelle, um zu garantieren, dass das
                            //Vergleichen später einwandfrei klappt:
                            storeSelected.splice(1, 1);
                            storeSource.splice(1, 1);
                        }
                        //Wenn das nicht der Fall ist, darf die Funktion zum checken der Paare aufgerufen werden:
                        else if (storeSelected[0].className != storeSelected[1].className) {
                            checkForPairsEasy();
                        }
                    }
                    //Beim ersten Durchlauf schon möglich:
                    firstFlipped = true;
                }
            }
        });
        function checkForPairsEasy(): void {
            //Wenn schon zwei verschiedene Karten gedreht wurden ist Ausführung möglich:
            if (firstFlipped == true && secondFlipped == true) {
                //Wenn die Quelle beider Kartenvorderseiten gleich ist (also das String mit der Quelle):
                if (storeSource[0] === storeSource[1]) {
                    //Aktion erst nach 2sekunden, da man die aufgedeckten Karten noch kurz sehen soll:
                    setTimeout(function(): void {
                    //Die enstsprechende Zahl im availableCards Array für den Computer wird gelöscht indem der Index des Arrays, der den Wert des Klassennamens als Number
                    //(Daher parseFloat, um string zu number zu machen) hat entfernt wird. Da die Zahlen in availabeCards entsprechen den Klassennamen der Karten.
                        const index: number = availableCards.indexOf(parseFloat(storeSelected[0].className));
                        if (index > -1) {
                            //der Index der Zahl des Klassennamens wird entfernt
                            availableCards.splice(index, 1);
                        }
                        //das gleich für die zweite Karte:
                        const index2: number = availableCards.indexOf(parseFloat(storeSelected[1].className));
                        if (index2 > -1) {
                            availableCards.splice(index2, 1);
                        }
                        //Die Klasse "invisible" setzt ein Element zu visibility: hidden, es ist also nicht mehr zu sehen, nimmt aber noch seinen platz ein, so verschieben
                        //sich die anderen Karten nicht und das Design bleibt bestehen
                        storeSelected[0].classList.add("invisible");
                        storeSelected[1].classList.add("invisible");
                        //Wenn der player vs com modus läuft reicht es einfach dem Spieler die Punkte zu geben, indem man mit playerScored = true die Funktion zum Punkte
                        //geben auswählt . So wird in der Funktion der Spieler gewählt bei der Punktevergabe
                        if (playervplayer == false) {
                            playerScored = true;
                            givePoints();
                        }
                        //else -> über das player1turn boolean wird bestimmt ob Spieler 1 oder 2 Punkte bekommt. Das Boolean wechselt seinen Wert nur wenn einer der Spieler zwei
                        //ungleiche Karten aufgedeckt hat. Ist der Spieler 1 dran, bekommt er die Punkte, da die Punkte des Player 1 gleich mit denen des Player im Player vs Com modus sind
                        else {
                            if (player1turn == true) {
                                playerScored = true;
                                givePoints();
                            }
                            //Der zweite Spieler bekommt seine Punkte auf das gleiche Element wie der computer im player vs com modus, so kann auch hier das "comScored" boolean genutzt werden
                            else if (player1turn == false) {
                                comScored = true;
                                givePoints();
                            }
                        }
                        //Am Ende des Prozesses werden die Arrays zurückgesetzt, um ein weiteres Aufdecken von zwei Karten zu ermöglichen:
                        storeSelected.length = 0;
                        storeSource.length = 0;
                        storeClassName.length = 0;
                        //Und die Booleans, welche das Aufdecken von bis zu zwei Karten erlauben müssen auch zurückgesetzt werden
                        firstFlipped = false;
                        secondFlipped = false;
                        //!Da weder die Funktion des Computers aufgerufen wird, noch zum anderen Spieler im p1 vs p2 modus gewechselt wird, kann der spieler ein weiteres Mal Karten aufdecken,
                        //Da im Memory nach dem Entdecken eines Paares noch einmal aufgedeckt werden darf
                    }, 2000);
                }
                else {
                    //Wenn es kein Paar war wird einfach wieder die Quelle geändert, damit die Rückseite erscheint:
                    //Auch hier mit 2 Sekunden Wartezeit
                    setTimeout(function(): void {
                        storeSelected[0].src = backsideSource;
                        storeSelected[1].src = backsideSource;
                    }, 2000);
                    //Eine Sekunde nach dem Zudecken folgt der Rest des else-Codeblocks:
                    setTimeout(function(): void {
                        //Wie oben auch werden die Arrays zum Sammeln der aufgedeckten Karten wieder auf 0 gesetzt:
                        storeSelected.length = 0;
                        storeSource.length = 0;
                        storeClassName.length = 0;
                        //Die Booleans zum Aufdecken werden zurückgesetzt:
                        firstFlipped = false;
                        secondFlipped = false;
                        //Wenn nicht der player vs player modus läuft...
                        if (playervplayer == false) {
                            //...wird mit comsTurn verhindert, dass der Player wieder Karten aufdecken kann (firstFlipped und SecondFlipped sind ja wieder false):
                            comsTurn = true;
                            //Zudem wird der com unten in der Anzeige markiert, indem das HTMLElement unterstrichen wird:
                            document.querySelector("#com").setAttribute("style", "text-decoration: underline");
                            document.querySelector("#player").setAttribute("style", "text-decoration: none");
                            //Die Computer Funktion beginnt:
                            comPlays();
                        }
                        //Beim Player vs Player Modus:
                        else {
                            //Wenn der erste Player dran ist...
                            if (player1turn == true) {
                                //..wird der Player 2 unterstrichen, und beim ersten die Dekoration entfernt:
                                document.querySelector("#player").setAttribute("style", "text-decoration: none");
                                document.querySelector("#com").setAttribute("style", "text-decoration: underline");
                            } else if (player1turn == false) {
                                //...und anders herum wenn der Player 1 nicht an der Reihe ist:
                                document.querySelector("#com").setAttribute("style", "text-decoration: none");
                                document.querySelector("#player").setAttribute("style", "text-decoration: underline"); 
                            }
                            //Hier wird dann das Boolean gewechselt, sodass alles Aktionen wo es eine Unterscheidung der beiden Player braucht, auf den Player abgestimmt sind der
                            //jetzt an der Reihe ist. So wird zum Beispiel garantiert, dass der richtige Player die Punkte bekommt:
                            if (player1turn == true) {
                                player1turn = false;
                            }
                            //PreventTheOther ist ein Boolean, das ermöglicht das Boolean player1turn jede Runde in der gleichen Funktion untereinander zu wechseln. Sonst würde sich
                            //das Boolean immer wieder zu true zurückändern, würde man unten "if (player1turn == false) {player1turn = true;}"" schreiben
                            else if (preventTheOther == true) {
                                //-> Wenn der player 1 also nicht dran ist, player1turn == false ist, wird das boolean wiedr auf true gesetzt und alle Aktionen laufen wieder auf den Player1
                                player1turn = true;
                            }
                        }
                    }, 3000);                   
                }
            }
        }
    }
    //Bei der Medium- und Hardstufe ist alles genau gleich wie bei easy, nur wird das erstellen von den Karten eben 16 oder 32 Mal durchgeführt:
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
                    if (playervplayer == true) {
                        if (player1turn == false) {
                            preventTheOther = true;
                        }
                    }
                    newImgMedium.src = cardDeck[parseFloat(newImgMedium.className)].source;
                    storeKey.push(cardDeck[parseFloat(newImgMedium.className)].key);
                    storeSelected.push(newImgMedium);
                    if (firstFlipped == true) {
                        secondFlipped = true;
                        if (storeSelected[0].className === storeSelected[1].className) {
                            secondFlipped = false;
                            storeSelected.splice(1, 1);
                            storeKey.splice(1, 1);
                        }
                        else if (storeSelected[0].className != storeSelected[1].className) {
                            checkForPairsMedium();
                        }
                    }
                    firstFlipped = true;
                }
            }
        });
        function checkForPairsMedium(): void {
            if (firstFlipped == true && secondFlipped == true) {
                if (storeKey[0] == storeKey[1]) {
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
                        if (playervplayer == false) {
                            playerScored = true;
                            givePoints();
                        }
                        else {
                            if (player1turn == true) {
                                playerScored = true;
                                givePoints();
                            }
                            else if (player1turn == false) {
                                comScored = true;
                                givePoints();
                            }
                        }
                        storeSelected.length = 0;
                        storeKey.length = 0;
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
                        storeKey.length = 0;
                        firstFlipped = false;
                        secondFlipped = false;
                        if (playervplayer == false) {
                            comsTurn = true;
                            document.querySelector("#com").setAttribute("style", "text-decoration: underline");
                            document.querySelector("#player").setAttribute("style", "text-decoration: none");
                            comPlays();
                        }
                        else {
                            if (player1turn == true) {
                                document.querySelector("#player").setAttribute("style", "text-decoration: none");
                                document.querySelector("#com").setAttribute("style", "text-decoration: underline");
                            } else if (player1turn == false) {
                                document.querySelector("#com").setAttribute("style", "text-decoration: none");
                                document.querySelector("#player").setAttribute("style", "text-decoration: underline"); 
                            }
                            if (player1turn == true) {
                                player1turn = false;
                            }
                            else if (preventTheOther == true) {
                                player1turn = true;
                            }
                        }
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
                    if (playervplayer == true) {
                        if (player1turn == false) {
                            preventTheOther = true;
                        }
                    }
                    newImgHard.src = cardDeck[parseFloat(newImgHard.className)].source;
                    storeKey.push(cardDeck[parseFloat(newImgHard.className)].key);
                    storeSelected.push(newImgHard);
                    if (firstFlipped == true) {
                        secondFlipped = true;
                        if (storeSelected[0].className === storeSelected[1].className) {
                            secondFlipped = false;
                            storeSelected.splice(1, 1);
                            storeKey.splice(1, 1);
                        }
                        else if (storeSelected[0].className != storeSelected[1].className) {
                            checkForPairsHard();
                        }
                    }
                    firstFlipped = true; 
                }
            }
        });
        function checkForPairsHard(): void {
            if (firstFlipped == true && secondFlipped == true) {
                if (storeKey[0] == storeKey[1]) {
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
                        if (playervplayer == false) {
                            playerScored = true;
                            givePoints();
                        }
                        else {
                            if (player1turn == true) {
                                playerScored = true;
                                givePoints();
                            }
                            else if (player1turn == false) {
                                comScored = true;
                                givePoints();
                            }
                        }
                        storeSelected.length = 0;
                        storeKey.length = 0;
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
                        storeKey.length = 0;
                        firstFlipped = false;
                        secondFlipped = false;
                        if (playervplayer == false) {
                            comsTurn = true;
                            document.querySelector("#com").setAttribute("style", "text-decoration: underline");
                            document.querySelector("#player").setAttribute("style", "text-decoration: none");
                            comPlays();
                        }
                        else {
                            if (player1turn == true) {
                                document.querySelector("#player").setAttribute("style", "text-decoration: none");
                                document.querySelector("#com").setAttribute("style", "text-decoration: underline");
                            } else if (player1turn == false) {
                                document.querySelector("#com").setAttribute("style", "text-decoration: none");
                                document.querySelector("#player").setAttribute("style", "text-decoration: underline"); 
                            }
                            if (player1turn == true) {
                                player1turn = false;
                            }
                            else if (preventTheOther == true) {
                                player1turn = true;
                            }
                        }
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
    //array mit allen Nummern die gleich zu den Klassennamen der Karten im Spiel sind, wird durchgemischt in der shuffle-Funktion:
    shuffleAvailableCards(availableCards);
    //Computer zeiht immer die ersten beiden Nummern im Array, durch das Durchmischen des Arrays wird die Zufälligkeit garantiert.
    let firstImage: number = availableCards[0];
    let secondImage: number = availableCards[1];

    //Die erste Karte wird durch den Computer aufgedeckt indem er die Quelle des Bildes aus dem StoreImg-Array ändert. In storeImg befinden sich alle Bildelemente die auf dem Feld liegen
    //Durch die zufällige Zahl aus firstImage wird die ausgewählte Karte umgedreht, also die Quelle geändert.
    //Das änderen der Quelle ist wie in Nutzerfunktion mit dem Klassennamen der karte, nur das hier das Bild aus StoreImg benutzt wird und mit firstImage die vom Computer gewählte Zahl benutzt
    //wird:
    storeImg[firstImage].src = cardDeck[parseFloat(storeImg[firstImage].className)].source;
    //Key aus dem ObjekArray der Karten wird zum Vergleichen der Karten in ein Array gepusht:
    storeKey.push(cardDeck[parseFloat(storeImg[firstImage].className)].key);
    //die gewählte Karte wird auch in ein Array gepusht:
    storeSelected.push(storeImg[firstImage]);
    //Zweite Karte, 1 Sekunde später, gleiche Herangehensweise wie oben:
    setTimeout(function(): void {
        storeImg[secondImage].src = cardDeck[parseFloat(storeImg[secondImage].className)].source;
        storeKey.push(cardDeck[parseFloat(storeImg[secondImage].className)].key);
        storeSelected.push(storeImg[secondImage]);
        //2 Sekunden nach der zweiten Karte wird die Vergleich-Funktion aufgerufen:
        if (easy == true) {
            setTimeout(function(): void {
                checkPairs();
            }, 2000);
        }
        //Bei Medium nach 1,5
        else if (medium == true) {
            setTimeout(function(): void {
                checkPairs();
            }, 1500);
        }
        //und bei Hard nach 1 Sekunde
        else if (hard == true) {
            setTimeout(function(): void {
                checkPairs();
            }, 1000);
        }
    },1000);
    function checkPairs(): void {
        //Karten werden verglichen, wenn die Keys gleich sind (=gleiche Vorderseite) ist es ein Paar:
        if (storeKey[0] == storeKey[1]) {
            //Erst werden die vom Computer gewählten Zahlen aus dem availableCards Array gestrichen, so kann der Computer nicht die schon entdeckten Paare wieder aufdecken:
            //Da firstImage außerhalb der Funktion liegt wird der Klassenname der aufgedeckten Karte verwendet, welche gleich den vom Computer gewählten Zahlen ist:
            const index: number = availableCards.indexOf(parseFloat(storeSelected[0].className));
            if (index > -1) {
                availableCards.splice(index, 1);
            }
            const index2: number = availableCards.indexOf(parseFloat(storeSelected[1].className));
            if (index2 > -1) {
                availableCards.splice(index2, 1);
            }
            //Die gespeicherten, bzw das entdeckte Paar, Bilder werden entfernt, indem sie visibility: hidden bekommen:
            storeSelected[0].classList.add("invisible");
            storeSelected[1].classList.add("invisible");
            //ComScored = true stellt sicher, dass der Teil der givePoints Funktion durchläuft, der für den Computer gilt:
            comScored = true;
            //givePoints wird aufgerufen:
            givePoints();
            //Nach 1 Sekunde ist der Computer noch einmal dran, da nach dem Aufdecken eines Paares ja nochmal aufgedeckt werden darf:
            setTimeout(function(): void {
                //natürlich wieder die Arrays zum speichern der Karten und der Keys wieder auf Null setzen, sonst würde das Vergleichen nicht klappen:
                storeSelected.length = 0;
                storeKey.length = 0;
                //nochmal die Funktion aufrufen:
                comPlays();
            }, 1000);
        }
        else {
            //die gewählten Bilder bekommen wieder ihre Rückseite als Quelle und werden so umgedreht:
            storeSelected[0].src = backsideSource; 
            storeSelected[1].src = backsideSource; 
            //Players Turn ermöglicht es dem Player wieder Karten auszuwählen, da er jetzt an der Reihe ist:
            playersTurn(); 
            //Arrays wieder zurücksetzen für den nächsten Durchlauf (nachdem der Player dran war):
            storeSelected.length = 0;
            storeKey.length = 0;
        }
    }

    function playersTurn(): void {
        // Spieler wieder dran, da das Boolean, das die Funktion des Players blockt wieder auf False gesetzt wird, und so die Funktion nicht mehr geblockt ist:
        comsTurn = false;
        //Der player wird als unterstrichen angezeigt, so sieht der Nutzer wer an der Reihe ist:
        document.querySelector("#com").setAttribute("style", "text-decoration: none");
        document.querySelector("#player").setAttribute("style", "text-decoration: underline");
    }
}

function givePoints(): void {
    //Wenn der Player ein Paar entdeckt hat:
    if (playerScored == true) {
        //Der Player Counter wird um 1 erhöht..
        playerCounter++;
        //und der Counter als innerHTML auf die vorherige Zahl der Punkteanzeige überschrieben
        playerPoints.innerHTML = playerCounter.toString();
        //PlayerScored wieder auf False setzen um Bugs zu verhindern:
        playerScored = false;
        //Die Funktion zum aufrufen des Siegers wird aufgerufen:
        announceWinner();
    }
    //Das selbe nur mir den Variablen und HTMLElemet des Computers:
    else if (comScored == true) {
        comCounter++;
        comPoints.innerHTML = comCounter.toString();
        comScored = false;
        announceWinner();
    }
}
//Wird immer nach jeder Punktevergabe aufgerufen...
function announceWinner(): void {
    //..aber nur ausgeführt wenn es keine Elemente mehr im AvailableCards Arrays gibt. Das Array wird bei jedem entdeckten Paar gekürzt, so muss es nach bei Spielende, also wenn keine
    //Karten mehr vorhanden sind bei Null liegen:
    if (availableCards.length <= 0) {
        //Wenn der Player1/ Player mehr Punkte hat
        if (playerCounter > comCounter) {
            //nach einer Sekunde wird...
            setTimeout(function(): void {
                //Dem Playmode entsprechend eine Nachricht angezeigt indem...
                if (playervplayer == false) {
                    //...Der innerHTML vom announce-Text an den Sieger/Playmode angepasst wird
                    announce.innerHTML = "You've won the game! Congrats!";
                    //..der Text auf der Webseite sichtbar wird
                    announce.style.opacity = "100%";
                    //...und die Textfarbe an die Farbe des Players angepasst wird
                    announce.style.color = "lightblue";
                }
                else if (playervplayer == true) {
                    announce.innerHTML = "Player 1 has won the game!";
                    announce.style.opacity = "100%";
                    announce.style.color = "lightblue";
                }
            }, 1000);
        }
        //wenn der Computer/Player 2 mehr Punkte hat passiert das selbe nur eben angepasst an die andere Situation
        else if (comCounter > playerCounter) {
            setTimeout(function(): void {
                if (playervplayer == false) {
                    announce.innerHTML = "Weak performance... the computer did you dirty!";
                    announce.style.opacity = "100%";
                    announce.style.color = "orange";
                }
                else if (playervplayer == true) {
                    announce.innerHTML = "Player 2 has won the Game!";
                    announce.style.opacity = "100%";
                    announce.style.color = "orange";
                }
            }, 1000);
        }
        //bei unentschieden bleibt der Text weiß und es wird ein passender Text angezeigt:
        else if (comCounter == playerCounter) {
            setTimeout(function(): void {
                announce.innerHTML = "It's a tie game!";
                announce.style.opacity = "100%";
            }, 1000);
        }
    }
}
//Neues Game starten: booleans und numbers auf ursprünglichen Wert zurücksetzen; divs leer räumen; divs wieder verstecken; Farbe des zuvor geklickten Buttons zurück zu Standard
function nextGame(): void {
    //Alle verwendeten Booleans zurückgesetzt:
    lockDifficulty = false;
    firstFlipped = false;
    secondFlipped = false;
    lockPlaymode = false;
    //Abhängig vom Playmode wird das passende Element (Player/Com, player1/player2) unterstrichen und die benötigten Booleans auf den ursprünglichen Wert gesetzt:
    if (playervplayer == true) {
        player1turn = true;
        document.querySelector("#com").setAttribute("style", "text-decoration: none");
        document.querySelector("#player").setAttribute("style", "text-decoration: underline"); 
    }
    else if (playervplayer == false) {
        comsTurn = true;
        document.querySelector("#com").setAttribute("style", "text-decoration: underline");
        document.querySelector("#player").setAttribute("style", "text-decoration: none"); 
    }
    //Alle im Dokument verwendeten Arrays werden auf Null gesetzt:
    cardDeck = [];
    giveClass = 0;
    availableCards.length = 0;
    storeSource.length = 0;
    storeKey.length = 0;
    storeSelected.length = 0;
    storeImg.length = 0;
    //Die Counter für Player und Com werden wieder auf Null gesetzt und die Anzeige aktualisiert;
    playerCounter = 0;
    playerPoints.innerHTML = playerCounter.toString();
    comCounter = 0;
    comPoints.innerHTML = comCounter.toString();
    //das Textfeld zum aufrufen des Siegers wird wieder verdeckt: 
    announce.style.opacity = "0";
    announce.style.color = "white";
    //Passend zum gewählten Schwierigkeitsgrad wird der Container gelehrt (keine Karten mehr) und dann versteckt, um zu vermeiden dass sich beim nächsten Spiel 
    //die Container im Weg stehen
    //Dann wird die Farbe des Buttons wieder zum ursprünglichen Schwarz zurückgesetzt und das Boolean der Stufe zurück auf False gesetzt:
    if (easy == true) {
        easyContainer.innerHTML = "";
        easyContainer.classList.add("isHidden");
        stufe1.style.color = "black";
        easy = false;
    }
    else if (medium == true) {
        mediumContainer.innerHTML = "";
        mediumContainer.classList.add("isHidden");
        stufe2.style.color = "black";
        medium = false;
    }
    else if (hard == true) {
        hardContainer.innerHTML = "";
        hardContainer.classList.add("isHidden");
        stufe3.style.color = "black";
        hard = false;
    }
}