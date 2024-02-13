const mongoose = require("mongoose")
const messagesCollection = "messages"

const messagesShema = new mongoose.Schema({
    email: String,
    messages: Array
})

const messagesModel = mongoose.model(messagesCollection, messagesShema)
module.exports = messagesModel