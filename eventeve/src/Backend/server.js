const express = require("express");
const cors = require("cors");
const pool = require("./config/database"); // ✅ PostgreSQL connection

// ✅ Firebase Admin SDK Setup
const admin = require("firebase-admin");
const serviceAccount = require("../Firebase/firebase-adminsdk.json"); // Adjust path if needed

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Import Routes
const serviceRoutes = require("./routes/serviceRoutes");
const itemRoutes = require("./routes/itemRoutes");
const cartRoutes = require("./routes/cartRoutes");
const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const bookingCleanupRoute = require("./routes/bookingCleanupRoute");
const userRoutes = require("./routes/userRoutes");
const vendorRoutes = require("./routes/vendorRoutes");




// vendor (you can uncomment and use these when ready)
// const contractRoutes = require("./routes/contractRoutes");
// const documentRoutes = require("./routes/documentRoutes");
// const salesRoutes = require("./routes/salesRoutes");
// const vprofileRoutes = require("./routes/vprofileRoutes");
// const supportRoutes = require("./routes/supportRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Use Routes
app.use("/api", serviceRoutes);
app.use("/api", itemRoutes);
app.use("/api", cartRoutes);
app.use("/api", authRoutes);
// app.use("/api", bookingRoutes);
app.use("/", bookingRoutes); // ✅ Mounts all routes at root level
app.use("/api/payment", paymentRoutes);
app.use("/api/booking-cleanup", bookingCleanupRoute);
app.use("/api", userRoutes);
app.use("/api", vendorRoutes);




// vendor (same here if needed)
// app.use("/api", contractRoutes);
// app.use("/api", documentRoutes);
// app.use("/api", salesRoutes);
// app.use("/api", vprofileRoutes);
// app.use("/api", supportRoutes);

// 🛠️ Dynamic port for deployment
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  try {
    await pool.query("SELECT NOW()");
    console.log("✅ PostgreSQL Connected Successfully");
  } catch (err) {
    console.error("❌ PostgreSQL connection failed:", err);
  }

  console.log(`✅ Server is running on port ${PORT}`);
});
