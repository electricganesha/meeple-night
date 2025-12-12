import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { HowItWorksStep } from "../HowItWorksStep/HowItWorksStep";

export const HowItWorksSection = () => {
  const steps = [
    {
      step: 1,
      title: "Connect Your Collection",
      description:
        "Link your BoardGameGeek account to sync all your games, ratings, and play data automatically.",
    },
    {
      step: 2,
      title: "Create a Session",
      description:
        "Set the date, time window, and invite your friends. Everyone can RSVP and mark their preferences.",
    },
    {
      step: 3,
      title: "Get Smart Suggestions",
      description:
        "Based on player count, available time, and group preferences, Meeple Night suggests the perfect lineup.",
    },
    {
      step: 4,
      title: "Play & Track",
      description:
        "Enjoy your game night! Log plays, winners, and build your gaming history over time.",
    },
  ];

  return (
    <Box
      component="section"
      id="how-it-works"
      sx={{
        py: 12,
        backgroundColor: "var(--card)",
        position: "relative",
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 4 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
            gap: 8,
            alignItems: "center",
          }}
        >
          {/* Left: Text Content */}
          <Box>
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
              How It{" "}
              <Box component="span" sx={{ color: "var(--primary)" }}>
                Works
              </Box>
            </Typography>
            <Typography
              sx={{
                color: "var(--muted-foreground)",
                fontSize: "1.125rem",
                mb: 5,
              }}
            >
              Get from ‘let’s play games!’ to an optimized game night in just a
              few steps.
            </Typography>
            <Stack spacing={4}>
              {steps.map((step, index) => (
                <HowItWorksStep key={step.step} {...step} delay={index * 150} />
              ))}
            </Stack>
          </Box>

          {/* Right: Visual */}
          <Box sx={{ position: "relative" }}>
            <Box
              sx={{
                bgcolor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "1.25rem",
                p: 3,
                boxShadow: 8,
              }}
            >
              {/* Mock Session Card */}
              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{ mb: 3, pb: 3, borderBottom: "1px solid var(--border)" }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "1rem",
                    background: "var(--gradient-fire)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography sx={{ fontSize: 24 }}>🎲</Typography>
                </Box>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "var(--font-fredoka)",
                      fontWeight: 600,
                      color: "var(--foreground)",
                    }}
                  >
                    Friday Game Night
                  </Typography>
                  <Typography
                    sx={{ fontSize: 14, color: "var(--muted-foreground)" }}
                  >
                    Dec 13, 2024 • 7:00 PM
                  </Typography>
                </Box>
              </Stack>

              {/* Players */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  sx={{ fontSize: 14, color: "var(--muted-foreground)", mb: 1 }}
                >
                  5 players confirmed
                </Typography>
                <Stack direction="row" spacing={-1.5}>
                  {[
                    "#ff4757",
                    "#2196f3",
                    "#38cb89",
                    "#ffdd33",
                    "var(--primary)",
                  ].map((color, i) => (
                    <Box
                      key={i}
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: color,
                        border: "2px solid var(--card)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 16,
                        fontWeight: 700,
                        color: "var(--foreground)",
                      }}
                    >
                      {String.fromCharCode(65 + i)}
                    </Box>
                  ))}
                </Stack>
              </Box>

              {/* Suggested Games */}
              <Box>
                <Typography
                  sx={{ fontSize: 14, color: "var(--muted-foreground)", mb: 1 }}
                >
                  Suggested games for tonight
                </Typography>
                <Stack spacing={1.5}>
                  {[
                    { name: "Wingspan", time: "60 min", players: "2-5" },
                    { name: "Azul", time: "45 min", players: "2-4" },
                    { name: "Splendor", time: "30 min", players: "2-4" },
                  ].map((game) => (
                    <Box
                      key={game.name}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        p: 1.5,
                        bgcolor: "rgba(34,40,49,0.5)",
                        borderRadius: "0.75rem",
                      }}
                    >
                      <Typography
                        sx={{ fontWeight: 500, color: "var(--foreground)" }}
                      >
                        {game.name}
                      </Typography>
                      <Stack
                        direction="row"
                        spacing={2}
                        sx={{ fontSize: 12, color: "var(--muted-foreground)" }}
                      >
                        <span>⏱ {game.time}</span>
                        <span>👥 {game.players}</span>
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Box>

            {/* Decorative elements */}
            <Box
              sx={{
                position: "absolute",
                top: -16,
                right: -16,
                width: 96,
                height: 96,
                bgcolor: "rgba(255,184,0,0.10)",
                borderRadius: "50%",
                filter: "blur(32px)",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: -16,
                left: -16,
                width: 128,
                height: 128,
                bgcolor: "rgba(33,150,243,0.10)",
                borderRadius: "50%",
                filter: "blur(32px)",
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
