// import React, { useContext } from "react";
// import { NavLink } from "react-router-dom";

// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Box,
// } from "@mui/material";

// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import Inventory2Icon from "@mui/icons-material/Inventory";
// import AddCircleIcon from "@mui/icons-material/Add";
// import UploadFileIcon from "@mui/icons-material/UploadFile";

// import ThemeToggle from "./hooks/ThemeToggle";
// import { ThemeContext } from "./context/ThemeContext";
// import { instance } from "../components/axios/index";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";


// const Navbar = () => {

//   const navigate = useNavigate();
//   const role = localStorage.getItem("role")?.toLowerCase();
//   const { darkMode } = useContext(ThemeContext);
//   const handleLogout = async () => {
//     try {
//       await instance.post("/logout");

//       // Remove access token from localStorage/sessionStorage
//       localStorage.removeItem("accessToken");

//       toast.success("Logged out successfully");

//       navigate("/");

//     } catch (err) {
//       console.error(err);
//       toast.error("Logout failed");
//     }
//   };
//   return (
//     <AppBar
//       position="sticky"
//       elevation={4}
//       sx={{
//         bgcolor: darkMode ? "#1e293b" : "#1976d2",
//       }}
//     >
//       <Toolbar
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//         }}
//       >
//         {/* Left - Logo */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             gap: 1,
//           }}
//         >
//           <ShoppingCartIcon />

//           <Typography variant="h5" fontWeight="bold">
//             ProductHub
//           </Typography>
//         </Box>

//         {/* Center - Navigation */}
//         <Box
//           sx={{
//             display: "flex",
//             gap: 2,
//             flex: 1,
//             justifyContent: "center",
//           }}
//         >
//           <Button
//             component={NavLink}
//             to="/ProductList"
//             color="inherit"
//             startIcon={<Inventory2Icon />}
//             sx={{
//               "&.active": {
//                 bgcolor: "rgba(255,255,255,0.18)",
//                 borderRadius: 2,
//               },
//             }}
//           >
//             Products
//           </Button>

//           <Button
//             component={NavLink}
//             to="/excel-api"
//             color="inherit"
//             startIcon={<UploadFileIcon />}
//             sx={{
//               "&.active": {
//                 bgcolor: "rgba(255,255,255,0.18)",
//                 borderRadius: 2,
//               },
//             }}
//           >
//             Excel Upload
//           </Button>
//         </Box>

//         {/* Right - Theme + Logout */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             gap: 2,
//           }}
//         >
//           <ThemeToggle />

//           <Button
//             onClick={handleLogout}
//             color="inherit"
//             variant="outlined"
//             sx={{
//               borderColor: "white",
//               color: "white",
//               borderRadius: 2,
//               textTransform: "none",

//               "&:hover": {
//                 borderColor: "white",
//                 bgcolor: "rgba(255,255,255,0.12)",
//               },
//             }}
//           >
//             Logout
//           </Button>
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Navbar;

import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Stack,
  Chip,
  Avatar,
  Divider,
  Tooltip,
  alpha,
} from "@mui/material";

import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";

import ThemeToggle from "./hooks/ThemeToggle";
import { ThemeContext } from "./context/ThemeContext";
import { instance } from "../components/axios/index";
import { toast } from "react-toastify";

// Blue tokens for the light theme — a saturated blue-500/700 gradient
// replaces the old violet gradient so the navbar matches the rest of the app.
const BLUE_LIGHT_SOFT = "#3B82F6";
const BLUE_LIGHT = "#1D4ED8";
const BLUE_LIGHT_BRIGHT = "#60A5FA";

// Pill-shaped nav link with a soft "lift" on hover and a glassy fill when active.
const NavPill = ({ to, icon, label, darkMode }) => (
  <Button
    component={NavLink}
    to={to}
    disableRipple
    startIcon={icon}
    sx={{
      position: "relative",
      px: 2.25,
      py: 1,
      borderRadius: 999,
      fontWeight: 600,
      fontSize: "0.9rem",
      textTransform: "none",
      letterSpacing: 0.2,
      color: alpha("#fff", 0.8),
      transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",

      "&:hover": {
        color: "#fff",
        bgcolor: alpha("#fff", 0.18),
        backdropFilter: "blur(6px)",
        transform: "translateY(-1px)",
      },

      "&.active": {
        color: "#fff",
        bgcolor: alpha("#fff", 0.22),
        boxShadow: `inset 0 0 0 1px ${alpha("#fff", 0.35)}, inset 0 1px 0 ${alpha("#fff", 0.4)}`,
      },
    }}
  >
    {label}
  </Button>
);

const Navbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role")?.toLowerCase();
  const { darkMode } = useContext(ThemeContext);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await instance.post("/logout");
      localStorage.removeItem("accessToken");
      toast.success("Logged out successfully");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Logout failed");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        overflow: "hidden",
        // Translucent gradient instead of a flat fill — this is what lets the blur read as glass.
        background: darkMode
          ? `linear-gradient(120deg, ${alpha("#1e3a8a", 0.35)}, ${alpha("#0f172a", 0.45)} 60%, ${alpha("#7c3aed", 0.2)})`
          : `linear-gradient(120deg, ${alpha(BLUE_LIGHT_SOFT, 0.55)}, ${alpha(BLUE_LIGHT, 0.6)} 60%, ${alpha(BLUE_LIGHT_BRIGHT, 0.35)})`,
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        borderBottom: `1px solid ${alpha("#fff", 0.18)}`,
        boxShadow: `0 8px 32px ${alpha("#000", darkMode ? 0.5 : 0.18)}`,
        px:0,
        py:0,
      }}
    >
      {/* Glass edge highlight — the thin bright line glass catches at its top rim */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `linear-gradient(180deg, ${alpha("#fff", 0.16)} 0%, transparent 40%)`,
        }}
      />

      <Toolbar
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          py: 1,
        }}
      >
        {/* Left — Brand mark */}
        <Stack direction="row" spacing={1.25} alignItems="center">
          <Avatar
            variant="rounded"
            sx={{
              width: 38,
              height: 38,
              borderRadius: 2.5,
              background: darkMode ? alpha("#3b82f6", 0.35) : alpha(BLUE_LIGHT_SOFT, 0.4),
              backdropFilter: "blur(8px)",
              border: `1px solid ${alpha("#fff", 0.35)}`,
              boxShadow: `0 4px 14px ${alpha(darkMode ? "#2563eb" : BLUE_LIGHT, 0.45)}, inset 0 1px 0 ${alpha("#fff", 0.4)}`,
            }}
          >
            <BoltRoundedIcon fontSize="small" sx={{ color: "#fff" }} />
          </Avatar>

          <Box>
            <Typography
              variant="h6"
              fontWeight={800}
              letterSpacing={-0.3}
              lineHeight={1.1}
              sx={{ color: "#fff",mt:.5 }}
            >
              ProductHub
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: alpha("#fff", 0.75), fontWeight: 500, letterSpacing: 0.3 }}
            >
            </Typography>
          </Box>
        </Stack>

        {/* Center — Navigation */}
        {/* <Stack
          direction="row"
          spacing={0.5}
          sx={{
            flex: 1,
            justifyContent: "center",
            bgcolor: alpha("#000", 0.15),
            backdropFilter: "blur(12px)",
            border: `1px solid ${alpha("#fff", 0.12)}`,
            borderRadius: 999,
            p: 0.5,
            maxWidth: 420,
          }}
        >
          {/* <NavPill
            to="/ProductList"
            icon={<Inventory2RoundedIcon fontSize="small" />}
            label="Products"
            darkMode={darkMode}
          /> */}
        {/* <NavPill
            to="/excel-api"
            icon={<UploadFileRoundedIcon fontSize="small" />}
            label="Excel Upload"
            darkMode={darkMode}
          />
        </Stack> */}

        {/* Right — Role, theme, logout */}
        <Stack direction="row" spacing={1.5} alignItems="center">
          {role && (
            <Chip
              size="medium"
              label={role.charAt(0).toUpperCase() + role.slice(1)}
              sx={{
                display: { xs: "none", sm: "flex" },

                height: 36,

                px: 1.5,

                borderRadius: "12px",

                fontWeight: 700,

                fontSize: "0.9rem",

                letterSpacing: "0.4px",

                color: "#FFFFFF",

                bgcolor: alpha("#5E8BC3", 0.18),

                backdropFilter: "blur(10px)",

                border: `1px solid ${alpha("#FFFFFF", 0.28)}`,

                boxShadow: `0 4px 12px ${alpha("#5E8BC3", 0.18)}`,

                "& .MuiChip-label": {
                  px: 1.5,
                },
              }}
            />
          )}

          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderColor: alpha("#fff", 0.2), my: 1 }}
          />

          <ThemeToggle />

          <Tooltip title="Sign out of your account">
            <span>
              <Button
                onClick={handleLogout}
                disabled={loggingOut}
                startIcon={<LogoutRoundedIcon fontSize="small" />}
                sx={{
                  borderRadius: 999,
                  px: 2,
                  py: 0.75,
                  fontWeight: 700,
                  textTransform: "none",
                  color: "#fff",
                  bgcolor: alpha("#ef4444", 0.22),
                  backdropFilter: "blur(8px)",
                  border: `1px solid ${alpha("#ef4444", 0.5)}`,
                  boxShadow: `inset 0 1px 0 ${alpha("#fff", 0.15)}`,
                  transition: "all 0.2s ease",

                  "&:hover": {
                    bgcolor: alpha("#ef4444", 0.35),
                    borderColor: alpha("#ef4444", 0.7),
                  },

                  "&.Mui-disabled": {
                    color: alpha("#fff", 0.5),
                  },
                }}
              >
                {loggingOut ? "Signing out…" : "Logout"}
              </Button>
            </span>
          </Tooltip>
        </Stack>
      </Toolbar>

      {/* Signature accent line — gradient sweep beneath the toolbar */}
      <Box
        sx={{
          height: 3,
          background: darkMode
            ? "linear-gradient(90deg, #60a5fa, #a78bfa, #60a5fa)"
            : `linear-gradient(90deg, ${BLUE_LIGHT_BRIGHT}, ${BLUE_LIGHT}, ${BLUE_LIGHT_BRIGHT})`,
          opacity: 0.8,
        }}
      />
    </AppBar>
  );
};

export default Navbar;
