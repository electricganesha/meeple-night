import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "../Button/Button";
import { Calendar, Clock, Users, MapPin } from "lucide-react";

export interface SessionCardProps {
  title: string;
  date: string;
  time: string;
  location: string;
  playerCount: number;
  maxPlayers: number;
  suggestedGames: string[];
  isUpcoming?: boolean;
}

export const SessionCard = ({
  title,
  date,
  time,
  location,
  playerCount,
  maxPlayers,
  suggestedGames,
  isUpcoming = true,
}: SessionCardProps) => {
  return (
    <Box
      sx={{
        backgroundColor: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: 3,
        p: 3,
        minHeight: { xs: 320, md: 400 },
        display: "flex",
        flexDirection: "column",
        transition: "border-color 0.3s",
        "&:hover": { borderColor: "rgba(255, 184, 0, 0.3)" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "var(--font-fredoka)",
              fontWeight: 600,
              color: "var(--foreground)",
              fontSize: 20,
              mb: 0.5,
              transition: "color 0.2s",
              "&:hover": { color: "var(--primary)" },
            }}
          >
            {title}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
            <MapPin style={{ width: 16, height: 16, marginRight: 2 }} />
            <Typography sx={{ fontSize: 14, color: "var(--muted-foreground)" }}>
              {location}
            </Typography>
          </Box>
        </Box>
        {isUpcoming && (
          <Box
            sx={{
              px: 1.5,
              py: 0.5,
              borderRadius: 2,
              fontSize: 12,
              fontWeight: 500,
              background: "rgba(255, 184, 0, 0.20)",
              color: "var(--primary)",
              alignSelf: "flex-start",
            }}
          >
            Upcoming
          </Box>
        )}
      </Box>

      <Box
        sx={{ display: "flex", flexWrap: "wrap", gap: 3, mb: 3, fontSize: 15 }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: "var(--muted-foreground)",
          }}
        >
          <Calendar
            style={{ width: 18, height: 18, color: "var(--meeple-blue)" }}
          />
          <span>{date}</span>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: "var(--muted-foreground)",
          }}
        >
          <Clock
            style={{ width: 18, height: 18, color: "var(--meeple-yellow)" }}
          />
          <span>{time}</span>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: "var(--muted-foreground)",
          }}
        >
          <Users
            style={{ width: 18, height: 18, color: "var(--meeple-green)" }}
          />
          <span>
            {playerCount}/{maxPlayers} players
          </span>
        </Box>
      </Box>

      <Box sx={{ mb: 3, flexGrow: 1 }}>
        <Typography
          sx={{ fontSize: 12, color: "var(--muted-foreground)", mb: 1 }}
        >
          Suggested games
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {suggestedGames.slice(0, 3).map((game) => (
            <Box
              key={game}
              sx={{
                px: 1.5,
                py: 0.5,
                borderRadius: 2,
                fontSize: 12,
                background: "var(--secondary)",
                color: "var(--secondary-foreground)",
              }}
            >
              {game}
            </Box>
          ))}
          {suggestedGames.length > 3 && (
            <Box
              sx={{
                px: 1.5,
                py: 0.5,
                borderRadius: 2,
                fontSize: 12,
                background: "rgba(45, 45, 45, 0.5)",
                color: "var(--muted-foreground)",
              }}
            >
              +{suggestedGames.length - 3} more
            </Box>
          )}
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <Button variant="hero" size="sm" sx={{ flex: 1 }}>
          View Details
        </Button>
        <Button variant="hero" size="sm">
          Edit
        </Button>
      </Box>
    </Box>
  );
};
