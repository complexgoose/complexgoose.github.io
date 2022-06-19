import { Card } from "@mui/material"
import React from "react"

const PieceEmbed = ({ piece }) => {
  return (
    <Card className="EmbedCard">
      <iframe
        className="Embed"
        src={`https://editor.p5js.org/jackstrosahl/full/${piece}`}
      ></iframe>
    </Card>
  )
}

export default PieceEmbed
