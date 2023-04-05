const express = require("express")
const mongoose = require("mongoose")
const app = express()
const router = require("./routes/route")

app.use(express.json())

mongoose.set("strictQuery",true)

mongoose.connect("mongodb+srv://Bhavi:Bhavi123@cluster1.yydegcy.mongodb.net/MultivendorBillingSystem")
.then(()=> console.log("MongoDB connected"))
.catch((err)=>console.log(err))

app.use("/",router)

app.listen(3000,()=>console.log("Server is running on port " + 3000))