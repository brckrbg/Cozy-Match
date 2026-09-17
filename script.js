function playMusic() {
    const music = document.querySelector("#background-music");
    music.volume = 0.3;
    music.play();
}

function toggleMusic() {
    const music = document.querySelector("#background-music");
    const catSound = document.querySelector("#cat-sound");
    const button = document.querySelector(".music-button");

    if (music.paused) {
        music.volume = 0.3;
        music.play();

        catSound.volume = 1;
        catSound.play();

        button.textContent = "🔊";
    } else {
        music.pause();
        catSound.pause();
        button.textContent = "🔇";
    }
}

function startGame() {
     const catSound = document.querySelector("#cat-sound");
     const cardSound = document.querySelector("#card-sound");
     cardSound.volume = 1;
     cardSound.currentTime = 0;
     cardSound.play();

    catSound.volume = 0.5;
    catSound.play();

    document.querySelector(".start-screen").style.display = "none";
    document.querySelector(".game-board").style.display = "grid";
    shuffleCards();
}


// Find all the cards
const cards = document.querySelectorAll(".card");

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;


// Click a card
cards.forEach(function(card) { 

    card.addEventListener("click", function() {

        // Don't allow clicks while checking two cards
        if (lockBoard) {
            return;
        }

        // Don't click the same card twice
        if (card === firstCard) {
            return;
        }

        // Open the card
        card.classList.add("flip");
        const cardSound = document.querySelector("#card-sound");
        cardSound.currentTime = 0;
        cardSound.play();


        // First card
        if (firstCard === null) {
            firstCard = card;
            return;
        }


        // Second card
        secondCard = card;


        // Check if the cards match
        if (firstCard.getAttribute("data-image") === secondCard.getAttribute("data-image")) {

            // They match, so keep them open
            matchedPairs = matchedPairs + 1;

            firstCard = null;
            secondCard = null;

              // Check if all pairs are found
            if (matchedPairs === 6) {
                document.querySelector(".game-board").style.display = "none";
                document.querySelector(".win-screen").style.display = "block";
                createLeaves();
            }


        } else {

            // They don't match
            lockBoard = true;

            setTimeout(function() {

                firstCard.classList.remove("flip");
                secondCard.classList.remove("flip");

                firstCard = null;
                secondCard = null;
                lockBoard = false;

            }, 1000);
        }

    });

});

function restartGame() {
    document.querySelector(".win-screen").style.display = "none";
    document.querySelector(".game-board").style.display = "grid";

    matchedPairs = 0;
    firstCard = null;
    secondCard = null;
    lockBoard = false;

    cards.forEach(function(card) {
    card.classList.remove("flip");
});

shuffleCards();

}

function exitGame() {
    document.querySelector(".win-screen").style.display = "none";
    document.querySelector(".start-screen").style.display = "block";
}

function shuffleCards() {
    const cardGrid = document.querySelector(".card-grid");

    for (let i = cardGrid.children.length - 1; i > 0; i--) {
        cardGrid.appendChild(cardGrid.children[Math.random() * (i + 1) | 0]);
    }
}

function createLeaves() {
    const leaves = document.querySelector(".leaves");

    for (let i = 0; i < 15; i++) {
        const leaf = document.createElement("div");

        leaf.classList.add("leaf");
        leaf.textContent = "🍂";

        leaf.style.left = Math.random() * 100 + "%";
        leaf.style.animationDelay = Math.random() * 4 + "s";

        leaves.appendChild(leaf);
    }
}