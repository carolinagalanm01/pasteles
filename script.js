function mostrarSeccion(id) {
  document.querySelectorAll("section").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  document.querySelectorAll(".subcategoria").forEach(sub => sub.style.display = "none");
}

function mostrarSubcategoria(tipo) {
  document.querySelectorAll(".subcategoria").forEach(sub => sub.style.display = "none");
  document.getElementById(tipo).style.display = "block";
}

function volverProductos() {
  document.querySelectorAll(".subcategoria").forEach(sub => sub.style.display = "none");
}

let carrito = [];

function agregarAlCarrito(nombre, precio) {
  carrito.push({ nombre, precio });
  actualizarCarrito();
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

function actualizarCarrito() {
  const lista = document.getElementById("carrito-contenido");
  lista.innerHTML = "";
  let total = 0;
  carrito.forEach((item, i) => {
    total += item.precio;
    lista.innerHTML += `<li>${item.nombre} - $${item.precio} <button onclick="eliminarDelCarrito(${i})">Eliminar</button></li>`;
  });
  document.getElementById("total-carrito").textContent = `Total: $${total}`;
}

async function generarTicketPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text("Ticket de Compra - Pastelería Las Nubes", 20, 20);
  let y = 30;
  let total = 0;
  carrito.forEach((item, i) => {
    const linea = `${i + 1}. ${item.nombre} - $${item.precio}`;
    doc.text(linea, 20, y);
    y += 10;
    total += item.precio;
  });
  doc.text(`Total: $${total}`, 20, y + 10);
  doc.save("ticket_pasteleria.pdf");
}
