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

// Mostrar una sección y ocultar las demás
function mostrarSeccion(id) {
  const secciones = document.querySelectorAll('main > section');
  secciones.forEach(sec => sec.style.display = 'none');
  const seccion = document.getElementById(id);
  if (seccion) seccion.style.display = 'block';

  if (id === 'productos') {
    document.getElementById('categoria-productos').innerHTML = '';
  }
}

// Mostrar productos por categoría
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
      <button onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio})">Agregar al carrito</button>
    `;
    contenedor.appendChild(div);
  });

  mostrarSeccion('productos');
}

// Mostrar paquetes para eventos
function mostrarPaquete(tipo) {
  const contenedor = document.getElementById('contenido-paquete');
  contenedor.innerHTML = '';

  const paquetes = {
    graduacion: [
      { nombre: 'Pastel de Birrete', imagen: 'pastel_graduacion.jpg', precio: 500 },
      { nombre: 'Mini Gelatinas Temáticas', imagen: 'gelatina_graduacion.jpg', precio: 200 }
    ],
    cumpleaños: [
      { nombre: 'Pastel de Ositos', imagen: 'pastel_osos.jpg', precio: 400 },
      { nombre: 'Cupcakes de Colores', imagen: 'cupcakes.jpg', precio: 180 }
    ],
    boda: [
      { nombre: 'Pastel Elegante de Boda', imagen: 'pastel_boda.jpg', precio: 1000 },
      { nombre: 'Mesa de Postres Blancos', imagen: 'mesa_boda.jpg', precio: 700 }
    ]
  };

  paquetes[tipo].forEach(producto => {
    const div = document.createElement('div');
    div.classList.add('paquete-item');

    div.innerHTML = `
      <h3>${producto.nombre}</h3>
      <img src="${producto.imagen}" alt="${producto.nombre}" style="width:200px;" />
      <p>Precio: $${producto.precio}</p>
      <button onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio})">Agregar al carrito</button>
    `;
    contenedor.appendChild(div);
  });

  mostrarSeccion('paquetes-evento');
}

// Agregar producto o paquete al carrito
function agregarAlCarrito(nombre, precio) {
  carrito.push({ nombre, precio });
  actualizarCarrito();
  alert(`${nombre} agregado al carrito`);
}

// Actualizar vista del carrito
function actualizarCarrito() {
  const lista = document.getElementById('lista-carrito');
  const totalSpan = document.getElementById('total-carrito');
  lista.innerHTML = '';
  total = 0;

  carrito.forEach((producto, index) => {
    const li = document.createElement('li');
    li.textContent = `${producto.nombre} - $${producto.precio}`;

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

  totalSpan.textContent = total.toFixed(2);
}

// Descargar ticket PDF usando jsPDF
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

  const metodoPago = document.getElementById('metodoPago').value || "No especificado";
  doc.text(`Método de pago: ${metodoPago}`, 14, y + 20);

  doc.save('ticket.pdf');
}

// Mostrar la sección de inicio por defecto al cargar
window.onload = () => mostrarSeccion('inicio');
