import "dotenv/config";
import express from "express";
import Stripe from "stripe";
import { products } from "./src/data.js";

const app = express();
app.use(express.json());

app.post("/api/checkout", async (req, res) => {
  const { items } = req.body ?? {};
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "Your bag is empty." });
  }

  const lineItems = [];
  for (const item of items) {
    const product = products.find((entry) => entry.id === item.id);
    const quantity = Number(item.quantity);
    if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
      return res.status(400).json({ error: "One or more items in your bag are invalid." });
    }
    lineItems.push({
      price_data: {
        currency: "pkr",
        product_data: {
          name: product.name,
          description: `${product.size} · ${product.family}`,
        },
        unit_amount: Math.round(product.price * 100),
      },
      quantity,
    });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(503).json({ error: "Stripe is not configured yet. Add your Stripe test secret to .env and restart the server." });
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${req.headers.origin}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/cart`,
      billing_address_collection: "auto",
    });
    return res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout session creation failed:", error.message);
    return res.status(502).json({ error: "Could not start secure checkout. Check your Stripe test credentials and try again." });
  }
});

app.get("/api/checkout/session/:id", async (req, res) => {
  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(503).json({ error: "Stripe is not configured yet." });
  }
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.retrieve(req.params.id);
    return res.json({
      status: session.payment_status,
      email: session.customer_details?.email ?? "",
      total: session.amount_total,
    });
  } catch (error) {
    console.error("Stripe checkout session lookup failed:", error.message);
    return res.status(400).json({ error: "We couldn't verify this order. Please check your confirmation link." });
  }
});

const port = Number(process.env.PORT) || 4242;
app.listen(port, () => console.log(`Checkout API listening on http://localhost:${port}`));
