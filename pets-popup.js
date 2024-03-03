import dataset from "./dataset.js";
const data = dataset.dataset



const createPopup = (id) => {
  let pets_img = document.createElement('div')
  pets_img.className = 'popup-img'
  pets_img.innerHTML = `<img src=${data[id].img}>`
  let modalWindow = document.querySelector('.popup_info')
  modalWindow.append(pets_img)
  let content = document.createElement('div')
  content.className = 'popup-content'
  content.innerHTML = `
        <h4>${data[id].name}</h4>
        <h5>${data[id].type} - ${data[id].breed}</h5>
        <p>${data[id].description}</p>
        <ul>
            <li><span><b>Age:</b> ${data[id].age}</span></li>
            <li><span><b>Inoculations:</b> ${data[id].inoculations.join(
              ', ',
            )}</span></li>
            <li><span><b>Diseases:</b> ${data[id].diseases.join(
              ', ',
            )}</span></li>
            <li><span><b>Parasites:</b> ${data[id].parasites.join(
              ', ',
            )}</span></li>
        </ul>
    `
    modalWindow.append(content)
}

const popup = document.querySelector('.popup')
console.log(popup);

const overlay = document.createElement('div')
    overlay.className = 'overlay';
    const body = document.querySelector('body');
    body.appendChild(overlay);
const openPopup = () => {
    popup.classList.add('popup_active')
    overlay.classList.add('overlay_active')
}

const closePopup = () => {
    popup.classList.remove('popup_active')
    document.querySelector('.popup_info').innerHTML = ''
    overlay.classList.remove('overlay_active')
}

document.addEventListener('click', (e) => {
  let getPetCard = e.target.closest('.card_our_pets')
  if (getPetCard) {
    createPopup(getPetCard.id)
    openPopup()
  }
  if (e.target.closest('.close_btn')) {
    closePopup()
  }
})
overlay.addEventListener('click', function(e) {
  let card = e.target.closest('.popup')
   if(!card) {
    closePopup()
   }
})

