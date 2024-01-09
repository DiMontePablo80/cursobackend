const productManagment = require("./segundaEntrega")
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));

app.get("/ping", (req, res) => {
    res.send = ("pong")
})
app.get("/productos", (req, res) => {
    let productos = productManagment.productList
    res.send(productos)

})

app.get("/productos/:id", async(req, res) => {
    try {
        let id = req.params.id;
        let productoId = await productManagment.getProductsById(id)
        if (productoId == null) {
            res.status(404).send("el producto no se encuentra en la lista")
        } else {
            res.send(productoId)
        }
    } catch (error) {
        res.status(500).send("ah ocurrido un error")

    }
});
app.get("/productos", (req, res) => {
    let limit = req.query.limit
    const productos = productManagment.productList
    if (limit < length.productList && limit > 0 && limit === Number) {
        const prodSelect = productos.slice(0, parseInt(limit))
        return res.send(prodSelect)
    } else {
        return res.send(productos)
    }

})




app.listen(3000, () => {
    console.log("corriendo aplicacion por puerto 3000")
})