import React, { useState } from "react"
import Navbar from "./components/Navbar"
import CardContainer from "./components/CardContainer"
import Filter from "./components/Filter"
import Loading from "./components/Loading"

const App = () => {
  const [data, setData] = useState(null)
  const [placeHolder, setPlaceHolder] = useState("Select Company")
  const [filter, setFilter] = useState("")
  console.log(data)

  return (
    <>
      <Navbar
        setData={setData}
        placeHolder={placeHolder}
        setPlaceHolder={setPlaceHolder}
        filter={filter}
        setFilter={setFilter}
      />

      {data === null ? (
        <Loading />
      ) : (
        <>
          {/* <Filter data={data.data} filter={filter} setFilter={setFilter} /> */}
          <CardContainer data={data.data} filter={filter} />
        </>
      )}
    </>
  )
}

export default App
