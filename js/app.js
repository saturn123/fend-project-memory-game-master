//Create a list that holds all of your cards
const cards = ["fa fa-diamond", "fa fa-diamond",
                  "fa fa-paper-plane-o", "fa fa-paper-plane-o",
                  "fa fa-anchor", "fa fa-anchor",
                  "fa fa-bolt", "fa fa-bolt",
                  "fa fa-cube", "fa fa-cube",
                  "fa fa-bomb", "fa fa-bomb",
                  "fa fa-leaf", "fa fa-leaf",
                  "fa fa-bicycle", "fa fa-bicycle"];

//function to create cards
function createCard(card) {
  return (`<li class="card"><i class="${card}"></i></li>`);
}

//Initialize game, display card on page
function initGame() {
  const deck = document.querySelector(".deck");
  //shuffle cards
  const generateCardHTML = shuffle(cards).map(function(card) {
    return createCard(card);
  });
  deck.innerHTML = generateCardHTML.join("");
}

initGame();


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

const allCards = document.querySelectorAll(".card");
let openCards = [];

//set up the event listener for a card. If a card is clicked: display the card's symbol and push the card in openCards array
allCards.forEach(function(card) {
  card.addEventListener("click", function() {
    //if we already have an existing open card open the card and compare the 2 cards
    if (openCards.length === 1) {

      const currentCard = this;
      const previousCard = openCards[0];

      card.classList.add("open", "show");
      openCards.push(this);

      //compare 2 opened cards
      if (currentCard.innerHTML === previousCard.innerHTML) {
        // if the two cards match
        currentCard.classList.add("match");
        previousCard.classList.add("match");

        openCards = [];

        //if the two cards do not match, hide cards
      } else {
        setTimeout(function() {
          currentCard.classList.remove("open", "show");
          previousCard.classList.remove("open", "show");

          openCards = [];
        });
      }
    } else {
        card.classList.add("open", "show");
        openCards.push(this);
      }
  });
});


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
