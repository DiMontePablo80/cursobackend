const express = require("express");
const routerProductos = require("./routes/productos.router")
const routerCarts = require("./routes/carts.route")
const views = require("./routes/views.router")
const handlebars = require("express-handlebars")
const { Server } = require("socket.io");
const { promises } = require("dns");
const { resolve } = require("path");
const { rejects } = require("assert");
const app = express();
const serverHttp = app.listen(8080, () => {
        console.log("corriendo aplicacion por puerto 8080")
    }) //inicio de websocket
const serverSocket = new Server(serverHttp)
    //andlebars
app.engine("handlebars", handlebars.engine());
app.set("views", "./views");
app.set("view engine", "handlebars");

// midlware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public")); //sino no me encuentra el js

//routes
app.use("/api/products/GET", routerProductos)
app.use("/api/products/POST", routerProductos)
app.use("/api/products/PUT", routerProductos)
app.use("/api/products/DELETE", routerProductos)
app.use("/api/carts/GET", routerCarts)
app.use("/api/carts/POST", routerCarts)
app.use("/POST", routerCarts)
app.use("/", views)

serverSocket.on('connection', () => {
    console.log('Nuevo cliente conectado')
    const productManagment = require("./segundaEntrega")
    const listProductos = productManagment.getProducts()
        .then((res) => {
            serverSocket.emit("productos", res)
        })
        .catch((error) => console.log(error))

    serverSocket.on("newProducto", producto => {
        let listaProductos = productManagment.getProducts()
            .then(() => listaProductos.push(producto))
            .catch((error) => console.log(error))

        listaProductos = productManagment.reordenarID(listaProductos)
        const fs = require('fs')
        lista = productManagment.reordenarID(listaProductos)
        serverSocket.emit("productos ", listaActualizada)

        let jsonData = JSON.stringify(lista)
        fs.promises.writeFile('./data/listaGuardada.json', jsonData)
            .then(() => console.log("se guardo la información correctamente"))
            .catch((error) => console.log(error))
    })

})