const pasteles = [
  { nombre: "Pastel de Chocolate", precio: 250, descripcion: "Delicioso pastel con cobertura de chocolate amargo." },
  { nombre: "Pastel de Fresa", precio: 220, descripcion: "Relleno con fresas frescas y crema batida." },
  { nombre: "Pastel de Tres Leches", precio: 280, descripcion: "Clásico pastel mexicano bañado en tres leches." },
  { nombre: "Cheesecake", precio: 260, descripcion: "Suave pastel de queso con base de galleta." },
  { nombre: "Pastel de Zanahoria", precio: 230, descripcion: "Esponjoso pastel con cobertura de queso crema." }
];

let carrito = [];

function mostrarSeccion(id) {
  document.querySelectorAll('.seccion').forEach(sec => sec.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}

function cargarPasteles() {
  const container = document.getElementById("pasteles-container");
  pasteles.forEach((pastel, index) => {
    const div = document.createElement("div");
    div.className = "pastel";
    div.innerHTML = `
      <img src="pastel${index + 1}.jpg" alt="${pastel.nombre}" />
      <h3>${pastel.nombre}</h3>
      <p>${pastel.descripcion}</p>
      <p class="precio">$${pastel.precio.toFixed(2)} MXN</p>
      <button onclick="agregarAlCarrito(${index})">Agregar al carrito</button>
    `;
    container.appendChild(div);
  });
}

function agregarAlCarrito(index) {
  carrito.push(pasteles[index]);
  actualizarCarrito();
}

function actualizarCarrito() {
  const lista = document.getElementById("lista-carrito");
  const totalElement = document.getElementById("total");
  lista.innerHTML = "";
  let total = 0;
  carrito.forEach(pastel => {
    const li = document.createElement("li");
    li.textContent = `${pastel.nombre} - $${pastel.precio.toFixed(2)} MXN`;
    lista.appendChild(li);
    total += pastel.precio;
  });
  totalElement.textContent = `$${total.toFixed(2)} MXN`;
}

async function pagar()
