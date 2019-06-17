/*Author: Adam Kabbara
 *Data: 06-16-2019
 */

for (var card_x = 0; card_x < 13; card_x = card_x + 1) {
  for (var card_y = 0; card_y < 4;   card_y = card_y + 1) {
    console.log(2);
    document.getElementById("memory-board").innerHTML += "<div class=\"memory-card\"><img class=\"front_face\" src=\"./img/card_back.svg\"><img class=\"back_face\" src=\"./img/card_back.svg\"></div>";
  }
}