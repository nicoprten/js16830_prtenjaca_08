//PRE-ENTREGA 02 - AGREGUE BOTON PARA BORRAR TODO EL STOCK DE PRODUCTOS.

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
habilitarBorrarTodo();
if(productos_guardados == null){
    productos_guardados = [];
    cantidad_productos.innerHTML = 0;
}else{
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
        productos_guardados.push(producto);
        console.log(productos_guardados);
        habilitarBorrarTodo();
        let cantidad = productos_guardados.length;
        cantidad_productos.innerHTML = cantidad;
        producto.id = cantidad;
        productosJSON = JSON.stringify(productos_guardados);

        div_productos.innerHTML += `<ul id='${producto.id}' class='productos__lista'>
                                        <li class='productos__item'>NOMBRE: ${nombre}</li>
                                        <li class='productos__item'>PRECIO: ${precio}</li>
                                        <li class='productos__item'>STOCK: ${stock}</li>
                                        <li class='productos__item'><button class='productos__button' onclick='borrarProducto(${producto.id})'>BORRAR</button></li>
                                   </ul>`
        
        localStorage.setItem('productos', productosJSON);     
        
}

// BORRAR PRODUCTO DEL LOCALSTORAGE Y DEL HTML
// DATO: TRATE DE BORRARLOS CON SPLICE, RESTANDOLE 1 AL ID SACABA EL INDICE, PERO SE ROMPIA AL BORRAR VARIOS ELEMENTOS Y ROMPER EL ORDEN DE PRODUCTO.ID
// POR ESO PASE A USAR EL METODO .FILTER
function borrarProducto(id){
    
    let idBorrable = document.getElementById(id);
    idBorrable.remove();
    // console.log(idBorrable.id);
    // let index = id - 1;
    // console.log(index);
    productos_guardados = productos_guardados.filter(producto => producto.id != id);
    habilitarBorrarTodo();
    // productos_guardados.splice(index, 1);
    cantidad_productos.innerHTML -= 1;
    let productosJSON = JSON.stringify(productos_guardados);
    localStorage.setItem('productos', productosJSON);
}

//VALIDAR TIPO DE DATO NUMERICO Y MAYOR A 0 INPUT DE PRECIO Y STOCK
let inputPrecio = document.getElementById('precio').addEventListener('input', validarPrecioStock);
let inputStock = document.getElementById('stock').addEventListener('input', validarPrecioStock);

function validarPrecioStock(e){
    let numero = parseInt(e.target.value);

    if(typeof numero == 'number' && numero > 0){
        e.target.classList.add('validado');
        e.target.classList.remove('invalidado');
    }else{
        e.target.classList.add('invalidado')
        e.target.classList.remove('validado')
    }
}
// FUNCIÓN PARA HABILITAR O DEHABILITAR BOTON DE BORRAR TODOS LOS PRODUCTOS
function habilitarBorrarTodo(){
    let boton_borrar_todo = document.getElementById('borrarTodo');
    if (productos_guardados == null){
        boton_borrar_todo.className = 'productos__button inhabilitado';
    }else if(productos_guardados.length == 0){
        boton_borrar_todo.className = 'productos__button inhabilitado';
    }else{
        boton_borrar_todo.className = 'productos__button';
    }
}

//FUNCION PARA BORRAR TODO EL STOCK DE PRODUCTOS AGREGADOS
const borrarTodo = (array) => {
    console.log('Borrando..');
    const confirmando = confirm('¿Estás seguro de querer borrar todo?');
    if(confirmando){
        array.length = 0; //PARA BORRAR UN ARRAY (NO SÉ SI ES EL MÉTODO ADECUADO)
        console.log(array);
        localStorage.clear();
        div_productos.innerHTML = `<p class='productos__p'>PRODUCTOS ELIMINADOS</p>`;
        cantidad_productos.innerHTML = 0;
    }else{
        console.log('Cancelando..');
    }
    habilitarBorrarTodo();
}