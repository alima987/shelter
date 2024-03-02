import dataset from "./dataset.js";
const data = dataset.dataset
const BTN_LEFT = document.querySelector("#btn_left");
const BTN_RIGHT = document.querySelector("#btn_right");
const CAROUSEL = document.querySelector("#carousel");
const ITEM_LEFT = document.querySelector("#card_left");
const ITEM_RIGHT = document.querySelector("#card_right");
const ITEM_CENTER = document.querySelector("#card_center");
const element = document.documentElement;


const petCard = (id) => {
  let card = document.createElement('form')
  card.classList.add('pets_card')
  card.id = data[id].id
  card.innerHTML = `
       <img src=${data[id].img} alt="">
       <p class="pets_card_title">${data[id].name}</p>
       <button class="button_secondary">Learn more</button>
    `
  return card
}

let screenWidthNum
element.clientWidth >= 1280 ? (screenWidthNum = 3) : null
element.clientWidth < 1280 ? (screenWidthNum = 2) : null
element.clientWidth < 768 ? (screenWidthNum = 1) : null

const randomNum = () => {
  let items = []
  while (items.length < screenWidthNum) {
    let item = Math.floor(Math.random() * 8)
    if (item !== items[0] && item !== items[1] && item !== items[2])
      items.push(item)
    else item = Math.floor(Math.random() * 8)
  }
  return items
}

let itemsShowed = randomNum()
let itemsLeft = randomNum()
let itemsRight = randomNum()
while (
  itemsLeft
    .map((item) => +itemsShowed.includes(item))
    .reduce((a, b) => a + b) !== 0
) {
  itemsLeft = randomNum()
}
while (
  itemsRight
    .map((item) => +itemsShowed.includes(item))
    .reduce((a, b) => a + b) !== 0
) {
  itemsRight = randomNum()
}

for (let i = 0; i < screenWidthNum; i++) {
  ITEM_CENTER.append(petCard(itemsShowed[i]))
}
for (let i = 0; i < screenWidthNum; i++) {
  ITEM_LEFT.append(petCard(itemsLeft[i]))
}
for (let i = 0; i < screenWidthNum; i++) {
  ITEM_RIGHT.append(petCard(itemsRight[i]))
}

const moveLeft = () => {
  CAROUSEL.classList.add('transition-left')
  BTN_LEFT.removeEventListener('click', moveLeft)
  BTN_RIGHT.removeEventListener('click',  moveRight)
}

const moveRight = () => {
  CAROUSEL.classList.add('transition-right')
  BTN_RIGHT.removeEventListener('click',  moveRight)
  BTN_LEFT.removeEventListener('click', moveLeft)
}

BTN_LEFT.addEventListener('click', moveLeft)
BTN_RIGHT.addEventListener('click',  moveRight)

CAROUSEL.addEventListener('animationend', (animationEvent) => {
  let changedItem;
  if (animationEvent.animationName === 'move-left') {
    CAROUSEL.classList.remove('transition-left');
    changedItem = ITEM_LEFT;
    document.querySelector("#card_center").innerHTML = ITEM_LEFT.innerHTML;
    ITEM_LEFT.innerHTML = ""
    itemsRight = itemsShowed
    itemsShowed = itemsLeft
    itemsLeft = randomNum()
    while (
      itemsLeft
        .map((item) => +itemsShowed.includes(item))
        .reduce((a, b) => a + b) !== 0
    ) {
 itemsLeft = randomNum()
}
    for (let i = 0; i < screenWidthNum; i++) {
      ITEM_LEFT.append(petCard(itemsLeft[i]))
    }
  } else {
    CAROUSEL.classList.remove('transition-right')
    changedItem = ITEM_RIGHT;
    document.querySelector("#card_center").innerHTML = ITEM_RIGHT.innerHTML;
    ITEM_RIGHT.innerHTML = ""
    itemsLeft = itemsShowed
    itemsShowed = itemsRight
    itemsRight = randomNum()
    while (
      itemsRight
        .map((item) => +itemsShowed.includes(item))
        .reduce((a, b) => a + b) !== 0
    ) {
      itemsRight = randomNum()
    }
    for (let i = 0; i < screenWidthNum; i++) {
      ITEM_RIGHT.append(petCard(itemsRight[i]))
    }
  }
  BTN_LEFT.addEventListener('click', moveLeft)
  BTN_RIGHT.addEventListener('click', moveRight)
})

