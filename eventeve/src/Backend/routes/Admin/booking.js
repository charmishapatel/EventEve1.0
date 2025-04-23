const express = require("express");
const router = express.Router();
const pool = require("../../config/database");


router.get("/booking", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM booking");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;