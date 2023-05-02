import "../css/FilterDetails.css"
import React, { useState } from "react"

const FilterDetails = (props) => {
  const { data, filter, setSorted, setOrder,order,sorted } = props

  const filterSpecs = {
    optimal: {
      price: "15,000 Max",
      engineSize: "1500-2500cc",
      year: "2015 or later",
      km: "150,000 or less",
    },
    more: {
      price: "20,000 Max",
      engineSize: "1500-2500cc",
      year: "2013 or later",
      km: "190,000 or less",
    },
  }

  return (
    <div className="page-details">
      <span>Total Cars: {data.length} </span>
      <span>
        {filter === "optimal" ? (
          <>
            ${filterSpecs.optimal.price} | {filterSpecs.optimal.engineSize} |{" "}
            {filterSpecs.optimal.year} | {filterSpecs.optimal.km}
          </>
        ) : (
          <>
            ${filterSpecs.more.price} | {filterSpecs.more.engineSize} |{" "}
            {filterSpecs.more.year} | {filterSpecs.more.km}
          </>
        )}
      </span>
      <div className="sort-selector"> 

      <select value={sorted} onChange={(e) => setSorted(e.target.value)}>
        <option value="title">Year</option>
        <option value="km">km</option>
        <option value="price">Price</option>
      </select>

      <select value={order} onChange={(e) => setOrder(e.target.value)}>
        <option value="accending">accending</option>
        <option value="decending">decending</option>
      </select>
      </div>
    </div>
  )
}

export default FilterDetails
