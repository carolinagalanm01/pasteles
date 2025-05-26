const pasteles = [
  { nombre: "Pastel de Chocolate", precio: 250, descripcion: "Delicioso pastel con cobertura de chocolate amargo." },
  { nombre: "Pastel de Fresa", precio: 220, descripcion: "Relleno con fresas frescas y crema batida." },
  { nombre: "Pastel de Tres Leches", precio: 280, descripcion: "Clásico pastel mexicano bañado en tres leches." },
  { nombre: "Cheesecake", precio: 260, descripcion: "Suave pastel de queso con base de galleta." },
  { nombre: "Pastel de Zanahoria", precio: 230, descripcion: "Esponjoso y con cobertura de queso crema." }
];

const container = document.getElementById("pasteles-container");
const listaCarrito = document.getElementById("lista-carrito");
const totalElement = document.getElementById("total");
const ticket = document.getElementById("ticket");

let carrito = [];

pasteles.forEach((pastel, index) => {
  const div = document.createElement("div");
  div.className = "pastel";
  div.innerHTML = `
    <h3>${pastel.nombre}</h3>
    <p>${pastel.descripcion}</p>
    <p><strong>$${pastel.precio.toFixed(2)} MXN</strong></p>
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
  carrito.forEach((item, i) => {
    total += item.precio;
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - $${item.precio.toFixed(2)} MXN`;
    listaCarrito.appendChild(li);
  });
  totalElement.textContent = `$${total.toFixed(2)} MXN`;
}

async function pagar() {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  const metodo = document.getElementById("metodo-pago").value;
  const total = carrito.reduce((sum, item) => sum + item.precio, 0);
  const fecha = new Date().toLocaleString();

  // Mostrar en pantalla
  ticket.innerHTML = `
    <h3>Ticket de Compra</h3>
    <p>Fecha: ${fecha}</p>
    <p>Pasteles:</p>
    <ul>
      ${carrito.map(p => `<li>${p.nombre} - $${p.precio.toFixed(2)} MXN</li>`).join("")}
    </ul>
    <p>Total: $${total.toFixed(2)} MXN</p>
    <p>Pago con: ${metodo}</p>
    <p>¡Gracias por tu compra!</p>
  `;

  // Generar PDF con jsPDF
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Ticket de Compra - Pastelería Dulce Sabor", 10, 10);

  doc.setFontSize(12);
  doc.text(`Fecha: ${fecha}`, 10, 20);
  doc.text(`Pago con: ${metodo}`, 10, 30);

  doc.text("Pasteles:", 10, 40);
  let y = 50;
  carrito.forEach(p => {
    doc.text(`- ${p.nombre}: $${p.precio.toFixed(2)} MXN`, 10, y);
    y += 10;
  });

  doc.text(`Total: $${total.toFixed(2)} MXN`, 10, y + 10);
  doc.text("¡Gracias por tu compra!", 10, y + 20);

  // Descargar PDF
  doc.save("ticket_pasteleria.pdf");

  // Limpiar carrito
  carrito = [];
  actualizarCarrito();
}
