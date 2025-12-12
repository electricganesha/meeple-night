import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma/prisma";
import csv from "csv-parser";
import { Readable } from "stream";
import { headers } from "next/headers";
import { auth } from "@/app/lib/auth/auth";

interface BGGGame {
  objectid: string;
  objectname: string;
  yearpublished: string;
  average: string;
  baverage: string;
  minplayers: string;
  maxplayers: string;
  playingtime: string;
  minplaytime: string;
  maxplaytime: string;
  numowned: string;
  imageid: string;
  comment: string;
}

// Helper to convert web ReadableStream to Node.js Readable
function webStreamToNodeStream(
  webStream: ReadableStream<Uint8Array>
): Readable {
  const reader = webStream.getReader();
  return new Readable({
    async read() {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          this.push(null);
          break;
        }
        this.push(Buffer.from(value));
      }
    },
  });
}

async function fetchBGGCSV(username: string, retries = 10): Promise<BGGGame[]> {
  // Step 1: Trigger the export by calling the XML API2 endpoint
  const triggerUrl = `https://boardgamegeek.com/xmlapi2/collection?username=${encodeURIComponent(
    username
  )}&subtype=boardgame&stats=1`;
  console.log(
    "[BGG CSV Fetch] Triggering CSV export for trigger :",
    triggerUrl
  );
  await fetch(triggerUrl); // Don't care about the result, just trigger

  // Step 2: Poll the CSV export endpoint
  const csvUrl = `https://boardgamegeek.com/geekcollection.php?action=exportcsv&subtype=boardgame&username=${encodeURIComponent(
    username
  )}&all=1&exporttype=csv`;
  console.log(
    `[BGG CSV Poll] Starting to poll for CSV export for url: ${csvUrl}`
  );
  for (let i = 0; i < retries; i++) {
    console.log(
      `[BGG CSV Poll] Attempt ${i + 1} of ${retries} for user: ${username}`
    );
    const headers: Record<string, string> = {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 MeepleNightBot/1.0",
      Referer: "https://boardgamegeek.com/",
      Accept:
        "text/csv,application/csv,application/octet-stream;q=0.9,*/*;q=0.8",
    };
    if (process.env.BGG_TOKEN) {
      headers["Authorization"] = `Bearer ${process.env.BGG_TOKEN}`;
    }
    const res = await fetch(csvUrl, { headers });
    console.log("res > ", res);
    if (res.status === 429) {
      console.log(
        `[BGG CSV Poll] Rate limited (429). Waiting 60s before retry...`
      );
      await new Promise((r) => setTimeout(r, 60000));
      continue;
    }
    if (
      res.ok &&
      res.headers.get("content-type")?.includes("comma-separated-values") &&
      res.body
    ) {
      const nodeStream = webStreamToNodeStream(
        res.body as ReadableStream<Uint8Array>
      );
      const results: BGGGame[] = [];
      await new Promise((resolve, reject) => {
        nodeStream
          .pipe(csv())
          .on("data", (data) => results.push(data))
          .on("end", resolve)
          .on("error", reject);
      });
      return results;
    }
    // Not ready, wait longer
    await new Promise((r) => setTimeout(r, 15000));
  }
  console.error(
    `[BGG CSV Poll] CSV export not ready after ${retries} attempts for user: ${username}`
  );
  throw new Error("BGG CSV export not ready after multiple attempts");
}

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ username: string }> }
) {
  const { username } = await context.params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user.id;

  if (!username) {
    return NextResponse.json({ error: "Missing username" }, { status: 400 });
  }

  try {
    console.log("Starting BGG CSV fetch for user:", username);
    const games = await fetchBGGCSV(username);

    // Example: upsert games and add to user's collection

    // TODO: get userId from session or request (for now, just log what would be done)
    for (const game of games) {
      const bggId = Number(game.objectid);
      const name = game.objectname;
      // Check if game already exists
      const existing = await prisma.boardGame.findUnique({ where: { bggId } });
      if (!existing) {
        await prisma.boardGame.create({
          data: {
            bggId,
            name,
            yearPublished: game.yearpublished
              ? Number(game.yearpublished)
              : undefined,
            avgRating: game.average ? Number(game.average) : undefined,
            bayesAvgRating: game.baverage ? Number(game.baverage) : undefined,
            minPlayers: game.minplayers ? Number(game.minplayers) : undefined,
            maxPlayers: game.maxplayers ? Number(game.maxplayers) : undefined,
            mfgPlaytime: game.playingtime
              ? Number(game.playingtime)
              : undefined,
            comMinPlaytime: game.minplaytime
              ? Number(game.minplaytime)
              : undefined,
            comMaxPlaytime: game.maxplaytime
              ? Number(game.maxplaytime)
              : undefined,
            numOwned: game.numowned ? Number(game.numowned) : undefined,
            imagePath: game.imageid || undefined,
            description: game.comment || undefined,
          },
        });
        console.log(`Added new game: ${name} (BGG ID: ${bggId})`);
      } else {
        console.log(`Game already exists: ${name} (BGG ID: ${bggId})`);
      }

      // Here you would also add the game to the user's collection
      if (userId) {
        const gameId = existing
          ? existing.id
          : (await prisma.boardGame.findUnique({ where: { bggId } }))?.id;
        if (gameId) {
          await prisma.user.update({
            where: { id: userId },
            data: {
              collection: {
                connect: { id: gameId },
              },
            },
          });
          console.log(
            `Connected game ID ${gameId} to user ID ${userId}'s collection`
          );
        }
      }
    }

    return NextResponse.json({ success: true, count: games.length });
  } catch (e) {
    const error = e as Error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
