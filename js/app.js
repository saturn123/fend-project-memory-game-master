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
const stars = document.querySelectorAll(".fa-star");
const modal = document.querySelector(".modal");
const restart = document.querySelector(".restart");
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

  //Resets moves
  moves = 0;
  counter.innerHTML = moves;

  //Reset ratings
  for (let i = 0; i < stars.length; i++) {
    stars[i].style.color = '#ff0000';
    stars[i].style.visibility = 'visible';
  }

  //hide Modal
  modal.classList.add("hide");
  
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
      // if we already have an existing open card open the card and compare the 2 cards
      if (openCards.length === 1) {
        const currentCard = this;
        const previousCard = openCards[0];

        card.classList.add("open", "show", "disable");
        openCards.push(this);

        //compare 2 opened cards
        compareCards(currentCard, previousCard);
        //Players restricted to click only 2 cards at a time
      } else if (openCards < 2)  {
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

    //Check if all cards have been matched
    gameOver();

    //if the two cards do not match, hide cards
  } else {
    setTimeout(function() {
      currentCard.classList.remove("open", "show", "disable");
      previousCard.classList.remove("open", "show", "disable");
      openCards = [];
    }, 750);
  }
  moveCounter();
}

//Count player's moves

function moveCounter() {
  moves++;
  counter.innerHTML = moves;
  //Star ratings based on number of player's moves
  if (moves > 8 && moves < 16) {
    for (let i = 0; i < 3; i++) {
      if (i > 1) {
        stars[i].style.visibility = "collapse";
      }
    }
  }
  else if (moves > 16) {
    for (let i = 0; i < 3; i++) {
      if (i > 0) {
        stars[i].style.visibility = "collapse";
      }
    }
  }
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

function gameOver() {
  if(matchedCards.length === cards.length) {
    clearInterval(interval);
    setTimeout(function(){
      modal.classList.remove("hide");
    }, 500);
  }
}

//Resets the game once all the cards are matched and the game is over
restart.addEventListener("click", function() {
  window.location.reload();
});


initGame();
