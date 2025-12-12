import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const friends = [
  { name: "Alex", initial: "A", color: "var(--meeple-red)", online: true },
  { name: "Jordan", initial: "J", color: "var(--meeple-blue)", online: true },
  { name: "Sam", initial: "S", color: "var(--meeple-green)", online: false },
  { name: "Casey", initial: "C", color: "var(--meeple-yellow)", online: true },
  { name: "Morgan", initial: "M", color: "var(--primary)", online: false },
];

export const FriendsList = () => {
  return (
    <Box
      sx={{
        backgroundColor: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: 3,
        p: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontFamily: "var(--font-fredoka)",
            fontWeight: 600,
            color: "var(--foreground)",
            fontSize: 18,
          }}
        >
          Gaming Group
        </Typography>
        <Typography sx={{ fontSize: 12, color: "var(--muted-foreground)" }}>
          {friends.length} friends
        </Typography>
      </Box>

      <Box>
        {friends.map((friend) => (
          <Box
            key={friend.name}
            sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
          >
            <Box sx={{ position: "relative", minWidth: 40 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: friend.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  fontWeight: 700,
                  color: "var(--foreground)",
                }}
              >
                {friend.initial}
              </Box>
              {friend.online && (
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    background: "var(--meeple-green)",
                    border: "2px solid var(--card)",
                  }}
                />
              )}
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontWeight: 500,
                  color: "var(--foreground)",
                  fontSize: 15,
                }}
              >
                {friend.name}
              </Typography>
              <Typography
                sx={{ fontSize: 12, color: "var(--muted-foreground)" }}
              >
                {friend.online ? "Online" : "Offline"}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      <Button
        variant="text"
        fullWidth
        sx={{
          mt: 2,
          py: 1.2,
          fontSize: 14,
          color: "var(--primary)",
          fontWeight: 600,
          textTransform: "none",
          "&:hover": { color: "hsl(38, 92%, 45%)" },
        }}
      >
        Invite More Friends
      </Button>
    </Box>
  );
};
