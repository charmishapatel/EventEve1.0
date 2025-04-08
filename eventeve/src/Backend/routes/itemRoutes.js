const express = require("express");
const router = express.Router();
const pool = require("../config/database");

// ✅ Fetch Item Details by Name
router.get("/item/name/:itemName", async (req, res) => {
  try {
    let { itemName } = req.params;

    // Decode URL-encoded item names
    itemName = decodeURIComponent(itemName).trim();
    console.log("🔍 Searching for item:", itemName);

    const query = `
      SELECT id, name, price, description, vendorid, imageurl1, imageurl2, imageurl3
      FROM (
          SELECT furnitureid AS id, furniturename AS name, price, description, vendorid, 
                 imageurl1, imageurl2, imageurl3
          FROM Furniture

          UNION ALL

          SELECT cakeid AS id, cakename AS name, price, description, vendorid, 
                 imageurl1, NULL AS imageurl2, NULL AS imageurl3
          FROM Cake

          UNION ALL

          SELECT decorationid AS id, decorationname AS name, price, description, vendorid, 
                 imageurl1, imageurl2, imageurl3
          FROM Decoration

          UNION ALL

          SELECT bandid AS id, bandname AS name, price, description, vendorid, 
                 imageurl1, NULL AS imageurl2, NULL AS imageurl3
          FROM Karaoke

          UNION ALL

          SELECT mealid AS id, mealname AS name, price, description, vendorid, 
                 imageurl1, NULL AS imageurl2, NULL AS imageurl3
          FROM Catering

          UNION ALL

          SELECT flowerid AS id, flowername AS name, price, description, vendorid, 
                 imageurl1, NULL AS imageurl2, NULL AS imageurl3
          FROM Flower
      ) AS all_items
      WHERE LOWER(name) = LOWER($1)
    `;

    const result = await pool.query(query, [itemName]);

    if (result.rows.length === 0) {
      console.error("❌ Item Not Found:", itemName);
      return res.status(404).json({ error: "Item Not Found" });
    }

    console.log("✅ Fetched Item:", result.rows[0]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("❌ Error fetching item details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Export Router
module.exports = router;
