import { Button, Grid, Paper, Typography } from "@mui/material"
import React from "react"
import { useState } from "react"
import { theme } from "../constants/theme"
import PieceEmbed from "./PieceEmbed"

const ids = [
  "npr4-56ph",
  "mWTe6i9jM",
  "lt3RXmZ1N",
  "edEUDma5e",
  "IHHUUy6n9",
  "KZJ3eTF1p",
  "DFkcf58Cp",
  "KcPe_1Cyh",
  "bvracbBi0",
  "N889jgkUN",
  "kXvPRsChK",
  "LfB3Su9uq",
  "u83DK5QVD",
  "TPYvCj5hZ",
  "oeClYM84t",
  "4kBPBvoRA",
  "TenSYgiKb",
  "UF9p18G10",
  "FQC79BoxH",
  "LtasWDZSk",
  "H3yaRH8lu",
  "ORXKgymgv",
  "qj9xWKO8L",
  "Jdha8HTJ_",
  "atxEwccj1",
  "PMrJmHEp6",
  "MntSYgcXB",
  "-jGIoPbMc",
  "jWfxjHndp",
  "00NGjtPaj",
  "tgqYIcwUG",
  "whNzm3fVl",
  "EXr3Es-C2",
  "9xHmvKe9M",
  "C3H1CmLPV",
  "8jHeqtHwr",
  "1RzYWY9up",
  "RsOAcghTo",
  "CckmmGA0B",
  "QJVG9yGLd",
  "-E_KFTgjH",
  "BOMjoE4bj",
  "5O1vCWkLh",
  "VJjsp8i1c",
  "O3pLr6lK9",
  "c66zivxtK",
  "nuclGdT3e",
  "_mDfJZ8JI",
  "o3DpUr3ZA",
]
const pageSize = 4
const Pieces = () => {
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
