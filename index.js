const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const AuthRoutes = require("./routes/AuthRoutes");
const ProductsRoutes = require("./routes/ProductsRoutes");
const app = express();
app.use(express.json());
app.use("/authentification", AuthRoutes);
app.use("/products", ProductsRoutes);
app.listen(process.env.PORT, () => {
  console.log("server is runnig");
});
mongoose
  .connect(process.env.URL)
  .then(() => console.log("connected to database"))
  .catch((err) => console.log("connection failed", err.message));
