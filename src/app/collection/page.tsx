"use client";

import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { GameCard } from "../components/GameCard/GameCard";
import { Game } from "../../../types/game";
import { StarField } from "../components/Starfield/Starfield";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { SearchIcon } from "lucide-react";

export default function CollectionPage() {
  const [search, setSearch] = useState("");
  const [games, setGames] = useState<Game[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [players, setPlayers] = useState("all");
  const [time, setTime] = useState("any");
  const [sort, setSort] = useState("rating");

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

  // Helper functions for filters
  function matchesPlayers(game: Game) {
    if (players === "all") return true;
    if (!game.minPlayers || !game.maxPlayers) return true;
    const min = Number(game.minPlayers);
    const max = Number(game.maxPlayers);
    if (players === "2") return min >= 2 && max >= 2;
    if (players === "3-4")
      return (min <= 3 && max >= 4) || (min <= 4 && max >= 3);
    if (players === "5+") return max >= 5;
    return true;
  }

  function matchesTime(game: Game) {
    if (time === "any") return true;
    if (!game.mfgPlaytime) return true;
    const t = Number(game.mfgPlaytime);
    if (time === "under30") return t < 30;
    if (time === "30-60") return t >= 30 && t <= 60;
    if (time === "60plus") return t > 60;
    return true;
  }

  // Filter and sort games
  let filteredGames =
    games?.filter((game: Game) => {
      // Search
      if (
        search.trim() &&
        !game.name?.toLowerCase().includes(search.trim().toLowerCase())
      )
        return false;
      // Players
      if (!matchesPlayers(game)) return false;
      // Time
      if (!matchesTime(game)) return false;
      return true;
    }) || [];

  // Sorting
  if (sort === "name") {
    filteredGames = filteredGames
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === "rating") {
    filteredGames = filteredGames
      .slice()
      .sort((a, b) => (b.avgRating || 0) - (a.avgRating || 0));
  } else if (sort === "mostPlayed") {
    filteredGames = filteredGames
      .slice()
      .sort((a, b) => (b.maxPlayers || 0) - (a.minPlayers || 0));
  } else if (sort === "recent") {
    filteredGames = filteredGames.slice().sort((a, b) => {
      const aDate = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bDate = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return bDate - aDate;
    });
  }

  return (
    <Box
      component="main"
      sx={{
        mx: "auto",
        px: 20,
        py: 14,
        backgroundColor: "var(--primary-foreground)",
        minHeight: "100vh",
        minWidth: "100%",
        maxWidth: "100%",
        width: "100%",
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
        }}
      >
        Your Game Collection
      </Typography>
      <Typography variant="body1" sx={{ color: "var(--background)", mb: 6 }}>
        {games?.length} games in your library.
      </Typography>
      <Box sx={{ mb: 6, width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            alignItems: "center",
            width: "100%",
          }}
        >
          <TextField
            sx={{ flex: 2, minWidth: 180 }}
            fullWidth
            variant="outlined"
            placeholder="Search games..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <FormControl sx={{ flex: 1, minWidth: 120 }}>
            <InputLabel id="players-label">Players</InputLabel>
            <Select
              labelId="players-label"
              value={players}
              label="Players"
              onChange={(e) => setPlayers(e.target.value)}
            >
              <MenuItem value="all">All Players</MenuItem>
              <MenuItem value="2">2 Players</MenuItem>
              <MenuItem value="3-4">3-4 Players</MenuItem>
              <MenuItem value="5+">5+ Players</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ flex: 1, minWidth: 120 }}>
            <InputLabel id="time-label">Time</InputLabel>
            <Select
              labelId="time-label"
              value={time}
              label="Time"
              onChange={(e) => setTime(e.target.value)}
            >
              <MenuItem value="any">Any Time</MenuItem>
              <MenuItem value="under30">Under 30 min</MenuItem>
              <MenuItem value="30-60">30-60 min</MenuItem>
              <MenuItem value="60plus">60+ min</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ flex: 1, minWidth: 140 }}>
            <InputLabel id="sort-label">Sort By</InputLabel>
            <Select
              labelId="sort-label"
              value={sort}
              label="Sort By"
              onChange={(e) => setSort(e.target.value)}
            >
              <MenuItem value="rating">Rating</MenuItem>
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="mostPlayed">Most Played</MenuItem>
              <MenuItem value="recent">Recently Added</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
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
        ) : filteredGames && filteredGames.length > 0 ? (
          filteredGames.map((game) => (
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
