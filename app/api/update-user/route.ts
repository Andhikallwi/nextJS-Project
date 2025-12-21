import bcrypt from 'bcrypt';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET() {
    try {
        const hashedPassword = await bcrypt.hash('L200230227', 10);

        await sql`
      UPDATE users 
      SET name = 'Andhika', 
          email = 'andhika@gmail.com', 
          password = ${hashedPassword}
      WHERE id = '410544b2-4001-4271-9855-fec4b6a6442a'
    `;

        return Response.json({ message: 'User updated successfully to andhika@gmail.com' });
    } catch (error) {
        return Response.json({ error: String(error) }, { status: 500 });
    }
}
