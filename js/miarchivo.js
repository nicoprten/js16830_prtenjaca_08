//DESAFÍO DOM CLASE 08

class Productos{
    constructor(nombre, precio, stock){
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }
}

let div_productos = document.getElementById('productos');
let cantidad_productos = document.getElementById('cantidad_productos');

let productosJSON;
//console.log(localStorage.getItem('productos'));
console.log(JSON.parse(localStorage.getItem('productos')));
//ESTUVE MUCHO TIEMPO VIENDO COMO HACER PARA QUE TRAER LO GUARDADO EN EL LOCALSTORAGE, SE ME PISABAN LAS VARIABLES AL TOCAR F5 POR QUE LAS VOLVIA A DECLARAR, LES GUARDE EL VALOR DEL LOCALSTORAGE, SI NO HAY NADA EL VALOR ES NULL, EN ESE CASO SI DECLARAR LAS VARIALBES.
let productos_guardados = JSON.parse(localStorage.getItem('productos'));
let listado_productos = JSON.parse(localStorage.getItem('productos'));;
if(productos_guardados == null){
    listado_productos = [];
    cantidad_productos.innerHTML = 0;
}else{
    console.log(listado_productos);
    cantidad_productos.innerHTML = productos_guardados.length;
    for(producto of productos_guardados){
        div_productos.innerHTML += `<ul class='productos__lista'>
                                            <li class='productos__item'>NOMBRE: ${producto.nombre}</li>
                                            <li class='productos__item'>PRECIO: ${producto.precio}</li>
                                            <li class='productos__item'>STOCK: ${producto.stock}</li>
                                       </ul>`
    }
}

function agregarProducto(){
        let nombre = document.getElementById('nombre').value;
        let precio = document.getElementById('precio').value;
        let stock = document.getElementById('stock').value;
        let producto = new Productos(nombre, precio, stock);
        listado_productos.push(producto);
    
        productosJSON = JSON.stringify(listado_productos);
        console.log(productosJSON);
        div_productos.innerHTML += `<ul class='productos__lista'>
                                        <li class='productos__item'>NOMBRE: ${nombre}</li>
                                        <li class='productos__item'>PRECIO: ${precio}</li>
                                        <li class='productos__item'>STOCK: ${stock}</li>
                                   </ul>`
    
        localStorage.setItem('productos', productosJSON);
        productos_guardados = JSON.parse(localStorage.getItem('productos'));
        console.log(productos_guardados);
        cantidad_productos.innerHTML = productos_guardados.length;
        console.log(productos_guardados.length);

}

//FALTA AGREGAR UN BOTON PARA SACAR EL PRODUCTO DE LA LISTA Y DEL LOCALSTORAGE