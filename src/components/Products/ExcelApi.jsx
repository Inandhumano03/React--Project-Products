
import React, { useState,useContext } from "react";
import * as XLSX from "xlsx";
import { instance } from "../axios";
import useDocumentTitle from "../hooks/UseDocumentTitle";
import {
  ToastContainer,
  toast,
} from "react-toastify";

import {
  Container,
  Paper,
  Typography,
  Button,
  Stack,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TextField,
  Box,
} from "@mui/material";

import UploadFileIcon from "@mui/icons-material/UploadFile";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import ThemeToggle from "../hooks/ThemeToggle";
import { ThemeContext } from "../context/ThemeContext";
import "react-toastify/dist/ReactToastify.css";
export default function ExcelApi() {
  useDocumentTitle(
    "Excel Upload"
  );

  const { darkMode } =
      useContext(ThemeContext);

  const [excelData, setExcelData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [editingIndex, setEditingIndex] = useState(null);
  const [editRow, setEditRow] = useState({});

  // Upload Excel File
  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const data = event.target.result;

      const workbook = XLSX.read(data, {
        type: "binary",
      });

      const sheetName = workbook.SheetNames[0];

      const worksheet =
        workbook.Sheets[sheetName];

      const jsonData = XLSX.utils
  .sheet_to_json(worksheet)
  .map((row, index) => ({
    ...row,
    id: index + 1,
  }));

setExcelData(jsonData);
    };

    reader.readAsBinaryString(file);
  };

  // Delete Row
  const deleteRow = (index) => {
    setExcelData((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  // Start Editing
  const startEditing = (row, index) => {
    setEditingIndex(index);
    setEditRow({ ...row });
  };

  // Save Edit
  const saveEdit = () => {
    if (
      !editRow["Product Name"]?.trim() ||
      !editRow.Category?.trim()
    ) {
      toast.warning("Please fill all fields");
      return;
    }

    const updatedData = [...excelData];

    updatedData[editingIndex] = {
      ...editRow,
    };

    setExcelData(updatedData);

    setEditingIndex(null);
    setEditRow({});

    toast.success("Row Updated Successfully");
  };

  // Cancel Edit
  const cancelEdit = () => {
    setEditingIndex(null);
    setEditRow({});
  };

  // Upload To API
  const sendToApi = async () => {
    if (excelData.length === 0) {
      toast.warning("Please upload an Excel file first");
      return;
    }

    try {
      setLoading(true);

      for (const product of excelData) {
        await instance.post("/products/add", {
          id: product.ID,
          title: product["Product Name"],
          description: `${product.Category} - ₹${product.Price}`,
        });
      }

      toast.success(
        "All Products Uploaded Successfully"
      );
    } catch (error) {
      console.log(error);
      toast.error("Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  const downloadUpdatedExcel = () => {
    console.log("Downloading", excelData);
    const worksheet =
      XLSX.utils.json_to_sheet(excelData);

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Products"
    );

    XLSX.writeFile(
      workbook,
      "UpdatedProducts.xlsx"
    );
  };
  const textFieldStyle = {
  "& .MuiInputLabel-root": {
    color: darkMode ? "#cbd5e1" : "#64748b",
  },

  "& .MuiOutlinedInput-root": {
    color: darkMode ? "#ffffff" : "#000000",

    "& fieldset": {
      borderColor: darkMode
        ? "#64748b"
        : "#cbd5e1",
    },

    "&:hover fieldset": {
      borderColor: darkMode
        ? "#94a3b8"
        : "#1976d2",
    },

    "&.Mui-focused fieldset": {
      borderColor: "#1976d2",
    },
  },
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
      maxWidth="xl"
       sx={{
        minHeight: "100vh",
        bgcolor: darkMode ? "#0f172a" : "#f4f6f8",
        color: darkMode ? "#ffffff" : "#000000",
        py: 4,
      }}
    >
      <ToastContainer
        position="top-right"
        autoClose={3000}
      />

      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 4,
           bgcolor: darkMode ? "#0f172a" : "#f4f6f8",
        color: darkMode ? "#ffffff" : "#000000",
        py: 4,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
        >
          Excel API Upload
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          
          sx={{ mb: 3,
            alignitems:"center"
          }}
        >
          <Button
            variant="outlined"
            component="label"
            startIcon={
              <UploadFileIcon />
            }
          >
            Upload Excel

            <input
              hidden
              type="file"
              accept=".xlsx,.xls"
              onChange={
                handleFileUpload
              }
            />
          </Button>

          <Typography
            variant="body1"
            fontWeight="bold"
          >
            Records Loaded:
            {excelData.length}
          </Typography>
        </Stack>

        <Stack
          direction="row"
          spacing={2}
          sx={{ mb: 4 }}
        >
          <Button
            variant="contained"
            onClick={sendToApi}
            disabled={loading}
          >
            {loading
              ? "Uploading..."
              : "Send To API"}
          </Button>

          <Button
            variant="contained"
            color="success"
            startIcon={
              <DownloadIcon />
            }
            onClick={
              downloadUpdatedExcel
            }
          >
            Download Excel
          </Button>
        </Stack>

        {excelData.length > 0 && (
          <TableContainer
            component={Paper}
            elevation={3}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>ID</b>
                  </TableCell>

                  <TableCell>
                    <b>
                      Product Name
                    </b>
                  </TableCell>

                  <TableCell>
                    <b>Category</b>
                  </TableCell>

                  <TableCell>
                    <b>Price</b>
                  </TableCell>

                  <TableCell>
                    <b>Actions</b>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {excelData.map(
                  (
                    row,
                    index
                  ) => (
                    <TableRow
                      key={index}
                      hover
                    >
                      {editingIndex ===
                        index ? (
                        <>
                          <TableCell>
                            <TextField
                              size="small"
                              value={
                                editRow.ID ||
                                ""
                              }
                              onChange={(
                                e
                              ) =>
                                setEditRow(
                                  {
                                    ...editRow,
                                    ID: e
                                      .target
                                      .value,
                                  }
                                )
                              }
                            />
                          </TableCell>

                          <TableCell>
                            <TextField
                              size="small"
                              value={
                                editRow[
                                "Product Name"
                                ] ||
                                ""
                              }
                              onChange={(
                                e
                              ) =>
                                setEditRow(
                                  {
                                    ...editRow,
                                    "Product Name":
                                      e
                                        .target
                                        .value,
                                  }
                                )
                              }
                            />
                          </TableCell>

                          <TableCell>
                            <TextField
                              size="small"
                              value={
                                editRow.Category ||
                                ""
                              }
                              onChange={(
                                e
                              ) =>
                                setEditRow(
                                  {
                                    ...editRow,
                                    Category:
                                      e
                                        .target
                                        .value,
                                  }
                                )
                              }
                            />
                          </TableCell>

                          <TableCell>
                            <TextField
                              size="small"
                              value={
                                editRow.Price ||
                                ""
                              }
                              onChange={(
                                e
                              ) =>
                                setEditRow(
                                  {
                                    ...editRow,
                                    Price:
                                      e
                                        .target
                                        .value,
                                  }
                                )
                              }
                            />
                          </TableCell>

                          <TableCell>
                            <Stack
                              direction="row"
                              spacing={
                                1
                              }
                            >
                              <Button
                                size="small"
                                variant="contained"
                                color="success"
                                startIcon={
                                  <SaveIcon />
                                }
                                onClick={
                                  saveEdit
                                }
                              >
                                Save
                              </Button>

                              <Button
                                size="small"
                                variant="outlined"
                                color="error"
                                startIcon={
                                  <CancelIcon />
                                }
                                onClick={
                                  cancelEdit
                                }
                              >
                                Cancel
                              </Button>
                            </Stack>
                          </TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell>
                            {
                              row?.ID
                            }
                          </TableCell>

                          <TableCell>
                            {
                              row?.[
                              "Product Name"
                              ]
                            }
                          </TableCell>

                          <TableCell>
                            {
                              row?.Category
                            }
                          </TableCell>

                          <TableCell>
                            ₹
                            {
                              row?.Price
                            }
                          </TableCell>

                          <TableCell>
                            <Stack
                              direction="row"
                              spacing={
                                1
                              }
                            >
                              <Button
                                size="small"
                                variant="contained"
                                startIcon={
                                  <EditIcon />
                                }
                                onClick={() =>
                                  startEditing(
                                    row,
                                    index
                                  )
                                }
                              >
                                Edit
                              </Button>

                              <Button
                                size="small"
                                variant="contained"
                                color="error"
                                startIcon={
                                  <DeleteIcon />
                                }
                                onClick={() =>
                                  deleteRow(
                                    index
                                  )
                                }
                              >
                                Delete
                              </Button>
                            </Stack>
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Container>
    </Box>
  );
}