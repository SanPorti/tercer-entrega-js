
const container = document.getElementById("container-carrito")

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


function mostrarProductosCarrito(carrito) {
    container.innerHTML = "";
    let totalCarrito = carrito.reduce((total,productoAgregado ) => total + productoAgregado.precio*productoAgregado.cantidad, 0);

    carrito.forEach(el => {

        const card = document.createElement("div");
        card.className = "card-carrito";

        const nombre = document.createElement("h2");
        nombre.innerText = el.nombre.toUpperCase();
        nombre.className = "nombre-carrito";

        const imagen = document.createElement("img");
        imagen.src = el.imagen;
        imagen.className = "img-carrito";

        const precio = document.createElement("p")
        precio.innerText = `$${el.precio*el.cantidad}`;
        precio.className = "precio-carrito";

        const cantidad = document.createElement("p");
        cantidad.innerText = `${el.cantidad}`;
        cantidad.className = "cantidad-carrito";


        const boton = document.createElement("button");
        boton.innerText = "Quitar de Carrito";
        boton.className = "boton-carrito";
        boton.onclick = () => quitarDelCarrito(el.codigo);
        console.log(carrito);

        const totalCompra = document.createElement("p"); 
        totalCompra.innerText = `$${totalCarrito}`;
        totalCompra.className = "total";

        card.appendChild(imagen);
        card.appendChild(nombre);
        card.appendChild(precio);
        card.appendChild(cantidad);
        card.appendChild(boton);
        
        container.appendChild(card);

    });

    const totalCompra = document.createElement("p");
    totalCompra.innerText = `$${totalCarrito}`;
    totalCompra.className = "total";
    const tituloTotalCompra = document.createElement("p"); 
    tituloTotalCompra.innerText = "total"; 
    tituloTotalCompra.className = "tituloTotal";
    container.appendChild(tituloTotalCompra);
    container.appendChild(totalCompra);

};

mostrarProductosCarrito(carrito);


function quitarDelCarrito(id) {
    container.innerHTML = "";
    let productoAgregado = carrito.find(el => el.codigo === id);
    if (productoAgregado) {
        if (productoAgregado.cantidad > 1) {
            productoAgregado.cantidad--;
        } else {
            carrito = carrito.filter(el => el.codigo !== id);
        }
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarProductosCarrito(carrito);
    }
}


