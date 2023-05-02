import "../css/Filter.css"
import React, { useState } from "react"

const Filter = (props) => {
  const { filter, setFilter } = props

  const filterSpecs = {
    optimal: {
      price: 15000,
      engineSize: [1500, 2500],
      year: 2015,
      km: 150000,
    },
    more: {
      price: 20000,
      engineSize: [1500, 2500],
      year: 2013,
      km: 190000 ,
    },
    all: {
    price: 9999999999,
    engineSize: [0, 99999999],
    year: 0,
    km: 9999999999,
    }
  }
  const changeFilter = (buttonFilter) => {
    if(buttonFilter == 'optimal') setFilter(filterSpecs.optimal)
    if(buttonFilter == 'all') setFilter(filterSpecs.all)
    if(buttonFilter == 'more') setFilter(filterSpecs.more)
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
        <button
          className={filter == "all" ? filter : "empty"}
          onClick={() => {
            changeFilter("all")
          }}
        >
          All
        </button>
      </div>
    </>
  )
}

export default Filter
