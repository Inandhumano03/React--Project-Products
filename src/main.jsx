import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { ThemeProvider } from "./components/context/ThemeContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "./index.css";

import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="1046422152950-j3rehoetcjvthfvrh9f0tbdqvk4bs1m7.apps.googleusercontent.com">
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </GoogleOAuthProvider>
);