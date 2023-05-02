import Cards from "./Cards"
import FilterDetails from "./FilterDetails"
import NoCars from "./NoCars"
import React, { useState } from "react"

const CardContainer = (props) => {
  const { data, filter } = props

  const [sorted, setSorted] = useState("title")
  const [order, setOrder] = useState("accending")
  let sortedCars

  console.log(data)
  // switch (sorted) {
  //   case "title":
  //     sortedCars = data.sort((a, b) => {
  //       console.log(a,b)
  //       const carA = a[sorted].substring(0, 4)
  //       const carB = b[sorted].substring(0, 4)
  //       return order === "decending" ? carA - carB : carB - carA
  //     })
  //     break
  //   case "price":
  //     sortedCars = data.sort((a, b) => {
  //       const carA = a[sorted].replace(/\D/g, "")
  //       const carB = b[sorted].replace(/\D/g, "")
  //       return order === "decending" ? carA - carB : carB - carA
  //     })
  //     break
  //   case "km":
  //     sortedCars = data.sort((a, b) => {
  //       const carA = a[sorted].replace(/\D/g, "")
  //       const carB = b[sorted].replace(/\D/g, "")
  //       return order === "decending" ? carA - carB : carB - carA
  //     })
  //     break
  //   default:
  //     alert("err")
  // }
  return (
    <>
      {/* <FilterDetails
        data={data}
        filter={filter}
        setSorted={setSorted}
        setOrder={setOrder}
        order ={order}
        sorted={sorted}
      /> */}
      {data.length != 0 ? (
        <>
          <Cards cars={data} filter={filter} />
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
