import { AppBar, Link, Toolbar, Typography } from "@mui/material"
import { Link as GLink } from "gatsby"
import React from "react"
import { theme } from "../constants/theme"

import "../styles/TopBar.scss"

const TopBar = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Link component={GLink} className="Logo" to="" underline="none">
          {"{js}"}
        </Link>
        <div className="BarContent">
          <div className="TextContainer">
            <Typography
              variant="h4"
              style={{
                backgroundImage: `linear-gradient(to right, ${theme.palette.primary.main},${theme.palette.secondary.main})`,
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
