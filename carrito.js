// Añadir producto al carrito
class Carrito {
    comprarProducto (e) {
        e.preventDefault();
        if (e.target.classList.contains ('agregar-carrito')){
            const producto = e.target.parentElement.parentElement;
            this.leerDatosProducto (producto);
        }
    }

    leerDatosProducto(producto){
        const infoProducto = {
            imagen : producto.querySelector ('img').src,
            titulo : producto.querySelector ('h4').textContent,
            precio : producto.querySelector ('.precio span').textContent,
            id : producto.querySelector ('a').getAttribute ('data-id'),
            cantidad : 1
        }

        let productosLS;
        productosLS = this.obtenerProductosStorage();
        productosLS.forEach (function (productoLS){
            if (productoLS.id === infoProducto.id){
                productosLS = productoLS.id;
            }
        });

        if (productosLS === infoProducto.id){
            alert ('Este producto ya está en el carrito');
        } else {
            this.insertarCarrito (infoProducto);
        }
    }

    insertarCarrito (producto) {
        const row = document.createElement ("tr");
        row.innerHTML = `
        <td>
            <img src = "${producto.imagen}" width = 100>
        </td>
        <td>${producto.titulo}</td>
        <td>${producto.precio}</td>
        <td>
            <a href="#" class = "borrar-producto fas fa-times-circle" data-id = "${producto.id}"></a>
        </td>`;
        listaProductos.appendChild (row);
        this.guardarProductosStorage (producto); 
    }

    eliminarProducto (e) {
        e.preventDefault();
        let producto, productoID;
        if (e.target.classList.contains ('borrar-producto')) {
            e.target.parentElement.parentElement.remove();
            producto = e.target.parentElement.parentElement;
            productoID = producto.querySelector ('a').getAttribute ('data-id');
        }
        this.eliminarProductoStorage(productoID);
    }

    vaciarCarrito (e){
        e.preventDefault();
        while (listaProductos.firstChild){
            listaProductos.removeChild (listaProductos.firstChild);
        }
        this.vaciarLocalStorage();
        return false;
    }

    guardarProductosStorage (producto){
        let productos;
        productos = this.obtenerProductosStorage();
        productos.push (producto);
        localStorage.setItem ('productos', JSON.stringify(productos));
    }

    obtenerProductosStorage(){
        let productoLS;

        if (localStorage.getItem('productos') === null){
            productoLS = [];
        } else {
            productoLS = JSON.parse (localStorage.getItem ('productos'));
        }
        return productoLS;
    }

    eliminarProductoStorage (productoID){
        let productosLS;
        productosLS = this.obtenerProductosStorage();
        productosLS.forEach (function (productoLS, index){
            if (productoLS.id === productoID){
                productosLS.splice (index, 1);
            }
        });

        localStorage.setItem ('productos', JSON.stringify (productosLS)); 
    }

    leerLocalStorage(){
        let productosLS;
        productosLS = this.obtenerProductosStorage();
        productosLS.forEach (function (producto){
            const row = document.createElement ("tr");
        row.innerHTML = `
        <td>
            <img src = "${producto.imagen}" width = 100>
        </td>
        <td>${producto.titulo}</td>
        <td>${producto.precio}</td>
        <td>
            <a href="#" class = "borrar-producto fas fa-times-circle" data-id = "${producto.id}"></a>
        </td>`;
        listaProductos.appendChild (row);    
        });
    }

    vaciarLocalStorage (){
        localStorage.clear();
    }

}