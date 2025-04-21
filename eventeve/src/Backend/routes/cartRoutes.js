const express = require("express");
const router = express.Router();
const pool = require("../config/database");

// ✅ Add to Cart
router.post("/cart/add", async (req, res) => {
  const { userid, itemid, name, price, imageurl, quantity } = req.body;

  try {
    const query = `
      INSERT INTO cart (userid, itemid, name, price, imageurl, quantity)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const result = await pool.query(query, [
      userid,
      itemid,
      name,
      price,
      imageurl,
      quantity,
    ]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("❌ Error adding to cart:", error);
    res.status(500).json({ error: "Failed to add item to cart" });
  }
});

// ✅ Get Cart Items for a User
router.get("/cart/:userid", async (req, res) => {
  const { userid } = req.params;

  try {
    const result = await pool.query("SELECT * FROM cart WHERE userid = $1", [
      userid,
    ]);
    res.json(result.rows);
  } catch (error) {
    console.error("❌ Error fetching cart:", error);
    res.status(500).json({ error: "Failed to fetch cart items" });
  }
});

// ✅ Delete Cart Item for a User
router.delete("/cart/:userid/:itemid", async (req, res) => {
  const { userid, itemid } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM cart WHERE userid = $1 AND itemid = $2 RETURNING *",
      [userid, itemid]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    console.error("❌ Error removing item from cart:", error);
    res.status(500).json({ error: "Failed to remove item from cart" });
  }
});


module.exports = router;
