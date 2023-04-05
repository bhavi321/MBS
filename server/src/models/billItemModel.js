const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const billItemSchema = new mongoose.Schema(
    {
        customerName: {
            type: String,
            required: true,
            unique: true
        },
        billId: {
            type: ObjectId,
            ref: "bill"
        },
        productId: {
            type: ObjectId,
            ref: "product"
        },
        quantity: {
            type: Number,
            required: true
        },
        price:{
            type: Number,
            required: true
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("billItem", billItemSchema)