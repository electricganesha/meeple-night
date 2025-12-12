"use client";
import { Users, Calendar, Sparkles } from "lucide-react";
import Image from "next/image";
import { StarField } from "../Starfield/Starfield";
import { Button } from "../Button/Button";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/navigation";

export const HeroSection = () => {
  const router = useRouter();

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        pt: 8,
        background: "var(--gradient-night)",
      }}
    >
      <StarField />

      {/* Ambient glow */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 800,
          height: 400,
          bgcolor: "primary.main",
          opacity: 0.1,
          filter: "blur(100px)",
          borderRadius: "50%",
        }}
      />

      <Box
        sx={{
          px: 4,
          py: 10,
          position: "relative",
          zIndex: 10,
          width: "100%",
        }}
      >
        <Stack alignItems="center" textAlign="center" spacing={4}>
          {/* Logo */}
          <Box mb={4} sx={{ animation: "float 3s ease-in-out infinite" }}>
            <Image
              src="/meeple-night.png"
              alt="Meeple Night"
              width={208}
              height={208}
              style={{
                objectFit: "contain",
                filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.25))",
              }}
            />
          </Box>

          {/* Heading */}
          <Typography
            variant="h2"
            fontWeight={700}
            color="var(--background)"
            sx={{
              mb: 2,
              lineHeight: 1.1,
              opacity: 0,
              animation: "fade-in 1s forwards",
              animationDelay: "200ms",
            }}
            className="font-display"
          >
            Plan Perfect{" "}
            <Box
              component="span"
              sx={{
                background: "linear-gradient(90deg, #ff9800, #ff3c3c)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Game Nights
            </Box>
            <br />
            With Your Friends
          </Typography>

          {/* Subheading */}
          <Typography
            variant="h6"
            color="var(--muted-foreground)"
            sx={{
              maxWidth: 700,
              mb: 4,
              opacity: 0,
              animation: "fade-in 1s forwards",
              animationDelay: "400ms",
            }}
          >
            Connect your BoardGameGeek collection, invite your gaming group, and
            let Meeple Night suggest the perfect games based on player count,
            time, and preferences.
          </Typography>

          {/* CTA Buttons */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            mb={8}
            sx={{
              opacity: 0,
              animation: "fade-in 1s forwards",
              animationDelay: "600ms",
            }}
          >
            <Button variant="hero" size="lg" sx={{ minWidth: 220 }}>
              <Sparkles style={{ width: 20, height: 20 }} />
              Start Planning
            </Button>
            <Button
              variant="outlined"
              size="lg"
              sx={{ minWidth: 220 }}
              onClick={() => router.push(" #how-it-works")}
            >
              <Calendar style={{ width: 20, height: 20 }} />
              See How It Works
            </Button>
          </Stack>

          {/* Social proof */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems="center"
            spacing={4}
            sx={{
              fontSize: 15,
              color: "text.secondary",
              opacity: 0,
              animation: "fade-in 1s forwards",
              animationDelay: "800ms",
              paddingTop: 6,
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <Users style={{ width: 16, height: 16, color: "#2196f3" }} />
              <span style={{ color: "var(--muted-foreground)" }}>
                1,000+ game nights planned
              </span>
            </Stack>
            <Box
              sx={{
                display: { xs: "none", sm: "block" },
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: "text.disabled",
                opacity: 0.5,
              }}
            />
            <Stack direction="row" alignItems="center" spacing={1}>
              <Image
                src="/powered_by_BGG_01_SM.png"
                alt="Powered by BGG"
                width={150}
                height={40}
              />
            </Stack>
          </Stack>
        </Stack>
      </Box>

      {/* Bottom fade */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 128,
          background:
            "linear-gradient(to top, var(--mui-palette-background-default), transparent)",
        }}
      />
    </Box>
  );
};
