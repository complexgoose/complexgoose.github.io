import { Box, Card } from "@mui/material"
import React, { useRef, useState } from "react"
import { useIsVisible } from "../hooks/Observer"

const PieceEmbed = ({ piece }) => {
  const ref = useRef()
  const isVisible = useIsVisible(ref)
  const [isLoaded, setIsLoaded] = useState(false)
  return (
    <Box className="Piece">
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
