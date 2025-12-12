"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import { GameCard } from "../components/GameCard/GameCard";
import { Game } from "../../../types/game";
import { StarField } from "../components/Starfield/Starfield";

export default function CollectionPage() {
  const [games, setGames] = useState<Game[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    setError(null);
    fetch("/api/collection")
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch collection");
        const data = await res.json();
        setGames(data.games || []);
      })
      .catch((err) => {
        setError(err.message || "Unknown error");
        setGames([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box
      component="main"
      sx={{
        mx: "auto",
        px: 20,
        py: 14,
        backgroundColor: "var(--primary-foreground)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <StarField />
      <Typography
        variant="h3"
        sx={{
          fontFamily: "var(--font-fredoka)",
          fontWeight: 700,
          color: "var(--foreground)",
          mb: 6,
        }}
      >
        Your Game Collection
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr 1fr",
            sm: "1fr 1fr 1fr",
            md: "1fr 1fr 1fr 1fr",
            lg: "1fr 1fr 1fr 1fr",
          },
          gap: 3,
          minHeight: "60vh",
          alignItems: "stretch",
          justifyItems: "stretch",
        }}
      >
        {loading ? (
          <Box
            sx={{
              gridColumn: "1/-1",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: 120,
            }}
          >
            <CircularProgress color="primary" />
          </Box>
        ) : error ? (
          <Typography
            color="error"
            sx={{ gridColumn: "1/-1", textAlign: "center", py: 4 }}
          >
            {error}
          </Typography>
        ) : games && games.length > 0 ? (
          games.map((game) => (
            <Box key={game.id || game.name}>
              <GameCard {...game} />
            </Box>
          ))
        ) : (
          <Typography sx={{ gridColumn: "1/-1", textAlign: "center", py: 4 }}>
            No games in your collection yet.
          </Typography>
        )}
      </Box>
    </Box>
  );
}
