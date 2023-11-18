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
  },
  palette: {
    mode: "dark", // Dodaj tryb ciemny, jeśli to jest motyw ciemny
  },
});

export default theme;
