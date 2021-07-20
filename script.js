'use strict';
const players = document.querySelectorAll(".player .name");
const hiddenModal = document.querySelectorAll(".hidden");
const inputName = document.querySelectorAll(".hiddenModal input");
const playBtn = document.querySelector("#startGame");
const closeBtn = document.querySelector(".closeModal");
window.addEventListener("load", function() {

    hiddenModal[0].classList.remove("hidden");
    hiddenModal[1].classList.remove("hidden");


})
playBtn.addEventListener("click", function() {



    if (!inputName[0].value || inputName[1].value) {

        changeName(inputName[0].value, 0);
        changeName(inputName[1].value, 1);
    }
    hiddenModal[0].classList.add("hidden");
    hiddenModal[1].classList.add("hidden");


});
closeBtn.addEventListener("click", () => {
    hiddenModal[0].classList.add("hidden");
    hiddenModal[1].classList.add("hidden");


})

const changeName = function(playerName, i) {


    players[i].textContent = playerName;

};


// ------------main section----------------
let numChanger = 1;
let gameState = true;
const maxScore = inputName[2].value;



let instantScore = new Array(0, 0);
let totalScore = new Array(0, 0);
const currentScore = document.querySelectorAll('.current-score');
const rollBtn = document.querySelector(".btn--roll");
const holdbtn = document.querySelector(".btn--hold");
const diceimg = document.querySelector(".dice");

function rollFunc(num) {

    if (gameState) {
        let noDice = Math.trunc(6 * Math.random()) + 1;
        instantScore[num] += noDice;
        currentScore[num].textContent = instantScore[num];
        console.log(noDice);
        diceimg.style.transform = "rotate(360deg)";
        diceimg.src = `dice-${noDice}.png`;


        if (noDice == 3 || noDice == 6) {
            instantScore[num] = 0;
            currentScore[num].textContent = instantScore[num];
            holdFunc(num);
            numChanger++;
            for (let i = 0; i < 2; i++) {

                activeChecker(i);
            }

        }
    }
};
rollBtn.addEventListener("click", function() {
    if (numChanger % 2 === 0)
        rollFunc(1);

    else
        rollFunc(0)

})


// hold button event
const winnerCeleb = document.querySelector(".winnerCeleb");

function holdFunc(num) {

    totalScore[num] += instantScore[num];
    document.querySelectorAll(".score")[num].textContent = totalScore[num];
    instantScore[num] = 0;
    currentScore[num].textContent = instantScore[num];
    for (let i = 0; i < 2; i++) {

        if (totalScore[i] >= inputName[2].value) {
            gameState = false;
            document.querySelectorAll(".player")[i].classList.add("winnerPlayer");
            const winnerCeleb = document.querySelector(".winnerCeleb");
            winnerCeleb.textContent = `🎈🎈🎊🎊🎇CONGRATULATIONS ${inputName[i].value} FOR WINNING 🎉🎉✨ `;
            winnerCeleb.classList.remove("hidden");
            break;
        }
    }
}


let playerActive = document.querySelectorAll(".player");

holdbtn.addEventListener("click", function() {
    if (gameState) {

        if (numChanger % 2 === 0)
            holdFunc(1);
        else
            holdFunc(0)
        numChanger++;
        for (let i = 0; i < 2; i++) {

            activeChecker(i);

        }
    }


});
const activeChecker = function(i) {
    if (!playerActive[i].classList.contains("player--active")) {
        playerActive[i].classList.add("player--active");
    } else {
        playerActive[i].classList.remove("player--active");
    }

}

// reset

const reset = document.querySelector(".btn--new");
reset.addEventListener('click', function() {


    gameState = true;
    for (let i = 0; i < 2; i++) {
        instantScore[i] = 0;
        totalScore[i] = 0;
    }
    document.querySelectorAll(".score")[1].textContent = "0";
    document.querySelectorAll(".score")[0].textContent = "0";
    winnerCeleb.classList.add("hidden");
    for (let i = 0; i < 2; i++) {

        document.querySelectorAll(".player")[i].classList.remove("winnerPlayer");
    }

    console.log('clicked');

});