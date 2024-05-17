const express = require("express");
const router = express.Router();
const OrderControllers = require("../controllers/OrderController");
const { verifyToken, adminCheck } = require("../Middlewares/VerificationToken");

// CREATE
router.post("/", verifyToken, OrderControllers.createOrder);

// UPDATE
router.put("/:id", verifyToken, adminCheck, OrderControllers.updateOrder);

// DELETE
router.delete("/:id", verifyToken, adminCheck, OrderControllers.deleteOrder);

// GET USER'S ORDERS
router.get("/userOrder/:id", verifyToken, adminCheck, OrderControllers.findUserOrders);

// GET ALL ORDERS
router.get("/", verifyToken, adminCheck, OrderControllers.getAllOrders);

// GET MONTHLY INCOME
router.get("/income", verifyToken, adminCheck, OrderControllers.getMonthlyIncome);

module.exports = router;
