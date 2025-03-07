import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#FF9933" },
    secondary: { main: "#44290E" },
    background: { default: "#ffffff", paper: "#f5f5f5" },
    text: { primary: "#000000", secondary: "#555555" },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    fontWeightBold: 700, // Ensure this exists
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#FF9933" },
    secondary: { main: "#44290E" },
    background: { default: "#121212", paper: "#1e1e1e" },
    text: { primary: "#ffffff", secondary: "#bbbbbb" },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    fontWeightBold: 700, // Ensure this exists
  },
});

const demoTheme = { light: lightTheme, dark: darkTheme };

export default demoTheme;
