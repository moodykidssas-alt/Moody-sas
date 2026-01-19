let canasta = [];

function agregarProducto(nombre) {
    canasta.push(nombre);
    mostrarCanasta();
}

function mostrarCanasta() {
    const lista = document.getElementById("lista-canasta");
    lista.innerHTML = "";

    canasta.forEach((producto, index) => {
        const li = document.createElement("li");
        li.textContent = producto;
        lista.appendChild(li);
    });
}

function enviarWhatsApp() {
    if (canasta.length === 0) {
        alert("La canasta está vacía");
        return;
    }

    let mensaje = "Hola, quiero hacer un pedido mayorista:%0A";
    canasta.forEach(p => {
        mensaje += "- " + p + "%0A";
    });

    const telefono = "57TU_NUMERO_AQUI"; // ejemplo: 573001234567
    const url = `https://wa.me/${telefono}?text=${mensaje}`;
    window.open(url, "_blank");
}

function filtrarCategoria(categoria) {
    const productos = document.querySelectorAll(".producto");

    productos.forEach(producto => {
        if (categoria === "todos" || producto.classList.contains(categoria)) {
            producto.style.display = "block";
        } else {
            producto.style.display = "none";
        }
    });
}
