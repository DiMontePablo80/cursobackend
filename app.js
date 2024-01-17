const express = require("express");

const routerProductos = require("./routes/productos.router")
const routerCarts = require("./routes/carts.route")

const app = express();

// midlware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/products/GET", routerProductos)
app.use("/api/products/POST", routerProductos)
app.use("/api/products/PUT", routerProductos)
app.use("/api/products/DELETE", routerProductos)
app.use("/api/carts/GET", routerCarts)
app.use("/api/carts/POST", routerCarts)
app.use("/POST", routerCarts)

app.listen(8080, () => {
    console.log("corriendo aplicacion por puerto 8080")
})