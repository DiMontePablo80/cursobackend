const express = require("express")
const router = express.Router()
const upload = require("../utils/upload.middleware");
const productsModel = require("../dao/models/products.model")
const { paginateSubDocs } = require("mongoose-paginate-v2")

// get all products
router.get("/", async(req, res) => {
    let category = req.query.category
    let page = parseInt(req.query.page, 10) || 1
    let limit = parseInt(req.query.limit, 10) || 5
    try {

        if (!category) {
            const products = await productsModel.paginate({}, {
                page,
                limit,
                lean: true
            })
            products.prevLink = products.hasPrevPage ? `http://localhost:8080/api/products?page=${products.prevPage}` : ''
            products.nextLink = products.hasNextPage ? `http://localhost:8080/api/products?page=${products.nextPage}` : ''
            products.isValid = !(page <= 0 || page > products.totalPages)
            res.render("products", products)
            console.log(products)

        }
        if (category) {
            const products = await productsModel.paginate({ category: req.query.category }, {
                page,
                limit,
                lean: true
            })
            products.prevLink = products.hasPrevPage ? `http://localhost:8080/api/products?page=${products.prevPage}` : ''
            products.nextLink = products.hasNextPage ? `http://localhost:8080/api/products?page=${products.nextPage}` : ''
            products.isValid = !(page <= 0 || page > products.totalPages)
            res.render("products", products)

        }
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
            console.log(producto)
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

router.put("/update/:pid"), async(req, res) => {
    const { pid } = req.params;

    if (!pid) {
        return res.status(400).json({ message: 'id es requerido' });
    }

    try {
        let product = await productsModel.findById({ _id: uid }).lean();
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        await productsModel.findByIdAndUpdate({ _id: uid }, req.body);
        res.render("products")
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Hubo un error al actualizar el producto' });
    }
}

router.delete("/delete/:pid"), async(req, res) => {
    const { pid } = req.params;
    if (!pid) {
        return res.status(400).json({ message: 'id es requerido' });
    }
    try {
        let [product] = await productsModel.findById({ _id: pid });
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        await productsModel.findByIdAndDelete({ _id: pid });
        res.json({ message: 'Producto eliminado con éxito' });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Hubo un error al eliminar el producto' });
    }
}


module.exports = router