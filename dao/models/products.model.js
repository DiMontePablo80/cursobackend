const mongoose = require("mongoose")
const productsCollection = "productos"

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    stock: {
        type: Number,
        require: true
    },
    thumbnail: { type: String },
    code: {
        type: Number,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    quantity: { type: Number, require: true }

})
const productsModel = mongoose.model(productsCollection, productSchema)
module.exports = productsModel