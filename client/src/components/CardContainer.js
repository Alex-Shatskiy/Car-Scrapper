import Cards from "./Cards"
import FilterDetails from "./FilterDetails"
import NoCars from "./NoCars"
import React, { useState } from "react"

const CardContainer =  (props) => {
  const { data, dbType, filter } = props
  const {km, price, engineSize,  year} = filter
  const [sorted, setSorted] = useState("title")
  const [order, setOrder] = useState("accending")
  let sortedCars

  let filteredCars = data.filter(car =>{
    let yearSlice = car[`${dbType}carname`].substring(0, 4)
    let filterRequirements = car[`${dbType}km`] <= km && car[`${dbType}price`] <= price && (engineSize[0] <= car[`${dbType}cc`] && engineSize[1] >= car[`${dbType}cc`] && yearSlice >= year )
    if(filterRequirements) return car
  })


  switch (sorted) {
    case "title":
      sortedCars = filteredCars.sort((a, b) => {
        const carA = a[`${dbType}carname`].substring(0, 4)
        const carB = b[`${dbType}carname`].substring(0, 4)
        return order === "decending" ? carA - carB : carB - carA
      })
      break
    case "price":
      sortedCars = filteredCars.sort((a, b) => {
        const carA = a[`${dbType}price`]
        const carB = b[`${dbType}price`]
        return order === "decending" ? carA - carB : carB - carA
      })
      break
    case "km":
      sortedCars = filteredCars.sort((a, b) => {
        const carA = a[`${dbType}km`]
        const carB = b[`${dbType}km`]
        return order === "decending" ? carA - carB : carB - carA
      })
      break
    default:
      alert("err")
  }
  return (
    <>
      <FilterDetails
        data={filteredCars}
        filter={filter}
        setSorted={setSorted}
        setOrder={setOrder}
        order ={order}
        sorted={sorted}
      />
      {filteredCars.length != 0 ? (
        <>
          <Cards cars={sortedCars} dbType={dbType} filter={filter} />
        </>
      ) : (
        <>
          <NoCars />
        </>
      )}
    </>
  )
}

export default CardContainer
