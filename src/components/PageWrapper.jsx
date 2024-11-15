import {
  Box,
  Experimental_CssVarsProvider as CssVarsProvider,
  StyledEngineProvider,
} from "@mui/material"
import favicon from "../images/favicon.png"
import React from "react"
import { theme } from "../constants/theme"
import { Helmet } from "react-helmet"
import TopBar from "./TopBar"

import "../styles/App.scss"
import "../styles/index.scss"
import "../styles/Body.scss"

const PageWrapper = ({ children }) => {
  return (
    <StyledEngineProvider injectFirst>
      <CssVarsProvider theme={theme}>
        <Helmet>
          <title>Jules Strosahl</title>
          <link rel="icon" type="image/png" href={favicon} sizes="16x16" />
        </Helmet>
        <Box className="App">
          {children}
          <TopBar />
        </Box>
      </CssVarsProvider>
    </StyledEngineProvider>
  )
}

export default PageWrapper
