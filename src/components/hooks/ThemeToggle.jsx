import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

import {
  Box,
  Switch,
} from "@mui/material";

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export default function ThemeToggle() {
  const { darkMode, toggleTheme } =
    useContext(ThemeContext);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        bgcolor: darkMode ? "#1e293b" : "#1976d2",
        color: darkMode ? "#fff" : "#000",
        px: 2,
        py: 1,
        borderRadius: 3,
        boxShadow: 3,

      }}
    >
      <LightModeIcon />

      <Switch
        checked={darkMode}
        onChange={toggleTheme}
        color="warning"
      />

      <DarkModeIcon />
    </Box>
  );
}