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

// // theme.ts
// import { createTheme } from "@mui/material/styles";
// declare module "@mui/material/styles" {
//   interface Theme {
//     customBackground: {
//       backgroundImage: string;
//     };
//   }
//   // allow configuration using `createTheme`
//   interface ThemeOptions {
//     customBackground?: {
//       backgroundImage?: string;
//     };
//   }
// }

// export const theme = createTheme({
//   palette: {
//     mode: "light",
//     success: {
//       main: "",
//     },
//   },
//   customBackground: {
//     backgroundImage: 'url("./assets/bg-light.png")',
//   },
// });

// export const darkTheme = createTheme({
//   palette: {
//     mode: "dark",
//   },
//   customBackground: {
//     backgroundImage: 'url("./assets/bg-light.png")',
//   },
// });
