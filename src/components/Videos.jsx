import { Box, Grid, Paper, Typography } from "@mui/material"
import React from "react"
import VideoEmbed from "./VideoEmbed"

import "../styles/Videos.scss"

const ids = ["U0YMazTRb_I", "RiJYQp1-wdQ", "jLxmaGGeulg"]
const Videos = () => {
  return (
    <Box className="Videos">
      <Paper className="Section" elevation={24}>
        <Typography className="SectionTitle" variant="h2" gutterBottom>
          Videos
        </Typography>
        <Grid container spacing={5} className="VideoGrid">
          {ids.map((video) => (
            <Grid className="VideoGridItem" item xs="12">
              <VideoEmbed video={video} />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  )
}

export default Videos
