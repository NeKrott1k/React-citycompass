import "./VideoBg.scss"
import bg from "../../img/animate-bg.mp4"
import React from "react"
const VideoBg = () => {
  return (
    <video autoPlay muted loop id="myVideo">
      <source src={bg} type="video/mp4" />
    </video>
  )
}

export default VideoBg
