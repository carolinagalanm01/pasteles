let cart = [];
let cartTotal = 0;

function showSection(sectionId) {
// Ocultar todas las secciones
const sections = document.querySelectorAll(’.section’);
sections.forEach(section => section.classList.remove(‘active’));

```
// Ocultar menú principal
document.getElementById('main-menu').style.display = 'none';

// Mostrar sección seleccionada
document.getElementById(sectionId).classList.add('active');

if (sectionId === 'carrito') {
    updateCartDisplay();
}
```

}

function showMainMenu() {
// Ocultar todas las secciones
const sections = document.querySelectorAll(’.section’);
sections.forEach(section => section.classList.remove(‘active’));

```
// Mostrar menú principal
document.getElementById('main-menu').style.display = 'block';

//
```
