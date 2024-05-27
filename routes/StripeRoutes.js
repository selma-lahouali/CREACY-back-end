const express = require("express");
const router = express.Router();
const StripeControllers = require("../controllers/StripeControllers");
const { verifyToken } = require("../Middlewares/VerificationToken");
router.post(
  "/:userId/:orderId",
  verifyToken,
  StripeControllers.paymentController
);

module.exports = router;
