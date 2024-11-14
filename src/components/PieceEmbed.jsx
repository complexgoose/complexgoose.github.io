import { Box, Card } from "@mui/material"
import React, { useRef, useState } from "react"
import { useIsVisible } from "../hooks/Observer"

const PieceEmbed = ({ piece }) => {
  const ref = useRef()
  const isVisible = useIsVisible(ref)
  return (
    <Box className="Piece" id={`piece-${piece}`}>
      <Card className="EmbedCard" ref={ref}>
        {isVisible && (
          <iframe
            title="p5.js Sketch"
            className="Embed"
            src={`https://editor.p5js.org/jstro.io/full/${piece}`}
          ></iframe>
        )}
      </Card>
    </Box>
  )
}

export default PieceEmbed
