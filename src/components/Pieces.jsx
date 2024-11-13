import { Button, Grid, Paper, Typography } from "@mui/material"
import React from "react"
import { useState, useEffect } from "react"
import { theme } from "../constants/theme"
import PieceEmbed from "./PieceEmbed"

const pageSize = 4;
const Pieces = () => {
  const [ids, setIds] = useState([]);
  useEffect(async () =>{
    const p5Ids = await import("/static/p5ids.json");
    setIds(Object.values(p5Ids));
  }, []);
  const [pieceI, setPieceI] = useState(0)
  const scrollPieces = () =>
    document.querySelector("#pieces .SectionTitle").scrollIntoView()
  return (
    <Paper
      className="Section"
      id="pieces"
      style={{ background: theme.palette.secondary.main }}
      elevation={24}
    >
      <Typography className="SectionTitle" variant="h2" gutterBottom>
        Art
      </Typography>
      <Grid container spacing={4}>
        {ids.slice(pieceI, pieceI + pageSize).map((piece) => (
          <Grid item xs="12" sm="12" md="6" lg="3">
            <PieceEmbed piece={piece} />
          </Grid>
        ))}
      </Grid>
      <div className="PieceNav">
        <Button
          variant="contained"
          className="Previous"
          disabled={pieceI === 0}
          onClick={() => {
            setPieceI(pieceI - pageSize)
            scrollPieces()
          }}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          disabled={pieceI + pageSize >= ids.length}
          onClick={() => {
            setPieceI(pieceI + pageSize)
            scrollPieces()
          }}
        >
          Next
        </Button>
      </div>
    </Paper>
  )
}

export default Pieces
