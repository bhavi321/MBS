const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const router = require("./routes/route");

const cors = require("cors");
app.use(express.static(path.join(__dirname, "../build")));

app.use(express.json());
app.use(cors());

mongoose.set("strictQuery", true);

mongoose
  .connect(
    "mongodb+srv://Bhavi:Bhavi123@cluster1.yydegcy.mongodb.net/MultivendorBillingSystem"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/", router);

app.listen(3001, () => console.log("Server is running on port " + 3001));

app.get("*", function (req, res) {
  const file = path.join(__dirname, "../build/index.html");
  res.sendFile(file);
});
