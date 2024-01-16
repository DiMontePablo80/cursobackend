const express = require("express")
const carts = require("../carts")

const route = express.Router()



route.get("/:id", async(req, res) => {
    try {

        let id = req.params.id;
        let carritoId = await carts.getCartById(id)
        if (carritoId == null) {
            res.status(404).send("el producto no se encuentra en la lista")
        } else {
            res.send(carritoId)
        }
    } catch (error) {
        res.status(500).send("ah ocurrido un error")

    }

});
route.post("/", async(req, res) => {
    if (!req.body) {
        res.status(400).send("ocurrio un error")
    } else {
        carts.generarCart(req.body)
        carts.guardarCarts()
        res.status(200).send("el carrito se guardo correctamente")
    }

})
route.post("/:cid/product/:pid", async(req, res) => {
    try {
        const cardId = parseInt(req.params.cid)
        const productId = parseInt(req.params.pid)
        let quantity = parseInt(req.body)

        let cart = await carts.cartInList(cardId)
        if (!cart) {
            res.status(404).send("carrito no existe")
            console.log(cart)
        } else {
            await carts.agregarProductsAlCarrito(cardId, productId, quantity)
            res.status(200).send("el producto se agrego al carrito")
        }
    } catch (error) {
        res.send("ocurrio un error al guardar el producto en el carrito")
    }


})
module.exports = route