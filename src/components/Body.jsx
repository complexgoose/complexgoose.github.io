import { Box, Stack } from "@mui/material"
import React from "react"
import Pieces from "./Pieces"
import Videos from "./Videos"

import "../styles/Body.scss"

const Body = () => {
  return (
    <Box className="Body">
      <Pieces />
    </Box>
  )
}

export default Body
