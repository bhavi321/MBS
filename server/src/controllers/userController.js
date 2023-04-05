const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { userJoi } = require("../middlewares/joiValidation");

const register = async function (req, res) {
  const body = req.body;

  if (!body || Object.keys(body).length == 0)
    return res.status(400).json({ message: "Enter data in body." });

  if (body.email) body.email = body.email.trim();
  if (body.userName) body.userName = body.userName.trim();
  const user = await userModel.findOne({ email: body.email });
  if (user) return res.status(400).json({ message: "email already present" });
  const { error, value } = userJoi.validate(body, { abortEarly: false });
  if (error) return res.status(400).send({ error });

  let created = await userModel.create(body);

  console.log(value);

  res.status(201).json({ message: "success", data: created });
};

const login = async function (req, res) {
  const { email, password } = req.body;

  if (!email)
    return res
      .status(400)
      .send({ status: false, message: "email is required" });
  let check = await userModel.findOne({ email: email });
  if (!check)
    return res
      .status(404)
      .send({ status: false, message: "email is not found" });

  if (!password)
    return res
      .status(400)
      .send({ status: false, message: "password is required" });

  let token = jwt.sign({ userId: check._id }, "dummykey", { expiresIn: "4h" });
  return res
    .status(200)
    .send({ status: true, message: "User login successful", data: token });
};
module.exports = { register, login };
