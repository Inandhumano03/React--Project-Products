// import {
//   Box,
//   Stack,
//   Container,
//   Typography,
//   TextField,
//   Card,
//   CardContent,
//   CardActions,
//   CardMedia,
//   Button,
// } from "@mui/material";
// import { Grid } from "@mui/material";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import Tooltip from "@mui/material/Tooltip";
// import IconButton from "@mui/material/IconButton";
// import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
// import { toast, ToastContainer } from "react-toastify";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import SaveIcon from "@mui/icons-material/Save";
// import CancelIcon from "@mui/icons-material/Cancel";
// import useDocumentTitle from "../hooks/UseDocumentTitle";
// import useProductManager from "../hooks/useProductManager";
// import { useContext, useState } from "react";
// import { ThemeContext } from "../context/ThemeContext";
// import ProductEditForm from "../../components/Products/ProductEditForm"
// import ProductCard from "../../components/Products/ProductCard"
// import AddIcon from "@mui/icons-material/Add";
// import AddProduct from "./AddProduct"; // adjust path if needed
// export default function
//   ListOfProducts({
//     products,
//     setProducts,
//   }) {


//   useDocumentTitle(
//     "Product List"
//   );
//   const {
//     role,
//     search,
//     setSearch,
//     expandedId,
//     setExpandedId,
//     editingId,
//     editTitle,
//     setEditingId,
//     editDescription,
//     setEditTitle,
//     setEditDescription,
//     filteredProducts,
//     openDialog,
//     handleDeleteClick,
//     handleCancelDelete,
//     handleConfirmDelete,
//     startEditing,
//     updateProduct
//   } = useProductManager(products, setProducts);

//   const { darkMode } =
//     useContext(ThemeContext);
//   const [openEditDialog, setOpenEditDialog] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [showAddProduct, setShowAddProduct] = useState(false);
//   const [openAddDialog, setOpenAddDialog] = useState(false);
//   const handleEditProduct = (product) => {
//     setSelectedProduct(product);
//     setOpenEditDialog(true);
// };
//   return (
//     <Container
//       maxWidth="xl"
//       sx={{
//         py: 4,
//         minHeight: "100vh",
//         bgcolor: darkMode
//           ? "#0f172a"
//           : "#f8fafc",
//       }}
//     >
//       <Dialog
//         open={openDialog}
//         onClose={handleCancelDelete}
//         slotProps={{
//           paper: {
//             sx: {
//               borderRadius: 4,
//               width: 400,
//               p: 1,
//             },
//           },
//         }}
//       >
//         <DialogTitle
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             gap: 1.5,
//             fontWeight: "bold",
//             color: "#d32f2f",
//             pb: 1,
//           }}
//         >
//           <WarningAmberRoundedIcon
//             color="error"
//             fontSize="large"
//           />

//           Confirm Deletion
//         </DialogTitle>


//         <DialogContent>
//           <Typography variant="body1">
//             Are you sure you want to delete this product?
//           </Typography>

//           <Typography
//             variant="body2"
//             color="text.secondary"
//             sx={{ mt: 1 }}
//           >
//             This action cannot be undone.
//           </Typography>
//         </DialogContent>


//         <DialogActions
//           sx={{
//             px: 3,
//             pb: 2,
//             gap: 1,
//           }}
//         >
//           <Button
//             onClick={handleCancelDelete}
//             variant="outlined"
//             color="inherit"
//             sx={{
//               borderRadius: 2,
//               textTransform: "none",
//               px: 3,
//             }}
//           >
//             No
//           </Button>

//           <Button
//             onClick={handleConfirmDelete}
//             variant="contained"
//             color="error"
//             sx={{
//               borderRadius: 2,
//               textTransform: "none",
//               px: 3,
//               fontWeight: "bold",
//             }}
//           >
//             Yes, Delete
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Dialog
//         open={openAddDialog}
//         onClose={() => setOpenAddDialog(false)}
//         maxWidth="md"
//         fullWidth
//         PaperProps={{
//           sx: {
//             borderRadius: 4,
//           },
//         }}
//       >
//         <DialogTitle
//           sx={{
//             position: "relative",
//             textAlign: "center",
//             fontWeight: "bold",
//             fontSize: "1.8rem",
//             py: 2.5,
//           }}
//         >
//           Add Product

//           <Button
//             color="error"
//             startIcon={<CloseIcon />}
//             onClick={() => setOpenAddDialog(false)}
//             sx={{
//               position: "absolute",
//               right: 16,
//               top: "50%",
//               transform: "translateY(-50%)",
//               textTransform: "uppercase",
//             }}
//           >
//             Close
//           </Button>
//         </DialogTitle>

