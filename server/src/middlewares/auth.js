const jwt = require("jsonwebtoken")
const authentication = async function(req,res,next){

    let token = req.headers["Authorization"]
    
    if(!token) return res.status(400).send({status:false,message:"token is required"})

    jwt.verify(token,"dummykey",(err,decodedToken)=>{
        if(err)
        return res.status(400).send({status:false,message:"invalid token"})
        else{
        req.decodedToken = decodedToken
        next()
    }
    })
}

module.exports = {authentication}