// import React from "react";
// import {
//   Card,
//   CardMedia,
//   Typography,
//   Button,
//   Stack,
//   Box,
// } from "@mui/material";

// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { useState } from "react";
// import { Dialog } from "@mui/material";
// import { DialogContent } from "@mui/material";

// const ProductCard = ({
//   product,
//   darkMode,
//   expandedId,
//   setExpandedId,
//   role,
//   startEditing = { handleEditProduct },
//   handleDeleteClick,
// }) => {
//   const [previewOpen, setPreviewOpen] = useState(false);
//   const [previewImage, setPreviewImage] = useState("");
//   return (
//     <Box
//       sx={{
//         width: "100%",
//         height: "100%",
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           p: 2,
//           gap: 2,
//           alignItems: "flex-start",
//         }}
//       >
//         {/* Product Image */}
//         {product.image && (
//           <CardMedia
//             component="img"
//             image={product.image}
//             alt={product.title}
//             onClick={() => {
//               setPreviewImage(product.image);
//               setPreviewOpen(true);
//             }}
//             sx={{
//               width: 110,
//               height: 110,
//               borderRadius: 2,
//               objectFit: "cover",
//               flexShrink: 0,
//               cursor: "pointer",
//             }}
//           />
//         )}
//         <Dialog
//           open={previewOpen}
//           onClose={() => setPreviewOpen(false)}
//           maxWidth="md"
//         >
//           <DialogContent
//             sx={{
//               p: 0,
//               bgcolor: "black",
//             }}
//           >
//             <img
//               src={previewImage}
//               alt="Preview"
//               style={{
//                 width: "100%",
//                 height: "auto",
//                 display: "block",
//               }}
//             />
//           </DialogContent>
//         </Dialog>

//         {/* Product Details */}
//         <Box
//           sx={{
//             flex: 1,
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "space-between",
//           }}
//         >
//           <Typography
//             variant="h6"
//             fontWeight="bold"
//           >
//             {product.title}
//           </Typography>

//           <Typography
//             variant="body2"
//             sx={{
//               color: darkMode ? "#cbd5e1" : "#64748b",
//               mt: 1,
//               height: expandedId === product._id ? 120 : 70,
//               overflowY: expandedId === product._id ? "auto" : "hidden",
//               pr: 1,

//               "&::-webkit-scrollbar": {
//                 width: 5,
//               },

//               "&::-webkit-scrollbar-thumb": {
//                 backgroundColor: "#94a3b8",
//                 borderRadius: 5,
//               },
//             }}
//           >
//             {expandedId === product._id
//               ? product.description
//               : `${product.description.slice(0, 120)}${product.description.length > 120 ? "..." : ""
//               }`}
//           </Typography>

//           {product.description.length >
//             120 && (
//               <Button
//                 size="small"
//                 sx={{
//                   mt: 1,
//                   p: 0,
//                 }}
//                 onClick={() =>
//                   setExpandedId(
//                     expandedId === product._id
//                       ? null
//                       : product._id
//                   )
//                 }
//               >
//                 {expandedId ===
//                   product._id
//                   ? "See Less"
//                   : "See More"}
//               </Button>
//             )}

//           {role === "admin" && (
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "center",
//                 gap: 2,
//                 mt: 2,
//               }}
//             >
//               <Button
//                 variant="contained"
//                 startIcon={<EditIcon />}
//                 onClick={() => startEditing(product)}
//               >
//                 Edit
//               </Button>

//               <Button
//                 variant="contained"
//                 color="error"
//                 startIcon={<DeleteIcon />}
//                 onClick={() => handleDeleteClick(product._id)}
//               >
//                 Delete
//               </Button>
//             </Box>
//           )}
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default React.memo(ProductCard);

import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Dialog,
  DialogContent,
  IconButton,
  alpha,
} from "@mui/material";

import ImageNotSupportedRoundedIcon from "@mui/icons-material/ImageNotSupportedRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { blue } from "@mui/material/colors";

