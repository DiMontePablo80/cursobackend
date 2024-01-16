const express = require("express")
const productManagment = require("../segundaEntrega")
const route = express.Router()

route.delete("/:id", async(req, res) => {
    const product = await productManagment.productInList(req.params.id)
    if (!product) {
        res.status(404).send("producto no encontrado")
    } else {
        await productManagment.deleteProduct(req.params.id)
        res.status(200).send("el producto fue eliminado correctamente")
    }

})

module.exports = route