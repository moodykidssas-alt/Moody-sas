function enviarWhatsApp() {
    if (canasta.length === 0) {
        alert("La canasta está vacía");
        return;
    }

    let mensaje = "Hola 👋%0AQuiero cotizar el siguiente pedido mayorista:%0A%0A";
    canasta.forEach(p => {
        mensaje += "• " + p + "%0A";
    });

    mensaje += "%0AQuedo atento(a). Gracias.";

    const telefono = "57TU_NUMERO_AQUI";
    const url = `https://wa.me/${telefono}?text=${mensaje}`;
    window.open(url, "_blank");
}

