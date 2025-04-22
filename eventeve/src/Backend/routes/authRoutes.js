const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const pool = require("../config/database");

// 🔐 Middleware to verify Firebase ID token
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
// 👤 USER SIGNUP
//
router.post("/signup/user", verifyFirebaseToken, async (req, res) => {
  const { email } = req.user;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (result.rows.length > 0) {
      return res.status(200).json({ message: "User already exists" });
    }

    await pool.query(
      `INSERT INTO users (username, email, password, phonenumber, address)
       VALUES ($1, $2, $3, $4, $5)`,
      ["New User", email, "firebase_auth", "+1-000-000-0000", "Default Address"]
    );

    return res.status(201).json({ message: "User inserted into PostgreSQL ✅" });
  } catch (err) {
    console.error("❌ User insert error:", err.stack);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//
// 🧑‍💼 VENDOR SIGNUP (uses first_name and last_name instead of vendorname)
//
router.post("/signup/vendor", verifyFirebaseToken, async (req, res) => {
  const { email } = req.user;
  console.log("📥 Signup requested for vendor:", email);

  try {
    const result = await pool.query("SELECT * FROM vendors WHERE email = $1", [email]);
    if (result.rows.length > 0) {
      return res.status(200).json({ message: "Vendor already exists" });
    }

    await pool.query(
      `INSERT INTO vendors (adminid, first_name, last_name, email, password, phonenumber, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [1, "New", "Vendor", email, "firebase_auth", "+1-000-000-0000", "Pending"]
    );

    return res.status(201).json({ message: "Vendor inserted into PostgreSQL ✅" });
  } catch (err) {
    console.error("❌ Vendor insert error:", err.stack);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//
// 🔐 LOGIN ROUTE (returns role + status)
//
router.post("/login", verifyFirebaseToken, async (req, res) => {
  const { email } = req.user;

  try {
    // Check vendor first
    const vendorResult = await pool.query("SELECT status FROM vendors WHERE email = $1", [email]);
    if (vendorResult.rows.length > 0) {
      return res.status(200).json({
        role: "vendor",
        status: vendorResult.rows[0].status,
      });
    }

    // Check user second
    const userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userResult.rows.length > 0) {
      return res.status(200).json({
        role: "user",
        status: "Active",
      });
    }

    return res.status(404).json({ message: "User not found in database" });

  } catch (err) {
    console.error("❌ Login verification error:", err.stack);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
