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
route.post("/", async(req, res) => {

    try {
        let listaProductos = await productManagment.getProducts()
        const newProducto = req.body
        if (newProducto) {
            listaProductos.push(newProducto)
            lista = productManagment.reordenarID(listaProductos)
            const fs = require('fs')
            lista = productManagment.reordenarID(lista)
            let jsonData = JSON.stringify(lista)
            fs.promises.writeFile('./data/listaGuardada.json', jsonData)
                .then(() => console.log("se guardo de forma exitosa"))
                .catch((error) => console.log(error))
            res.status(201).send(`el producto ${req.body.title} se agrego correctamente`)
        } else {
            res.status(400).send("ocurrio un error")
        }
    } catch (error) {
        res.status(500).send("ocurrio un error al cargar producto")

    }
})
route.put("/:id", async(req, res) => {

    try {
        let id = req.params.id;
        let cuerpo = req.body
        let productoId = await productManagment.productInList(id)
        if (!productoId) {
            res.status(404).send("el producto no se encuentra en la lista")
        } else if (!cuerpo) { //gregar justificaciones
            res.status(400).send("El contenido esta vacio")
        } else {
            const productUpdate = await productManagment.buscarYActualizar(id, cuerpo)
            res.send("el producto fue actualizado correctamente")
        }
    } catch (error) { res.send("se produjo error al actualizar") }

});
route.delete("/:id", async(req, res) => {
    const product = await productManagment.productInList(req.params.id)
    if (!product) {
        res.status(404).send("producto no encontrado")
    } else {
        await productManagment.deleteProduct(req.params.id)
        res.status(200).send("el producto fue eliminado correctamente")
    }

})

module.exports = route;