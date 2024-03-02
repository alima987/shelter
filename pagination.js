import dataset from "./dataset.js";
const data = dataset.dataset
const FIRST_PAGE = document.querySelector("#first_page");
const PREV_PAGE = document.querySelector("#prev_page");
const CURR_PAGE = document.querySelector("#current_page");
const NEXT_PAGE = document.querySelector("#next_page");
const LAST_PAGE = document.querySelector("#last_page");

let currPage = 0;
let itemPerPage = 8;
const totalPage = 6;

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
const showPage = () => {
    const startIndex = (currPage - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;
    data.slice(startIndex, endIndex);
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
