const express = require("express");
const router = express.Router();
const pool = require("../../config/database");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const verifyFirebaseToken = require("../../middlewares/verifyFirebaseToken");

// 📁 Create local upload directory if it doesn't exist
const uploadDir = path.join(__dirname, "../../public/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 📦 Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + "_" + file.originalname),
});

const upload = multer({ storage });

// ✅ POST /api/vendor/documents/upload
router.post(
  "/documents/upload",
  verifyFirebaseToken,
  (req, res, next) => {
    upload.fields([
      { name: "business_license", maxCount: 1 },
      { name: "government_id", maxCount: 1 },
      { name: "void_cheque", maxCount: 1 },
    ])(req, res, function (err) {
      if (err) {
        console.error("🔥 Multer error:", err);
        return res.status(500).json({ error: "Multer file upload failed." });
      }
      next();
    });
  },
  async (req, res) => {
    const email = req.user.email;
    const files = req.files;

    const businessLicense = files.business_license?.[0]?.filename || null;
    const governmentId = files.government_id?.[0]?.filename || null;
    const voidCheque = files.void_cheque?.[0]?.filename || null;

    try {
      // 🔍 Get vendorid from vendors table
      const vendorResult = await pool.query(
        "SELECT vendorid FROM vendors WHERE email = $1",
        [email]
      );

      if (vendorResult.rows.length === 0) {
        return res.status(404).json({ error: "Vendor not found." });
      }

      const vendorId = vendorResult.rows[0].vendorid;

      // 🧾 Insert or update document record
      await pool.query(
        `
        INSERT INTO vendor_documents (vendorid, business_license, government_id, void_cheque, uploaded_at)
        VALUES ($1, $2, $3, $4, NOW())
        ON CONFLICT (vendorid)
        DO UPDATE SET
          business_license = EXCLUDED.business_license,
          government_id = EXCLUDED.government_id,
          void_cheque = EXCLUDED.void_cheque,
          uploaded_at = NOW()
        `,
        [vendorId, businessLicense, governmentId, voidCheque]
      );

      res.status(200).json({ message: "Documents uploaded successfully!" });
    } catch (err) {
      console.error("❌ DB Upload error:", err);
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;
