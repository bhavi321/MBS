const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const billSchema = new mongoose.Schema(
    {
        customerName: {
            type: String,
            required: true,
            unique: true
        },
        userId: {
            type: ObjectId,
            ref: "user"
        },
        phone: {
            type: Number,
            required: true,
            unique: true

        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("bill", orderSchema)