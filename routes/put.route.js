const express = require("express")
const productManagment = require("../segundaEntrega")
const route = express.Router()


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

module.exports = route