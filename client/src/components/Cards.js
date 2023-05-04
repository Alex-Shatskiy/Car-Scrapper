import "../css/Cards.css"
import React from "react"

const intToCurrency = (price)=>{
  return new Intl.NumberFormat('en-NZ', { 
    style: 'currency', 
    currency: 'NZD',  
    maximumFractionDigits: 0, 
    minimumFractionDigits: 0, 
    }).format(price)
}
const addComma = (number)=>{
  const numberFormatter = Intl.NumberFormat('en-US');
  return numberFormatter.format(number);

}


const Cards = (props) => {
  const { cars, dbType, filter } = props
  const {km, price, engineSize,  year} = filter

  return (
    <div className="card-container">
      {cars.map( (car) => {
        // let carSlice = car[`${dbType}carname`];
        // let carYear
        // console.log(typeof carSlice.slice)
        // if(typeof carSlice.slice === "undefined"){
        //   console.log("rip")
        // }else{
        //    carYear = carSlice.match(/\d{4}/)
        // }
          
        return (
          <>
            <a className="clickable" href={car[`${dbType}pageurl`]} target="_blank">
              <div className="card">
                <div className="car-image">
                  <img src={car[`${dbType}carimage`]} />
                </div>
                <h3>{car[`${dbType}carname`]}</h3>
                <div className="card-details">
                  <p>
                    {addComma(car[`${dbType}km`])} km   
                  </p>
                  <p>{addComma(car[`${dbType}cc`])}cc </p>
                  <p> {car[`${dbType}type`]} </p>
                  <p>{car[`${dbType}transmission`]}</p>
                </div>
                <p id="price">Price: {intToCurrency(car[`${dbType}price`])}</p>
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
