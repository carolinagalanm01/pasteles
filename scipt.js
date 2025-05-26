function enviarFormulario(event) {
  event.preventDefault();
  const nombre = document.getElementById('nombre').value;
  alert(`Gracias por contactarnos, ${nombre}! Te responderemos pronto.`);
}
