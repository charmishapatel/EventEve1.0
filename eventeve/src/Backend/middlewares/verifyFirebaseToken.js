const admin = require("firebase-admin");

const verifyFirebaseToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.warn("🚫 No token or malformed token in Authorization header");
    return res.status(401).json({ message: "No token provided or malformed" });
  }

  const idToken = authHeader.split("Bearer ")[1].trim();

  if (!idToken) {
    console.warn("🚫 Token is empty after Bearer");
    return res.status(401).json({ message: "Token is empty" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("🔥 Firebase Token Verification Failed:", error.message);
    return res.status(403).json({ message: "Invalid or expired token", error: error.message });
  }
};

module.exports = verifyFirebaseToken;
