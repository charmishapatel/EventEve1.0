const express = require("express");
const router = express.Router();
const pool = require("../config/database");
const admin = require("firebase-admin");

// ✅ Firebase token verification middleware
const verifyFirebaseToken = async (req, res, next) => {
  const token = req.headers.authorization?.split("Bearer ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(403).json({ message: "Invalid token" });
  }
};

//
// 🚀 GET: Fetch vendor profile
//
router.get("/vendor/profile", verifyFirebaseToken, async (req, res) => {
  const { email } = req.user;

  try {
    const result = await pool.query("SELECT * FROM vendors WHERE email = $1", [email]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    const vendor = result.rows[0];

    // Optional: Parse full name into first/last
    const nameParts = vendor.vendorname.split(" ");
    const first_name = nameParts[0] || "";
    const last_name = nameParts.slice(1).join(" ") || "";

    return res.json({
      first_name,
      last_name,
      email: vendor.email,
      contact_number: vendor.phonenumber,
      address: vendor.address || "",
      city: vendor.city || "",
      province: vendor.province || "",
      postal_code: vendor.postalcode || "",
    });
  } catch (error) {
    console.error("Error fetching vendor profile:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
});


//
// ✏️ PUT: Update vendor profile
//
router.put("/vendor/profile", verifyFirebaseToken, async (req, res) => {
  const { email } = req.user;
  const {
    firstName,
    lastName,
    contact,
    street,
    city,
    province,
    postalCode
  } = req.body;

  try {
    const fullName = `${firstName} ${lastName}`;
    const fullAddress = street;

    const updateQuery = `
      UPDATE vendors
      SET 
        vendorname = $1,
        phonenumber = $2,
        address = $3,
        city = $4,
        province = $5,
        postalcode = $6
      WHERE email = $7
    `;

    await pool.query(updateQuery, [
      fullName,
      contact,
      fullAddress,
      city,
      province,
      postalCode,
      email,
    ]);

    return res.status(200).json({ message: "Vendor profile updated successfully" });
  } catch (err) {
    console.error("Profile update error:", err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
