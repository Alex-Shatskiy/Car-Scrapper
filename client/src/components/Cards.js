import "../css/Cards.css"
import React from "react"

const Cards = (props) => {
  const { cars, filter } = props
  let dbType = filter
  return (
    <div className="card-container">
      {cars.map((car) => {
        return (
          <>
            <a className="clickable" href={car[`${dbType}pageurl`]} target="_blank">
              <div className="card">
                <img src={car[`${dbType}carimage`]} />
                <h3>{car[`${dbType}carname`]}</h3>
                <div className="card-details">
                  <p>
                    {car[`${dbType}km`]} | {car[`${dbType}cc`]} | {car[`${dbType}type`]} | {car[`${dbType}transmission`]}
                  </p>
                </div>
                <p id="price">Price: {car[`${dbType}price`]}</p>
                <span>Click to show more details</span>
              </div>
            </a>
          </>
        )
      })}
    </div>
  )
}

export default Cards
