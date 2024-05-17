const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const AuthRoutes = require("./routes/AuthRoutes");
const ShopRoutes = require("./routes/ShopRoutes");
const ProductsRoutes = require("./routes/ProductsRoutes");
const CartRoutes = require("./routes/CartRoutes");
const cors = require("cors");
const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use("/auth", AuthRoutes);
app.use("/shop", ShopRoutes);
app.use("/products", ProductsRoutes);
app.use("/cart", CartRoutes);

// port
app.listen(port || 3000, () => {
  console.log("server is runnig", port);
});
// database
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("connected to database"))
  .catch((err) => console.log("connection failed", err.message));
