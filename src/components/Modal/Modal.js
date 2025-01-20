import "./Modal.scss"
import { createPortal } from "react-dom"
import { useRef, useEffect } from "react"
import React from "react"
export default function Modal({ children, open }) {
  let dialog = useRef()
  useEffect(() => {
    if (open) {
      dialog.current.showModal()
    } else {
      dialog.current.close()
    }
  }, [open])

  return createPortal(
    <dialog ref={dialog}>{children}</dialog>,
    document.getElementById("modal"),
  )
}
