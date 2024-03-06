import dataset from "../dataset.js";
const data = dataset.dataset;
const PETS_CARD_CONTAINER = document.querySelector(".our_pets_card_container");
const FIRST_PAGE = document.querySelector("#first_page");
const PREV_PAGE = document.querySelector("#prev_page");
const CURR_PAGE = document.querySelector("#current_page");
const NEXT_PAGE = document.querySelector("#next_page");
const LAST_PAGE = document.querySelector("#last_page");

let currPage = 1;
let itemPerPage = 8;
const totalPage = 6;
let petsArr = [];

const updateCurrPage = () => {
    CURR_PAGE.textContent = currPage;
    if(currPage === 1) {
        PREV_PAGE.classList.add('disabled')
        FIRST_PAGE.classList.add('disabled')
    } else {
        PREV_PAGE.classList.remove('disabled')
        FIRST_PAGE.classList.remove('disabled')
    }
    if(currPage === totalPage) {
        NEXT_PAGE.classList.add('disabled')
        LAST_PAGE.classList.add('disabled')
    } else {
        NEXT_PAGE.classList.remove('disabled')
        LAST_PAGE.classList.remove('disabled')
    }
}
const shuffleCards = (arr) => {
   let copy = [...arr]
   for(let i = copy.length - 1; i > 0; i-- ) {
   const j = Math.floor(Math.random() * (i + 1))
   const temp = copy[i]
   copy[i] = copy[j]
   copy[j] = temp
   }
   return copy;
}
const breakCardsToParts = () => {
    const initialArr = shuffleCards(data)
    for (let i = 0; i < 6; i++) {
      const firstPart = shuffleCards(initialArr.slice(0, 3))
      const secondPart = shuffleCards(initialArr.slice(3, 6))
      const thirdPart = shuffleCards(initialArr.slice(6, 9))
      const newArr = [...firstPart, ...secondPart, ...thirdPart]
      petsArr = [...petsArr, ...newArr]
    }
}
const showPage = () => {
    PETS_CARD_CONTAINER.innerHTML = ''; 
    const startIndex = (currPage - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;
    const pages = petsArr.slice(startIndex, endIndex);

    pages.forEach(pet => {
            const card = petsCard(pet.id); 
            PETS_CARD_CONTAINER.append(card);
    });
}

const petsCard = (id) => {
    const card = document.createElement('form');
    card.classList.add('card_our_pets')
    card.id = data[id].id
    card.innerHTML = `
        <img src="${data[id].img}" alt="${data[id].name}" class="pets_image">
        <p class="pets_card_title">${data[id].name}</p>
        <button class="button_secondary">Learn more</button>
        `
    return card
}
window.addEventListener('load', () => {
    showPage();
    updateCurrPage();
})
PREV_PAGE.addEventListener('click', () => {
    if(currPage > 1) {
        currPage--;
        showPage()
        updateCurrPage()
    }
})
NEXT_PAGE.addEventListener('click', () => {
    if(currPage < totalPage) {
        currPage++;
        showPage()
        updateCurrPage()
    }
})
FIRST_PAGE.addEventListener('click', () => {
    if(currPage > 1) {
        currPage = 1;
        showPage()
        updateCurrPage()
    }
})
LAST_PAGE.addEventListener('click', () => {
    if(currPage < totalPage) {
        currPage = totalPage;
        showPage()
        updateCurrPage()
    }
})
breakCardsToParts()