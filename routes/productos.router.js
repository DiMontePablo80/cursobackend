const express = require("express")
const router = express.Router()
const upload = require("../utils/upload.middleware");
const productsModel = require("../dao/models/products.model")


// get all products
router.get("/", async(req, res) => {

    try {
        const products = await productsModel.find().lean()
        res.render("products", { products })

    } catch (error) {
        console.log("Cannot get users from Mongo: " + error)
        console.log({
            status: 500,
            result: "error",
            error: "Error getting data from DB"

        })
    }
})

router.get("/new", (req, res) => {
    res.render("new-product")
})

// buscar un producto por ID
router.get("/:uid", async(req, res) => {
    let { uid } = req.params;

    try {
        let productoId = await productsModel.findById({ _id: uid }).lean()
        if (!productoId) {
            res.redirect("products")
            console.log("el producto no se encuentra en la lista")
        } else {
            let producto = productoId
            res.render("product", { producto })

        }

    } catch (error) {
        console.log({
            status: 500,
            mensaje: "ah ocurrido un error al buscar un producto en bd"
        })

    }
})

router.post("/", upload.single('image'), async(req, res) => {

        let thumbnail = req.file.filename
        let producto = req.body;

        try {
            await productsModel.create({
                title: producto.title,
                description: producto.description,
                price: producto.price,
                stock: producto.stock,
                thumbnail: thumbnail, //imagen
                code: producto.code,
                category: producto.category,
                quantity: producto.quantity
            });
            res.redirect("products")

        } catch (error) {

            console.log({
                status: 500,
                result: "error",
                error: "Error saving data on DB" + error
            });
        }

    })
    // update product by (id)
router.put("/:pid", async(req, res) => {
    let { pid } = req.params;
    let productToReplace = req.body
    if (!pid || !productToReplace.title || !productToReplace.description || !productToReplace.price || !productToReplace.stock || !productToReplace.code || !productToReplace.thumbnail || !productToReplace.category || !productToReplace.quantity) {
        console.log({
            status: 400,
            result: "error",
            error: "Incomplete values"
        })
    }
    try {

        let result = await productsModel.updateOne({ _id: pid }, productToReplace)
        let products = result
        res.render("products", { products })
        console.log({
            status: 200,
            result: "success",
            payload: result
        })

    } catch (error) {
        console.log({
            status: 500,
            result: "error",
            error: "Error updating product on DB" + error
        });

    }
})


router.delete("/:pid", async(req, res) => {
    let { pid } = req.params;
    try {

        let result = await productsModel.deleteOne({ _id: pid });
        let products = result
        res.render("products", { products })
        console.log({
            status: 200,
            result: "sucess",
            payload: result
        });

    } catch (error) {
        console.log({
            status: 500,
            result: "error",
            error: "Error deleting data on DB" + error
        });

    }
})


module.exports = router