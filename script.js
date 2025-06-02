const productos = {
  pasteles: [
    { nombre: "Pastel de Chocolate", precio: 250 },
    { nombre: "Pastel Tres Leches", precio: 300 },
    { nombre: "Pastel de Zanahoria", precio: 280 }
  ],
  gelatinas: [
    { nombre: "Gelatina de Mosaico", precio: 80 },
    { nombre: "Gelatina de Fresa", precio: 70 }
  ],
  pays: [
    { nombre: "Pay de Limón", precio: 90 },
    { nombre: "Pay de Queso", precio: 100 }
  ]
};

const carrito = [];

function mostrarSeccion(id) {
  document.querySelectorAll("main > section").forEach(sec => sec.style.display = "none");
  document.getElementById(id).style.display = "block";
  if (id === "domicilio") mostrarProductos("pasteles", "domicilio-lista");
}

function mostrarCategoria(categoria) {
  mostrarProductos(categoria, "categoria-productos");
}

function mostrarProductos(categoria, contenedorId) {
  const contenedor = document.getElementById(contenedorId);
  contenedor.innerHTML = "";
  productos[categoria].forEach((p, i) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <strong>${p.nombre}</strong><br>
      Precio: $${p.precio}<br>
      <button onclick="agregarAlCarrito('${categoria}', ${i})">Agregar al carrito</button>
    `;
    contenedor.appendChild(div);
  });
}

function agregarAlCarrito(categoria, index) {
  const producto = productos[categoria][index];
  carrito.push(producto);
  actualizarCarrito();
}

function actualizarCarrito() {
  const lista = document.getElementById("lista-carrito");
  lista.innerHTML = "";
  let total = 0;
  carrito.forEach((prod, i) => {
    total += prod.precio;
    const li = document.createElement("li");
    li.textContent = `${prod.nombre} - $${prod.precio}`;
    const btn = document.createElement("button");
    btn.textContent = "Eliminar";
    btn.onclick = () => {
      carrito.splice(i, 1);
      actualizarCarrito();
    };
    li.appendChild(btn);
    lista.appendChild(li);
  });
  document.getElementById("total-carrito").textContent = total;
}

function descargarTicket() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const fecha = new Date();
  let y = 20;

  doc.text("Ticket - Pastelería Las Nubes", 10, y);
  y += 10;
  doc.text("Fecha: " + fecha.toLocaleDateString(), 10, y);
  y += 10;
  doc.text("Hora: " + fecha.toLocaleTimeString(), 10, y);
  y += 10;

  carrito.forEach((prod, i) => {
    doc.text(`${i + 1}. ${prod.nombre} - $${prod.precio}`, 10, y);
    y += 10;
  });

  const total = carrito.reduce((sum, p) => sum + p.precio, 0);
  y += 10;
  doc.text("Total: $" + total, 10, y);
  y += 10;
  const metodo = document.getElementById("metodoPago").value;
  doc.text("Método de pago: " + metodo, 10, y);
  doc.save("ticket_pasteleria_las_nubes.pdf");
}
