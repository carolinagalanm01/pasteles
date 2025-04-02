document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita el envío automático del formulario

        const nombre = document.getElementById("nombre").value.trim();
        const fecha = document.getElementById("fecha").value;
        const metodoEntrega = document.querySelector('input[name="entrega"]:checked');

        if (nombre === "" || fecha === "" || !metodoEntrega) {
            alert("Por favor, completa todos los campos antes de continuar.");
            return;
        }

        // Obtener valores seleccionados
        const pastel = document.getElementById("pastel").value;
        const cupcake = document.getElementById("cupcake").value;
        const donas = document.getElementById("donas").value;
        const complementos = document.getElementById("complementos").value;

        // Crear resumen del pedido
        let resumen = `📋 Resumen del Pedido:\n`;
        resumen += `👤 Nombre: ${nombre}\n`;
        resumen += `📅 Fecha: ${fecha}\n`;
        resumen += `🎂 Pastel: ${pastel}\n`;
        resumen += `🧁 Cupcake: ${cupcake}\n`;
        resumen += `🍩 Donas: ${donas}\n`;
        resumen += `🎁 Complementos: ${complementos}\n`;
        resumen += `🚚 Entrega: ${metodoEntrega.value}\n`;

        // Mostrar resumen y confirmar envío
        if (confirm(resumen + "\n¿Confirmar pedido?")) {
            alert("✅ Pedido enviado con éxito.");
            form.reset(); // Reiniciar el formulario
        }
    });
});
