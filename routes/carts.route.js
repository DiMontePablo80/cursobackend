const express = require("express")
const carts = require("../carts")
const cartsModel = require("../dao/models/carts.model")
const route = express.Router()
const { paginateSubDocs } = require("mongoose-paginate-v2")

route.get("/", async(req, res) => {
    let page = parseInt(req.query.page, 10) || 1
    let limit = parseInt(req.query.limit, 10) || 5
    try {
        const carts = await cartsModel.find({}, {
            page,
            limit,
            lean: true
        })
        res.status(200).send({
            status: 200,
            result: "success",
            payload: carts
        })

        carts.prevLink = products.hasPrevPage ? `http://localhost:8080/api/carts?page=${carts.prevPage}` : ''
        carts.nextLink = products.hasNextPage ? `http://localhost:8080/api/carts?page=${carts.nextPage}` : ''
        carts.isValid = !(page <= 0 || page > products.totalPages)
        res.render("carts", carts)
        console.log(carts)
    } catch (error) {
        console.log("Cannot get users from Mongo: " + error)
        res.status(500).send({
            status: 500,
            result: "error",
            error: "Error getting data from DB"

        })

    }
})

route.get("/:cid", async(req, res) => {

    let { cid } = req.params;
    try {
        let carritoId = await cartsModel.findById({ _id: cid })
        res.status(200).send({
            status: 200,
            result: "success",
            payload: carritoId
        })

    } catch (error) {
        res.status(500).send("ah ocurrido un error" + error)

    }

});
route.post("/", async(req, res) => {
    let product = req.body;

    if (!product) {
        res.status(400).send({
            status: 400,
            result: "error",
            error: " values error"
        })
    }

    try {

        let result = await cartsModel.create({
            products: req.body
        });

        res.status(200).send({
            status: 200,
            result: "success",
            payload: result
        });

    } catch (error) {
        console.log("Cannot save user on mongo: " + error);
        res.status(500).send({
            status: 500,
            result: "error",
            error: "Error saving data on DB"
        });
    }
})
route.post("/:cid/products/:pid", async(req, res) => {
    const cardId = parseInt(req.params.cid)
    const productId = parseInt(req.params.pid)
    let quantity = parseInt(req.body)
    try {


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