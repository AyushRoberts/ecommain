const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const { Users, Orders } = require("./mongoconnection.js");
const bcrypt = require("bcryptjs");
app.use(cors());
app.use(bodyParser.json());

app.post("/signup", async (req, res) => {
  let { name, email, password } = req.body;
  let saltRounds = 10;
  let hashedPassword = await bcrypt.hash(password, saltRounds);
  password = hashedPassword;
  const newuser = new Users({ name: name, email, password: password });
  try {
    newuser.save().then(() => {
      res.send({ message: "Successfully Created", success: true });
    });
  } catch (e) {
    console.log(e.message);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  Users.findOne({ email: email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (e, result) => {
        if (result) res.send({ message: "logged in", u: user });
        else res.send({ message: "incorrect pass" });
      });
    } else res.send({ message: "user not found" });
  });
});

app.post("/newOrder", async (req, res) => {
  let { customer_id, cart } = req.body;
  const neworder = new Orders({ customer_id, items: cart, date: new Date() });
  console.log("ordering");
  try {
    neworder
      .save()
      .then(() => {
        res.send({ message: "Successfully Ordered", success: true });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (e) {
    console.log(e.message);
  }
});

app.get("/orderHistory", async (req, res) => {
  const customer_id = req.header("customer_id");
  console.log(customer_id);
  await Orders.find({ customer_id: customer_id }).then((orders) =>
    res.send(orders)
  );
});

app.listen(3001, () => {
  console.log("Running on port 3001");
});
