const mongoose = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")
const cartsCollection = "carts"

const cartsSchema = new mongoose.Schema({
    products: Array

})
cartsSchema.plugin(mongoosePaginate)
const cartsModel = mongoose.model(cartsCollection, cartsSchema)
module.exports = cartsModel