const productos = [
  {
    nombre: "Pastel de Chocolate",
    precio: 250,
    imagen: "https://via.placeholder.com/200x150?text=Pastel+Chocolate",
  },
  {
    nombre: "Gelatina de Fresa",
    precio: 80,
    imagen: "https://via.placeholder.com/200x150?text=Gelatina+Fresa",
  },
  {
    nombre: "Pay de Limón",
    precio: 120,
    imagen: "https://via.placeholder.com/200x150?text=Pay+Limón",
  },
];

let carrito = [];

const productosContainer = document.getElementById("productos");
const carritoLista = document.getElementById("carrito-lista");
const totalElement = document.getElementById("total");

productos.forEach((producto, index) => {
  const div = document.createElement("div");
  div.className = "producto";
  div.innerHTML = `
    <img src="${producto.imagen}" alt="${producto.nombre}" />
    <h3>${producto.nombre}</h3>
    <p>$${producto.precio}</p>
    <button onclick="agregarAlCarrito(${index})">Agregar al carrito</button>
  `;
  productosContainer.appendChild(div);
});

function agregarAlCarrito(index) {
  carrito.push(productos[index]);
  actualizarCarrito();
}

function actualizarCarrito() {
  carritoLista.innerHTML = "";
  let total = 0;
  carrito.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - $${item.precio}`;
    carritoLista.appendChild(li);
    total += item.precio;
  });
  totalElement.textContent = `Total: $${total.toFixed(2)}`;
}

function descargarTicket() {
  const metodoPago = document.getElementById("metodo-pago").value;
  if (!metodoPago) {
    alert("Selecciona un método de pago");
    return;
  }

  let contenido = "Ticket de compra\n\n";
  carrito.forEach((item) => {
    contenido += `${item.nombre}: $${item.precio}\n`;
  });
  let total = carrito.reduce((acc, item) => acc + item.precio, 0);
  contenido += `\nTotal: $${total.toFixed(2)}\n`;
  contenido += `Método de pago: ${metodoPago}\n`;

  const blob = new Blob([contenido], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "ticket.pdf";
  link.click();
}
