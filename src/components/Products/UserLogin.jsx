import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import {
  LockOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import { instance } from "../axios";

const UserLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    user_name: "",
    password: "",
    remember: false,
  });

  const [errors, setErrors] = useState({
    user_name: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    const tempErrors = {};

    if (!formData.user_name.trim()) {
      tempErrors.user_name = "Username is required";
    } else if (formData.user_name.length < 3) {
      tempErrors.user_name =
        "Username must be at least 3 characters";
    }

    if (!formData.password) {
      tempErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      tempErrors.password =
        "Password must be at least 8 characters";
    }

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validate()) {
      toast.warning("Please fill in all required fields correctly.");
      return;
    }

    setLoading(true);

    try {

      const response = await instance.post("/login", {
        user_name: formData.user_name,
        password: formData.password
      });

      localStorage.setItem(
        "accessToken",
        response.data.accessToken
      );
      localStorage.setItem(
        "refreshToken",
        response.data.refreshToken
      );

      localStorage.setItem(
        "role",
        response.data.user.role
      );

      toast.success("Login Successful");

      navigate("/ProductList");

    } catch (err) {

      if (err.response) {

        switch (err.response.status) {

          case 401:
            toast.error(err.response.data.msg || "Invalid username or password");
            break;

          case 403:
            toast.error("Access Denied");
            break;

          case 500:
            toast.error("Server Error");
            break;

          default:
            toast.error("Login Failed");
        }

      } else {

        toast.error("Unable to connect to server");

      }

    } finally {

      setLoading(false);

    }
  };

  
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0f172a,#1e3a8a,#2563eb)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Card
          elevation={12}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          <CardContent sx={{ p: 5 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 4,
              }}
            >
              <Avatar
                sx={{
                  bgcolor: "primary.main",
                  width: 70,
                  height: 70,
                  mb: 2,
                }}
              >
                <LockOutlined fontSize="large" />
              </Avatar>

              <Typography
                variant="h4"
                fontWeight="bold"
              >
                Welcome Back
              </Typography>

              <Typography
                color="text.secondary"
              >
                Sign in to continue
              </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                margin="normal"
                label="Username"
                name="user_name"
                autoComplete="username"
                value={formData.user_name}
                onChange={handleChange}
                error={Boolean(errors.user_name)}
                helperText={errors.user_name}
              />

              <TextField
                fullWidth
                margin="normal"
                label="Password"
                name="password"
                 autoComplete="current-password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                error={Boolean(errors.password)}
                helperText={errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowPassword(!showPassword)
                        }
                      >
                        {showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Box
                sx={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems: "center",
                  mt: 2,
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={
                        formData.remember
                      }
                      name="remember"
                      onChange={handleChange}
                    />
                  }
                  label="Remember Me"
                />

                <Typography
                  color="primary"
                  sx={{
                    cursor: "pointer",
                    fontWeight: 600,
                    "&:hover": {
                      textDecoration:
                        "underline",
                    },
                  }}
                >
                  Forgot Password?
                </Typography>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  mt: 4,
                  py: 1.5,
                  borderRadius: 3,
                  fontWeight: "bold",
                  textTransform: "none",
                  fontSize: "1rem",
                }}
                onClick={handleSubmit}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>

              <Box
                sx={{
                  mt: 3,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Not a user yet?
                </Typography>

                <Typography
                  variant="body2"
                  color="primary"
                  sx={{
                    fontWeight: "bold",
                    cursor: "pointer",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                  onClick={() => navigate("/register")}
                >
                  Register
                </Typography>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default UserLogin;