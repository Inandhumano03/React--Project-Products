import React, { useState } from "react";
import {
    Box,
    CardContent,
    CardActions,
    Button,
    TextField,
} from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { storage } from "../appwrite/config";
import { ID } from "appwrite";
const ProductEditForm = ({
    product,
    darkMode,
    updateProduct,
    setEditingId,
}) => {
    const [title, setTitle] = useState(product.title);
    const [description, setDescription] = useState(product.description);
    const [image, setImage] = useState(null);

    const [previewImage, setPreviewImage] = useState(product.image);
    const handleImageChange = (event) => {
        const file = event.target.files?.[0];

        console.log("Selected File:", file);

        if (!file) return;

        setImage(file);

        const preview = URL.createObjectURL(file);

        console.log("Preview URL:", preview);

        setPreviewImage(preview);
    };
    return (
        <Box sx={{ width: "100%" }}>
            <CardContent
                sx={{
                    p: 4,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 2,
                        mb: 3,
                    }}
                >
                    <img
                        src={previewImage}
                        alt="Preview"
                        style={{
                            width: 180,
                            height: 180,
                            objectFit: "cover",
                            borderRadius: 12,
                        }}
                    />

                    <Button
                        component="label"
                        variant="outlined"
                    >
                        Change Image

                        <input
                            hidden
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </Button>
                </Box>
                <TextField
                    fullWidth
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    sx={{
                        mb: 2,

                        "& .MuiInputLabel-root": {
                            color: darkMode ? "#cbd5e1" : "#64748b",
                        },

                        "& .MuiOutlinedInput-root": {
                            color: darkMode ? "#ffffff" : "#000000",

                            "& fieldset": {
                                borderColor: darkMode ? "#475569" : "#cbd5e1",
                            },

                            "&:hover fieldset": {
                                borderColor: darkMode ? "#94a3b8" : "#64748b",
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
                    onChange={(e) => setDescription(e.target.value)}
                    sx={{
                        "& .MuiInputLabel-root": {
                            color: darkMode ? "#cbd5e1" : "#64748b",
                        },

                        "& .MuiOutlinedInput-root": {
                            color: darkMode ? "#ffffff" : "#000000",

                            "& fieldset": {
                                borderColor: darkMode ? "#475569" : "#cbd5e1",
                            },

                            "&:hover fieldset": {
                                borderColor: darkMode ? "#94a3b8" : "#64748b",
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
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 2,
                    px: 4,
                    pb: 3,
                    pt: 2,
                }}
            >
                {/* <Button
                    onClick={() => {
                        console.log("Image State:", image);
                        console.log("Preview State:", previewImage);

                        updateProduct(
                            product._id,
                            title,
                            description,
                            image
                        );
                    }}
                ></Button> */}
                <Button
                    variant="contained"
                    color="success"
                    startIcon={<SaveIcon />}
                    sx={{
                        minWidth: 140,
                        borderRadius: 2,
                    }}
                    onClick={() => {
                        updateProduct(
                            product._id,
                            title,
                            description,
                            image
                        );
                    }}
                >
                    Save
                </Button>

                <Button
                    variant="outlined"
                    color="error"
                    startIcon={<CancelIcon />}
                    sx={{
                        minWidth: 140,
                        borderRadius: 2,
                    }}
                    onClick={() => setEditingId(null)}
                >
                    Cancel
                </Button>
            </CardActions>
        </Box >
    );
};

export default React.memo(ProductEditForm);