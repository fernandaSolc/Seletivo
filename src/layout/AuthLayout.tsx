import React, { useState, useEffect } from "react";
import { Box, IconButton, ThemeProvider } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import image1 from "../assets/pattern_1.png";
import image2 from "../assets/pattern_2.png";
import getTheme from "../styles/theme";

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          position: "relative",
          fontFamily: "Montserrat, sans-serif",
          overflow: "hidden",
        }}
      >
        {/* Imagens de fundo com zIndex menor */}
        <Box
          sx={{
            position: "absolute",
            top: 50,
            left: 50,
            width: 400,
            height: 400,
            backgroundImage: `url(${image1})`,
            backgroundSize: "cover",
            zIndex: -1,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 50,
            right: 50,
            width: 400,
            height: 400,
            backgroundImage: `url(${image2})`,
            backgroundSize: "cover",
            filter: "blur(4px)",
            zIndex: -1,
          }}
        />

        {/* Conteúdo centralizado sem box */}
        <Box
          sx={{
            zIndex: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          {children}
        </Box>

        {/* Botão de alternância de tema */}
        <Box
          sx={{
            position: "absolute",
            top: 20,
            right: 20,
            zIndex: 3,
          }}
        >
          <IconButton onClick={toggleTheme} sx={{ color: "primary.main" }}>
            {themeMode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AuthLayout;