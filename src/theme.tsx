import { createTheme } from "@mui/material";
import { green } from "@mui/material/colors";
import blue from "@mui/material/colors/blue";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#343943",
      light: "#6C40B5",
      dark: blue[900],
    },
    success: {
      light: green[300],
      main: green[500],
      dark: green[700],
    },
  },
});
