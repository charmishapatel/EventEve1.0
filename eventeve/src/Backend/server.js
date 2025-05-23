const express = require("express");
const cors = require("cors");
const pool = require("./config/database");

const admin = require("firebase-admin");
const serviceAccount = require("../Firebase/firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Import Routes
const serviceRoutes = require("./routes/serviceRoutes");
const itemRoutes = require("./routes/itemRoutes");
const cartRoutes = require("./routes/cartRoutes");
const authRoutes = require("./routes/authRoutes");
//const bookingRoutes = require("./routes/bookingRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const bookingCleanupRoute = require("./routes/bookingCleanupRoute");
const userRoutes = require("./routes/userRoutes");
const vendorRoutes = require("./routes/Admin/vendorRoutes");
const reportsRoutes = require("./routes/Admin/reports");
const bookingRoutes = require("./routes/Admin/booking");
const userBookingRoutes = require("./routes/Admin/userBookingRoutes");


// VENDOR
const vendorProfileRoutes = require("./routes/Vendor/vendorProfileRoutes");
const vendorDocumentRoutes = require("./routes/Vendor/vendorDocumentRoutes");
const vendorContractRoutes = require("./routes/Vendor/vendorContractRoutes"); 
const vendorSalesRoutes = require("./routes/Vendor/vendorSalesRoutes");
const vendorSupportRoutes = require("./routes/Vendor/vendorSupportRoutes");

// AI
const askRoutes = require("./routes/AIChatAssistant/askRoutes");



// ✅ Use Routes USER
app.use("/api", serviceRoutes);
app.use("/api", itemRoutes);
app.use("/api", cartRoutes);
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/booking-cleanup", bookingCleanupRoute);
//app.use("/", bookingRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api", reportsRoutes);
app.use("/api", bookingRoutes);
app.use("/api/admin", userBookingRoutes);


// VENDOR
app.use("/api/vendor", vendorProfileRoutes); 
app.use("/api/vendor", vendorDocumentRoutes);
app.use("/api/vendor/contracts", vendorContractRoutes);
app.use("/api/vendor/sales", vendorSalesRoutes);
app.use("/api/vendor", vendorSupportRoutes);

// AI
app.use("/api/ask", askRoutes);


// ✅ Start Server
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
