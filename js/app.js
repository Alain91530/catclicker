/* Variriable to store the number of clicks */
let nbClicks = 0;
/* The element where we await clicks */
let theCat = document.getElementById('cat');
let clickCounter = document.getElementById('clicks');

theCat.addEventListener('click', function(){
  //the cat has been clicked
  nbClicks++;
  clickCounter.textContent = nbClicks;
}, false);
