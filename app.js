//estado del carrito
let carritoVisible = false;

let botonesEliminarItem = document.getElementsByClassName("btn-eliminar");
console.log(botonesEliminarItem);
for (let i = 0; i < botonesEliminarItem.length; i++) {
  let button = botonesEliminarItem[i];
  button.addEventListener("click", eliminarItemCarrito);
}

//agregamos funcionalidad al boton sumar cantidad
let botonesSumarCantidad = document.getElementsByClassName("sumar-cantidad");
for (let boton of botonesSumarCantidad) {
  let button = boton;
  button.addEventListener("click", sumarCantidad);
}

//agregamos funcionalidad al boton restar cantidad
let botonesRestarCantidad = document.getElementsByClassName("restar-cantidad");
for (let boton of botonesRestarCantidad) {
  let button = boton;
  button.addEventListener("click", restarCantidad);
}

//agregamos funcionalidad a los botones Agregar al carrito
let botonesAgregarAlCarrito = document.getElementsByClassName("boton-item");
for (let boton of botonesAgregarAlCarrito) {
  const botonAgregar = boton;
  botonAgregar.addEventListener("click", agregarAlCarritoClick);
}

//Agregamos la funcion al boton pagar
document.getElementsByClassName('btn-pagar')[0].addEventListener('click', pagarClicked);

//eliminar el item del carrito.
function eliminarItemCarrito(event) {
  let botonclikeado = event.target;
  botonclikeado.parentElement.parentElement.remove();

  //se actualiza el total del carrito
  actualizarTotalCarrito();

  //controlamos los elementos del carrito una vez que se elimino si no hay productos ocultos el carrito
  ocultarCarrito();
}

//actualiza el total del carrito
function actualizarTotalCarrito() {
  //conetenedor del carrito
  let carritoConenedor = document.getElementsByClassName("carrito")[0];
  let carritoItems = carritoConenedor.getElementsByClassName("carrito-item");
  let total = 0;
  //console.log(carritoItems);
  //recorremos cada item del carrito para actualizar el total
  for (let item of carritoItems) {
    let carritoItem = item;
    let precioElemento = carritoItem.getElementsByClassName(
      "carrito-item-precio"
    )[0];
    //quitamos el simbolo peso y el punto del milesimo
    let precio = parseFloat(
      precioElemento.innerHTML.replace("$", "").replace(".", "")
    );
    //console.log(precio);
    let cantidadItem = item.getElementsByClassName("carrito-item-cantidad")[0];
    let cantidad = cantidadItem.value;
    //console.log(cantidad);
    total = total + precio * cantidad;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("carrito-precio-total")[0].innerHTML =
    "$" + total.toLocaleString("es") + ",00";
}

//ocultamos el carrito
function ocultarCarrito() {
  let carritoItems = document.getElementsByClassName("carrito-items")[0];
  console.log(carritoItems);
  let carrito = document.getElementsByClassName("carrito")[0];
  if (carritoItems.childElementCount === 0) {
    carrito.style.marginRight = "-100%";
    carrito.style.opacity = "0";
    carritoVisible = false;
  }

  //maximizamos el contendor
  var items = document.getElementsByClassName("contenedor-items")[0];
  items.style.width = "100%";
}

//aumentamos la cantidad en el carrito
function sumarCantidad(event) {
  let butonclickeado = event.target;
  let selector = butonclickeado.parentElement;
  let cantidadActual = selector.getElementsByClassName(
    "carrito-item-cantidad"
  )[0].value;
  cantidadActual++;
  selector.getElementsByClassName("carrito-item-cantidad")[0].value =
    cantidadActual;
  //actulizamos el total
  actualizarTotalCarrito();
}

function restarCantidad(event) {
  let butonclickeado = event.target;
  let selector = butonclickeado.parentElement;
  let cantidadActual = selector.getElementsByClassName(
    "carrito-item-cantidad"
  )[0].value;
  cantidadActual--;
  //controlamos que no sea menor a 1
  if (cantidadActual >= 1) {
    selector.getElementsByClassName("carrito-item-cantidad")[0].value =
      cantidadActual;
    //actulizamos el total
    actualizarTotalCarrito();
  }
}

function agregarAlCarritoClick(event) {
  let button = event.target;
  let item = button.parentElement;
  let titulo = item.getElementsByClassName("titulo-item")[0].innerHTML;
  let precio = item.getElementsByClassName("precio-item")[0].innerHTML;
  let imagenSrc = item.getElementsByClassName("image-item")[0].src;
  //la sgt fuccion agrega el producto al carrito;
  agregarItemAlCarrito(titulo, precio, imagenSrc);

  //Hacemos visible al carrito cuando agrega por primera vez.
  hacerVisibleCarrito();
}

function agregarItemAlCarrito(titulo, precio, imagenSrc) {
  let item = document.createElement("div");
  let itemsCarrito = document.getElementsByClassName("carrito-items")[0];
    console.log(itemsCarrito);
  //controlamos que el producto nose encuentre en el carrito
  let nombresItemsCarrito = itemsCarrito.getElementsByClassName(
    "carrito-item-titulo"
  );
  for (nombre of nombresItemsCarrito) {
    let name = nombre.innerText;
    if (name === titulo.toUpperCase()) {
      alert("El item ya se encuentra en el carrito");
      return;
    }
  }

  let itemCarritoContenido = `
  <div class="carrito-item">
   <img src="${imagenSrc}" alt="" width="80px" />
   <div class="carrito-item-detalles">
    <span class="carrito-item-titulo">${titulo}</span>
    <div class="selector-cantidad">
      <i class="fa-solid fa-minus restar-cantidad"></i>
      <input type="text" value="1" class="carrito-item-cantidad" disabled>
      <i class="fa-regular fa-plus sumar-cantidad"></i>
      <span class="carrito-item-precio">${precio}</span>
    </div>
    
  </div>
   <span class="btn-eliminar">
    <i class="fa-solid fa-trash"></i>
   </span>
</div>
    `;
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);
    //Agregamos la funcionalidad de eliminar
    item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito)
    //agregamos la funcionalidad de sumar el nuevo item
    let botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click', sumarCantidad)
    let botonesRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonesRestarCantidad.addEventListener('click', restarCantidad)
}


function pagarClicked(){
    alert('Gracias por su compra');
    //elimino todos los elementos del carrito
    let carritoItems = document.getElementsByClassName('carrito-items')[0];
    while(carritoItems.hasChildNodes()){
        carritoItems.removeChild(carritoItems.firstChild)
    }

    actualizarTotalCarrito();

    //funcion que oculta el carrito
    ocultarCarrito();
    
}

function hacerVisibleCarrito(){
    carritoVisible = true;
    let carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1'

    let items = document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '60%'
}