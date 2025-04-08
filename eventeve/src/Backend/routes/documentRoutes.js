// import { writeFile } from "fs/promises";
// import path from "path";
// import { NextResponse } from "next/server";
// import pool from "@/lib/db"; // <-- make sure this is set up

// export async function POST(req) {
//   const data = await req.formData();

//   const businessLicense = data.get("business_license");
//   const governmentId = data.get("government_id");
//   const voidCheque = data.get("void_cheque");
//   const vendorId = data.get("vendorId");

//   const uploadDir = path.join(process.cwd(), "public", "uploads");

//   const saveFile = async (file, filename) => {
//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);
//     const filePath = path.join(uploadDir, filename);
//     await writeFile(filePath, buffer);
//     return filename;
//   };

//   try {
//     const savedFiles = {
//       business_license: await saveFile(businessLicense, businessLicense.name),
//       government_id: await saveFile(governmentId, governmentId.name),
//       void_cheque: await saveFile(voidCheque, voidCheque.name),
//     };

//     // 🔄 Insert or update existing record based on vendor_id
//     await pool.query(
//       `
//       INSERT INTO vendor_documents (vendor_id, business_license, government_id, void_cheque, uploaded_at)
//       VALUES ($1, $2, $3, $4, NOW())
//       ON CONFLICT (vendor_id)
//       DO UPDATE SET
//         business_license = EXCLUDED.business_license,
//         government_id = EXCLUDED.government_id,
//         void_cheque = EXCLUDED.void_cheque,
//         uploaded_at = NOW()
//       `,
//       [
//         vendorId,
//         savedFiles.business_license,
//         savedFiles.government_id,
//         savedFiles.void_cheque,
//       ]
//     );

//     return NextResponse.json({ message: "Uploaded and saved!" });
//   } catch (err) {
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }
