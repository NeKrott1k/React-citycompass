import "../styles/App.scss"
import slide1 from "../img/1-slide.png"
import slide2 from "../img/2-slide.png"
import slide3 from "../img/3-slide.png"
import slide4 from "../img/4-slide.png"

import { NavLink } from "react-router-dom"
import { useState } from "react"

import Calendar from "../components/Calendar/Calendar.js"
import React from "react"
const Home = () => {
  const imageUrls = [slide1, slide2, slide3, slide4]

  const textContent = [
    <div className="slider__text-container">
      <h1 className="slider__count">1.</h1>
      <h2 className="slider__title">Исторические корни</h2>
      <p className="slider__text">
        Железноводск был основан в 1803 году как курортное место, благодаря
        своим целебным минеральным источникам. Город получил свое название от
        железистых вод, которые считались особенно полезными для здоровья.
      </p>
    </div>,

    <div className="slider__text-container">
      <h1 className="slider__count">2.</h1>
      <h2 className="slider__title">Курортная история</h2>
      <p className="slider__text">
        Железноводск известен своими бальнеологическими курортами, где люди
        приезжают лечить различные заболевания. Курорты города славятся своими
        минеральными источниками, которые содержат множество полезных минералов
        и микроэлементов.
      </p>
    </div>,

    <div className="slider__text-container">
      <h1 className="slider__count">3.</h1>
      <h2 className="slider__title">Архитектурное наследие</h2>
      <p className="slider__text">
        Железноводск имеет множество исторических зданий, включая санатории и
        парковую инфраструктуру, построенные в конце 19 – начале 20 века. Эти
        постройки имеют уникальную архитектуру и добавляют города атмосферу
        старинного курорта.
      </p>
    </div>,

    <div className="slider__text-container">
      <h2 className="slider__title1">Факт о М. Ю. Лермонтове</h2>
      <h1 className="slider__count">4.</h1>
      <h2 className="slider__title">Связь с Кавказским краем</h2>
      <p className="slider__text">
        Михаил Юрьевич Лермонтов провел большую часть своей жизни на Кавказе,
        где написал многие свои известные произведения, такие как "Герой нашего
        времени" и "Демон".
      </p>
    </div>,
  ]
  const [currentIndexImg, setCurrentIndexImg] = useState(0)
  const [currentIndexTextContent, setCurrentIndexTextContent] = useState(0)
  const SliderPrev = () => {
    setCurrentIndexImg(
      (prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length,
    )
    setCurrentIndexTextContent(
      (prevIndex) => (prevIndex - 1 + textContent.length) % textContent.length,
    )
  }

  const SliderNext = () => {
    setCurrentIndexImg((prevIndex) => (prevIndex + 1) % imageUrls.length)
    setCurrentIndexTextContent(
      (prevIndex) => (prevIndex + 1) % textContent.length,
    )
  }

  return (
    <>
      <section className="first-screen">
        <div className="first-screen__container">
          <h1 className="first-screen__title">откройте город</h1>
          <h3 className="first-screen__title1">заново</h3>
          <p className="first-screen__text">
            CityCompass — это ваш идеальный путеводитель по городам мира. Мы
            предлагаем вам уникальные экскурсии, подробные описания главных
            достопримечательностей, интересные факты о культуре и истории
            каждого города.{" "}
          </p>
        </div>

        <NavLink
          className="first-screen__button"
          to="/React-citycompass/attractions"
        >
          <span>Подробнее</span>
          <div className="first-screen__liquid"></div>
        </NavLink>
      </section>

      <section className="second-screen">
        <div className="second-screen__content">
          <h2 className="second-screen__title">Интересные факты</h2>
          <h2 className="second-screen__title1">о Железноводске</h2>
        </div>
      </section>

      <div className="slider">
        <div className="slider__line">
          <div className="slider__item">
            <img
              src={imageUrls[currentIndexImg]}
              alt="img-slider"
              className="slider__img"
              style={{
                width: "100vw",
              }}
            />
            {textContent[currentIndexTextContent]}
          </div>
        </div>

        <button className="slider__btn-prev" onClick={SliderPrev}>
          ←
        </button>
        <button className="slider__btn-next" onClick={SliderNext}>
          →
        </button>
      </div>

      <section className="third-screen">
        <h2 className="third-screen__title">Немного о городе</h2>
        <div className="third-screen__content">
          <div className="third-screen__rectangle" id="rectangle">
            <p className="third-screen__text-top-bottom">
              Железноводск — это уютный город-курорт, расположенный у подножия
              Кавказских гор.
            </p>
          </div>

          <div className="third-screen__content-center">
            <div className="third-screen__rectangle1" id="rectangle">
              <p className="third-screen__text-right">
                Его живописные пейзажи восхищают: зелёные возвышенности, чистые
                источники и теплые минеральные воды создают атмосферу
                умиротворения.
              </p>
            </div>
            <div className="third-screen__rectangle1" id="rectangle">
              <p className="third-screen__text-left">
                Прогуливаясь по городу, можно насладиться свежим воздухом и
                наслаждаться видами на величественные горные массивы.{" "}
              </p>
            </div>
          </div>

          <div className="third-screen__rectangle" id="rectangle">
            <p className="third-screen__text-top-bottom">
              Железноводск — это оазис здоровья и красоты, приглашающий в мир
              природного спокойствия и гармонии.
            </p>
          </div>
        </div>
      </section>
      <Calendar />

      <section className="fourth-screen">
        <h2 className="fourth-screen__title">карта города</h2>
        <div className="fourth-screen__map">
          <iframe
            title="qwerty"
            src="https://yandex.ru/map-widget/v1/?ll=43.036655%2C44.130890&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgg1MzExOTA0MBJN0KDQvtGB0YHQuNGPLCDQodGC0LDQstGA0L7Qv9C-0LvRjNGB0LrQuNC5INC60YDQsNC5LCDQltC10LvQtdC30L3QvtCy0L7QtNGB0LoiCg08HyxCFSOHMEI%2C&z=13.35"
            allowFullScreen={true}
          />
        </div>
      </section>
    </>
  )
}
export default Home
