// import React, { useState } from "react";
// import {
//     Box,
//     CardContent,
//     CardActions,
//     Button,
//     TextField,
// } from "@mui/material";

// import SaveIcon from "@mui/icons-material/Save";
// import CancelIcon from "@mui/icons-material/Cancel";
// import { storage } from "../appwrite/config";
// import { ID } from "appwrite";
// const ProductEditForm = ({
//     product,
//     darkMode,
//     updateProduct,
//     setEditingId,
// }) => {
//     const [title, setTitle] = useState(product.title);
//     const [description, setDescription] = useState(product.description);
//     const [image, setImage] = useState(null);

//     const [previewImage, setPreviewImage] = useState(product.image);
//     const handleImageChange = (event) => {
//         const file = event.target.files?.[0];

//         console.log("Selected File:", file);

//         if (!file) return;

//         setImage(file);

//         const preview = URL.createObjectURL(file);

//         console.log("Preview URL:", preview);

//         setPreviewImage(preview);
//     };
//     return (
//         <Box sx={{ width: "100%" }}>
//             <CardContent
//                 sx={{
//                     p: 4,
//                 }}
//             >
//                 <Box
//                     sx={{
//                         display: "flex",
//                         flexDirection: "column",
//                         alignItems: "center",
//                         gap: 2,
//                         mb: 3,
//                     }}
//                 >
//                     <img
//                         src={previewImage}
//                         alt="Preview"
//                         style={{
//                             width: 180,
//                             height: 180,
//                             objectFit: "cover",
//                             borderRadius: 12,
//                         }}
//                     />

//                     <Button
//                         component="label"
//                         variant="outlined"
//                     >
//                         Change Image

//                         <input
//                             hidden
//                             type="file"
//                             accept="image/*"
//                             onChange={handleImageChange}
//                         />
//                     </Button>
//                 </Box>
//                 <TextField
//                     fullWidth
//                     label="Title"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     sx={{
//                         mb: 2,

//                         "& .MuiInputLabel-root": {
//                             color: darkMode ? "#cbd5e1" : "#64748b",
//                         },

//                         "& .MuiOutlinedInput-root": {
//                             color: darkMode ? "#ffffff" : "#000000",

//                             "& fieldset": {
//                                 borderColor: darkMode ? "#475569" : "#cbd5e1",
//                             },

//                             "&:hover fieldset": {
//                                 borderColor: darkMode ? "#94a3b8" : "#64748b",
//                             },

//                             "&.Mui-focused fieldset": {
//                                 borderColor: "#1976d2",
//                             },
//                         },
//                     }}
//                 />

