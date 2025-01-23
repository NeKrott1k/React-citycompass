import arrow from "../img/Arrow.svg"
import Loader from "../components/Loader/Loader.js"

import { useState, useContext, React } from "react"
import { useParams, NavLink } from "react-router-dom"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { menuContext } from "../components/menuContext/menuContext.js"

import axios from "axios"

const reviewUrl = "https://67319f907aaf2a9aff113edb.mockapi.io/"

const Attraction_dop = () => {
  const { id } = useParams()
  const [buttonState, setButtonState] = useState("")
  const { toggleGallery } = useContext(menuContext)
  const { isGalleryOpen } = useContext(menuContext)
  const [selectedRating, setSelectedRating] = useState(0)
  const [reviewText, setReviewText] = useState("")
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [currentIndexImg, setCurrentIndexImg] = useState(0)
  const queryClient = useQueryClient()

  const fetchAttractions = async ({ queryKey }) => {
    const [
      ,
      id,
      baseUrl = "https://67319f907aaf2a9aff113edb.mockapi.io/attraction",
    ] = queryKey

    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
  }

  const fetchReviews = async ({ queryKey }) => {
    const [, id, reviewUrl = "https://67319f907aaf2a9aff113edb.mockapi.io/"] =
      queryKey
    const response = await axios.get(`${reviewUrl}/reviews?attraction_id=${id}`)
    return response.data
  }

  const {
    data: attractions = {},
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["attractions", id],
    queryFn: fetchAttractions,
    keepPreviousData: true,
    staleTime: 30_000,
    cacheTime: 1000 * 60 * 60,
  })

  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews", id],
    queryFn: fetchReviews,
    keepPreviousData: true,
    staleTime: 30_000,
    cacheTime: 1000 * 60 * 60,
  })

  const imageUrls = [
    attractions?.image_for_page1 || "",
    attractions?.image_for_page2 || "",
    attractions?.image_for_page3 || "",
  ].filter((url) => url)

  if (isLoading) {
    return <Loader />
  }
  if (!attractions) {
    return <h2>Данные не найдены</h2>
  }
  if (isError) {
    return <p>{error}</p>
  }

  const handleButtonClick = () => {
    setButtonState("onclick")
    setTimeout(() => {
      setButtonState("validate")
      setTimeout(() => {
        setButtonState("")
      }, 1250)
    }, 2250)
  }
  const handleReviewSubmit = async (event) => {
    event.preventDefault()

    if (selectedRating === 0) {
      alert("Поставьте оценку")
      return
    }

    const newReview = {
      attraction_id: id,
      user: userName,
      email: userEmail,
      rating: selectedRating,
      text: reviewText,
    }

    try {
      const response = await axios.post(`${reviewUrl}/reviews`, newReview)
      alert("Отзыв отправлен!")
      const updatedReviews = (reviews) => [
        ...reviews,
        {
          ...newReview,
          id: response.data.id,
        },
      ]
      queryClient.setQueryData(["reviews", id], updatedReviews)
      setSelectedRating(0)
      setReviewText("")
      setUserEmail("")
      setUserName("")
    } catch (error) {
      console.error("Ошибка отправки отзыва", error)
      alert("Ошибка при отправке отзыва")
    }
  }

  const renderReviews = () => {
    if (reviews.length === 0) {
      return <p>Отзывов пока нет. Будьте первым!</p>
    } else {
      return (
        <div
          id="reviews-container"
          style={{
            flexWrap: "wrap",
            display: "flex",
            gap: "50px",
            marginTop: "3vw",
            flexDirection: "column",
            width: "70vw",
          }}
        >
          {reviews.map((review) => (
            <div
              key={review.id}
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "left",
                gap: "10px",
                backgroundColor: "#1a2e1a",
                padding: "20px",
                borderRadius: "10px",
                borderLeft: "5px solid #4caf50",
              }}
            >
              <p
                style={{
                  color: "#4caf50",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                <strong>{review.user}:</strong>
              </p>
              <p style={{ color: "#e0f7fa", fontSize: "16px" }}>
                {review.email}
              </p>
              <p style={{ color: "#e0f7fa", fontSize: "16px" }}>
                <strong>Отзыв:</strong> {review.text}
              </p>
              <button
                onClick={() => handleDeleteReview(review.id)}
                style={{
                  width: "fit-content",
                  backgroundColor: "#ff4d4d",
                  color: "white",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "14px",
                  marginTop: "10px",
                  transition: "background-color 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#cc0000")
                }
                onMouseOut={(e) => (e.target.style.backgroundColor = "#ff4d4d")}
              >
                Удалить
              </button>
              <hr style={{ borderColor: "#4caf50", marginTop: "20px" }} />
            </div>
          ))}
        </div>
      )
    }
  }

  const handleDeleteReview = async (reviewId) => {
    try {
      await axios.delete(`${reviewUrl}/reviews/${reviewId}`)
      const updatedReviews = reviews.filter((review) => review.id !== reviewId)
      queryClient.setQueryData(["reviews", id], updatedReviews)
      alert("Отзыв удален!")
    } catch (error) {
      console.error("Ошибка удаления отзыва", error)
      alert("Ошибка при удалении отзыва")
    }
  }

  const GalleryPrev = () => {
    setCurrentIndexImg(
      (prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length,
    )
  }

  const GalleryNext = () => {
    setCurrentIndexImg((prevIndex) => (prevIndex + 1) % imageUrls.length)
  }

  const handleRatingClick = (rating) => {
    setSelectedRating(rating)
  }

  return (
    <>
      <section className="attraction">
        <NavLink to="/React-citycompass/attractions">
          <div className="attraction__button">
            <p className="attraction__btn">На главную</p>
            <img src={arrow} alt="" />
          </div>
        </NavLink>
        <div className="attraction__content">
          <h2 className="attraction__title">{attractions.name_place}</h2>
          <div className="attraction__img-container" onClick={toggleGallery}>
            {imageUrls.map((url, index) => {
              return (
                <img key={index} src={url} alt={`Изображение №${index + 1}`} />
              )
            })}
          </div>
          {isLoading && <Loader />}
          <div className="attraction__text">
            <p className="attraction__paragraph">{attractions.description}</p>
          </div>
          <div
            id="map"
            dangerouslySetInnerHTML={{
              __html: attractions.map_iframe,
            }}
          />
        </div>
        <form onSubmit={handleReviewSubmit} className="attraction__reviews">
          <label className="attraction__review-title">оставьте отзыв</label>
          <input
            id="user-input"
            type="text"
            placeholder="ФИО"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <input
            id="email-input"
            type="email"
            placeholder="Эл. почта"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
          <textarea
            id="review-text"
            rows="4"
            required
            placeholder="Описание"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <label htmlFor="review-text" className="attraction__review-title">
            Оценка <br /> (5 балльная шкала)
          </label>
          <div className="attraction__review-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                className={`attraction__review-star ${star <= selectedRating ? "selected" : ""}`}
                key={star}
                onClick={() => handleRatingClick(star)}
              >
                ★
              </span>
            ))}
          </div>
          <div className="attraction__review-btn-container">
            <button
              type="submit"
              className={`attraction__review-btn ${buttonState}`}
              onClick={handleButtonClick}
            ></button>
          </div>
        </form>
        <div id="reviews-container" className="attraction__review-container">
          <h2>Отзывы:</h2>
          {renderReviews()}
        </div>
      </section>
      <div
        id="attraction-gallery"
        className={`attraction-gallery ${isGalleryOpen ? "active" : ""}`}
      >
        <div
          id="gallery-next"
          className="attraction-gallery__next"
          onClick={GalleryNext}
        >
          &#10095;
        </div>
        <div
          id="gallery-prev"
          className="attraction-gallery__prev"
          onClick={GalleryPrev}
        >
          &#10094;
        </div>
        <span
          id="gallery-close"
          className="attraction-gallery__close"
          onClick={toggleGallery}
        >
          &times;
        </span>
        <div className="attraction-gallery__content">
          <div className="attraction-gallery__images">
            <img
              id="image-gallery"
              className="attraction-gallery__image"
              src={imageUrls[currentIndexImg]}
              alt={attractions.name_place}
            />
          </div>
        </div>
      </div>
    </>
  )
}
export default Attraction_dop
