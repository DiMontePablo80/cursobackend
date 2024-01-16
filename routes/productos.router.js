const express = require("express")
const route = express.Router()
const productManagment = require("../segundaEntrega")


// reglas de products

route.get("/", async(req, res) => {

    try {
        let limit = req.query.limit;
        const productos = await productManagment.getProducts()
        limit = parseInt(limit)
        if (limit < productos.length && limit > 0) {
            const prodSelect = productos.slice(0, parseInt(limit))
            return res.status(200).send(prodSelect)
        } else {
            res.send(productos)
        }
    } catch (error) { res.status(500).send("ocurrio un error") }
})


route.get("/:id", async(req, res) => {
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

module.exports = route;