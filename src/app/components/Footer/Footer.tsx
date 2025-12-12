import Image from "next/image";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 12,
        borderTop: "1px solid var(--border)",
        bgcolor: "var(--primary-foreground)",
      }}
    >
      <Box sx={{ mx: "auto", px: 20 }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems="center"
          justifyContent="space-between"
          spacing={6}
        >
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Image
              src={"/meeple-night.png"}
              alt="Meeple Night"
              width={32}
              height={32}
              style={{ objectFit: "contain" }}
            />
            <Typography
              variant="h6"
              sx={{
                fontFamily: "var(--font-fredoka)",
                fontWeight: 600,
                color: "var(--foreground)",
                fontSize: "1.125rem",
              }}
            >
              Meeple Night
            </Typography>
          </Stack>

          <Box component="nav">
            <Stack
              direction="row"
              alignItems="center"
              spacing={4}
              sx={{ fontSize: 14, color: "var(--muted-foreground)" }}
            >
              <Link
                href="#"
                underline="none"
                sx={{
                  color: "inherit",
                  transition: "color 0.2s",
                  "&:hover": { color: "var(--foreground)" },
                }}
              >
                Features
              </Link>
              <Link
                href="#"
                underline="none"
                sx={{
                  color: "inherit",
                  transition: "color 0.2s",
                  "&:hover": { color: "var(--foreground)" },
                }}
              >
                Pricing
              </Link>
              <Link
                href="#"
                underline="none"
                sx={{
                  color: "inherit",
                  transition: "color 0.2s",
                  "&:hover": { color: "var(--foreground)" },
                }}
              >
                About
              </Link>
              <Link
                href="#"
                underline="none"
                sx={{
                  color: "inherit",
                  transition: "color 0.2s",
                  "&:hover": { color: "var(--foreground)" },
                }}
              >
                Contact
              </Link>
            </Stack>
          </Box>

          <Typography sx={{ fontSize: 14, color: "var(--muted-foreground)" }}>
            © 2024 Meeple Night. All rights reserved.
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};
