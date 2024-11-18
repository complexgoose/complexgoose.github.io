import { Box, Card } from "@mui/material"
import React, { forwardRef, useEffect } from "react"
import { useIsVisible } from "../hooks/Observer"

import "../styles/Embed.scss"

const PieceEmbed = forwardRef(({ piece }, ref) => {
  const isVisible = useIsVisible(ref)
  const id = `piece-${piece}`
  return (
    <Box className="Piece">
      <Card className="EmbedCard" ref={ref} id={id}>
        {isVisible && (
          <iframe
            title="p5.js Sketch"
            className="Embed"
            src={`/sketches/${piece}`}
          ></iframe>
        )}
      </Card>
    </Box>
  )
})

export default PieceEmbed
