// routes/reports.js
const express = require("express");
const router = express.Router();
const pool = require("../../config/database");


// Get all services
router.get("/services", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM services");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching services:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;