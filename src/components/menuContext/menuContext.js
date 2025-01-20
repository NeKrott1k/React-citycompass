import { createContext, useState, React } from "react"
export const menuContext = createContext()
export const MenuProvider = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isGalleryOpen, SetIsGalleryOpen] = useState(false)
  // const [isGallery, setIsGallery] = useState(false)
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  const toggleGallery = () => {
    SetIsGalleryOpen((prev) => !prev)
    !isGalleryOpen
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto")
  }

  return (
    <menuContext.Provider
      value={{
        isMenuOpen,
        isGalleryOpen,
        toggleMenu,
        toggleGallery,
      }}
    >
      {children}
    </menuContext.Provider>
  )
}
