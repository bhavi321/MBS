const mongoose = require("mongoose")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");

const { userJoi, loginJoi } = require("../middlewares/joiValidation");

const register = async function (req, res) {
  const body = req.body;

  if (!body || Object.keys(body).length == 0)
    return res.status(400).json({ message: "Enter data in body." });

  if (body.email) body.email = body.email.trim();
  if (body.userName) body.userName = body.userName.trim();

  const user = await userModel.findOne({ email: body.email });
  if (user) return res.status(400).json({ message: "email already present" });

  const { error, value } = userJoi.validate(body, { abortEarly: false });
  if (error) return res.status(400).json({ error });

  const hashedPassword = bcrypt.hashSync(body.password, 10);
  body.password = hashedPassword;

  let created = await userModel.create(body);

  res.status(201).json({ message: "success", data: created });
};


const login = async function (req, res) {
  const { email, password } = req.body;

  
  const {error} = loginJoi.validate(req.body,{abortEarly:false})
  if(error) return res.status(400).json({error})

  let user = await userModel.findOne({ email: email, isDeleted:false});
  if (!user)
    return res
      .status(404)
      .json({ status: false, message: "email is not found" });



  let hashedToken = user.password;
  let decrypt = await bcrypt.compare(password, hashedToken);

  if (decrypt == true) {
    let token = jwt.sign({ userId: user._id }, "dummykey", { expiresIn: "4h" });
    return res
      .status(200)
      .json({ status: true, message: "User login successful", data: token });
  } else {
    return res
      .status(400)
      .json({ status: false, message: "enter valid password" });
  }
};




const getUserById = async function(req,res){

  const userId = req.params.userId

  if (!mongoose.isValidObjectId(userId)) return res.status(400).json({message: "Invalid User Id" })
  

  const user = await userModel.findOne({_id:req.decodedToken.userId,isDeleted:false})
  if(!user) return res.status(400).json({message:"no user found"})
  
  if(user.type == "ADMIN"){
    const result = await userModel.findOne({_id:userId,isDeleted:false})
    return res.status(200).json({message:"success",data:result})
  }
  else if(user.type == "VENDOR"){
    if(user._id != userId)
    return res.status(400).json({message:"you are not authorized"})

    return res.status(400).json({message:"success",data:user})

  }
}

module.exports = { register, login, getUserById };
