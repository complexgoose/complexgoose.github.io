import { useState } from "react"

export const useDelayCancel = (delay = 100) => {
  let [timer, setTimerState] = useState(null)
  const setTimer = (val) => {
    timer = val;
    setTimerState(timer)
  }
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
