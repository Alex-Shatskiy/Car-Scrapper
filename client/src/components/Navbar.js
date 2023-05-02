import "../css/Navbar.css"
import axios from "axios"
import { useEffect, useState } from "react"
import React from "react"

const Navbar = (props) => {
  const { setData, placeHolder, setPlaceHolder, filter, setFilter } = props

  const [carCompany, setCarCompany] = useState("")

  const getCars = async (company, specFilter) => {
   await axios.get(`http://localhost:5000/${company}`)
   .then((res) => setData(res.data))
   .then(()=>{
   })
   .catch(err =>console.log("WHoops:",err))
  }
  // const getCars = async (company, specFilter) => {
  //   await axios.get(`https://car-scrapper.onrender.com`).then((res) => setData(res.data)).catch(err =>console.log("WHoops:",err))
  //  }
  useEffect(() => {
    setData(null)
    console.log(filter)
    getCars(carCompany, filter)
  }, [filter])

  const changePlaceholder = (placeHolderTxt) => {
    setPlaceHolder(placeHolderTxt)
  }
  const handleClick = (specFilter, url, placeholder,dbType) => {
    changePlaceholder(placeholder)
    setData(null)
    setCarCompany(url)
    getCars(url, specFilter)
    setFilter(dbType)
  }
  return (
    <>
      <div className="nav-bar">
        <img className="reddit-icon" src="./images/web-crawlers.jpg" />
        <div className="nav-bar-navigation">
          <h3>
            Car Scraper for{" "}
            {placeHolder == "Select Company" ? "LOL" : placeHolder}
          </h3>
          <div className="subreddit-selection">
            <span>{placeHolder}</span>
            <div className="section-contnet">
              <p
                onClick={() =>
                  handleClick(filter, "autoWorld", "Auto World Cars", "aw_")
                }
              >
                Auto World Cars
              </p>
              <p onClick={() => handleClick(filter, "carsCheap", "Cheap Cars", 'cc_')}>
                Cars Cheap
              </p>
              <p
                onClick={() =>
                  handleClick(filter, "coventryCars", "Coventry Cars", 'conc_')
                }
              >
                Coventry Cars
              </p>
              <p
                onClick={() =>
                  handleClick(filter, "valuemotors", "Value Motors", 'vm_')
                }
              >
                Value Motors
              </p>
              <p
                onClick={() =>
                  handleClick(filter, "wholeSale", "Whole Sale Cars", 'wc_')
                }
              >
                Whole Sale Cars
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
