/*Author: Adam Kabbara
 *Data: 06-16-2019
 *Updated: 06-18-2019
 */

var cards = [];
var cards_packet = [];
var deck;

// variables to track the cards the user picked
var has_fliped = false;
var first_card, second_card;
var lock = false;

function flipCard() {
  if (this == first_card) return;
  if (lock) return;

  this.classList.add("flip");

  if (!has_fliped) {
    // First card is fliped

    first_card = this;
    has_fliped = true;
  }
  else {
    //Second card is fliped 

    second_card = this;

    checkForMatch();
  }
}

function resetBoard() {
  [first_card, second_card] = [null, null];
  [lock, has_fliped] = [false, false];
}

function checkForMatch() {
  var second_face = second_card.getAttribute("data-card-type");
  var first_face = first_card.getAttribute("data-card-type");

  if (second_face == first_face) {
    // The two cards are a match
    disableCards();
  }
  else {
    // The two cards are a mismatch
    unflipCards();
  }
}

function disableCards() {
  this.removeEventListener("click", flipCard);
  first_card.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  lock = true;

  setTimeout(() => {
    second_card.classList.remove("flip");
    first_card.classList.remove("flip");

    resetBoard();
  }, 1500);
}

function setup() {

  for (var card_x = 0; card_x < deck.remaining; card_x = card_x + 1) {
    document.getElementById("memory-board").innerHTML += 
      `<div class=\"memory-card\" data-card-type=\"${cardss[card_x].value}\">
        <img class=\"front_face\" src=\"./img/${cardss[card_x].code}.png\">
        <img class=\"back_face\" src=\"./img/red_back.png\">
      </div>`;
  }

  cards = document.querySelectorAll(".memory-card"); // get all the cards

  cards.forEach(card => card.addEventListener("click", flipCard));
}

function getDeck() {
  fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
  .then(function(response) {
    return response.json();
  })
  .then(function(deck_json) {
    deck = deck_json;
    return fetch("https://deckofcardsapi.com/api/deck/" + deck.deck_id + "/draw/?count=52");
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(cards_json) {
    cardss = cards_json.cards;
    setup();
  })
}

function getCard(deck_id) {
  fetch("https://deckofcardsapi.com/api/deck/" + deck_id + "/draw/?count=52")
  .then(function(response) {
    return response.json();
  })
  .then(function(cards_json) {
    cards_packet = cards_json.cards;
  });
}

getDeck();