//         <DialogContent dividers>
//           <AddProduct
//             setProducts={setProducts}
//           />
//         </DialogContent>
//       </Dialog>
//       <Dialog
//         open={openEditDialog}
//         onClose={() => setOpenEditDialog(false)}
//         fullWidth
//         maxWidth="md"
//         scroll="paper"
//         PaperProps={{
//           sx: {
//             borderRadius: 4,
//             maxHeight: "90vh",
//           },
//         }}
//       >
//         <DialogTitle
//           sx={{
//             position: "relative",
//             textAlign: "center",
//             fontWeight: "bold",
//             fontSize: "1.8rem",
//           }}
//         >
//           Edit Product

//           <Button
//             color="error"
//             startIcon={<CloseIcon />}
//             onClick={() => setOpenEditDialog(false)}
//             sx={{
//               position: "absolute",
//               right: 16,
//               top: "50%",
//               transform: "translateY(-50%)",
//             }}
//           >
//             Close
//           </Button>
//         </DialogTitle>

//         <DialogContent dividers>
//           {selectedProduct && (
//             <ProductEditForm
//               product={selectedProduct}
//               darkMode={darkMode}
//               updateProduct={async (...args) => {
//                 await updateProduct(...args);
//                 setOpenEditDialog(false);
//               }}
//               setEditingId={() => setOpenEditDialog(false)}
//             />
//           )}
//         </DialogContent>
//       </Dialog>
//       <Typography
//         variant="h4"
//         fontWeight="bold"
//         gutterBottom
//         sx={{
//           color: darkMode ? "#ffffff" : "#000000",
//         }}
//       >
//         Product Dashboard
//       </Typography>

//       <Typography
//         variant="subtitle1"
//         sx={{
//           mb: 3,
//           color: darkMode
//             ? "#cbd5e1"
//             : "#64748b",
//         }}
//       >
//         Total Products: {products.length}
//       </Typography>

//       <Stack
//         direction="row"
//         spacing={2}
//         alignItems="center"
//         sx={{ mb: 4 }}
//       >
//         <TextField
//           fullWidth
//           label="Search Products"
//           variant="outlined"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           sx={{
//             "& .MuiOutlinedInput-root": {
//               bgcolor: darkMode ? "#1e293b" : "#ffffff",
//               color: darkMode ? "#ffffff" : "#000000",
//               borderRadius: 3,

//               "& fieldset": {
//                 borderColor: darkMode ? "#475569" : "#d1d5db",
//               },

//               "&:hover fieldset": {
//                 borderColor: darkMode ? "#94a3b8" : "#1976d2",
//               },

//               "&.Mui-focused fieldset": {
//                 borderColor: "#1976d2",
//                 borderWidth: "2px",
//               },
//             },

//             "& .MuiInputLabel-root": {
//               color: darkMode ? "#cbd5e1" : "#64748b",
//             },

//             "& .MuiInputLabel-root.Mui-focused": {
//               color: "#1976d2",
//             },
//           }}
//         />

//         {role === "admin" && (
//           <Tooltip
//             title="Add Product"
//             arrow
//             placement="bottom"
//           >
//             <Button
//               variant="contained"
//               onClick={() => setOpenAddDialog(true)}
//               sx={{
//                 minWidth: 55,
//                 height: 55,
//                 borderRadius: "50%",
//               }}
//             >
//               <AddIcon

//               />
//             </Button>
//           </Tooltip>
//         )}
//       </Stack>
//       {showAddProduct && (
//         <Box sx={{ mb: 4 }}>
//           <AddProduct
//             setProducts={setProducts}
//           />
//         </Box>
//       )}
//       <Typography
//         variant="body1"
//         sx={{
//           mb: 2,
//           color: darkMode ? "#cbd5e1" : "#64748b",
//         }}
//       >
//         Showing {filteredProducts.length} of {products.length} Products
//       </Typography>

//       {filteredProducts.length === 0 ? (
//         <Typography
//           variant="h6"
//           align="center"
//           sx={{
//             mt: 4,
//             color: darkMode ? "#ffffff" : "#000000",
//           }}
//         >
//           No Products Found
//         </Typography>
//       ) : (
//         <Grid
//           container
//           spacing={4}
//           alignItems="stretch"
//         >
//           {filteredProducts.map((product) => (
//             <Grid
//               key={product._id}
//               size={{
//                 xs: 12,
//                 md: 6,
//               }}
//               sx={{
//                 display: "flex",
//               }}
//             >
//               <Card
//                 sx={{
//                   width: "100%",
//                   height: 320,
//                   display: "flex",
//                   flexDirection: "column",
//                   borderRadius: 4,
//                   overflow: "hidden",
//                   bgcolor: darkMode ? "#1e293b" : "#fff",
//                   boxShadow: 5,

