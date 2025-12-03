"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "../lib/auth/auth-client";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

export default function SignOutPage() {
  const router = useRouter();

  useEffect(() => {
    async function sOut() {
      await signOut();
      router.push("/signin");
    }
    sOut();
  }, [router]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
      }}
    >
      <CircularProgress />
      <Typography variant="h6" sx={{ mt: 2 }}>
        Signing out...
      </Typography>
    </Box>
  );
}
