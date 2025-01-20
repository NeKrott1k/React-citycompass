import { useState } from "react"
import "./Calendar.scss"
import React from "react"
const Calendar = () => {
  const eventsData = {
    1: "Новый год",
    7: "Рождество",
    14: "День святого Валентина",
    22: "Международный день водных ресурсов",
  }
  const [currentDate, setCurrentDate] = useState(new Date())

  const renderDays = () => {
    const days = []
    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    )
    const lastDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
    )

    // Пустые ячейки для дней до первого дня месяца
    for (let i = 1; i < firstDay.getDay(); i++) {
      days.push(<div className="calend__day empty" key={`empty-${i}`} />)
    }

    // Дни текущего месяца
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const event = eventsData[i]
      days.push(
        <div
          className="calend__day"
          key={i}
          onClick={() => handleDayClick(i, event)}
        >
          <span>{i}</span>
          {event && (
            <div
              className={`${handleDayClick ? "calend__event" : "calend__event active"}`}
            >
              {event}
            </div>
          )}
        </div>,
      )
    }
    return days
  }

  const handleDayClick = (day, event) => {
    if (event) {
      alert(`Событие: ${event}`)
    } else {
      alert(`Нет событий на ${day} число.`)
    }
  }

  const changeMonth = (increment) => {
    setCurrentDate((prevDate) => {
      return new Date(
        prevDate.getFullYear(),
        prevDate.getMonth() + increment,
        1,
      )
    })
  }

  const monthLabel = currentDate.toLocaleString("ru-RU", {
    month: "long",
    year: "numeric",
  })

  return (
    <div className="calend">
      <h2 className="calend__title">Календарь событий</h2>
      <div className="calend__month" id="monthLabel">
        {monthLabel}
      </div>
      <div className="calend__container">
        <div className="calend__month"></div>
        <div className="calend__days-of-week">
          {["ПН", "ВТ", "СР", "ЧТ", "ПТ"].map((day) => (
            <p className="calend__weekdays" key={day}>
              {day}
            </p>
          ))}

          <p className="calend__weekend">
            <span>СБ</span>
          </p>

          <p className="calend__weekend">
            <span>ВС</span>
          </p>
        </div>
        <div className="calend__days">{renderDays()}</div>
        <div className="calend__btns">
          <button className="calend__button" onClick={() => changeMonth(-1)}>
            &#x3c;
          </button>
          <button className="calend__button" onClick={() => changeMonth(1)}>
            &#x3e;
          </button>
        </div>
      </div>
    </div>
  )
}
export default Calendar
