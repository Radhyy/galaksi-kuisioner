import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { sql } from "@/lib/db";

export async function POST(_request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("galaksi_session")?.value;

    if (sessionToken) {
      await sql`
        DELETE FROM admin_sessions WHERE id = ${sessionToken};
      `;
    }

    cookieStore.delete("galaksi_session");

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Logout API error:", error);
    return NextResponse.json(
      { error: "Gagal memproses logout." },
      { status: 500 }
    );
  }
}
