const socket = io()

socket.on('productos', listaProductos => {
    const div_ListaProductos = document.getElementById("div_ListaProductos")
    div_ListaProductos.innerHTML = ""
    const productos = listaProductos.map((prod) => {
        return `<div class="card" style="width: 18rem;">
        <img src="${prod.thumbnail}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">Nombre: ${prod.title}</h5>
            <p class="card-text">price: ${prod.price}</p>
            <p class="card-text">categoria:${prod.category}</p>
            <p class="card-text">stock:${prod.stock}</p>
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
    const codProd = document.getElementById("codProd").value
    const price = document.getElementById("priceP").value
    const thumbnail = document.getElementById("thumbnail").value
    const stock = document.getElementById("stockP").value
    const category = document.getElementById("categoryP").value
    socket.emit("newProduct", {
        title: title,
        description: description,
        code: codProd,
        price: price,
        thumbnail: thumbnail,
        stock: stock,
        category: category
    })
})