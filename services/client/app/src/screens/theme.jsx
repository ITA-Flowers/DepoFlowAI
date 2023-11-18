import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "1rem",
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          backgroundColor: "var(--bg-300)",
        },
      },
    },
  },
});

export default theme;
