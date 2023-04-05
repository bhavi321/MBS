const express = require("express")
const router = express.Router()

const {register,login} = require("../controllers/userController")
const {createProduct,getProducts} = require("../controllers/productController")
const {createBill} = require("../controllers/billController")
const {authentication} = require("../middlewares/auth")

router.post("/register", register)
router.post("/login", login)
router.post("/products",authentication,createProduct)
router.get("/products",authentication,getProducts)
router.post("/bill",authentication,createBill)

module.exports = router