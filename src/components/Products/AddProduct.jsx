import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from "react";
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

  const [errors, setErrors] = useState({
    title: "",
    description: ""
  });

  useEffect(() => {
    console.log("AddProduct Mounted");

    return () => {
      console.log("AddProduct Unmounted");
    };
  }, []);

  const validateForm = useCallback(() => {
    let temp = {};

    if (!state.title.trim())
      temp.title = "Title is required";
    else if (state.title.length < 3)
      temp.title = "Minimum 3 characters";

    if (!state.description.trim())
      temp.description = "Description is required";
    else if (state.description.length < 10)
      temp.description =
        "Minimum 10 characters";

    setErrors(temp);

    return Object.keys(temp).length === 0;
  }, [state]);

  const titleCharacters = useMemo(() => {
    return state.title.length;
  }, [state.title]);

  const descriptionCharacters = useMemo(() => {
    return state.description.length;
  }, [state.description]);

  const isFormValid =
    state.title.trim().length >= 3 &&
    state.description.trim().length >= 10;

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);
  const [loading, setLoading] = useState(false);

  const addProduct = useCallback(async () => {
    if (!validateForm()) return;
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

      const response = await instance.post("/products", {
        title: state.title,
        description: state.description,
      });
      console.log('resp', response)
      const newProduct = response.data;

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
  }, [state, validateForm, setProducts]);

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
              name="title"
              value={state.title}
              onChange={handleChange}
              error={Boolean(errors.title)}
              helperText={
                errors.title ||
                `${titleCharacters}/50 Characters`
              }
              slotProps={{
                htmlInput: {
                  maxLength: 50,
                },
              }}

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
              name="description"
              value={state.description}
              error={Boolean(errors.title)}
              helperText={
                errors.description ||
                `${descriptionCharacters}/200 Characters`
              }
              slotProps={{
                htmlInput: {
                  maxLength: 200,
                },
              }}
              onChange={handleChange}
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
            {state.title && (
              <Typography
                color="success.main"
                variant="body2"
              >
                Preview: {state.title}
              </Typography>
            )}
            <Button
              variant="contained"
              size="large"
              onClick={addProduct}
              disabled={loading || !isFormValid}
              sx={{
                py: 1.5,
                borderRadius: 2,
                fontWeight: "bold",
                textTransform: "none",
              }}
            >
              {loading ? "Adding..." : "Add Product"}
            </Button>
            <Button
              color="secondary"
              variant="outlined"
              onClick={() => {
                setState({
                  title: "",
                  description: "",
                });

                setErrors({
                  title: "",
                  description: "",
                });
              }}
            >
              Reset
            </Button>
          </Stack>
        </Card>
      </Container>
    </Box>
  );
}