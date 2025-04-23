const express = require("express");
const router = express.Router();
const pool = require("../../config/database");

// GET all vendors
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM vendor_profile ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching vendors:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;