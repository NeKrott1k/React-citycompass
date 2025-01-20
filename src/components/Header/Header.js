import logo from "./img/logo.svg"
import "./Header.scss"

import { NavLink } from "react-router-dom"
import { menuContext } from "../menuContext/menuContext"
import { useContext } from "react"
import React from "react"
const Header = () => {
  const { toggleMenu } = useContext(menuContext)
  const { isMenuOpen } = useContext(menuContext)
  return (
    <header className="header">
      <div className="header__menu menu">
        <div
          className={`menu__burger-icon ${isMenuOpen ? "active" : ""}`}
          id="burger"
          onClick={toggleMenu}
        >
          <div className="menu__burger-line"></div>
          <div className="menu__burger-line"></div>
          <div className="menu__burger-line"></div>
        </div>
      </div>
      <div className="header__points">
        <NavLink to="/">
          <img src={logo} alt="logo" className="menu__logo" />
        </NavLink>
        <li className="header__point">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <NavLink to="/">главная</NavLink>
        </li>

        <li className="header__point">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <NavLink to="/attractions">список интересных мест</NavLink>
        </li>

        <li className="header__point">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <NavLink to="/contacts">контакты</NavLink>
        </li>
      </div>
    </header>
  )
}

export default Header
