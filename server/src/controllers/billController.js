const { createBillValidation } = require("../middlewares/joiValidation");
const mongoose = require("mongoose");
const billItemModel = require("../models/billItemModel");
const billModel = require("../models/billModel");
const productModel = require("../models/productModel");
const userModel = require("../models/userModel");
const createBill = async function (req, res) {

  if (!req.body || Object.keys(req.body).length == 0)
    return res
      .status(400)
      .send({ status: false, message: "Enter data in body." });

      if(req.body.items){
       
        if(req.body.items.length==0){
        return res
      .status(400)
      .send({ status: false, message: "Choose Items" });
        }
      }

  const { customerName, phone, items } = req.body;

  const { error } = createBillValidation.validate(req.body, {
    abortEarly: false,
  });

  if (error) return res.status(400).json({ message:error.details[0].message });

  const user = await userModel.findOne({
    _id: req.decodedToken.userId,
    isdeleted: false,
  });

  let billObj = {};
  const resultObj = {};
  billObj.userId = req.decodedToken.userId;
  billObj.customerName = customerName;
  billObj.phone = phone;

  const billItems = [];

  const billItemObj = {};

  // const createdBill = await billModel.create(billObj);

  const billItemsArr = [];
  let totalPrice = 0;
  for (let i = 0; i < items.length; i++) {
    const productId = items[i].productId;
    const quantity = items[i].quantity;
    const product = await productModel.findOne({
      _id: productId,
      userId: req.decodedToken.userId,
    });
    if (!product)
      return res
        .status(404)
        .json({ message: "product not found with this id" });
    billItemObj.productId = productId;
    billItemObj.quantity = quantity;
    billItemObj.unitPrice = quantity * product.price;
    totalPrice += quantity * product.price;
    // const currItem = await billItemModel.create(billItemObj);
    billItemsArr.push({ ...billItemObj });
  }

  billObj.totalPrice = totalPrice;

  const createdBill = await billModel.create(billObj);

  for (let i = 0; i < billItemsArr.length; i++) {
    billItemsArr[i].billId = createdBill._id;
    const currItem = await billItemModel.create(billItemsArr[i]);
    billItems.push(currItem);
  }
  resultObj.bill = billObj;
  resultObj.items = billItems;

  await billModel.updateOne(
    { _id: createdBill._id.toString() },
    { $set: { totalPrice: totalPrice } }
  );

  return res.status(201).json({ message: "success", data: resultObj });
};


const getBills = async function (req, res) {
  

  const bills = await billModel.find({ userId: req.decodedToken.userId, isDeleted: false });
  if (!bills)
    return res
      .status(404)
      .json({ status: false, message: "this user's bill does not exist" });

  

    
    return res.status(200).json({ message: "success", data: bills });
  
};


const getBillByVendorId = async function (req, res) {
  let userId = req.params.userId;

  if (!mongoose.isValidObjectId(userId))
    return res.status(400).json({ message: "Invalid user Id" });

  const user = await userModel.findOne({
    _id: req.decodedToken.userId,
    isDeleted: false,
  });
  if (!user)
    return res
      .status(404)
      .json({ status: false, message: "user does not exist with this id" });
  const bill = await billModel.findOne({ userId: userId, isDeleted: false });
  if (!bill)
    return res
      .status(404)
      .json({ status: false, message: "bill does not exist with this id" });

  if (user.type == "ADMIN") {
    const findBills = await billModel.find({
      userId: userId,
      isdeleted: false,
    });
    return res.status(200).json({ message: "updated", data: findBills });
  } else if (user.type == "VENDOR") {
    if (user._id.toString() != bill.userId.toString())
      return res.status(404).json({ message: "you are not authorized" });

    const findBills = await billModel.find({
      userId: req.decodedToken.userId,
      isdeleted: false,
    });
    return res.status(200).json({ message: "success", data: findBills });
  }
};

const getBillByBillId = async function (req, res) {
  let billId = req.params.billId;
  if (!mongoose.isValidObjectId(billId))
    return res.status(400).json({ message: "Invalid user Id" });
  const user = await userModel.findOne({
    _id: req.decodedToken.userId,
    isDeleted: false,
  });
  if (!user)
    return res
      .status(404)
      .json({ message: "user does not exist with this id" });
  const bill = await billModel.findOne({ _id: billId, isDeleted: false });
  if (!bill)
    return res
      .status(404)
      .json({ status: false, message: "bill does not exist with this id" });

  if (user.type == "ADMIN") {
    const findBills = await billModel.findOne({
      _id: billId,
      isDeleted: false,
    });
    return res.status(200).json({ data: findBills });
  } else if (user.type == "VENDOR") {
    if (user._id.toString() != bill.userId.toString())
      return res.status(404).json({ message: "you are not authorized" });

    return res.status(200).json({ message: "success", data: bill });
  }
};

const getBillItemsByBillId = async function (req, res) {
  let billId = req.params.billId;
  if (!mongoose.isValidObjectId(billId))
    return res.status(400).json({ message: "Invalid user Id" });
  const user = await userModel.findOne({
    _id: req.decodedToken.userId,
    isDeleted: false,
  });
  if (!user)
    return res
      .status(404)
      .json({ message: "user does not exist with this id" });
  const bill = await billModel.findOne({ _id: billId, isDeleted: false });
  if (!bill)
    return res
      .status(404)
      .json({ status: false, message: "bill does not exist with this id" });

  if (user.type == "ADMIN") {
    const findBills = await billItemModel.find({
      billId: billId,
      isDeleted: false,
    });
    return res.status(200).json({ data: findBills });
  } else if (user.type == "VENDOR") {
    if (user._id.toString() != bill.userId.toString())
      return res.status(404).json({ message: "you are not authorized" });

    const findBills = await billItemModel.find({
      billId: billId,
      isDeleted: false,
    });
    return res.status(200).json({ message: "success", data: findBills });
  }
};
module.exports = {
  createBill,
  getBills,
  getBillByVendorId,
  getBillByBillId,
  getBillItemsByBillId,
};

