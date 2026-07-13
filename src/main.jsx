import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./components/context/ThemeContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(

<GoogleOAuthProvider clientId="1046422152950-j3rehoetcjvthfvrh9f0tbdqvk4bs1m7.apps.googleusercontent.com">
    <ThemeProvider>
    <App />
    </ThemeProvider>
</GoogleOAuthProvider>

);