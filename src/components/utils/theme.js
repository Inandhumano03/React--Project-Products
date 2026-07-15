import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: [
      "Inter",
      "Poppins",
      "Roboto",
      "sans-serif",
    ].join(","),

    h1: {
      fontWeight: 800,
      fontSize: "3rem",
    },

    h2: {
      fontWeight: 800,
      fontSize: "2.5rem",
    },

    h3: {
      fontWeight: 700,
      fontSize: "2rem",
    },

    h4: {
      fontWeight: 700,
      fontSize: "1.8rem",
    },

    h5: {
      fontWeight: 700,
      fontSize: "1.5rem",
    },

    h6: {
      fontWeight: 600,
      fontSize: "1.25rem",
    },

    subtitle1: {
      fontWeight: 600,
      fontSize: "1rem",
    },

    body1: {
      fontWeight: 400,
      fontSize: "1rem",
    },

    body2: {
      fontWeight: 400,
      fontSize: "0.9rem",
    },

    button: {
      fontWeight: 700,
      textTransform: "none",
      letterSpacing: "0.3px",
    },
  },
});

export default theme;