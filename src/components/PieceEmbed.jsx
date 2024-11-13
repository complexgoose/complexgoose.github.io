import { Card } from "@mui/material"
import React from "react"

const PieceEmbed = ({ piece }) => {
  return (
    <Card className="EmbedCard">
      <iframe
        title="p5.js Sketch"
        className="Embed"
        src={`https://editor.p5js.org/jstro.io/full/${piece}`}
      ></iframe>
    </Card>
  )
}

export default PieceEmbed
