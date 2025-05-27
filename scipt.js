const pasteles = [
  { nombre: "Pastel de Chocolate", precio: 250 },
  { nombre: "Pastel de Fresa", precio: 220 },
  { nombre: "Pastel de Tres Leches", precio: 280 },
  { nombre: "Cheesecake", precio: 260 },
  { nombre: "Pastel de Zanahoria", precio: 230 }
];

const container = document.getElementById("pasteles-container");
const listaCarrito = document.getElementById("lista-carrito");
const totalElement = document.getElementById("total");
const ticket = document.getElementById("ticket");

let carrito = [];

// Mostrar pasteles
pasteles.forEach((pastel, index) => {
  const div = document.createElement("div");
  div.className = "pastel";
  div.innerHTML = `
    <h3>${pastel.nombre}</h3>
    <p>$${pastel.precio.toFixed(2)} MXN</p>
    <button onclick="agregarAlCarrito(${index})">Agregar al carrito</button>
  `;
  container.appendChild(div);
});

function agregarAlCarrito(index) {
  carrito.push(pasteles[index]);
  actualizarCarrito();
}

function actualizarCarrito() {
  listaCarrito.innerHTML = "";
  let total = 0;
  carrito.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - $${item.precio.toFixed(2)} MXN`;
    listaCarrito.appendChild(li);
    total += item.precio;
  });
  totalElement.textContent = `$${total.toFixed(2)} MXN`;
}

async function pagar() {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  const metodo = document.getElementById("metodo-pago").value;
  const total = carrito.reduce((sum, p) => sum + p.precio, 0);
  const fecha = new Date().toLocaleString();

  ticket.innerHTML = `
    <h3>Ticket de Compra</h3>
    <p>Fecha: ${fecha}</p>
    <ul>${carrito.map(p => `<li>${p.nombre} - $${p.precio.toFixed(2)} MXN</li>`).join

