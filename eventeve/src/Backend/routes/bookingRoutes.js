const express = require("express");
const router = express.Router();
const pool = require("../config/database");

// 🔎 Quick test route
router.get("/test", (req, res) => {
  res.send("✅ Booking routes working!");
});

// 🔁 Real booking route
router.post("/booking", async (req, res) => {
  const { firstname, lastname, eventdate, deliveryaddress, otherinformation } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO booking (firstname, lastname, eventdate, deliveryaddress, otherinformation)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [firstname, lastname, eventdate, deliveryaddress, otherinformation]
    );

    res.status(201).json({ success: true, booking: result.rows[0] });
  } catch (err) {
    console.error("Booking insert error:", err);
    res.status(500).json({ success: false, message: "Booking creation failed" });
  }
});

module.exports = router;
