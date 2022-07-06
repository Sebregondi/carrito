const carro = new Carrito ();
const carrito = document.getElementById ('carrito');
const productos = document.getElementById ('lista-productos');
const listaProductos = document.querySelector ('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

cargarEventos();

function cargarEventos(){
    productos.addEventListener ('click', (e) => {carro.comprarProducto(e)});

    productos.addEventListener ('click', (e) => {
        Toastify({
            text: "Item agregado",
            duration: 3000,
            position: "center"
            }).showToast()
        })

    carrito.addEventListener ('click', (e) => {carro.eliminarProducto(e)});

    carrito.addEventListener ('click', (e) => {
        Toastify({
            text: "Item eliminado",
            duration: 3000,
            position: "center"
            }).showToast()
        })

    vaciarCarritoBtn.addEventListener ('click', (e) => {carro.vaciarCarrito (e)});

    document.addEventListener('DOMContentLoaded', carro.leerLocalStorage());
}