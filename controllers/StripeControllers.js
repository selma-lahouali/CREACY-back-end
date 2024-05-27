const KEY = process.env.STRIPE_KEY;
const stripe = require("stripe")(KEY);

exports.paymentController = async (req, res) => {
  console.log(req.body);
  try {
    const { amount } = req.body;
    const userID = req.params.userId;
    const orderId = req.params.orderId;
    // Create a PaymentIntent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "usd",
      amount,
      metadata: { orderId, userID },
    });

    // Respond with the PaymentIntent details
    res.status(200).json({
      success: true,
      message: "PaymentIntent done successfully",
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error making PaymentIntent:", error);
    res.status(500).json({
      success: false,
      message: "Failed to achieve PaymentIntent",
      error: error.message,
    });
  }
};
