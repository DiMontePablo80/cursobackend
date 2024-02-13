const express = require("express")
const router = express.Router()

router.get("/home", (req, res) => {
    res.render("home")

})

// router productos_Socket
router.get("/realTimeProducts", (req, res) => {
    res.render("realTimeProducts")
})

//router Chat_socket
router.get('/chat', (req, res) => {
    res.render('chat', {})
})




module.exports = router