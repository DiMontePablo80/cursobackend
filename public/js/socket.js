const socket = io()

const div_ListaProductos = document.getElementById("div_ListaProductos")
div_ListaProductos.innerHTML = ""

socket.on('productos', listaProductos => {
    const productos = listaProductos.map((prod) => {
        return `<div class="card" style="width: 18rem;">
        <img src="${prod.thumbnail}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">Nombre: ${prod.title}</h5>
            <p class="card-text">price: ${prod.price }</p>
            <p class="card-text">categoria:${prod.category}</p>
            <p class="card-text">stock:${prod.stock}</p>
            <a href="#" class="btn btn-primary">Ver Detalle</a>
        </div>
    </div> `
    })
    div_ListaProductos.innerHTML = productos
})

const form = document.getElementById("dataForm")
const title = document.getElementById("titleP")
const description = document.getElementById("descriptionP")
const price = document.getElementById("priceP")
const stock = document.getElementById("stockP")
const category = document.getElementById("categoryP")
const boton = documente.getElementById("botonEnviar")

boton.addEvenListener("click", (e) => {
    e.preventDefault()
    const prod = { title: title.value, description: description.value, price: price.value, stock: stock.value, category: category.value, status: "true" }
    socket.emit("newProducto", prod)
    prod = ""
})