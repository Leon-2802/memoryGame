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
var comvscom = document.querySelector("#h23");
//Welcher Spieltyp?:
//Booleans:
var comvcom = false;
var com1turn;
var playervplayer = false;
var playervcom = false;
var player1turn;
var preventTheOther = false;
var comsTurn = true;
//QuerySelector und Aktionen für einzelne Spieltyp-Buttons:
//COMvCOM mode noch verbuggt!!
comvscom.addEventListener("click", function () {
    comvscom.setAttribute("style", "text-decoration: underline");
    p1vscom.setAttribute("style", "text-decoration: none");
    p1vsp2.setAttribute("style", "text-decoration: none");
    document.querySelector("#player").innerHTML = "Com1";
    document.querySelector("#com").innerHTML = "Com2";
    playervplayer = false;
    playervcom = false;
    com1turn = true;
    comvcom = true;
    comsTurn = true;
});
p1vscom.addEventListener("click", function () {
    p1vscom.setAttribute("style", "text-decoration: underline");
    comvscom.setAttribute("style", "text-decoration: none");
    p1vsp2.setAttribute("style", "text-decoration: none");
    document.querySelector("#player").innerHTML = "Player";
    document.querySelector("#com").innerHTML = "Com";
    comvcom = false;
    playervplayer = false;
    playervcom = true;
    comsTurn = true;
    document.querySelector("#com").setAttribute("style", "text-decoration: underline");
    document.querySelector("#player").setAttribute("style", "text-decoration: none");
});
p1vsp2.addEventListener("click", function () {
    p1vscom.setAttribute("style", "text-decoration: none");
    comvscom.setAttribute("style", "text-decoration: none");
    p1vsp2.setAttribute("style", "text-decoration: underline");
    document.querySelector("#player").innerHTML = "Player 1";
    document.querySelector("#com").innerHTML = "Player 2";
    comvcom = false;
    playervcom = false;
    playervplayer = true;
    player1turn = true;
    document.querySelector("#player").setAttribute("style", "text-decoration: underline");
    document.querySelector("#com").setAttribute("style", "text-decoration: none");
    comsTurn = false;
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
var runAgain = false;
var newGamePossible = false;
//Arrays für Karten:
var cardDeck = [];
//Arrays für das zufällige Aufdecken des Computers:
var availableCards = [];
//andere Arrays:
var storeImg = [];
var storeSource = [];
var storeSelected = [];
var storeClassName = [];
//Counter für Unterscheiden der Kartenrückseiten:
var giveClass = 0;
//Counter für Punktevergabe:
var playerCounter = 0;
playerPoints.innerHTML = playerCounter.toString();
var comCounter = 0;
comPoints.innerHTML = comCounter.toString();
//Event-Listener für die verschiedenen Schalter:
//Schwierigkeitswahl:
stufe1.addEventListener("click", function () {
    if (lockDifficulty == false) {
        easy = true;
        for (var index = 1; index <= 2; index++) {
            for (var index_1 = 1; index_1 <= 4; index_1++) {
                var addCard = {
                    source: "images/easy-mode-paare/paar" + index_1 + ".jpg",
                    key: index_1
                };
                cardDeck.push(addCard);
            }
        }
        for (var index = 0; index <= 7; index++) {
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
stufe2.addEventListener("click", function () {
    if (lockDifficulty == false) {
        medium = true;
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
//Buttons:
newGame.addEventListener("click", function () {
    if (newGamePossible == true) {
        nextGame();
    }
});
//Array durchmischen (wie funktioniert es?):
function shuffleArray(array) {
    var _a;
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [array[j], array[i]], array[i] = _a[0], array[j] = _a[1];
    }
}
function createCarddeck() {
    if (easy == true && lockDifficulty == false) {
        easyContainer.classList.remove("isHidden");
        stufe1.setAttribute("style", "color: cyan");
        lockDifficulty = true;
        shuffleArray(cardDeck);
        for (var indexEasy = 1; indexEasy <= 8; indexEasy++) {
            pushCardsToDom();
        }
    }
    else if (medium == true && lockDifficulty == false) {
        mediumContainer.classList.remove("isHidden");
        stufe2.setAttribute("style", "color: cyan");
        lockDifficulty = true;
        shuffleArray(cardDeck);
        for (var indexMedium = 1; indexMedium <= 16; indexMedium++) {
            pushCardsToDom();
        }
    }
    else if (hard == true && lockDifficulty == false) {
        hardContainer.classList.remove("isHidden");
        stufe3.setAttribute("style", "color: cyan");
        lockDifficulty = true;
        for (var indexHard = 1; indexHard <= 32; indexHard++) {
            pushCardsToDom();
        }
    }
}
//Rückseiten in den Dom laden
function pushCardsToDom() {
    if (easy == true) {
        var newImg_1 = document.createElement("img");
        newImg_1.src = backsideSource;
        newImg_1.classList.add(giveClass.toString());
        storeImg.push(newImg_1);
        giveClass++;
        easyContainer.appendChild(newImg_1);
        newImg_1.addEventListener("click", function () {
            if (comsTurn == false) {
                if (firstFlipped == false || secondFlipped == false) {
                    if (playervplayer == true) {
                        if (player1turn == false) {
                            preventTheOther = true;
                        }
                    }
                    newImg_1.src = cardDeck[parseFloat(newImg_1.className)].source;
                    storeSource.push(newImg_1.src);
                    storeSelected.push(newImg_1);
                    storeClassName.push(newImg_1.className);
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
        function checkForPairsEasy() {
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
                        storeClassName.length = 0;
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
                        storeClassName.length = 0;
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
    if (runAgain == false) {
        if (com1turn == true) {
            document.querySelector("#com").setAttribute("style", "text-decoration: none");
            document.querySelector("#player").setAttribute("style", "text-decoration: underline");
        }
        else if (com1turn == false) {
            document.querySelector("#player").setAttribute("style", "text-decoration: none");
            document.querySelector("#com").setAttribute("style", "text-decoration: underline");
            preventTheOther = true;
        }
    }
    shuffleAvailableCards(availableCards);
    //Computer zeiht immer die ersten beiden Nummern im Array, durch das Durchmischen wird die Zufälligkeit garantiert.
    var firstImage = availableCards[0];
    var secondImage = availableCards[1];
    storeImg[firstImage].src = cardDeck[parseFloat(storeImg[firstImage].className)].source;
    storeSource.push(storeImg[firstImage].src);
    storeSelected.push(storeImg[firstImage]);
    //Zweite Karte:
    setTimeout(function () {
        storeImg[secondImage].src = cardDeck[parseFloat(storeImg[secondImage].className)].source;
        storeSource.push(storeImg[secondImage].src);
        storeSelected.push(storeImg[secondImage]);
        setTimeout(function () {
            checkPairsEasy();
        }, 3000);
    }, 1000);
    function checkPairsEasy() {
        if (storeSource[0] === storeSource[1]) {
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
            if (comvcom == false) {
                comScored = true;
                givePoints();
            }
            else {
                if (com1turn == true) {
                    playerScored = true;
                    givePoints();
                }
                else if (com1turn == false) {
                    comScored = true;
                    givePoints();
                }
            }
            setTimeout(function () {
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
            setTimeout(function () {
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
            setTimeout(function () {
                comsTurn = false;
                document.querySelector("#com").setAttribute("style", "text-decoration: none");
                document.querySelector("#player").setAttribute("style", "text-decoration: underline");
            }, 4500);
        }
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
        newGamePossible = true;
        if (playerCounter > comCounter) {
            setTimeout(function () {
                alert("You have won the Game! Congrats!");
            }, 1000);
        }
        else if (comCounter > playerCounter) {
            setTimeout(function () {
                alert("The Computer has won the Game... That was a weak performance...");
            }, 1000);
        }
        else if (comCounter == playerCounter) {
            setTimeout(function () {
                alert("It's a tie game!");
            }, 1000);
        }
    }
}
//Neues Game starten: booleans und numbers auf ursprünglichen Wert zurücksetzen; divs leer räumen; divs wieder verstecken; Farbe des zuvor geklickten Buttons zurück zu Standard
function nextGame() {
    lockDifficulty = false;
    firstFlipped = false;
    secondFlipped = false;
    comsTurn = true;
    newGamePossible = false;
    if (comvcom == true) {
        com1turn = true;
    }
    else if (playervplayer == true) {
        player1turn = true;
        document.querySelector("#com").setAttribute("style", "text-decoration: none");
        document.querySelector("#player").setAttribute("style", "text-decoration: underline");
    }
    else if (playervcom == true) {
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
//# sourceMappingURL=memory.js.map