const express = require("express");
const routerProductos = require("./routes/productos.router")
const routerCarts = require("./routes/carts.route")

const routerSession = require('./routes/sessions')
const views = require("./routes/views.router")
const handlebars = require("express-handlebars")
const { Server } = require("socket.io");
// agregar importacion de rutas de users
const mongoose = require("mongoose");
const productsModel = require("./dao/models/products.model");
const messagesModel = require("./dao/models/messages.model");
const cartsModel = require("./dao/models/carts.model")
const cookieParser = require("cookie-parser")
const session = require('express-session')
const fileStore = require("session-file-store")
const fileStorage = fileStore(session)

mongoose.connect("mongodb://localhost:27017/ecommers")
const app = express();
const serverHttp = app.listen(8080, () => {
        console.log("corriendo aplicacion por puerto 8080")
    })
    //inicio de websocket
const io = new Server(serverHttp)
    //handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", "./views");
app.set("view engine", "handlebars");

// midlware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
//sino no me encuentra el js

app.use(cookieParser())

app.use(session({
    store: new fileStorage({
        path: './sessions',
        ttl: 100,
        retries: 0
    }),
    secret: "secretCode",
    resave: true,
    saveUninitialized: true
}))

//routes
app.use("/api/products", routerProductos)
app.use("/api/carts", routerCarts)
app.use("/api/sessions", routerSession)
app.use("/", views)


let lista_Productos
io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado')
    let listProductos = productsModel.find().lean()
        .then((res) => {
            lista_Productos = res
            io.emit("productos", lista_Productos)
        })
        .catch((error) => {
            console.log("ocurrio un error", error)
        })

    socket.on("newProduct", (prod) => {
        const nuevoProd = {
            title: prod.title,
            description: prod.description,
            code: prod.code,
            price: prod.price,
            status: "true",
            thumbnail: prod.thumbnail,
            stock: prod.stock,
            category: prod.category
        }
        productsModel.create(nuevoProd)
        io.emit("productos", lista_Productos)



    })
})
let messages = [];
let user
io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado')
        // chat_socket
    socket.on('message', (data) => {
        messages.push(data)
        io.emit('messageLogs', messages)
        messagesModel.create({
            email: user,
            messages: messages
        })
    })

    socket.on('login', data => {
        user = data
        socket.emit('messageLogs', messages)
        socket.broadcast.emit('register', data)

    })

})