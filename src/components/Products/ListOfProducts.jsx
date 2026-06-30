import {
  Container,
  Typography,
  TextField,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
} from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { toast, ToastContainer } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import useDocumentTitle from "../hooks/UseDocumentTitle";
import React, { useState, useRef, useMemo, useCallback, useContext } from "react";
import { instance } from "../axios";
import useDebounce from "../hooks/useDebounce";
import ThemeToggle from "../hooks/ThemeToggle";
import { ThemeContext } from "../context/ThemeContext";
import { localId } from "../utils/localId";
export default function ListOfProducts({
  products,
  setProducts,
}) {
  useDocumentTitle(
    "Product List"
  );
  const { darkMode } =
    useContext(ThemeContext);

  const [search, setSearch] = useState("");

  const [expandedId, setExpandedId] =
    useState(null);
  const deletedProductRef = useRef(null);
  // waits 500ms after typing stops
  const debouncedSearch =
    useDebounce(search, 500);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);


  const [editDescription, setEditDescription] =
    useState("");

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedId(null);
  };

  const handleConfirmDelete = (event) => {
    if (event?.currentTarget) event.currentTarget.blur();
    deleteProduct(selectedId);
    handleCloseDialog();
  };
  const handleCancelDelete = () => {
    setOpenDialog(false);
    setSelectedId(null);
  };
  const deleteProduct = useCallback(
    async (id) => {
      const productToDelete = products.find(
        (product) => product.id === id
      );

      if (!productToDelete) return;

      // Remove product immediately from UI
      const updatedProducts = products.filter(
        (product) => product.id !== id
      );

      setProducts(updatedProducts);
      localStorage.setItem(
        "products",
        JSON.stringify(updatedProducts)
      );

      let undoClicked = false;

      toast.warning(
        ({ closeToast }) => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <span>Product Deleted</span>

            <Button
              variant="contained"
              color="secondary"
              size="small"
              sx={{
                ml: 2,
                px: 2,
                py: 0.5,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: "bold",
                boxShadow: 2,
                "&:hover": {
                  boxShadow: 5,
                  transform: "translateY(-1px)",
                },
                transition: "0.2s",
              }}
              onClick={() => {
                undoClicked = true;

                setProducts((prev) => {
                  const restoredProducts = [...prev, productToDelete].sort(
                    (a, b) => a.id - b.id
                  );

                  localStorage.setItem(
                    "products",
                    JSON.stringify(restoredProducts)
                  );

                  return restoredProducts;
                });

                closeToast();
              }}

            >
              Undo
            </Button>
          </div>
        ),
        {
          autoClose: 2000,

          onClose: async () => {
            // If Undo wasn't clicked,
            // permanently delete
            if (!undoClicked) {
              try {
                if (id <= 194) {
                  await instance.delete(
                    `/products/${id}`
                  );
                }
              } catch (error) {
                console.log(error);
              }
            }
          },
        }
      );
    },
    [products, setProducts]
  );

  const startEditing = (product) => {
    setEditingId(product.id);
    setEditTitle(product.title);
    setEditDescription(product.description);
  };

  const updateProduct = useCallback(
    async (id) => {

      console.log(
        "Update Function Called"
      );

      try {

        // Only call API for original
        // DummyJSON products

        if (id <= 194) {

          await instance.put(
            `/products/${id}`,
            {
              title: editTitle,
              description:
                editDescription,
            }
          );

        }

        setProducts((prev) => {
          const updatedProducts = prev.map((product) =>
            product.id === id
              ? {
                ...product,
                title: editTitle,
                description: editDescription,
              }
              : product
          );

          localStorage.setItem(
            "products",
            JSON.stringify(updatedProducts)
          );

          return updatedProducts;
        });

        setEditingId(null);

        toast.success(
          "Product Updated"
        );

      } catch (error) {

        console.log(error);

        toast.log(
          "Update Failed"
        );

      }
    },
    [
      editTitle,
      editDescription,
      setProducts,
    ]
  );

  console.log("ListOfProducts Rendered");
  const filteredProducts =
    useMemo(() => {

      console.log(
        "Filtering Products"
      );

      return products.filter(
        (product) =>
          product.title
            ?.toLowerCase()
            .includes(
              debouncedSearch.toLowerCase()
            )
      );

    }, [products, debouncedSearch]);


  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 4,
        minHeight: "100vh",
        bgcolor: darkMode
          ? "#0f172a"
          : "#f8fafc",
      }}
    >
      <Dialog
        open={openDialog}
        onClose={handleCancelDelete}
        slotProps={{
          paper: {
            sx: {
              borderRadius: 4,
              width: 400,
              p: 1,
            },
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            fontWeight: "bold",
            color: "#d32f2f",
            pb: 1,
          }}
        >
          <WarningAmberRoundedIcon
            color="error"
            fontSize="large"
          />

          Confirm Deletion
        </DialogTitle>


        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete this product?
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            This action cannot be undone.
          </Typography>
        </DialogContent>


        <DialogActions
          sx={{
            px: 3,
            pb: 2,
            gap: 1,
          }}
        >
          <Button
            onClick={handleCancelDelete}
            variant="outlined"
            color="inherit"
            sx={{
              borderRadius: 2,
              textTransform: "none",
              px: 3,
            }}
          >
            No
          </Button>

          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            color="error"
            sx={{
              borderRadius: 2,
              textTransform: "none",
              px: 3,
              fontWeight: "bold",
            }}
          >
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        sx={{
          color: darkMode ? "#ffffff" : "#000000",
        }}
      >
        Product Dashboard
      </Typography>

      <Typography
        variant="subtitle1"
        sx={{
          mb: 3,
          color: darkMode
            ? "#cbd5e1"
            : "#64748b",
        }}
      >
        Total Products: {products.length}
      </Typography>

      <TextField
        fullWidth
        label="Search Products"
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{
          mb: 4,

          "& .MuiOutlinedInput-root": {
            bgcolor: darkMode ? "#1e293b" : "#ffffff",
            color: darkMode ? "#ffffff" : "#000000",
            borderRadius: 3,

            "& fieldset": {
              borderColor: darkMode ? "#475569" : "#d1d5db",
            },

            "&:hover fieldset": {
              borderColor: darkMode ? "#94a3b8" : "#1976d2",
            },

            "&.Mui-focused fieldset": {
              borderColor: "#1976d2",
              borderWidth: "2px",
            },
          },

          "& .MuiInputLabel-root": {
            color: darkMode ? "#cbd5e1" : "#64748b",
          },

          "& .MuiInputLabel-root.Mui-focused": {
            color: "#1976d2",
          },

          "& .MuiInputBase-input::placeholder": {
            color: darkMode ? "#94a3b8" : "#9ca3af",
            opacity: 1,
          },
        }}
      />
      <Typography
        variant="body1"
        sx={{
          mb: 2,
          color: darkMode ? "#cbd5e1" : "#64748b",
        }}
      >
        Showing {filteredProducts.length} of {products.length} Products
      </Typography>

      {filteredProducts.length === 0 ? (
        <Typography
          variant="h6"
          align="center"
          sx={{
            mt: 4,
            color: darkMode ? "#ffffff" : "#000000",
          }}
        >
          No Products Found
        </Typography>
      ) : (
        <Grid
          size={12}
        >
          {filteredProducts.map(
            (product) => (
              <Grid
                size={12}
                key={product.id}
                sx={{
                  mb: 4,
                }}
              >
                <Card
                  sx={{
                    width: "100%",

                    borderRadius: 4,

                    boxShadow: 5,

                    transition: "0.3s",

                    bgcolor: darkMode
                      ? "#1e293b"
                      : "#ffffff",

                    color: darkMode
                      ? "#ffffff"
                      : "#000000",

                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: 10,
                    },
                  }}
                >
                  {editingId ===
                    product.id ? (
                    <CardContent
                      sx={{
                        p: 4,
                      }}
                    >
                      <TextField
                        fullWidth
                        label="Title"
                        value={editTitle}
                        onChange={(e) =>
                          setEditTitle(e.target.value)
                        }
                        sx={{
                          mb: 2,
                          gap: 2,
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
                          },

                        }}
                      />
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Description"
                        value={editDescription}
                        onChange={(e) =>
                          setEditDescription(e.target.value)
                        }
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
                          },
                        }}
                      />

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
                          startIcon={
                            <SaveIcon />
                          }
                          onClick={() =>
                            updateProduct(
                              product.id
                            )
                          }
                        >
                          Save
                        </Button>

                        <Button
                          variant="outlined"
                          color="error"
                          startIcon={
                            <CancelIcon />
                          }
                          onClick={() =>
                            setEditingId(
                              null
                            )
                          }
                        >
                          Cancel
                        </Button>
                      </CardActions>
                    </CardContent>
                  ) : (
                    <>
                      <CardContent>
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          gutterBottom
                        >
                          {product.title}
                        </Typography>

                        <Typography
                          variant="body2"
                          sx={{
                            color: darkMode
                              ? "#cbd5e1"
                              : "#64748b",
                          }}
                        >
                          {expandedId ===
                            product.id
                            ? product.description
                            : `${product.description.slice(
                              0,
                              120
                            )}${product
                              .description
                              .length >
                              120
                              ? "..."
                              : ""
                            }`}
                        </Typography>

                        {product
                          .description
                          .length > 120 && (
                            <Button
                              size="small"
                              sx={{
                                mt: 1,
                                p: 0,
                              }}
                              onClick={() =>
                                setExpandedId(
                                  expandedId ===
                                    product.id
                                    ? null
                                    : product.id
                                )
                              }
                            >
                              {expandedId ===
                                product.id
                                ? "See Less"
                                : "See More"}
                            </Button>
                          )}
                      </CardContent>

                      <CardActions
                        sx={{
                          px: 2,
                          pb: 2,
                          justifyContent:
                            "flex-end",
                          gap: 1,
                        }}
                      >
                        <Button
                          variant="contained"
                          startIcon={
                            <EditIcon />
                          }
                          onClick={() =>
                            startEditing(
                              product
                            )
                          }
                        >
                          Edit
                        </Button>

                        <Button
                          variant="contained"
                          color="error"
                          startIcon={
                            <DeleteIcon />
                          }
                          onClick={() =>
                            handleDeleteClick(product.id)
                          }
                        >
                          Delete
                        </Button>
                      </CardActions>
                    </>
                  )}
                </Card>
              </Grid>
            )
          )}
        </Grid>
      )}
    </Container>
  );
}


