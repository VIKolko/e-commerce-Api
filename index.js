const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const jsonParser = express.json();
// routes
const userRoute = require("./rootes/user");
const authRoute = require("./rootes/auth");
const productRoute = require("./rootes/product");
const cartRoute = require("./rootes/cart");
const orderRoute = require("./rootes/order");
const stripeRoute = require("./rootes/stripe");
const cors = require("cors");

dotenv.config();
const port = process.env.PORT || 5000;
const mongoUrl = process.env.MONGO_URL;

mongoose
  .connect(mongoUrl)
  .then(() => console.log("database connected"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

// check
// app.get("/api/test", () => console.log("tested ok"));

app.listen(port, () => {
  console.log(`server starts on port ${port}`);
});
