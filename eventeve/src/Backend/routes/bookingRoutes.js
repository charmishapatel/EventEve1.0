const express = require("express");
const router = express.Router();
const pool = require("../config/database");

// Route to create a booking
router.post("/booking", async (req, res) => {
  const { firstName, lastName, eventDate, deliveryAddress, otherInformation } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO Booking (firstName, lastName, eventDate, deliveryAddress, otherInformation)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [firstName, lastName, eventDate, deliveryAddress, otherInformation]
    );

    console.log("Insert result:", result.rows[0]);
    res.status(201).json({ success: true, booking: result.rows[0] });
  } catch (err) {
    console.error("Booking insert error:", err);
    res.status(500).json({ success: false, message: "Booking creation failed" });
  }
});

module.exports = router;
