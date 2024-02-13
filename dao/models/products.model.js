const mongoose = require("mongoose")
const productsCollection = "productos"

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    stock: Number,
    thumbnail: String,
    code: Number,
    category: String,
    quantity: Number
})
const productsModel = mongoose.model(productsCollection, productSchema)
module.exports = productsModel