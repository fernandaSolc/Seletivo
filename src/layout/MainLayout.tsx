import React, { useState, useEffect } from "react";
import { Box, ThemeProvider } from "@mui/material";
import Header from "../components/Header";
import getTheme from "../styles/theme";
import darkBackground from "../assets/background_dark.jpg";
import lightBackground from "../assets/background_light.jpg";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<"light" | "dark">(
    (localStorage.getItem("theme") as "light" | "dark") || "light"
  );

  const theme = getTheme(themeMode);

  useEffect(() => {
    localStorage.setItem("theme", themeMode);
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={(muiTheme) => ({
          minHeight: "100vh",
          backgroundImage:
            muiTheme.palette.mode === "dark"
              ? `url(${darkBackground})`
              : `url(${lightBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
        })}
      >
        <Header themeMode={themeMode} toggleTheme={toggleTheme} />
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 2,
          }}
        >
          {children}
        </Box>
        <Box
          sx={(muiTheme) => ({
            position: "absolute",
            bottom: 8,
            right: 8,
            fontSize: "0.7rem",
            color: muiTheme.palette.text.secondary,
            opacity: 0.5,
          })}
        >
          v {import.meta.env.VITE_APP_VERSION}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default MainLayout;