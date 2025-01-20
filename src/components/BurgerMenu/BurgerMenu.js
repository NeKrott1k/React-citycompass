import { useContext } from "react"
import "./burgerMenu.scss"
import { NavLink } from "react-router-dom"
import { menuContext } from "../menuContext/menuContext"
import React from "react"
const BurgerMenu = () => {
  const { isMenuOpen } = useContext(menuContext)
  return (
    <div className={`menu-burger ${isMenuOpen ? "active" : ""}`} id="menu">
      <div className="menu-burger__points">
        <div className="menu-burger__li">
          <NavLink to="/attractions">список интересных мест</NavLink>
        </div>
        <div className="menu-burger__li">
          <NavLink to="/">главная</NavLink>
        </div>
        <div className="menu-burger__li">
          <NavLink to="/contacts">контакты</NavLink>
        </div>
      </div>
    </div>
  )
}
export default BurgerMenu
