// import { NextResponse } from "next/server";
// import pool from "@/lib/db";

// export async function GET() {
//   try {
//     const vendorId = 1; // Replace this with actual session-based ID in production

//     const query = `
//       SELECT 
//         rating,
//         total_customers,
//         total_income,
//         report_month
//       FROM vendor_sales
//       WHERE vendor_id = $1
//       ORDER BY report_month
//     `;

//     const { rows } = await pool.query(query, [vendorId]);

//     return NextResponse.json({ sales: rows });
//   } catch (err) {
//     console.error("Sales API error:", err.message);
//     return NextResponse.json({ error: "Failed to fetch sales data" }, { status: 500 });
//   }
// }
