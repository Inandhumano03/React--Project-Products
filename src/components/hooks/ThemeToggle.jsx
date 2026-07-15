// import { useContext } from "react";
// import { ThemeContext } from "../context/ThemeContext";

// import {
//   Box,
//   Switch,
// } from "@mui/material";

// import LightModeIcon from "@mui/icons-material/LightMode";
// import DarkModeIcon from "@mui/icons-material/DarkMode";

// export default function ThemeToggle() {
//   const { darkMode, toggleTheme } =
//     useContext(ThemeContext);

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         alignItems: "center",
//         gap: 1,
//         bgcolor: darkMode ? "#1e293b" : "#1976d2",
//         color: darkMode ? "#fff" : "#000",
//         px: 2,
//         py: 1,
//         borderRadius: 3,
//         boxShadow: 3,

//       }}
//     >
//       {/* <LightModeIcon /> */}

//       <Switch
//         checked={darkMode}
//         onChange={toggleTheme}
//         color="warning"
//       />

//       {/* <DarkModeIcon /> */}
//     </Box>
//   );
// }

import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Box, Tooltip, alpha } from "@mui/material";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";

export default function ThemeToggle() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <Tooltip title={darkMode ? "Switch to light mode" : "Switch to dark mode"}>
      <Box
        component="button"
        onClick={toggleTheme}
        aria-label="Toggle theme"
        sx={{
          position: "relative",
          width: 64,
          height: 34,
          p: 0.4,
          borderRadius: "999px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: darkMode ? "flex-end" : "flex-start",

          border: darkMode
            ? "1px solid rgba(167,139,250,.35)"
            : `1px solid ${alpha("#1D4ED8", 0.16)}`,

          // Light-mode track now carries a faint blue tint (blue-50 → blue-100)
          // instead of plain white, so it reads as part of the blue glass theme.
          background: darkMode
            ? "linear-gradient(135deg,#312E81,#1E1B4B)"
            : "linear-gradient(135deg,#EFF6FF,#DBEAFE)",

          backdropFilter: "blur(18px)",

          boxShadow: darkMode
            ? "inset 0 2px 6px rgba(0,0,0,.45)"
            : `
      0 6px 20px rgba(29,78,216,.12),
      inset 0 1px 1px rgba(255,255,255,.9)
    `,

          transition: "all .35s ease",
        }}
      >
        {/* Faint icons on either end of the track, for context as the thumb slides */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 0.9,
            pointerEvents: "none",
          }}
        >
          <LightModeRoundedIcon
            sx={{
              fontSize: 14,
              color: darkMode
                ? "rgba(251,191,36,.35)"
                : "#F59E0B",
            }}
          />
          <DarkModeRoundedIcon
            sx={{
              fontSize: 14,
              color: darkMode
                ? "#E9D5FF"
                : "rgba(29,78,216,.4)",
            }}
          />
        </Box>

        {/* Sliding thumb */}
        <Box
          sx={{
            position: "relative",
            width: 24,
            height: 24,
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",

            bgcolor: darkMode
              ? "#4C1D95"
              : "#FFFFFF",

            border: darkMode
              ? "1px solid rgba(255,255,255,.08)"
              : `1px solid ${alpha("#1D4ED8", 0.12)}`,

            boxShadow: darkMode
              ? "0 3px 10px rgba(0,0,0,.45)"
              : `
          0 4px 12px rgba(29,78,216,.18),
          inset 0 1px 0 rgba(255,255,255,.9)
        `,

            transition: "all .35s ease",
          }}
        >
          {darkMode ? (
            <DarkModeRoundedIcon
              sx={{
                fontSize: 15,
                color: "#E9D5FF",
              }}
            />
          ) : (
            <LightModeRoundedIcon
              sx={{
                fontSize: 15,
                color: "#F59E0B",
              }}
            />
          )}
        </Box>
      </Box>
    </Tooltip>
  );
}