//                   "&:hover": {
//                     transform: "translateY(-5px)",
//                     boxShadow: 10,
//                   },
//                 }}
//               >
//                 <ProductCard
//                   product={product}
//                   darkMode={darkMode}
//                   expandedId={expandedId}
//                   setExpandedId={setExpandedId}
//                   role={role}
//                   startEditing={handleEditProduct}
//                   handleDeleteClick={handleDeleteClick}
//                 />
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       )}
//     </Container>
//   );
// }


import {
  Box,
  Stack,
  Container,
  Typography,
  TextField,
  Grid,
  InputAdornment,
  alpha,
} from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Tooltip from "@mui/material/Tooltip";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import { ToastContainer } from "react-toastify";
import useDocumentTitle from "../hooks/UseDocumentTitle";
import useProductManager from "../hooks/useProductManager";
import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import ProductEditForm from "../../components/Products/ProductEditForm";
import ProductCard from "../../components/Products/ProductCard";
import AddProduct from "./AddProduct";

const BLUE = {
  primary: "#1D4ED8",
  soft: "#3B82F6",
  bright: "#60A5FA",
  dark: "#2563EB",
};

const glassPaperSx = (darkMode) => ({
  borderRadius: 5,
  backgroundImage: "none",
  bgcolor: darkMode ? alpha("#0f172a", 0.55) : alpha("#ffffff", 0.55),
  backdropFilter: "blur(28px) saturate(180%)",
  WebkitBackdropFilter: "blur(28px) saturate(180%)",
  border: `1px solid ${darkMode ? alpha("#fff", 0.14) : alpha("#ffffff", 0.6)}`,
  boxShadow: darkMode
    ? `0 24px 64px rgba(0,0,0,0.55), inset 0 1px 0 ${alpha("#fff", 0.08)}`
    : `0 24px 64px ${alpha(BLUE.primary, 0.18)}, inset 0 1px 0 ${alpha("#fff", 0.6)}`,
});

const BackgroundOrbs = ({ darkMode }) => {
  if (!darkMode) {
    return (
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          zIndex: -1,
          overflow: "hidden",
          bgcolor: "#F5F8FF",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: -140,
            left: -110,
            width: 440,
            height: 440,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${BLUE.soft} 0%, transparent 70%)`,
            opacity: 0.28,
            // filter: "blur(10px)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 100,
            right: -150,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${BLUE.primary} 0%, transparent 70%)`,
            opacity: 0.22,
            // filter: "blur(10px)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -170,
            left: "35%",
            width: 520,
            height: 520,
            borderRadius: "50%",
            background: "radial-gradient(circle, #38BDF8 0%, transparent 70%)",
            opacity: 0.2,
            // filter: "blur(10px)",
          }}
        />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        overflow: "hidden",
        bgcolor: "#0B1120",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -120,
          left: -100,
          width: 420,
          height: 420,
          borderRadius: "50%",
          background: "radial-gradient(circle, #2563eb 0%, transparent 70%)",
          opacity: 0.35,
          filter: "blur(10px)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 120,
          right: -140,
          width: 480,
          height: 480,
          borderRadius: "50%",
          background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)",
          opacity: 0.3,
          filter: "blur(10px)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -160,
          left: "35%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, #0891b2 0%, transparent 70%)",
          opacity: 0.25,
          filter: "blur(10px)",
        }}
      />
    </Box>
  );
};

