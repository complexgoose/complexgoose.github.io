import { Grid, Paper, Typography } from "@mui/material"
import React from "react"
import { theme } from "../constants/theme"
import VideoEmbed from "./VideoEmbed"

const ids = ["U0YMazTRb_I", "RiJYQp1-wdQ", "jLxmaGGeulg"]
const Videos = () => {
  return (
    <Paper
      className="Section"
      style={{ background: theme.palette.secondary.main }}
      elevation={24}
    >
      <Typography className="SectionTitle" variant="h2" gutterBottom>
        Videos
      </Typography>
      <Grid container spacing={5}>
        {ids.map((video) => (
          <Grid item xs="12" sm="6" md="4">
            <VideoEmbed video={video} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  )
}

export default Videos
