import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: string;
  accentColor?: "primary" | "red" | "blue" | "green" | "yellow";
}

const accentStyles: Record<
  NonNullable<StatCardProps["accentColor"]>,
  { bg: string; color: string }
> = {
  primary: { bg: "rgba(255, 184, 0, 0.20)", color: "var(--primary)" },
  red: { bg: "rgba(220, 38, 38, 0.20)", color: "var(--meeple-red)" },
  blue: { bg: "rgba(37, 99, 235, 0.20)", color: "var(--meeple-blue)" },
  green: { bg: "rgba(16, 185, 129, 0.20)", color: "var(--meeple-green)" },
  yellow: { bg: "rgba(253, 224, 71, 0.20)", color: "var(--meeple-yellow)" },
};

export const StatCard = ({
  icon: Icon,
  label,
  value,
  trend,
  accentColor = "primary",
}: StatCardProps) => {
  const accent = accentStyles[accentColor] || accentStyles.primary;
  return (
    <Box
      sx={{
        backgroundColor: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: 3,
        p: 3,
        transition: "border-color 0.3s",
        "&:hover": { borderColor: "rgba(255, 184, 0, 0.3)" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: accent.bg,
            color: accent.color,
          }}
        >
          <Icon style={{ width: 24, height: 24 }} />
        </Box>
        {trend && (
          <Typography
            sx={{
              fontSize: 12,
              color: "var(--meeple-green)",
              fontWeight: 500,
              mt: 0.5,
            }}
          >
            {trend}
          </Typography>
        )}
      </Box>
      <Box sx={{ mt: 3 }}>
        <Typography
          sx={{
            fontSize: 32,
            fontFamily: "var(--font-fredoka)",
            fontWeight: 700,
            color: "var(--foreground)",
          }}
        >
          {value}
        </Typography>
        <Typography
          sx={{ fontSize: 14, color: "var(--muted-foreground)", mt: 0.5 }}
        >
          {label}
        </Typography>
      </Box>
    </Box>
  );
};
