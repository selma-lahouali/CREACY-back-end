const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const AuthRoutes = require("./routes/AuthRoutes");
const ShopRoutes = require("./routes/ShopRoutes");
const ProductsRoutes = require("./routes/ProductsRoutes");
const CartRoutes = require("./routes/CartRoutes");
const OrderRoutes = require("./routes/OrderRoutes");
const StripeRoutes = require("./routes/StripeRoutes");
const ChatRoutes = require("./routes/ChatRoutes");
const MessagesRoutes = require("./routes/MessagesRoutes");
const cors = require("cors");
const app = express();
const port = process.env.PORT;
const frontEndPort = process.env.FRONT_PORT;
const liveUrl = process.env.LIVE_URL;
// middlewars
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", AuthRoutes);
app.use("/shop", ShopRoutes);
app.use("/products", ProductsRoutes);
app.use("/cart", CartRoutes);
app.use("/order", OrderRoutes);
app.use("/payment", StripeRoutes);
app.use("/chat", ChatRoutes);
app.use("/message", MessagesRoutes);

// port
const server = app.listen(port || 3000, () => {
  console.log("server is runnig", port);
});
// database
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("connected to database"))
  .catch((err) => console.log("connection failed", err.message));

// socket.io
const io = require("socket.io")(server, {
  cors: {
    origin: [frontEndPort, liveUrl],
  },
});

let activeUsers = [];

io.on("connection", (socket) => {
  // add new User
  socket.on("new-user-add", (newUserId) => {
    // if user is not added previously
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({ userId: newUserId, socketId: socket.id });
      // console.log("New User Connected", activeUsers);
    }
    // send all active users to new user
    io.emit("get-users", activeUsers);
  });

  socket.on("disconnect", () => {
    // remove user from active users
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    // console.log("User Disconnected", activeUsers);
    // send all active users to all users
    io.emit("get-users", activeUsers);
  });

  // send message to a specific user
  socket.on("send-message", (data) => {
    const { receiverId } = data;
    const user = activeUsers.find((user) => user.userId === receiverId);
    // console.log("Sending from socket to :", receiverId);
    // console.log("Data: ", data);
    if (user) {
      io.to(user.socketId).emit("recieve-message", data);
    }
  });
});
