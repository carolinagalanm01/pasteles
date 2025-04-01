
function guardarDatosPedido() {
    let nombre = document.getElementById("nombreCliente").value || "No especificado";
    let pizza1 = document.getElementById("pastel1").value || "Ninguna";
    let pizza2 = document.getElementById("pastel2").value || "Ninguna";
    let pizza3 = document.getElementById("pastel3").value || "Ninguna";
    let complementos = document.getElementById("complementos").value || "Ninguno";
    
    let metodoEntregaElement = document.querySelector('input[name="entrega"]:checked');
    let metodoPagoElement = document.querySelector('input[name="pago"]:checked');

    let metodoEntrega = metodoEntregaElement ? metodoEntregaElement.value : "No seleccionado";
    let metodoPago = metodoPagoElement ? metodoPagoElement.value : "No seleccionado";

    let total = calcularTotal(pastel1, pastel2, pastel3, complementos);

  
    localStorage.setItem("nombre", nombre);
    localStorage.setItem("patel1", pastel1);
    localStorage.setItem("pastel2", pastel2);
    localStorage.setItem("pastel3", pastel3);
    localStorage.setItem("complementos", complementos);
    localStorage.setItem("metodoEntrega", metodoEntrega);
    localStorage.setItem("metodoPago", metodoPago);
    localStorage.setItem("total", total);

    let fecha = new Date().toLocaleDateString();
    localStorage.setItem("fecha", fecha);

  
    if (metodoPago === "Tarjeta") {
        window.location.href = "pago_tarjeta.html";
    } else {
        window.location.href = "confirmacion.html";
    }
}

function calcularTotal(pastel, pastel2, pastel3, complementos) {
    let total = 0;
    let precioPizza = 120; // Precio base de una pizza
    let precioComplemento = 50; // Precio base de un complemento

 
    [pizza1, pizza2, pizza3].forEach(pizza => {
        if (pizza !== "Ninguna") {
            total += precioPizza;
        }
    });

    if (complementos !== "Ninguno") {
        total += precioComplemento;
    }

    return total.toFixed(2);