export default function ListOfProducts({ products, setProducts }) {
  useDocumentTitle("Product List");

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
    updateProduct,
  } = useProductManager(products, setProducts);

  const { darkMode } = useContext(ThemeContext);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setOpenEditDialog(true);
  };

  return (
    <Box sx={{ position: "relative" }}>
      <BackgroundOrbs darkMode={darkMode} />

      <Container maxWidth="xl" sx={{ py: 4, position: "relative" }}>
        <ToastContainer
          position="top-right"
          theme={darkMode ? "dark" : "light"}
        />

        {/* ── Delete confirmation dialog ── */}
        <Dialog
          open={openDialog}
          onClose={handleCancelDelete}
          slotProps={{
            paper: {
              sx: { ...glassPaperSx(darkMode), width: 400, p: 1 },
            },
          }}
        >
          <DialogTitle
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              fontWeight: 800,
              letterSpacing: -0.3,
              color: "#ef4444",
              pb: 1,
            }}
          >
            <WarningAmberRoundedIcon color="error" fontSize="large" />
            Confirm Deletion
          </DialogTitle>

          <DialogContent>
            <Typography
              variant="body1"
              sx={{ color: darkMode ? "#e2e8f0" : "#1e293b" }}
            >
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

          <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
            <Button
              onClick={handleCancelDelete}
              variant="outlined"
              color="inherit"
              sx={{ borderRadius: 999, textTransform: "none", px: 3 }}
            >
              No
            </Button>
            <Button
              onClick={handleConfirmDelete}
              variant="contained"
              color="error"
              sx={{
                borderRadius: 999,
                textTransform: "none",
                px: 3,
                fontWeight: 700,
              }}
            >
              Yes, Delete
            </Button>
          </DialogActions>
        </Dialog>

        {/* ── Add product dialog ── */}
        <Dialog
          open={openAddDialog}
          onClose={() => setOpenAddDialog(false)}
          maxWidth="md"
          fullWidth
          scroll="body"
          slotProps={{
            paper: {
              sx: {
                my: 4,
                borderRadius: 5,

                bgcolor: darkMode ? "#0F172A" : "#FFFFFF",

                backgroundImage: "none",

                backdropFilter: darkMode
                  ? "blur(24px)"
                  : "none",

                WebkitBackdropFilter: darkMode
                  ? "blur(24px)"
                  : "none",

                border: darkMode
                  ? "1px solid rgba(255,255,255,0.12)"
                  : "1px solid #E2E8F0",

                boxShadow: darkMode
                  ? "0 20px 60px rgba(0,0,0,.45)"
                  : "0 16px 40px rgba(15,23,42,.12)",
              },
            },
          }}
        >
          <DialogTitle
            sx={{
              position: "relative",
              textAlign: "center",
              fontWeight: 800,
              fontSize: "1.6rem",
              letterSpacing: -0.4,
              py: 2.5,
              color: darkMode ? "#fff" : "#0f172a",
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
                textTransform: "none",
                borderRadius: 999,
              }}
            >
            </Button>
          </DialogTitle>

          <DialogContent
            dividers
            sx={{ borderColor: alpha("#ffffff", 0.2) }}
          >
            <AddProduct setProducts={setProducts} />
          </DialogContent>
        </Dialog>

        {/* ── Edit product dialog ── */}
        <Dialog
          open={openEditDialog}
          onClose={() => setOpenEditDialog(false)}
          maxWidth="md"
          fullWidth
          scroll="body"
          slotProps={{
            paper: {
              sx: {
                my: 4,
                borderRadius: 5,

                bgcolor: darkMode ? "#0F172A" : "#FFFFFF",

                backgroundImage: "none",

                backdropFilter: darkMode
                  ? "blur(24px)"
                  : "none",

                WebkitBackdropFilter: darkMode
                  ? "blur(24px)"
                  : "none",

                border: darkMode
                  ? "1px solid rgba(255,255,255,0.12)"
                  : "1px solid #E2E8F0",

                boxShadow: darkMode
                  ? "0 20px 60px rgba(0,0,0,.45)"
                  : "0 16px 40px rgba(15,23,42,.12)",
              },
            },
          }}
        >
          <DialogTitle
            sx={{
              position: "relative",
              textAlign: "center",
              fontWeight: 800,
              fontSize: "1.6rem",
              letterSpacing: -0.4,
              py: 2.5,
              color: darkMode ? "#fff" : "#0f172a",
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
                textTransform: "none",
                borderRadius: 999,
              }}
            >
            </Button>
          </DialogTitle>

          <DialogContent
            dividers
            sx={{
              borderColor: alpha("#ffffff", 0.2),
            }}
          >
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

        {/* ── Page header ── */}
        <Stack
          alignItems="center"
          spacing={1}
          sx={{ mb: 3, textAlign: "center" }}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={1.5}
            justifyContent="center"
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1.5,
                width: "100%",
                mb: 0.5,
              }}
            >
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 3,
                  display: "grid",
                  placeItems: "center",
                  background: darkMode ? alpha("#2563eb", 0.35) : "#FFFFFF",
                  border: `1px solid ${darkMode ? alpha("#fff", 0.15) : "#E2E8F0"}`,
                  boxShadow: darkMode
                    ? "0 6px 18px rgba(37,99,235,.4)"
                    : "0 6px 18px rgba(15,23,42,.08)",
                }}
              >
                <Inventory2RoundedIcon
                  sx={{ color: darkMode ? "#fff" : "#6366F1" }}
                />
              </Box>

              <Typography
                variant="h4"
                fontWeight={800}
                letterSpacing={-0.5}
                sx={{
                  color: darkMode ? "#ffffff" : "#0f172a",
                  lineHeight: 1.15,
                  textAlign: "center",
                }}
              >
                PRODUCTS
              </Typography>
            </Box>
          </Stack>

          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 500,
              letterSpacing: 0.15,
              color: darkMode ? "#94a3b8" : "#64748b",
            }}
          >
            Total Products: {products.length}
          </Typography>
        </Stack>

        {/* ── Search bar — full width, own row ── */}
        <TextField
          fullWidth
          placeholder="Search products…"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon
                    sx={{ color: darkMode ? "#94a3b8" : "#64748b" }}
                  />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              bgcolor: darkMode
                ? alpha("#1e293b", 0.4)
                : alpha("#ffffff", 0.5),
              backdropFilter: "blur(18px) saturate(180%)",
              WebkitBackdropFilter: "blur(18px) saturate(180%)",
              color: darkMode ? "#ffffff" : "#0f172a",
              borderRadius: 999,
              transition: "all 0.2s ease",
              boxShadow: darkMode
                ? `inset 0 1px 0 ${alpha("#fff", 0.05)}`
                : `inset 0 1px 0 ${alpha("#fff", 0.7)}`,
              "& fieldset": {
                borderColor: darkMode
                  ? alpha("#fff", 0.14)
                  : alpha("#ffffff", 0.6),
              },
              "&:hover fieldset": {
                borderColor: darkMode ? "#60a5fa" : BLUE.soft,
              },
              "&.Mui-focused fieldset": {
                borderColor: darkMode ? "#2563eb" : BLUE.primary,
                borderWidth: "2px",
              },
            },
          }}
        />

        {/* ── Add button — right-aligned, own row ── */}
        {role === "admin" && (
          <Box sx={{ display: "flex", justifyContent: "flex-end"}}>
            <Tooltip title="Add Product" arrow placement="bottom">
              <Button
                variant="contained"
                startIcon={<AddRoundedIcon />}
                onClick={() => setOpenAddDialog(true)}
                sx={{
                  height: 52,
                  minWidth: 180,
                  px: 3.5,
                  borderRadius: "16px",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  letterSpacing: "0.8px",
                  color: "#fff",
                  background: darkMode
                    ? "linear-gradient(135deg, #2563EB, #1D4ED8)"
                    : `linear-gradient(135deg, ${BLUE.soft}, ${BLUE.primary})`,
                  boxShadow: darkMode
                    ? "0 10px 24px rgba(37,99,235,.35)"
                    : `0 10px 24px ${alpha(BLUE.primary, 0.3)}`,
                  transition: "all .3s ease",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: darkMode
                      ? "0 16px 32px rgba(37,99,235,.45)"
                      : `0 16px 32px ${alpha(BLUE.primary, 0.4)}`,
                  },
                  "& .MuiButton-startIcon": { marginRight: "8px" },
                }}
              >
                ADD PRODUCT
              </Button>
            </Tooltip>
            
          </Box>
          
        )}

        {/* ── Results count ── */}
        <Typography
          variant="body2"
          sx={{mb: 2, color: darkMode ? "#94a3b8" : "#64748b" }}
        >
          Showing {filteredProducts.length} of {products.length} products
        </Typography>

        {/* ── Product grid / empty state ── */}
        {filteredProducts.length === 0 ? (
          <Box
            sx={{
              mt: 6,
              py: 8,
              textAlign: "center",
              borderRadius: 5,
              bgcolor: darkMode
                ? alpha("#1e293b", 0.35)
                : alpha("#ffffff", 0.45),
              backdropFilter: "blur(20px) saturate(180%)",
              border: `1px dashed ${darkMode ? alpha("#fff", 0.2) : alpha(BLUE.primary, 0.2)
                }`,
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: darkMode ? "#e2e8f0" : "#334155" }}
            >
              No products found
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: darkMode ? "#64748b" : "#94a3b8", mt: 0.5 }}
            >
              Try a different search term
              {role === "admin" ? ", or add a new product." : "."}
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3} alignItems="stretch">
            {filteredProducts.map((product) => (
              <Grid
                key={product._id}
                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                sx={{ display: "flex" }}
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
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
