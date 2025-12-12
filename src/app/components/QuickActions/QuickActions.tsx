import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Plus, UserPlus, Library, Wand2 } from "lucide-react";
import { Button } from "../Button/Button";

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
  const [modalOpen, setModalOpen] = useState(false);
  const [bggUsername, setBggUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSyncClick = () => setModalOpen(true);
  const handleClose = () => {
    setModalOpen(false);
    setLoading(false);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setBggUsername(e.target.value);
  const handleSync = async () => {
    if (!bggUsername.trim()) return;
    setLoading(true);
    try {
      await fetch(`/api/collection/import/${bggUsername.trim()}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      setModalOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, 1fr)" },
          gap: 2,
        }}
      >
        {actions.map((action) => {
          const Icon = action.icon;
          const isSync = action.label === "Sync Collection";
          return (
            <Button
              key={action.label}
              variant="outlined"
              sx={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: 3,
                p: 3,
                boxShadow: "none",
                transition: "border-color 0.3s",
                textTransform: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                minHeight: 148,
                "&:hover": {
                  borderColor: "rgba(255, 184, 0, 0.3)",
                  backgroundColor: "var(--card)",
                  boxShadow: "none",
                },
              }}
              disableElevation
              fullWidth
              onClick={isSync ? handleSyncClick : undefined}
            >
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: action.bg,
                  color: action.color,
                }}
              >
                <Icon style={{ width: 12, height: 12 }} />
              </Box>
              <Typography
                sx={{
                  fontFamily: "var(--font-fredoka)",
                  fontWeight: 700,
                  color: "var(--foreground)",
                  fontSize: 18,
                  textAlign: "left",
                  transition: "color 0.2s",
                  "&:hover": { color: "var(--primary)" },
                }}
              >
                {action.label}
              </Typography>
              <Typography
                sx={{
                  fontSize: 14,
                  color: "var(--muted-foreground)",
                  textAlign: "center",
                }}
              >
                {action.description}
              </Typography>
            </Button>
          );
        })}
      </Box>
      <Dialog open={modalOpen} onClose={handleClose}>
        <Box sx={{ backgroundColor: "var(--card)" }}>
          <DialogTitle>
            <Typography color="var(--background)">
              Sync Collection from BGG
            </Typography>
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="BGG Username"
              type="text"
              fullWidth
              value={bggUsername}
              onChange={handleInputChange}
            />
          </DialogContent>
          <DialogActions sx={{ width: "100%", p: 3, pt: 0 }}>
            <Button
              variant="ghost"
              size="sm"
              disabled={loading}
              onClick={handleClose}
              sx={{ height: 22 }}
            >
              <Typography>Cancel</Typography>
            </Button>
            <Button
              onClick={handleSync}
              variant="hero"
              size="sm"
              disabled={!bggUsername.trim() || loading}
              sx={{ height: 22 }}
              startIcon={
                loading ? (
                  <span
                    className="spinner"
                    style={{ display: "inline-block", width: 16, height: 16 }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="8"
                        cy="8"
                        r="7"
                        stroke="#888"
                        strokeWidth="2"
                        opacity="0.2"
                      />
                      <path
                        d="M15 8A7 7 0 1 1 8 1"
                        stroke="#888"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                ) : undefined
              }
            >
              <Typography>{loading ? "Syncing..." : "Sync"}</Typography>
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};
