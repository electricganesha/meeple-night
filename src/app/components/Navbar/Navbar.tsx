"use client";
import Link from "next/link";
import { Button } from "../Button/Button";
import Image from "next/image";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useAuthSession } from "@/app/hooks/useAuthSession";
import { Bell, Plus } from "lucide-react";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const { isLoggedIn, session } = useAuthSession();
  const pathname = usePathname();

  return (
    <Box
      component="header"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        bgcolor: "rgba(34, 40, 49, 0.8)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <Box
        sx={{
          mx: "auto",
          px: 20,
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {isLoggedIn ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box
              component={Link}
              href="/dashboard"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                textDecoration: "none",
              }}
            >
              <Box
                component="img"
                src="/meeple-night.png"
                alt="Meeple Night"
                sx={{ width: 36, height: 36, objectFit: "contain" }}
              />
              <Typography
                sx={{
                  fontFamily: "var(--font-fredoka)",
                  fontWeight: 600,
                  color: "var(--foreground)",
                  fontSize: "1.25rem",
                }}
              >
                Meeple Night
              </Typography>
            </Box>

            <Box
              component="nav"
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 4,
                ml: 4,
              }}
            >
              <Box
                component={Link}
                href="/dashboard"
                sx={{
                  color:
                    pathname === "/dashboard"
                      ? "var(--foreground)"
                      : "var(--muted-foreground)",
                  fontWeight: 500,
                  fontSize: 16,
                  textDecoration: "none",
                  mr: 1,
                }}
              >
                Dashboard
              </Box>
              <Box
                component="a"
                href="#"
                sx={{
                  color: "var(--muted-foreground)",
                  fontSize: 16,
                  textDecoration: "none",
                  transition: "color 0.2s",
                  "&:hover": { color: "var(--foreground)" },
                }}
              >
                Sessions
              </Box>
              <Box
                component={Link}
                href="/collection"
                sx={{
                  color:
                    pathname === "/collection"
                      ? "var(--foreground)"
                      : "var(--muted-foreground)",
                  fontWeight: pathname === "/collection" ? 600 : 400,
                  fontSize: 16,
                  textDecoration: "none",
                  transition: "color 0.2s",
                  "&:hover": { color: "var(--foreground)" },
                }}
              >
                Collection
              </Box>
              <Box
                component="a"
                href="#"
                sx={{
                  color: "var(--muted-foreground)",
                  fontSize: 16,
                  textDecoration: "none",
                  transition: "color 0.2s",
                  "&:hover": { color: "var(--foreground)" },
                }}
              >
                Friends
              </Box>
            </Box>

            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{ ml: 4 }}
            >
              <Box sx={{ position: "relative" }}>
                <Button variant="ghost" size="lg" sx={{ minWidth: 0, p: 1.25 }}>
                  <Bell style={{ width: 20, height: 20 }} />
                </Button>
                <Box
                  sx={{
                    position: "absolute",
                    top: 6,
                    right: 6,
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: "var(--primary)",
                  }}
                />
              </Box>

              <Button
                variant="hero"
                size="sm"
                sx={{ fontWeight: 600, height: 42 }}
              >
                <Plus
                  style={{
                    width: 16,
                    height: 16,
                  }}
                />
                New Session
              </Button>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <form action="/signout" method="post">
                  <Button
                    type="submit"
                    variant="hero"
                    size="sm"
                    sx={{
                      color: "var(--text-primary)",
                      fontWeight: "bold",
                      height: 42,
                    }}
                  >
                    Sign Out
                  </Button>
                </form>
              </Box>

              {/* User Avatar */}
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  bgcolor: "var(--meeple-red)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  fontWeight: 700,
                  color: "var(--foreground)",
                }}
              >
                {session?.user.name
                  ? session.user.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")
                      .toUpperCase()
                  : "U"}
              </Box>
            </Stack>
          </Box>
        ) : (
          <>
            <Link href="/" style={{ textDecoration: "none" }}>
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Image
                  src={"/meeple-night.png"}
                  alt="Meeple Night"
                  width={40}
                  height={40}
                  style={{ objectFit: "contain" }}
                />
                <Typography
                  sx={{
                    fontFamily: "var(--font-fredoka)",
                    fontWeight: 600,
                    color: "var(--foreground)",
                    fontSize: "1.25rem",
                  }}
                >
                  Meeple Night
                </Typography>
              </Stack>
            </Link>

            <Box
              component="nav"
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 3,
              }}
            >
              <Box
                component="a"
                href="#features"
                sx={{
                  color: "var(--muted-foreground)",
                  fontSize: 16,
                  textDecoration: "none",
                  transition: "color 0.2s",
                  "&:hover": { color: "var(--foreground)" },
                }}
              >
                Features
              </Box>
              <Box
                component="a"
                href="#how-it-works"
                sx={{
                  color: "var(--muted-foreground)",
                  fontSize: 16,
                  textDecoration: "none",
                  transition: "color 0.2s",
                  "&:hover": { color: "var(--foreground)" },
                }}
              >
                How It Works
              </Box>
            </Box>

            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Button variant="ghost" size="sm">
                <Link
                  href="/signin"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Sign In
                </Link>
              </Button>
              <Button variant="ghost" size="sm">
                <Link
                  href="/signup"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Get Started
                </Link>
              </Button>
            </Stack>
          </>
        )}
      </Box>
    </Box>
  );
};
