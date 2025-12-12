import {
  Library,
  Users,
  Clock,
  Wand2,
  Calendar,
  BarChart3,
} from "lucide-react";

import { FeatureCard } from "../FeatureCard/FeatureCard";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const FeaturesSection = () => {
  const features = [
    {
      icon: Library,
      title: "BGG Collection Sync",
      description:
        "Connect your BoardGameGeek account to automatically import your entire game collection with ratings and play history.",
      accentColor: "blue" as const,
    },
    {
      icon: Users,
      title: "Smart Player Matching",
      description:
        "Filter games by player count automatically. Only see games that work perfectly for your group size.",
      accentColor: "green" as const,
    },
    {
      icon: Clock,
      title: "Time-Based Planning",
      description:
        "Set your available time and get game suggestions that fit perfectly within your session window.",
      accentColor: "yellow" as const,
    },
    {
      icon: Wand2,
      title: "AI Game Suggestions",
      description:
        "Get intelligent recommendations based on your group's preferences, complexity tolerance, and past favorites.",
      accentColor: "red" as const,
    },
    {
      icon: Calendar,
      title: "Session Scheduling",
      description:
        "Create recurring game nights, send invites, and track RSVPs all in one place.",
      accentColor: "blue" as const,
    },
    {
      icon: BarChart3,
      title: "Play Stats & History",
      description:
        "Track what you've played, who won, and discover patterns in your gaming preferences over time.",
      accentColor: "green" as const,
    },
  ];

  return (
    <Box
      component="section"
      id="features"
      sx={{
        py: 12,
        backgroundColor: "var(--primary-foreground)",
        position: "relative",
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 4 }}>
        {/* Section Header */}
        <Box sx={{ textAlign: "center", maxWidth: 600, mx: "auto", mb: 8 }}>
          <Typography
            variant="h4"
            sx={{
              fontFamily: "var(--font-fredoka)",
              fontWeight: 700,
              color: "var(--foreground)",
              mb: 2,
              fontSize: { xs: "2rem", md: "2.5rem" },
            }}
          >
            Everything You Need for{" "}
            <Box component="span" sx={{ color: "var(--primary)" }}>
              Epic Game Nights
            </Box>
          </Typography>
          <Typography
            sx={{ color: "var(--muted-foreground)", fontSize: "1.125rem" }}
          >
            From collection management to smart scheduling, Meeple Night has you
            covered.
          </Typography>
        </Box>

        {/* Features Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1fr 1fr",
              lg: "1fr 1fr 1fr",
            },
            gap: 3,
          }}
        >
          {features.map((feature, index) => (
            <Box key={feature.title}>
              <FeatureCard {...feature} delay={index * 100} />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
