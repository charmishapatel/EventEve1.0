// import pool from '../../../../lib/db';

// export async function GET() {
//   try {
//     const result = await pool.query('SELECT * FROM vendor_profile WHERE id = 1');
//     return Response.json(result.rows[0]);
//   } catch (error) {
//     return Response.json({ error: error.message }, { status: 500 });
//   }
// }

// export async function PUT(req) {
//   try {
//     const body = await req.json();
//     const {
//       firstName,
//       lastName,
//       email,
//       contact,
//       street,
//       city,
//       province,
//       postalCode,
//     } = body;

//     const query = `
//       UPDATE vendor_profile SET
//         first_name = $1,
//         last_name = $2,
//         email = $3,
//         contact_number = $4,
//         address = $5,
//         city = $6,
//         province = $7,
//         postal_code = $8
//       WHERE id = 1
//     `;

//     const values = [
//       firstName,
//       lastName,
//       email,
//       contact,
//       street,
//       city,
//       province,
//       postalCode,
//     ];

//     await pool.query(query, values);
//     return Response.json({ message: 'Profile updated successfully' });
//   } catch (error) {
//     return Response.json({ error: error.message }, { status: 500 });
//   }
// }
