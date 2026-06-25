import React, { useState, useContext } from "react";
import { instance } from "../axios";
import { toast } from "react-toastify";
import useDocumentTitle from "../hooks/UseDocumentTitle";
import { ThemeContext } from "../context/ThemeContext";
import ThemeToggle from "../hooks/ThemeToggle";
import { localId } from "../utils/localId";
import {
  Container,
  Card,
  Typography,
  TextField,
  Button,
  Stack,
  Box,
} from "@mui/material";
export default function AddProduct({ setProducts }) {
  useDocumentTitle(
    "Add Product"
  );

  const { darkMode } =
    useContext(ThemeContext);

  const [state, setState] = useState({
    title: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const addProduct = async () => {
    if (!state.title.trim()) {
      toast.warning("Title Required");
      return;
    }

    if (!state.description.trim()) {
      toast.warning("Description Required");
      return;
    }

    try {
      setLoading(true);

      const response = await instance.post("/products/add", {
        title: state.title,
        description: state.description,
      });
      console.log('resp', response)
      const newProduct = {
        ...response.data,
        id: localId(),
      };

      setProducts((prev) => {
        const updatedProducts = [newProduct, ...prev];

        localStorage.setItem(
          "products",
          JSON.stringify(updatedProducts)
        );

        return updatedProducts;
      });
      setState({
        title: "",
        description: "",
      });

      toast.success("Product Added Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed To Add Product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: darkMode ? "#0f172a" : "#f4f6f8",
        color: darkMode ? "#ffffff" : "#000000",
        py: 4,
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          mt: 5,
        }}

      >
        <Card
          sx={{
            p: 4,
            borderRadius: 4,
            boxShadow: 6,
            bgcolor: darkMode
              ? "#1e293b"
              : "#ffffff",
            color: darkMode
              ? "#ffffff"
              : "#000000",
          }}
        >

          <Typography
            variant="h4"
            fontWeight="bold"
            textalign="center"
            gutterBottom
            sx={{
              color: darkMode
                ? "#ffffff"
                : "#000000",
            }}
          >
            Add Product
          </Typography>

          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Product Title"
              variant="outlined"
              value={state.title}
              onChange={(e) =>
                setState({
                  ...state,
                  title: e.target.value,
                })
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

            <TextField
              fullWidth
              multiline
              rows={5}
              label="Product Description"
              variant="outlined"
              value={state.description}
              onChange={(e) =>
                setState({
                  ...state,
                  description:
                    e.target.value,
                })
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

            <Button
              variant="contained"
              size="large"
              onClick={addProduct}
              disabled={loading}
              sx={{
                py: 1.5,
                borderRadius: 2,
                fontWeight: "bold",
                textTransform:
                  "none",
              }}
            >
              {loading
                ? "Adding..."
                : "Add Product"}
            </Button>
          </Stack>
        </Card>
      </Container>
    </Box>
  );
}