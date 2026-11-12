import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import crypto from "crypto";

// Ensure survey_responses table exists
async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS survey_responses (
      id VARCHAR(64) PRIMARY KEY,
      respondent_name VARCHAR(255) NOT NULL,
      sublink_slug VARCHAR(100) NOT NULL,
      sublink_title VARCHAR(255) NOT NULL,
      target_audience VARCHAR(100) NOT NULL,
      submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      rating NUMERIC(3,1) DEFAULT 5.0,
      sentiment VARCHAR(50) DEFAULT 'Sangat Puas',
      device VARCHAR(100) DEFAULT 'Smartphone (Android)',
      answers JSONB NOT NULL DEFAULT '[]'::jsonb
    );
  `;
}

export async function GET() {
  try {
    await ensureTable();

    const rows = await sql`
      SELECT 
        id,
        respondent_name AS "respondentName",
        sublink_slug AS "sublinkSlug",
        sublink_title AS "sublinkTitle",
        target_audience AS "targetAudience",
        TO_CHAR(submitted_at, 'DD Mon YYYY, HH24:MI') AS "submittedAt",
        rating::float AS rating,
        sentiment,
        device,
        answers
      FROM survey_responses
      ORDER BY submitted_at DESC;
    `;

    return NextResponse.json({ responses: rows || [] });
  } catch (error) {
    console.error("Failed to fetch responses from database:", error);
    return NextResponse.json(
      { error: "Gagal memuat data respon dari database.", responses: [] },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await ensureTable();

    const body = await request.json();
    const {
      respondentName,
      sublinkSlug,
      sublinkTitle,
      targetAudience,
      device,
      rating,
      sentiment,
      answers,
    } = body;

    const id = `RESP-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
    const cleanName = respondentName && String(respondentName).trim() !== ""
      ? String(respondentName).trim()
      : "Anonim";
    const cleanSlug = String(sublinkSlug || "umum").trim().toLowerCase();
    const cleanTitle = String(sublinkTitle || "Kuisioner Program GALAXY");
    const cleanAudience = String(targetAudience || "Umum");
    const cleanDevice = String(device || "Smartphone (Android)");
    const cleanRating = Number(rating) || 5.0;
    const cleanSentiment = String(sentiment || "Sangat Puas");
    const answersJson = JSON.stringify(Array.isArray(answers) ? answers : []);

    // Verify sublink is active in database before accepting response
    const sublinkCheck = await sql`
      SELECT is_active AS "isActive" FROM survey_sublinks WHERE LOWER(slug) = LOWER(${cleanSlug}) LIMIT 1;
    `;
    if (sublinkCheck && sublinkCheck.length > 0 && !sublinkCheck[0].isActive) {
      return NextResponse.json(
        { error: "Kuisioner untuk sublink ini sedang dinonaktifkan oleh administrator." },
        { status: 403 }
      );
    }

    await sql`
      INSERT INTO survey_responses (
        id,
        respondent_name,
        sublink_slug,
        sublink_title,
        target_audience,
        submitted_at,
        rating,
        sentiment,
        device,
        answers
      ) VALUES (
        ${id},
        ${cleanName},
        ${cleanSlug},
        ${cleanTitle},
        ${cleanAudience},
        CURRENT_TIMESTAMP,
        ${cleanRating},
        ${cleanSentiment},
        ${cleanDevice},
        ${answersJson}::jsonb
      );
    `;

    return NextResponse.json({
      success: true,
      message: "Respon kuisioner berhasil disimpan ke database.",
      id,
    });
  } catch (error) {
    console.error("Failed to insert survey response to database:", error);
    return NextResponse.json(
      { error: "Gagal menyimpan respon ke database." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await ensureTable();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      await sql`DELETE FROM survey_responses WHERE id = ${id};`;
      return NextResponse.json({
        success: true,
        message: `Respon ${id} berhasil dihapus dari database.`,
      });
    }

    // Delete all responses
    await sql`TRUNCATE TABLE survey_responses;`;
    return NextResponse.json({
      success: true,
      message: "Seluruh data responden berhasil dibersihkan dari database.",
    });
  } catch (error) {
    console.error("Failed to delete responses from database:", error);
    return NextResponse.json(
      { error: "Gagal menghapus respon dari database." },
      { status: 500 }
    );
  }
}
