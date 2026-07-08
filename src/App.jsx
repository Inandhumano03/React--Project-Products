import { useEffect, useState, useContext } from "react";
import "./App.css";
import ListOfProducts from "./components/Products/ListOfProducts";
import AddProduct from "./components/Products/AddProduct";
import { instance } from "./components/axios"
import Navbar from "./components/Navbar";
import ExcelApi from "./components/Products/ExcelApi";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ThemeContext
} from "./components/context/ThemeContext";
import ThemeToggle from
  "./components/hooks/ThemeToggle";
function App() {
  const {
    darkMode
  } = useContext(ThemeContext);
  const [products, setProducts] = useState([]);



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
    <BrowserRouter className={
      darkMode
        ? "bg-gray-800 text-white"
        : "bg-blue-500 text-white"
    }>
      <div>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          theme="colored"
        />

        <Navbar />



        <Routes>
          <Route
            path="/"
            element={
              <ListOfProducts
                products={products}
                setProducts={setProducts}
              />
            }
          />

          <Route
            path="/add-product"
            element={
              <AddProduct
                products={products}
                setProducts={setProducts}
              />
            }
          />

          <Route
            path="/excel-api"
            element={<ExcelApi />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;