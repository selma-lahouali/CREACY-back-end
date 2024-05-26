const express = require("express");
const router = express.Router();
const StripeControllers = require("../controllers/StripeControllers");

router.post("/pay", StripeControllers.paymentController);

module.exports = router;
