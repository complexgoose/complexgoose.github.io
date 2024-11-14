import { experimental_extendTheme as extendTheme } from "@mui/material"

export const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#000000",
        },
        secondary: {
          main: "#FFFFFF",
        },
        info: {
          main: "#7914B3",
        },
        warning: {
          main: "#FF3700",
        },
      },
    },
  },
  typography: {
    fontFamily: ["Inter"],
  },
})
console.log(theme)