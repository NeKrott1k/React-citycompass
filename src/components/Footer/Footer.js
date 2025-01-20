import vk from "./img/vk logo.svg"
import tg from "./img/tg logo.svg"
import ds from "./img/ds logo.svg"
import "./Footer.scss"
import { NavLink } from "react-router-dom"
import React from "react"
const Footer = () => {
  return (
    <section className="footer">
      <div className="footer__content">
        <div className="footer__points">
          <p className="footer__point">
            <NavLink to="/">главная</NavLink>
          </p>
          <p className="footer__point">
            <NavLink to="/attractions">список интересных мест</NavLink>
          </p>
          <p className="footer__point">
            <NavLink to="/contacts">контакты</NavLink>
          </p>
        </div>
      </div>
      <div className="footer__icons">
        <img src={tg} alt="tg" className="footer__tg" />
        <img src={vk} alt="vk" className="footer__vk" />
        <img src={ds} alt="ds" className="footer__ds" />
      </div>
    </section>
  )
}

export default Footer
