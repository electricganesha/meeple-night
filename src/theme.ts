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
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          overflowX: "hidden",
        },
        body: {
          overflowX: "hidden",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          svg: {
            color: "var(--border)",
          },
          "::placeholder": {
            color: "var(--background) !important",
            opacity: 1,
          },
          border: "1px solid var(--border)",
          color: "var(--background)",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "var(--background)",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          color: "var(--background)",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: "var(--text-primary)",
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          minWidth: 200,
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          minWidth: 200,
        },
      },
    },
  },
});

export default theme;
