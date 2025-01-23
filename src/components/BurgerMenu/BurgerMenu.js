import { useContext } from "react"
import "./burgerMenu.scss"
import { NavLink } from "react-router-dom"
import { menuContext } from "../menuContext/menuContext.js"
import React from "react"
const BurgerMenu = () => {
  const { isMenuOpen } = useContext(menuContext)
  return (
    <div className={`menu-burger ${isMenuOpen ? "active" : ""}`} id="menu">
      <div className="menu-burger__points">
        <div className="menu-burger__li">
          <NavLink to="/React-citycompass/attractions">
            список интересных мест
          </NavLink>
        </div>
        <div className="menu-burger__li">
          <NavLink to="/React-citycompass/">главная</NavLink>
        </div>
        <div className="menu-burger__li">
          <NavLink to="/React-citycompass/contacts">контакты</NavLink>
        </div>
      </div>
    </div>
  )
}
export default BurgerMenu
