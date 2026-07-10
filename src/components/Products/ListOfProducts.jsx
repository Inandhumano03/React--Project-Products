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
import  ProductEditForm from "../../components/Products/ProductEditForm"
import  ProductCard  from "../../components/Products/ProductCard"
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
    setEditingId,
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

                 { editingId === product._id ? (
                  <ProductEditForm
                    product={product}
                    darkMode={darkMode}
                    editTitle={editTitle}
                    setEditTitle={setEditTitle}
                    editDescription={editDescription}
                    setEditDescription={setEditDescription}
                    updateProduct={updateProduct}
                    setEditingId={setEditingId}
                  />
                  ) : (
                  <ProductCard
                    product={product}
                    darkMode={darkMode}
                    expandedId={expandedId}
                    setExpandedId={setExpandedId}
                    role={role}
                    startEditing={startEditing}
                    handleDeleteClick={handleDeleteClick}
                  />
                  )
                }
                </Card>
              </Grid>
            )
          )}
        </Grid>
      )}
    </Container>
  );
}


