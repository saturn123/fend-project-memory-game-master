//Create a list that holds all of your cards
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
let openCards = [];
let matchedCards = [];
let moves = 0;
const timer = document.querySelector(".timer");
let interval;
let gameStarted;


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

//Initialize game, display card on page
function initGame() {
  //shuffle deck
  const generateCardHTML = shuffle(cards).map(function(card) {
      return (`<li class="card"><i class="${card}"></i></li>`);
  });
  deck.innerHTML = generateCardHTML.join("");

  //Resets the game once all the cards are matched and the gave is over
  const restart = document.querySelector(".restart");
  restart.addEventListener("click", function() {
    //Clears deck
    deck.innerHTML = "";

    //Start new Game
    initGame();

    //Reset matched card array
    matchedCards = [];

  });

  //Resets moves
  moves = 0;
  counter.innerHTML = moves;

  //Play game
  playGame();
}

//set up the event listener for a card. If a card is clicked: display the card's symbol and push the card in openCards array
function playGame() {
  const allCards = document.querySelectorAll(".card");
  allCards.forEach(function(card) {
  card.addEventListener("click", function() {
    if (!gameStarted) {
      startTimer();
      gameStarted = true;
    }
    //if we already have an existing open card open the card and compare the 2 cards
    if (openCards.length === 1) {
      moveCounter();
      const currentCard = this;
      const previousCard = openCards[0];

      card.classList.add("open", "show", "disable");
      openCards.push(this);

      //compare 2 opened cards
      compareCards(currentCard, previousCard);

    } else {
        card.classList.add("open", "show", "disable");
        openCards.push(this);
      }
  });
});
}

function compareCards(currentCard, previousCard) {
  if (currentCard.innerHTML === previousCard.innerHTML) {

    // if the two cards match
    currentCard.classList.add("match");
    previousCard.classList.add("match");
    matchedCards.push(currentCard, previousCard);

    openCards = [];

    //if the two cards do not match, hide cards
  } else {
    setTimeout(function() {
      currentCard.classList.remove("open", "show", "disable");
      previousCard.classList.remove("open", "show", "disable");
      openCards = [];
    }, 200);
  }
}

//Count player's moves

function moveCounter() {
  moves++;
  counter.innerHTML = moves;
}

function startTimer() {
  let startTime = new Date().getTime();
  interval = setInterval(function () {
    let now = new Date().getTime();
    let elapsed = now - startTime;

    // Calculate minutes and seconds
      let minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((elapsed % (1000 * 60)) / 1000);

      // Add starting 0 if seconds < 10
      if (seconds < 10) {
        seconds = "0" + seconds;
      }

      let currentTime = `${minutes}mins ${seconds}secs`;
      timer.innerHTML = currentTime;
  }, 750);
}

initGame();




/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
