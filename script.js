// Inicializar EmailJS
(function () {
  emailjs.init("8rd5eV0Wl3J-_roYR");
})();

function mostrarSeccion(id) {
  const secciones = document.querySelectorAll("main > section");
  secciones.forEach(sec => sec.style.display = "none");
  document.getElementById(id).style.display = "block";
}

const productos = {
  pasteles: [
    { nombre: "Pastel de Chocolate", precio: 250 },
    { nombre: "Pastel de Fresa", precio: 230 }
  ],
  gelatinas: [
    { nombre: "Gelatina Tricolor", precio: 70 },
    { nombre: "Gelatina de Mosaico", precio: 80 }
  ],
  pays: [
    { nombre: "Pay de Limón", precio: 90 },
    { nombre: "Pay de Queso", precio: 100 }
  ]
};

function mostrarCategoria(categoria) {
  const cont = document.getElementById("categoria-productos");
  cont.innerHTML = "";
  productos[categoria].forEach((p, i) => {
    cont.innerHTML += `
      <div>
        <h3>${p.nombre}</h3>
        <p>Precio: $${p.precio}</p>
        <button onclick="agregarAlCarrito('${categoria}', ${i})">Agregar al carrito</button>
      </div>
    `;
  });
}

const carrito = [];

function agregarAlCarrito(cat, idx) {
  carrito.push(productos[cat][idx]);
  actualizarCarrito();
}

function actualizarCarrito() {
  const lista = document.getElementById("lista-carrito");
  const total = document.getElementById("total-carrito");
  lista.innerHTML = "";
  let suma = 0;
  carrito.forEach((item, i) => {
    suma += item.precio;
    lista.innerHTML += `<li>${item.nombre} - $${item.precio}
      <button onclick="borrarProducto(${i})">Eliminar</button>
    </li>`;
  });
  total.textContent = suma;
}

function borrarProducto(i) {
  carrito.splice(i, 1);
  actualizarCarrito();
}

// Ticket en PDF
function descargarTicket() {
  const doc = new window.jspdf.jsPDF();
  doc.text("Ticket de compra - Pastelería Las Nubes", 10, 10);
  carrito.forEach((item, i) => {
    doc.text(`${i + 1}. ${item.nombre} - $${item.precio}`, 10, 20 + i * 10);
  });
  const total = carrito.reduce((acc, val) => acc + val.precio, 0);
  doc.text(`Total: $${total}`, 10, 30 + carrito.length * 10);
  doc.save("ticket.pdf");
}

// Enviar contacto
document.getElementById("form-contacto").addEventListener("submit", function (e) {
  e.preventDefault();
  const templateParams = {
    from_name: document.getElementById("nombre").value,
    reply_to: document.getElementById("email").value,
    message: document.getElementById("mensaje").value,
  };

  emailjs.send("service_t8sak4q", "template_aqvt12p", templateParams)
    .then(() => {
      document.getElementById("mensaje-enviado").textContent = "¡Mensaje enviado correctamente!";
      document.getElementById("form-contacto").reset();
    }, (error) => {
      alert("Error al enviar el mensaje: " + JSON.stringify(error));
    });
});
