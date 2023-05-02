import React, { useState } from "react"
import Navbar from "./components/Navbar"
import CardContainer from "./components/CardContainer"
import Filter from "./components/Filter"
import Loading from "./components/Loading"

const App = () => {
  const [data, setData] = useState(null)
  const [placeHolder, setPlaceHolder] = useState("Select Company")
  const [dbType, setDbType] = useState("")
  const [filter, setFilter] = useState({
    price: 9999999999,
    engineSize: [0, 99999999],
    year: 0,
    km: 9999999999,
  })


  return (
    <>
      <Navbar
        setData={setData}
        placeHolder={placeHolder}
        setPlaceHolder={setPlaceHolder}
        filter={filter}
        setFilter={setFilter}
        dbType = {dbType}  
        setDbType = {setDbType}
      />

      {data === null ? (
        <Loading />
      ) : (
        <>
          <Filter data={data.data} filter={filter} setFilter={setFilter} />
          <CardContainer data={data.data} dbType={dbType} filter={filter} />
        </>
      )}
    </>
  )
}

export default App
