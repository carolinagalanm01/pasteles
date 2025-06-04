// Variables globales
let carrito = [];
let total = 0;

// Datos de productos con imágenes corregidas
const productos = {
pasteles: [
{ id: 1, nombre: “Pastel de Chocolate”, precio: 350, imagen: “https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop” },
{ id: 2, nombre: “Pastel de Vainilla”, precio: 320, imagen: “https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=300&fit=crop” },
{ id: 3, nombre: “Pastel Red Velvet”, precio: 380, imagen: “https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=400&h=300&fit=crop” }
],
gelatinas: [
{ id: 4, nombre: “Gelatina de Fresa”, precio: 150, imagen: “https://images.unsplash.com/photo-1582716401301-b2407dc7563d?w=400&h=300&fit=crop” },
{ id: 5, nombre: “Gelatina Mosaico”, precio: 180, imagen: “https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop” },
{ id: 6, nombre: “Gelatina de Limón”, precio: 160, imagen: “https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop” }
],
pays: [
{ id: 7, nombre: “Pay de Limón”, precio: 280, imagen: “https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=400&h=300&fit=crop” },
{ id: 8, nombre: “Pay de Queso”, precio: 300, imagen: “https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop” }
]
};

// Mostrar una sección y ocultar las demás
function mostrarSeccion(id) {
const secciones = document.querySelectorAll(‘main > section’);
secciones.forEach(sec => sec.style.display = ‘none’);
const seccion = document.getElementById(id);
if (seccion) seccion.style.display = ‘block’;

// Solo limpiar el contenedor si estamos entrando a la sección productos sin categoría específica
if (id === ‘productos’) {
const contenedor = document.getElementById(‘categoria-productos’);
if (contenedor && !contenedor.hasChildNodes()) {
contenedor.innerHTML = ‘<p style="text-align: center; color: #666; margin-top: 20px;">Selecciona una categoría para ver los productos disponibles.</p>’;
}
}
}

// Mostrar productos por categoría
function mostrarCategoria(categoria) {
const contenedor = document.getElementById(‘categoria-productos’);
if (!contenedor) {
console.error(‘No se encontró el contenedor categoria-productos’);
return;
}

contenedor.innerHTML = ‘’;

if (!productos[categoria]) {
contenedor.innerHTML = ‘<p>Categoría no encontrada</p>’;
return;
}

productos[categoria].forEach(producto => {
const div = document.createElement(‘div’);
div.classList.add(‘producto’);
div.style.cssText = `border: 1px solid #ddd; border-radius: 10px; padding: 15px; margin: 10px; text-align: center; box-shadow: 0 4px 15px rgba(0,0,0,0.1); background: white; display: inline-block; width: 250px; vertical-align: top;`;

```
div.innerHTML = `
  <img src="${producto.imagen}" alt="${producto.nombre}" 
       style="width:100%; height: 200px; object-fit: cover; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);" 
       onerror="this.src='https://via.placeholder.com/400x300/cccccc/666666?text=Imagen+no+disponible'" />
  <h3 style="color: #333; margin: 10px 0;">${producto.nombre}</h3>
  <p style="font-size: 18px; font-weight: bold; color: #2c5aa0;">Precio: $${producto.precio}</p>
  <button onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio})" 
          style="background-color: #ff6b6b; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-weight: bold;">
    Agregar al carrito
  </button>
`;
contenedor.appendChild(div);
```

});

// Asegurar que la sección productos esté visible
mostrarSeccion(‘productos’);
}

// Mostrar paquetes para eventos (con imágenes corregidas)
function mostrarPaquete(tipo) {
const contenedor = document.getElementById(‘contenido-paquete’);
if (!contenedor) return;

contenedor.innerHTML = ‘’;

const paquetes = {
graduacion: [
{ nombre: ‘Pastel de Birrete’, imagen: ‘https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=300&fit=crop’, precio: 500 },
{ nombre: ‘Mini Gelatinas Temáticas’, imagen: ‘https://images.unsplash.com/photo-1582716401301-b2407dc7563d?w=400&h=300&fit=crop’, precio: 200 }
],
cumpleaños: [
{ nombre: ‘Pastel de Ositos’, imagen: ‘https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop’, precio: 400 },
{ nombre: ‘Cupcakes de Colores’, imagen: ‘https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=400&h=300&fit=crop’, precio: 180 }
],
boda: [
{ nombre: ‘Pastel Elegante de Boda’, imagen: ‘https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=400&h=300&fit=crop’, precio: 1000 },
{ nombre: ‘Mesa de Postres Blancos’, imagen: ‘https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=300&fit=crop’, precio: 700 }
]
};

if (!paquetes[tipo]) {
contenedor.innerHTML = ‘<p>Tipo de paquete no encontrado</p>’;
return;
}

paquetes[tipo].forEach(producto => {
const div = document.createElement(‘div’);
div.classList.add(‘paquete-item’);
div.style.cssText = `border: 1px solid #ddd; border-radius: 10px; padding: 15px; margin: 10px; text-align: center; box-shadow: 0 4px 15px rgba(0,0,0,0.1); background: white; display: inline-block; width: 250px; vertical-align: top;`;

```
div.innerHTML = `
  <h3 style="color: #333; margin-bottom: 10px;">${producto.nombre}</h3>
  <img src="${producto.imagen}" alt="${producto.nombre}" 
       style="width:100%; height: 200px; object-fit: cover; border-radius: 10px; margin-bottom: 10px;" 
       onerror="this.src='https://via.placeholder.com/400x300/cccccc/666666?text=Imagen+no+disponible'" />
  <p style="font-size: 18px; font-weight: bold; color: #2c5aa0;">Precio: $${producto.precio}</p>
  <button onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio})" 
          style="background-color: #ff6b6b; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-weight: bold;">
    Agregar al carrito
  </button>
`;
contenedor.appendChild(div);
```

});

