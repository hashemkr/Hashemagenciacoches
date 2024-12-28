// Este código maneja la funcionalidad del menú de hamburguesa en la navegación
const burgerMenu = document.querySelector('.burger-menu');
const navMenu = document.querySelector('nav ul');
burgerMenu.addEventListener('click', function() {
    navMenu.classList.toggle('show');
    burgerMenu.classList.toggle('active');
});