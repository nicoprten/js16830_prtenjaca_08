//DESAFÍO DOM CLASE 08

class Productos{
    constructor(id, nombre, precio, stock){
        this.id = id; 
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }
}

let div_productos = document.getElementById('productos');
let cantidad_productos = document.getElementById('cantidad_productos');

let productosJSON;
//ESTUVE MUCHO TIEMPO VIENDO COMO HACER PARA TRAER LO GUARDADO EN EL LOCALSTORAGE, SE ME PISABAN LAS VARIABLES AL TOCAR F5 POR QUE LAS VOLVIA A DECLARAR, LES GUARDE EL VALOR DEL LOCALSTORAGE, SI NO HAY NADA EL VALOR ES NULL, EN ESE CASO SI DECLARAR LAS VARIALBES.
let productos_guardados = JSON.parse(localStorage.getItem('productos'));
let listado_productos = JSON.parse(localStorage.getItem('productos'));;
if(productos_guardados == null){
    listado_productos = [];
    cantidad_productos.innerHTML = 0;
}else{
    console.log(listado_productos);
    cantidad_productos.innerHTML = productos_guardados.length;
    for(producto of productos_guardados){
        div_productos.innerHTML += `<ul id='${producto.id}' class='productos__lista'>
                                            <li class='productos__item'>NOMBRE: ${producto.nombre}</li>
                                            <li class='productos__item'>PRECIO: ${producto.precio}</li>
                                            <li class='productos__item'>STOCK: ${producto.stock}</li>
                                            <li class='productos__item'><button class='productos__button' onclick='borrarProducto(${producto.id})'>BORRAR</button></li>
                                       </ul>`
    }
}
function agregarProducto(){
        let nombre = document.getElementById('nombre').value;
        let precio = document.getElementById('precio').value;
        let stock = document.getElementById('stock').value;
        let producto = new Productos(0 ,nombre, precio, stock);
        listado_productos.push(producto);
        console.log(listado_productos);
        
        let cantidad = listado_productos.length;
        cantidad_productos.innerHTML = cantidad;
        producto.id = cantidad;
        productosJSON = JSON.stringify(listado_productos);

        div_productos.innerHTML += `<ul id='${producto.id}' class='productos__lista'>
                                        <li class='productos__item'>NOMBRE: ${nombre}</li>
                                        <li class='productos__item'>PRECIO: ${precio}</li>
                                        <li class='productos__item'>STOCK: ${stock}</li>
                                        <li class='productos__item'><button class='productos__button' onclick='borrarProducto(${producto.id})'>BORRAR</button></li>
                                   </ul>`
        
        localStorage.setItem('productos', productosJSON);
        productos_guardados = JSON.parse(localStorage.getItem('productos'));
        console.log(productos_guardados);
        
        
}

//BORRAR PRODUCTO DEL LOCALSTORAGE Y DEL HTML
function borrarProducto(id){
    let idBorrable = document.getElementById(id);
    idBorrable.remove();
    let index = listado_productos.indexOf(idBorrable);
    console.log(listado_productos);
    console.log(listado_productos[id - 1]);
    listado_productos.splice(index, 1);
    console.log(listado_productos);
    cantidad_productos.innerHTML -= 1;
    let productosJSON = JSON.stringify(listado_productos);
    localStorage.setItem('productos', productosJSON);
}

//VALIDAR TIPO DE DATO NUMERICO Y MAYOR A 0 INPUT DE PRECIO Y STOCK
let inputPrecio = document.getElementById('precio').addEventListener('input', validarPrecioStock);
let inputStock = document.getElementById('stock').addEventListener('input', validarPrecioStock);

function validarPrecioStock(e){
    console.log(typeof e.target.value);
    let numero = parseInt(e.target.value);
    console.log(numero);

    if(typeof numero == 'number' && numero > 0){
        e.target.classList.add('validado');
        e.target.classList.remove('invalidado');
        console.log('hola');
    }else{
        e.target.classList.add('invalidado')
        e.target.classList.remove('validado')
    }
}