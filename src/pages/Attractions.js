import "../styles/Attractions.scss"
import useInput from "../hooks/useInput.js"
import Loader from "../components/Loader/Loader.js"
import arrow1 from "../img/Arrow.svg"
import React from "react"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

const Attractions = () => {
  const navigate = useNavigate()
  const input = useInput()
  const [isActive, setIsActive] = useState(false)
  const [pageCount, setPageCount] = useState(1)
  const [isSorted, setIsSorted] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [hasMore, setHasMore] = useState(true)
  const itemsPerPage = 10

  const fetchAttactions = async ({ queryKey }) => {
    const [
      _key,
      pageCount,
      isSorted,
      selectedCategory,
      itemsPerPage,
      baseUrl = "https://67319f907aaf2a9aff113edb.mockapi.io/attraction",
    ] = queryKey
    const response = await fetch(
      `${baseUrl}?page=${pageCount}&limit=${itemsPerPage}${isSorted ? "&sortBy=name_place" : ""}${selectedCategory ? `&search=${selectedCategory}` : ""}`,
    )
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.json()
  }

  const {
    data: attractions = [],
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: [
      "attractions",
      pageCount,
      isSorted,
      selectedCategory,
      itemsPerPage,
    ],
    queryFn: fetchAttactions,
    keepPreviousData: true,
    staleTime: 360_000,
  })

  const handleCardClick = (id) => {
    navigate(`/attraction/${id}`)
  }

  const handleClick = () => {
    setIsActive(!isActive)
  }

  const handleShowMore = () => {
    if (hasMore) {
      setPageCount((prevPageCount) => prevPageCount + 1)
    }
  }

  const handleSort = () => {
    setIsSorted((prev) => !prev)
    setPageCount(1)
    setHasMore(true)
  }

  const handleFilter = (event) => {
    setSelectedCategory(event.target.value)
    setPageCount(1)
    setHasMore(true)
  }

  const handlePrevPage = () => {
    if (pageCount > 1) {
      setPageCount((prevPageCount) => prevPageCount - 1)
    }
    if (pageCount === 1) {
      setPageCount(1)
    }
  }

  const handleNextPage = () => {
    setPageCount((prevPageCount) => prevPageCount + 1)
  }

  if (isError) {
    return <p className="error">{error.message}</p>
  }

  return (
    <section className="first_screen">
      <div className="first_screen__titles">
        <h2 className="first_screen__title1">достопримечательности</h2>
        <h2 className="first_screen__title2">(интересные места)</h2>
      </div>
      {isLoading && <Loader />}
      {!isLoading && attractions.length > 0 && (
        <>
          <div className="first_screen__search-and-filter">
            <div
              className={`first_screen__search ${isActive ? "active" : ""}`}
              id="search-div"
            >
              <div
                onClick={handleClick}
                className="first_screen__icon"
                id="search-icon"
              ></div>
              <form className="first_screen__input">
                <input
                  type="text"
                  className="first_screen__search-input"
                  {...input}
                  placeholder="Поиск..."
                />
              </form>
              <span className="first_screen__clear" id="search-clear"></span>
            </div>

            <div className="first_screen__filter-container">
              <div className="first_screen__filter">
                <label>
                  <p>Фильтр по категориям</p>
                  <select
                    id="category-filter"
                    className="first_screen__category-filter"
                    value={selectedCategory}
                    onChange={handleFilter}
                  >
                    <option value="">Все</option>
                    {attractions.map((attraction) => (
                      <option value={attraction.category}>
                        {attraction.category}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
            <button
              type="button"
              className="first_screen__category-sort"
              id="category-sort"
              onClick={handleSort}
            >
              {isSorted ? "Сбросить" : "По алфавиту"}
            </button>
          </div>

          <div id="cards-container">
            {attractions
              .filter((attraction) => {
                return attraction.name_place && attraction.imageURL
              })
              .filter((attraction) => {
                const name = attraction.name_place || ""
                const searchValue = input.value || ""
                return name.toLowerCase().includes(searchValue.toLowerCase())
              })
              .map((attraction) => (
                <div
                  key={attraction.id}
                  className="first_screen__card"
                  onClick={
                    !isLoading
                      ? () => handleCardClick(attraction.id)
                      : undefined
                  }
                >
                  <img
                    className="first_screen__cards-img"
                    src={attraction.imageURL}
                    alt={attraction.name_place}
                    onClick={
                      !isLoading
                        ? () => handleCardClick(attraction.id)
                        : undefined
                    }
                  />
                  <div className="first_screen__info">
                    <h4 className="first_screen__card-title">
                      {attraction.name_place}
                    </h4>
                    <div className="first_screen__info-button">
                      <button id="btn" className="first_screen__info-btn">
                        Подробнее
                      </button>
                      <img src={arrow1} alt="arrow" />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
      <div className="first_screen__paginations">
        <button
          onClick={handleShowMore}
          disabled={!hasMore || isFetching}
          id="show-more"
        >
          Показать больше
        </button>
        <div className="first_screen__pagination">
          <button id="prev-page" onClick={handlePrevPage}>
            ←
          </button>
          <span id="current-page">{pageCount}</span>
          <button
            id="next-page"
            onClick={handleNextPage}
            disabled={!hasMore || isFetching}
          >
            →
          </button>
        </div>
      </div>
    </section>
  )
}
export default Attractions
