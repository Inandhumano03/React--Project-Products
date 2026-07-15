import { useEffect, useState, useContext, useMemo } from "react";
import "./App.css";
import { Typography } from "@mui/material";
import ListOfProducts from "./components/Products/ListOfProducts";
import AddProduct from "./components/Products/AddProduct";
import { instance } from "./components/axios"
import Navbar from "./components/Navbar";
import ExcelApi from "./components/Products/ExcelApi";
import UserLogin from './components/Products/UserLogin';
import UserRegister from './components/Products/UserRegister';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ThemeContext
} from "./components/context/ThemeContext";
import ThemeToggle from
  "./components/hooks/ThemeToggle";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

function AppContent() {
  const role = localStorage.getItem("role");


  const [products, setProducts] = useState([]);

  const location = useLocation();
  const { darkMode } = useContext(ThemeContext);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",

          primary: {
            main: "#6366F1",
          },
        },

        typography: {
          fontFamily: [
            'Manrope',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
          ].join(','),

          h1: {
            fontWeight: 800,
          },

          h2: {
            fontWeight: 800,
          },

          h3: {
            fontWeight: 700,
          },

          h4: {
            fontWeight: 700,
          },

          h5: {
            fontWeight: 700,
          },

          h6: {
            fontWeight: 600,
          },

          subtitle1: {
            fontWeight: 600,
          },

          body1: {
            fontWeight: 400,
          },

          body2: {
            fontWeight: 400,
          },

          button: {
            textTransform: "none",
            fontWeight: 700,
          },
        },
      }),
    [darkMode]
  );
  // Pages where Navbar should be hidden
  const hideNavbar = location.pathname === "/" || location.pathname === "/register";

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <div
        className={
          darkMode
            ? "bg-gray-800 text-white min-h-screen"
            : "bg-blue-500 text-white min-h-screen"
        }
      >
        <ToastContainer
          position="top-right"
          autoClose={2000}
          theme="colored"
        />

        {!hideNavbar && <Navbar />}

        <Routes>
          <Route
            path="/ProductList"
            element={
              <ListOfProducts
                products={products}
                setProducts={setProducts}
              />
            }
          />

          {/* <Route
          path="/add-product"
          element={
            role === "admin" ? (
              <AddProduct
                products={products}
                setProducts={setProducts}
              />
            ) : (
              <Typography
                variant="h5"
                sx={{ mt: 5, textAlign: "center" }}
              >
                Access Denied
              </Typography>
            )
          }
        /> */}

          <Route
            path="/excel-api"
            element={<ExcelApi />}
          />

          <Route
            path="/"
            element={<UserLogin />}
          />
          <Route
            path="/register"
            element={<UserRegister />}
          />
        </Routes>

      </div>
    </MuiThemeProvider>
  );
}

function App() {
  const {
    darkMode
  } = useContext(ThemeContext);



  // useEffect(()=>{
  // const getProducts = async () => {
  //   try {
  //     const response = await instance.get("/products");
  //     console.log("fetched data", response
  //     )

  //     if (response.status === 200) {
  //       setProducts(response.data);


  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }},[]);

  return (
    <BrowserRouter >

      <AppContent />
    </BrowserRouter>

  );
}

export default App;