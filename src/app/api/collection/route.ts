// src/app/api/collection/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma/prisma";
import { headers } from "next/headers";
import { auth } from "@/app/lib/auth/auth";

export async function GET(_req: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user.id;
  if (!userId)
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { collection: { orderBy: { name: "asc" } } },
  });
  return NextResponse.json({ games: user?.collection ?? [] });
}
