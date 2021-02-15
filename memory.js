//const-variablen (HTMLElemente) sammeln:
var stufe1 = document.querySelector("#einfach");
var stufe2 = document.querySelector("#normal");
var stufe3 = document.querySelector("#schwer");
var easyContainer = document.querySelector("#easy-cards");
var mediumContainer = document.querySelector("#medium-cards");
var hardContainer = document.querySelector("#hard-cards");
var newGame = document.querySelector("#new-game");
var playerPoints = document.querySelector("#p-number");
var comPoints = document.querySelector("#c-number");
var p1vscom = document.querySelector("#h21");
var p1vsp2 = document.querySelector("#h22");
var announce = document.querySelector("#announce");
//Spieltyp wählen:
//Booleans für das Wählen des Spieltyps:
var playervplayer = false;
var playervcom = false;
var player1turn;
var preventTheOther = false;
var comsTurn = true;
var lockPlaymode = false;
//QuerySelector und Aktionen für einzelne Spieltyp-Buttons:
p1vscom.addEventListener("click", function () {
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
p1vsp2.addEventListener("click", function () {
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
var backsideSource = "images/cards_background.png";
//Booleans für die Schwierigkeiten:
var easy = false;
var medium = false;
var hard = false;
//weitere Bools:
var lockDifficulty = false;
var firstFlipped = false;
var secondFlipped = false;
var flipBack = false;
var playerScored = false;
var comScored = false;
//Array für die Karten-Objekte:
var cardDeck = [];
//Arrays für das zufällige Aufdecken des Computers (wird gekürzt wenn Karten verschwinden, Com mischt es durch bevor er zwei karten wählt):
var availableCards = [];
//andere Arrays:
//alle Bilder sammeln:
var storeImg = [];
//Bildquellen der zwei aufgedeckten Karten zum vergleichen sammeln:
var storeSource = [];
//die ausgewählten Bilder als images sammeln um dann die Quellen zu ändern um die Karten aufzudecken:
var storeSelected = [];
//Class-Names aller Bilder sammeln um auf sie zurückgreifen zu können beim Aufdecken:
var storeClassName = [];
//Counter für Unterscheiden der Kartenrückseiten durch Classname = giveclass:
var giveClass = 0;
//Counter für Punktevergabe:
var playerCounter = 0;
//am Anfang 0 anzeigen, indem die number zum string geändert wird:
playerPoints.innerHTML = playerCounter.toString();
//Computer Punkte:
var comCounter = 0;
comPoints.innerHTML = comCounter.toString();
//Event-Listener für die verschiedenen Schwierigkeitsgradbuttons:
//Schwierigkeitswahl:
stufe1.addEventListener("click", function () {
    //Boolean auf false checken, das nach wählen des Schwierigkeitsgrad zu true gesetzt wird. So wird verhindert, dass 
    //während dem Spiel der Schwierigkeitsgrad gewechselt werden kann.
    if (lockDifficulty == false) {
        //Boolean des Schwierigkeitsgrad auf true, wichtig für den weiteren Verlauf des Codes:
        easy = true;
        //Jetzt wird das Boolean auf true gesetzt, was verhindert, dass während dem Spiel der Spielmodus gewechselt werden kann:
        lockPlaymode = true;
        //for loop geht zwei mal durch für beide Hälften der Kartenpaare:
        for (var index = 1; index <= 2; index++) {
            //for loop 4mal für die vier karten paare:
            for (var index_1 = 1; index_1 <= 4; index_1++) {
                //neues Objekt wird erstellt, mit der Quelle der Vorseite und dem passenden key:
                var addCard = {
                    //da sich die Namen der einzelnen Bilder nur über die Zahl unterscheiden, kann mit Index alles variabel gestaltet werden,
                    //also hat man am Ende "paar1", "paar2", usw wie im Images-Ordner:
                    source: "images/easy-mode-paare/paar" + index_1 + ".jpg",
                    key: index_1
                };
                //Objekt ins Array gepusht:
                cardDeck.push(addCard);
            }
        }
        //Für den Computer wird ein Array mit den Nummern der später festgelegten Classnames der Karten erstellt:
        for (var index = 0; index <= 7; index++) {
            availableCards.push(index);
        }
        //Funktion zum erstellen der Karten aufgerufen:
        createCarddeck();
        //Der Computer beginnt (in der comPlays-Funktion) wenn der player vs com mode gewählt ist nach 1 Sekunde, also ist noch genug Zeit die restlichen Berechnungen durchzuführen:
        if (playervplayer == false) {
            setTimeout(function () {
                comPlays();
            }, 1000);
        }
    }
});
//Für die anderen Stufen ist alles gleich, nur unterscheidet sich die Anzahl der Karten, der Ordner der Bildquellen und das Boolean des Schwierigkeitsgrads:
stufe2.addEventListener("click", function () {
    if (lockDifficulty == false) {
        medium = true;
        lockPlaymode = true;
        for (var index = 1; index <= 2; index++) {
            for (var index_2 = 1; index_2 <= 8; index_2++) {
                var addCard = {
                    source: "images/medium-mode-paare/paar" + index_2 + ".jpg",
                    key: index_2
                };
                cardDeck.push(addCard);
            }
        }
        for (var index = 0; index <= 15; index++) {
            availableCards.push(index);
        }
        createCarddeck();
        if (playervplayer == false) {
            setTimeout(function () {
                comPlays();
            }, 1000);
        }
    }
});
stufe3.addEventListener("click", function () {
    if (lockDifficulty == false) {
        hard = true;
        lockPlaymode = true;
        for (var index = 1; index <= 2; index++) {
            for (var index_3 = 1; index_3 <= 16; index_3++) {
                var addCard = {
                    source: "images/hard-mode-paare/paar" + index_3 + ".jpg",
                    key: index_3
                };
                cardDeck.push(addCard);
            }
        }
        for (var index = 0; index <= 31; index++) {
            availableCards.push(index);
        }
        createCarddeck();
        if (playervplayer == false) {
            setTimeout(function () {
                comPlays();
            }, 1000);
        }
    }
});
//Klick auf New Game Button -> Funktion für neues Game aufgerufen:
newGame.addEventListener("click", function () {
    nextGame();
});
//Array durchmischen, indem beim eingesetzten Array für die Länge des Arrays immer wieder die Plätze zweier Array-Elemente getauscht werden:
function shuffleArray(array) {
    var _a;
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [array[j], array[i]], array[i] = _a[0], array[j] = _a[1];
    }
}
function createCarddeck() {
    //Passend zur gewählten Stufe wird einer code-Blöcke ausgeführt:
    if (easy == true && lockDifficulty == false) {
        //Das Div, wo die Karten reinkommen verliert die Klassen "isHidden" und somit das Atrribut display: none
        easyContainer.classList.remove("isHidden");
        //Der Text des Buttons wird zu cyan gefärbt, um den gewählten Button zu markieren:
        stufe1.setAttribute("style", "color: orangered");
        //Das Boolean zum verhindern, dass ein anderer Schwierigkeitsgrad gewählt wird, wird auf true gesetzt -> Buttons sind gesperrt:
        lockDifficulty = true;
        //Das Karten-Array wird gemischt:
        shuffleArray(cardDeck);
        //Die Funktion zum erstellen der Karten auf der Webseite wird 8 Mal aufgerufen (so oft wie es karten braucht):
        for (var indexEasy = 1; indexEasy <= 8; indexEasy++) {
            pushCardsToDom();
        }
    }
    //Gleiches bei den anderen Stufen..
    else if (medium == true && lockDifficulty == false) {
        //...nur ein anderer Div-Container, angepasst an die 16 Karten
        mediumContainer.classList.remove("isHidden");
        stufe2.setAttribute("style", "color: orangered");
        lockDifficulty = true;
        shuffleArray(cardDeck);
        //...und mehr Durchläufe beim for-loop:
        for (var indexMedium = 1; indexMedium <= 16; indexMedium++) {
            pushCardsToDom();
        }
    }
    else if (hard == true && lockDifficulty == false) {
        hardContainer.classList.remove("isHidden");
        stufe3.setAttribute("style", "color: orangered");
        lockDifficulty = true;
        shuffleArray(cardDeck);
        for (var indexHard = 1; indexHard <= 32; indexHard++) {
            pushCardsToDom();
        }
    }
}
function pushCardsToDom() {
    //wieder in Abschnitte aufgeteilt, durch den Schwierigkeitsgrad getrennt:
    if (easy == true) {
        //Dieser Bereich wird bis zum EventListener so oft wie es der forLoop in createDeck() sagt durchgeführt:
        //Ein Bildelement erstellen:
        var newImg_1 = document.createElement("img");
        //Die Quelle des Bildes auf die Rückseiten-Quelle legen, so erscheinen alle Karten gleich:
        newImg_1.src = backsideSource;
        //Eine Klasse wird hinzugefügt, hier wird die number-variable giveClass verwendet und zum String geändert, so hat man durch das spätere Inkrementieren von giveClass
        //immer eine andere Nummer. Zudem entsprechen die Klassen so der Nummerierung des cardDeck-Arrays, da giveClass bei 0 startet. Das wird bei anklicken der Karten wichtig.
        newImg_1.classList.add(giveClass.toString());
        //Das Bild wird im storeImg array gesammelt, wird später für den Computer wichtig sein:
        storeImg.push(newImg_1);
        //Zum Abschluss wird giveClass Inkrementiert für den nächsten Durchlauf und das Bild wird dem Div als Child angehängt:
        giveClass++;
        easyContainer.appendChild(newImg_1);
        //Hier kommt der EventListener ins Spiel. Bei Klick auf eines der Bilder, die im Moment nur die Rückseite zeigen, wird die Aufdeck-Funktion gestartet.
        //Da der Eventlistener innerhalb der PushCardsToDom-Funktion liegt, weiß der Browser welche Karte gemeint ist, auch wenn keine Klasse dazu zum Element genannt wird:
        newImg_1.addEventListener("click", function () {
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
                    newImg_1.src = cardDeck[parseFloat(newImg_1.className)].source;
                    //Die Quelle wird zum Vergleichen in einem Array gesammelt:
                    storeSource.push(newImg_1.src);
                    //Die ausgewählte Karte wird in einem anderen Array gespeichert, um später wieder die Rückseiten-Quelle zu wählen, falls es kein Paar war:
                    storeSelected.push(newImg_1);
                    //Ich glaube dieses Array brauche ich nicht mehr, zur Sicherheit lasse ich  es noch drin xD
                    storeClassName.push(newImg_1.className);
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
        function checkForPairsEasy() {
            //Wenn schon zwei verschiedene Karten gedreht wurden ist Ausführung möglich:
            if (firstFlipped == true && secondFlipped == true) {
                //Wenn die Quelle beider Kartenvorderseiten gleich ist (also das String mit der Quelle):
                if (storeSource[0] === storeSource[1]) {
                    //Aktion erst nach 2sekunden, da man die aufgedeckten Karten noch kurz sehen soll:
                    setTimeout(function () {
                        //Die enstsprechende Zahl im availableCards Array für den Computer wird gelöscht indem der Index des Arrays, der den Wert des Klassennamens als Number
                        //(Daher parseFloat, um string zu number zu machen) hat entfernt wird. Da die Zahlen in availabeCards entsprechen den Klassennamen der Karten.
                        var index = availableCards.indexOf(parseFloat(storeSelected[0].className));
                        if (index > -1) {
                            //der Index der Zahl des Klassennamens wird entfernt
                            availableCards.splice(index, 1);
                        }
                        //das gleich für die zweite Karte:
                        var index2 = availableCards.indexOf(parseFloat(storeSelected[1].className));
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
                    setTimeout(function () {
                        storeSelected[0].src = backsideSource;
                        storeSelected[1].src = backsideSource;
                    }, 2000);
                    //Eine Sekunde nach dem Zudecken folgt der Rest des else-Codeblocks:
                    setTimeout(function () {
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
                            }
                            else if (player1turn == false) {
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
        var newImgMedium_1 = document.createElement("img");
        newImgMedium_1.src = backsideSource;
        newImgMedium_1.classList.add(giveClass.toString());
        storeImg.push(newImgMedium_1);
        giveClass++;
        mediumContainer.appendChild(newImgMedium_1);
        newImgMedium_1.addEventListener("click", function () {
            if (comsTurn == false) {
                if (firstFlipped == false || secondFlipped == false) {
                    if (playervplayer == true) {
                        if (player1turn == false) {
                            preventTheOther = true;
                        }
                    }
                    newImgMedium_1.src = cardDeck[parseFloat(newImgMedium_1.className)].source;
                    storeSource.push(newImgMedium_1.src);
                    storeSelected.push(newImgMedium_1);
                    if (firstFlipped == true) {
                        secondFlipped = true;
                        if (storeSelected[0].className === storeSelected[1].className) {
                            secondFlipped = false;
                            storeSelected.splice(1, 1);
                            storeSource.splice(1, 1);
                        }
                        else if (storeSelected[0].className != storeSelected[1].className) {
                            checkForPairsMedium();
                        }
                    }
                    firstFlipped = true;
                }
            }
        });
        function checkForPairsMedium() {
            if (firstFlipped == true && secondFlipped == true) {
                if (storeSource[0] === storeSource[1]) {
                    setTimeout(function () {
                        var index = availableCards.indexOf(parseFloat(storeSelected[0].className));
                        if (index > -1) {
                            availableCards.splice(index, 1);
                        }
                        var index2 = availableCards.indexOf(parseFloat(storeSelected[1].className));
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
                        storeSource.length = 0;
                        firstFlipped = false;
                        secondFlipped = false;
                    }, 2000);
                }
                else {
                    setTimeout(function () {
                        storeSelected[0].src = backsideSource;
                        storeSelected[1].src = backsideSource;
                    }, 2000);
                    setTimeout(function () {
                        storeSelected.length = 0;
                        storeSource.length = 0;
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
                            }
                            else if (player1turn == false) {
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
        var newImgHard_1 = document.createElement("img");
        newImgHard_1.src = backsideSource;
        newImgHard_1.classList.add(giveClass.toString());
        storeImg.push(newImgHard_1);
        giveClass++;
        hardContainer.appendChild(newImgHard_1);
        newImgHard_1.addEventListener("click", function () {
            if (comsTurn == false) {
                if (firstFlipped == false || secondFlipped == false) {
                    if (playervplayer == true) {
                        if (player1turn == false) {
                            preventTheOther = true;
                        }
                    }
                    newImgHard_1.src = cardDeck[parseFloat(newImgHard_1.className)].source;
                    storeSource.push(newImgHard_1.src);
                    storeSelected.push(newImgHard_1);
                    if (firstFlipped == true) {
                        secondFlipped = true;
                        if (storeSelected[0].className === storeSelected[1].className) {
                            secondFlipped = false;
                            storeSelected.splice(1, 1);
                            storeSource.splice(1, 1);
                        }
                        else if (storeSelected[0].className != storeSelected[1].className) {
                            checkForPairsHard();
                        }
                    }
                    firstFlipped = true;
                }
            }
        });
        function checkForPairsHard() {
            if (firstFlipped == true && secondFlipped == true) {
                if (storeSource[0] === storeSource[1]) {
                    setTimeout(function () {
                        var index = availableCards.indexOf(parseFloat(storeSelected[0].className));
                        if (index > -1) {
                            availableCards.splice(index, 1);
                        }
                        var index2 = availableCards.indexOf(parseFloat(storeSelected[1].className));
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
                        storeSource.length = 0;
                        firstFlipped = false;
                        secondFlipped = false;
                    }, 2000);
                }
                else {
                    setTimeout(function () {
                        storeSelected[0].src = backsideSource;
                        storeSelected[1].src = backsideSource;
                    }, 2000);
                    setTimeout(function () {
                        storeSelected.length = 0;
                        storeSource.length = 0;
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
                            }
                            else if (player1turn == false) {
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
function shuffleAvailableCards(array) {
    var _a;
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [array[j], array[i]], array[i] = _a[0], array[j] = _a[1];
    }
}
function comPlays() {
    //array mit allen Nummern die gleich zu den Klassennamen der Karten im Spiel sind, wird durchgemischt in der shuffle-Funktion:
    shuffleAvailableCards(availableCards);
    //Computer zeiht immer die ersten beiden Nummern im Array, durch das Durchmischen des Arrays wird die Zufälligkeit garantiert.
    var firstImage = availableCards[0];
    var secondImage = availableCards[1];
    //Die erste Karte wird durch den Computer aufgedeckt indem er die Quelle des Bildes aus dem StoreImg-Array ändert. In storeImg befinden sich alle Bildelemente die auf dem Feld liegen
    //Durch die zufällige Zahl aus firstImage wird die ausgewählte Karte umgedreht, also die Quelle geändert.
    //Das änderen der Quelle ist wie in Nutzerfunktion mit dem Klassennamen der karte, nur das hier das Bild aus StoreImg benutzt wird und mit firstImage die vom Computer gewählte Zahl benutzt
    //wird:
    storeImg[firstImage].src = cardDeck[parseFloat(storeImg[firstImage].className)].source;
    //Quelle wird zum Vergleichen der Karten in ein Array gepusht:
    storeSource.push(storeImg[firstImage].src);
    //die gewählte Karte wird auch in ein Array gepusht:
    storeSelected.push(storeImg[firstImage]);
    //Zweite Karte, 1 Sekunde später, gleiche Herangehensweise wie oben:
    setTimeout(function () {
        storeImg[secondImage].src = cardDeck[parseFloat(storeImg[secondImage].className)].source;
        storeSource.push(storeImg[secondImage].src);
        storeSelected.push(storeImg[secondImage]);
        //2 Sekunden nach der zweiten Karte wird die Vergleich-Funktion aufgerufen:
        if (easy == true) {
            setTimeout(function () {
                checkPairs();
            }, 2000);
        }
        //Bei Medium nach 1,5
        else if (medium == true) {
            setTimeout(function () {
                checkPairs();
            }, 1500);
        }
        //und bei Hard nach 1 Sekunde
        else if (hard == true) {
            setTimeout(function () {
                checkPairs();
            }, 1000);
        }
    }, 1000);
    function checkPairs() {
        //Karten werden verglichen, wenn die Quellen gleich sind (=gleiche Vorderseite) ist es ein Paar:
        if (storeSource[0] === storeSource[1]) {
            //Erst werden die vom Computer gewählten Zahlen aus dem availableCards Array gestrichen, so kann der Computer nicht die schon entdeckten Paare wieder aufdecken:
            //Da firstImage außerhalb der Funktion liegt wird der Klassenname der aufgedeckten Karte verwendet, welche gleich den vom Computer gewählten Zahlen ist:
            var index = availableCards.indexOf(parseFloat(storeSelected[0].className));
            if (index > -1) {
                availableCards.splice(index, 1);
            }
            var index2 = availableCards.indexOf(parseFloat(storeSelected[1].className));
            if (index2 > -1) {
                availableCards.splice(index2, 1);
            }
            //Die gespeicherten Bilder werden entfernt, indem sie visibility: hidden bekommen:
            storeSelected[0].classList.add("invisible");
            storeSelected[1].classList.add("invisible");
            comScored = true;
            givePoints();
            setTimeout(function () {
                storeSelected.length = 0;
                storeSource.length = 0;
                comPlays();
            }, 1000);
        }
        else {
            //die gewählten Bilder bekommen wieder ihre Rückseite als Quelle und werden so umgedreht:
            storeSelected[0].src = backsideSource;
            storeSelected[1].src = backsideSource;
            playersTurn();
        }
        //Arrays wieder zurücksetzen für den nächsten Durchlauf:
        storeSelected.length = 0;
        storeSource.length = 0;
    }
    function playersTurn() {
        // Spieler wieder dran:
        comsTurn = false;
        document.querySelector("#com").setAttribute("style", "text-decoration: none");
        document.querySelector("#player").setAttribute("style", "text-decoration: underline");
    }
}
function givePoints() {
    if (playerScored == true) {
        playerCounter++;
        playerPoints.innerHTML = playerCounter.toString();
        playerScored = false;
        announceWinner();
    }
    else if (comScored == true) {
        comCounter++;
        comPoints.innerHTML = comCounter.toString();
        comScored = false;
        announceWinner();
    }
}
function announceWinner() {
    if (availableCards.length <= 0) {
        if (playerCounter > comCounter) {
            setTimeout(function () {
                if (playervplayer == false) {
                    announce.innerHTML = "You've won the game! Congrats!";
                    announce.setAttribute("style", "opacity: 100%");
                }
                else if (playervplayer == true) {
                    announce.innerHTML = "Player 1 has won the game!";
                    announce.setAttribute("style", "opacity: 100%");
                }
            }, 1000);
        }
        else if (comCounter > playerCounter) {
            setTimeout(function () {
                if (playervplayer == false) {
                    announce.innerHTML = "Weak performance... the computer did you dirty!";
                    announce.setAttribute("style", "opacity: 100%");
                }
                else if (playervplayer == true) {
                    announce.innerHTML = "Player 2 has won the Game!";
                    announce.setAttribute("style", "opacity: 100%");
                }
            }, 1000);
        }
        else if (comCounter == playerCounter) {
            setTimeout(function () {
                announce.innerHTML = "It's a tie game!";
                announce.setAttribute("style", "opacity: 100%");
            }, 1000);
        }
    }
}
//Neues Game starten: booleans und numbers auf ursprünglichen Wert zurücksetzen; divs leer räumen; divs wieder verstecken; Farbe des zuvor geklickten Buttons zurück zu Standard
function nextGame() {
    lockDifficulty = false;
    firstFlipped = false;
    secondFlipped = false;
    lockPlaymode = false;
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
    announce.setAttribute("style", "opacity: 0");
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
//# sourceMappingURL=memory.js.map