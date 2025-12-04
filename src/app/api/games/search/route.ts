import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") || "";

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [] });
  }

  // Use pg_trgm similarity for fuzzy search
  const results = await prisma.$queryRaw<
    unknown[]
  >`SELECT * FROM "BoardGame" WHERE similarity(name, ${query}) > 0.2 ORDER BY similarity(name, ${query}) DESC LIMIT 20`;

  return NextResponse.json({ results });
}
