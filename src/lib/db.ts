import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  // During build or SSR, warn if not set
  if (process.env.NODE_ENV === "production" && !process.env.DATABASE_URL) {
    console.warn("DATABASE_URL is not set.");
  }
}

export const sql = neon(process.env.DATABASE_URL || "");
