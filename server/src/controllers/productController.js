const productModel = require("../models/productModel")
const userModel = require("../models/userModel")

const createProduct = async function (req, res) {

    let body = req.body



    let checkUser = await userModel.findOne({ _id: req.decodedToken.userId })
    if (!checkUser) return res.status(404).send({ status: false, message: "user does not exist with this id" })

    //Authorization
    //if (req.decodedToken.userId != checkUser._id)return res.status(403).send({status: false,message: "You are not authorized."});
    req.body.userId = checkUser._id
    let created = await productModel.create(body)

    return res.status(201).send({ status: true, message: "success", data: created })
}




const getProducts = async function (req, res) {
    let body = req.body

    let userData = await userModel.findOne({ _id: req.decodedToken.userId })
    if (!userData) return res.status(404).send({ status: false, message: "user does not exist with this id" })

    if (userData.type == "ADMIN") {
        let productData = await productModel.find()
        return res.status(200).send({ status: true, message: "success", data: productData })
    }
    else {
        let productData = await productModel.find({userId:req.decodedToken.userId})
        return res.status(200).send({ status: true, message: "success", data: productData })

    }
}

module.exports = { createProduct, getProducts }