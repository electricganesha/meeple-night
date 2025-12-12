import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Users, Clock, Star } from "lucide-react";
import { Game } from "../../../../types/game";

export const GameCard = ({
  name,
  imagePath,
  minPlayers,
  maxPlayers,
  mfgPlaytime,
  avgRating,
}: Game) => {
  return (
    <Box
      sx={{
        backgroundColor: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: 3,
        overflow: "hidden",
        transition: "border-color 0.3s",
        "&:hover": { borderColor: "rgba(255, 184, 0, 0.3)" },
        display: "flex",
        flexDirection: "column",
        minHeight: 320,
        cursor: "pointer",
      }}
    >
      {/* Game Image */}
      <Box
        sx={{
          aspectRatio: "1 / 1",
          background: "rgba(45, 45, 45, 0.10)",
          position: "relative",
          overflow: "hidden",
          maxHeight: 200,
        }}
      >
        {imagePath ? (
          <Box
            component="img"
            src={imagePath}
            alt={name}
            sx={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
            }}
          >
            🎲
          </Box>
        )}
        <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            px: 1,
            py: 0.5,
            borderRadius: 2,
            border: "1px solid var(--muted-foreground)",
            background: "var( --text-secondary)",
            backdropFilter: "blur(4px)",
            fontSize: 12,
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            color: "var(--primary)",
          }}
        >
          <Star
            style={{
              width: 14,
              height: 14,
              color: "var(--primary)",
              fill: "var(--primary)",
            }}
          />
          {avgRating?.toFixed(1)}
        </Box>
      </Box>

      {/* Game Info */}
      <Box sx={{ p: 3, flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Typography
          sx={{
            fontFamily: "var(--font-fredoka)",
            fontWeight: 600,
            color: "var(--foreground)",
            fontSize: 18,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            transition: "color 0.2s",
            "&:hover": { color: "var(--primary)" },
          }}
        >
          {name}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mt: 1,
            fontSize: 13,
            color: "var(--muted-foreground)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Users style={{ width: 14, height: 14 }} />
            <span>
              {minPlayers}-{maxPlayers}
            </span>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Clock style={{ width: 14, height: 14 }} />
            <span style={{ minWidth: "72px" }}>{mfgPlaytime}</span>
          </Box>
        </Box>

        <Typography
          sx={{ fontSize: 12, color: "var(--muted-foreground)", mt: 1.5 }}
        >
          Played {2} times
        </Typography>
      </Box>
    </Box>
  );
};
