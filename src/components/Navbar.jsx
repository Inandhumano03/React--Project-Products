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
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <ShoppingCartIcon />

          <Typography
            variant="h5"
            fontWeight="bold"
          >
            ProductHub
          </Typography>
        </Box>

        {/* Navigation */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
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
          {role === "admin" && (
            <Button
              component={NavLink}
              to="/add-product"
              color="inherit"
              startIcon={<AddCircleIcon />}
              sx={{
                "&.active": {
                  bgcolor: "rgba(255,255,255,0.18)",
                  borderRadius: 2,
                },
              }}
            >
              Add Product
            </Button>
          )}

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
          <Button
            component={NavLink}
            onClick={handleLogout}
            color="inherit"
            sx={{
              "&.active": {
                display: "flex",
                alignItems: "center",
                gap: 1,
                bgcolor: darkMode ? "#1e293b" : "#1976d2",
                color: darkMode ? "#fff" : "#000",
                px: 2,
                py: 1,
                borderRadius: 3,
                boxShadow: 3,
              },
            }}
          >
            Logout
          </Button>
        </Box>

        {/* Theme Toggle */}
        <ThemeToggle />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;