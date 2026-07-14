import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Inventory2Icon from "@mui/icons-material/Inventory";
import AddCircleIcon from "@mui/icons-material/Add";
import UploadFileIcon from "@mui/icons-material/UploadFile";

import ThemeToggle from "./hooks/ThemeToggle";
import { ThemeContext } from "./context/ThemeContext";
import { instance } from "../components/axios/index";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const Navbar = () => {

  const navigate = useNavigate();
  const role = localStorage.getItem("role")?.toLowerCase();
  const { darkMode } = useContext(ThemeContext);
  const handleLogout = async () => {
    try {
      await instance.post("/logout");

      // Remove access token from localStorage/sessionStorage
      localStorage.removeItem("accessToken");

      toast.success("Logged out successfully");

      navigate("/");

    } catch (err) {
      console.error(err);
      toast.error("Logout failed");
    }
  };
  return (
    <AppBar
      position="sticky"
      elevation={4}
      sx={{
        bgcolor: darkMode ? "#1e293b" : "#1976d2",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Left - Logo */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <ShoppingCartIcon />

          <Typography variant="h5" fontWeight="bold">
            ProductHub
          </Typography>
        </Box>

        {/* Center - Navigation */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flex: 1,
            justifyContent: "center",
          }}
        >
          <Button
            component={NavLink}
            to="/ProductList"
            color="inherit"
            startIcon={<Inventory2Icon />}
            sx={{
              "&.active": {
                bgcolor: "rgba(255,255,255,0.18)",
                borderRadius: 2,
              },
            }}
          >
            Products
          </Button>

          <Button
            component={NavLink}
            to="/excel-api"
            color="inherit"
            startIcon={<UploadFileIcon />}
            sx={{
              "&.active": {
                bgcolor: "rgba(255,255,255,0.18)",
                borderRadius: 2,
              },
            }}
          >
            Excel Upload
          </Button>
        </Box>

        {/* Right - Theme + Logout */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <ThemeToggle />

          <Button
            onClick={handleLogout}
            color="inherit"
            variant="outlined"
            sx={{
              borderColor: "white",
              color: "white",
              borderRadius: 2,
              textTransform: "none",

              "&:hover": {
                borderColor: "white",
                bgcolor: "rgba(255,255,255,0.12)",
              },
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;