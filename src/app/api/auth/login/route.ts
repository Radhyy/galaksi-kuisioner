import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { sql } from "@/lib/db";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { identifier, password } = body;

    if (!identifier || !password) {
      return NextResponse.json(
        { error: "Email/username dan kata sandi wajib diisi." },
        { status: 400 }
      );
    }

    const cleanIdentifier = String(identifier).trim().toLowerCase();

    // Query admin by username or email
    const users = await sql`
      SELECT id, username, email, password_hash, name 
      FROM admins 
      WHERE LOWER(username) = ${cleanIdentifier} OR LOWER(email) = ${cleanIdentifier}
      LIMIT 1;
    `;

    if (!users || users.length === 0) {
      return NextResponse.json(
        { error: "Email/username atau kata sandi tidak valid." },
        { status: 401 }
      );
    }

    const admin = users[0];
    const passwordMatch = await bcrypt.compare(password, admin.password_hash);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Email/username atau kata sandi tidak valid." },
        { status: 401 }
      );
    }

    // Generate secure session token
    const sessionToken = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    // Store in admin_sessions
    await sql`
      INSERT INTO admin_sessions (id, admin_id, expires_at)
      VALUES (${sessionToken}, ${admin.id}, ${expiresAt});
    `;

    // Set HTTP-only session cookie
    const cookieStore = await cookies();
    cookieStore.set("galaksi_session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
    });

    return NextResponse.json({
      success: true,
      user: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        name: admin.name,
      },
    });
  } catch (error: any) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server saat memproses login." },
      { status: 500 }
    );
  }
}
