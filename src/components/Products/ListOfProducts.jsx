import {
  Box,
  Stack,
  Container,
  Typography,
  TextField,
  Card,
  CardContent,
  CardActions,
  CardMedia,
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
import useProductManager from "../hooks/useProductManager";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
export default function
  ListOfProducts({
    products,
    setProducts,
  }) {


  useDocumentTitle(
    "Product List"
  );
  const {
    role,
    search,
    setSearch,
    expandedId,
    setExpandedId,
    editingId,
    editTitle,
    editDescription,
    setEditTitle,
    setEditDescription,
    filteredProducts,
    openDialog,
    handleDeleteClick,
    handleCancelDelete,
    handleConfirmDelete,
    startEditing,
    updateProduct
  } = useProductManager(products, setProducts);

  const { darkMode } =
    useContext(ThemeContext);

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
                key={product._id}
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
                    product._id ? (
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
                              product._id
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
                      <Box
                        sx={{
                          display: "flex",
                          p: 2,
                          gap: 2,
                          alignItems: "flex-start",
                        }}
                      >
                        {/* Left Image */}
                        {product.image && (
                          <CardMedia
                            component="img"
                            image={product.image}
                            alt={product.title}
                            sx={{
                              width: 110,
                              height: 110,
                              borderRadius: 2,
                              objectFit: "cover",
                              flexShrink: 0,
                            }}
                          />
                        )}

                        {/* Right Side */}
                        <Box
                          sx={{
                            flex: 1,
                          }}
                        >
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
                              : `${product.description.slice(0, 120)}${product.description.length > 120
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
                                    expandedId ===
                                      product._id
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


