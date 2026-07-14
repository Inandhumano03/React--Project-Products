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
} from "@mui/material";
import { Grid } from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { toast, ToastContainer } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import useDocumentTitle from "../hooks/UseDocumentTitle";
import useProductManager from "../hooks/useProductManager";
import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import ProductEditForm from "../../components/Products/ProductEditForm"
import ProductCard from "../../components/Products/ProductCard"
import AddIcon from "@mui/icons-material/Add";
import AddProduct from "./AddProduct"; // adjust path if needed
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
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setOpenEditDialog(true);
};
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

      <Dialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
          },
        }}
      >
        <DialogTitle
          sx={{
            position: "relative",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "1.8rem",
            py: 2.5,
          }}
        >
          Add Product

          <Button
            color="error"
            startIcon={<CloseIcon />}
            onClick={() => setOpenAddDialog(false)}
            sx={{
              position: "absolute",
              right: 16,
              top: "50%",
              transform: "translateY(-50%)",
              textTransform: "uppercase",
            }}
          >
            Close
          </Button>
        </DialogTitle>

        <DialogContent dividers>
          <AddProduct
            setProducts={setProducts}
          />
        </DialogContent>
      </Dialog>
      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        fullWidth
        maxWidth="md"
        scroll="paper"
        PaperProps={{
          sx: {
            borderRadius: 4,
            maxHeight: "90vh",
          },
        }}
      >
        <DialogTitle
          sx={{
            position: "relative",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "1.8rem",
          }}
        >
          Edit Product

          <Button
            color="error"
            startIcon={<CloseIcon />}
            onClick={() => setOpenEditDialog(false)}
            sx={{
              position: "absolute",
              right: 16,
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            Close
          </Button>
        </DialogTitle>

        <DialogContent dividers>
          {selectedProduct && (
            <ProductEditForm
              product={selectedProduct}
              darkMode={darkMode}
              updateProduct={async (...args) => {
                await updateProduct(...args);
                setOpenEditDialog(false);
              }}
              setEditingId={() => setOpenEditDialog(false)}
            />
          )}
        </DialogContent>
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

      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{ mb: 4 }}
      >
        <TextField
          fullWidth
          label="Search Products"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
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
          }}
        />

        {role === "admin" && (
          <Tooltip
            title="Add Product"
            arrow
            placement="bottom"
          >
            <Button
              variant="contained"
              onClick={() => setOpenAddDialog(true)}
              sx={{
                minWidth: 55,
                height: 55,
                borderRadius: "50%",
              }}
            >
              <AddIcon

              />
            </Button>
          </Tooltip>
        )}
      </Stack>
      {showAddProduct && (
        <Box sx={{ mb: 4 }}>
          <AddProduct
            setProducts={setProducts}
          />
        </Box>
      )}
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
          container
          spacing={4}
          alignItems="stretch"
        >
          {filteredProducts.map((product) => (
            <Grid
              key={product._id}
              size={{
                xs: 12,
                md: 6,
              }}
              sx={{
                display: "flex",
              }}
            >
              <Card
                sx={{
                  width: "100%",
                  height: 320,
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 4,
                  overflow: "hidden",
                  bgcolor: darkMode ? "#1e293b" : "#fff",
                  boxShadow: 5,

                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 10,
                  },
                }}
              >
                <ProductCard
                  product={product}
                  darkMode={darkMode}
                  expandedId={expandedId}
                  setExpandedId={setExpandedId}
                  role={role}
                  startEditing={handleEditProduct}
                  handleDeleteClick={handleDeleteClick}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}


