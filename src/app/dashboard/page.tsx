"use client";

import { useEffect, useState } from "react";
import { getSession } from "../lib/auth/auth-client";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Image from "next/image";
import { format } from "date-fns/format";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Search from "../components/Search/Search";
import { List, ListItem, ListItemText } from "@mui/material";
import { Game } from "../../../types/game";
import Link from "next/link";

interface User {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  createdAt: Date | null;
  emailVerified: boolean | null;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [games, setGames] = useState([]);

  useEffect(() => {
    getSession()
      .then((s) => {
        setUser((s.data?.user as User) ?? null);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load session");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    async function fetchCollection() {
      const res = await fetch("/api/collection");
      if (res.ok) {
        const data = await res.json();
        setGames(data.games);
      }
    }
    fetchCollection();
  }, []);

  let accountInfo;
  if (user) {
    accountInfo = (
      <Stack justifyContent="center">
        <Typography variant="body1">
          <strong>Name:</strong> {user.name}
        </Typography>
        <Typography variant="body1">
          <strong>Email:</strong> {user.email}
        </Typography>
        <Typography variant="body1">
          <strong>Created at:</strong>{" "}
          {user.createdAt ? format(new Date(user.createdAt), "PPP") : "N/A"}
        </Typography>
        {user.emailVerified !== null && (
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-end",
              mt: 2,
            }}
          >
            <Chip
              label={
                user.emailVerified ? "Email Verified" : "Email Not Verified"
              }
              variant="outlined"
              color={user.emailVerified ? "primary" : "error"}
            />
          </Box>
        )}
        {user.image && (
          <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
            <Image
              src={user.image}
              alt="User avatar"
              style={{ borderRadius: "50%", width: 80, height: 80 }}
            />
          </Box>
        )}
        <Box sx={{ mt: 2 }}>
          <Typography variant="caption" color="text.secondary">
            Account Data:
          </Typography>
          <Paper variant="outlined" sx={{ p: 2, mt: 1, bgcolor: "grey.100" }}>
            <pre style={{ margin: 0, fontSize: 12 }}>
              {JSON.stringify(user, null, 2)}
            </pre>
          </Paper>
        </Box>
      </Stack>
    );
  } else if (!loading && !error) {
    accountInfo = (
      <Alert severity="warning">No session found. Please sign in.</Alert>
    );
  } else {
    accountInfo = null;
  }

  return (
    <Box sx={{ p: 4, position: "relative", width: "100%" }}>
      <Typography variant="h3" gutterBottom>
        Dashboard
      </Typography>

      <Box
        sx={{
          position: "absolute",
          top: 48,
          right: 48,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          mb: 2,
        }}
      >
        <form action="/signout" method="post">
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "var(--meeple-yellow)",
              color: "var(--text-primary)",
              fontWeight: "bold",
            }}
          >
            <Typography
              variant="button"
              color="var(--text-primary)"
              fontWeight="bold"
            >
              Sign Out
            </Typography>
          </Button>
        </form>
      </Box>

      <Stack
        width="100%"
        spacing={24}
        direction="row"
        alignItems="space-between"
      >
        <Paper sx={{ p: 3, maxWidth: 640, marginTop: 16 }} elevation={3}>
          <Typography variant="h5" gutterBottom>
            Account Info
          </Typography>
          {loading && <CircularProgress />}
          {error && <Alert severity="error">{error}</Alert>}
          {accountInfo}
        </Paper>
        <Search />
        <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            My Collection
          </Typography>
          <List>
            {games.map((game: Game) => (
              <Link
                key={game.id}
                href={`/games/${game.id}`}
                style={{ textDecoration: "none", width: "100%" }}
              >
                <ListItem>
                  <ListItemText primary={game.name} />
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>
      </Stack>
    </Box>
  );
}
