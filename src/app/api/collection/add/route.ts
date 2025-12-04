import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma/prisma";
import { auth } from "@/app/lib/auth/auth";
import { headers } from "next/headers";

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
      collection: { connect: { id: gameId } },
    },
  });

  return NextResponse.json({ success: true });
}
