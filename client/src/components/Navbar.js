import "../css/Navbar.css"
import axios from "axios"
import { useEffect, useState } from "react"
import React from "react"

const Navbar = (props) => {
  const { setData, placeHolder, setPlaceHolder, filter, setFilter, dbType, setDbType } = props

  const [carCompany, setCarCompany] = useState("")

  const getCars = async (company) => {
   await axios.get(`https://car-scrapper-alex.onrender.com/${company}`)
   .then((res) => setData(res.data))
   .catch(err =>console.log("WHoops:",err))
  }
  // const getCars = async (company, specFilter) => {
  //   await axios.get(`https://car-scrapper.onrender.com`).then((res) => setData(res.data)).catch(err =>console.log("WHoops:",err))
  //  }
  useEffect(() => {
    setData(null)
    getCars(carCompany, dbType)
  }, [dbType])

  const changePlaceholder = (placeHolderTxt) => {
    setPlaceHolder(placeHolderTxt)
  }
  const handleClick = (url, placeholder,dbType) => {
    changePlaceholder(placeholder)
    setData(null)
    setCarCompany(url)
    getCars(url)
    setDbType(dbType)
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
                  handleClick("autoWorld", "Auto World Cars", "aw_")
                }
              >
                Auto World Cars
              </p>
              <p onClick={() => handleClick("carsCheap", "Cheap Cars", 'cc_')}>
                Cars Cheap
              </p>
              <p
                onClick={() =>
                  handleClick("coventryCars", "Coventry Cars", 'conc_')
                }
              >
                Coventry Cars
              </p>
              <p
                onClick={() =>
                  handleClick("valuemotors", "Value Motors", 'vm_')
                }
              >
                Value Motors
              </p>
              <p
                onClick={() =>
                  handleClick("wholeSale", "Whole Sale Cars", 'wc_')
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
