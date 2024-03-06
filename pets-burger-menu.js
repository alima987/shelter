let menuPetBtn = document.querySelector('.menu-pet-btn');
let menuPet = document.querySelector('.nav_pet_list');
let logoPet = document.querySelector('.header_pets_logo');

function closeOnClickPet() {
    menuPet.classList.remove("active");
    menuPetBtn.classList.remove("menu-pet-btn_active");
    logoPet.classList.remove('hide_logo');
}
const closePet = (event) => document.body.contains(event.target) && closeOnClickPet(event);

const togglePetMenu = menuPetBtn.addEventListener('click', function(event){
    event.stopPropagation();
    menuPet.classList.toggle('active');
    menuPetBtn.classList.toggle('menu-pet-btn_active');
    logoPet.classList.toggle('hide_logo');
   })
window.addEventListener('click', close);