//                 <TextField
//                     fullWidth
//                     multiline
//                     rows={4}
//                     label="Description"
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     sx={{
//                         "& .MuiInputLabel-root": {
//                             color: darkMode ? "#cbd5e1" : "#64748b",
//                         },

//                         "& .MuiOutlinedInput-root": {
//                             color: darkMode ? "#ffffff" : "#000000",

//                             "& fieldset": {
//                                 borderColor: darkMode ? "#475569" : "#cbd5e1",
//                             },

//                             "&:hover fieldset": {
//                                 borderColor: darkMode ? "#94a3b8" : "#64748b",
//                             },

//                             "&.Mui-focused fieldset": {
//                                 borderColor: "#1976d2",
//                             },
//                         },
//                     }}
//                 />
//             </CardContent>

//             <CardActions
//                 sx={{
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     gap: 2,
//                     px: 4,
//                     pb: 3,
//                     pt: 2,
//                 }}
//             >
//                 {/* <Button
//                     onClick={() => {
//                         console.log("Image State:", image);
//                         console.log("Preview State:", previewImage);

//                         updateProduct(
//                             product._id,
//                             title,
//                             description,
//                             image
//                         );
//                     }}
//                 ></Button> */}
//                 <Button
//                     variant="contained"
//                     color="success"
//                     startIcon={<SaveIcon />}
//                     sx={{
//                         minWidth: 140,
//                         borderRadius: 2,
//                     }}
//                     onClick={() => {
//                         updateProduct(
//                             product._id,
//                             title,
//                             description,
//                             image
//                         );
//                     }}
//                 >
//                     Save
//                 </Button>

//                 <Button
//                     variant="outlined"
//                     color="error"
//                     startIcon={<CancelIcon />}
//                     sx={{
//                         minWidth: 140,
//                         borderRadius: 2,
//                     }}
//                     onClick={() => setEditingId(null)}
//                 >
//                     Cancel
//                 </Button>
//             </CardActions>
//         </Box >
//     );
// };

// export default React.memo(ProductEditForm);


import React, { useState } from "react";
import {
  Stack,
  Button,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import SaveRoundedIcon               from "@mui/icons-material/SaveRounded";
import CancelRoundedIcon             from "@mui/icons-material/CancelRounded";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";

const ProductEditForm = ({ product, darkMode, updateProduct, setEditingId }) => {
  const [title,        setTitle]        = useState(product.title);
  const [description,  setDescription]  = useState(product.description);
  const [image,        setImage]        = useState(null);
  const [previewImage, setPreviewImage] = useState(product.image);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const isFormValid =
    title.trim().length >= 3 &&
    description.trim().length >= 10;

  // ── Exact same fieldSx as AddProduct ─────────────────────────────────────
  const fieldSx = {
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
  };

  return (
    <Stack spacing={3} sx={{ p: 2 }}>

      {/* ── Centered image preview ── */}
      <Stack alignItems="center" justifyContent="center">
        <Box
          sx={{
            width: 120,
            height: 120,
            mx: "auto",
            borderRadius: "18px",
            overflow: "hidden",
            border: darkMode
              ? "1px solid rgba(255,255,255,.15)"
              : "1px solid #E2E8F0",
            boxShadow: darkMode
              ? "0 8px 28px rgba(0,0,0,0.45)"
              : "0 8px 28px rgba(15,23,42,0.10)",
          }}
        >
          <img
            src={previewImage}
            alt="Preview"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </Box>
      </Stack>

      {/* ── Title — identical to AddProduct ── */}
      <TextField
        fullWidth
        label="Product Title"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        slotProps={{ htmlInput: { maxLength: 50 } }}
        helperText={`${title.length}/50 Characters`}
        sx={fieldSx}
      />

      {/* ── Description — identical to AddProduct rows=5 ── */}
      <TextField
        fullWidth
        multiline
        rows={5}
        label="Product Description"
        variant="outlined"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        slotProps={{ htmlInput: { maxLength: 200 } }}
        helperText={`${description.length}/200 Characters`}
        sx={{ ...fieldSx, "& textarea": { resize: "none" } }}
      />

      {/* ── Change Image | Cancel — mirrors Upload Image | Reset row ── */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems="center"
        sx={{ width: "100%" }}
      >
        {/* Change Image — exact Upload Image style */}
        <Button
          component="label"
          variant="outlined"
          startIcon={<AddPhotoAlternateOutlinedIcon />}
          sx={{
            flex: 1,
            height: 56,
            borderRadius: "18px",
            textTransform: "none",
            fontWeight: 600,
            fontSize: "0.95rem",
            color: darkMode ? "#E2E8F0" : "#2563EB",
            border: darkMode
              ? "1px solid rgba(255,255,255,.15)"
              : "1px solid rgba(37,99,235,.15)",
            background: darkMode
              ? "rgba(255,255,255,.05)"
              : "rgba(255,255,255,.7)",
            transition: ".3s",
            "&:hover": {
              background: darkMode
                ? "rgba(255,255,255,.10)"
                : "rgba(37,99,235,.08)",
              transform: "translateY(-2px)",
              borderColor: "#2563EB",
            },
          }}
        >
          Change Image
          <input hidden type="file" accept="image/*" onChange={handleImageChange} />
        </Button>

        {/* Cancel — exact Reset style */}
        <Button
          variant="outlined"
          startIcon={<CancelRoundedIcon />}
          onClick={() => setEditingId(null)}
          sx={{
            flex: 1,
            height: 56,
            borderRadius: "18px",
            textTransform: "none",
            fontWeight: 600,
            fontSize: "0.95rem",
            color: "#EF4444",
            border: "1px solid rgba(239,68,68,.2)",
            background: darkMode
              ? "rgba(239,68,68,.08)"
              : "rgba(254,242,242,.9)",
            transition: ".3s",
            "&:hover": {
              background: "#EF4444",
              color: "#fff",
              transform: "translateY(-2px)",
            },
          }}
        >
          Cancel
        </Button>
      </Stack>

      {/* Filename feedback — same as AddProduct */}
      {image && (
        <Typography
          sx={{
            mt: -1,
            ml: 1,
            color:      darkMode ? "#94A3B8" : "#64748B",
            fontSize:   "0.9rem",
            fontWeight: 500,
          }}
        >
          ✓ {image.name}
        </Typography>
      )}

      {/* ── Save Changes — exact "Add Product" button style ── */}
      <Button
        variant="contained"
        size="large"
        startIcon={<SaveRoundedIcon />}
        onClick={() => updateProduct(product._id, title, description, image)}
        disabled={!isFormValid}
        sx={{
          py: 1.5,
          borderRadius: 2,
          fontWeight: "bold",
          textTransform: "none",
          fontSize: "1rem",
          bgcolor: "#059669",
          "&:hover":    { bgcolor: "#047857" },
          "&:disabled": { opacity: 0.5 },
        }}
      >
        Save Changes
      </Button>

    </Stack>
  );
};

export default React.memo(ProductEditForm);