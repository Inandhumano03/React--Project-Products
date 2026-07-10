import React, { useState } from "react";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Container,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import {
    PersonAdd,
    Visibility,
    VisibilityOff,
} from "@mui/icons-material";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { instance } from "../axios/index";
import { useNavigate } from "react-router-dom";
const UserRegister = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const [form, setForm] = useState({
        user_name: "",
        password: "",
        email: "",
        role: "user",
    });
    const [errors, setErrors] = useState({
        user_name: "",
        email: "",
        password: "",
        role: "",
    });
    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    const validate = () => {
        const tempErrors = {};

        // Username
        if (!form.user_name.trim()) {
            tempErrors.user_name = "Username is required";
        } else if (form.user_name.length < 3) {
            tempErrors.user_name =
                "Username must be at least 3 characters";
        } else if (form.user_name.length > 20) {
            tempErrors.user_name =
                "Username cannot exceed 20 characters";
        }

        // Email
        if (!form.email.trim()) {
            tempErrors.email = "Email is required";
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)
        ) {
            tempErrors.email = "Please enter a valid email address";
        }

        // Password
        if (!form.password) {
            tempErrors.password = "Password is required";
        } else if (form.password.length < 8) {
            tempErrors.password =
                "Password must be at least 8 characters";
        } else if (
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(
                form.password
            )
        ) {
            tempErrors.password =
                "Password must contain uppercase, lowercase, number and special character";
        }

        // Role
        if (!form.role) {
            tempErrors.role = "Role is required";
        }

        setErrors(tempErrors);

        return Object.keys(tempErrors).length === 0;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) {
            toast.warning("Please fix the validation errors.");
            return;
        }
        try {
            const response = await instance.post("/users", form);

            console.log(response.data);
            toast.success("Registration Successful");
            // Reset the form
            setForm({
                user_name: "",
                email: "",
                password: "",
                role: "user",
            });

            // Clear validation errors
            setErrors({
                user_name: "",
                email: "",
                password: "",
                role: "",
            });
            setShowPassword(false);
            navigate("/");
        } catch (err) {
            console.log(err);

            toast.error(
                err.response?.data?.msg || "Registration Failed"
            );
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
                                    bgcolor: "success.main",
                                    width: 70,
                                    height: 70,
                                    mb: 2,
                                }}
                            >
                                <PersonAdd fontSize="large" />
                            </Avatar>

                            <Typography variant="h4" fontWeight="bold">
                                Create Account
                            </Typography>

                            <Typography color="text.secondary">
                                Register to continue
                            </Typography>
                        </Box>

                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Username"
                                name="user_name"
                                value={form.user_name}
                                onChange={handleChange}
                                error={Boolean(errors.user_name)}
                                helperText={errors.user_name}
                            />

                            <TextField
                                fullWidth
                                margin="normal"
                                label="Email"
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                error={Boolean(errors.email)}
                                helperText={errors.email}
                            />

                            <TextField
                                fullWidth
                                margin="normal"
                                label="Password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={form.password}
                                onChange={handleChange}
                                error={Boolean(errors.password)}
                                helperText={errors.password}
                            />
                            <FormControl
                                fullWidth
                                margin="normal"
                                error={Boolean(errors.role)}
                            >
                                <InputLabel>Role</InputLabel>

                                <Select
                                    name="role"
                                    value={form.role}
                                    label="Role"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="user">User</MenuItem>
                                    <MenuItem value="admin">Admin</MenuItem>
                                </Select>

                                {errors.role && (
                                    <Typography
                                        variant="caption"
                                        color="error"
                                        sx={{ ml: 2, mt: 0.5 }}
                                    >
                                        {errors.role}
                                    </Typography>
                                )}
                            </FormControl>

                            <Button
                                fullWidth
                                type="submit"
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
                                Register
                            </Button>

                            <Box
                                sx={{
                                    mt: 3,
                                    display: "flex",
                                    justifyContent: "center",
                                    gap: 1,
                                }}
                            >
                                <Typography color="text.secondary">
                                    Already have an account?
                                </Typography>

                                <Typography
                                    color="primary"
                                    sx={{
                                        cursor: "pointer",
                                        fontWeight: "bold",
                                        "&:hover": {
                                            textDecoration: "underline",
                                        },
                                    }}
                                    onClick={() => navigate("/")}
                                >
                                    Login
                                </Typography>
                            </Box>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
};

export default UserRegister;