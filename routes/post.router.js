const express = require("express")
const route = express.Router()
const productManagment = require("../segundaEntrega")



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

module.exports = route;