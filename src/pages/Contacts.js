import "../styles/Contacts.scss"
import tg from "../img/tg logo.svg"
import location from "../img/location.svg"
import phone from "../img/phone.svg"
import vetka from "../img/vetka.png"
import leaves from "../img/leaves.png"
import arrow from "../img/Arrow 5.svg"
import Modal from "../components/Modal/Modal.js"

import { useState } from "react"
import React from "react"
const Contacts = () => {
  const [modal, setModal] = useState(false)
  const [buttonState, setButtonState] = useState(false)

  const handleButtonClick = () => {
    setButtonState("onclick")
    setTimeout(() => {
      setButtonState("validate")
      setTimeout(() => {
        setButtonState("")
      }, 1250)
    }, 2250)
  }

  return (
    <div>
      <section className="FirstScreen">
        <div className="FirstScreen__title-container">
          <h2 className="FirstScreen__title">Контакты</h2>
          <h2 className="FirstScreen__title1">
            хотите оформить наилучший тур в своей жизни?
          </h2>
          <h2 className="FirstScreen__text">
            напиши в любую удобную соц. сеть, или позвони по тел.
          </h2>
        </div>

        <div className="FirstScreen__info">
          <div className="FirstScreen__phone">
            <img src={phone} alt="phone" className="FirstScreen__icon" />
            <p>8 (800) 555-35-35</p>
          </div>

          <div className="FirstScreen__loc">
            <img src={location} alt="location" className="FirstScreen__icon" />
            <p>Остров Мужика</p>
          </div>

          <div className="FirstScreen__tg">
            <img src={tg} alt="tg" className="FirstScreen__icon" />
            <p>@example.tg</p>
          </div>
        </div>

        <div className="FirstScreen__button" onClick={() => setModal(true)}>
          <a href="#!" id="open-modal-btn" className="FirstScreen__btn">
            связаться с нами
          </a>
        </div>
      </section>

      <div className="image-container">
        <img src={vetka} alt="vetka" className="image-container__img" />
      </div>

      <Modal open={modal}>
        <section className="contact-modal" id="my-modal">
          <div
            className="contact-modal__button-main"
            id="close-my-modal-btn"
            onClick={() => setModal(false)}
          >
            <a href="#!" className="contact-modal__main-btn">
              назад
            </a>
            <img
              src={arrow}
              alt="---"
              className="button-main__button-arrow"
              width="30px"
            />
          </div>
          <div className="contact-modal__page" id="rectangle">
            <h2 className="contact-modal__title">Оставьте заявку</h2>
            <div className="contact-modal__container-img">
              <img src={leaves} alt="leaves" className="contact-modal__img" />
            </div>

            <div className="contact-modal__points">
              <p className="contact-modal__points-title">номер телефона</p>
              <input type="phone" id="inpField" name="phone" />
              <p className="contact-modal__points-title">e-mail</p>
              <input type="email" id="inpField" name="email" />
              <p className="contact-modal__points-title">место посещения</p>
              <select name="place" id="place-select">
                <option value="petersburg">каскадная лестница</option>
                <option value="samara">гора машук</option>
                <option value="perm">озеро тридцатка</option>
                <option value="novosibirsk">Санаторий «Машук Аква-Терм»</option>
              </select>
            </div>
            <div className="contact-modal__btn-container">
              <button
                className={`contact-modal__btn ${buttonState}`}
                onClick={handleButtonClick}
              ></button>
            </div>
            <div id="errorMessage">Поля не могут быть пустыми!</div>
          </div>
        </section>
      </Modal>
    </div>
  )
}

export default Contacts
