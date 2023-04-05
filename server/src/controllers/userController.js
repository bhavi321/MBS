const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken")

const register = async function(req,res){

    let body = req.body
    if (!body || Object.keys(body).length == 0)return res.status(400).send({ status: false, message: "Enter data in body." })
    
    let created = await userModel.create(body)

    res.status(201).send({status:true,message:"success",data:created})
}


const login = async function(req,res){
    
    const {email,password} = req.body

    if(!email) return res.status(400).send({status:false,message:"email is required"})
    let check = await userModel.findOne({email : email})
    if(!check) return res.status(404).send({status : false, message: "email is not found"})

    if(!password) return res.status(400).send({status:false,message:"password is required"})

    let token = jwt.sign({userId:check._id},"dummykey",{expiresIn:"4h"})
    return res.status(200).send({status:true,message:"User login successful",data:token})

}
module.exports = {register,login}