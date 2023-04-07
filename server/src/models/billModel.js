const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const billSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
    },
    userId: {
      type: ObjectId,
      ref: "user",
    },
    phone: {
      type: String,
    },
    totalPrice: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("bill", billSchema);
