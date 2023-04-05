const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const productSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: true,
            unique: true
        },
        unit: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        userId:{
            type: ObjectId,
            ref: "user"
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model("product", productSchema)