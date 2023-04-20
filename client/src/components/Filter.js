import "../css/Filter.css"
import React, { useState } from "react"

const Filter = (props) => {
  const { filter, setFilter } = props

  const changeFilter = (buttonFilter) => {
    setFilter(buttonFilter)
  }

  return (
    <>
      <div className="filter-container">
        <button
          className={filter == "optimal" ? filter : "empty"}
          onClick={() => {
            changeFilter("optimal")
          }}
        >
          Optimal
        </button>
        <button
          className={filter == "more" ? filter : "empty"}
          onClick={() => {
            changeFilter("more")
          }}
        >
          If I gotta
        </button>
      </div>
    </>
  )
}

export default Filter
