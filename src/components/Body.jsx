import { Stack } from "@mui/material"
import React from "react"
import Pieces from "./Pieces"
import Videos from "./Videos"

import "../styles/Body.scss"

const Body = () => {
  return (
    <Stack className="Body">
      <Pieces />
      <Videos />
    </Stack>
  )
}

export default Body
