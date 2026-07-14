import { useEffect, useState, useContext } from "react";
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


function AppContent() {
  const role = localStorage.getItem("role");
  const { darkMode } = useContext(ThemeContext);

  const [products, setProducts] = useState([]);

  const location = useLocation();

  // Pages where Navbar should be hidden
  const hideNavbar = location.pathname === "/" || location.pathname === "/register";

  return (
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