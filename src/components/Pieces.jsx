import { Paper, useTheme } from "@mui/material"
import React, { createRef } from "react"
import { useState, useEffect } from "react"
import PieceEmbed from "./PieceEmbed"

import "../styles/Pieces.scss"
import { useDelayCancel } from "../hooks/useDelayCancel"

const Pieces = ({ location }) => {
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
  const observe = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries.find((entry) => entry.isIntersecting)
        if (!entry) return
        setVisibleId(entry.target.id.substring("piece-".length))
      },
      {
        rootMargin: "-10px",
      }
    )
    refs
      .filter((ref) => ref.current)
      .forEach((ref) => {
        observer.observe(ref.current)
      })
  }
  const scrollDelayCancel = useDelayCancel(10)
  const onScroll = () => {
    scrollDelayCancel(() => observe())
  }
  const hashDelayCancel = useDelayCancel(100)

  // Track URL hash and what we have set it to programtically
  const urlPiece = location.hash.substring(1)
  const [targetUrlPiece, setTargetUrlPiece] = useState(null)
  useEffect(() => {
    hashDelayCancel(() => {
      if (!visibleId) return
      const url = new URL(location.href)
      url.hash = `#${visibleId}`
      window.location.replace(url)
      setTargetUrlPiece(visibleId)
    })
  }, [visibleId]) // eslint-disable-line react-hooks/exhaustive-deps

  const scrollToPiece = (piece) =>
    document.querySelector(`#piece-${piece}`)?.scrollIntoView()

  const urlPieceDelayCancel = useDelayCancel(200)
  useEffect(() => {
    urlPieceDelayCancel(() => {
      if (urlPiece === targetUrlPiece) return
      if (!urlPiece) scrollToPiece(ids[0])
      if (urlPiece && urlPiece !== visibleId) scrollToPiece(urlPiece)
    })
  }, [urlPiece, visibleId]) // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (urlPiece) scrollToPiece(urlPiece)
    else observe()
  }, [refs]) // eslint-disable-line react-hooks/exhaustive-deps

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
