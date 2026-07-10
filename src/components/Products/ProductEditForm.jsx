import React from "react";
import {
    Card,
    CardContent,
    CardActions,
    Button,
    TextField,
} from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState } from "react";
const ProductEditForm = ({
    product,
    darkMode,
    updateProduct,
    setEditingId,
}) => {
    const [title, setTitle] = useState(product.title);
    const [description, setDescription] = useState(product.description);
    return (
        <Card
            sx={{
                width: "100%",
                borderRadius: 4,
                boxShadow: 5,
                bgcolor: darkMode ? "#1e293b" : "#ffffff",
                color: darkMode ? "#ffffff" : "#000000",
            }}
        >
            <CardContent
                sx={{
                    p: 4,
                }}
            >
                <TextField
                    fullWidth
                    label="Title"
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                    sx={{
                        mb: 2,

                        "& .MuiInputLabel-root": {
                            color: darkMode
                                ? "#cbd5e1"
                                : "#64748b",
                        },

                        "& .MuiOutlinedInput-root": {
                            color: darkMode
                                ? "#ffffff"
                                : "#000000",

                            "& fieldset": {
                                borderColor: darkMode
                                    ? "#475569"
                                    : "#cbd5e1",
                            },

                            "&:hover fieldset": {
                                borderColor: darkMode
                                    ? "#94a3b8"
                                    : "#64748b",
                            },

                            "&.Mui-focused fieldset": {
                                borderColor: "#1976d2",
                            },
                        },
                    }}
                />

                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Description"
                    value={description}
                    onChange={(e) =>
                        setDescription(
                            e.target.value
                        )
                    }
                    sx={{
                        "& .MuiInputLabel-root": {
                            color: darkMode
                                ? "#cbd5e1"
                                : "#64748b",
                        },

                        "& .MuiOutlinedInput-root": {
                            color: darkMode
                                ? "#ffffff"
                                : "#000000",

                            "& fieldset": {
                                borderColor: darkMode
                                    ? "#475569"
                                    : "#cbd5e1",
                            },

                            "&:hover fieldset": {
                                borderColor: darkMode
                                    ? "#94a3b8"
                                    : "#64748b",
                            },

                            "&.Mui-focused fieldset": {
                                borderColor: "#1976d2",
                            },
                        },
                    }}
                />
            </CardContent>

            <CardActions
                sx={{
                    justifyContent: "flex-end",
                    gap: 2,
                    px: 4,
                    pb: 3,
                    pt: 1,
                }}
            >
                <Button
                    variant="contained"
                    color="success"
                    startIcon={<SaveIcon />}
                    onClick={() =>
                        updateProduct(
                            product._id,
                            title,
                            description
                        )
                    }
                >
                    Save
                </Button>

                <Button
                    variant="outlined"
                    color="error"
                    startIcon={<CancelIcon />}
                    onClick={() =>
                        setEditingId(null)
                    }
                >
                    Cancel
                </Button>
            </CardActions>
        </Card>
    );
};

export default React.memo(ProductEditForm);