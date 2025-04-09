const express = require("express");
const router = express.Router();
const pool = require("../config/database");


// POST /api/cart
router.post("/", async (req, res) => {
  const { userid, itemid, name, price, imageurl, quantity } = req.body;

  try {
    const existing = await pool.query(
      "SELECT * FROM cart WHERE userid = $1 AND itemid = $2",
      [userid, itemid]
    );

    if (existing.rows.length > 0) {
      await pool.query(
        "UPDATE cart SET quantity = quantity + $1 WHERE userid = $2 AND itemid = $3",
        [quantity, userid, itemid]
      );
    } else {
      await pool.query(
        "INSERT INTO cart (userid, itemid, name, price, imageurl, quantity) VALUES ($1, $2, $3, $4, $5, $6)",
        [userid, itemid, name, price, imageurl, quantity]
      );
    }

    res.status(200).json({ message: "Item added to cart" });
  } catch (err) {
    console.error("❌ Error adding to cart:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/:userid", async (req, res) => {
    const { userid } = req.params;
  
    try {
      const result = await pool.query(
        "SELECT * FROM cart WHERE userid = $1",
        [userid]
      );
      res.json(result.rows);
    } catch (err) {
      console.error("❌ Error fetching cart:", err);
      res.status(500).json({ error: "Server error" });
    }
  });

  // DELETE /api/cart/:userid/:itemid
router.delete("/:userid/:itemid", async (req, res) => {
    const { userid, itemid } = req.params;
  
    try {
      await pool.query(
        "DELETE FROM cart WHERE userid = $1 AND itemid = $2",
        [userid, itemid]
      );
      res.status(200).json({ message: "Item removed from cart" });
    } catch (err) {
      console.error("❌ Error deleting item from cart:", err);
      res.status(500).json({ error: "Server error" });
    }
  });
  
  

module.exports = router;