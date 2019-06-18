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
    first_card = this;
    has_fliped = true;
  }
  else {
    second_card = this;

    var second_face = second_card.getAttribute("data-card-type");
    var first_face = first_card.getAttribute("data-card-type");
  
    if (second_face == first_face) {
      // The two cards are a match
      this.removeEventListener("click", flipCard);
      first_card.removeEventListener("click", flipCard);

      resetBoard();
    }
    else {
      // The two cards are a mismatch
      lock = true;

      setTimeout(() => {
        this.classList.remove("flip");
        first_card.classList.remove("flip");

        resetBoard();
      }, 1500)}
  }
}

function resetBoard() {
  [first_card, second_card] = [null, null];
  [lock, has_fliped] = [false, false];
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
