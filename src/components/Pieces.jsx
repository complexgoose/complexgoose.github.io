import { Paper, useTheme } from "@mui/material"
import React, { createRef, useCallback } from "react"
import { useState, useEffect } from "react"
import PieceEmbed from "./PieceEmbed"

import "../styles/Pieces.scss"
import { useDelayCancel } from "../hooks/useDelayCancel"

const Pieces = () => {
  const [ids, setIds] = useState([])
  const [refs, setRefs] = useState([])
  useEffect(() => {
    const effect = async () => {
      const p5Ids = await import("/static/p5ids.json")
      setIds(Array.from(p5Ids))
      setRefs(Array.from(p5Ids).map(() => createRef()))
    }
    effect()
  }, [])

  const [visibleId, setVisibleId] = useState(null)
  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries.find((entry) => entry.isIntersecting)
      if (!entry) return
      setVisibleId(entry.target.id.substring("piece-".length))
    },
    {
      rootMargin: "-1px",
    }
  )
  const observe = () => {
    refs.forEach((ref) => {
      if (!ref.current) return
      observer.observe(ref.current)
    })
  }
  const scrollDelayCancel = useDelayCancel(50)
  const onScroll = () => {
    scrollDelayCancel(() => observe())
  }
  const hashDelayCancel = useDelayCancel(100)
  useEffect(() => {
    hashDelayCancel(() => {
      if (!visibleId) return
      window.location.hash = `#${visibleId}`
    })
  }, [visibleId])

  const scrollToPiece = (piece) =>
    document.querySelector(`#piece-${piece}`)?.scrollIntoView()
  const urlPiece = window.location.hash.substring(1)
  const urlPieceDelayCancel = useDelayCancel(200)
  useEffect(() => {
    urlPieceDelayCancel(() => {
      if (urlPiece && urlPiece !== visibleId) scrollToPiece(urlPiece)
    })
  }, [urlPiece, visibleId])
  useEffect(() => {
    if (urlPiece) scrollToPiece(urlPiece)
    else observe()
  }, [])

  const theme = useTheme()
  return (
    <Paper
      className="Pieces"
      id="pieces"
      style={{ background: theme.vars.palette.secondary.main }}
      elevation={24}
      onScroll={onScroll}
    >
      {ids.map((id, i) => (
        <PieceEmbed piece={id} ref={refs[i]} key={id} />
      ))}
    </Paper>
  )
}

export default Pieces
