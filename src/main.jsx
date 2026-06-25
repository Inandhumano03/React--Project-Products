import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./components/context/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(

    <ThemeProvider>
    <App />
    </ThemeProvider>

);