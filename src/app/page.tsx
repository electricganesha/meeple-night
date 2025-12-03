import Image from "next/image";
import styles from "./page.module.css";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import GroupIcon from "@mui/icons-material/Group";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import EventIcon from "@mui/icons-material/Event";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import SmartToyIcon from "@mui/icons-material/SmartToy";

export default function Home() {
  return (
    <Box className={styles.page}>
      <Box className={styles.main}>
        {/* Hero Section */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={6}
          alignItems="center"
          justifyContent="center"
          sx={{ width: "100%", mb: 6 }}
        >
          <Image
            className={styles.logo}
            src="/meeple-night.png"
            alt="Meeple Night logo"
            width={180}
            height={216}
            priority
          />
          <Stack alignItems="flex-start">
            <Typography variant="h1" className={styles.title} sx={{ mb: 0 }}>
              Meeple Night
            </Typography>
            <Typography
              variant="h5"
              className={styles.subtitle}
              sx={{ color: "var(--meeple-blue)" }}
            >
              Organize. Connect. Play.
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "var(--text-secondary)", mt: 1, mb: 2 }}
            >
              Sync your BGG collection, connect with friends, and plan the
              perfect game night.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              href="/signup"
              sx={{
                mt: 4,
                background: "var(--meeple-yellow)",
                color: "#192f44",
                fontWeight: 700,
                borderRadius: 2,
                boxShadow: 2,
              }}
            >
              Get Started
            </Button>
          </Stack>
        </Stack>

        {/* Features Section */}
        <Stack spacing={4} sx={{ width: "100%", mt: 8 }} alignItems="center">
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
            Core Features
          </Typography>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={4}
            alignItems="stretch"
            justifyContent="center"
            sx={{ width: "100%" }}
          >
            <Stack
              spacing={2}
              alignItems="center"
              justifyContent="center"
              sx={{
                flex: 1,
                p: 3,
                borderRadius: 3,
                background: "#fffbe6",
                textAlign: "center",
                boxShadow: "0 2px 8px rgba(255,204,0,0.08)",
              }}
            >
              <CollectionsBookmarkIcon
                sx={{ fontSize: 40, color: "var(--meeple-yellow)" }}
              />
              <Typography variant="body1">Collection Integration</Typography>
              <Typography align="center" variant="body2">
                Import and sync your BGG games. Manual add for non-BGG users.
              </Typography>
            </Stack>
            <Stack
              spacing={2}
              alignItems="center"
              justifyContent="center"
              sx={{
                flex: 1,
                p: 3,
                borderRadius: 3,
                background: "#fff0f0",
                textAlign: "center",

                boxShadow: "0 2px 8px rgba(255,102,102,0.08)",
              }}
            >
              <GroupIcon sx={{ fontSize: 40, color: "var(--meeple-red)" }} />
              <Typography variant="body1">Friends & Groups</Typography>
              <Typography align="center" variant="body2">
                Add friends, create groups, and see everyone’s highlighted
                games.
              </Typography>
            </Stack>
            <Stack
              spacing={2}
              alignItems="center"
              justifyContent="center"
              sx={{
                flex: 1,
                p: 3,
                borderRadius: 3,
                background: "#f0fff0",
                textAlign: "center",

                boxShadow: "0 2px 8px rgba(51,204,51,0.08)",
              }}
            >
              <EventIcon sx={{ fontSize: 40, color: "var(--meeple-green)" }} />
              <Typography variant="body1">Game Session Planner</Typography>
              <Typography align="center" variant="body2">
                Create sessions, invite friends, and merge collections for the
                night.
              </Typography>
            </Stack>
            <Stack
              spacing={2}
              alignItems="center"
              justifyContent="center"
              sx={{
                flex: 1,
                p: 3,
                borderRadius: 3,
                textAlign: "center",

                background: "#e6f4ff",
                boxShadow: "0 2px 8px rgba(51,153,255,0.08)",
              }}
            >
              <SportsEsportsIcon
                sx={{ fontSize: 40, color: "var(--meeple-blue)" }}
              />
              <Typography variant="body1">Smart Game Picker</Typography>
              <Typography align="center" variant="body2">
                Filter by players, time, complexity, and get auto-suggested
                games.
              </Typography>
            </Stack>
            <Stack
              spacing={2}
              alignItems="center"
              justifyContent="center"
              sx={{
                flex: 1,
                p: 3,
                borderRadius: 3,
                background: "#f8e6fa",
                textAlign: "center",

                boxShadow: "0 2px 8px rgba(204,51,204,0.08)",
              }}
            >
              <SmartToyIcon
                sx={{ fontSize: 40, color: "var(--meeple-purple)" }}
              />
              <Typography variant="body1">AI Game Assistant</Typography>
              <Typography align="center" variant="body2">
                Instant rule summaries and Q&A, powered by LLMs.
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        {/* How It Works Section */}
        <Stack spacing={4} sx={{ width: "100%", mt: 8 }} alignItems="center">
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
            How It Works
          </Typography>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={4}
            alignItems="stretch"
            justifyContent="center"
            sx={{ width: "100%" }}
          >
            <Stack
              spacing={2}
              alignItems="center"
              sx={{
                flex: 1,
                p: 3,
                borderRadius: 3,
                background: "#fff7e6",
                boxShadow: "0 2px 8px rgba(255,153,51,0.08)",
              }}
            >
              <Typography variant="h6" sx={{ color: "var(--meeple-orange)" }}>
                1. Connect
              </Typography>
              <Typography align="center" variant="body2">
                Link your BGG account and add friends.
              </Typography>
            </Stack>
            <Stack
              spacing={2}
              alignItems="center"
              sx={{
                flex: 1,
                p: 3,
                borderRadius: 3,
                background: "#fffbe6",
                boxShadow: "0 2px 8px rgba(255,204,0,0.08)",
              }}
            >
              <Typography variant="h6" sx={{ color: "var(--meeple-yellow)" }}>
                2. Plan
              </Typography>
              <Typography align="center" variant="body2">
                Create a session, invite your group, and merge collections.
              </Typography>
            </Stack>
            <Stack
              spacing={2}
              alignItems="center"
              sx={{
                flex: 1,
                p: 3,
                borderRadius: 3,
                background: "#f0fff0",
                boxShadow: "0 2px 8px rgba(51,204,51,0.08)",
              }}
            >
              <Typography variant="h6" sx={{ color: "var(--meeple-green)" }}>
                3. Play
              </Typography>
              <Typography align="center" variant="body2">
                Get smart game suggestions and instant rules help.
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        {/* AI Assistant Highlight */}
        <Stack
          spacing={2}
          alignItems="center"
          sx={{ width: "100%", mt: 8, mb: 4 }}
        >
          <SmartToyIcon sx={{ fontSize: 48, color: "var(--meeple-purple)" }} />
          <Typography
            variant="h5"
            sx={{ color: "var(--meeple-purple)", fontWeight: 600 }}
          >
            AI-Powered Game Assistant
          </Typography>
          <Typography
            variant="body1"
            sx={{
              maxWidth: 600,
              textAlign: "center",
              color: "var(--text-secondary)",
            }}
          >
            Generate concise rule summaries and get instant answers to rules
            questions, based on official rulebooks and community clarifications.
            No more disputes or confusion—just play!
          </Typography>
        </Stack>

        {/* Social Proof & Footer */}
        <Stack
          spacing={1}
          alignItems="center"
          sx={{ width: "100%", mt: 4, mb: 2 }}
        >
          <Typography variant="body2" sx={{ color: "var(--text-secondary)" }}>
            Built for board gamers, by board gamers. Open source. MIT License.
          </Typography>
          <Button
            variant="text"
            href="https://github.com/electricganesha/meeple-night"
            target="_blank"
            sx={{ color: "var(--meeple-blue)", fontWeight: 600 }}
          >
            GitHub & Contributing
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
