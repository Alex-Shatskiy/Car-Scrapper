import "../css/Cards.css"
import React from "react"

const Cards = (props) => {
  const { cars } = props
  return (
    <div className="card-container">
      {cars.map((car) => {
        return (
          <>
            <a className="clickable" href={car.pageUrl} target="_blank">
              <div className="card">
                <img src={car.img} />
                <h3>{car.title}</h3>
                <div className="card-details">
                  <p>
                    {car.km} | {car.cc} | {car.type} | {car.transmission}
                  </p>
                </div>
                <p id="price">Price: {car.price}</p>
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
