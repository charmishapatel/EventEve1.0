// const express = require("express");
// const router = express.Router();
// const pool = require("../config/database");

// // ✅ GET all users
// router.get("/users", async (req, res) => {
//   try {
//     const result = await pool.query("SELECT * FROM Users");
//     res.json(result.rows);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

// // ✅ GET a single user by ID
// router.get("/users/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await pool.query("SELECT * FROM Users WHERE userID = $1", [id]);
//     res.json(result.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

// // ✅ CREATE a new user
// router.post("/users", async (req, res) => {
//   try {
//     const { userName, email, password, phoneNumber, address } = req.body;
//     const result = await pool.query(
//       "INSERT INTO Users (userName, email, password, phoneNumber, address) VALUES ($1, $2, $3, $4, $5) RETURNING *",
//       [userName, email, password, phoneNumber, address]
//     );
//     res.json(result.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

// // ✅ UPDATE a user
// router.put("/users/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { userName, email, phoneNumber, address } = req.body;
//     await pool.query(
//       "UPDATE Users SET userName = $1, email = $2, phoneNumber = $3, address = $4 WHERE userID = $5",
//       [userName, email, phoneNumber, address, id]
//     );
//     res.send("User Updated Successfully");
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

// // ✅ DELETE a user
// router.delete("/users/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     await pool.query("DELETE FROM Users WHERE userID = $1", [id]);
//     res.send("User Deleted Successfully");
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const pool = require("../config/database");

// ✅ GET all users
router.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM Users");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// ✅ Get user info by email
router.get("/userinfo/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const result = await pool.query(
      "SELECT username, email, phonenumber, address FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error("❌ Error fetching user:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;