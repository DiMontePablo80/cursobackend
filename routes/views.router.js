const express = require("express")
const route = express.Router()
const productManagment = require("../segundaEntrega")


route.get("/home", async(req, res) => {
    const products = await productManagment.getProducts()
    res.render("home", {
        products: products,

    })
})

route.get("/realTimeProducts", (req, res) => {

    res.render("realTimeProducts")
})


module.exports = route