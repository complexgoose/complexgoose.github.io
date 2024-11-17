import { Box, Card } from "@mui/material"
import React, { forwardRef } from "react"
import { useIsVisible } from "../hooks/Observer"

import "../styles/Embed.scss"

const PieceEmbed = forwardRef(({ piece }, ref) => {
  const isVisible = useIsVisible(ref)
  return (
    <Box className="Piece">
      <Card className="EmbedCard" ref={ref} id={`piece-${piece}`}>
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
})

export default PieceEmbed
