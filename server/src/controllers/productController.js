const productModel = require("../models/productModel")
const userModel = require("../models/userModel")

const createProduct = async function(req,res){

    let body= req.body
    let {userId} = req.body


    let checkUser = await userModel.findOne({_id:userId})
    if(!checkUser) return res.status(404).send({status:false,message:"user does not exist with this id"})

    //Authorization
    if (req.decodedToken.userId != checkUser._id)return res.status(403).send({status: false,message: "You are not authorized."});

    let created = await productModel.create(body)

    return res.status(201).send({status:true,message:"success",data:created})
} 




const getProducts = async function(req,res){
    let data = req.params
} 

module.exports = {createProduct,getProducts}