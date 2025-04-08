// import { NextResponse } from "next/server";
// import pool from "@/lib/db";

// export async function POST(req) {
//   try {
//     const { vendorId, agreed, signature } = await req.json();

//     const query = `
//       INSERT INTO vendor_contracts (vendor_id, agreed, signature)
//       VALUES ($1, $2, $3)
//       ON CONFLICT (vendor_id) DO UPDATE
//       SET agreed = $2, signature = $3, signed_at = CURRENT_TIMESTAMP
//     `;

//     await pool.query(query, [vendorId, agreed, signature]);

//     return NextResponse.json({ message: "Contract submitted!" });
//   } catch (err) {
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }

// export async function GET() {
//   try {
//     const vendorId = 1; // or retrieve dynamically from session
//     const query = `
//       SELECT signature FROM vendor_contracts
//       WHERE vendor_id = $1
//     `;

//     const { rows } = await pool.query(query, [vendorId]);
//     if (rows.length === 0) {
//       return NextResponse.json({ error: "No contract found" }, { status: 404 });
//     }

//     return NextResponse.json({ signature: rows[0].signature });
//   } catch (err) {
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }
