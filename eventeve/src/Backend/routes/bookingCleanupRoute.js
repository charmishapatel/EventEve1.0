const express = require("express");
const router = express.Router();
const pool = require("../config/database");

router.post("/payment-success", async (req, res) => {
  const { userid } = req.body;

  try {
    // Step 1: Get all items from the user's cart
    const cartItems = await pool.query("SELECT * FROM cart WHERE userid = $1", [userid]);

    // Step 2: Loop through each item and delete from respective table
    for (const item of cartItems.rows) {
      const itemid = item.itemid;

      // Delete from Furniture (you can extend this logic for other service tables)
      await pool.query("DELETE FROM Furniture WHERE furnitureid = $1", [itemid]);
      // Repeat for other tables if needed (Cake, Flower, etc.)
    }

    // Step 3: Clear the user's cart
    await pool.query("DELETE FROM cart WHERE userid = $1", [userid]);

    res.status(200).json({ message: "Cart and item data cleaned up successfully" });
  } catch (err) {
    console.error("❌ Error during payment cleanup:", err);
    res.status(500).json({ error: "Cleanup failed" });
  }
});

module.exports = router;