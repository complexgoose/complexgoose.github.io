import { Grid, Paper } from "@mui/material"
import React from "react"
import { theme } from "../constants/theme"
import PieceEmbed from "./PieceEmbed"

const ids = ["npr4-56ph", "mWTe6i9jM", "lt3RXmZ1N"]
const Pieces = () => {
  return (
    <Paper
      className="Section"
      style={{ background: theme.palette.secondary.main }}
    >
      <Grid container spacing="2">
        {ids.map((piece) => (
          <Grid item xs="12" sm="6" md="4" lg="3">
            <PieceEmbed piece={piece} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  )
}

export default Pieces
