"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import { useAuthSession } from "../hooks/useAuthSession";
import { useRouter } from "next/navigation";
import { StarField } from "../components/Starfield/Starfield";
import { StatCard } from "../components/StatCard/StatCard";
import { Calendar, Gamepad2, Trophy, Users } from "lucide-react";
import { QuickActions } from "../components/QuickActions/QuickActions";
import { SessionCard } from "../components/SessionCard/SessionCard";
import { GameCard } from "../components/GameCard/GameCard";
import { FriendsList } from "../components/FriendsList/FriendsList";
import { Game } from "../../../types/game";
import { Divider } from "@mui/material";

const mockSessions = [
  {
    title: "Friday Night Meeple",
    date: "2025-12-12",
    time: "19:00",
    location: "John's House",
    playerCount: 3,
    maxPlayers: 5,
    suggestedGames: ["Catan", "Azul", "Wingspan"],
    isUpcoming: true,
  },
  {
    title: "Strategy Sunday",
    date: "2025-12-14",
    time: "15:00",
    location: "Maria's Apartment",
    playerCount: 4,
    maxPlayers: 6,
    suggestedGames: ["Wingspan", "Carcassonne", "Codenames", "7 Wonders"],
    isUpcoming: true,
  },
  {
    title: "Last Week's Bash",
    date: "2025-12-05",
    time: "20:00",
    location: "Chris' Place",
    playerCount: 3,
    maxPlayers: 4,
    suggestedGames: ["Azul", "Ticket to Ride"],
    isUpcoming: false,
  },
];

export default function DashboardPage() {
  const { session } = useAuthSession();
  const router = useRouter();
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
      }}
    >
      <StarField />
      {/* Welcome Section */}
      <Box sx={{ mb: 8 }}>
        <Typography
          variant="h3"
          sx={{
            fontFamily: "var(--font-fredoka)",
            fontWeight: 700,
            color: "var(--foreground)",
            mb: 1,
          }}
        >
          Welcome back, {session?.user.name.split(" ")[0]}{" "}
          <span role="img" aria-label="wave">
            👋
          </span>
        </Typography>
        <Typography sx={{ color: "var(--meeple-yellow)" }}>
          You have 2 upcoming game nights this week
        </Typography>
      </Box>

      {/* Quick Actions */}
      <Box sx={{ mb: 4 }}>
        <QuickActions />
      </Box>

      {/* Stats Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" },
          gap: 2,
          mb: 6,
        }}
      >
        <StatCard
          icon={Calendar}
          label="Sessions This Month"
          value={7}
          trend="+2 from last month"
          accentColor="primary"
        />
        <StatCard
          icon={Gamepad2}
          label="Games in Collection"
          value={games?.length || 0}
          accentColor="blue"
        />
        <StatCard
          icon={Users}
          label="Gaming Friends"
          value={5}
          accentColor="green"
        />
        <StatCard
          icon={Trophy}
          label="Games Played"
          value={82}
          trend="+12 this month"
          accentColor="yellow"
        />
      </Box>

      <Divider sx={{ m: 4, borderColor: "var(--border)" }} />
      {/* Main Content Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" },
          gap: 4,
        }}
      >
        {/* Left Column - Sessions & Collection */}
        <Box>
          <Stack spacing={6}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "var(--font-fredoka)",
                  fontWeight: 600,
                  color: "var(--foreground)",
                }}
              >
                Upcoming Sessions
              </Typography>
              <Button
                variant="text"
                sx={{
                  color: "var(--primary)",
                  fontWeight: 500,
                  fontSize: 14,
                  textTransform: "none",
                }}
              >
                View All
              </Button>
            </Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 2,
              }}
            >
              {mockSessions.slice(0, 2).map((session) => (
                <Box key={session.title}>
                  <SessionCard {...session} />
                </Box>
              ))}
            </Box>

            <Divider sx={{ m: 4, borderColor: "var(--border)" }} />
            {/* Collection Preview */}
            <Box sx={{ mt: 8 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: "var(--font-fredoka)",
                    fontWeight: 600,
                    color: "var(--foreground)",
                  }}
                >
                  Your Collection
                </Typography>
                <Button
                  variant="text"
                  sx={{
                    color: "var(--primary)",
                    fontWeight: 500,
                    fontSize: 14,
                    textTransform: "none",
                  }}
                  onClick={() => router.push("/collection")}
                >
                  View All {games ? games.length : 0} Games
                </Button>
              </Box>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr 1fr",
                    sm: "1fr 1fr 1fr",
                    md: "1fr 1fr 1fr 1fr",
                  },
                  gap: 2,
                  minHeight: 180,
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
                  games.slice(0, 4).map((game) => (
                    <Box key={game.id || game.name}>
                      <GameCard {...game} />
                    </Box>
                  ))
                ) : (
                  <Typography
                    sx={{ gridColumn: "1/-1", textAlign: "center", py: 4 }}
                  >
                    No games in your collection yet.
                  </Typography>
                )}
              </Box>
            </Box>
          </Stack>
        </Box>

        {/* Right Column - Sidebar */}
        <Box>
          <Stack spacing={6} mt={10}>
            <FriendsList />
            {/* Recent Activity */}
            <Paper
              sx={{
                bgcolor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: 3,
                p: 4,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "var(--font-fredoka)",
                  fontWeight: 600,
                  color: "var(--foreground)",
                  mb: 2,
                }}
              >
                Recent Activity
              </Typography>
              <Stack spacing={3}>
                {[
                  { action: "Played Wingspan", time: "2 days ago", icon: "🎯" },
                  {
                    action: "Alex joined your group",
                    time: "3 days ago",
                    icon: "👋",
                  },
                  {
                    action: "Session completed",
                    time: "5 days ago",
                    icon: "✅",
                  },
                  {
                    action: "Added 3 games to collection",
                    time: "1 week ago",
                    icon: "📦",
                  },
                ].map((activity) => (
                  <Box
                    key={activity.action}
                    sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}
                  >
                    <span style={{ fontSize: 22 }}>{activity.icon}</span>
                    <Box>
                      <Typography
                        sx={{ fontSize: 15, color: "var(--foreground)" }}
                      >
                        {activity.action}
                      </Typography>
                      <Typography
                        sx={{ fontSize: 12, color: "var(--muted-foreground)" }}
                      >
                        {activity.time}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
