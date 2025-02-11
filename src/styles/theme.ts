import { createTheme, PaletteMode } from "@mui/material";

export const getTheme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: "#8C44FF",
      },
      background: {
        default: mode === "dark" ? "#121212" : "#FFFFFF", // Background principal
        paper: mode === "dark" ? "#262626" : "#F4F4F4", // Background secundário
      },
      text: {
        primary: mode === "dark" ? "#FFFFFF" : "#000000", // Texto principal
        secondary: mode === "dark" ? "#B0B0B0" : "#4F4F4F", // Texto secundário
      },
    },
    typography: {
      fontFamily: "Montserrat, sans-serif",
      h1: { fontWeight: 700 },
      h2: { fontWeight: 600 },
      h3: { fontWeight: 500 },
      h4: { fontWeight: 500 },
      h5: { fontWeight: 400 },
      h6: { fontWeight: 400 },
      body1: { fontWeight: 300 },
      body2: { fontWeight: 300 },
    },
  });

export default getTheme;