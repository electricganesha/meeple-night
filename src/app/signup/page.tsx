"use client";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useRouter } from "next/navigation";
import { signUp } from "../lib/auth/auth-client";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { StarField } from "../components/Starfield/Starfield";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Confirm password validation logic
  const confirmPasswordError =
    !!confirmPassword && password !== confirmPassword;
  const confirmPasswordHelper = confirmPasswordError
    ? "Passwords do not match"
    : "";

  const validatePassword = (pw: string) => {
    // Minimum 8 chars, at least one number, one uppercase, one lowercase
    const minLength = pw.length >= 8;
    const hasNumber = /\d/.test(pw);
    const hasUpper = /[A-Z]/.test(pw);
    const hasLower = /[a-z]/.test(pw);
    return minLength && hasNumber && hasUpper && hasLower;
  };

  const validateEmail = (email: string) => {
    // Simple email regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters and include a number, an uppercase and a lowercase letter."
      );
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    await signUp.email(
      {
        email,
        password,
        name,
        callbackURL: "/dashboard",
      },
      {
        onRequest: () => setLoading(true),
        onSuccess: () => router.push("/signin"),
        onError: (ctx) => {
          setError(ctx.error.message || "Signup failed");
          setLoading(false);
        },
      }
    );
    setLoading(false);
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", backgroundColor: "var(--accent-foreground)" }}
    >
      <StarField />
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: 350,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "var(--card)",
        }}
      >
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((show) => !show)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          fullWidth
          margin="normal"
          error={confirmPasswordError}
          helperText={confirmPasswordHelper}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                  onClick={() => setShowConfirmPassword((show) => !show)}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{
            mt: 2,
            backgroundColor: "var(--meeple-yellow)",
            color: "var(--text-primary)",
            fontWeight: "bold",
            textTransform: "none",
          }}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </Button>
        <Box display="flex" justifyContent="center" mt={2}>
          <span style={{ color: "var(--background)", marginRight: 12 }}>
            Already signed up?&nbsp;
          </span>
          <Button
            variant="text"
            color="primary"
            onClick={() => router.push("/signin")}
            sx={{ textTransform: "none", p: 0, minWidth: "unset" }}
          >
            Sign in instead
          </Button>
        </Box>
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </Box>
    </Box>
  );
}
