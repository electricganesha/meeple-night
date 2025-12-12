import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "'Nunito', system-ui, sans-serif",
    h1: { fontFamily: "'Fredoka', system-ui, sans-serif" },
    h2: {
      fontFamily: "'Fredoka', system-ui, sans-serif",
      fontSize: "5rem",
      lineHeight: "0.9 !important",
      width: "100%",
    },
    h3: { fontFamily: "'Fredoka', system-ui, sans-serif" },
    h4: { fontFamily: "'Fredoka', system-ui, sans-serif" },
    h5: { fontFamily: "'Fredoka', system-ui, sans-serif" },
    h6: {
      fontFamily: "'Nunito', system-ui, sans-serif",
      lineHeight: "1.1 !important",
    },
  },
});

export default theme;
