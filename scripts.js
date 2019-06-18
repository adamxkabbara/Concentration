/*Author: Adam Kabbara
 *Data: 06-16-2019
 */

var cards = [];
var cards_packet = [];
var deck;

function flipCard() {
  this.classList.add("flip")
  //console.log(this.classList);
}

function setup() {

  console.log(deck);
  console.log(cardss);

  for (var card_x = 0; card_x < deck.remaining; card_x = card_x + 1) {
    document.getElementById("memory-board").innerHTML += 
      `<div class=\"memory-card\">
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
