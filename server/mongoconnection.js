const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://ayushroberts:shhhhhhh@cluster0.pw9s05m.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(console.log("connected"));

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const orderSchema = new mongoose.Schema({
  customer_id: String,
  items: Array,
  date: Date,
});

const Users = new mongoose.model("Users", userSchema);
const Orders = new mongoose.model("Orders", orderSchema);
module.exports = { Users: Users, Orders: Orders };
