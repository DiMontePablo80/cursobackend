const express = require("express");
const routerProductos = require("./routes/productos.router")
const routerPost = require("./routes/post.router")
const routerPut = require("./routes/put.route")
const routerCarts = require("./routes/carts.route")
const routerDelete = require("./routes/delete.route")
const app = express();

// midlware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/products/GET", routerProductos)
app.use("/api/products/POST", routerPost)
app.use("/api/products/PUT", routerPut)
app.use("/api/products/DELETE", routerDelete)
app.use("/api/carts/GET", routerCarts)
app.use("/api/carts/POST", routerCarts)
app.use("/POST", routerCarts)

app.listen(8080, () => {
    console.log("corriendo aplicacion por puerto 8080")
})