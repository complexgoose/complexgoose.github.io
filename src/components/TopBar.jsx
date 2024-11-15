import {
  AppBar,
  Box,
  ClickAwayListener,
  Collapse,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { Link as GLink } from "gatsby"
import React, { useEffect, useRef, useState } from "react"

import "../styles/TopBar.scss"
import { Photo, YouTube } from "@mui/icons-material"

const TopBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuButtonRef = useRef()
  const onMenuClickAway = (e) => {
    console.log(e)
    if (menuButtonRef.current.contains(e.target)) return
    setIsMenuOpen(false)
  }
  useEffect(() => {
    const onWindowBlur = () => setIsMenuOpen(false)
    window.addEventListener("blur", onWindowBlur)
    return () => window.removeEventListener("blur", onWindowBlur)
  }, [])

  return (
    <AppBar position="sticky" className="AppBar">
      <Collapse in={isMenuOpen}>
        <ClickAwayListener onClickAway={onMenuClickAway}>
          <List className="NavMenu">
            <ListItemButton className="NavItem">
              <ListItemIcon className="NavItemIcon">
                <Photo />
              </ListItemIcon>
              <ListItemText className="NavItemText" primary="Gallery" />
            </ListItemButton>
            <ListItemButton className="NavItem">
              <ListItemIcon className="NavItemIcon">
                <YouTube />
              </ListItemIcon>
              <ListItemText className="NavItemText" primary="Videos" />
            </ListItemButton>
          </List>
        </ClickAwayListener>
      </Collapse>
      <Toolbar className="Toolbar">
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
        <Box className="MenuButton" ref={menuButtonRef}>
          <IconButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