// Same blue tokens used across the app for the light theme; dark mode uses a
// soft sky-blue to match the "SHARE / LEARN MORE" link color from the
// reference card.
const BLUE_LIGHT = "#1D4ED8";
const BLUE_DARK = "#60A5FA";

const ProductCard = ({
  product,
  darkMode,
  role,
  startEditing,
  handleDeleteClick,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);

  return (
    <Card
      elevation={0}
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        overflow: "hidden",
        bgcolor: darkMode ? "#1e293b" : "#ffffff",
        border: `1px solid ${darkMode ? alpha("#fff", 0.08) : alpha("#0f172a", 0.08)}`,
        boxShadow: darkMode
          ? "0 4px 18px rgba(0,0,0,0.4)"
          : "0 4px 18px rgba(15,23,42,0.08)",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",

        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: darkMode
            ? "0 14px 30px rgba(0,0,0,0.5)"
            : "0 14px 30px rgba(15,23,42,0.14)",
        },
      }}
    >
      {/* Full-bleed image — no inset margin, straight edge-to-edge like the reference card */}
      {product.image ? (
        <CardMedia
          component="img"
          image={product.image}
          alt={product.title}
          onClick={() => setPreviewOpen(true)}
          sx={{ height: 180,  objectFit: "cover", objectPosition: "center", cursor: "pointer" }}
        />
      ) : (
        <Box
          sx={{
            height: 180,
            display: "grid",
            placeItems: "center",
            bgcolor: darkMode ? "#0f172a" : "#f1f5f9",
          }}
        >
          <ImageNotSupportedRoundedIcon sx={{ color: alpha("#94a3b8", 0.9), fontSize: 32 }} />
        </Box>
      )}

      <Dialog open={previewOpen} onClose={() => setPreviewOpen(false)} maxWidth="md">
        <DialogContent sx={{ p: 0, bgcolor: "black", position: "relative" }}>
          <IconButton
            onClick={() => setPreviewOpen(false)}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              bgcolor: alpha("#000", 0.4),
              color: "#fff",
              "&:hover": { bgcolor: alpha("#000", 0.6) },
            }}
          >
            <CloseRoundedIcon />
          </IconButton>
          <img
            src={product.image}
            alt="Preview"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </DialogContent>
      </Dialog>

      {/* Title + description — plain text, no card-within-card treatment */}
      <CardContent sx={{ flex: 1, pb: 1 }}>
        <Typography
          variant="h5"
          component="div"
          fontWeight={600}
          gutterBottom
          sx={{ color: darkMode ? "#ffffff" : "#0f172a" }}
        >
          {product.title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: darkMode ? "#94a3b8" : "#64748b",
            lineHeight: 1.6,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.description}
        </Typography>
      </CardContent>

      {/* Flat text-link actions, left-aligned, matching SHARE / LEARN MORE */}
      {role === "admin" && (
        <CardActions sx={{ px: 2, pb: 2, pt: 0,justifyContent: "flex-end", }}>
          <Button
            size="small"
            onClick={() => startEditing(product)}
            sx={{
              fontWeight: 700,
              fontSize: "0.8rem",
              letterSpacing: 0.5,
              color: darkMode ? BLUE_DARK : BLUE_LIGHT,
              bgcolor: darkMode ? BLUE_LIGHT : BLUE_DARK,
              "&:hover": { bgcolor: alpha(darkMode ? BLUE_DARK : BLUE_LIGHT, 0.7) },
            }}
          >
            EDIT
          </Button>
          <Button
            size="small"
            onClick={() => handleDeleteClick(product._id)}
            sx={{
              fontWeight: 700,
              fontSize: "0.8rem",
              letterSpacing: 0.5,
              color: "#efefef",
              bgcolor: "#ef4444",
              "&:hover": { bgcolor: alpha("#ef4444", 0.8) },
            }}
          >
            DELETE
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default React.memo(ProductCard);
