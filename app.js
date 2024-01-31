const express = require("express");
const routerProductos = require("./routes/productos.router")
const routerCarts = require("./routes/carts.route")
const views = require("./routes/views.router")
const handlebars = require("express-handlebars")
const { Server, BroadcastOperator } = require("socket.io");
const { SocketAddress } = require("net");
const app = express();
const serverHttp = app.listen(8080, () => {
        console.log("corriendo aplicacion por puerto 8080")
    }) //inicio de websocket
const io = new Server(serverHttp)
    //handlebars
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
let lista_Productos
io.on('connection', () => {
    console.log('Nuevo cliente conectado')
    const productManagment = require("./segundaEntrega")
    let listProductos = productManagment.getProducts()
        .then((res) => {
            lista_Productos = res
            io.emit("productos", lista_Productos)
        })
        .catch((error) => {
            console.log("ocurrio un error", error)
        })
    io.on("listaActualizada", (lista) => {
        console.log(lista)
    })
})