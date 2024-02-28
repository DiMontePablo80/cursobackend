const mongoose = require("mongoose")
const userCollection = "usuarios"

const userSchema = new mongoose.Schema({

    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const userModel = mongoose.model(userCollection, userSchema)
module.exports = userModel