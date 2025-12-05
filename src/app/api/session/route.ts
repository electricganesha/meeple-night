// src/app/api/sessions/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma/prisma";

export async function GET() {
  const sessions = await prisma.gamingSession.findMany({
    include: { users: true, games: true },
  });
  return NextResponse.json(sessions);
}

export async function POST(req: NextRequest) {
  const { title, description, date, startTime, endTime, userIds, gameIds } =
    await req.json();
  // Validate input as needed
  const session = await prisma.gamingSession.create({
    data: {
      title,
      description,
      date: new Date(date),
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      users: { connect: userIds.map((id: string) => ({ id })) },
      games: { connect: gameIds.map((id: number) => ({ id })) },
    },
  });
  return NextResponse.json(session);
}