mostrarSeccion(‘paquetes-evento’);
}

// Agregar producto o paquete al carrito
function agregarAlCarrito(nombre, precio) {
carrito.push({ nombre, precio });
actualizarCarrito();

// Mostrar mensaje de confirmación más elegante
const mensaje = document.createElement(‘div’);
mensaje.style.cssText = `position: fixed; top: 20px; right: 20px; background-color: #4CAF50; color: white; padding: 15px 20px; border-radius: 5px; box-shadow: 0 4px 15px rgba(0,0,0,0.2); z-index: 1000; font-weight: bold;`;
mensaje.textContent = `✓ ${nombre} agregado al carrito`;
document.body.appendChild(mensaje);

setTimeout(() => {
documento.body.removeChild(mensaje);
}, 3000);
}

// Actualizar vista del carrito
function actualizarCarrito() {
const lista = document.getElementById(‘lista-carrito’);
const totalSpan = document.getElementById(‘total-carrito’);

if (!lista || !totalSpan) return;

lista.innerHTML = ‘’;
total = 0;

if (carrito.length === 0) {
lista.innerHTML = ‘<li style="color: #666; font-style: italic;">El carrito está vacío</li>’;
totalSpan.textContent = ‘0.00’;
return;
}

carrito.forEach((producto, index) => {
const li = document.createElement(‘li’);
li.style.cssText = `display: flex; justify-content: space-between; align-items: center; padding: 10px; border-bottom: 1px solid #eee; margin-bottom: 5px;`;

```
const spanProducto = document.createElement('span');
spanProducto.textContent = `${producto.nombre} - $${producto.precio}`;

const btnEliminar = document.createElement('button');
btnEliminar.textContent = 'Eliminar';
btnEliminar.style.cssText = `
  background-color: #ff4444;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
`;
btnEliminar.onclick = () => {
  carrito.splice(index, 1);
  actualizarCarrito();
};

li.appendChild(spanProducto);
li.appendChild(btnEliminar);
lista.appendChild(li);
total += producto.precio;
```

});

totalSpan.textContent = total.toFixed(2);
}

// Descargar ticket PDF usando jsPDF
function descargarTicket() {
if (carrito.length === 0) {
alert(‘El carrito está vacío’);
return;
}

// Verificar si jsPDF está disponible
if (typeof window.jspdf === ‘undefined’) {
alert(‘Error: La librería jsPDF no está cargada. Asegúrate de incluir el script de jsPDF en tu HTML.’);
return;
}

const { jsPDF } = window.jspdf;
const doc = new jsPDF();

// Título
doc.setFontSize(18);
doc.text(‘Ticket de Compra - Postres Deliciosos’, 14, 22);

// Fecha
doc.setFontSize(10);
doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 35);

// Productos
doc.setFontSize(12);
let y = 50;
doc.text(‘Productos:’, 14, y);
y += 10;

carrito.forEach(producto => {
doc.text(`• ${producto.nombre} - $${producto.precio}`, 20, y);
y += 8;
});

// Total
y += 10;
doc.setFontSize(14);
doc.text(`Total: $${total.toFixed(2)}`, 14, y);

// Método de pago
const metodoPago = document.getElementById(‘metodoPago’)?.value || “No especificado”;
doc.setFontSize(12);
doc.text(`Método de pago: ${metodoPago}`, 14, y + 15);

// Mensaje de agradecimiento
doc.setFontSize(10);
doc.text(’¡Gracias por tu compra!’, 14, y + 30);

doc.save(‘ticket-postres.pdf’);
}

// Función para limpiar el carrito
function limpiarCarrito() {
if (carrito.length === 0) {
alert(‘El carrito ya está vacío’);
return;
}

if (confirm(’¿Estás seguro de que quieres vaciar el carrito?’)) {
carrito = [];
actualizarCarrito();
}
}

// Mostrar la sección de inicio por defecto al cargar
window.onload = () => {
mostrarSeccion(‘inicio’);
actualizarCarrito(); // Inicializar el carrito vacío
};