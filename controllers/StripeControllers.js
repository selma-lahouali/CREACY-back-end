const KEY = process.env.STRIPE_KEY;
const stripe = require("stripe")(KEY);

exports.paymentController = async (req, res) => {
  console.log(req.body);
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "usd",
      amount: req.body.amount,
    });
    res.status(200).json(paymentIntent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
