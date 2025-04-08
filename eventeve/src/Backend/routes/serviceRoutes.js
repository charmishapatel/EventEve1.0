const express = require("express");
const router = express.Router();
const pool = require("../config/database");

// ✅ GET all services
router.get("/services", async (req, res) => {
    try {
        const result = await pool.query("SELECT serviceID, serviceName, description, imageURL FROM Services");
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ GET single service details by ID (with items)
router.get("/service/:serviceId", async (req, res) => {
    try {
        const { serviceId } = req.params;

        // Fetch service details
        const serviceQuery = "SELECT * FROM Services WHERE serviceID = $1";
        const serviceResult = await pool.query(serviceQuery, [serviceId]);

        if (serviceResult.rows.length === 0) {
            return res.status(404).json({ error: "Service Not Found" });
        }

        const serviceDetails = serviceResult.rows[0];

        // Map serviceID to corresponding item table
        const serviceMap = {
            1: "Furniture",
            2: "Catering",
            3: "Karaoke",
            4: "Decoration",
            5: "Flower",
            6: "Cake"
        };

        const tableName = serviceMap[serviceId];

        if (!tableName) {
            return res.status(400).json({ error: "Invalid service ID" });
        }

        // Fetch items related to this service
        const itemQuery = `SELECT * FROM ${tableName} WHERE serviceID = $1`;
        const itemResult = await pool.query(itemQuery, [serviceId]);

        // Return service details along with items
        res.json({
            ...serviceDetails,
            items: itemResult.rows
        });

    } catch (error) {
        console.error("Error fetching service details:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
