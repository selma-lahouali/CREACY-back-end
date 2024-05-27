const Order = require("../models/Order");

// CREATE
exports.createOrder = async (req, res) => {
  const userID = req.params.userId;
  if (!userID) {
    return res.status(404).json({ message: "User not found" });
  }
   try {
    const newOrder = new Order({
      userId: userID,
      products: req.body.products,
      amount: req.body.amount,
      address: req.body.address,
      status: req.body.status || "Pending",
    });

    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
};
// get user's order by order id
exports.getUserOrder = async (req, res) => {
  const userID = req.params.userId;
  const orderId = req.params.id;

  if (!userID) {
    return res.status(404).json({ message: "User not found" });
  }

  try {
    const order = await Order.findOne({ _id: orderId, userId: userID });

    if (!order) {
      return res.status(404).json({ message: "Order not found for this user" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error);
  }
};
// get all the orders of a user
exports.getAllUserOrders = async (req, res) => {
  const userID = req.params.userId;

  if (!userID) {
    return res.status(404).json({ message: "User not found" });
  }

  try {
    const order = await Order.find({ userId: userID });

    if (!order) {
      return res.status(404).json({ message: "No Order found for this user" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error);
  }
};

// update order
exports.updateOrder = async (req, res) => {
  const userId = req.params.userId;
  if (!userId) {
    return res.status(404).json({ message: "User not found" });
  }

  try {
    const order = await Order.findOneAndUpdate(
      { _id: req.params.id, userId: userId },
      { $set: { address: req.body.address, status: req.body.status } },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found for this user" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error);
  }
};

// DELETE
exports.deleteOrder = async (req, res) => {
  const userID = req.params.userId;
  
  if (!userID) {
    return res.status(404).json({ message: "User not found" });
  }

  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted.");
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET ALL ORDERS
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET MONTHLY INCOME
exports.getMonthlyIncome = async (req, res) => {
  const productId = req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && {
            products: { $elemMatch: { productId } },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
};
