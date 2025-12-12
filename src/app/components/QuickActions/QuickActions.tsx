import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Plus, UserPlus, Library, Wand2 } from "lucide-react";

const actions = [
  {
    icon: Plus,
    label: "Create Session",
    description: "Plan a new game night",
    bg: "rgba(255, 184, 0, 0.20)",
    color: "var(--primary)",
  },
  {
    icon: UserPlus,
    label: "Invite Friends",
    description: "Grow your group",
    bg: "rgba(37, 99, 235, 0.20)",
    color: "var(--meeple-blue)",
  },
  {
    icon: Library,
    label: "Sync Collection",
    description: "Update from BGG",
    bg: "rgba(16, 185, 129, 0.20)",
    color: "var(--meeple-green)",
  },
  {
    icon: Wand2,
    label: "Get Suggestions",
    description: "AI-powered picks",
    bg: "rgba(253, 224, 71, 0.20)",
    color: "var(--meeple-yellow)",
  },
];

export const QuickActions = () => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, 1fr)" },
        gap: 2,
      }}
    >
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <Button
            key={action.label}
            variant="outlined"
            sx={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: 3,
              p: 2,
              textAlign: "left",
              alignItems: "flex-start",
              boxShadow: "none",
              transition: "border-color 0.3s",
              textTransform: "none",
              "&:hover": {
                borderColor: "rgba(255, 184, 0, 0.3)",
                backgroundColor: "var(--card)",
                boxShadow: "none",
              },
              display: "flex",
              flexDirection: "column",
            }}
            disableElevation
            fullWidth
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: action.bg,
                color: action.color,
                mb: 2,
              }}
            >
              <Icon style={{ width: 20, height: 20 }} />
            </Box>
            <Typography
              sx={{
                fontFamily: "var(--font-fredoka)",
                fontWeight: 600,
                color: "var(--foreground)",
                fontSize: 16,
                mb: 0.5,
                transition: "color 0.2s",
                "&:hover": { color: "var(--primary)" },
              }}
            >
              {action.label}
            </Typography>
            <Typography
              sx={{ fontSize: 12, color: "var(--muted-foreground)", mt: 0.5 }}
            >
              {action.description}
            </Typography>
          </Button>
        );
      })}
    </Box>
  );
};
