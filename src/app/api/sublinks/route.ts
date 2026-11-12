import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { defaultSublinks, SurveySublink } from "@/lib/surveyStore";

// Ensure survey_sublinks table exists and is seeded with defaults
async function ensureSublinksTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS survey_sublinks (
      id VARCHAR(64) PRIMARY KEY,
      slug VARCHAR(100) UNIQUE NOT NULL,
      title VARCHAR(255) NOT NULL,
      target_audience VARCHAR(100) NOT NULL,
      description TEXT NOT NULL,
      is_active BOOLEAN NOT NULL DEFAULT true,
      estimated_minutes INT DEFAULT 3,
      last_updated VARCHAR(100) DEFAULT 'Hari ini',
      questions JSONB NOT NULL DEFAULT '[]'::jsonb
    );
  `;

  // Check if table is empty
  const countResult = await sql`SELECT COUNT(*)::int AS count FROM survey_sublinks;`;
  const count = countResult[0]?.count || 0;

  if (count === 0) {
    for (const sub of defaultSublinks) {
      await sql`
        INSERT INTO survey_sublinks (
          id, slug, title, target_audience, description, is_active, estimated_minutes, last_updated, questions
        ) VALUES (
          ${sub.id},
          ${sub.slug},
          ${sub.title},
          ${sub.targetAudience},
          ${sub.description},
          ${sub.isActive},
          ${sub.estimatedMinutes},
          ${sub.lastUpdated},
          ${JSON.stringify(sub.questions)}::jsonb
        )
        ON CONFLICT (slug) DO NOTHING;
      `;
    }
  }
}

export async function GET(request: NextRequest) {
  try {
    await ensureSublinksTable();
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (slug) {
      const rows = await sql`
        SELECT 
          id,
          slug,
          title,
          target_audience AS "targetAudience",
          description,
          is_active AS "isActive",
          estimated_minutes AS "estimatedMinutes",
          last_updated AS "lastUpdated",
          questions
        FROM survey_sublinks
        WHERE LOWER(slug) = LOWER(${slug})
        LIMIT 1;
      `;

      if (!rows || rows.length === 0) {
        return NextResponse.json({ error: "Sublink tidak ditemukan" }, { status: 404 });
      }

      return NextResponse.json({ sublink: rows[0] });
    }

    const rows = await sql`
      SELECT 
        id,
        slug,
        title,
        target_audience AS "targetAudience",
        description,
        is_active AS "isActive",
        estimated_minutes AS "estimatedMinutes",
        last_updated AS "lastUpdated",
        questions
      FROM survey_sublinks
      ORDER BY id ASC;
    `;

    return NextResponse.json({ sublinks: rows || [] });
  } catch (error) {
    console.error("Failed to fetch sublinks from database:", error);
    return NextResponse.json(
      { error: "Gagal memuat data sublink.", sublinks: [] },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await ensureSublinksTable();
    const body = await request.json();
    const { id, isActive } = body;

    if (!id) {
      return NextResponse.json({ error: "ID sublink wajib disertakan." }, { status: 400 });
    }

    await sql`
      UPDATE survey_sublinks
      SET is_active = ${Boolean(isActive)}
      WHERE id = ${id};
    `;

    return NextResponse.json({
      success: true,
      message: `Status sublink berhasil diubah menjadi ${isActive ? "Aktif" : "Nonaktif"}.`,
    });
  } catch (error) {
    console.error("Failed to update sublink status:", error);
    return NextResponse.json(
      { error: "Gagal memperbarui status sublink di database." },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await ensureSublinksTable();
    const body = await request.json();
    const { id, title, slug, targetAudience, description, estimatedMinutes, lastUpdated } = body;

    if (!id || !title || !slug) {
      return NextResponse.json(
        { error: "ID, judul, dan slug sublink wajib disertakan." },
        { status: 400 }
      );
    }

    await sql`
      UPDATE survey_sublinks
      SET 
        title = ${title},
        slug = ${slug},
        target_audience = ${targetAudience || "Umum"},
        description = ${description || ""},
        estimated_minutes = ${Number(estimatedMinutes) || 3},
        last_updated = ${lastUpdated || "Hari ini"}
      WHERE id = ${id};
    `;

    return NextResponse.json({
      success: true,
      message: "Data sublink berhasil diperbarui di database.",
    });
  } catch (error) {
    console.error("Failed to update sublink:", error);
    return NextResponse.json(
      { error: "Gagal memperbarui sublink di database." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await ensureSublinksTable();
    const sub = await request.json();
    if (!sub.id || !sub.slug || !sub.title) {
      return NextResponse.json(
        { error: "ID, slug, dan judul sublink wajib disertakan." },
        { status: 400 }
      );
    }

    await sql`
      INSERT INTO survey_sublinks (
        id, slug, title, target_audience, description, is_active, estimated_minutes, last_updated, questions
      ) VALUES (
        ${sub.id},
        ${sub.slug},
        ${sub.title},
        ${sub.targetAudience || "Umum"},
        ${sub.description || ""},
        ${sub.isActive !== undefined ? Boolean(sub.isActive) : true},
        ${Number(sub.estimatedMinutes) || 3},
        ${sub.lastUpdated || "Hari ini"},
        ${JSON.stringify(sub.questions || [])}::jsonb
      )
      ON CONFLICT (slug) DO UPDATE
      SET 
        title = EXCLUDED.title,
        target_audience = EXCLUDED.target_audience,
        description = EXCLUDED.description,
        estimated_minutes = EXCLUDED.estimated_minutes,
        last_updated = EXCLUDED.last_updated;
    `;

    return NextResponse.json({
      success: true,
      message: "Sublink berhasil disimpan ke database.",
    });
  } catch (error) {
    console.error("Failed to create sublink:", error);
    return NextResponse.json(
      { error: "Gagal membuat sublink di database." },
      { status: 500 }
    );
  }
}

