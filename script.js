const productos = {
  pasteles: [
    {
      nombre: "Pastel de Chocolate",
      precio: 250,
      descripcion: "Delicioso pastel de chocolate con cobertura suave y esponjoso bizcocho.",
      imagen: "https://images.unsplash.com/photo-1599785209707-28d1d4fef877"
    },
    {
      nombre: "Pastel Tres Leches",
      precio: 300,
      descripcion: "Clásico pastel esponjoso empapado en una mezcla de tres leches y cubierto con crema.",
      imagen: "https://images.unsplash.com/photo-1589308078055-375ffbdc3834"
    },
    {
      nombre: "Pastel de Zanahoria",
      precio: 280,
      descripcion: "Pastel húmedo con zanahoria rallada, especias y betún de queso crema.",
      imagen: "https://images.unsplash.com/photo-1601056553301-019d3b9d4f4b"
    }
  ],
  gelatinas: [
    {
      nombre: "Gelatina de Mosaico",
      precio: 80,
      descripcion: "Colorida gelatina con cubos de sabores surtidos en leche condensada.",
      imagen: "https://images.unsplash.com/photo-1613141412046-7a4dbe962846"
    },
    {
      nombre: "Gelatina de Fresa",
      precio: 70,
      descripcion: "Refrescante gelatina de fresa natural con una textura firme y dulce.",
      imagen: "https://images.unsplash.com/photo-1615484477689-d64ef01c8e30"
    }
  ],
  pays: [
    {
      nombre: "Pay de Limón",
      precio: 90,
      descripcion: "Pay suave de limón con base de galleta y cobertura cremosa.",
      imagen: "https://images.unsplash.com/photo-1562440499-64e4b68f417e"
    },
    {
      nombre: "Pay de Queso",
      precio: 100,
      descripcion: "Pay de queso estilo cheesecake, suave y con sabor clásico.",
      imagen: "https://images.unsplash.com/photo-1613145991628-38c4a7ecab96"
    }
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
    div.className = "producto";
    div.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}" />
      <h4>${p.nombre}</h4>
      <p><strong>Precio:</strong> $${p.precio}</p>
      <p>${p.descripcion}</p>
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

