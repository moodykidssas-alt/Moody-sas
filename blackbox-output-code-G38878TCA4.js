// Array de productos: Fácil de escalar (agrega más objetos aquí)
const productos = [
    // JUGUETERÍA
    { id: 1, nombre: "Juguete Sensorial 1", categoria: "JUGUETERÍA", subcategoria: "Sensorial", imagen: "assets/images/producto1.jpg" },
    { id: 2, nombre: "Juguete Motricidad 1", categoria: "JUGUETERÍA", subcategoria: "Motricidad", imagen: "assets/images/producto2.jpg" },
    { id: 3, nombre: "Juguete Montessori 1", categoria: "JUGUETERÍA", subcategoria: "Montessori", imagen: "assets/images/producto3.jpg" },
    // ALIMENTACIÓN
    { id: 4, nombre: "Biberón 1", categoria: "ALIMENTACIÓN", subcategoria: "Biberones", imagen: "assets/images/producto4.jpg" },
    { id: 5, nombre: "Plato 1", categoria: "ALIMENTACIÓN", subcategoria: "Platos", imagen: "assets/images/producto5.jpg" },
    { id: 6, nombre: "Cubiertos 1", categoria: "ALIMENTACIÓN", subcategoria: "Cubiertos", imagen: "assets/images/producto6.jpg" },
    { id: 7, nombre: "Babero 1", categoria: "ALIMENTACIÓN", subcategoria: "Baberos", imagen: "assets/images/producto7.jpg" },
    // TEXTIL
    { id: 8, nombre: "Body 1", categoria: "TEXTIL", subcategoria: "Bodies", imagen: "assets/images/producto8.jpg" },
    { id: 9, nombre: "Pijama 1", categoria: "TEXTIL", subcategoria: "Pijamas", imagen: "assets/images/producto9.jpg" },
    { id: 10, nombre: "Manta 1", categoria: "TEXTIL", subcategoria: "Mantas", imagen: "assets/images/producto10.jpg" },
    // ACCESORIOS
    { id: 11, nombre: "Pañalera 1", categoria: "ACCESORIOS", subcategoria: "Pañaleras", imagen: "assets/images/producto11.jpg" },
    { id: 12, nombre: "Cambiador 1", categoria: "ACCESORIOS", subcategoria: "Cambiadores", imagen: "assets/images/producto12.jpg" },
    { id: 13, nombre: "Organizador 1", categoria: "ACCESORIOS", subcategoria: "Organizadores", imagen: "assets/images/producto13.jpg" },
    // KITS
    { id: 14, nombre: "Kit Recién Nacido", categoria: "KITS", subcategoria: "Kit recién nacido", imagen: "assets/images/producto14.jpg" },
    { id: 15, nombre: "Kit Alimentación", categoria: "KITS", subcategoria: "Kit alimentación", imagen: "assets/images/producto15.jpg" },
    { id: 16, nombre: "Kit Motricidad", categoria: "KITS", subcategoria: "Kit motricidad", imagen: "assets/images/producto16.jpg" },
];

// Categorías principales
const categorias = ["JUGUETERÍA", "ALIMENTACIÓN", "TEXTIL", "ACCESORIOS", "KITS"];

// Elementos DOM
const homeSection = document.getElementById('home');
const catalogoSection = document.getElementById('catalogo');
const canastaSection = document.getElementById('canasta');
const categoriasDiv = document.getElementById('categorias');
const productosDiv = document.getElementById('productos');
const canastaLista = document.getElementById('canasta-lista');
const canastaCount = document.getElementById('canasta-count');
const enviarWhatsappBtn = document.getElementById('enviar-whatsapp-btn');

// Navegación
document.getElementById('home-btn').addEventListener('click', () => showSection('home'));
document.getElementById('catalogo-btn').addEventListener('click', () => showSection('catalogo'));
document.getElementById('canasta-btn').addEventListener('click', () => showSection('canasta'));
document.getElementById('ver-catalogo-btn').addEventListener('click', () => showSection('catalogo'));

function showSection(sectionId) {
    [homeSection, catalogoSection, canastaSection].forEach(sec => sec.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
}

// Inicializar catálogo
function initCatalogo() {
    // Generar botones de categorías
    categorias.forEach(cat => {
        const btn = document.createElement('button');
        btn.textContent = cat;
        btn.classList.add('categoria-btn');
        btn.addEventListener('click', () => filtrarProductos(cat));
        categoriasDiv.appendChild(btn);
    });
    // Mostrar todos los productos inicialmente
    mostrarProductos(productos);
}

function filtrarProductos(categoria) {
    const filtered = productos.filter(p => p.categoria === categoria);
    mostrarProductos(filtered);
    // Resaltar categoría activa
    document.querySelectorAll('.categoria-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

function mostrarProductos(prods) {
    productosDiv.innerHTML = '';
    prods.forEach(prod => {
        const div = document.createElement('div');
        div.classList.add('producto');
        div.innerHTML = `
            <img src="${prod.imagen}" alt="${prod.nombre}">
            <h3>${prod.nombre}</h3>
            <p>Categoría: ${prod.subcategoria}</p>
            <input type="number" min="1" value="1" id="qty-${prod.id}">
            <button onclick="agregarACanasta(${prod.id})">Agregar a la Canasta</button>
        `;
        productosDiv.appendChild(div);
    });
}

// Canasta con localStorage
let canasta = JSON.parse(localStorage.getItem('canasta')) || [];

function actualizarCanasta() {
    localStorage.setItem('canasta', JSON.stringify(canasta));
    canastaCount.textContent = canasta.length;
    renderizarCanasta();
}

function agregarACanasta(id) {
    const qty = parseInt(document.getElementById(`qty-${id}`).value);
    const prod = productos.find(p => p.id === id);
    const existing = canasta.find(item => item.id === id);
    if (existing) {
        existing.qty += qty;
    } else {
        canasta.push({ ...prod, qty });
    }
    actualizarCanasta();
}

function renderizarCanasta() {
    canastaLista.innerHTML = '';
    canasta.forEach((item, index) => {
        const div = document.createElement('div');
        div.classList.add('canasta-item');
        div.innerHTML = `
            <span>${item.nombre} (Cant: <input type="number" min="1" value="${item.qty}" onchange="cambiarQty(${index}, this.value)">)</span>
            <button onclick="eliminarDeCanasta(${index})">Eliminar</button>
        `;
        canastaLista.appendChild(div);
    });
}

function cambiarQty(index, qty) {
    canasta[index].qty = parseInt(qty);
    actualizarCanasta();
}

function eliminarDeCanasta(index) {
    canasta.splice(index, 1);
    actualizarCanasta();
}

// Enviar a WhatsApp
enviarWhatsappBtn.addEventListener('click', () => {
    if (canasta.length === 0) {
        alert('La canasta está vacía.');
        return;
    }
    let mensaje = 'Hola, soy un cliente mayorista.\nQuiero cotizar el siguiente pedido:\n\n';
    canasta.forEach(item => {
        mensaje += `- ${item.nombre} | Cantidad: ${item.qty}\n`;
    });
    mensaje += '\nGracias.';
    const url = `https://wa.link/jpwkfu?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
});

// Inicializar
initCatalogo();
actualizarCanasta();