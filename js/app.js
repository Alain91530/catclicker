/* The elements where we await clicks */
let theCats = document.getElementsByClassName('cat');

/* Class for cats */
class Cat {
  constructor(name,picture) {
    this.name = name;
    this.picture = picture;
    this.clicks = 0;
  }
}

/* initialize array of different cats */
let allCats = [
  new Cat('tom', 'img/cat-1.jpg'),
  new Cat('pussy cat','img/cat-2.jpg'),
  new Cat('hercule', 'img/cat-3.jpg'),
  new Cat('titus', 'img/cat-4.jpg'),
  new Cat('kitty', 'img/cat-5.jpg')
];
function catClicked(cat) {
  let theCat;
  /* which cat is clicked */
  for (let myCat of allCats) {
    if (myCat.picture===cat.target.getAttribute('src')) {
      theCat = myCat;
    }
  }
  theCat.clicks++;
  document.getElementById('click-counter').textContent=
      `You clicked me ${theCat.clicks} times`;
}

/* Show a cat in the cats container */
function showCat(cat){
  let theCat;
  let displayCat;
  let catContent;
  let catName=cat.target.textContent;

  /* find the prpoer cat */
  for (let myCat of allCats) {
    if (myCat.name===catName) {
      theCat = myCat;
    }
  }
  /* Remove the previuos cat */
  document.getElementById('the-cat').remove();

  /* Contruct the figure node to display the cat */
  displayCat = document.createElement('figure');
  displayCat.setAttribute('id', 'the-cat');
  catContent = document.createElement('figcaption');
  catContent.appendChild(document.createTextNode(`${theCat.name}`));
  displayCat.appendChild(catContent);
  catContent = document.createElement('img');
  catContent.setAttribute('id','cat-image');
  catContent.setAttribute('src',`${theCat.picture}`);
  catContent.setAttribute('alt','""');
  displayCat.appendChild(catContent);
  catContent = document.createElement('figcaption');
  catContent.setAttribute('id','click-counter');
  catContent.appendChild(document.createTextNode(`You clicked me ${theCat.clicks} times`));
  displayCat.appendChild(catContent);
  /* append the cat to the cat container */
  document.getElementById('cats').appendChild(displayCat);
  /* Set an event listener when the cat is clicked */
  document.getElementById('cat-image').addEventListener('click', catClicked);
}


/* initialize the cats menu */
for (let cat of allCats) {
  /* for each cat construct an html node */
  let menuElement = document.createElement('p');
  let textElement = document.createTextNode(`${cat.name}`);
  menuElement.className+='navElement';
  menuElement.appendChild(textElement);
  /*Append the node to the menu */
  document.getElementById('navMenu').appendChild(menuElement);
  /* Set an event listener when a cat name is clicked */
  document.getElementById('navMenu').lastChild.addEventListener('click', showCat);
}
for (let cat of theCats) {
  cat.addEventListener('click', function(){
    //the cat has been clicked
    cat.clicks++;
  }, false);
}
