import { useState } from "react"

export const useDelayCancel = (delay = 100) => {
  const [timer, setTimer] = useState(null)
  const delayCancel = (callback) => {
    if (timer) clearTimeout(timer)
    setTimer(
      setTimeout(() => {
        setTimer(null)
        callback()
      }, delay)
    )
  }
  return delayCancel
}
