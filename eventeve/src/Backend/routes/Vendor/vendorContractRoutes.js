const express = require("express");
const router = express.Router();
const pool = require("../../config/database");
const verifyFirebaseToken = require("../../middlewares/verifyFirebaseToken");

// ✅ POST Save Contract Agreement
router.post("/", verifyFirebaseToken, async (req, res) => {
    try {
      console.log("📥 Received contract submission");
  
      const { agreed, signature } = req.body;
      const email = req.user.email;
  
      console.log("✅ Email from token:", email);
      console.log("📦 Agreed:", agreed);
      console.log("🖋 Signature length:", signature?.length);
  
      if (!agreed || !signature) {
        console.warn("⚠️ Missing fields");
        return res.status(400).json({ error: "Missing required fields" });
      }
  
      const vendorResult = await pool.query(
        "SELECT vendorid FROM vendors WHERE email = $1",
        [email]
      );
  
      console.log("📄 Vendor result:", vendorResult.rows);
  
      if (vendorResult.rows.length === 0) {
        return res.status(404).json({ error: "Vendor not found" });
      }
  
      const vendorId = vendorResult.rows[0].vendorid;
      console.log("🆔 Vendor ID:", vendorId);
  
      const query = `
        INSERT INTO vendor_contracts (vendorid, agreed, signature, agreed_at)
        VALUES ($1, $2, $3, NOW())
        ON CONFLICT (vendorid)
        DO UPDATE SET 
          agreed = EXCLUDED.agreed,
          signature = EXCLUDED.signature,
          agreed_at = NOW()
      `;
  
      console.log("📤 Executing query...");
      await pool.query(query, [vendorId, agreed, signature]);
      console.log("✅ Contract stored successfully");
  
      res.status(200).json({ message: "Contract submitted successfully" });
  
    } catch (err) {
      console.error("❌ ERROR in contract POST route:");
      console.error(err.stack || err); // full trace
      res.status(500).json({ error: err.message || "Unknown error" });
    }
  });
  
  
// ✅ GET Fetch Saved Signature
router.get("/", verifyFirebaseToken, async (req, res) => {
  try {
    const email = req.user.email;

    const vendorResult = await pool.query(
      "SELECT vendorid FROM vendors WHERE email = $1",
      [email]
    );

    if (vendorResult.rows.length === 0) {
      return res.status(404).json({ error: "Vendor not found" });
    }

    const vendorId = vendorResult.rows[0].vendorid;

    const result = await pool.query(
      "SELECT signature FROM vendor_contracts WHERE vendorid = $1",
      [vendorId]
    );

    res.status(200).json({ signature: result.rows[0]?.signature || null });
  } catch (err) {
    console.error("❌ Error in /api/vendor/contracts GET:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
