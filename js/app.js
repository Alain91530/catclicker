/* Variriable to store the number of clicks */
let nbClicks = 0;
class Cat {
  constructor(name,picture) {
    this.name = name;
    this.picture = picture;
  }
}
/* The element where we await clicks */
let theCats = document.getElementsByClassName('cat');
let clickCounter = document.getElementById('clicks');

let allCats = [
  new Cat('tom', 'img/cat.jpg'),
  new Cat('pussy cat','img/cat-2.jpg')
];

function addCat(cat){
  let htmlCat = document.getElementById('cats').innerHTML;
  htmlCat+=`<span><figure><img class="cat" src=${cat.picture}>
  <figcaption class="name">${cat.name}<figcaption>
  </figure></span>`;
  document.getElementById('cats').innerHTML=htmlCat;
}
addCat(allCats[0]);
addCat(allCats[1]);

for (let cat of theCats) {
  cat.addEventListener('click', function(){
    //the cat has been clicked
    nbClicks++;
    clickCounter.textContent = nbClicks;
  }, false);
}
