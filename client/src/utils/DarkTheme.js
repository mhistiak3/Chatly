import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#54268c", 
      contrastText: "#ffffff", 
    },
    secondary: {
      main: "#03dac6", 
      contrastText: "#000000",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#e0e0e0", 
      secondary: "#b0b0b0", 
    },
    divider: "#373737", 
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      color: "#ffffff", 
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      color: "#e0e0e0",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
      color: "#e0e0e0",
    },
  },
  components: {
   
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "#1f1f1f", // Darker app bar for a cleaner look
        },
      },
    },
  },
});

export default darkTheme;
