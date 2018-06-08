// Create a list that holds all of your cards
const cards = ["fa fa-diamond", "fa fa-diamond",
                  "fa fa-paper-plane-o", "fa fa-paper-plane-o",
                  "fa fa-anchor", "fa fa-anchor",
                  "fa fa-bolt", "fa fa-bolt",
                  "fa fa-cube", "fa fa-cube",
                  "fa fa-bomb", "fa fa-bomb",
                  "fa fa-leaf", "fa fa-leaf",
                  "fa fa-bicycle", "fa fa-bicycle"];

const counter = document.querySelector(".moves");
const deck = document.querySelector(".deck");
const stars = document.querySelectorAll(".fa-star");
const restart = document.querySelector(".restart");
let openCards = [];
let matchedCards = [];
let moves = 0;
const timer = document.querySelector(".timer");
let interval = 0;
let gameStarted = false;
let starRating = 3;
let totalSeconds = 0;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Initialize game, display card on page
function initGame() {
  // Shuffle deck
  const generateCardHTML = shuffle(cards).map(function(card) {
      return (`<li class="card"><i class="${card}"></i></li>`);
  });
  deck.innerHTML = generateCardHTML.join("");

  // Resets moves
  moves = 0;
  counter.innerHTML = moves;

  // Reset ratings
  for (let i = 0; i < stars.length; i++) {
    stars[i].style.color = "#ff0000";
    stars[i].style.visibility = "visible";
  }

  // Build modal to display when the game is over.
  buildCongratsModal();

  // Hide Modal
  hideCongratsModal();

  // Reset timer
  resetTimer();

  // Play game
  playGame();
}

// Set up the event listener for a card. If a card is clicked: display the card's
// symbol and push the card in openCards array
function playGame() {
    const allCards = document.querySelectorAll(".card");
    allCards.forEach(function(card) {
        card.addEventListener("click", function() {
          if (!gameStarted) {
             interval = setInterval(startTimer, 1000);
             gameStarted = true;
          }
      // If we already have an existing open card
      if (openCards.length === 1) {
        moveCounter();
        const currentCard = this;
        const previousCard = openCards[0];

        card.classList.add("open", "show", "disable");
        openCards.push(this);

        // Compare 2 opened cards
        compareCards(currentCard, previousCard);
        // Players restricted to click only 2 cards at a time
      } else if (openCards < 2)  {
          card.classList.add("open", "show", "disable");
          openCards.push(this);
        }
      });
  });
}

// Compare current and previous card
function compareCards(currentCard, previousCard) {
  if (currentCard.innerHTML === previousCard.innerHTML) {

    // If the two cards match
    currentCard.classList.add("match");
    previousCard.classList.add("match");

    matchedCards.push(currentCard, previousCard);
    openCards = [];

    // Check if all cards have been matched
    gameOver();

    // If the two cards do not match, hide cards
  } else {
    setTimeout(function() {
      currentCard.classList.remove("open", "show", "disable");
      previousCard.classList.remove("open", "show", "disable");
      openCards = [];
    }, 750);
  }
}

//Count player's moves
function moveCounter() {
  moves++;
  counter.innerHTML = moves;
  //Star ratings based on number of player's moves
  if (moves > 10 && moves < 20) {
    for (let i = 0; i < 3; i++) {
      if (i > 1) {
        stars[i].style.visibility = "collapse";
        starRating = 2;

      }
    }
  }
  else if (moves > 20) {
    for (let i = 0; i < 3; i++) {
      if (i > 0) {
        stars[i].style.visibility = "collapse";
        starRating = 1;
      }
    }
  }
}


// Create a div element to add to the page that will hold the congrats message later
// Hide the div element initially
function buildCongratsModal() {
    const page = document.getElementsByClassName("container");
    const popup = document.createElement("div");
    popup.className = "congratsPopup hidden";
    popup.innerHTML = "";
    page[0].appendChild(popup);
}

// Display the congrats message with the move count, total time, star rating and play again 'button'
function displayCongratsModal() {
    const popup = document.getElementsByClassName("congratsPopup");
    popup[0].className = "congratsPopup";
    popup[0].innerHTML =
        `<h2 class="congratsHeading" > Congratulations! </h2>
        <h3 class="congratsTagline" > You've won the game! </h3>
        <p class="congratsMove" > ${moves} Moves </p>
        <p class="congratsTime" > ${timer.innerHTML} Total time </p>
        <p class="congratsStar" > ${starRating} Stars </p>
        <p class="congratsPlay" > Play Again </p>`;
    const play = document.getElementsByClassName("congratsPlay");
    play[0].addEventListener("click", initGame);
}

// Hide the congrats popup by adding the class 'dimmed'
// Erase the congrats text messages
function hideCongratsModal() {
    const popup = document.getElementsByClassName("congratsPopup");
    popup[0].className = "congratsPopup hidden";
    popup[0].innerHTML = "";
}

// Start timer
function startTimer() {
  ++totalSeconds;

    // Calculate minutes and seconds
      let minutes = Math.floor(totalSeconds/60);
      let seconds = totalSeconds - (minutes*60);

      // Add starting 0 if seconds < 10
      if (seconds < 10) {
        seconds = "0" + seconds;
      }

      let currentTime = `${minutes}mins ${seconds}secs`;
      timer.innerHTML = currentTime;
}

// Reset Timer
function resetTimer(){
    clearInterval(interval);
    gameStarted = false;
    totalSeconds = 0;
    timer.innerHTML = `0mins 0secs`;
}

// Stop timer
function stopTimer(){
    clearInterval(interval);
}

// Game over
function gameOver() {
  if(matchedCards.length === cards.length) {
    matchedCards = [];
    stopTimer();
    displayCongratsModal();
  }
}

//Resets the game once all the cards are matched and the game is over
restart.addEventListener("click", function() {
  window.location.reload();
});

initGame();
