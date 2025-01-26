const express = require("express");
const app = express();
const cors = require("cors");
const stripe = require("stripe")("sk_test_51QZoQYG4YE9vsTyc0FhrR7M1OCr0mCkeviB61ZCDfQrKWwNESOlDhKL5izG8yLe1xNXsHdoRS0mcZZavhFbWPpVw00LwSnnxCV");

app.use(cors());

app.post("/api/create-checkout-session", async (req, res) => {
  const { products, orderId } = req.body;
  console.log("🚀 ~ app.post ~ products:", products);
  const lineItem = products?.map((product) => ({
    price_data: {
      currency: "AED",
      product_data: { name: product.title },
      unit_amount: product.price * 100,
    },
    quantity: product.quantity,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItem,
      mode: "payment",
      success_url: `http://localhost:3000/success?orderId=${orderId}`,
      cancel_url: "http://localhost:3000/cancel",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = app;