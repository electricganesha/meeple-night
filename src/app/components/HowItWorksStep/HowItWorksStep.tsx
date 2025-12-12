import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

interface HowItWorksStepProps {
  step: number;
  title: string;
  description: string;
  delay?: number;
}

export const HowItWorksStep = ({
  step,
  title,
  description,
  delay = 0,
}: HowItWorksStepProps) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        opacity: 0,
        animation: "fade-in 1s forwards",
        animationDelay: `${delay}ms`,
      }}
    >
      <Box sx={{ flexShrink: 0 }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: "var(--gradient-fire)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-fredoka)",
            fontSize: "1.25rem",
            fontWeight: 700,
            color: "var(--primary-foreground)",
            boxShadow: "var(--shadow-glow), 0 6px 24px rgba(0,0,0,0.12)",
          }}
        >
          {step}
        </Box>
      </Box>
      <Box>
        <Typography
          variant="h6"
          sx={{
            fontFamily: "var(--font-fredoka)",
            fontWeight: 600,
            color: "var(--foreground)",
            fontSize: "1.125rem",
            mb: 0.5,
          }}
        >
          {title}
        </Typography>
        <Typography sx={{ color: "var(--muted-foreground)" }}>
          {description}
        </Typography>
      </Box>
    </Stack>
  );
};
