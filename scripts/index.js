/*Author: Adam Kabbara
 *Data: 06-18-2019
 *Updated: 06-18-2019
 */

 function gameRedirect() {
   document.getElementById("new-game-btn").onclick = function() {
     window.location.href = "memory-game";
   };
 }

gameRedirect();