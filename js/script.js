/*
1- con un ciclo stampo tutte le immagini dentro items-wrapper.
2- prendo tutti gli elementi con la classe item e li salvo in un array.
3- al primo elemento tolgo la classe hide
4- al click di bottom 
  a. aggiungo la classe hide all'elemento corrente 
  b. incremento il contatore
  c. tolgo la classe hide all'elemento corrente
5- al click di up come punto 4 ma inverso
6- nascondo di default il bottone up
7- al click di bottom appare up
8- quando sono all'ultimo elemento nascondo il bottone bottom
9- al click di up mostro bottom
10- quando sono sul primo elemento nascondo up
*/ 


const itemsWrapper = document.querySelector('.items-Wrapper');
const btnNext = document.querySelector('.bottom');
const btnPrev = document.querySelector('.top');
const thumbs = document.querySelector('.thumbs');
const text = document.querySelector('.text')
const images = [
  {
    image: 'img/01.webp',
    title: 'Marvel\'s Spiderman Miles Morales',
    text: 'Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.',
  }, {
    image: 'img/02.webp',
    title: 'Ratchet & Clank: Rift Apart',
    text: 'Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.',
  }, {
    image: 'img/03.webp',
    title: 'Fortnite',
    text: "Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos.",
  }, {
    image: 'img/04.webp',
    title: 'Stray',
    text: 'Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city',
  }, {
    image: 'img/05.webp',
    title: "Marvel's Avengers",
    text: 'Marvel\'s Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay.',
  }
];

let counterImg = 0;

function createImageElement(src, title, text, index) {
  const div = document.createElement('div');
  div.classList.add('item');
  
  const img = new Image();
  img.src = src;
  div.appendChild(img);
  
  const titleElement = document.createElement('h3');
  titleElement.textContent = title;
  div.appendChild(titleElement);
  
  const textElement = document.createElement('p');
  textElement.textContent = text;
  div.appendChild(textElement);
  
  if (index !== counterImg) {
    div.classList.add('hide');
  }
  
  return div;
}


const itemsCollection = images.map((item, index) => {
  const imageElement = createImageElement(item.image, item.title, item.text, index);
  itemsWrapper.appendChild(imageElement);
  return imageElement;
});

const thumbsCollection = images.map((src, index) => {
  const thumbElement = createThumbElement(src, index);
  thumbs.appendChild(thumbElement);
  return thumbElement;
});

function updateButtonsVisibility() {
  btnPrev.classList.toggle('hide', counterImg === 0);
  btnNext.classList.toggle('hide', counterImg === images.length - 1);
}

updateButtonsVisibility();

btnNext.addEventListener('click', function () {
  itemsCollection[counterImg].classList.add('hide');
  thumbsCollection[counterImg].classList.remove('active');
  counterImg = (counterImg + 1) % images.length;
  itemsCollection[counterImg].classList.remove('hide');
  thumbsCollection[counterImg].classList.add('active');
  updateButtonsVisibility();
});

btnPrev.addEventListener('click', function () {
  itemsCollection[counterImg].classList.add('hide');
  thumbsCollection[counterImg].classList.remove('active');
  counterImg = (counterImg - 1 + images.length) % images.length;
  itemsCollection[counterImg].classList.remove('hide');
  thumbsCollection[counterImg].classList.add('active');
  updateButtonsVisibility();
});

function createThumbElement(src, index) {
  const thumb = new Image();
  thumb.src = images[index].image; // Use the image source from the 'images' array
  thumb.classList.add('thumb');

  if (index === counterImg) {
    thumb.classList.add('active');
  }

  thumb.addEventListener('click', () => {
    // Handle thumbnail click event to switch to the corresponding image
    itemsCollection[counterImg].classList.add('hide');
    thumbsCollection[counterImg].classList.remove('active');
    counterImg = index;
    itemsCollection[counterImg].classList.remove('hide');
    thumbsCollection[counterImg].classList.add('active');
    updateButtonsVisibility();
  });

  thumbs.appendChild(thumb); // Append the thumbnail to the '.thumbs' container

  return thumb;
}

let showNextImgInterval = setInterval(function () {
  btnNext.click(); // Trigger a click event on the next button
}, 2500);