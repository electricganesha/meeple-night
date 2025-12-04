import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma/prisma";
import { headers } from "next/headers";
import { auth } from "@/app/lib/auth/auth";

export async function POST(req: NextRequest) {
  const { gameId } = await req.json();
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user.id;
  if (!userId || !gameId)
    return NextResponse.json({ error: "Missing data" }, { status: 400 });

  await prisma.user.update({
    where: { id: userId },
    data: {
      collection: { disconnect: { id: gameId } },
    },
  });
  return NextResponse.json({ success: true });
}
