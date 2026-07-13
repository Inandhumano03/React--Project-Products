import React from "react";
import {
  Card,
  CardMedia,
  Typography,
  Button,
  Stack,
  Box,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import {Dialog} from "@mui/material";
import {DialogContent} from "@mui/material";
const ProductCard = ({
  product,
  darkMode,
  expandedId,
  setExpandedId,
  role,
  startEditing,
  handleDeleteClick,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: 4,
        boxShadow: 5,
        transition: "0.3s",
        bgcolor: darkMode ? "#1e293b" : "#ffffff",
        color: darkMode ? "#ffffff" : "#000000",

        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 10,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          p: 2,
          gap: 2,
          alignItems: "flex-start",
        }}
      >
        {/* Product Image */}
        {product.image && (
          <CardMedia
            component="img"
            image={product.image}
            alt={product.title}
            onClick={() => {
              setPreviewImage(product.image);
              setPreviewOpen(true);
            }}
            sx={{
              width: 110,
              height: 110,
              borderRadius: 2,
              objectFit: "cover",
              flexShrink: 0,
              cursor: "pointer",
            }}
          />
        )}
        <Dialog
          open={previewOpen}
          onClose={() => setPreviewOpen(false)}
          maxWidth="md"
        >
          <DialogContent
            sx={{
              p: 0,
              bgcolor: "black",
            }}
          >
            <img
              src={previewImage}
              alt="Preview"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
          </DialogContent>
        </Dialog>

        {/* Product Details */}
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h6"
            fontWeight="bold"
          >
            {product.title}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: darkMode
                ? "#cbd5e1"
                : "#64748b",
              mt: 1,
            }}
          >
            {expandedId === product._id
              ? product.description
              : `${product.description.slice(
                0,
                120
              )}${product.description.length > 120
                ? "..."
                : ""
              }`}
          </Typography>

          {product.description.length >
            120 && (
              <Button
                size="small"
                sx={{
                  mt: 1,
                  p: 0,
                }}
                onClick={() =>
                  setExpandedId(
                    expandedId === product._id
                      ? null
                      : product._id
                  )
                }
              >
                {expandedId ===
                  product._id
                  ? "See Less"
                  : "See More"}
              </Button>
            )}

          {role === "admin" && (
            <Stack
              direction="row"
              spacing={2}
              sx={{ mt: 2 }}
            >
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={() =>
                  startEditing(product)
                }
              >
                Edit
              </Button>

              <Button
                variant="contained"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() =>
                  handleDeleteClick(
                    product._id
                  )
                }
              >
                Delete
              </Button>
            </Stack>
          )}
        </Box>
      </Box>
    </Card>
  );
};

export default React.memo(ProductCard);