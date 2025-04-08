// import { NextResponse } from "next/server";
// import pool from "@/lib/db";

// export async function POST(req) {
//   try {
//     const { name, email, message } = await req.json();

//     // Validate input
//     if (!name || !email || !message) {
//       return NextResponse.json({ error: "Missing fields" }, { status: 400 });
//     }

//     const query = `
//       INSERT INTO vendor_support_requests (name, email, message)
//       VALUES ($1, $2, $3)
//     `;
//     await pool.query(query, [name, email, message]);

//     return NextResponse.json({ success: true });
//   } catch (err) {
//     console.error("Support API error:", err);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }
