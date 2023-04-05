const billItemModel = require("../models/billItemModel");
const billModel = require("../models/billModel");
const productModel = require("../models/productModel");
const createBill = async function (req, res) {
  // createbillObject using seller id(token) custer name and phone

  //you will ger the bill id from newlycreated object
  //you will create bill item object using item id and qauantity from array
  if (!req.body || Object.keys(req.body).length == 0)
    return res
      .status(400)
      .send({ status: false, message: "Enter data in body." });

  const { customerName, phone, items } = req.body;
  const billObj = {};

  billObj.userId = req.decodedToken.userId;
  billObj.customerName = customerName;
  billObj.phone = phone;

  const create = await billModel.create(billObj);

  //items = [{pid,q},{pid,q}]
  const billItemObj = {};
  billItemObj.billId = create._id;

  for (let i = 0; i < items.length; i++) {
    const productId = items[i]["productId"];
    const quantity = items[i]["quantity"];
    const product = await productModel.findOne({ _id: productId });
    billItemObj.productId = productId;
    billItemObj.quantity = quantity;
    billItemObj.unitPrice = quantity * product.price;
    const createBillItem = await billItemModel.create(billItemObj);
  }
  return res.status(201).json({ message: "success" });
  //console.log(create);
};

module.exports = { createBill };

// let obj = {
//     items: [{itemsId,quantity},],
//
//     costumerName,
//     phone
// }
// {
//     customerName: 'x',
//     userId: new ObjectId("642c8441c4fcf092515e4516"),
//     phone: 2345667654,
//     _id: new ObjectId("642dbdcf9a256e07eecd219e"),
//     createdAt: 2023-04-05T18:28:31.842Z,
//     updatedAt: 2023-04-05T18:28:31.842Z,
//     __v: 0
//   }
