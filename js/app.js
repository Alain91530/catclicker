/******************************************************************************/
/*                Model                                                       */
/******************************************************************************/
/* Class for cats */
class Cat {
  constructor(name,picture) {
    this.name = name;
    this.picture = picture;
    this.clickCount = 0;
  }
}

/* initialize array of different cats */
let model = {
  currentCat: null,
  cats: [
    new Cat('tom', 'img/cat-1.jpg'),
    new Cat('pussy cat','img/cat-2.jpg'),
    new Cat('hercule', 'img/cat-3.jpg'),
    new Cat('titus', 'img/cat-4.jpg'),
    new Cat('kitty', 'img/cat-5.jpg')
  ]
};
/******************************************************************************/

/******************************************************************************/
/*                 View 1: the menu                                           */
/******************************************************************************/
/* The elements where we await clicks */
//let theCats = document.getElementsByClassName('cat');
let listView = {
  init: function() {
    this.catList = document.getElementById('navMenu');
    this.render();
  },
  render: function() {
    let cats = octopus.getCats();
    let catElement;
    let cat;
    let i;

    for (i = 0; i< cats.length; i++) {
      cat = cats[i];
      /* for each cat construct an html node */
      catElement = document.createElement('p');
      catElement.textContent = `${cat.name}`;
      catElement.className+='navElement';
      /*Append the node to the menu */

      catElement.addEventListener('click', (function(catClicked) {
        return function() {
          octopus.setCurrentCat(catClicked);
          catView.render();
        };
      })(cat));
      this.catList.appendChild(catElement);
      /* Set an event listener when a cat name is clicked */
    }
  }
};
/******************************************************************************/
/*                View 2 : the cat to click                                   */
/******************************************************************************/
let catView = {
  init: function() {
    this.image = document.getElementById('cat-image');
    this.clicks = document.getElementById('cat-clicks');
    this.name = document.getElementById('cat-name');
    this.render();
  },
  render: function() {
    let currentCat = octopus.getCurrentCat();
    this.clicks.textContent = `You clicked me ${currentCat.clickCount} times`;
    this.name.textContent = `${currentCat.name}`;
    this.image.src = currentCat.picture;
    this.image.addEventListener('click', octopus.addClick);
  }
};

/******************************************************************************/
/*              Octopus                                                       */
/******************************************************************************/
let octopus = {
  init: function() {
    model.currentCat = model.cats[0];
    listView.init();
    catView.init();
  },
  getCurrentCat: function() {
    return model.currentCat;
  },
  getCats() {
    return model.cats;
  },
  setCurrentCat: function(cat) {
    model.currentCat = cat;
  },
  addClick: function() {
    model.currentCat.clickCount++;
    catView.render();
  }
};

/******************************************************************************/

/* Just initialize the game */
octopus.init();
