import BurgerMenu from "./components/BurgerMenu/BurgerMenu"
import Header from "./components/Header/Header"
import Home from "./pages/Home"
import Contacts from "./pages/Contacts"
import Attractions from "./pages/Attractions"
import AttractionDop from "./pages/AttractionDop"
import Footer from "./components/Footer/Footer"
import ScrollToTop from "./utils/scrollToTop"
import VideoBg from "./components/videoBg/videoBg"

import { MenuProvider } from "./components/menuContext/menuContext"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import React from "react"
export default function App() {
  return (
    <>
      <MenuProvider>
        <Router>
          <VideoBg />
          <Header />
          <BurgerMenu />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/attractions" element={<Attractions />} />
            <Route path="/attraction/:id" element={<AttractionDop />} />
            <Route path="/contacts" element={<Contacts />} />
          </Routes>

          <Footer />
        </Router>
      </MenuProvider>
    </>
  )
}
