const express = require("express")
const router = express.Router()
const session = require("express-session")
const userModel = require("../dao/models/user.model")

router.post("/register", async(req, res) => {

    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let email = req.body.email;
    let age = parseInt(req.body.age);
    let password = req.body.password;
    try {
        if (!first_name || !last_name || !email || !age || !password) {
            res.redirect("/register");
        }

        let emailUsed = await userModel.findOne({ email: email });

        if (emailUsed) {
            res.redirect("/register");
        } else {
            await userModel.create({ first_name: first_name, last_name: last_name, age: age, email: email, password: password });
            res.redirect("/login");
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
router.post("/login", async(req, res) => {

    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        res.redirect("/login");
    }

    let user = await userModel.findOne({ email: email, password: password }).lean();

    if (!user) {
        res.redirect("/login");
    } else {
        req.session.user = user._id;
        res.redirect("/profile");
    }

})

router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        res.redirect("/home");
    })
})





module.exports = router