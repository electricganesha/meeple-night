import { LucideIcon } from "lucide-react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  accentColor?: "red" | "blue" | "green" | "yellow";
  delay?: number;
}

const accentStyles: Record<
  "red" | "blue" | "green" | "yellow",
  React.CSSProperties
> = {
  red: {
    backgroundColor: "rgba(255, 71, 87, 0.20)",
    color: "hsl(0, 75%, 55%)",
    borderColor: "rgba(255, 71, 87, 0.30)",
  },
  blue: {
    backgroundColor: "rgba(33, 150, 243, 0.20)",
    color: "hsl(205, 85%, 55%)",
    borderColor: "rgba(33, 150, 243, 0.30)",
  },
  green: {
    backgroundColor: "rgba(56, 203, 137, 0.20)",
    color: "hsl(145, 60%, 45%)",
    borderColor: "rgba(56, 203, 137, 0.30)",
  },
  yellow: {
    backgroundColor: "rgba(255, 221, 51, 0.20)",
    color: "hsl(45, 95%, 55%)",
    borderColor: "rgba(255, 221, 51, 0.30)",
  },
};

export const FeatureCard = ({
  icon: Icon,
  title,
  description,
  accentColor = "blue",
  delay = 0,
}: FeatureCardProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        position: "relative",
        bgcolor: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: "1.25rem",
        p: 3,
        transition: "all 0.3s cubic-bezier(.4,1,.7,1)",
        boxShadow: 0,
        opacity: 0,
        animation: "fade-in 1s forwards",
        animationDelay: `${delay}ms`,
        "&:hover": {
          borderColor: "var(--primary)",
          boxShadow: 8,
        },
        overflow: "visible",
        minHeight: 240,
      }}
    >
      {/* Glow effect on hover */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          borderRadius: "1.25rem",
          bgcolor: "rgba(255,184,0,0.05)",
          opacity: 0,
          pointerEvents: "none",
          transition: "opacity 0.3s cubic-bezier(.4,1,.7,1)",
          zIndex: 1,
          ".MuiPaper-root:hover &": {
            opacity: 1,
          },
        }}
      />
      <Box sx={{ position: "relative", zIndex: 2 }}>
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid",
            mb: 2,
            ...accentStyles[accentColor],
          }}
        >
          <Icon style={{ width: 28, height: 28 }} />
        </Box>
        <Typography
          variant="h6"
          sx={{
            fontFamily: "var(--font-fredoka)",
            fontWeight: 600,
            color: "var(--foreground)",
            fontSize: "1.25rem",
            mb: 0.5,
          }}
        >
          {title}
        </Typography>
        <Typography sx={{ color: "var(--muted-foreground)", lineHeight: 1.7 }}>
          {description}
        </Typography>
      </Box>
    </Paper>
  );
};
