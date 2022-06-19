import { AppBar, Link, Toolbar } from "@mui/material"
import { Link as GLink } from "gatsby"
import React from "react"

import "../styles/TopBar.scss"

const TopBar = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Link component={GLink} className="Logo" to="" underline="none">
          {"{js}"}
        </Link>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
