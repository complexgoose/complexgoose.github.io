import { Button, Grid, Paper, Typography } from "@mui/material"
import React from "react"
import { useState, useEffect } from "react"
import { theme } from "../constants/theme"
import PieceEmbed from "./PieceEmbed"

import "../styles/Pieces.scss"

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
      className="Pieces"
      id="pieces"
      style={{ background: theme.palette.secondary.main }}
      elevation={24}
    >
      {ids.map((id) => <PieceEmbed piece={id} />)}
    </Paper>
  )
}

export default Pieces
