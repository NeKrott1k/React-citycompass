import BurgerMenu from "./components/BurgerMenu/BurgerMenu.js"
import Header from "./components/Header/Header.js"
import Home from "./pages/Home.js"
import Contacts from "./pages/Contacts.js"
import Attractions from "./pages/Attractions.js"
import AttractionDop from "./pages/AttractionDop.js"
import Footer from "./components/Footer/Footer.js"
import ScrollToTop from "./utils/scrollToTop.js"
import VideoBg from "./components/videoBg/videoBg.js"

import { MenuProvider } from "./components/menuContext/menuContext.js"
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
            <Route path="/React-citycompass/" element={<Home />} />
            <Route
              path="/React-citycompass/attractions"
              element={<Attractions />}
            />
            <Route
              path="/React-citycompass/attraction/:id"
              element={<AttractionDop />}
            />
            <Route path="/React-citycompass/contacts" element={<Contacts />} />
          </Routes>

          <Footer />
        </Router>
      </MenuProvider>
    </>
  )
}
