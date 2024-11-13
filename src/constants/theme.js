import { experimental_extendTheme as extendTheme } from "@mui/material"

export const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#dd2c00",
        },
        secondary: {
          main: "#dd0042",
        },
      },
    },
  },
  typography: {
    fontFamily: ["Inter"],
  },
})
