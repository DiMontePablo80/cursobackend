const socket = io()
let lista_Prod


socket.on('productos', listaProductos => {
    const div_ListaProductos = document.getElementById("div_ListaProductos")
    div_ListaProductos.innerHTML = ""
    lista_Prod = listaProductos
    const productos = listaProductos.map((prod) => {
        return `<div class="card" style="width: 18rem;">
        <img src="${prod.thumbnail}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">Nombre: ${prod.title}</h5>
            <p class="card-text">price: ${prod.price}</p>
            <p class="card-text">categoria:${prod.category}</p>
            <p class="card-text">stock:${prod.stock}</p>
            <a href="#" class="btn btn-primary">Ver Detalle</a>
        </div>
    </div> `
    })

    div_ListaProductos.innerHTML = productos
})

const dataForm = document.getElementById("dataForm")
dataForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const title = document.getElementById("titleP").value
    const description = document.getElementById("descriptionP").value
    const price = document.getElementById("priceP").value
    const stock = document.getElementById("stockP").value
    const category = document.getElementById("categoryP").value
    lista_Prod.push({
        id: lista_Prod.length,
        thumbnail: "none",
        title: title,
        description: description,
        price: price,
        stock: stock,
        category: category
    })

    const productos = lista_Prod.map((prod) => {
        const div_ListaProductos = document.getElementById("div_ListaProductos")
        div_ListaProductos.innerHTML = ""
        return `<div class="card" style="width: 18rem;">
            <img src="${prod.thumbnail}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Nombre: ${prod.title}</h5>
                <p class="card-text">price: ${prod.price}</p>
                <p class="card-text">categoria:${prod.category}</p>
                <p class="card-text">stock:${prod.stock}</p>
                <a href="#" class="btn btn-primary">Ver Detalle</a>
            </div>
        </div> `
    })
    div_ListaProductos.innerHTML = productos
    socket.emit('listaActualizada', lista_Prod)
})