const express = require("express")
const router = express.Router()
const userModel = require("../dao/models/user.model")

// get all users
router.get("/", async(req, res) => {
    try {
        let users = await userModel.find()
        res.send({ result: "success", payload: users })
    } catch (error) {
        console.log("cannot get users with mongoose:" + error)
    }
})

// Create new user
router.post("/", async(req, res) => {

    let { first_name, last_name, email } = req.body;

    if (!first_name || !last_name || !email) {
        res.status(400).send({
            status: 400,
            result: "error",
            error: "Incomplete values"
        })
    }

    try {

        let result = await userModel.create({
            first_name,
            last_name,
            email
        });

        res.status(200).send({
            status: 200,
            result: "success",
            payload: result
        });

    } catch (error) {
        console.log("Cannot save user on mongo: " + error);
        res.status(500).send({
            status: 500,
            result: "error",
            error: "Error saving data on DB"
        });
    }

});

// Update user by UID
router.put("/:uid", async(req, res) => {

    let { uid } = req.params;

    let userToReplace = req.body;

    if (!uid || !userToReplace.first_name || !userToReplace.last_name || !userToReplace.email) {
        res.status(400).send({
            status: 400,
            result: "error",
            error: "Incomplete values"
        })
    }

    try {

        let result = await userModel.updateOne({ _id: uid }, userToReplace)

        res.status(200).send({
            status: 200,
            result: "success",
            payload: result
        })

    } catch (error) {

        console.log("Cannot update user on Mongo: " + error);
        res.status(500).send({
            status: 500,
            result: "error",
            error: "Error updating data on DB"
        });

    }

})

// Delete user by UID
router.delete("/:uid", async(req, res) => {
    let { uid } = req.params;

    try {

        let result = await userModel.deleteOne({
            _id: uid
        });

        res.status(200).send({
            status: 200,
            result: "sucess",
            payload: result
        });

    } catch (error) {

        console.log("Cannot delete user on Mongo: " + error);
        res.status(500).send({
            status: 500,
            result: "error",
            error: "Error deleting data on DB"
        });

    }

})

module.exports = router;