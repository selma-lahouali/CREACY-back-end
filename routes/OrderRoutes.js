const express = require("express");
const router = express.Router();
const OrderControllers = require("../controllers/OrderControllers");
const { verifyToken, adminCheck } = require("../Middlewares/VerificationToken");

// CREATE order
router.post("/:userId", verifyToken, OrderControllers.createOrder);

// GET USER'S ORDER by order id
router.get("/:userId/:id", verifyToken, OrderControllers.getUserOrder);

// GET all the orders for a  USER'
router.get("/:userId", verifyToken, OrderControllers.getAllUserOrders);

// UPDATE order
router.put("/:userId/:id", verifyToken, OrderControllers.updateOrder);

// DELETE order
router.delete("/:userId/:id", verifyToken, OrderControllers.deleteOrder);

// GET ALL ORDERS
router.get("/", verifyToken, adminCheck, OrderControllers.getAllOrders);

// GET MONTHLY INCOME
router.get(
  "/income",
  verifyToken,
  adminCheck,
  OrderControllers.getMonthlyIncome
);

module.exports = router;
