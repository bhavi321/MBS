const mongoose = require("mongoose")


const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true,
            enum: ["ADMIN","VENDOR"]
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model("user", userSchema)