"use client";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";

import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Chip, Stack } from "@mui/material";
import { useParams } from "next/navigation";
import { Game } from "../../../../types/game";
import Image from "next/image";

export default function GameInfoPage() {
  const router = useRouter();
  const { id } = useParams();
  const [game, setGame] = useState<Game | null>(null);
  const [favourited, setFavourited] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGame() {
      setLoading(true);
      const res = await fetch(`/api/games/${id}`);
      if (res.ok) {
        const data = await res.json();
        setGame(data);
        // Check if this game is in the user's collection
        const favRes = await fetch(`/api/collection`);
        if (favRes.ok) {
          const dataCollection = await favRes.json();
          const isFavourited = Array.isArray(dataCollection.games)
            ? dataCollection.games.some((g: { id: number }) => g.id === data.id)
            : false;
          setFavourited(isFavourited);
        } else {
          setFavourited(false);
        }
      } else {
        setGame(null);
        setFavourited(false);
      }
      setLoading(false);
    }
    fetchGame();
  }, [id]);

  if (!game)
    if (loading)
      return (
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <CircularProgress />
        </Box>
      );
  if (!game)
    return <Box sx={{ mt: 4, textAlign: "center" }}>Game not found.</Box>;

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 2 }}
        onClick={() => router.push("/dashboard")}
      >
        Back to Dashboard
      </Button>
      <Card>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <IconButton
            color="error"
            aria-label={
              favourited ? "Remove from favourites" : "Add to favourites"
            }
            onClick={async () => {
              if (favourited) {
                await fetch("/api/collection/remove", {
                  method: "POST",
                  body: JSON.stringify({ gameId: game.id }),
                  headers: { "Content-Type": "application/json" },
                });
                setFavourited(false);
              } else {
                await fetch("/api/collection/add", {
                  method: "POST",
                  body: JSON.stringify({ gameId: game.id }),
                  headers: { "Content-Type": "application/json" },
                });
                setFavourited(true);
              }
            }}
          >
            {favourited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </Box>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {game.name}
          </Typography>
          {game.imagePath && (
            <Image
              src={game.imagePath}
              alt={game.name}
              width={300}
              height={300}
            />
          )}
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Published {game.yearPublished ? `in ${game.yearPublished}` : ""}
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
            <Chip
              label={`Players: ${game.minPlayers ?? "?"}-${
                game.maxPlayers ?? "?"
              }`}
            />
            <Chip label={`Best played by: ${game.bestPlayers} players`} />
            {game.mfgPlaytime && (
              <Chip label={`Play Time: ${game.mfgPlaytime} min`} />
            )}
          </Stack>
          <Stack gap={2}>
            {game.catThematic && (
              <Chip size="small" label="Thematic" color="secondary" />
            )}
            {game.catStrategy && <Chip label="Strategy" color="secondary" />}
            {game.catWar && <Chip label="War" color="secondary" />}
            {game.catFamily && <Chip label="Family" color="secondary" />}
            {game.catCGS && <Chip label="CGS" color="secondary" />}
            {game.catAbstract && <Chip label="Abstract" color="secondary" />}
            {game.catParty && <Chip label="Party" color="secondary" />}
            {game.catChildrens && <Chip label="Children's" color="secondary" />}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
