import { Paper, useColorScheme, useTheme } from "@mui/material"
import React from "react"
import { useState, useEffect } from "react"
import PieceEmbed from "./PieceEmbed"

import "../styles/Pieces.scss"

const pageSize = 4
const Pieces = () => {
  const [ids, setIds] = useState([])
  useEffect(() => {
    const effect = async () => {
      const p5Ids = await import("/static/p5ids.json")
      setIds(Array.from(p5Ids))
    }
    effect()
  }, [])
  const scrollToPiece = (piece) =>
    document.querySelector(`piece-${piece}`).scrollIntoView()
  const theme = useTheme()
  return (
    <Paper
      className="Pieces"
      id="pieces"
      style={{ background: theme.vars.palette.secondary.main }}
      elevation={24}
    >
      {ids.map((id) => (
        <PieceEmbed piece={id} />
      ))}
    </Paper>
  )
}

export default Pieces
