const express = require("express");
const router = express.Router();
const pool = require("../../config/database");
const verifyFirebaseToken = require("../../middlewares/verifyFirebaseToken");

// ✅ GET Vendor Profile (by Firebase email)
// ✅ These should be relative to /api/vendor
router.get("/profile", verifyFirebaseToken, async (req, res) => {
    const email = req.user.email;
    try {
      const result = await pool.query("SELECT * FROM vendors WHERE email = $1", [email]);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Vendor not found" });
      }
  
      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error("🔥 Error fetching vendor:", error);
      res.status(500).json({ error: error.message });
    }
  });
  
  router.put("/profile", verifyFirebaseToken, async (req, res) => {
    const {
      firstName,
      lastName,
      email,
      contact,
      street,
      city,
      province,
      postalCode,
    } = req.body;
  
    try {
      await pool.query(
        `UPDATE vendors SET
          first_name = $1,
          last_name = $2,
          phonenumber = $3,
          address = $4,
          city = $5,
          province = $6,
          postal_code = $7
        WHERE email = $8`,
        [firstName, lastName, contact, street, city, province, postalCode, email]
      );
  
      res.status(200).json({ message: "Vendor profile updated successfully" });
    } catch (error) {
      console.error("🔥 Error updating vendor:", error);
      res.status(500).json({ error: error.message });
    }
  });
  

// ✅ PUT Vendor Profile Update
router.put("/vendor/profile", verifyFirebaseToken, async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    contact,
    street,
    city,
    province,
    postalCode,
  } = req.body;

  try {
    await pool.query(
      `UPDATE vendors SET
        first_name = $1,
        last_name = $2,
        phonenumber = $3,
        address = $4,
        city = $5,
        province = $6,
        postal_code = $7
      WHERE email = $8`,
      [firstName, lastName, contact, street, city, province, postalCode, email]
    );

    res.status(200).json({ message: "Vendor profile updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
