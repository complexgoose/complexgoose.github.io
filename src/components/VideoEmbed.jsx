import { Card } from "@mui/material"
import React from "react"

import "../styles/Embed.scss"

const VideoEmbed = ({ video }) => {
  return (
    <Card className="EmbedCard VideoCard">
      <iframe
        className="Embed"
        src={`https://www.youtube.com/embed/${video}`}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
    </Card>
  )
}

export default VideoEmbed
