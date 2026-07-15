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
import { storage } from "../appwrite/config";
import { ID } from "appwrite";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import {
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
export default function AddProduct({ setProducts }) {
  // useDocumentTitle(
  //   "Add Product"
  // );

  const { darkMode } =
    useContext(ThemeContext);

  const [state, setState] = useState({
    title: "",
    description: "",
    image: null,
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    image: "",
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
    if (!state.image)
      temp.image = "Please select an image.";

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
    state.description.trim().length >= 10 &&
    state.image;

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
      const uploadResponse = await storage.createFile(

        import.meta.env.VITE_APPWRITE_BUCKET_ID,

        ID.unique(),

        state.image

      );
      const imageId = uploadResponse.$id;
      const imageUrl = storage
        .getFileView(
          import.meta.env.VITE_APPWRITE_BUCKET_ID,
          uploadResponse.$id
        )
        .toString();
      const response = await instance.post("/products", {
        title: state.title,
        description: state.description,
        image: imageUrl
      });

      const newProduct = response.data;

      // setProducts((prev) => {
      //   const updatedProducts = [newProduct, ...prev];

      //   localStorage.setItem(
      //     "products",
      //     JSON.stringify(updatedProducts)
      //   );

      //   return updatedProducts;
      // });

      setState({
        title: "",
        description: "",
        image: null,
      });

      setErrors({
        title: "",
        description: "",
        image: "",
      });

      toast.success("Product Added Successfully");

    } catch (error) {

      console.error(error);

      // Axios errors (Express backend)
      if (error.response) {

        switch (error.response.status) {

          case 400:
            toast.error(
              error.response.data.errors?.[0]?.msg ||
              "Invalid Product Details"
            );
            break;

          case 401:
            toast.error("Please login first.");
            break;

          case 403:
            toast.error("Only Admin can add products.");
            break;

          case 404:
            toast.error("API endpoint not found.");
            break;

          case 500:
            toast.error("Internal Server Error.");
            break;

          default:
            toast.error(
              error.response.data.message ||
              "Failed to add product."
            );

        }

      }

      // Axios network error
      else if (error.request) {

        toast.error("Server is not responding.");

      }

      // Appwrite or other JavaScript errors
      else {

        toast.error(error.message || "Upload failed.");

      }

    } finally {

      setLoading(false);

    }
  }, [state, validateForm, setProducts]);
  //handleImage upload
  const handleImageChange = (event) => {

    const file = event.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {

      toast.error("Please select an image file.");

      setState(prev => ({
        ...prev,
        image: null
      }));

      return;

    }

    if (file.size > 5 * 1024 * 1024) {

      toast.error("Image size should be less than 5 MB.");

      setState(prev => ({
        ...prev,
        image: null
      }));

      return;

    }

    setState(prev => ({
      ...prev,
      image: file
    }));

  };
  return (
    <Stack
      spacing={3}
      sx={{
        p: 2,
      }}
    >
      {/* <Typography
        variant="h5"
        fontWeight="bold"
        gutterBottom
        sx={{
          color: darkMode ? "#ffffff" : "#000000",
        }}
      >
        Add Product
      </Typography> */}

      <TextField
        fullWidth
        label="Product Title"
        variant="outlined"
        name="title"
        value={state.title}
        onChange={handleChange}
        error={Boolean(errors.title)}
        helperText={
          errors.title || `${titleCharacters}/50 Characters`
        }
        slotProps={{
          htmlInput: {
            maxLength: 50,
          },
        }}
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

      <TextField
        fullWidth
        multiline
        rows={5}
        label="Product Description"
        variant="outlined"
        name="description"
        value={state.description}
        error={Boolean(errors.description)}
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

      {state.title && (
        <Typography color="success.main" variant="body2">
          Preview: {state.title}
        </Typography>
      )}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems="center"
        sx={{ width: "100%" }}
      >
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

            // backdropFilter: "blur(14px)",

            "&:hover": {
              background: darkMode
                ? "rgba(255,255,255,.10)"
                : "rgba(37,99,235,.08)",

              transform: "translateY(-2px)",

              borderColor: "#2563EB",
            },

            transition: ".3s",
          }}
        >
          Upload Image

          <input
            hidden
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </Button>

        <Button
          variant="outlined"
          startIcon={<RestartAltRoundedIcon />}
          onClick={() => {
            setState({
              title: "",
              description: "",
              image: null,
            });

            setErrors({
              title: "",
              description: "",
              image: "",
            });
          }}
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

            backdropFilter: "blur(14px)",

            "&:hover": {
              background: "#EF4444",
              color: "#fff",
              transform: "translateY(-2px)",
            },

            transition: ".3s",
          }}
        >
          Reset
        </Button>
      </Stack>

      {state.image && (
        <Typography
          sx={{
            mt: 1,
            ml: 1,
            color: darkMode ? "#94A3B8" : "#64748B",
            fontSize: "0.9rem",
            fontWeight: 500,
          }}
        >
          ✓ {state.image.name}
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


    </Stack>
  );
}