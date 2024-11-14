import {
  AppBar,
  Box,
  IconButton,
  Link,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { Link as GLink } from "gatsby"
import React from "react"

import "../styles/TopBar.scss"
import { renderToPipeableStream } from "react-dom/server"

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
            <Typography variant="h4" className="Title">
              jstro.io
            </Typography>
          </div>
        </div>
        {/* <IconButton className="MenuButton">
          <MenuIcon />
        </IconButton> */}
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
