const express = require("express");
const router = express.Router();
const pool = require("../../config/database");

// ✅ POST /api/vendor/support
router.post("/support", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const query = `
      INSERT INTO vendor_support_requests (name, email, message, submitted_at)
      VALUES ($1, $2, $3, NOW())
    `;
    await pool.query(query, [name, email, message]);

    res.status(200).json({ message: "Support request submitted successfully!" });
  } catch (err) {
    console.error("❌ Support API error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
