const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const AuthRoutes = require("./routes/AuthRoutes");
const ShopRoutes = require("./routes/ShopRoutes");
const ProductsRoutes = require("./routes/ProductsRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", AuthRoutes);
app.use("/shop", ShopRoutes);
app.use("/products", ProductsRoutes);
// chat
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.listen(process.env.PORT, () => {
  console.log("server is runnig");
});
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("connected to database"))
  .catch((err) => console.log("connection failed", err.message));
