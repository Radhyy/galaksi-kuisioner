import { NextRequest, NextResponse, connection } from "next/server";
import { sql } from "@/lib/db";

export async function GET(request: NextRequest) {
  await connection();
  try {
    const sessionToken = request.cookies.get("galaksi_session")?.value;

    if (!sessionToken) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    // Query session joined with admin
    const sessions = await sql`
      SELECT 
        s.id AS session_id,
        s.expires_at,
        a.id AS admin_id,
        a.username,
        a.email,
        a.name
      FROM admin_sessions s
      JOIN admins a ON s.admin_id = a.id
      WHERE s.id = ${sessionToken}
        AND s.expires_at > CURRENT_TIMESTAMP
      LIMIT 1;
    `;

    if (!sessions || sessions.length === 0) {
      // Session expired or invalid, clean up cookie
      cookieStore.delete("galaksi_session");
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const session = sessions[0];
    return NextResponse.json({
      authenticated: true,
      user: {
        id: session.admin_id,
        username: session.username,
        email: session.email,
        name: session.name,
      },
    });
  } catch (error: any) {
    console.error("Auth check error:", error);
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}
