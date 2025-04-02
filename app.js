  document.addEventListener('DOMContentLoaded', () => {
  const pastelSelect = document.getElementById('pastel');
  const precio = document.getElementById('precio');

  const precios = {
    "tarta_chocolate": 20,
    "tarta_fresas": 25,
    "pastel_vainilla": 18
  };

  pastelSelect.addEventListener('change', (event) => {
    const pastel = event.target.value;
    precio.innerText = '€' + precios[pastel];
  });
});
