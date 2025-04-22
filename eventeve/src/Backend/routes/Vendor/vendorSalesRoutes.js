const express = require("express");
const router = express.Router();
const pool = require("../../config/database");
const verifyFirebaseToken = require("../../middlewares/verifyFirebaseToken");

// ✅ GET Vendor Sales Report
router.get("/", verifyFirebaseToken, async (req, res) => {
  try {
    const email = req.user.email;

    const vendorRes = await pool.query(
      "SELECT vendorid FROM vendors WHERE email = $1",
      [email]
    );

    if (vendorRes.rows.length === 0) {
      return res.status(404).json({ error: "Vendor not found" });
    }

    const vendorId = vendorRes.rows[0].vendorid;

    const query = `
      SELECT 
        rating,
        total_customers,
        total_income,
        report_month
      FROM vendor_sales
      WHERE vendorid = $1
      ORDER BY report_month
    `;

    const { rows } = await pool.query(query, [vendorId]);

    res.status(200).json({ sales: rows });
  } catch (err) {
    console.error("❌ Sales API error:", err.stack || err.message);
    res.status(500).json({ error: "Failed to fetch sales data" });
  }
});

module.exports = router;
