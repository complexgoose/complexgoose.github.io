import {
  StyledEngineProvider,
  Experimental_CssVarsProvider as CssVarsProvider,
} from "@mui/material"
import React from "react"
import { Helmet } from "react-helmet"
import App from "../components/App"
import { theme } from "../constants/theme"
import favicon from "../images/favicon.png"
import "../styles/index.scss"

const IndexPage = () => {
  return (
    <StyledEngineProvider injectFirst>
      <CssVarsProvider theme={theme}>
        <Helmet>
          <title>Jack Strosahl</title>
          <link rel="icon" type="image/png" href={favicon} sizes="16x16" />
        </Helmet>
        <App />
      </CssVarsProvider>
    </StyledEngineProvider>
  )
}

export default IndexPage
