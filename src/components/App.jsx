import { Stack } from "@mui/material"
import React from "react"
import Body from "./Body"
import TopBar from "./TopBar"

import "../styles/App.scss"

const App = () => {
  return (
    <Stack className="App">
      <Body />
      <TopBar />
    </Stack>
  )
}

export default App
