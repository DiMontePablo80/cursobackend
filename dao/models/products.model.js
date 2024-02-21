const mongoose = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")
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
productSchema.plugin(mongoosePaginate)
const productsModel = mongoose.model(productsCollection, productSchema)
module.exports = productsModel