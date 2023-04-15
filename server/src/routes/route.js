const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getUsers,
  getUserById,
} = require("../controllers/userController");
const {
  createProduct,
  getProducts,
  updateProducts,
} = require("../controllers/productController");
const {
  createBill,
  getBills,
  getBillByVendorId,
  getBillByBillId,
  getBillItemsByBillId,
} = require("../controllers/billController");
const { authentication } = require("../middlewares/auth");

router.post("/api/register", register);
router.post("/api/login", login);

router.get("/api/user", authentication, getUsers);
router.get("/api/user/:userId", authentication, getUserById);
//get vendor by vendor id params

router.post("/api/productss", authentication, createProduct);
router.get("/api/products", authentication, getProducts);
router.put("/api/products/:productId", authentication, updateProducts);
//delete

router.post("/api/bill", authentication, createBill);
router.get("/api/bill/getBills", authentication, getBills);
router.get("/api/bill/vendor/:userId", authentication, getBillByVendorId);
router.get("/api/bill/:billId", authentication, getBillByBillId);

router.get("/api/billItem/:billId", authentication, getBillItemsByBillId);

//get bill by vendor params?
//by bill id
//getbillitemsby bill id
//delete

module.exports = router;
