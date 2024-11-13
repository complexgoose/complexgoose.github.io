import { AppBar, Link, Toolbar, Typography, useTheme } from "@mui/material"
import { Link as GLink } from "gatsby"
import React from "react"

import "../styles/TopBar.scss"

const TopBar = () => {
  const theme = useTheme()
  return (
    <AppBar position="sticky" className="AppBar">
      <Toolbar>
        <Link component={GLink} className="Logo" to="" underline="none">
          {"{js}"}
        </Link>
        <div className="BarContent">
          <div className="TextContainer">
            <Typography
              variant="h4"
              style={{
                backgroundImage: `linear-gradient(to right, ${theme.vars.palette.primary.main},${theme.vars.palette.secondary.main})`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              jstro.io
            </Typography>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
