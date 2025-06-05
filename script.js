// script.js

// Variables globales
let carrito = [];
let total = 0;

// Datos de productos
const productos = {
  pasteles: [
    { id: 1, nombre: "Pastel de Chocolate", precio: 350, imagen: "https://images.unsplash.com/photo-1578985545062-69928b1d9587" },
    { id: 2, nombre: "Pastel de Vainilla", precio: 320, imagen: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3" },
    { id: 3, nombre: "Pastel Red Velvet", precio: 380, imagen: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e" }
  ],
  gelatinas: [
    { id: 4, nombre: "Gelatina de Fresa", precio: 150, imagen: "fresa.jpg" },
    { id: 5, nombre: "Gelatina Mosaico", precio: 180, imagen: "mosaico.jpg" },
    { id: 6, nombre: "Gelatina de Limón", precio: 160, imagen: "limon.jpg" }
  ],
  pays: [
    { id: 7, nombre: "Pay de Limón", precio: 280, imagen: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13" },
    { id: 8, nombre: "Pay de Queso", precio: 300, imagen: "queso.jpg" }
  ]
};

// Función para mostrar una sección y ocultar las demás
function mostrarSeccion(seccionId) {
  const secciones = document.querySelectorAll('main section');
  secciones.forEach(sec => {
    sec.style.display = (sec.id === seccionId) ? 'block' : 'none';
  });
  if (seccionId === 'productos') {
    document.getElementById('categoria-productos').innerHTML = ''; // limpiar productos al mostrar sección
  }
}

// Función para mostrar productos de una categoría
function mostrarCategoria(categoria) {
  const contenedor = document.getElementById('categoria-productos');
  contenedor.innerHTML = '';

  productos[categoria].forEach(producto => {
    const div = document.createElement('div');
    div.classList.add('producto');

    div.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" style="width:100%; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);" />
      <h3>${producto.nombre}</h3>
      <p>Precio: $${producto.precio}</p>
      <button onclick="agregarAlCarrito(${producto.id}, '${categoria}')">Agregar al carrito</button>
    `;
    contenedor.appendChild(div);
  });
}

// Función para agregar producto al carrito
function agregarAlCarrito(id, categoria) {
  const producto = productos[categoria].find(p => p.id === id);
  if (producto) {
    carrito.push(producto);
    actualizarCarrito();
    alert(`${producto.nombre} agregado al carrito`);
  }
}

// Actualizar la lista y total del carrito en la sección carrito
function actualizarCarrito() {
  const lista = document.getElementById('lista-carrito');
  lista.innerHTML = '';

  total = 0;
  carrito.forEach((producto, index) => {
    const li = document.createElement('li');
    li.textContent = `${producto.nombre} - $${producto.precio}`;
    // Agregar botón para eliminar del carrito
    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.style.marginLeft = '10px';
    btnEliminar.onclick = () => {
      carrito.splice(index, 1);
      actualizarCarrito();
    };
    li.appendChild(btnEliminar);
    lista.appendChild(li);
    total += producto.precio;
  });

  document.getElementById('total-carrito').textContent = total.toFixed(2);
}

// Función para descargar ticket en PDF usando jsPDF
function descargarTicket() {
  if (carrito.length === 0) {
    alert('El carrito está vacío');
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text('Ticket de Compra', 14, 22);

  doc.setFontSize(12);
  let y = 30;
  carrito.forEach(producto => {
    doc.text(`${producto.nombre} - $${producto.precio}`, 14, y);
    y += 10;
  });

  doc.text(`Total: $${total.toFixed(2)}`, 14, y + 10);

  const metodoPago = document.getElementById('metodoPago').value;
  doc.text(`Método de pago: ${metodoPago}`, 14, y + 20);

  doc.save('ticket.pdf');
}

// Inicializar mostrando solo la sección inicio
mostrarSeccion('inicio');