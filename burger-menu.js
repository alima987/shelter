let menuBtn = document.querySelector('.menu-btn');
let menu = document.querySelector('.nav_list');
let logo = document.querySelector('.header_logo');
let screen = document.querySelector('.start_screen_content');

function closeOnClick() {
    menu.classList.remove("active");
    menuBtn.classList.remove("menu_btn_active");
    logo.classList.remove('hide_logo');
    screen.classList.remove('hide_screen');
}
const close = (event) => document.body.contains(event.target) && closeOnClick(event);

const toggleMenu = menuBtn.addEventListener('click', function(event){
    event.stopPropagation();
    menu.classList.toggle('active');
    menuBtn.classList.toggle('menu_btn_active');
    logo.classList.toggle('hide_logo');
    screen.classList.toggle('hide_screen');
   })
window.addEventListener('click', close);

