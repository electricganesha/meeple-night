import { NextRequest, NextResponse } from "next/server";
import { parseStringPromise } from "xml2js";

const BGG_API_ROOT = "https://boardgamegeek.com/xmlapi2";

interface Item {
  $: {
    id: string;
  };
  name: Array<{
    $: {
      value: string;
    };
  }>;
  minplayers: Array<{
    $: {
      value: string;
    };
  }>;
  maxplayers: Array<{
    $: {
      value: string;
    };
  }>;
  minplaytime: Array<{
    $: {
      value: string;
    };
  }>;
  maxplaytime: Array<{
    $: {
      value: string;
    };
  }>;
  yearpublished: Array<{
    $: {
      value: string;
    };
  }>;
  image: Array<string>;
  thumbnail: Array<string>;
}

interface Game {
  $: { id: string };
  name: { $: { value: string } }[];
  minplayers: { $: { value: string } }[];
  maxplayers: { $: { value: string } }[];
  minplaytime: { $: { value: string } }[];
  maxplaytime: { $: { value: string } }[];
  yearpublished: { $: { value: string } }[];
  image: string;
  thumbnail: string;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name") || "";
  const minPlayers = Number.parseInt(searchParams.get("minPlayers") || "0", 10);
  const maxPlayers = Number.parseInt(
    searchParams.get("maxPlayers") || "99",
    10
  );
  const minDuration = Number.parseInt(
    searchParams.get("minDuration") || "0",
    10
  );
  const maxDuration = Number.parseInt(
    searchParams.get("maxDuration") || "9999",
    10
  );

  // Search for games by name
  const searchUrl = `${BGG_API_ROOT}/search?query=${encodeURIComponent(
    name
  )}&type=boardgame`;
  const searchRes = await fetch(searchUrl);

  const searchXml = await searchRes.text();

  const searchJson = await parseStringPromise(searchXml);

  if (!searchJson) {
    return NextResponse.json({ games: [] });
  }

  if (!searchJson.items?.item) {
    return NextResponse.json({ games: [] });
  }

  const items = searchJson.items.item;

  // Get up to 10 game IDs from search results
  const gameIds = items.slice(0, 10).map((item: Item) => item.$.id);
  if (gameIds.length === 0) {
    return NextResponse.json({ games: [] });
  }

  // Fetch details for each game
  const thingUrl = `${BGG_API_ROOT}/thing?id=${gameIds.join(",")}`;
  const thingRes = await fetch(thingUrl);
  const thingXml = await thingRes.text();
  const thingJson = await parseStringPromise(thingXml);
  const things = thingJson.items?.item || [];

  // Filter games by player count and duration
  const filteredGames = things
    .filter((game: Game) => {
      const minPlayersVal = Number.parseInt(
        game.minplayers?.[0]?.$.value || "0",
        10
      );
      const maxPlayersVal = Number.parseInt(
        game.maxplayers?.[0]?.$.value || "99",
        10
      );
      const minPlaytimeVal = Number.parseInt(
        game.minplaytime?.[0]?.$.value || "0",
        10
      );
      const maxPlaytimeVal = Number.parseInt(
        game.maxplaytime?.[0]?.$.value || "9999",
        10
      );

      const matchesPlayers =
        minPlayersVal <= maxPlayers && maxPlayersVal >= minPlayers;
      const matchesDuration =
        minPlaytimeVal <= maxDuration && maxPlaytimeVal >= minDuration;
      return matchesPlayers && matchesDuration;
    })
    .map((game: Game) => ({
      id: game.$.id,
      name: game.name?.[0]?.$.value || "",
      minPlayers: Number.parseInt(game.minplayers?.[0]?.$.value || "0", 10),
      maxPlayers: Number.parseInt(game.maxplayers?.[0]?.$.value || "99", 10),
      minPlaytime: Number.parseInt(game.minplaytime?.[0]?.$.value || "0", 10),
      maxPlaytime: Number.parseInt(
        game.maxplaytime?.[0]?.$.value || "9999",
        10
      ),
      yearPublished: game.yearpublished?.[0]?.$.value || "",
      image: game.image?.[0] || "",
      thumbnail: game.thumbnail?.[0] || "",
    }));

  return NextResponse.json({ games: filteredGames });
}
