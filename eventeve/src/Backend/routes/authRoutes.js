const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const pool = require("../config/database"); // Update if your DB file name is different

// 🔐 Middleware: Verify Firebase Token
const verifyFirebaseToken = async (req, res, next) => {
  const token = req.headers.authorization?.split("Bearer ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("❌ Token verification error:", error);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

// 👤 /signup/user
router.post("/signup/user", verifyFirebaseToken, async (req, res) => {
  const { email, uid } = req.user;

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
    console.error("❌ DB insert error (user):", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// 🧑‍💼 /signup/vendor
router.post("/signup/vendor", verifyFirebaseToken, async (req, res) => {
  const { email, uid } = req.user;

  try {
    const result = await pool.query("SELECT * FROM vendor WHERE email = $1", [email]);
    if (result.rows.length > 0) {
      return res.status(200).json({ message: "Vendor already exists" });
    }

    await pool.query(
      `INSERT INTO vendor (adminid, vendorname, email, phonenumber, status, password)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [1, "New Vendor", email, "+1-000-000-0000", "Pending", "firebase_auth"]
    );

    return res.status(201).json({ message: "Vendor inserted into PostgreSQL ✅" });
  } catch (err) {
    console.error("❌ DB insert error (vendor):", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// 🔐 /login
router.post("/login", verifyFirebaseToken, async (req, res) => {
  const { email } = req.user;

  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (user.rows.length > 0) {
      return res.status(200).json({ role: "user" });
    }

    const vendor = await pool.query("SELECT * FROM vendor WHERE email = $1", [email]);
    if (vendor.rows.length > 0) {
      return res.status(200).json({ role: "vendor" });
    }

    return res.status(404).json({ message: "User not found in database" });
  } catch (err) {
    console.error("❌ Login check error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
