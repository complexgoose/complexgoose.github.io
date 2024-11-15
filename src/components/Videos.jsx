import { Grid, Paper, Typography, useTheme } from "@mui/material"
import React from "react"
import VideoEmbed from "./VideoEmbed"

const ids = ["U0YMazTRb_I", "RiJYQp1-wdQ", "jLxmaGGeulg"]
const Videos = () => {
  const theme = useTheme()
  return (
    <Paper className="Section" elevation={24}>
      <Typography className="SectionTitle" variant="h2" gutterBottom>
        Videos
      </Typography>
      <Grid container spacing={5}>
        {ids.map((video) => (
          <Grid item xs="12">
            <VideoEmbed video={video} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  )
}

export default Videos
