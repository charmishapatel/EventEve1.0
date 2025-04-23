const express = require("express");
const router = express.Router();
const pool = require("../../config/database");

// ✅ GET all user booking requests
router.get("/user-bookings", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT bookingid, firstname, lastname, servicename, otherinformation FROM booking ORDER BY bookingid ASC`
    );
    res.json(result.rows);
  } catch (error) {
    console.error("❌ Error fetching user bookings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ GET booking detail by bookingid
router.get("/booking/:bookingid", async (req, res) => {
  const { bookingid } = req.params;

  try {
    const result = await pool.query("SELECT * FROM booking WHERE bookingid = $1", [bookingid]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("❌ Booking fetch error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
