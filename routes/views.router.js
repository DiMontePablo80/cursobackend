const express = require("express")
const router = express.Router()
const session = require("express-session")
const userModel = require('../dao/models/user.model');
const productsModel = require("../dao/models/products.model");
const { paginateSubDocs } = require("mongoose-paginate-v2")

router.get('/', (req, res) => {
    res.redirect('/home');
});

router.get('/home', (req, res) => {

    if (req.session.user) {
        res.redirect("/profile");
    } else {
        res.render("home");
    }

});

router.get('/register', (req, res) => {
    res.render("register");
});

router.get("/login", async(req, res) => {
    let page = parseInt(req.query.page, 10) || 1
    let limit = parseInt(req.query.limit, 10) || 5

    try {
        if (req.session.user) {

            const products = await productsModel.paginate({}, {
                page,
                limit,
                lean: true
            })
            products.prevLink = products.hasPrevPage ? `http://localhost:8080/api/products?page=${products.prevPage}` : ''
            products.nextLink = products.hasNextPage ? `http://localhost:8080/api/products?page=${products.nextPage}` : ''
            products.isValid = !(page <= 0 || page > products.totalPages)
            res.render("products", products)

        } else {
            res.render("login");
        }
    } catch (error) {
        console.log(error)
    }
})

router.get("/profile", async(req, res) => {
        try {
            if (req.session.user) {

                let user = await userModel.findById({ _id: req.session.user }).lean();
                res.render("profile", { user });
            } else {
                res.redirect("/login");
            }
        } catch (err) {
            console.log(err)
            res.redirect("/loguin")
        }


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