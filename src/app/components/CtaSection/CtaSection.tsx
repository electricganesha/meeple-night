import { Sparkles } from "lucide-react";
import { Button } from "../Button/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export const CTASection = () => {
  return (
    <Box
      component="section"
      sx={{ py: 12, position: "relative", overflow: "hidden" }}
    >
      {/* Background glow */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          background: "var(--primary-foreground)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          height: 600,
          backgroundColor: "rgba(255,184,0,0.07)",
          borderRadius: "50%",
          filter: "blur(500px)",
          zIndex: 1,
        }}
      />

      <Box
        sx={{
          maxWidth: 900,
          mx: "auto",
          px: 4,
          position: "relative",
          zIndex: 2,
        }}
      >
        <Box sx={{ maxWidth: 700, mx: "auto", textAlign: "center" }}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: "var(--font-fredoka)",
              fontWeight: 700,
              color: "var(--foreground)",
              mb: 3,
              fontSize: { xs: "2rem", md: "3rem" },
            }}
          >
            Ready to Host Your Next{" "}
            <Box
              component="span"
              sx={{
                background: "var(--gradient-fire)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Epic Game Night?
            </Box>
          </Typography>
          <Typography
            sx={{
              fontSize: "1.125rem",
              color: "var(--muted-foreground)",
              mb: 5,
              maxWidth: 500,
              mx: "auto",
            }}
          >
            Join thousands of board game enthusiasts who plan smarter, play
            better, and never waste time picking the wrong game again.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
            sx={{ mb: 3 }}
          >
            <Button variant="hero" size="xl">
              <Sparkles style={{ width: 20, height: 20 }} />
              Get Started
            </Button>
            <Button variant="outlined" size="xl">
              Learn More
            </Button>
          </Stack>

          <Typography
            sx={{ fontSize: 14, color: "var(--muted-foreground)", mt: 3 }}
          >
            Free forever for casual planners. Premium features for the dedicated
            host.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
