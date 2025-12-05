// src/app/api/sessions/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma/prisma";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { title, description, date, startTime, endTime, userIds, gameIds } =
    await req.json();
  const session = await prisma.gamingSession.update({
    where: { id: Number(params.id) },
    data: {
      title,
      description,
      date: new Date(date),
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      users: { set: userIds.map((id: string) => ({ id })) },
      games: { set: gameIds.map((id: number) => ({ id })) },
    },
  });
  return NextResponse.json(session);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  await prisma.gamingSession.delete({
    where: { id: Number(params.id) },
  });
  return NextResponse.json({ success: true });
}
