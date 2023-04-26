import "../css/Navbar.css"
import axios from "axios"
import { useEffect, useState } from "react"
import React from "react"

const Navbar = (props) => {
  const { setData, placeHolder, setPlaceHolder, filter } = props

  const [carCompany, setCarCompany] = useState("")

  const getCars = async (company, specFilter) => {
   await axios.get(`https://car-scrapper.onrender.com/${company}/${specFilter}`, {
    headers: {
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
   })
   .then((res) => setData(res.data))
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
  const handleClick = (specFilter, url, placeholder) => {
    changePlaceholder(placeholder)
    setData(null)
    setCarCompany(url)
    getCars(url, specFilter)
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
                  handleClick(filter, "autoWorld", "Auto World Cars")
                }
              >
                Auto World Cars
              </p>
              <p onClick={() => handleClick(filter, "carsCheap", "Cheap Cars")}>
                Cars Cheap
              </p>
              <p
                onClick={() =>
                  handleClick(filter, "coventryCars", "Coventry Cars")
                }
              >
                Coventry Cars
              </p>
              <p
                onClick={() =>
                  handleClick(filter, "valuemotors", "Value Motors")
                }
              >
                Value Motors
              </p>
              <p
                onClick={() =>
                  handleClick(filter, "wholeSale", "Whole Sale Cars")
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
