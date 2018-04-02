/******************************************************************************/
/*                Model                                                       */
/******************************************************************************/
/* Class for cats */
class Cat {
  constructor(name,picture) {
    this.name = name;
    this.picture = picture;
    this.clickCount = 0;
    this.selected = false;
  }
}

/* initialize array of different cats */
let model = {
  currentCat: null,
  adminMode: false,
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
let listView = {
  init: function() {
    let cats = octopus.getCats();
    let cat;
    let catElement;
    let i;
    this.catList = document.getElementById('navMenu');
    // Create the DOM elements for the cat menu
    for (i = 0; i< cats.length; i++) {
      cat = cats[i];
      /* for each cat construct an html node */
      catElement = document.createElement('p');
      catElement.textContent = `${cat.name}`;
      catElement.className+='nav-element';
      /* Append it to the DOM */
      this.catList.appendChild(catElement);
    }
    this.render();
  },

  render: function() {
    let cats = octopus.getCats();
    let catElements = document.getElementsByClassName('nav-element');
    let cat;
    let catElement;
    let i;
    /* For each cat set an event on click and render the selected cat with
       a different class to higjligth it
     */
    for (i = 0; i< cats.length; i++) {
      cat = cats[i];
      catElement = catElements[i];
      catElement.textContent = `${cat.name}`;
      /* set or unset the selected class */
      (cat.selected) ? catElement.classList.add('selected') :
        catElement.classList.remove('selected');
      /* Set an event listener when a cat name is clicked with a closure in the
       * callback fonction to have catClicked.clicks pointing at the right place
       */
      catElement.addEventListener('click', (function(catClicked) {
        return function() {
          octopus.setCurrentCat(catClicked);
          listView.updateSelected();
          catView.render();
          adminView.render();
        };
      })(cat));
    }
  },

  /* Updates the right cat in the cat menu */
  updateSelected: function() {
    let cats = octopus.getCats();
    let catElements = document.getElementsByClassName('nav-element');
    let cat;
    let catElement;
    let i;

    for (i = 0; i< cats.length; i++) {
      cat = cats[i];
      catElement = catElements[i];
      (cat.selected) ? catElement.classList.add('selected') :
        catElement.classList.remove('selected');
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
/*              View 3 : Admin pannel                                         */
/******************************************************************************/
let adminView ={
  init: function() {
    let adminInput = document.getElementsByClassName('adm-input')[0];
    let adminValidate = document.getElementsByClassName('validate')[0];
    document.getElementById('admin').addEventListener('click', octopus.setAdminMode);
    document.getElementById('cancel').addEventListener('click', octopus.cancelInput);
    document.getElementById('save').addEventListener('click', octopus.saveCat);
    if (!octopus.getAdminMode()) {
      adminInput.classList.add('hidden');
      adminValidate.classList.add('hidden');
    }
  },
  render: function() {
    let currentCat = octopus.getCurrentCat();
    let adminInput = document.getElementsByClassName('adm-input')[0];
    let adminValidate = document.getElementsByClassName('validate')[0];
    if (!octopus.getAdminMode()) {
      adminInput.classList.add('hidden');
      adminValidate.classList.add('hidden');
    }
    else {
      adminInput.classList.remove('hidden');
      adminValidate.classList.remove('hidden');
      document.getElementById('name-of-cat').value = currentCat.name;
      document.getElementById('cat-img').value = currentCat.picture;
      document.getElementById('click-count').value = currentCat.clickCount;
    }
  }
};
/******************************************************************************/
/*              Octopus                                                       */
/******************************************************************************/
let octopus = {

  init: function() {
    model.currentCat = model.cats[0];
    model.cats[0].selected = true;
    listView.init();
    catView.init();
    adminView.init();
  },
  getAdminMode: function() {
    return model.adminMode;
  },
  getCurrentCat: function() {
    return model.currentCat;
  },
  getCurrentCatindex() {
    return model.currentCatIndex;
  },
  getCats() {
    return model.cats;
  },
  setAdminMode: function() {
    model.adminMode = !model.adminMode;
    adminView.render();
  },
  setCurrentCat: function(cat) {
    model.cats[model.cats.indexOf(model.currentCat)].selected = false;
    model.currentCat = cat;
    model.cats[model.cats.indexOf(model.currentCat)].selected = true;
  },
  cancelInput: function() {
    adminView.render();
  },
  saveCat: function() {
    let index;
    model.currentCat.name = document.getElementById('name-of-cat').value;
    model.currentCat.picture = document.getElementById('cat-img').value;
    model.currentCat.clickCount = parseInt(document.getElementById('click-count').value,10);
    index=model.cats.indexOf(model.currentCat);
    model.cats[index] = model.currentCat;
    catView.render();
    listView.render();
  },
  addClick: function() {
    model.currentCat.clickCount++;
    catView.render();
  }
};

/******************************************************************************/

/* Just initialize the game */
octopus.init();
