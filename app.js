const productManagment = require("./segundaEntrega")
const express = require("express");
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get("/ping", (req, res) => {
    res.send = ("pong")
})
app.get("/productos", async(req, res) => {

    try {
        let limit = req.query.limit;
        const productos = await productManagment.traerDeApi()
        const listaProd = productManagment.productList
        limit = parseInt(limit)
        if (limit < listaProd.length && limit > 0) {
            const prodSelect = listaProd.slice(0, parseInt(limit))
            return res.send(prodSelect)
        } else {
            res.send(listaProd)
        }
    } catch (error) { res.status(500).send("ocurrio un error") }
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




app.listen(3000, () => {
    console.log("corriendo aplicacion por puerto 3000")
})