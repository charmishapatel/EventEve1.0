const express = require("express");
const router = express.Router();
const pool = require("../config/database");
const Stripe = require("stripe");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


router.post("/create-checkout-session", async (req, res) => {
    const { items } = req.body;

    const line_items = items.map(item => ({
        price_data: {
            currency: "usd",
            product_data: {
                name: item.name,
            },
            unit_amount: item.price * 100,
        },
        quantity: item.quantity,
    }));

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items,
            success_url: "http://localhost:3000/User/Payment/PaymentSuccess",
            cancel_url: "http://localhost:3000/User/Payment/PaymentCancel",
            
            
        });

        res.json({ id: session.id });
    } catch (err) {
        console.error("Stripe error", err);
        res.status(500).json({ error: "Payment failed" });
    }
});

// DELETE /api/payment/cleanup/:userid
// DELETE /api/payment/cleanup/:userid
router.delete("/cleanup/:userid", async (req, res) => {
    const { userid } = req.params;
  
    try {
      // 🧹 Delete all cart items for this user
      await pool.query("DELETE FROM cart WHERE userid = $1", [userid]);
  
      // 🧼 Optionally, delete items from Furniture/etc. if needed here
  
      res.status(200).json({ message: "Cart and item data cleaned up" });
    } catch (err) {
      console.error("❌ Cleanup failed:", err);
      res.status(500).json({ error: "Cleanup failed" });
    }
  });
  
  

module.exports = router;